# Error widget — what to extract

Throwaway notes. Not an ADR. Not project law.

**Now:** 2. Collapse to `tokens.json`

**Goal.** One file is the write path. Rename the token set `core` → `primitive`; keep the token paths and values inside it unchanged. No new color.

**Done when.** `tokens/tokens.json` holds keys `primitive`, `light`, `dark`, plus `$themes` and `$metadata`. `tokens/build.js` reads that file. Preserve the existing theme selections and metadata ordering, replacing `core` with `primitive` in both. Remove the five old JSON source files, including `$themes.json` and `$metadata.json`; keep the build script and generated output directory. A short migration note in this file (or next to `tokens/`) explains how to split back into files if paid folder sync is adopted. README token paths match the one file.

**Verify.** Before changing storage, run `pnpm tokens:build` and save a copy of the generated `.ts` files outside `tokens/`. After the change, run `pnpm tokens:build` and `pnpm typecheck`. Compare the generated files with the baseline: exported names, token paths, resolved values, and theme behavior must remain unchanged. Set names are storage metadata, not a new prefix on generated token paths.

**Don't.** Don't add a color primitive. Don't add a `component` key. Don't change the widget CSS. Don't rewrite `light` / `dark` hexes as a cleanup. Don't keep the folder as a second source.

## Queue

- [x] 0. This file
- [x] 1. Token architecture grilling (gate)
- [ ] 2. Collapse to `tokens.json`
- [ ] 3. First color primitive (one hex)
- [ ] 4. Rename retry-specific props to action props
- [ ] 5. not-found uses the same module
- 6+. Not queued until something is actually changing

## The rest

### Parked

Each parked topic needs its own grilling: discuss the unresolved design choices with the human and record the agreed scope before implementing it.

- **Component token home** — third layer is named, not housed. Binding will live in the feature. The _name_ of a widget-only color is not decided. Fence: no `component` key; no widget-specific roles (such as glitch or hex-column colors) in `light` / `dark`; a CSS hex is not the layer.
- **Chrome voice** — `link up`, `trace 14%`, `ice active`, `//breach/view/render`, `net::session`, digest label `hash …`. Tweak to something useful or funny later. Not i18n vs dialect today.
- **Type / `Share_Tech_Mono`** — Latin-only vs `ru` / `uk` is a landmine. Should become a token; when/where is the type grill.
- **Composition** — slots are shared; how screens differ (hex column, status bar, path, 404) is later.
- **Locale survival as a module** — default: no.

### Anti-list

Do not do these because they feel like organizing:

- Expand beyond the agreed current chunk without discussing the new scope with the human
- Write `Share_Tech_Mono` into the primitive set before the type grilling
- Translate `ice active` to prove i18n coverage
- Tokenize `HEX_LINES`
- Tokenize scanline and glitch recipes
- Invent a light theme by reusing leftover phosphor values
- Rewrite the CSS module in the first color chunk
- Point `not-found` at `onRetry`
- Treat this file as canon or move it to `docs/adr/` because it is tidy
- Mix a visuals chunk and a `global-error` plumbing chunk in one iteration

### How to use this file

The top of the file is the current chunk (Goal / Done when / Verify / Don't). When asked to implement it, proceed within that scope; the completed architecture gate does not need another approval.  
The queue is names in order. Titles are not specs or authorization to implement later chunks.  
After a chunk finishes: update Facts that changed, check its queue box, and mark the current card complete. Stop there unless the human has authorized further work. Propose the next Goal card for discussion; replace the current card once its scope is agreed.  
Reviewing or editing this document alone does not authorize implementing its chunks.

### Facts

Current state and agreed direction. Future work and existing exceptions are called out below. Update these when a chunk changes them.

**DTCG**  
Layers are primitive → semantic → component. All types, not color only.  
Only a primitive token may hold a hex. Semantic and component tokens are references when we fill them.  
This is a house rule. DTCG does not require it.  
A primitive is the same color in light and in dark.  
For colors, app code uses semantic tokens; StyleX `colors` must not export primitives. The intended Figma role for primitive colors is Source / reference-only; revisit that binding with the component grill. During the storage collapse, preserve the existing set selection statuses described under Theme.  
Existing non-color tokens (`font.*`, `space.*`, `motion.*`, `layout.*`) are grandfathered: they move into `primitive` and keep their current generated exports and app usage. Adding semantic indirection for them is outside this chunk.  
"Only this screen uses it" is not a reason to leave a literal in CSS. A widget-only color still needs a token home. That home is parked.

**Storage**  
Write path will be one `tokens/tokens.json` (chunk 2). Sets are keys. `$themes` and `$metadata` live in the same file.  
Today `tokens/` contains `core.json`, `light.json`, `dark.json`, `$themes.json`, and `$metadata.json`. The metadata orders the sets as `core`, `light`, `dark`.  
Single-file storage was chosen so this template does not require paid Tokens Studio folder sync. Recheck product capabilities if that decision is revisited.  
If paid folder sync is adopted later: split keys to files (`primitive.json`, `light.json`, `dark.json`, `$themes.json`, `$metadata.json`) and update the build reader and README together. The migration note is part of chunk 2; no second source is kept in advance.

**Color**  
Four semantic names in `light` and `dark`: `bg`, `text`, `muted`, `accent`. They are hexes. That is debt, not a pattern. Preserve them during chunk 2; a later palette decision may replace them.  
Primitive color names are not job names. Never `bg` / `text` / `muted` / `accent`.  
More hexes live in the widget CSS (glitch, hex-column, glow). Those are colors too. They are not tokens yet.  
The green skin on the widget may change. Do not treat it as the real palette.  
First color chunk (chunk 3): one hex in `primitive`, then stop. No CSS change. No semantic fill. No `component` key.

**Theme**  
Light / dark / system already switch on `<html>` (cookie + StyleX).  
After collapse, `selectedTokenSets` in each `$themes` entry keeps `primitive` enabled. The light theme enables `light` and disables `dark`; the dark theme does the reverse.  
Color tokens need a value in both themes. The first light values can be ugly.

**Type**  
`Share_Tech_Mono` is local to the widget (`--error-widget-mono`). Not a token yet.  
It should become a token. When and where is the type grill. Do not write it into the primitive set before that.

**Space and motion**  
Today the widget uses rem literals and `100dvh`. `tokens/core.json` already has `space.*`. After collapse those keys live under `primitive`.  
Today blink, scroll, glitch timings live in the widget CSS. `tokens/core.json` already has `motion.*`. Same move.  
Some names in there already smell like jobs (`motion.duration.fade`, `layout.wide`). Grandfathered. Their grill may move them. Do not reshuffle in the collapse chunk.

**The error screen**  
`ErrorWidget` is the one adapter. `not-found` does not use it yet.  
The CSS module stays until its values have a token home. The first color chunk does not delete the file.  
Slots we want: title, description, action, optional diagnostic. Today the action is still named retry.  
Rename that before `not-found` uses the widget. 404's button is "home", not remount.  
Scanline / vignette / glitch _recipes_ (how the effect is drawn) are still CSS. The colors and timings inside them are values — those should become tokens.  
`HEX_LINES` is fake dump text in JS, not a palette. Do not treat it as colors.

**Already extracted, leave it**  
`error-page.ts` (`ErrorPageProps`). Keep. Next.js does not export this type.  
`EXAMPLE_ERROR_DIGEST` in stories. Keep. It matches Next's digest shape.  
Locale on `global-error`: inlined. Cookie `NEXT_LOCALE`, then `navigator.languages`, then catalog JSON. Do not make a module.  
Theme on `global-error`: already uses `theme/`. Keep composing.  
`error.tsx` uses next-intl. `global-error.tsx` imports JSON because next-intl dies with the layout. Leave until a copy grill.  
`global-error.tsx` stays in `app/`. It must render `<html>` / `<body>` / `<title>`. The widget does not learn about cookies.

**This file**  
Throwaway. Lives next to the widget so it is hard to miss.  
Do not move it to `CONTEXT.md` or `docs/adr/`.  
Naming something here is enough. A new `.ts` file is later, and only if we agree.
