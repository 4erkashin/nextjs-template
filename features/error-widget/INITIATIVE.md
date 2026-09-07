# Error widget integration

Working context for this initiative. Read this file before planning or implementing it. It records current agreements and findings; it is not permanent project policy.

**Goal.** Integrate the error-widget POC into the system and sharpen tokens and architecture through that use. Architecture, visuals, and conventions can change by shared agreement. The widget is the baseline: settle its tokens here, then tweak other surfaces later.

**Current step.** 2. Typography — grilling. Agree font and locale coverage, then integrate type values. Color bindings stay as step 1 left them. Spacing, motion, copy, and plumbing stay later.

**Done when.** Proposed: the widget’s type comes from tokens (or an agreed exception is recorded). Locale coverage for the chosen font is explicit. Token build, typecheck, and lint pass.

**Open questions.** Keep `Share_Tech_Mono`, or pick another font? Token home: still a local CSS variable, or `font.*`? Which locales must the face cover (`en` / `ru` / `uk` / `pt-BR`)? What visual check closes this step?

## Steps

- [x] 1. Proper light and dark — retarget widget color names so the themes differ
- [ ] 2. Typography — proposed: agree font and locale coverage, then integrate type values
- [ ] 3. Spacing, sizing, and motion — proposed: reuse and sharpen tokens; migrate values, retaining CSS effect recipes unless a different approach is agreed
- [ ] 4. Rename retry-specific props to action props
- [ ] 5. `not-found` uses the same module

Later titles are checkpoints, not implementation specs. Revisit the sequence when integration reveals new decisions.

## Facts and references

- Widget colors go through tokens. Light is green ink on foam; dark is green on near-black. Magenta/cyan title shift is the same in both themes. Check [`tokens/tokens.json`](../../tokens/tokens.json) and [`error-widget.tsx`](error-widget.tsx).
- A primitive is the same color in both themes. App code uses semantic tokens; StyleX `colors` must not export primitives. Color literals in source are `oklch()` on primitives. Semantics are references (plus Tokens Studio alpha modifiers where used). `olive` is the dark pair of `citron`, used by light `highlight`.
- Token write path is [`tokens/tokens.json`](../../tokens/tokens.json). Build is [`tokens/build.js`](../../tokens/build.js). Sets: `primitive`, `light`, `dark`. Color tokens need a matching declaration in both themes.
- `bg` / `text` / `muted` / `accent` exist for Storybook cookbooks only. They are out of this initiative.
- `ErrorWidget` is the one adapter. `not-found` does not use it yet. Action is still named retry. Scanline / vignette / glitch recipes stay in CSS and StyleX strings; their colors are tokens. `HEX_LINES` is dump text, not a palette. `Share_Tech_Mono` is local (`--error-widget-mono`), not a token yet. Subset is Latin only.
- `global-error` stays in `app/` (must render `<html>` / `<body>` / `<title>`). Locale there is inlined. Theme there already uses `theme/`. Keep `error-page.ts` (`ErrorPageProps`) and `EXAMPLE_ERROR_DIGEST`.

## Decisions

- Layers are primitive → semantic → component, all types, not color only. House rule, not a DTCG requirement. For colors, the agreed provisional component layer is colocated StyleX that consumes a shared semantic directly.
- Existing non-color tokens (`font.*`, `space.*`, `motion.*`, `layout.*`) stay grandfathered in `primitive` until their own agreed scope.
- Single-file token storage so this template does not require paid Tokens Studio folder sync.
- This initiative styles the widget. Home and root `html` stay without color tokens until a later pass.
- Color work starts from the widget. Other components wait until those tokens are settled enough to copy or tweak.
- Name the look in plain English: green on near-black, widget colors.
- Dark widget colors stay the previous green-on-near-black bindings. Light retargets the same names to darker greens on `foam`, so the widget is ink on paper rather than the dark look with the lights on. Title shift stays magenta/cyan. Light overlays use `pine` at lower alpha so scanlines stay green, not soot.

## Progress and results

Step 1 is done in tokens. Widget StyleX bindings were already on semantic names; only `tokens.json` changed. Token build, typecheck, and widget lint passed. Visual check (`next dev`, both themes) was not run; the user asked not to start the dev server or Storybook.

## Parked

Each parked topic needs its own grilling before implementation.

- Widget chrome copy — `link up`, `trace 14%`, `ice active`, `//breach/view/render`, `net::session`, digest label `hash …`
- Composition — slots are shared; how screens differ (hex column, status bar, path, 404)
- Locale survival as a module — default: no
- Home, root `html`, and cookbook colors — after widget tokens settle

## Continue from this file

Ask an agent to read this file, resolve the current step's open questions, and save agreed decisions with their reasons. Set the current step to **ready to implement** when its frontier is empty.

Implement when the user requests it. If an agreed decision must change, ask the user. Record progress and check the result against **Done when**.

When the step is complete, mark it done and prepare the next step for discussion.
