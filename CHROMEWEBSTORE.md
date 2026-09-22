# Chrome Web Store Listing — Ember Field New Tab

> Last Updated: 2026-09-17

## Store Listing

**Extension Name**
Ember Field New Tab

**Short Description**
Replace new tab with a live animated color field, a search bar using your default engine, and up to 5 shortcut tiles.

**Detailed Description**
Replaces your new tab page with a continuously animated, generative color field, a fast search bar, and quick access to your favorite sites.

FEATURES
• Live animated background — a smooth, ever-changing generative color field, not a static image or video loop
• Six built-in color palettes (Ember/Jade, Cobalt/Orchid, Rose/Gold, Sunset, Forest, Slate) — pick one and the whole interface, including the search highlight, adopts it
• Search bar right on the new tab page — submits through the Chrome Search API to whichever default search provider you've already chosen in Chrome, never a hardcoded one
• Up to 5 shortcut tiles to your favorite sites, each with its site icon
• A "Recently closed" panel showing your last 3 closed tabs so you can reopen one with a click

HOW TO USE
1. Open a new tab — the animated background loads automatically
2. Click the "+" tile to add a shortcut, or the palette icon (bottom right) to change colors
3. Click "Edit favorites" (bottom left) to remove a shortcut
4. Click any tab in "Recently closed" to reopen it

PRIVACY
This extension does not collect or transmit any personal data. Your palette choice and shortcuts are stored only on your device. See the full privacy policy for details on the third-party service used (a favicon lookup service) and how search queries are routed to your own default provider via the Chrome Search API.

SUPPORT
Found a bug or have a suggestion? Open an issue at https://github.com/TaylorBurke/ember-field-newtab/issues

Version 1.2 — Search bar now routes queries through the Chrome Search API to the user's own default search provider, instead of a hardcoded destination, per Chrome Web Store single-purpose policy feedback.
Version 1.1 — Added a "Recently closed tabs" panel and made the search bar's focus highlight follow the selected color palette.

**Category**
Productivity

**Single Purpose**
Replaces the new tab page with an animated background, shortcut tiles, and quick access to recently closed tabs. The search bar is a thin, native front-end onto the user's own already-chosen default search provider (via the Chrome Search API) — it does not add or change a search experience of its own.

**Primary Language**
English

## Graphics & Assets

| Asset | Dimensions | Status | Filename |
|-------|-----------|--------|----------|
| Store Icon | 128×128 PNG | ✅ Ready | icons/icon-128.png |
| Screenshot 1 | 1280×800 | ✅ Ready | store-assets/screenshot-1-newtab.png |
| Screenshot 2 | 1280×800 | ✅ Ready | store-assets/screenshot-2-palettes.png |
| Small Promo Tile | 440×280 | ⬜ Not created | |
| Marquee Promo Tile | 1400×560 | ⬜ Not created | |

### Screenshot Notes
- Screenshot 1: default view showing the animated field, search bar, three shortcut tiles plus the add button, and the "Recently closed" panel with three sample entries.
- Screenshot 2: the color palette picker open, showing all six palettes with live preview swatches.
- A 512×512 source icon (`store-assets/icon-512.png`) is available if a larger promo asset is needed later.

## Permissions Justification

| Permission | Type | Justification |
|------------|------|---------------|
| storage | permissions | Saves the user's selected color palette and up to five custom shortcut tiles locally on their device (`chrome.storage.local`), so these preferences persist between new tab sessions. No data leaves the device. |
| sessions | permissions | Reads the browser's list of recently closed tabs (`chrome.sessions.getRecentlyClosed`) to show up to three of them on the new tab page, and reopens one when the user clicks it (`chrome.sessions.restore`). Nothing from this list is stored or transmitted by the extension. |
| tabs | permissions | Required alongside `sessions` — without it, Chrome withholds each recently-closed tab's title, URL, and favicon from every extension (only an opaque session ID is shared). Used solely to display that information for the up-to-three recently-closed tabs shown on the new tab page; the extension does not read, log, or transmit data about the user's other open tabs. |
| search | permissions | Submits the new tab page's search bar query via `chrome.search.query`, which Chrome routes to the user's own default search provider (set in `chrome://settings/search`). The extension does not read the result or pick the provider itself. |

## Privacy & Data Use

### Data Collection

**Does the extension collect user data?** No

The extension stores the user's own palette choice and shortcut list locally via
`chrome.storage.local`; this never leaves the device and is not collection by the
developer. See `PRIVACY.md` for full detail, including the third-party network
request the extension makes directly (a favicon lookup) and how the search bar's
query is handed off to the user's own default search provider via the Chrome
Search API — the extension itself never sees or stores the query.

### Data Use Certification
- [x] Data is NOT sold to third parties
- [x] Data is NOT used for purposes unrelated to the extension's core functionality
- [x] Data is NOT used for creditworthiness or lending purposes

## Privacy Policy

**Privacy Policy URL**
https://github.com/TaylorBurke/ember-field-newtab/blob/master/PRIVACY.md

(Source file: `PRIVACY.md` in this repo. A GitHub Pages URL is a nicer long-term option — see Review Notes — but the direct GitHub blob URL is live and publicly accessible right now.)

## Distribution

**Visibility**: Public
**Regions**: All regions

## Publishing Automation

`.github/workflows/publish.yml` runs `package-extension.sh` and uploads the resulting
zip to the Chrome Web Store as a **draft** on every push to `main` (it never calls the
`publish` subcommand — a human still clicks "Publish" in the dashboard after reviewing
the draft).

**One-time manual setup still needed before this workflow will succeed** (tracked in
[issue #1](https://github.com/TaylorBurke/ember-field-newtab/issues/1)):
- [x] First listing already live on the Chrome Web Store (the API can only update an
      existing listing, not create the first one)
- [x] Google Cloud OAuth 2.0 client ID (Desktop app type)
- [x] Refresh token generated via the Chrome Web Store API scope
- [x] Repo secrets set: `EXTENSION_ID`, `CLIENT_ID`, `CLIENT_SECRET`, `REFRESH_TOKEN`

All one-time setup is complete as of 2026-09-22. The workflow is ready to run on the
next push to `main`.

## Developer Info

**Publisher Name**
Taylor Burke

**Contact Email**
twillyb@gmail.com

**Support URL**
https://github.com/TaylorBurke/ember-field-newtab/issues

**Homepage URL**
https://github.com/TaylorBurke/ember-field-newtab

## Version History

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| 1.3.5 | 2026-09-22 | Clicking a recently-closed tab now replaces the new-tab-page tab instead of opening a second tab alongside it; hovering a recently-closed row now always shows the full URL in the tooltip (previously the page title when available). | Draft |
| 1.3.4 | 2026-09-22 | Fixed "Show site name" toggle showing outside Edit favorites mode. Added the `tabs` permission — the recently-closed-tabs panel has been unable to show real titles/URLs/favicons since it was introduced in 1.1 (Chrome withholds that data from `chrome.sessions` without `tabs`); this restores it for real. See PRIVACY.md and the Permissions Justification table for the updated disclosure. | Draft |
| 1.3.3 | 2026-09-22 | Fixed low-contrast text in the Advanced search "Open in" dropdown; the search submit button's hover color now follows the selected palette (a real secondary accent, not hardcoded orange); added a "Show site name" toggle in Edit favorites for icon-only tiles. | Draft |
| 1.3.2 | 2026-09-22 | Replaced the search caret's cosmetic service picker with a functional "Advanced search" panel (site/domain restrict, exact phrase, exclude terms, file type, open-in tab/window) that folds into the query sent via `chrome.search.query`. | Draft |
| 1.3.1 | 2026-09-22 | Fixed: recently-closed rows with no valid tab URL (Chrome can return these without the `tabs` permission) no longer render a blank row; panel stays hidden if no valid entries remain. | Draft |
| 1.3 | 2026-09-22 | UI polish pass: "Add shortcut" now validates the URL instead of accepting plain text; shortcuts can be named (or left to auto-derive from hostname) and edited in place; recently-closed rows with no favicon show a globe glyph instead of a blank box; the favorites row, recent-tabs panel, and "Edit favorites" link now share the search bar's frosted-glass look; hover/accent colors follow the selected palette instead of always jade; the search bar's decorative icon is now a caret that opens a display-only search-service picker. | Draft |
| 1.2.1 | 2026-09-22 | No functional change — version bump to smoke-test the new auto-publish GitHub Actions workflow (issue #1). | Draft |
| 1.2 | 2026-09-17 | Rewired the search bar to submit via `chrome.search.query` (new `search` permission) instead of a hardcoded action to ecosia.org, to resolve the single-purpose rejection below. | Draft |
| 1.1 | 2026-09-13 | Added "Recently closed tabs" panel (new `sessions` permission); search bar focus highlight now follows the selected palette's accent color; added store icons and screenshots. | Rejected |
| 1.0 | 2026-09-12 | Initial version: animated field background, Ecosia search, up to 5 shortcuts, 6 color palettes. | Draft (never submitted) |

## Review Notes

### Known Issues / Limitations
- No promo tiles yet (small 440×280 or marquee 1400×560) — not required for initial submission, only for featured placement eligibility.
- Privacy policy is hosted as a GitHub blob URL rather than GitHub Pages. Works fine, but if the review team ever flags it, switching to a GitHub Pages URL (Settings → Pages → deploy from `master` branch, `/` root or a `docs/` folder) is a quick fix.
- Recently-closed panel needs at least one closed tab in the browser's session history to show anything — on a completely fresh browser profile it stays hidden. This is expected behavior, not a bug, but worth knowing if a reviewer sees an "empty" new tab page.

### Rejection History

**v1.1 — rejected 2026-09-17.**
> Violation: Making changes to both the browser new tab page and the user's search
> experience.
>
> How to rectify: Modify your extension to provide a single functionality. If your
> new tab page includes a search experience, it must respect the user's selected
> settings by using the Chrome Search API. If you wish to modify both the new tab
> page and the default search provider, you must do so in separate extensions.
>
> Relevant section of the program policy: An extension must have a single purpose
> that is narrow and easy-to-understand. Do not create an extension that requires
> users to accept bundles of unrelated functionality.

Fix (shipped in 1.2): the search bar no longer posts to a hardcoded `ecosia.org`
form action. It now calls `chrome.search.query()`, which Chrome routes to whatever
default search provider the user has already selected — the extension no longer
makes a search-provider choice of its own, so it stays within a single purpose
(new tab replacement) rather than bundling in a second one.
