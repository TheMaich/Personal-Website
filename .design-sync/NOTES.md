# design-sync notes — Spritz Consulting

## Status: first sync completed 2026-08-10

33 exports imported; 15 with authored preview cards, 18 on the floor card
(authorable incrementally on any later re-sync).

## Verification level — READ THIS FIRST on re-sync

**Playwright was deliberately not installed** (user declined the ~200MB
download). Consequences, both expected, neither a defect to chase:

- `package-validate.mjs` must be run with `--no-render-check`, and prints
  `[RENDER_SKIPPED]`. Renders are not machine-verified.
- `package-capture.mjs` **cannot run at all** (`playwright not installed`), so
  the driver's capture stage exits 2 and `.resync-verdict.json` reports
  `ok: false` **even when build + diff + validate all pass**. Check
  `stages.*.ok` individually rather than trusting the top-level `ok`.
- There are therefore **no `.grade.json` verdicts**. Cards were verified by
  eye instead (agent-driven Chrome + the user reviewing `.review.html`).

Installing playwright in `.ds-sync/` at any later point upgrades all of this
and makes the normal graded flow work.

### Known render warns (expected — don't treat as new)

- `[FONT_MISSING]` for **SF Pro Text / SF Pro Display / Impact /
  Haettenschweiler / Arial Narrow**. These are the *fallback tiers* of
  `--spz-sans` and `--spz-mono`, exactly as `index.html` declares them. Both
  **brand** faces (Bricolage Grotesque, Bebas Neue) ship as woff2 and are
  verified loading. SF Pro is Apple-licensed and must not be redistributed —
  the system stack resolving it natively on macOS is the intended behaviour.
  Do **not** "fix" this by shipping substitutes.
- `[RENDER_SKIPPED]` — see above.

## What this repo is

A hand-written static site (`index.html`, ~4.6k lines, 4 inline `<style>`
blocks) plus article/tool pages under `resources/`. There was **no component
library** — `design-system/` was created for this sync by extracting the site's
real markup and CSS. The static site does **not** consume the package, by
explicit decision.

- Source of truth for tokens: `index.html` `:root` / `html[data-theme="light"]`,
  mirrored in `DESIGN.json` + `DESIGN.md`.
- `DESIGN.json` `components[]` holds 10 curated components (resources/tools
  surface) with `html` + `css`. Its CSS has **dark-theme hexes baked in** — the
  library deliberately re-expresses those as `var(--spz-*)` so light theme works.
  Don't copy that CSS verbatim.

## Gotchas already paid for (don't rediscover these)

- **Node was not installed on this machine.** Installed via `brew install node`
  (26.7.0). No `.nvmrc`, no repo-level `package.json`.
- **npm blocks esbuild's postinstall** by default here. After `npm install`, run
  `npm install-scripts approve esbuild` or the native binary is missing and both
  the library build and the converter fail.
- **Reset specificity**: the library's reset is wrapped in `:where(.spz-root)`.
  Scoping it as plain `.spz-root button` (0,1,1) outranks `.spz-btn--primary`
  (0,1,0) and silently strips the fill off every button-based component. If a
  component ever renders unstyled-but-present, check this first.
- **Testimonial layering** mirrors `initTestimonials()` in `index.html`: z-index
  by circular distance from the active index. Without it inactive cards paint
  over the active one and the logo doesn't match the quote.
- **Fonts are self-hosted** in `design-system/src/fonts/` (Bricolage Grotesque
  variable + Bebas Neue, woff2, pulled from Google Fonts). The **variable** file
  must be kept — the whole system uses `font-variation-settings: "opsz" N`, and
  a static instance loses the display cut. Verified rendering with the Google
  Fonts link removed, so `[FONT_MISSING]` should not fire.
- Preview harness used during authoring: `design-system/preview/` + a static
  server from the repo root (the demo references `/assets/*.png`).

## Config — verified working

`cfg` path fields resolve against the **package dir** (`design-system/`), not
the repo root. The working invocation, from the repo root:

```sh
node .ds-sync/resync.mjs --config .design-sync/config.json \
  --node-modules design-system/node_modules \
  --entry design-system/dist/index.js --out ./ds-bundle --no-render-check
```

- `--entry` is required: npm won't self-install the package into its own
  `node_modules`, so there's no `node_modules/@spritz/design-system` to resolve.
- `cfg.provider` is **`SpritzRoot`** and is load-bearing. All tokens are scoped
  to `.spz-root`; without the provider every card renders unstyled. The
  `style: {padding}` prop on it is preview cosmetics only.
- `cfg.overrides.*.cardMode = "column"` is set for the wide components
  (Testimonial, ServiceCard, Marquee, ResourceRow, StatRail, CtaCard, Section,
  ResultPanel). Testimonial in particular is unreadable in a 2-up grid cell —
  its quote column gets squeezed out. Don't remove these.

`projectId` points at the pre-existing **empty** project named "Design System"
(user's explicit choice over creating a new one).

## Preview authoring

15 authored in `.design-sync/previews/`: Button, Chip, Section, ServiceCard,
FaqItem, Testimonial, ResultPanel, CalculatorInput, CtaCard, ResourceRow,
StatRail, Marquee, Kicker, LogoTile, TldrCard.

- Previews that need imagery use **inline SVG data-URI wordmarks**, not files
  from `/assets` — the repo's logo PNGs aren't part of the package and would
  render broken in the cards.
- `LogoTile`'s floor card renders a *broken image* rather than the typographic
  block (its crash-prevention `src` doesn't resolve), which is why it was
  authored despite not being in the original core-12 scope. Any future
  image-prop component will have the same problem — author it.

## Re-sync risks

- The library is a **parallel artifact**: `index.html` can drift from it, and
  nothing detects that. Any visual change to the site needs hand-porting into
  `design-system/src/`, and vice versa.
- Fonts were fetched from Google's CDN at build time. If the subset URLs rotate,
  the committed woff2 files still work, but regenerating `fonts.css` needs a
  fresh fetch and a re-check of the `unicode-range` values.
- `DESIGN.json` is generated (`generatedAt` field). If it is regenerated, its
  component CSS may diverge from the library — the library is the newer source.
