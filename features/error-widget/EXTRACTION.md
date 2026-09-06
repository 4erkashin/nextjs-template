# Error widget — what to extract

Throwaway notes. Not an ADR. Not project law.

**Overall goal.** Integrate the error-widget POC into the system while sharpening the system through real use. Nothing in this repo is sacred: architecture, visuals, and existing conventions can change through shared agreement. The current chunk's fences bound this iteration, not future decisions.

**Now:** 5. Remaining widget colors — draft Goal card; needs grilling.

**Goal (draft).** Settle the remaining widget palette and connect the agreed colors through the token system, including effect colors and opacity. Use the mint integration to sharpen the system as concrete limitations appear.

**Done when (draft).** The agreed remaining color uses consume their agreed semantic bindings, with explicit light/dark behavior. Primitive colors remain reference-only in app-facing exports. The exact palette, roles, opacity representation, migration boundary, and intended visual changes await grilling.

**Verify (draft).** Run the token build, typecheck, and lint; verify the agreed visuals in both themes, including interaction states and effects. Define concrete appearance and contrast checks after the palette and scope are agreed.

**Scope.** Remaining widget colors, including translucent mint, backgrounds, text, borders, glitch shadows, glow, scanlines, and vignette colors, are candidates for this chunk. The queue title does not commit us to migrating them all at once. Typography, spacing, sizing, motion, copy, and error-boundary plumbing are separate chunks. Effect geometry stays in CSS unless a different approach is agreed.

**Starting point.** Mint already uses shared `decorativeAccent` in both themes. Colocated StyleX styles consuming semantic tokens are the provisional component layer; revisit that choice only when a concrete flaw appears. The existing green skin and identical widget appearance in both themes are current behavior, not an agreed final palette.

**Open decisions.** Which remaining uses to include and in what order; which colors and semantic roles they need; how light and dark should differ; how opacity and effect colors are represented and consumed; whether existing semantic roles can be reused without unintended changes to other consumers; and what implementation and verification complete this chunk. No implementation until the complete card is agreed.

## Queue

- [x] 0. This file
- [x] 1. Token architecture grilling (gate)
- [x] 2. Collapse to `tokens.json`
- [x] 3. First color primitive (one hex)
- [x] 4. First connected color — all literal-mint declarations consume shared decorative accent through colocated StyleX bindings
- [ ] 5. Remaining widget colors — current draft; settle palette and migration scope, including effect colors and opacity
- [ ] 6. Typography — agree font and locale coverage, then integrate type values
- [ ] 7. Spacing, sizing, and motion — reuse and sharpen tokens; migrate values, retaining CSS effect recipes unless a different approach is agreed
- [ ] 8. Rename retry-specific props to action props
- [ ] 9. not-found uses the same module

This is the agreed provisional sequence. Revisit it in later grilling sessions as integration reveals new decisions; later titles remain checkpoints, not implementation specs.

## The rest

### Parked

Each parked topic needs its own grilling: discuss the unresolved design choices with the human and record the agreed scope before implementing it.

- **Chrome voice** — `link up`, `trace 14%`, `ice active`, `//breach/view/render`, `net::session`, digest label `hash …`. Tweak to something useful or funny later. Not i18n vs dialect today.
- **Type / `Share_Tech_Mono` (chunk 6)** — Latin-only vs `ru` / `uk` is a landmine. Agree font choice, token home, and locale coverage in the type grill.
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
After a chunk finishes: update Facts that changed, check its queue box, and record its result below. Replace the top card with a draft for the next chunk that separates agreed scope from open decisions. Stop implementation unless the human has authorized further work. Mark it ready only once the complete card is agreed.  
Reviewing or editing this document alone does not authorize implementing its chunks.

### Facts

Current state and agreed direction. Future work and existing exceptions are called out below. Update these when a chunk changes them.

**DTCG**  
Layers are primitive → semantic → component. All types, not color only.  
Only a primitive token may hold a hex. Semantic and component tokens are references when we fill them.  
For chunk 4, the agreed provisional component layer is colocated StyleX styles that consume a shared semantic token directly, without a separate component-token declaration. Revisit when a concrete flaw appears.  
This is a house rule. DTCG does not require it.  
A primitive is the same color in light and in dark.  
For colors, app code uses semantic tokens; StyleX `colors` must not export primitives. The intended Figma role for primitive colors is Source / reference-only; revisit that binding with the component grill. Current set selection statuses are described under Theme.  
Existing non-color tokens (`font.*`, `space.*`, `motion.*`, `layout.*`) are grandfathered: they live in `primitive` and keep their current generated exports and app usage. Adding semantic indirection for them needs its own agreed scope.  
"Only this screen uses it" is not a reason to leave a literal in CSS. For mint, the agreed home is the shared decorative-accent semantic role plus a colocated widget StyleX binding. Other colors await their own decisions.

**Storage**  
Chunk 2 is complete: build and typecheck passed, and all four generated `.ts` files matched the pre-migration baseline byte-for-byte. Token values, theme selections, and metadata ordering were preserved; only the set name changed.  
The write path is `tokens/tokens.json`. Sets are keys. `$themes` and `$metadata` live in the same file. The five old JSON source files are gone.  
The metadata orders the sets as `primitive`, `light`, `dark`. `tokens/build.js` selects `primitive` plus `light` or `dark`, then the Tokens Studio preprocessor removes set wrappers before resolving tokens. Metadata is not passed as token input.  
Single-file storage was chosen so this template does not require paid Tokens Studio folder sync. Recheck product capabilities if that decision is revisited.

**Migration note: splitting for paid folder sync**

1. Write each top-level value from `tokens/tokens.json` to its matching file in `tokens/`: `primitive.json`, `light.json`, `dark.json`, `$themes.json`, `$metadata.json`. Write the value itself, without its outer key; preserve theme statuses and metadata order.
2. Change `tokens/build.js` from the combined-file reader and `tokens` input to `source` paths for the selected set files. Remove `excludeParentKeys: true`, because the split files no longer contain set wrappers. Keep metadata files out of the token input.
3. Point Tokens Studio sync at the folder, remove `tokens/tokens.json` so there is only one write path, and update README paths. Rebuild, compare generated outputs against a fresh baseline, and run `pnpm typecheck`.

**Color**  
Four legacy semantic names in `light` and `dark`: `bg`, `text`, `muted`, `accent`. They are hexes. That is debt, not a pattern. Chunk 2 preserved them; a later palette decision may replace them.  
Primitive color names are not job names. Never `bg` / `text` / `muted` / `accent`.  
More hexes live in the widget CSS (glitch, hex-column, glow). Those are colors too. They are not tokens yet.  
The green skin on the widget may change. Do not treat it as the real palette.  
Chunk 3 is complete: `primitive.color.mint` holds provisional `#7cffb2`. Chunk 4 is complete: `light.color.decorativeAccent` and `dark.color.decorativeAccent` both reference `{color.mint}`, and colocated widget StyleX styles consume `colors.decorativeAccent` directly. Existing `accent` is not repurposed. The build exports only color paths declared in the semantic sets, requires matching light/dark declarations, and keeps primitives available for reference resolution.  
Chunk 3 verification: build, typecheck, and lint passed. All four generated `.ts` files and widget CSS matched the fresh baseline byte-for-byte; mint was the only source token addition. An isolated fixture verified that a nested semantic alias resolves mint without exporting it, and that mismatched theme declarations fail clearly.

**Chunk 4 result.** Implemented all eight bindings. The retained translucent button background lives in an `error-widget-base` CSS layer; hover/focus uses `revert-layer` there so the StyleX mint fill wins regardless of layer registration order. Other colors and translucent mint values remain in the CSS module. Token build, typecheck, and component lint passed. Browser checks found no errors: light/dark default screenshots were byte-for-byte identical to the fresh baseline, and computed styles matched for default, hover, keyboard focus, and pseudo-elements. Generated color exports include `decorativeAccent` and exclude `mint`. Repository lint, run with the existing generated `storybook-static/**` directory excluded, found a pre-existing named-export ordering error in `features/error-widget/index.ts:1`; that file is unchanged.

**Theme**  
Light / dark / system already switch on `<html>` (cookie + StyleX).  
`selectedTokenSets` in each `$themes` entry keeps `primitive` enabled. The light theme enables `light` and disables `dark`; the dark theme does the reverse.  
Color tokens need a value in both themes. The first light values can be ugly.

**Type**  
`Share_Tech_Mono` is local to the widget (`--error-widget-mono`). Not a token yet.  
It should become a token. When and where is the type grill. Do not write it into the primitive set before that.

**Space and motion**  
Today the widget uses rem literals and `100dvh`. `tokens/tokens.json` has `space.*` under `primitive`.  
Today blink, scroll, glitch timings live in the widget CSS. `tokens/tokens.json` has `motion.*` under `primitive`.  
Some names in there already smell like jobs (`motion.duration.fade`, `layout.wide`). Grandfathered. Their grill may move them. The collapse preserved these names.

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
