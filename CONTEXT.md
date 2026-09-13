# Product design system

The vocabulary for visual decisions: the token names product UI may request, and the look those tokens paint.

## Language

### Tokens

**Primitive token**:
A named raw material: a paint, a spacing step, a duration, a curve. Product UI may use these names, including primitive colors.
_Avoid_: foundation token, core token, palette (as a layer name)

**Module**:
The repeating rem step that space and layout counts are made of. Product UI never asks for the module by name.
_Avoid_: unit, grid unit (as a product token), xs (for the step itself)

**Space**:
A named padding, gap, or inset step (xxs through lg), plus the 1px hairline.
_Avoid_: module (as a space step)

**Layout breakpoint**:
A named min-width where layout may change (`sm`, `md`, `lg`, `xl`). Below `sm` is the default (phones). The same T-shirt names as space, on a different object.
_Avoid_: wide, viewport, media query (as the token name)

**Semantic token**:
A purpose name with a value in every theme. Today that is background, foreground, and primary. More names appear when the UI repeats a purpose.
_Avoid_: alias token, decision token (except in prose about Polar)

**Theme**:
A complete assignment of values to semantic colors (light, dark). System is the user's color-scheme preference, resolved in the app, not a third palette. A theme is not a token layer.
_Avoid_: mode, color scheme (when you mean the named light/dark assignment), token set (when you mean the assignment)

### Look

**Look**:
Hard cuts, hairlines, and protocol type. Invert is the hover. Press is the click.
_Avoid_: HUD, neon city, glass, cyberpunk (as a vague adjective), chrome (as a bucket for extra marks around a control)

**Cut**:
A named silhouette made by clipping corners, not rounding them. The names in use are rect, slash, and tab.
_Avoid_: radius, rounded, chamfer (as the product name), polygon (as the product name)

**Surface**:
How a cut is painted: fill (solid mass) or outline (the same cut with a hole).
_Avoid_: variant, style, bordered, stroke (as the prop name)

**Hole**:
An inset of the same cut that leaves a hairline gap. That gap is the outline.
_Avoid_: inner border, stroke

**Invert**:
Foreground and background swapped. The hover and focus of a control.
_Avoid_: highlight, tint, hover color

**Frame**:
Nested hairlines around content (outer line, inner line, L-corners). A control sits in a frame; a control is not a frame.
_Avoid_: card, panel (when you mean the frame), chrome

**Tick**:
Short hash marks on an edge that read as a scale.
_Avoid_: decoration, noise, ruler

**Press**:
A 1px downward shift. The activation of a control.
_Avoid_: bounce, scale, elastic

**Snap**:
An instant change of cut or state. The silhouette does not morph.
_Avoid_: morph

**Scan**:
A fill or hairline that travels along an edge or a bar.
_Avoid_: spinner, pulse (when you mean travel)

**Scanlines**:
A repeating hatch of hairlines over a surface. Idle hatch, not a traveling scan.
_Avoid_: CRT, raster, scan (when you mean the hatch)

**Glitch**:
A short hard break in the image that then stops. An event, not idle hatch.
_Avoid_: noise, distortion (as the product name)

**Color split**:
Two accent colors offset by a few pixels, then locked. Same family as glitch.
_Avoid_: chromatic aberration, RGB split, fringing

**Glitch color**:
The first channel of a color split.
_Avoid_: red channel

**Glitch pair**:
The second channel of a color split, thrown the other way.
_Avoid_: blue channel

**Glow**:
Light that leaks past an edge. A signal on scan or alert, not the idle or hover fill of a control.
_Avoid_: bloom, neon, shadow (when you mean the leak)
