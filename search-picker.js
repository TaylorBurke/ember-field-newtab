(function () {
  // Display-only preference — chrome.search.query() always routes through the
  // browser's real default search engine (chrome://settings/search). Extensions
  // cannot read or change that, so this just remembers which icon to show here.
  var SERVICES = [
    { id: 'google', name: 'Google', color: '#4285f4', letter: 'G' },
    { id: 'bing', name: 'Bing', color: '#008373', letter: 'B' },
    { id: 'duckduckgo', name: 'DuckDuckGo', color: '#de5833', letter: 'D' },
    { id: 'brave', name: 'Brave Search', color: '#fb542b', letter: 'B' },
    { id: 'ecosia', name: 'Ecosia', color: '#4c8c40', letter: 'E' }
  ];
  var DEFAULT_SERVICE = 'google';

  var caretBtn = document.getElementById('searchCaretBtn');
  var dialog = document.getElementById('searchServiceDialog');
  var list = document.getElementById('searchServiceList');

  function buildList(activeId) {
    list.innerHTML = '';

    SERVICES.forEach(function (service) {
      var item = document.createElement('button');
      item.type = 'button';
      item.className = 'palette-option';
      if (service.id === activeId) item.classList.add('is-active');

      var swatch = document.createElement('span');
      swatch.className = 'search-service-swatch';
      swatch.style.background = service.color;
      swatch.textContent = service.letter;

      var label = document.createElement('span');
      label.className = 'palette-name';
      label.textContent = service.name;

      item.appendChild(swatch);
      item.appendChild(label);

      item.addEventListener('click', async function () {
        await chrome.storage.local.set({ searchService: service.id });
        buildList(service.id);
        dialog.close();
      });

      list.appendChild(item);
    });
  }

  caretBtn.addEventListener('click', async function () {
    var data = await chrome.storage.local.get('searchService');
    buildList(data.searchService || DEFAULT_SERVICE);
    dialog.showModal();
  });

  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });
})();
