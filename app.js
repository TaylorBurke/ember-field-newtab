(async function () {
  var data = await chrome.storage.local.get('palette');
  var paletteId = data.palette || EMBER_FIELD_DEFAULT_PALETTE;
  var palette = EMBER_FIELD_PALETTES[paletteId] || EMBER_FIELD_PALETTES[EMBER_FIELD_DEFAULT_PALETTE];

  document.documentElement.style.setProperty('--accent', palette.accent);
  document.documentElement.style.setProperty('--accent-secondary', palette.hues[0]);

  window.emberField = PerlinCanvas.mount(document.getElementById('field'), {
    hues: palette.hues,
    hueGamma: palette.hueGamma,
    cellSize: 11,
    speed: 1,
    density: 1
  });
})();
