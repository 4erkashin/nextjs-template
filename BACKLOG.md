- Home page looks like a starter, not a sketch. reference: `.references/light-2.png`, story: `App/Home` Default.
  - structure and contrast follows the reference
  - any reason we have separate home.tsx?

- Locale switcher look. Same behavior, cut / invert / current state. Outcome: `ui/switcher-locale` matches the home frame.
- Theme switcher look. Sibling of locale. Outcome: `ui/switcher-theme` matches.
- HTTP client, thin. Base URL, JSON, error shape. Outcome: `lib/http` (or similar) + a short README note.
- OpenAPI codegen in the repo. One tool, tiny spec, generate types + request fns. Outcome: `pnpm` script, dummy `GET /health`.
- Glue: generated client → Query. One query hook, one MSW handler, one cookbook/story that loads. Outcome: the OpenAPI loop actually runs.
- One field primitive. Text field on Base UI. Label, error, disabled. No form library yet.
- One cookbook form. Submit, show error, disable while pending. Native form + the field is enough; skip RHF/Zod if Monday is dying.
- 0.0.1 RELEASE. Tag, README “what this ships,” kill leftover stubs.
- how to cook vignette?
- should i extract typography or not?
- sans fonts?

---

DONE:

- [ ] Home page:
  - [x] giant number corresponds to the version in package.json and sits with the same vibe as the reference do
  - [x] vertical top to bottom word RELEASE (i18n supplied) along the left edge, around one quarter cut off by the screen edge from the left, small gap with the horisontal giant number
