(function () {
  var STORAGE_KEY = 'shortcuts';
  var NAMES_KEY = 'showFavoriteNames';
  var MAX_SHORTCUTS = 5;

  var shortcutsEl = document.getElementById('shortcuts');
  var addBtn = document.getElementById('addShortcutBtn');
  var editBtn = document.getElementById('editFavoritesBtn');
  var namesToggle = document.getElementById('showNamesToggle');
  var namesCheckbox = document.getElementById('showNamesCheckbox');
  var dialog = document.getElementById('addDialog');
  var form = document.getElementById('addForm');
  var urlInput = document.getElementById('shortcutUrl');
  var nameInput = document.getElementById('shortcutName');
  var titleEl = document.getElementById('addFormTitle');
  var submitBtn = document.getElementById('addSubmitBtn');
  var errorEl = document.getElementById('shortcutError');
  var cancelBtn = document.getElementById('cancelAdd');

  var editing = false;
  // URL of the shortcut currently being edited via the dialog, or null when
  // the dialog is in "add a new shortcut" mode.
  var editingUrl = null;
  var showNames = true;

  // Deliberately loose: just enough to catch plain text ("not a url!!") before it
  // becomes a broken, percent-encoded shortcut tile. Not a strict hostname validator —
  // this is a personal shortcut list, not a security boundary, so it errs on the side
  // of accepting borderline-but-plausible input.
  var HOSTNAME_RE = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i;

  function normalizeUrl(raw) {
    var value = raw.trim();
    if (!value) return null;
    if (!/^https?:\/\//i.test(value)) value = 'https://' + value;
    try {
      var url = new URL(value);
      if (!HOSTNAME_RE.test(url.hostname)) return null;
      return url.href;
    } catch (err) {
      return null;
    }
  }

  function showError() {
    urlInput.classList.add('is-invalid');
    errorEl.hidden = false;
  }

  function clearError() {
    urlInput.classList.remove('is-invalid');
    errorEl.hidden = true;
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
        tile.addEventListener('click', function (e) {
          e.preventDefault();
          openEditDialog(shortcut);
        });
      }

      tile.appendChild(iconBox);

      if (showNames) {
        var label = document.createElement('span');
        label.className = 'shortcut-label';
        label.textContent = shortcut.label;
        tile.appendChild(label);
      }

      shortcutsEl.appendChild(tile);
    });

    addBtn.hidden = list.length >= MAX_SHORTCUTS;
    editBtn.hidden = list.length === 0 && !editing;
    editBtn.textContent = editing ? 'Done' : 'Edit favorites';
    namesToggle.hidden = !editing;
    namesCheckbox.checked = showNames;
  }

  async function refresh() {
    var data = await chrome.storage.local.get([STORAGE_KEY, NAMES_KEY]);
    var list = data[STORAGE_KEY] || [];
    showNames = data[NAMES_KEY] !== false;
    if (list.length === 0) editing = false;
    render(list);
  }

  function openEditDialog(shortcut) {
    editingUrl = shortcut.url;
    urlInput.value = shortcut.url;
    // Only pre-fill Name when it holds an actual custom name — if it just
    // matches the auto-derived hostname, leave it blank so "leave it blank"
    // keeps meaning "auto-derive" even after re-saving.
    var defaultLabel = hostnameOf(shortcut.url);
    nameInput.value = shortcut.label !== defaultLabel ? shortcut.label : '';
    titleEl.textContent = 'Edit shortcut';
    submitBtn.textContent = 'Save';
    clearError();
    dialog.showModal();
    urlInput.focus();
  }

  addBtn.addEventListener('click', function () {
    editingUrl = null;
    urlInput.value = '';
    nameInput.value = '';
    titleEl.textContent = 'Add shortcut';
    submitBtn.textContent = 'Add';
    clearError();
    dialog.showModal();
    urlInput.focus();
  });

  urlInput.addEventListener('input', clearError);

  cancelBtn.addEventListener('click', function () {
    dialog.close();
  });

  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var url = normalizeUrl(urlInput.value);
    if (!url) {
      showError();
      return;
    }

    var list = await loadShortcuts();
    var hostname = hostnameOf(url);
    var customName = nameInput.value.trim();
    var label = customName || hostname;
    var entry = { url: url, label: label, icon: faviconUrl(hostname) };

    var duplicate = list.some(function (s) {
      return hostnameOf(s.url) === hostname && s.url !== editingUrl;
    });
    if (duplicate) {
      dialog.close();
      return;
    }

    if (editingUrl) {
      var idx = list.findIndex(function (s) { return s.url === editingUrl; });
      if (idx === -1) {
        dialog.close();
        return;
      }
      list[idx] = entry;
    } else {
      if (list.length >= MAX_SHORTCUTS) {
        dialog.close();
        return;
      }
      list.push(entry);
    }

    await saveShortcuts(list);
    editingUrl = null;
    dialog.close();
    await refresh();
  });

  editBtn.addEventListener('click', async function () {
    editing = !editing;
    var list = await loadShortcuts();
    render(list);
  });

  namesCheckbox.addEventListener('change', async function () {
    showNames = namesCheckbox.checked;
    await chrome.storage.local.set({ [NAMES_KEY]: showNames });
    var list = await loadShortcuts();
    render(list);
  });

  refresh();
})();
