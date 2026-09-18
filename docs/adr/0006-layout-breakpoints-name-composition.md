# Layout breakpoints name composition shape

Product StyleX uses `queries.mobile`, `queries.tablet`, and `queries.desktop`. Those names are sheet shapes (tall and narrow, tall with room, wider than tall), not devices, not a min-width ladder, and not orientation words. Callers pick a name; DTCG plus `tokens/build.js` own the `@media` string. Rem min-width plus CSS orientation make the three queries. Square counts as tall. The **module** still counts rem for space and for the `48rem` tablet cut (ADR-0004). StyleX `default` holds only facts that do not change with the sheet; each composition that does change is keyed, including `desktop`.

## Considered options

**Width-only media queries.** A phone on its side is wide in pixels and would look like a tablet sheet. Width is not the type of the token.

**Aspect-ratio in the query.** With square = tall, that test is the same as orientation. This kit has no 4/3 or 16/9 bands.

**T-shirt `sm`–`xl` as product names (ADR-0004).** Those names are a SaaS ladder. They do not say which composition is on the sheet.

**Landscape on StyleX `default`.** That hid `desktop` as the silent else and kept the old min-width habit.
