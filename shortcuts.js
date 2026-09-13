(function () {
  var STORAGE_KEY = 'shortcuts';
  var MAX_SHORTCUTS = 5;

  var shortcutsEl = document.getElementById('shortcuts');
  var addBtn = document.getElementById('addShortcutBtn');
  var editBtn = document.getElementById('editFavoritesBtn');
  var dialog = document.getElementById('addDialog');
  var form = document.getElementById('addForm');
  var urlInput = document.getElementById('shortcutUrl');
  var cancelBtn = document.getElementById('cancelAdd');

  var editing = false;

  function normalizeUrl(raw) {
    var value = raw.trim();
    if (!value) return null;
    if (!/^https?:\/\//i.test(value)) value = 'https://' + value;
    try {
      return new URL(value).href;
    } catch (err) {
      return null;
    }
  }

  function hostnameOf(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch (err) {
      return url;
    }
  }

  function faviconUrl(hostname) {
    return 'https://icons.duckduckgo.com/ip3/' + hostname + '.ico';
  }

  async function loadShortcuts() {
    var data = await chrome.storage.local.get(STORAGE_KEY);
    return data[STORAGE_KEY] || [];
  }

  async function saveShortcuts(list) {
    await chrome.storage.local.set({ [STORAGE_KEY]: list });
  }

  function render(list) {
    shortcutsEl.innerHTML = '';

    list.forEach(function (shortcut) {
      var tile = document.createElement('a');
      tile.className = 'shortcut';
      tile.href = shortcut.url;

      var iconBox = document.createElement('span');
      iconBox.className = 'shortcut-icon-box';

      var icon = document.createElement('img');
      icon.className = 'shortcut-icon';
      icon.src = shortcut.icon;
      icon.alt = '';
      iconBox.appendChild(icon);

      if (editing) {
        var remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'shortcut-remove';
        remove.setAttribute('aria-label', 'Remove ' + shortcut.label);
        remove.textContent = '×';
        remove.addEventListener('click', async function (e) {
          e.preventDefault();
          e.stopPropagation();
          var current = await loadShortcuts();
          var updated = current.filter(function (s) { return s.url !== shortcut.url; });
          await saveShortcuts(updated);
          await refresh();
        });
        iconBox.appendChild(remove);
        tile.addEventListener('click', function (e) { e.preventDefault(); });
      }

      var label = document.createElement('span');
      label.className = 'shortcut-label';
      label.textContent = shortcut.label;

      tile.appendChild(iconBox);
      tile.appendChild(label);
      shortcutsEl.appendChild(tile);
    });

    addBtn.hidden = list.length >= MAX_SHORTCUTS;
    editBtn.hidden = list.length === 0 && !editing;
    editBtn.textContent = editing ? 'Done' : 'Edit favorites';
  }

  async function refresh() {
    var list = await loadShortcuts();
    if (list.length === 0) editing = false;
    render(list);
  }

  addBtn.addEventListener('click', function () {
    urlInput.value = '';
    dialog.showModal();
    urlInput.focus();
  });

  cancelBtn.addEventListener('click', function () {
    dialog.close();
  });

  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var url = normalizeUrl(urlInput.value);
    if (!url) return;

    var list = await loadShortcuts();
    if (list.length >= MAX_SHORTCUTS) {
      dialog.close();
      return;
    }

    var hostname = hostnameOf(url);
    if (list.some(function (s) { return hostnameOf(s.url) === hostname; })) {
      dialog.close();
      return;
    }

    list.push({ url: url, label: hostname, icon: faviconUrl(hostname) });
    await saveShortcuts(list);
    dialog.close();
    await refresh();
  });

  editBtn.addEventListener('click', async function () {
    editing = !editing;
    var list = await loadShortcuts();
    render(list);
  });

  refresh();
})();
