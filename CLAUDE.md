# CLAUDE.md

Guidance for Claude Code sessions working in this repository.

## Project overview

"Atmosfera i chmury dla ciekawych" — a Polish-language static HTML book about the
sky: why it changes colour, how clouds form, and why they differ. 24 numbered
chapters in seven parts, 26 lettered appendices (A–Z), and three "field" pages
meant to be opened on a phone outdoors. Live at
https://bartoszskrzypiec.github.io/atmosfera_chmury_book/.

**The reader is the whole design constraint.** Roughly 40 years old, comfortable
with technology, did not enjoy physics at school and remembers none of it. Not a
technical artist — this is the one book in this family that does not assume a
DCC background. Every consequence below follows from that.

This is a living project, not a one-shot publication. Don't build generated
structures (auto-built indexes, templating) that would need rebuilding on every
content change.

## The rules that make this book what it is

1. **No formulas in main chapter text. None.** Not one. Formulas live in two
   places only: inside "Wyjaśnij ten wzór" modals, and in appendices marked
   [WZORY] in the index. A reader must be able to finish all 24 chapters without
   meeting a single equation.
2. **Narration is "my", not "ty".** "Patrzymy w niebo", "weźmy kroplę wody",
   "policzmy". This differs deliberately from the sibling books, which use a
   masculine second person ("poznałeś", "dotknąłeś"). Two reasons: this book's
   reader is anyone who looks up, and "my" avoids gendering them. Do not drift
   back into "ty" — it reads as a different book.
3. **Numbers are metric and Polish-formatted.** Decimal comma, including inside
   JavaScript readouts (`.toFixed(1).replace('.', ',')` — the sibling books do
   the same). Heights in km, sizes in µm, temperatures in °C.
4. **Every technical term is defined at first use, in the sentence that uses
   it** — not in the glossary and not later. The glossary is a reminder, never
   the first introduction.
5. **Zero raster images.** No .png/.jpg anywhere. Everything is inline SVG,
   Canvas2D, or a three.js widget. This is inherited from the sibling books and
   keeps the repo greppable and diffable.

## Colour semantics

Same hex values as the sibling books (one visual family), different meanings —
consistent across all ~120 visualisations so the reader stops needing legends:

| Token | Means, in this book |
|---|---|
| `--amber` `#e8a33d` | **light** — a sun ray, the warm end of the spectrum, sunset |
| `--cyan` `#4fc3c0` | **water and air** — droplets, vapour, scattered blue |
| `--violet` `#9c82d8` | **ice** — crystals, high cloud, halos. Also the "go deeper" affordance |
| `--raster` `#6e93be` | **cold air** — air masses on front diagrams |

Inline SVG hardcodes these hexes; CSS `var()` does not reach SVG presentation
attributes.

## No build system

Pure static HTML/CSS/JS. No npm, no package.json, no bundler, no test suite, no
linter. To "run" it, open a file, or serve the root with any static server.
Deployed via GitHub Pages (`main` / `/(root)`).

One caveat: the 3D widgets are ES modules, so pages carrying one need a real
server — `file://` blocks the import. Every other page opens straight off disk.

## The one external dependency

**three.js, vendored into `assets/vendor/`, never loaded from a CDN.** The
sibling books have zero dependencies and say so; this book has exactly one, and
takes it on these terms:

- The build files are committed to the repo. No CDN, no external request, no
  version drift. The book works offline and will still work in ten years.
- The version is pinned; see `assets/vendor/VERSION`.
- Refresh it with `npm pack three@<version>`, unpack, copy `build/three.module.js`
  and `build/three.core.js`. Do not add a package.json — there is still no build
  step, and nothing here is installed.
- Loaded via an import map in the `<head>` of pages that need it.

Why the exception exists: this book's central claim is that the sky's colours,
the sunset and cloud types are all one mechanism seen under different
conditions. A diagram can assert that; only a live render where one slider moves
the sun and the whole sky follows can demonstrate it. Everywhere a static or
slider-driven SVG suffices, use SVG — the 3D budget is deliberately capped at
eleven widgets in the whole book.

## Structure

```
index.html                              — spis treści, root only
rozdzialy/rozdzial-NN-slug.html         — 24 chapters, NN zero-padded 01–24
dodatki/dodatek-x-slug.html             — 26 appendices, x = a–z
teren/klucz-rozpoznawania-chmur.html    — interactive cloud identification tree
teren/kalendarz-nieba.html              — what to look for, month by month (Poland)
teren/sciaga-prognoza-z-nieba.html      — "you see X → in Y hours, Z"
assets/style.css                        — the single shared stylesheet
assets/interactive.js                   — formula modals + .vec[data-tip] tooltips
assets/sky3d.js                         — the 3D widget engine
assets/vendor/                          — three.js build files + VERSION
```

## Content authoring rules

Inherited from `raytracing-book`, which these conventions come from:

- **Never rename or reletter appendices** without asking. Prose cross-references
  ("Dodatek J", "Dodatek R") are scattered by *name* across other files.
- **Every appendix's `.viewport-readout` carries an `EXT OF` line** naming the
  chapter(s) it extends. That line is the source of truth for cross-linking —
  don't infer relationships from titles. The reverse mapping is what fills each
  chapter's `.deeper` block; the two must stay in sync.
- **Formulas must define their symbols** — in the `.sub` span or in the prose
  beside them. This matters more here than in the sibling books, because a
  reader who reaches a formula at all has opted in from a much lower base.
- **File names and in-text numbering are decoupled.** Renaming a file must never
  change "Rozdział 12" inside content.
- Navigation is hand-maintained per page. The `topnav` links and the bottom
  `.site-nav.chapter-nav` are duplicates of the same three targets — keep them
  identical.

## Block vocabulary

Beyond the shared blocks (`.panel` TL;DR / `.panel.practice` "Z praktyki" /
`.panel.glossary` "Słowniczek" / `.next` "Co dalej" / `.deeper` "Idź głębiej"),
this book adds one of its own:

- **`.myth`** — a struck-through false belief, then the true one, then why the
  false one is so sticky. Reserved for genuinely widespread misconceptions
  ("niebo jest niebieskie od oceanu", "chmura to para wodna", "chmury są
  lekkie"). Don't dilute it with mild clarifications; it works because it is
  rare and always about something the reader probably believes right now.

Chapter page order is fixed: `topnav` → `.viewport-readout` → `.eyebrow` → `h1`
→ `.subtitle` → TL;DR (exactly 3 bullets) → `.section` × 2–6 → "Z praktyki" →
"Słowniczek" → "Co dalej" → "Idź głębiej" → `.site-nav` → `.modal-overlay` if
used.

## Git workflow

Commit and push after each logical unit without asking. Commit messages are
ASCII-only (no Polish diacritics) to sidestep console encoding issues; page
*content* always uses full, correct Polish diacritics. Never force-push or
rewrite history without asking.
