Privacy Policy for Ember Field New Tab

Last updated: 2026-09-17

## What Data We Collect

Ember Field New Tab does not collect, sell, or transmit any personal data to its developer.

The extension stores two things locally on your device, using the browser's built-in
`chrome.storage.local`, and never sends them anywhere:

- Your selected color palette (e.g. "Ember / Jade")
- The shortcut tiles you add (a URL and label for each, up to five)

The extension also reads your browser's recently-closed-tabs list (via `chrome.sessions`,
a permission you grant at install) to show up to three of them on the new tab page, so you
can quickly reopen one. This list is read live from your browser each time you open a new
tab and is never stored, logged, or transmitted anywhere by the extension. The site icon
shown for each recently-closed tab comes only from Chrome's own cached copy; if Chrome
has no cached icon for a tab, no icon is shown — the extension never requests one from a
third party for a site it didn't explicitly ask you about.

## How Data Is Stored

Locally only, in `chrome.storage.local`. This data lives on your device and is not synced
to Google's servers or any other server. Uninstalling the extension removes it.

## How Data Is Used

- Your palette choice determines the colors of the animated background and interface accents.
- Your shortcut list is rendered as clickable tiles on the new tab page.
- Recently-closed tabs are shown so you can reopen one with a click.

## Third-Party Services

- **DuckDuckGo's icon service** (icons.duckduckgo.com): when you add a shortcut tile, the
  extension requests that site's favicon from this service using only the hostname you
  typed in. This only happens for sites you explicitly add as a shortcut — it is never
  used for recently-closed tabs or any other site you merely visited.
- **Your own default search provider**: the search bar submits your query via Chrome's
  built-in `chrome.search` API, which hands it to whichever search engine you've set as
  default in Chrome's own settings (`chrome://settings/search`) — exactly as if you'd typed
  it into the browser's address bar. The extension does not choose, override, or see the
  provider; it does not see or store your query either.
- **Google Fonts** (fonts.googleapis.com, fonts.gstatic.com): used to load the interface's
  monospace typeface. This is a standard web font request; no personal data is sent beyond
  what any font request over the web normally includes.

## Data Sharing

This extension does not share any data with third parties beyond the font and favicon
requests described above, which are a normal part of how those services work.

## Data Retention and Deletion

Your palette choice and shortcuts remain in local storage until you remove them (via the
"Edit favorites" control, for shortcuts) or uninstall the extension, which clears all
locally stored data.

## Changes to This Policy

If what this extension collects or does changes, this policy will be updated and the "Last
updated" date above will change accordingly.

## Contact

Questions about this policy: open an issue at
https://github.com/TaylorBurke/ember-field-newtab/issues
