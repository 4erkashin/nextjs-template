# StyleX as the product design-system contract

Working context for this initiative. Read this file before planning or implementing it. It records current agreements and findings; it is not permanent project policy.

**Goal.** Make StyleX, DTCG tokens, Storybook, and linting a coherent product design-system contract: product code expresses approved design decisions, themes and accessibility are correct by construction, and deliberate exceptions are visible and reviewable. This is an architectural direction, not a cleanup mandate for current WIP surfaces.

**Current step.** 1. System contract — grilling. Proposed: establish the vocabulary, layers, authoring surface, and exception policy before reorganizing existing implementation details.

**Done when.** The team has agreed and recorded: token-layer meanings and ownership; the public authoring API for product UI; which raw HTML and CSS capabilities remain available; the component/recipe boundary; theme, responsive, and reduced-motion behavior; the exception path; and Storybook/CI checks. A later implementation plan can demonstrate the contract with one vertical slice while preserving existing WIP work.

**Open questions.** Does the product want a constrained `Box`/`Text`/semantic-component API, or direct `stylex.create` as the normal product surface with lint-enforced tokens? Which property groups should be closed token sets first (color, spacing, typography, radius, shadow, motion), and which need an intentional temporary escape hatch? Are component tokens a shared layer, or should components consume semantics directly until repetition proves a component token? Is banning bare layout elements worth the accessibility and ergonomics cost for this project, or should only unrestricted `className`/inline-style escape hatches be prohibited? What is the minimum Storybook evidence required before a new primitive, token, or component API is accepted?

## Steps

- [ ] 1. System contract — agree the proposed vocabulary, authoring surface, enforcement boundary, and exception policy
- [ ] 2. Token taxonomy and generation — proposed: document DTCG sets, token layers, naming, references, and generated StyleX module boundaries
- [ ] 3. Authoring primitives and recipes — proposed: build the smallest typed product surface that makes approved decisions easy to express
- [ ] 4. Storybook and verification — proposed: turn stories into visual, theme, locale, responsive, motion, and accessibility evidence
- [ ] 5. Incremental adoption — proposed: migrate only touched/new surfaces; delete temporary escape hatches after their replacement exists

## Facts and references

- The current repository already has the intended substrate: [`tokens/tokens.json`](tokens/tokens.json) is the DTCG-shaped source of truth; [`tokens/build.js`](tokens/build.js) generates StyleX vars, themes, and media-query constants; generated files are not hand-edited. [`README.md`](README.md) documents this boundary.
- Current color use is semantic at the app boundary: generated primitive colors remain resolvable for references but are not exported. The existing project rule is primitive → semantic → component, for all token types, not only color. [`features/error-widget/INITIATIVE.md`](features/error-widget/INITIATIVE.md).
- The repository already compiles StyleX in both Next and Storybook, has StyleX cookbooks, themes, Storybook a11y, and lint rules against raw visual values. These are foundations to consolidate, not evidence that present components must be redesigned. [`babel.config.js`](babel.config.js), [`app/globals.css`](app/globals.css), [`ui/stylex-cookbook.stories.tsx`](ui/stylex-cookbook.stories.tsx), [`eslint.config.js`](eslint.config.js), [`package.json`](package.json).
- Polar's Orbit direction is the key conceptual reference: token names represent decisions, typed props constrain the available vocabulary, CI—not prose—enforces the contract, and migration is incremental. Treat it as a direction under active development, not a drop-in architecture. [Polar’s Orbit article](https://polar.sh/blog/orbit-llm-safe-design-system) and [its public repository](https://github.com/polarsource/polar).
- `shadcn-cssinjs` is a useful implementation reference for translating a familiar Tailwind-oriented component experience to StyleX. It is not a requirement to reproduce shadcn’s API or component catalogue. [shadcn-cssinjs](https://github.com/shadcn-labs/shadcn-cssinjs).
- Linear is a possible comparison target only. Do not attribute a StyleX architecture or copy conventions from it until a specific public source is selected and checked.

## Proposed design principles

- **Decisions over values.** Product code should request `surface.card`, `text.muted`, `space.stack.m`, or a named component variant—not a color, pixel value, or one-off class. A primitive scale exists to construct semantic decisions, not as routine product vocabulary.
- **One-way layers.** Proposed taxonomy: foundation/primitive values → semantic tokens that describe purpose → component tokens only where a component has stable, shared internal decisions → recipes/components that consume those tokens. References point downward; product code normally starts at semantic or component level.
- **Tokens have types and ownership.** Keep DTCG types accurate and assign each family an owner and rationale: color, space, typography, sizing, radius, border, elevation, motion, breakpoint/query. A token is added because a reusable decision exists, not to legalize a one-off value.
- **StyleX is the compiler, not the design system.** Use `defineVars`/themes for token transport and `stylex.create` for styles. Add a typed primitive or recipe only when it narrows choices, carries semantics, or removes repeated policy. Avoid a giant universal component that merely mirrors CSS.
- **Constrain the common path.** Prefer closed, typed token choices for high-drift properties. Raw strings, inline styles, unrestricted `className`, and raw layout elements are policy decisions: either prohibit them with lint or allow them through a named, auditable exception. Do not rely on agent instructions alone.
- **Keep semantic HTML.** If a `Box`-like primitive is adopted, it must preserve native semantics through a deliberately typed `as` surface. Do not trade away landmarks, headings, lists, labels, or native controls merely to restrict styling.
- **Theme and preference correctness is authored once.** Semantic token names must resolve in every supported theme. Responsive conditions and reduced-motion behavior belong in the generated token/query vocabulary or a documented recipe, not scattered alternate value systems.
- **Stories are executable design evidence.** Every public primitive, recipe, and component should have stories for its meaningful states; the system level must cover light/dark/system, supported locales, key breakpoints, reduced motion, and accessibility. Stories are not a substitute for application integration tests.
- **Exceptions improve the system.** An exception should state why no token/recipe fits, be localized and lint-recognizable, have an owner or expiry condition, and be periodically reviewed. Repeated exceptions trigger a design-system decision; they do not silently become precedent.
- **Migrate by demand.** New or touched work follows the contract. Existing WIP is evaluated for intent and seams, not rewritten to appear tidy. Use a small, representative vertical slice to validate each new rule before broad adoption.

## Proposed first vertical slice

Choose one small product surface with layout, text, action, state, and both themes. Define only the semantic decisions it genuinely repeats; expose them through direct StyleX or the smallest useful primitive/recipe; add its stories and checks; then review the authoring experience. The outcome decides whether a `Box`/`Text` API earns its place and which lints should become hard errors.

## Continue from this file

Ask an agent to read this file, resolve the current step's open questions, and save agreed decisions with their reasons. Set the current step to **ready to implement** when its frontier is empty.

Implement when the user requests it. If an agreed decision must change, ask the user. Record progress and check the result against **Done when**.

When the step is complete, mark it done and prepare the next step for discussion.
