(function () {
  var caretBtn = document.getElementById('searchCaretBtn');
  var dialog = document.getElementById('advancedSearchDialog');
  var form = document.getElementById('advancedSearchForm');
  var siteInput = document.getElementById('advSite');
  var exactInput = document.getElementById('advExact');
  var excludeInput = document.getElementById('advExclude');
  var filetypeInput = document.getElementById('advFiletype');
  var dispositionSelect = document.getElementById('advDisposition');
  var cancelBtn = document.getElementById('cancelAdvanced');

  // Read by search.js when it calls chrome.search.query() — the only place
  // these modifiers can actually reach the search provider is folded into
  // the query text itself (site:, filetype:, "exact phrase", -exclude are
  // standard query syntax nearly every engine already honors), except for
  // disposition, which chrome.search.query() supports as a real parameter.
  window.emberFieldSearchOptions = {
    site: '',
    exact: '',
    exclude: '',
    filetype: '',
    disposition: 'CURRENT_TAB'
  };

  function hasActiveOptions(opts) {
    return !!(opts.site || opts.exact || opts.exclude || opts.filetype || opts.disposition !== 'CURRENT_TAB');
  }

  function syncCaretState() {
    caretBtn.classList.toggle('is-active', hasActiveOptions(window.emberFieldSearchOptions));
  }

  caretBtn.addEventListener('click', function () {
    var opts = window.emberFieldSearchOptions;
    siteInput.value = opts.site;
    exactInput.value = opts.exact;
    excludeInput.value = opts.exclude;
    filetypeInput.value = opts.filetype;
    dispositionSelect.value = opts.disposition;
    dialog.showModal();
    siteInput.focus();
  });

  cancelBtn.addEventListener('click', function () {
    dialog.close();
  });

  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    window.emberFieldSearchOptions = {
      site: siteInput.value.trim(),
      exact: exactInput.value.trim(),
      exclude: excludeInput.value.trim(),
      filetype: filetypeInput.value.trim(),
      disposition: dispositionSelect.value
    };
    syncCaretState();
    dialog.close();
  });
})();
