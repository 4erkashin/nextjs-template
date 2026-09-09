# Product UI authors StyleX on native HTML

StyleX compiles tokens and styles; it is not a component library. Product UI uses `stylex.create` / `stylex.props` on real HTML elements, with generated vars for color, space, fonts, and motion (plus query consts). We do not ship `Box`/`Text` wrappers. Native `className` stays only for infrastructure StyleX cannot own (today: next/font’s `--font-mono` on `<html>`). A constrained component API is allowed only when a shipped component earns it.
