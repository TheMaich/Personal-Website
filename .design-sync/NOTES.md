# design-sync notes — Spritz Consulting

## Status: PAUSED mid-first-sync (2026-08-10)

The React component library exists, is built, and is committed. **Nothing has
been uploaded to Claude Design yet.** The project is still empty, which is the
documented safe state — a future run re-verifies everything from scratch and
nothing can silently rot.

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

## Config status

`.design-sync/config.json` is a **draft written at pause time and never run
through the converter** — treat its paths as unverified. In particular
`srcDir` / `cssEntry` are repo-root-relative here; the converter may want them
package-relative with `--node-modules design-system/node_modules` and
`--entry ./design-system/dist/index.js`. Expect to fix these on first run.

`projectId` points at the pre-existing **empty** project named "Design System"
(user's explicit choice over creating a new one).

## Where to resume

1. `npm install --prefix design-system` (+ approve esbuild scripts), then
   `npm run build --prefix design-system`.
2. Stage the converter scripts into `.ds-sync/` per the skill's §2.7 and run
   `package-build.mjs` → `package-validate.mjs`; fix the config paths above.
3. Playwright + chromium (~200MB) is **not installed** — the render check needs
   it. Ask before installing.
4. Author `.design-sync/previews/<Name>.tsx` for the 22 exports, grade, review,
   write `conventions.md`, then upload.

## Re-sync risks

- The library is a **parallel artifact**: `index.html` can drift from it, and
  nothing detects that. Any visual change to the site needs hand-porting into
  `design-system/src/`, and vice versa.
- Fonts were fetched from Google's CDN at build time. If the subset URLs rotate,
  the committed woff2 files still work, but regenerating `fonts.css` needs a
  fresh fetch and a re-check of the `unicode-range` values.
- `DESIGN.json` is generated (`generatedAt` field). If it is regenerated, its
  component CSS may diverge from the library — the library is the newer source.
