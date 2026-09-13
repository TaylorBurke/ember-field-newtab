# Chrome Web Store Listing — Ember Field New Tab

> Last Updated: 2026-09-13

## Store Listing

**Extension Name**
Ember Field New Tab

**Short Description**
Replace new tab with a live animated color field, quick Ecosia search, and up to 5 shortcut tiles.

**Detailed Description**
Replaces your new tab page with a continuously animated, generative color field, a fast search bar, and quick access to your favorite sites.

FEATURES
• Live animated background — a smooth, ever-changing generative color field, not a static image or video loop
• Six built-in color palettes (Ember/Jade, Cobalt/Orchid, Rose/Gold, Sunset, Forest, Slate) — pick one and the whole interface, including the search highlight, adopts it
• One-click Ecosia search bar right on the new tab page
• Up to 5 shortcut tiles to your favorite sites, each with its site icon
• A "Recently closed" panel showing your last 3 closed tabs so you can reopen one with a click

HOW TO USE
1. Open a new tab — the animated background loads automatically
2. Click the "+" tile to add a shortcut, or the palette icon (bottom right) to change colors
3. Click "Edit favorites" (bottom left) to remove a shortcut
4. Click any tab in "Recently closed" to reopen it

PRIVACY
This extension does not collect or transmit any personal data. Your palette choice and shortcuts are stored only on your device. See the full privacy policy for details on the two third-party services used (a favicon lookup service and Ecosia search).

SUPPORT
Found a bug or have a suggestion? Open an issue at https://github.com/TaylorBurke/ember-field-newtab/issues

Version 1.1 — Added a "Recently closed tabs" panel and made the search bar's focus highlight follow the selected color palette.

**Category**
Productivity

**Single Purpose**
Replaces the new tab page with an animated background, a search bar, shortcut tiles, and quick access to recently closed tabs.

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

## Privacy & Data Use

### Data Collection

**Does the extension collect user data?** No

The extension stores the user's own palette choice and shortcut list locally via
`chrome.storage.local`; this never leaves the device and is not collection by the
developer. See `PRIVACY.md` for full detail, including the two third-party network
requests the extension makes (a favicon lookup and the user's own Ecosia search
submission) — neither involves personally identifiable data.

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
| 1.1 | 2026-09-13 | Added "Recently closed tabs" panel (new `sessions` permission); search bar focus highlight now follows the selected palette's accent color; added store icons and screenshots. | Draft |
| 1.0 | 2026-09-12 | Initial version: animated field background, Ecosia search, up to 5 shortcuts, 6 color palettes. | Draft (never submitted) |

## Review Notes

### Known Issues / Limitations
- No promo tiles yet (small 440×280 or marquee 1400×560) — not required for initial submission, only for featured placement eligibility.
- Privacy policy is hosted as a GitHub blob URL rather than GitHub Pages. Works fine, but if the review team ever flags it, switching to a GitHub Pages URL (Settings → Pages → deploy from `master` branch, `/` root or a `docs/` folder) is a quick fix.
- Recently-closed panel needs at least one closed tab in the browser's session history to show anything — on a completely fresh browser profile it stays hidden. This is expected behavior, not a bug, but worth knowing if a reviewer sees an "empty" new tab page.

### Rejection History
None yet — this extension has not been submitted.
