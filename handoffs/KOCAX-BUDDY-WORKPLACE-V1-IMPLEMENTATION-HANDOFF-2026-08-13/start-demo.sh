#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
command -v node >/dev/null 2>&1 || { echo "Node.js 24 or newer is required." >&2; exit 1; }
[ -d node_modules ] || npm ci
npm run dev
