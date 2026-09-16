- Locale switcher look
- Theme switcher look
- home page: switchers composed
- home page: composition adapted for the mobile screens
- HTTP client, thin. Base URL, JSON, error shape. Outcome: `lib/http` (or similar) + a short README note.
- OpenAPI codegen in the repo. One tool, tiny spec, generate types + request fns. Outcome: `pnpm` script, dummy `GET /health`.
- Glue: generated client → Query. One query hook, one MSW handler, one cookbook/story that loads. Outcome: the OpenAPI loop actually runs.
- One field primitive. Text field on Base UI. Label, error, disabled. No form library yet.
- One cookbook form. Submit, show error, disable while pending. Native form + the field is enough; skip RHF/Zod if Monday is dying.
- 0.0.1 RELEASE. Tag, README “what this ships,” kill leftover stubs.
- i want i18n to be colocated with the components, not a separate big jsons, so the core solution should be reconsidered i reckon
- how to cook vignette?
- should i extract typography or not?
- sans fonts?
- track unused locale keys (eslint?)
- stylex source maps for dev?

---

DONE:

- home page: title and description composed
- sans font: onest
- home page: decoarative version composed
