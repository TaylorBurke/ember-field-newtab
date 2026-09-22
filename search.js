(function () {
  var form = document.getElementById('searchForm');
  var input = form.querySelector('.search-input');

  // Folds the advanced-search panel's modifiers (advanced-search.js) into the
  // query text using standard search-operator syntax that Google, Bing,
  // DuckDuckGo, Brave, etc. all already honor — chrome.search.query() has no
  // structured params for this, only a single "text" string.
  function buildQuery(text, opts) {
    var parts = [text];
    if (opts.exact) parts.push('"' + opts.exact.replace(/"/g, '') + '"');
    if (opts.site) parts.push('site:' + opts.site.replace(/^https?:\/\//i, '').replace(/\/.*$/, '').trim());
    if (opts.filetype) parts.push('filetype:' + opts.filetype.replace(/^\./, '').trim());
    if (opts.exclude) {
      opts.exclude.split(/\s+/).filter(Boolean).forEach(function (term) {
        parts.push('-' + term);
      });
    }
    return parts.join(' ').trim();
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var text = input.value.trim();
    if (!text) return;

    var opts = window.emberFieldSearchOptions || { disposition: 'CURRENT_TAB' };

    // Routes the query through the user's own default search provider
    // (chrome://settings/search) instead of a hardcoded destination, so the
    // extension never overrides that choice.
    chrome.search.query({ text: buildQuery(text, opts), disposition: opts.disposition || 'CURRENT_TAB' });
  });
})();
