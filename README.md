# nextjs-template

A personal Next.js starter:

- App Router
- TypeScript
- `app` / `ui` / `features` / `domain` / `lib` layers
- StyleX (Babel + PostCSS)
- Tokens Studio JSON → StyleX vars
- Storybook
- Motion (`motion/react`) for layout and drag
- next-intl (`en` / `ru` / `uk` / `pt-BR`)
- TanStack Query
- browser MSW
- pnpm
- ESLint / Prettier
- SVGR (Turbopack)

## Create an app from this template

```bash
npx create-next-app@latest my-app --example https://github.com/4erkashin/nextjs-template --use-pnpm
```

Use `--use-pnpm` so the installer matches this lockfile. Or use **Use this template** on GitHub.

## Internationalization (next-intl)

Locales live in `i18n/routing.ts`: English is unprefixed (`/`), the others are `/ru`, `/uk`, `/pt-BR`. Messages are `messages/*.json`; TypeScript keys and ICU args are typed from `messages/en.json`.

- Import `Link` / `useRouter` / `usePathname` / `redirect` / `permanentRedirect` from `@/i18n/navigation`, not `next/link` or `next/navigation`. `notFound`, `useParams`, and `useSearchParams` stay on `next/navigation`.
- First visit negotiates `Accept-Language` (then a cookie). Unknown languages fall back to `en`.
- Storybook has a locale toolbar (`storybook-next-intl`).

## StyleX and tokens

`tokens/tokens.json` → gitignored `tokens/generated/`. Do not edit generated files. `dev`, `typecheck`, `storybook`, and `build` generate first.

- Themes: `light` / `dark` / `system` from `@/tokens/generated/themes`.
- Motion tweens: `tokens/generated/motion.ts`. Reduced motion is `MotionConfig`.
- `stylex.create`; nest conditions on the property. No raw hex / `px` / `ms` (allow `0`, `100%`, `currentColor`).
- CSS motion: generated `motion` vars + `queries.reducedMotion`. Cookbook: `ui/cookbook-stylex/`.
- `motion/react`: layout / drag / sequence, not hover color. Cookbook: `ui/cookbook-motion/`.
- Next: Babel + PostCSS. Storybook: `@stylexjs/unplugin` + addon-themes (toolbar ≠ cookie).
- Reset: `modern-normalize`.

## Typography

Mono is JetBrains Mono in `theme/fonts.ts`, a **variable face**: one file, CSS var `--font-mono`, token `fonts.mono`. `fontWeight` 100–800 are real cuts, not fakes between 400 and 800. Sans is still the system stack.

## Client data (Query + MSW)

`pnpm dev` starts a **browser** Mock Service Worker. Add handlers for endpoints that do not exist yet; everything else hits the real network. Handlers live in `mocks/handlers.ts` (empty until you add some).

- Kill switch: `NEXT_PUBLIC_MSW=0` (see `.env.example`).
- Remove MSW: delete `mocks/`, drop `MswGate` from `app/providers.tsx`. Full sweep: [`mocks/README.md`](mocks/README.md).
- Query (`lib/query/`) stays when MSW goes.

## Dependency updates

Direct deps are exact versions (no `^`, no `latest`). `packageManager` pins pnpm. Renovate opens grouped PRs weekly; nothing auto-merges.

This repo cannot install the GitHub App or flip Dependabot alerts for you. After the files are on `main`:

```bash
./scripts/enable-dep-loop.sh
```

## Git hooks

`commit-msg`, `pre-commit`, and `pre-push` run through lefthook. Do not pass `--no-verify` to dodge them.

### Commit messages

Every commit is `type: subject`. The first line is a **type** (what kind of change), a colon and space, then a short **subject** (what changed). Allowed types are listed in `conventional-commits.json`; the `commit-msg` hook rejects anything else.

```
feat: add password reset
```

**Scope** is optional. Put the area of the code in parentheses between the type and the colon when that helps — a package, route, or layer, not a ticket number.

```
fix(api): handle empty payload
```

**`!`** is optional. Put it immediately before the colon when the change is **breaking** (callers or users must change how they use this). That is what would become a major version if this repo ever published a package.

```
feat!: drop v1 routes
feat(api)!: require auth on /export
```

`feat` is a new capability, `fix` is a bug fix, `!` is breaking. Other types (`docs`, `chore`, `refactor`, …) are for humans and tools; they do not imply a version bump.

Prefixes listed as `exceptions` in that file skip the type check.

### pre-commit

Prettier formats staged files and may restage them. ESLint then checks staged JS/TS (no auto-fix). If you stage token JSON or `tokens/build.js`, `pnpm tokens:build` runs. The commit is refused if ESLint fails, if a staged file contains git conflict markers, or if you stage `.env` / `.env.*` (`.env.example` is allowed).

### pre-push

`pnpm typecheck` runs when the push includes TypeScript, `tsconfig*.json`, `package.json`, `pnpm-lock.yaml`, `next.config.*`, token sources, `babel.config.js`, or `postcss.config.*`. Docs-only pushes skip it.

## Favicon

Do not put the primary favicon in `public/favicon.ico`.

Add `app/[locale]/favicon.ico` next to the root layout. Next.js injects the `<link>` via the [Metadata file convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons).

Optionally add `app/[locale]/icon.png` / `icon.tsx` and `apple-icon.png` for other sizes / Apple.

This starter ships no icon so consumers are not stuck with another product’s brand.

## Bundle analysis

This app builds with Turbopack. When a client import looks heavy, inspect the production graph (Next 16.1+):

```bash
pnpm next experimental-analyze
```

`--output` writes `.next/diagnostics/analyze` for before/after diffs. The command is experimental; there is no `analyze` script so clones do not inherit a frozen CLI name. Storybook is Vite — this UI does not cover it.

## Not shipping

Tools that look useful and are still out. `create-next-app --example` copies every script and CI job; “strip it later” is only true for this git history.

### Knip

[Knip](https://knip.dev/) finds unused files, unused exports, and leftover `package.json` dependencies. ESLint only sees unused locals inside a file.

It auto-detects Next `app/**/page` and Storybook `*.stories.*`. It does not understand `tokens/build.js`, gitignored StyleX under `tokens/generated/`, `scripts/enable-dep-loop.sh`, the MSW worker in `public/`, or empty `features/` / `domain/` placeholders. That ignore/entry list would become starter contract: every clone pays it, and this repo would have to keep it honest.

Unused locals stay an ESLint warning. Unused packages stay a Renovate/review problem. Run `npx knip` ad hoc if you want a one-shot report; do not add the dependency.

### Cycle detection

File cycles (`a.ts` → `b.ts` → `a.ts`) can yield `undefined` at module init. This starter does not fail CI on them.

`import/no-cycle` skips type-only imports (this repo uses those on purpose) and gets expensive as clones grow. madge / dependency-cruiser need the same ignore/entry list as Knip: generated tokens, Storybook, scripts, mixed `@/` and relative StyleX paths. Clones inherit that list.

Layer _direction_ is already ESLint: `ui/` must not import `features/` or `domain/`. Barrels (`index.ts` as a public API) are allowed; do not add a scanner to police them.

Run `npx madge --circular --extensions ts,tsx --ts-config tsconfig.json app ui lib theme i18n mocks features domain` ad hoc if you want a one-shot report. Do not add the dependency.

### `@next/bundle-analyzer`

The Webpack plugin (`ANALYZE=true next build`). Extra dependency, wraps `next.config`, and does not replace the Turbopack analyzer above. Do not add it.

### Bundle-size budget

No kilobyte cap in CI. CI does not run `next build`. An absolute first-load cap is wrong the day a clone adds a feature; a percent-vs-`main` check needs a stored baseline and a production build on every PR. Use **Bundle analysis** when something feels wrong. Do not add `size-limit`, bundlesize, or a first-load JS gate.
