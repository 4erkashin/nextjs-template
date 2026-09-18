# Viewports are CSS-pixel canvases

A **viewport** is an exact width and height for inspecting composition. A
**layout breakpoint** is a rem multiple of the module (ADR-0004). Mixing
those would make `layout.md` and tablet-portrait look like the same fact.
Viewport tokens stay in `primitive.viewport` as `px` dimensions and never
enter StyleX vars.
