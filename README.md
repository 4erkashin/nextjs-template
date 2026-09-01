# nextjs-template

A personal Next.js starter: App Router, TypeScript, pnpm, ESLint/Prettier, SVGR (Turbopack), empty `app` / `ui` / `features` / `domain` / `lib` layers, next-intl (`en` / `ru` / `uk` / `pt-BR`), TanStack Query, and browser MSW. Unstyled on purpose.

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

## Client data (Query + MSW)

`pnpm dev` starts a **browser** Mock Service Worker. Add handlers for endpoints that do not exist yet; everything else hits the real network. Handlers live in `mocks/handlers.ts` (empty until you add some).

- Kill switch: `NEXT_PUBLIC_MSW=0` (see `.env.example`).
- Remove MSW: delete `mocks/`, drop `MswGate` from `app/providers.tsx`. Full sweep: [`mocks/README.md`](mocks/README.md).
- Query (`lib/query/`) stays when MSW goes.

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

Prettier formats staged files and may restage them. ESLint then checks staged JS/TS (no auto-fix). The commit is refused if ESLint fails, if a staged file contains git conflict markers, or if you stage `.env` / `.env.*` (`.env.example` is allowed).

### pre-push

`pnpm typecheck` runs when the push includes TypeScript, `tsconfig*.json`, `package.json`, `pnpm-lock.yaml`, or `next.config.*`. Docs-only pushes skip it.

## Favicon

Do not put the primary favicon in `public/favicon.ico`.

Add `app/[locale]/favicon.ico` next to the root layout. Next.js injects the `<link>` via the [Metadata file convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons).

Optionally add `app/[locale]/icon.png` / `icon.tsx` and `apple-icon.png` for other sizes / Apple.

This starter ships no icon so consumers are not stuck with another product’s brand.
