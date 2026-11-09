#!/usr/bin/env bash
# Reproducible processing of the site's binary assets.
#
#   scripts/assets.sh photos "/path/to/Self Image Bank"   # profile photographs
#   scripts/assets.sh logos                                # institutional logos
#   scripts/assets.sh og                                   # social preview image
#
# Outputs are committed to the repository; this script only needs to be re-run
# when a source image changes or a crop is adjusted. Requires ImageMagick 7
# (`magick`) and `cwebp`. All metadata (EXIF, GPS, camera data) is stripped.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# ---------------------------------------------------------------------------
# Profile photographs
#
# Each photo gets two art-directed crops, both framed individually:
#   portrait (4:5) — desktop / tablet hero column
#   square   (1:1) — phones, where a tall frame would push the text too far down
# Crop geometry is WxH+X+Y in source pixels.
# ---------------------------------------------------------------------------
photos() {
  local src="${1:?usage: assets.sh photos <source-dir>}"
  local out="$ROOT/images/profile"
  mkdir -p "$out"

  # name | source file | portrait crop | square crop
  local specs=(
    "formal|Photo Full.JPG|3300x4125+0+0|3000x3000+120+0"
    "coast|Photo Chill.jpeg|960x1200+728+166|1100x1100+658+200"
  )

  for spec in "${specs[@]}"; do
    IFS='|' read -r name file portrait square <<<"$spec"
    for variant in portrait square; do
      local crop widths
      if [[ $variant == portrait ]]; then crop=$portrait; widths="560 840 1120"; else crop=$square; widths="480 720 960"; fi
      local cw=${crop%%x*}
      for w in $widths; do
        (( w > cw )) && w=$cw   # never upscale
        local base="$out/$name-$variant-$w"
        magick "$src/$file" -auto-orient -crop "$crop" +repage -strip \
          -colorspace sRGB -filter Lanczos -resize "${w}x" -unsharp 0x0.6+0.6+0.02 \
          -sampling-factor 4:2:0 -interlace JPEG -quality 82 "$base.jpg"
        cwebp -quiet -q 80 -m 6 -metadata none "$base.jpg" -o "$base.webp"
      done
    done
  done
  ls -la "$out"
}

# ---------------------------------------------------------------------------
# Institutional logos — downloaded from each institution's own website.
# Only mechanical transformations are applied (extraction from a sprite,
# resizing, and for ULisboa the official monochrome mark set in black instead
# of white so it is visible on a light background). Proportions are never
# altered.
# ---------------------------------------------------------------------------
logos() {
  local out="$ROOT/images/logos" tmp
  tmp="$(mktemp -d)"
  mkdir -p "$out"
  local ua="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36"

  # University of Amsterdam — two-line symbol `logo-uva-medium-en` from the uva.nl sprite
  curl -fsSL -A "$ua" "https://www.uva.nl/webfiles/1790927060797/icons/svg-logos.svg" -o "$tmp/uva-sprite.svg"
  python3 -I - "$tmp/uva-sprite.svg" "$out/uva.svg" <<'PY'
import re, sys
s = open(sys.argv[1]).read()
m = re.search(r'<symbol id="logo-uva-medium-en" viewBox="([^"]+)"[^>]*>(.*?)</symbol>', s, re.S)
vb = m.group(1); w, h = vb.split()[2:]
open(sys.argv[2], "w").write(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="{w}" height="{h}" role="img" aria-label="University of Amsterdam">'
    f'{m.group(2).strip()}</svg>\n')
PY

  # Instituto Superior Técnico — the header logo of tecnico.ulisboa.pt
  curl -fsSL -A "$ua" "https://tecnico.ulisboa.pt/pt/" -o "$tmp/tecnico.html"
  python3 -I - "$tmp/tecnico.html" "$out/tecnico.svg" <<'PY'
import sys
s = open(sys.argv[1]).read()
i = s.find('logo-desktop'); j = s.find('<svg', i); k = s.find('</svg>', j) + 6
svg = s[j:k]
if 'xmlns=' not in svg:
    svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"', 1)
open(sys.argv[2], "w").write(svg + "\n")
PY

  # Universidade de Lisboa — official monochrome logo (published in white)
  curl -fsSL -A "$ua" "https://www.ulisboa.pt/themes/custom/ulisboa/logo.svg" -o "$tmp/ulisboa.svg"
  sed 's/fill: #fff;/fill: #000;/' "$tmp/ulisboa.svg" > "$out/ulisboa.svg"

  # Grupo de Física Matemática — logo from gfm.cii.fc.ul.pt (only raster available)
  curl -fsSL -A "$ua" "http://gfm.cii.fc.ul.pt/gfm-logo.png" -o "$out/gfm.png"

  # Computational Science Lab — logo from uva.computationalscience.nl
  curl -fsSL -A "$ua" "https://uva.computationalscience.nl/main/logo_hu_31a210092e84b95f.png" -o "$tmp/csl.png"
  magick "$tmp/csl.png" -strip -filter Lanczos -resize 640x "$out/csl.png"
  cwebp -quiet -q 90 -alpha_q 100 -metadata none "$out/csl.png" -o "$out/csl.webp"

  rm -rf "$tmp"
  ls -la "$out"
}

# ---------------------------------------------------------------------------
# Social preview image (1200×630), rendered from scripts/og-card.html with
# headless Chrome so it uses the site's own fonts and colours.
# ---------------------------------------------------------------------------
og() {
  local chrome="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
  local out="$ROOT/images/og" tmp
  tmp="$(mktemp -d)"
  mkdir -p "$out"
  "$chrome" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --user-data-dir="$tmp/profile" --window-size=1200,630 --virtual-time-budget=3000 \
    --allow-file-access-from-files --screenshot="$tmp/og.png" "file://$ROOT/scripts/og-card.html" 2>/dev/null
  magick "$tmp/og.png" -strip -quality 86 -interlace JPEG "$out/default.jpg"
  rm -rf "$tmp"
  ls -la "$out"
}

case "${1:-}" in
  photos) shift; photos "$@" ;;
  logos) logos ;;
  og) og ;;
  *) echo "usage: $0 photos <source-dir> | logos | og" >&2; exit 1 ;;
esac
