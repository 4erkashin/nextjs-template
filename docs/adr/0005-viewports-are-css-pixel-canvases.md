# Viewports are CSS-pixel canvases

A **viewport** is an exact width and height for inspecting composition. A
**layout breakpoint** is named composition geometry (ADR-0006). Mixing
those would make a `desktop` canvas and a `desktop` breakpoint look like
the same fact. Viewport tokens stay in `primitive.viewport` as `px`
dimensions and never enter StyleX vars.
