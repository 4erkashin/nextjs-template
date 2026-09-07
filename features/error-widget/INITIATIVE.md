# Error widget integration

Working context for this initiative. Read this file before planning or implementing it. It records current agreements and findings; it is not permanent project policy.

**Goal.** Integrate the error-widget POC into the system and sharpen tokens and architecture through that use. Architecture, visuals, and conventions can change by shared agreement.

**Current step.** 1. Proper light and dark — grilling. Color semantics and their theme bindings only. Typography, spacing, motion, copy, and plumbing stay later. Proposed: retarget semantic colors so light and dark actually differ, rather than a light skin from leftover phosphor.

**Done when.** Proposed: agreed semantic roles resolve to different primitives or values in light vs dark where that is the intended look. Widget and chrome appearance in each theme is explicit. Token build, typecheck, and lint pass. Visual checks depend on the questions below.

**Open questions.** Which widget roles should differ by theme? What should light look like, and should dark change? Should CRT decorative roles stay identical across themes? How should that interact with homepage and cookbook use of `bg` / `text` / `muted` / `accent`? What visual check is required before this step is done?

## Steps

- [ ] 1. Proper light and dark — retarget semantic colors so the themes actually differ
- [ ] 2. Typography — proposed: agree font and locale coverage, then integrate type values
- [ ] 3. Spacing, sizing, and motion — proposed: reuse and sharpen tokens; migrate values, retaining CSS effect recipes unless a different approach is agreed
- [ ] 4. Rename retry-specific props to action props
- [ ] 5. `not-found` uses the same module

Later titles are checkpoints, not implementation specs. Revisit the sequence when integration reveals new decisions.

## Facts and references

- Widget colors already go through tokens. Light and dark still share the CRT bindings. Check [`tokens/tokens.json`](../../tokens/tokens.json) (`light` vs `dark` for widget roles) and [`error-widget.tsx`](error-widget.tsx) StyleX bindings.
- A primitive is the same color in both themes. App code uses semantic tokens; StyleX `colors` must not export primitives. Color literals in source are `oklch()` on primitives. Semantics are references (plus Tokens Studio alpha modifiers where used). The legacy four (`bg` / `text` / `muted` / `accent`) are still semantic oklch literals and already differ by theme. Consumers: `theme/root-style.ts`, `app/[locale]/page.tsx`, `ui/stylex-cookbook.tsx`, `ui/motion-cookbook.tsx`.
- Token write path is [`tokens/tokens.json`](../../tokens/tokens.json). Build is [`tokens/build.js`](../../tokens/build.js). Sets: `primitive`, `light`, `dark`. Color tokens need a matching declaration in both themes.
- The green CRT look is a preservation target from the last color pass, not the finished palette.
- `ErrorWidget` is the one adapter. `not-found` does not use it yet. Action is still named retry. Scanline / vignette / glitch recipes stay in CSS and StyleX strings; their colors are tokens. `HEX_LINES` is dump text, not a palette. `Share_Tech_Mono` is local (`--error-widget-mono`), not a token yet.
- `global-error` stays in `app/` (must render `<html>` / `<body>` / `<title>`). Locale there is inlined. Theme there already uses `theme/`. Keep `error-page.ts` (`ErrorPageProps`) and `EXAMPLE_ERROR_DIGEST`.

## Decisions

- Layers are primitive → semantic → component, all types, not color only. House rule, not a DTCG requirement. For colors, the agreed provisional component layer is colocated StyleX that consumes a shared semantic directly.
- Existing non-color tokens (`font.*`, `space.*`, `motion.*`, `layout.*`) stay grandfathered in `primitive` until their own agreed scope.
- Single-file token storage so this template does not require paid Tokens Studio folder sync.

## Progress and results

Token architecture, collapse to `tokens.json`, and widget color migration are done. All leftover widget CSS colors went through tokens; the CSS module has no color literals. Light and dark still share those CRT bindings. Token build, typecheck, and widget lint passed on that pass. No Storybook, `next dev`, or screenshots were recorded then.

## Parked

Each parked topic needs its own grilling before implementation.

- Chrome voice — `link up`, `trace 14%`, `ice active`, `//breach/view/render`, `net::session`, digest label `hash …`
- Type / `Share_Tech_Mono` — Latin-only vs `ru` / `uk`; font choice, token home, locale coverage
- Composition — slots are shared; how screens differ (hex column, status bar, path, 404)
- Locale survival as a module — default: no

## Continue from this file

Ask an agent to read this file, resolve the current step's open questions, and save agreed decisions with their reasons. Set the current step to **ready to implement** when its frontier is empty.

Implement when the user requests it. If an agreed decision must change, ask the user. Record progress and check the result against **Done when**.

When the step is complete, mark it done and prepare the next step for discussion.
