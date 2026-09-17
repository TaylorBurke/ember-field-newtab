(function () {
  var form = document.getElementById('searchForm');
  var input = form.querySelector('.search-input');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var text = input.value.trim();
    if (!text) return;

    // Routes the query through the user's own default search provider
    // (chrome://settings/search) instead of a hardcoded destination, so the
    // extension never overrides that choice.
    chrome.search.query({ text: text, disposition: 'CURRENT_TAB' });
  });
})();
