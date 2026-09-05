# Error widget — what to extract

Throwaway notes. Not an ADR. Not project law.

**Now:** 2. Collapse to `tokens.json`

**Goal.** One file is the write path. Rename `core` → `primitive`. No new color.

**Done when.** `tokens/tokens.json` holds keys `primitive`, `light`, `dark`, plus `$themes` and `$metadata`. `build.js` reads that file. The old set files are gone. A short receipt in this file (or next to `tokens/`) says how to split if Plus is paid. README token paths match the one file.

**Don't.** Don't add a color primitive. Don't add a `component` key. Don't change the widget CSS. Don't rewrite `light` / `dark` hexes as a cleanup. Don't keep the folder as a second source.

## Queue

- [x] 0. This file
- [x] 1. Token architecture grilling (gate)
- [ ] 2. Collapse to `tokens.json`
- [ ] 3. First color primitive (one hex)
- [ ] 4. Honest slot names
- [ ] 5. not-found uses the same module
- 6+. Not queued until something is actually changing

## The rest

### Parked

Needs its own grilling. Do not "just extract."

- **Component token home** — third layer is named, not housed. Binding will live in the feature. The *name* of a widget-only color is not decided. Fence: no `component` key; no widget jobs in `light` / `dark`; a CSS hex is not the layer.
- **Chrome voice** — `link up`, `trace 14%`, `ice active`, `//breach/view/render`, `net::session`, digest label `hash …`. Tweak to something useful or funny later. Not i18n vs dialect today.
- **Type / `Share_Tech_Mono`** — Latin-only vs `ru` / `uk` is a landmine. Should become a token; when/where is the type grill.
- **Composition** — slots are shared; how screens differ (hex column, status bar, path, 404) is later.
- **Locale survival as a module** — default: no.

### Anti-list

Do not do these because they feel like organizing:

- Extract anything without shared understanding with the human
- Write `Share_Tech_Mono` into the primitive set before the type grilling
- Translate `ice active` to prove i18n coverage
- Tokenize `HEX_LINES`
- Tokenize scanline and glitch recipes
- Invent a light theme by reusing leftover phosphor values
- Rewrite the CSS module in the first color chunk
- Point `not-found` at `onRetry`
- Treat this file as canon or move it to `docs/adr/` because it is tidy
- Mix a visuals chunk and a `global-error` plumbing chunk in one iteration
- Add a `component` key to look complete
- Put widget jobs in `light` / `dark`
- Export primitives on StyleX `colors` (reopen only with the component grill)
- Collapse the folder and add the first color hex in one chunk
- Keep `core.json` + `light.json` + `dark.json` next to `tokens.json`

### How to use this file

The top of the file is the current chunk (Goal / Done when / Don't).  
The queue is names in order. Titles are not specs.  
After a chunk finishes: update Facts that changed, write the next Goal card, check the queue box.  
Do not invent a Goal for chunk 2+ before that.

### Facts

What is true today. Update these when a chunk changes them.

**DTCG**  
Layers are primitive → semantic → component. All types, not color only.  
Only a primitive token may hold a hex. Semantic and component tokens are references when we fill them.  
This is a house rule. DTCG does not require it. Notes: `research-dtcg-hex-layers.md`.  
A primitive is the same color in light and in dark.  
App code does not use primitives. StyleX `colors` is semantic only. In Figma, `primitive` is Source / reference-only. Reopen with the component grill.  
"Only this screen uses it" is not a reason to leave a literal in CSS. A widget-only color still needs a token home. That home is parked.

**Storage**  
Write path will be one `tokens/tokens.json` (chunk 2). Sets are keys. `$themes` and `$metadata` live in the same file.  
Today it is still `core.json` + `light.json` + `dark.json` + `$themes.json`.  
Free Tokens Studio can two-way sync one file and export Variables (Token Sets, one collection per set, one mode). Folder write and Themes-as-modes are Plus (€49 / user / month). This template does not require Plus. Notes: `research-free-tokens-studio.md`.  
If someone pays Plus later: split keys to files (`primitive.json`, `light.json`, `dark.json`, `$themes.json`, `$metadata.json`). Receipt is part of chunk 2. Start small, know how to go big.

**Color**  
Four semantic names in `light` and `dark`: `bg`, `text`, `muted`, `accent`. They are hexes. That is debt, not a pattern. Old warm hexes do not need saving.  
Primitive color names are not job names. Never `bg` / `text` / `muted` / `accent`.  
More hexes live in the widget CSS (glitch, hex-column, glow). Those are colors too. They are not tokens yet.  
The green skin on the widget may change. Do not treat it as the real palette.  
First color chunk (chunk 3): one hex in `primitive`, then stop. No CSS change. No semantic fill. No `component` key.

**Theme**  
Light / dark / system already switch on `<html>` (cookie + StyleX).  
`$themes` will enable `primitive` in both themes; `light` XOR `dark`.  
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
Scanline / vignette / glitch *recipes* (how the effect is drawn) are still CSS. The colors and timings inside them are values — those should become tokens.  
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
