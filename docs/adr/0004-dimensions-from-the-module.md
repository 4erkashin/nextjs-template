# Dimensions count from a rem module

Every length that should track type is a multiple of `grid.module` (`0.25rem`). Space steps and layout breakpoints are those multiples with T-shirt names (`sm`, `md`, `lg`, `xl`). The module itself is Tokens Studio machinery: product StyleX never emits it. The 1px hairline stays `space.px` in CSS pixels so borders do not go fractional when root type is not 16px.

Layout uses the Tailwind rem scale (`sm` 40 / `md` 48 / `lg` 64 / `xl` 80). At a 16px root that is 640 / 768 / 1024 / 1280 CSS pixels — iPad portrait and landscape sit on `md` and `lg`. There is no `xs` (phones are the default) and no `2xl` yet. Each layout key becomes two queries: `queries.sm` is `@media (min-width: …)`; `queries.containerSm` is the same width as `@container`. Media and container share values; we did not take Tailwind’s smaller `@sm` table.

## Considered options

**Pixel module (`4px`).** Gaps would stay put while type scaled, and `{grid.module} * 160` would freeze `layout.sm` at 640px. We wanted one unit, so the module is rem and breakpoints stay rem.

**Invented query names (`wideWindow`, `viewportMinContent`).** Unfamiliar next to MUI / Tailwind / HIG-style `sm`. T-shirt names on `queries` match the layout tokens.

**DTCG-only aliases.** The spec has references, not multiply. Tokens Studio math (`{grid.module} * 160`) is what this pipeline already evaluates.
