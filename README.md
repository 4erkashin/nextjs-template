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

After this folder is a **public** GitHub repo, create an app with:

```bash
npx create-next-app@latest my-app --example https://github.com/<user>/<repo> --use-pnpm
```

`--example` only accepts a public `https://github.com/...` URL. Use `--use-pnpm` so the installer matches this lockfile.

## Favicon

Do not put the primary favicon in `public/favicon.ico`.

Add `app/favicon.ico` at the root of `app/`. Next.js injects the `<link>` via the [Metadata file convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons).

Optionally add `app/icon.png` / `app/icon.tsx` and `app/apple-icon.png` for other sizes / Apple.

This starter ships no icon so consumers are not stuck with another product’s brand.
