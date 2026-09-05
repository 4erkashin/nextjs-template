# Error widget — what to extract

Throwaway notes. Not an ADR. Not project law.

**Now:** 1. Token architecture grilling (gate)

**Goal.** Decide how tokens are layered (primitive → semantic → component) and where they live (colocation vs one JSON, or how today's `core` + `light` + `dark` + `$themes.json` should work). Not code.

**Done when.** These have answers: where a color value lives, where a color role lives, where a component-level alias lives, and what the first color slice is allowed to touch.

**Don't.** Don't "just update `light.json`."

## Queue

- [x] 0. This file
- [ ] 1. Token architecture grilling (gate)
- [ ] 2. First color group, vertical
- [ ] 3. Honest slot names
- [ ] 4. not-found uses the same module
- 5+. Not queued until something is actually changing

## The rest

### Parked

Needs its own grilling. Do not "just extract."

- **Chrome voice** — `link up`, `trace 14%`, `ice active`, `//breach/view/render`, `net::session`, digest label `hash …`. Tweak to something useful or funny later. Not i18n vs dialect today.
- **Type / `Share_Tech_Mono`** — Latin-only vs `ru` / `uk` is a landmine. Should become a token; when/where is the type grill.
- **Composition** — slots are shared; how screens differ (hex column, status bar, path, 404) is later.
- **Locale survival as a module** — default: no.

### Anti-list

Do not do these because they feel like organizing:

- Extract anything without shared understanding with the human
- Write `Share_Tech_Mono` into `tokens/core.json` before the type grilling
- Translate `ice active` to prove i18n coverage
- Tokenize `HEX_LINES`
- Tokenize scanline and glitch recipes
- Invent a light theme by reusing leftover phosphor values
- Rewrite the CSS module in the first color chunk
- Point `not-found` at `onRetry`
- Treat this file as canon or move it to `docs/adr/` because it is tidy
- Mix a visuals chunk and a `global-error` plumbing chunk in one iteration

### How to use this file

The top of the file is the current chunk (Goal / Done when / Don't).  
The queue is names in order. Titles are not specs.  
After a chunk finishes: update Facts that changed, write the next Goal card, check the queue box.  
Do not invent a Goal for chunk 2+ before that.

### Facts

What is true today. Update these when a chunk changes them.

**DTCG**  
Visual values should end up DTCG tokens: color, space, duration, easing, type.  
How they are organized (layers, files, one set vs many) is not answered yet.  
"Only this screen uses it" is not a reason to leave a literal in CSS.

**Color**  
Four keys in `tokens/light.json` and `tokens/dark.json`: `bg`, `text`, `muted`, `accent`.  
They are hexes. No layers. No `{…}` references.  
More hexes live in the widget CSS (glitch, hex-column, glow). Those are colors too. They are not tokens yet.  
Chunk 1 decides how color tokens are organized. Do not add or reshuffle color files before that.  
Old warm values in `light.json` / `dark.json` do not need saving.  
The green skin on the widget may change. Do not treat it as the real palette.

**Theme**  
Light / dark / system already switch on `<html>` (cookie + StyleX).  
Color tokens need a value in both themes. The first light values can be ugly.

**Type**  
`Share_Tech_Mono` is local to the widget (`--error-widget-mono`). Not a token yet.  
It should become a token. When and where is the type grill. Do not write it into `tokens/core.json` before that.

**Space and motion**  
Today the widget uses rem literals and `100dvh`. `tokens/core.json` already has `space.*`.  
Today blink, scroll, glitch timings live in the widget CSS. `tokens/core.json` already has `motion.*`.  
Space, duration, and easing should become DTCG tokens. How they are organized is not answered yet.

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
