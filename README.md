# nextjs-template

A personal Next.js starter: App Router, TypeScript, pnpm, ESLint/Prettier, SVGR (Turbopack), and empty `app` / `ui` / `features` / `domain` / `lib` layers. Unstyled on purpose.

## Scripts

| Script | Command |
| --- | --- |
| `dev` | `next dev` |
| `build` | `next build` |
| `lint` | `eslint` |
| `format` | `prettier --write .` |
| `typecheck` | `tsc --noEmit` |

Also available: `start` (`next start`) and `format:check` (`prettier --check .`).

## Create an app from this template

```bash
npx create-next-app@latest my-app --example https://github.com/4erkashin/nextjs-template --use-pnpm
```

Use `--use-pnpm` so the installer matches this lockfile. Or use **Use this template** on GitHub.

## Favicon

Do not put the primary favicon in `public/favicon.ico`.

Add `app/favicon.ico` at the root of `app/`. Next.js injects the `<link>` via the [Metadata file convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons).

Optionally add `app/icon.png` / `app/icon.tsx` and `app/apple-icon.png` for other sizes / Apple.

This starter ships no icon so consumers are not stuck with another product’s brand.
