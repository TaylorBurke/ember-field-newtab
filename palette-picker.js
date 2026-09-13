(function () {
  var btn = document.getElementById('paletteBtn');
  var swatch = document.getElementById('paletteBtnSwatch');
  var dialog = document.getElementById('paletteDialog');
  var list = document.getElementById('paletteList');

  function gradientFor(hues) {
    return 'linear-gradient(90deg, ' + hues.join(', ') + ')';
  }

  function buildList(activeId) {
    list.innerHTML = '';
    Object.keys(EMBER_FIELD_PALETTES).forEach(function (id) {
      var palette = EMBER_FIELD_PALETTES[id];

      var item = document.createElement('button');
      item.type = 'button';
      item.className = 'palette-option';
      if (id === activeId) item.classList.add('is-active');

      var preview = document.createElement('span');
      preview.className = 'palette-preview';
      preview.style.background = gradientFor(palette.hues);

      var label = document.createElement('span');
      label.className = 'palette-name';
      label.textContent = palette.name;

      item.appendChild(preview);
      item.appendChild(label);

      item.addEventListener('click', async function () {
        await chrome.storage.local.set({ palette: id });
        if (window.emberField) {
          window.emberField.setOptions({ hues: palette.hues, hueGamma: palette.hueGamma });
        }
        swatch.style.background = gradientFor(palette.hues);
        dialog.close();
      });

      list.appendChild(item);
    });
  }

  async function init() {
    var data = await chrome.storage.local.get('palette');
    var activeId = data.palette || EMBER_FIELD_DEFAULT_PALETTE;
    swatch.style.background = gradientFor(EMBER_FIELD_PALETTES[activeId].hues);
    buildList(activeId);
  }

  btn.addEventListener('click', async function () {
    var data = await chrome.storage.local.get('palette');
    buildList(data.palette || EMBER_FIELD_DEFAULT_PALETTE);
    dialog.showModal();
  });

  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });

  init();
})();
