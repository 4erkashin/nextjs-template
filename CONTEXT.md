# Product design system

The vocabulary for how this product records visual decisions and how product UI is allowed to request them.

## Language

**Primitive token**:
A named raw material: a paint, a spacing step, a duration, a curve. Primitive colors exist so semantic tokens can reference them, not so product UI can paint with them. Other primitive scales are still the names product code uses until a purpose name exists.
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
A purpose name product UI uses: background, text, accent, and the like. Every semantic color has a value in every theme.
_Avoid_: alias token, decision token (except in prose about Polar)

**Theme**:
A complete assignment of values to semantic colors (light, dark). System is the user's color-scheme preference, resolved in the app, not a third palette. A theme is not a token layer.
_Avoid_: mode, color scheme (when you mean the named light/dark assignment), token set (when you mean the assignment)

**Exception**:
A file-scoped lint override that names why no token fits. Product files do not `eslint-disable` token rules.
_Avoid_: escape hatch, ignore, disable
