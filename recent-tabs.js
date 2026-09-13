(function () {
  var MAX_RECENT = 3;

  var container = document.getElementById('recentTabs');
  var list = document.getElementById('recentTabsList');

  function render(sessions) {
    list.innerHTML = '';

    sessions.forEach(function (session) {
      var tab = session.tab;

      var item = document.createElement('button');
      item.type = 'button';
      item.className = 'recent-tab-item';
      item.title = tab.title || tab.url;

      // Only use the favicon Chrome already has cached for this session — never fetch
      // one from a third party, since that would mean sending browsing history
      // (a hostname the user didn't choose to share) off the device.
      var icon;
      if (tab.favIconUrl) {
        icon = document.createElement('img');
        icon.src = tab.favIconUrl;
        icon.alt = '';
      } else {
        icon = document.createElement('span');
      }
      icon.className = 'recent-tab-icon';

      var title = document.createElement('span');
      title.className = 'recent-tab-title';
      title.textContent = tab.title || tab.url;

      item.appendChild(icon);
      item.appendChild(title);

      item.addEventListener('click', async function () {
        await chrome.sessions.restore(tab.sessionId);
      });

      list.appendChild(item);
    });

    container.hidden = sessions.length === 0;
  }

  async function init() {
    if (!chrome.sessions) return;

    var sessions = await chrome.sessions.getRecentlyClosed({ maxResults: 25 });
    var recentTabs = sessions.filter(function (s) { return !!s.tab; }).slice(0, MAX_RECENT);
    render(recentTabs);
  }

  init();
})();
