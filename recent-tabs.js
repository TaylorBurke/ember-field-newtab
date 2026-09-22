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
      item.title = tab.url;

      // Only use the favicon Chrome already has cached for this session — never fetch
      // one from a third party, since that would mean sending browsing history
      // (a hostname the user didn't choose to share) off the device.
      var icon;
      if (tab.favIconUrl) {
        icon = document.createElement('img');
        icon.src = tab.favIconUrl;
        icon.alt = '';
        icon.className = 'recent-tab-icon';
      } else {
        // Generic globe glyph — a blank tile here reads as a broken/missing image
        // rather than an intentional "no favicon" state.
        icon = document.createElement('span');
        icon.className = 'recent-tab-icon recent-tab-icon-fallback';
        icon.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' +
          '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
          '<ellipse cx="12" cy="12" rx="4" ry="9" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
          '<line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="1.6"/>' +
          '</svg>';
      }

      var title = document.createElement('span');
      title.className = 'recent-tab-title';
      title.textContent = tab.title || tab.url;

      item.appendChild(icon);
      item.appendChild(title);

      item.addEventListener('click', async function () {
        // chrome.sessions.restore() always reopens into a new tab — there's no
        // way to ask it to reuse this one directly — so close this new-tab-page
        // tab once the restore succeeds, leaving the restored tab in its place
        // instead of a second tab sitting alongside it.
        var currentTab = await chrome.tabs.getCurrent();
        await chrome.sessions.restore(tab.sessionId);
        if (currentTab) {
          await chrome.tabs.remove(currentTab.id);
        }
      });

      list.appendChild(item);
    });

    container.hidden = sessions.length === 0;
  }

  async function init() {
    if (!chrome.sessions) return;

    var sessions = await chrome.sessions.getRecentlyClosed({ maxResults: 25 });
    // Chrome can return entries whose tab has no url/title populated (e.g. this
    // extension only holds the "sessions" permission, not "tabs") — skip those
    // rather than rendering a blank row for them.
    var recentTabs = sessions.filter(function (s) { return !!(s.tab && s.tab.url); }).slice(0, MAX_RECENT);
    render(recentTabs);
  }

  init();
})();
