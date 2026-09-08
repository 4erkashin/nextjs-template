# Font families

Working context for this initiative. Read this file before planning or implementing it. It records current agreements and findings; it is not permanent project policy.

**Goal.** Give the template a small, named set of type roles (body, plus whatever else we keep) so product UI is not stuck on a single `system-ui` stack, and so loaders and tokens stay aligned.

**Current step.** 1. Roles and faces — grilling. Proposed: follow a shadcn-like split (two proportional roles plus mono), then pick faces that cover all four locales. Do not implement widget mono here.

**Done when.** Proposed: each agreed role has a token stack and a `next/font` loader; document chrome uses the body role; mono is available to surfaces that need it. Checks: token build, typecheck, and a computed-family check on `html` (today the home story asserts `system-ui`). Locale coverage for every chosen face. Confirm the live shadcn defaults before locking names.

**Open questions.** How many roles, and what are their names (body / heading / mono, or sans / serif / mono)? Is the second proportional role a distinct family, or a weight of the body face? Which faces, and do they all need `latin` + `latin-ext` + `cyrillic`? Does app mono reuse the widget’s `JetBrains_Mono` / `--font-mono`, or stay a separate stack? Where do loader classes live (`html` vs feature roots)?

## Steps

- [ ] 1. Roles and faces — agree the role set and faces
- [ ] 2. Tokens and loaders — proposed: stacks in `font.*`, written `next/font` literals, document wiring
- [ ] 3. Consume on surfaces — proposed: home, cookbooks, then other features; sizes stay out unless agreed

## Facts and references

- App body type is primitive `font.family`: `system-ui, sans-serif`. [`theme/root-style.ts`](theme/root-style.ts) applies `fonts.family` on `html`. Home story currently expects `system-ui` in computed style. [`tokens/tokens.json`](tokens/tokens.json), [`app/[locale]/page.stories.tsx`](app/[locale]/page.stories.tsx).
- Locales are `en`, `ru`, `uk`, `pt-BR`. Widget work already agreed one face for all four, with coverage `latin` + `latin-ext` + `cyrillic`. [`i18n/routing.ts`](i18n/routing.ts), [`features/error-widget/INITIATIVE.md`](features/error-widget/INITIATIVE.md).
- Widget family is still `Share_Tech_Mono` via `--error-widget-mono`. That initiative’s typography step is to add primitive `font.mono` as `var(--font-mono), ui-monospace, monospace` with `JetBrains_Mono` weight `400`. `font.family` stays system-ui in that step. `font.mono` on document `<html>` is parked there.
- `fontFamily` tokens store a CSS stack. Loaders stay written `next/font` literals (`variable: "--font-…"`); tokens do not feed the loader. Token build already emits every `font.*` leaf into StyleX `fonts`.
- Non-color tokens stay grandfathered in `primitive` until their own agreed scope. This initiative is that scope for families, not for size / leading / tracking.
- User recollection: shadcn-style promotion of two families plus mono. Agent must check current shadcn theme CSS variables (often `--font-sans`, `--font-serif`, `--font-mono`) and Geist (sans + mono only) before treating any of those as the model.

## Continue from this file

Ask an agent to read this file, resolve the current step's open questions, and save agreed decisions with their reasons. Set the current step to **ready to implement** when its frontier is empty.

Implement when the user requests it. If an agreed decision must change, ask the user. Record progress and check the result against **Done when**.

When the step is complete, mark it done and prepare the next step for discussion.
