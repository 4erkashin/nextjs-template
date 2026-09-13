# Page grid

Working context for this initiative. Read this file before planning or implementing it. It records current agreements and findings; it is not permanent project policy.

**Goal.** Place page content on shared column coordinates so a new section is “column 2, span 5,” not a one-off margin. Overlay and layout use one definition. The look stays “chaotic content, disciplined coordinates.”

**Current step.** 3. Migrate Home; drop placement hacks the spans replace — grilling. Home is already on the 14-track shell as two panes in `app/[locale]/page.tsx`. Remaining work is inner placement: copy, mast, switchers, and mass still do not have their own column spans. Giant type may still overflow.

**Done when.** One shared track recipe drives both the page layout and a debug overlay. The overlay is off by default, matches the live tracks, and does not take clicks or space. Home places its copy, switchers, and mass on named column spans. Giant type may overflow on purpose. A later section can be specified as start column + span without new pixel offsets. Check: overlay on/off in Storybook and via `?grid`; Home at a narrow and a wide width; no second copy of the track numbers.

**Open questions.** Which tracks should copy, mast, switchers, and the mass sit on? Which of `point`’s `mastSize` offsets and mast’s em insets stay as the type bleed / 10% grid break?

## Steps

- [x] 1. Agree the smallest page-grid API
- [x] 2. Shared CSS tracks and matching overlay from one source
- [ ] 3. Migrate Home; drop placement hacks the spans replace
- [ ] 4. Poster grammar on those coordinates: scale, small reused marks, one large gesture (proposed)

## Decisions

- Placement is a shared track template on the page shell. Children use StyleX `gridColumn` with line numbers. No `span()` helper until the same span actually repeats. No `<PageGrid>` wrapper.
- Tracks are `minmax(spacing.md, 1fr) + repeat(12, minmax(0, rem cap)) + minmax(spacing.md, 1fr)`. The cap is rem, not `72px`. Do not derive column width from `grid.module`. Tune the cap when Home is on the grid.
- The 14-track template does not change at breakpoints. Spans may change; track count does not.
- Error and not-found stay off the first consumer.
- The track recipe lives in one handwritten StyleX `defineVars` module, not `tokens.json`. Home and the overlay import that module. The rem cap is a var in the same object.
- Column numbers are CSS grid lines 1–15 (14 tracks). Tracks 1 and 14 are the fluid gutters. There is no separate 1–12 content index. The product name is **page grid**; `grid.module` stays the space step.
- Overlay visibility: Storybook toolbar plus `?grid` on the app. Off by default. No hotkey or env flag. The flag is read in the locale layout via a small Client gate (`useSearchParams`); the overlay itself stays a Server Component. Layouts cannot take `searchParams` or they would go stale.

## Progress and results

- Page grid vars live in `ui/page-grid/page-grid.stylex.ts` (`columnMax`, `gutter`). The shared template is `pageGridStyles.root` in `ui/page-grid/page-grid-root.ts`. Overlay paints the same root.
- Home lives in `app/[locale]/page.tsx` (`home.tsx` is gone). `main` uses `pageGridStyles.root`. Two panes: start lines 1–8 (`catalog`: `point` + `mast`), end 8–15 (`codes` + `mass`). Inner items are not on their own spans yet.
- `main` has no `paddingInline`; gutters are the side tracks. Catalog dropped the old negative left margin / extra left padding that existed for that padding.
- Copy is `point`: absolute inside `catalog`, `bottom`/`left` from `mastSize` (`0.64` + `spacing.sm`, `0.28`), `maxWidth` `18rem`, type `0.75rem`. Mast is still absolute (`bottom` `-0.16em`, `left` `-0.04em`) at `mastSize` (`min(25vw, 20rem)`). Switchers are flex `space-between` across the end pane; mass flex-grows under them.
- Overlay is a numbered ruler on CSS lines 1–15. Hairlines plus `flare` fill on content tracks (10% odd, 20% even). Gutters stay empty. Chips are opaque white with ink type. No `mix-blend-mode`. Mount is a `body` child in the locale layout, not under frost or Providers.

## Facts and references

- Home cover is `app/[locale]/page.tsx`. Grid children today are only the two panes. Copy and mast still use absolute offsets inside the start pane; switchers and mass are flex in the end pane. See styles `paneStart`, `paneEnd`, `point`, `mast`, `codes`, `mass`.
- The poster to extract grammar from (not copy) is `.references/light-2.png`. BACKLOG already points at it for Home.
- `primitive.grid.module` in `tokens/tokens.json` is the 0.25rem space step, not a column track. `primitive.layout.*` are breakpoints (`sm`–`xl`), already emitted as StyleX queries.
- Product styles are StyleX. Tokens compile through `tokens/build.js`. There is no parallel CSS grid stylesheet.
- Storybook already has theme and locale toolbars in `.storybook/preview.tsx`. Home is `App/Home`.
- `?grid` is read in `app/[locale]/layout.tsx` through `PageGridOverlayGate` (Suspense + `useSearchParams`). Home no longer owns the overlay.
- CONTEXT already names **tick**, **frame**, **cut**. Do not invent a second decoration vocabulary. Avoid calling the look HUD or cyberpunk.
- Agent check: StyleX `gridTemplateColumns` / `gridColumn` on Home. Overlay sits in the locale layout; only the `?grid` gate is a Client island.

## Continue from this file

Ask an agent to read this file, resolve the current step's open questions, and save agreed decisions with their reasons. Set the current step to **ready to implement** when its frontier is empty.

Implement when the user requests it. If an agreed decision must change, ask the user. Record progress and check the result against **Done when**.

When the step is complete, mark it done and prepare the next step for discussion.
