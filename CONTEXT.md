# Product design system

The vocabulary for how this product records visual decisions and how product UI is allowed to request them.

## Language

**Primitive token**:
A named raw material: a paint, a spacing step, a type size, a duration, a curve. Primitive colors exist so semantic tokens can reference them, not so product UI can paint with them. Other primitive scales are still the names product code uses until a purpose name exists.
_Avoid_: foundation token, core token, palette (as a layer name)

**Semantic token**:
A purpose name product UI uses: background, text, accent, and the like. Every semantic color has a value in every theme.
_Avoid_: alias token, decision token (except in prose about Polar)

**Theme**:
A complete assignment of values to semantic colors (light, dark). System is the user's color-scheme preference, resolved in the app, not a third palette. A theme is not a token layer.
_Avoid_: mode, color scheme (when you mean the named light/dark assignment), token set (when you mean the assignment)

**Exception**:
A file-scoped lint override that names why no token fits. Product files do not `eslint-disable` token rules.
_Avoid_: escape hatch, ignore, disable
