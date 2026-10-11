#!/usr/bin/env bash
# Sync corpus data from the canonical source (Atmavictu/canon) into public/canon.
# Usage: ./scripts/sync-canon.sh [path-to-Atmavictu-repo]
# Default: assumes sibling checkout of Atmavictu next to this repo.

set -euo pipefail

ATMAVICTU_DIR="${1:-$(dirname "$0")/../../../Atmavictu}"
CANON_SRC="$ATMAVICTU_DIR/canon"
CANON_DST="$(dirname "$0")/../public/canon"

if [ ! -d "$CANON_SRC" ]; then
  echo "Canonical corpus not found at: $CANON_SRC"
  echo "Usage: $0 [path-to-Atmavictu-repo]"
  exit 1
fi

mkdir -p "$CANON_DST"
cp "$CANON_SRC"/*.json "$CANON_DST/"
echo "Synced corpus JSON from $CANON_SRC -> $CANON_DST"
ls -1 "$CANON_DST"
