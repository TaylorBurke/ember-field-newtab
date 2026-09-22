#!/bin/bash
# package-extension.sh — Creates a clean ZIP for Chrome Web Store submission
set -euo pipefail
cd "$(dirname "$0")"

EXTENSION_NAME="ember-field-newtab"
VERSION=$(node -p "require('./manifest.json').version")
OUTPUT="${EXTENSION_NAME}-v${VERSION}.zip"

rm -f "$OUTPUT"

zip -r "$OUTPUT" . \
  -x ".git/*" \
  -x ".github/*" \
  -x ".gitignore" \
  -x "store-assets/*" \
  -x "CHROMEWEBSTORE.md" \
  -x "PRIVACY.md" \
  -x "README.md" \
  -x "LICENSE" \
  -x "package-extension.sh" \
  -x "*.zip" \
  -x ".DS_Store" \
  -x "Thumbs.db"

echo "Packaged: $OUTPUT ($(du -h "$OUTPUT" | cut -f1))"
