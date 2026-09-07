# Error widget integration

Working context for this initiative. Read this file before planning or implementing it. It records current agreements and findings; it is not permanent project policy.

**Goal.** Integrate the error-widget POC into the system and sharpen tokens and architecture through that use. Architecture, visuals, and conventions can change by shared agreement. The widget is the baseline: settle its tokens here, then tweak other surfaces later.

**Current step.** 3. Spacing, sizing, and motion — grilling. Reuse and sharpen tokens; migrate values. CSS effect recipes stay unless a different approach is agreed. Color and family stay as steps 1–2 left them.

**Done when.** Proposed: widget space, type sizes, and motion timings come from tokens, or agreed exceptions are recorded. Token build, typecheck, and widget lint pass. No preview server unless agreed.

**Open questions.** Map widget rem padding/gaps to `space.*`, or add sizes? Keep title `clamp` in CSS? Line-height and letter-spacing: tokens or CSS? Keyframe recipes: stay in CSS, consume `motion.*` where a duration already exists?

## Steps

- [x] 1. Proper light and dark — retarget widget color names so the themes differ
- [x] 2. Typography — widget family from tokens; JetBrains Mono for all four locales
- [ ] 3. Spacing, sizing, and motion — proposed: reuse and sharpen tokens; migrate values, retaining CSS effect recipes unless a different approach is agreed
- [ ] 4. Rename retry-specific props to action props
- [ ] 5. `not-found` uses the same module

Later titles are checkpoints, not implementation specs. Revisit the sequence when integration reveals new decisions.

## Facts and references

- Widget colors go through tokens. Light is green ink on foam; dark is green on near-black. Magenta/cyan title shift is the same in both themes. Check [`tokens/tokens.json`](../../tokens/tokens.json) and [`error-widget.tsx`](error-widget.tsx).
- A primitive is the same color in both themes. App code uses semantic tokens; StyleX `colors` must not export primitives. Color literals in source are `oklch()` on primitives. Semantics are references (plus Tokens Studio alpha modifiers where used). `olive` is the dark pair of `citron`, used by light `highlight`.
- Token write path is [`tokens/tokens.json`](../../tokens/tokens.json). Build is [`tokens/build.js`](../../tokens/build.js). Sets: `primitive`, `light`, `dark`. Color tokens need a matching declaration in both themes.
- `bg` / `text` / `muted` / `accent` exist for Storybook cookbooks only. They are out of this initiative.
- `ErrorWidget` is the one adapter. `not-found` does not use it yet. Action is still named retry. Scanline / vignette / glitch recipes stay in CSS and StyleX strings; their colors are tokens. `HEX_LINES` is dump text, not a palette. Family is primitive `font.mono` (`var(--font-mono), ui-monospace, monospace`) via StyleX `fonts.mono`. Loader is [`fonts.ts`](fonts.ts) (`JetBrains_Mono`, subsets `cyrillic` / `latin` / `latin-ext`, weight `400`). CSS variable name is [`tokens/font-mono-var.ts`](../../tokens/font-mono-var.ts); next/font keeps a written literal; the token build asserts the stack. App sans is primitive `font.family` (`system-ui`). Widget sizes stay in CSS (`0.7rem`, `0.68rem`, `0.75rem`, title `clamp`). `next/font` options must be written string literals (SWC). The font class is on the widget root, not locale layout or `global-error` `<html>`.
- `global-error` stays in `app/` (must render `<html>` / `<body>` / `<title>`). Locale there is inlined. Theme there already uses `theme/`. Keep `error-page.ts` (`ErrorPageProps`) and `EXAMPLE_ERROR_DIGEST`.

## Decisions

- Layers are primitive → semantic → component, all types, not color only. House rule, not a DTCG requirement. For colors, the agreed provisional component layer is colocated StyleX that consumes a shared semantic directly.
- Existing non-color tokens (`font.*`, `space.*`, `motion.*`, `layout.*`) stay grandfathered in `primitive` until their own agreed scope.
- Single-file token storage so this template does not require paid Tokens Studio folder sync.
- This initiative styles the widget. Home and root `html` stay without color tokens until a later pass.
- Color work starts from the widget. Other components wait until those tokens are settled enough to copy or tweak.
- Name the look in plain English: green on near-black, widget colors.
- Dark widget colors stay the previous green-on-near-black bindings. Light retargets the same names to darker greens on `foam`, so the widget is ink on paper rather than the dark look with the lights on. Title shift stays magenta/cyan. Light overlays use `pine` at lower alpha so scanlines stay green, not soot.
- One face for all four locales (`en`, `ru`, `uk`, `pt-BR`). Coverage is `latin` + `latin-ext` + `cyrillic`. Per-locale faces are a product job, not this template.
- Face is `JetBrains_Mono` (weight `400`). `Share_Tech_Mono` cannot cover Cyrillic.
- `fontFamily` tokens store a CSS stack, not files or subsets. Add primitive `font.mono`: `var(--font-mono), ui-monospace, monospace`. Leave `font.family` as system-ui this step.
- next/font stays a written literal `variable: "--font-mono"`. Guard with a TypeScript const (`satisfies`) and a token-build check that `font.mono` contains `var(--font-mono)`. Tokens do not feed the loader.
- Put the next/font class on the widget root only (module the widget imports). Locale layout and `global-error` `<html>` do not get the class this step. `global-error` still gets the face because it renders the widget.
- This step is family only. Sizes, line-height, and letter-spacing wait for step 3. Title `clamp` is not a token type we agreed.

## Progress and results

Step 1 is done in tokens. Widget StyleX bindings were already on semantic names; only `tokens.json` changed. Token build, typecheck, and widget lint passed. Visual check (`next dev`, both themes) was not run; the user asked not to start the dev server or Storybook.

Step 2 is done. `font.mono` is in the primitive set. Widget root uses `fonts.mono` and `jetbrainsMono.variable`. Token build, typecheck, and widget lint passed. No preview server.

## Parked

Each parked topic needs its own grilling before implementation.

- Widget chrome copy — `link up`, `trace 14%`, `ice active`, `//breach/view/render`, `net::session`, digest label `hash …`
- Composition — slots are shared; how screens differ (hex column, status bar, path, 404)
- Locale survival as a module — default: no
- Home, root `html`, and cookbook colors — after widget tokens settle
- Per-locale typefaces — product work if a locale needs its own face
- `font.mono` on document `<html>` — later, if other surfaces consume the stack

## Continue from this file

Ask an agent to read this file, resolve the current step's open questions, and save agreed decisions with their reasons. Set the current step to **ready to implement** when its frontier is empty.

Implement when the user requests it. If an agreed decision must change, ask the user. Record progress and check the result against **Done when**.

When the step is complete, mark it done and prepare the next step for discussion.
