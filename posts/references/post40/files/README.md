# Scale as a Coordinate — post package

```
scale-as-a-coordinate.md     the post (Markdown + front matter, KaTeX math)
preview.html                 open this locally to see everything rendered
figures/dark/*.svg           10 figures, dark background
figures/light/*.svg          the same 10, light background
interactive/box-counting.html  embeddable widget (no dependencies)
src/                         the generators, if you want to change anything
```

## Deploying

The post references figures at `/images/scale/…` and the widget at
`/interactive/box-counting.html`. Either copy the files to those paths or
search-and-replace the prefixes to match your site.

Pick one theme directory and copy its contents to `/images/scale/`. The widget
takes `?theme=light` for the light version.

Figures carry `viewBox` plus intrinsic `width`/`height`, so they scale with:

```css
article img { width: 100%; height: auto; }
```

Math is written with `$…$` and `$$…$$`, so the post needs KaTeX or MathJax
enabled. Footnotes use `[^1]` syntax.

## Regenerating

```
cd src && python3 figures.py       # rewrites figures/dark and figures/light
python3 src/build_preview.py # rebuilds preview.html from the Markdown
```

`figures.py` also prints the numerical checks quoted in the post: the fitted
slope over the Cantor staircase, the two plateau slopes of the drifting
example, and the box counts at the lattice scales.

## Type

The figures ask for Latin Modern Roman / CMU Serif and IBM Plex Mono, and fall
back to Georgia and the system monospace. If you already load a serif webfont,
edit `SERIF` and `MONO` at the top of `src/svgkit.py` and regenerate.
