# Ember Field New Tab

A Chrome extension that replaces the new tab page with a live, animated
ember/jade Perlin-noise field — plus a minimal search bar and up to
five favicon shortcuts you manage yourself.

Built on [perlin-canvas](https://github.com/TaylorBurke/perlin-canvas), the
same dependency-free noise-driven "lamp grid" background engine, vendored
here (`main.js`) so the extension is fully self-contained.

## What it does

- **Animated background.** The full generative field, running live and
  continuously — no fixed loop, no video file.
- **Search, your way.** A centered search bar that routes your query through
  the [Chrome Search API](https://developer.chrome.com/docs/extensions/reference/api/search),
  so it always goes to whichever default search provider you've picked in
  Chrome's own settings — the extension never overrides that choice.
- **Up to 5 shortcuts.** Click the `+` tile below the search bar, type a URL,
  and it's saved with its favicon (via DuckDuckGo's icon service) using
  `chrome.storage.local`. The `+` tile disappears once you hit five.
- **Edit favorites.** A small link in the bottom-left corner toggles edit
  mode, showing a remove button on each shortcut tile.

## Installing

This isn't on the Chrome Web Store (yet — see below). To use it locally:

1. Clone this repo.
2. Go to `chrome://extensions`, enable **Developer mode**.
3. Click **Load unpacked** and select the repo folder.
4. Open a new tab.

## Project layout

```
manifest.json    Manifest V3, chrome_url_overrides.newtab
newtab.html      Page markup: canvas, search form, shortcuts row, add dialog
style.css        All styling
main.js          Vendored copy of perlin-canvas's noise-field engine
app.js           Mounts the field with this extension's palette/pacing
shortcuts.js     Shortcut add/remove/render logic, backed by chrome.storage
search.js        Submits the search bar via chrome.search, the user's default provider
```

## License

MIT — see [LICENSE](LICENSE).
