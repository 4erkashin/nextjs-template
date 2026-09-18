# Dimensions count from a rem module

Every length that should track type is a multiple of `grid.module` (`0.25rem`). Space steps are those multiples with T-shirt names (`xxs`–`lg`). The **layout breakpoint** tablet cut is also a module multiple (`48rem`, `{grid.module} * 192`). Product names for layout breakpoints are not T-shirt sizes; see ADR-0006. The module itself is Tokens Studio machinery: product StyleX never emits it. The 1px hairline stays `space.px` in CSS pixels so borders do not go fractional when root type is not 16px.

## Considered options

**Pixel module (`4px`).** Gaps would stay put while type scaled, and `{grid.module} * 192` would freeze the tablet cut at 768px. We wanted one unit, so the module is rem and that cut stays rem.

**DTCG-only aliases.** The spec has references, not multiply. Tokens Studio math (`{grid.module} * 192`) is what this pipeline already evaluates.
