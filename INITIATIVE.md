# Editor workspace settings and vendor-safe lint / typecheck

Working context for this initiative. Read this file before planning or implementing it. It records current agreements and findings; it is not permanent project policy.

**Overall goal.** Clone-to-clone editor behavior should live in git at the workspace level, and an agent (or human) running ESLint or typecheck should not spend time or fail on vendor-shipped or generated trees. Why those two belong together, and how far each goes, is not yet agreed.

**Now:** 1. Commit useful VS Code workspace settings — draft; needs grilling.

**Goal (draft).** Proposed: a committed `.vscode/` that captures settings this repo actually needs, without dumping personal or machine-specific editor prefs.

**Done when (draft).** Workspace settings that the user agrees belong in git are tracked; `.gitignore` does not hide them; clones pick them up without extra setup. Which keys count as “useful,” and whether `extensions.json` / other `.vscode` files are in this chunk, remain open.

**Verify (draft).** After agreement: a fresh clone (or `git check-ignore`) shows the chosen files tracked; opening the folder applies those settings. Exact check commands wait on the file list.

**Scope (draft).** Proposed first slice: inventory and commit workspace VS Code config only. ESLint / `tsc` ignore behavior is chunk 2. Cursor rules, agent skills, and CI job changes are unagreed and not implied by chunk 1.

**Open decisions.** What is the source of “useful” settings (current user profile vs a small stack-specific set)? Which keys are allowed in git (formatter, TS SDK, ESLint working dirs, search/watcher excludes) versus kept user-local? Does this chunk include recommended extensions? See pending questions.

## Queue — provisional

- [ ] 1. Commit useful VS Code workspace settings
- [ ] 2. Keep agent-run ESLint and typecheck off vendor-shipped / generated trees

Queue entries are checkpoints, not implementation contracts. Revise their order and scope as the initiative becomes clearer.

## Continue from this file

### Planning with grill-me

Use the user's existing `$grill-me` skill for the interview. This file supplies context and records progress; it does not define another interviewing procedure.

After each answered round, save settled decisions with brief reasons, useful findings, and the remaining questions before continuing. Keep recommendations visibly unagreed. Resolve facts from the project or appropriate sources; ask the user for decisions. Resume from unresolved questions without re-asking settled ones unless new evidence or user direction reopens them.

Keep the current card a draft until the user confirms the complete agreement. Then mark it ready and remove draft labels from its agreed fields. Ready means the card is agreed; begin implementation when the user requests it. Updating this document alone does not authorize implementation.

### Implementation handoff

Read the current card, relevant facts, and referenced project instructions. Implement the requested agreed chunk, making routine implementation choices within its behavior, scope, and architectural boundaries.

If progress requires changing those agreements, record the specific decision needed, evidence, affected work, and any proposed options. Mark the card as needing a decision and return that question to planning; keep completed work and safe remaining work clear. Save progress and outstanding checks when implementation is interrupted, so a fresh conversation can resume.

Compare results with the agreed acceptance conditions. Record verification evidence, failed or deferred checks, and remaining limitations accurately. Keep unfinished acceptance work on the current card.

Once the chunk is complete, update facts, check its queue entry, and record its compact result below. Replace the top card with the next unagreed draft using the queue and new findings. Stop implementation at that boundary unless the user has authorized further work. If the initiative has no remaining work, mark it complete instead of inventing another chunk.

## Decisions

Initiative-wide (from the request; not yet grilled):

- Two chunks, in this order: (1) workspace VS Code settings under git, (2) ESLint / typecheck must not explode against vendor-shipped material.
- This file lives at the project root (`INITIATIVE.md`).

No chunk-level agreements yet.

## Pending questions and investigation

### For grill-me (user decisions)

1. **Settings source.** Dump from the current user/workspace VS Code settings, or author a small committed set for this stack (ESLint, Prettier, TypeScript, StyleX/token noise)? Recommendation (unagreed): a small stack-specific set, not a full user-profile dump.
2. **What “useful” includes.** Formatter / default formatter, `typescript.tsdk`, ESLint validate/working directories, import-on-save (already locally `never`), `files.exclude` / `search.exclude` / `files.watcherExclude`, editor code actions? Any keys that must never be committed (theme, font, window, AI, paths)?
3. **`.vscode` surface.** `settings.json` only, or also `extensions.json` (and maybe `tasks.json`)? This repo currently has only `settings.json`.
4. **Chunk 1 vs chunk 2 overlap.** Should search/watcher excludes for `node_modules`, `.next`, `tokens/generated`, and similar land in chunk 1 as editor hygiene, or wait until chunk 2 so ignore policy is one decision?
5. **Chunk 2 target.** What “blow itself up” means: OOM / timeout on huge trees, agents “fixing” generated or `node_modules` files, `tsc` picking extra globs, or all of those? What counts as vendor-shipped: `node_modules` only, plus generated (`tokens/generated/`, `messages/*.d.json.ts`, `public/mockServiceWorker.js`, `.next`), plus `storybook-static` / `coverage`?
6. **Chunk 2 mechanism.** Config only (`eslint.config.js` `globalIgnores`, `tsconfig.json` `exclude` / narrower `include`), VS Code ESLint/TS excludes, agent-facing instructions (when to run `pnpm lint` / `pnpm typecheck` and with which paths), or some mix? Recommendation (unagreed): make the tools themselves refuse those trees first; docs/rules only if config is not enough.

### Agent investigation (not user interview)

- After chunk 1’s allowed keys are agreed, diff user-level VS Code settings against a safe committed subset (do not copy secrets, machine paths, or unrelated UI prefs).
- For chunk 2: confirm ESLint 9 / `eslint-config-next` default ignore behavior when this repo’s `globalIgnores` override runs; confirm whether `pnpm lint` (`eslint` with no file args) and `pnpm typecheck` walk generated or static output dirs in this tree. Record evidence in Facts.

## Facts and references

- `.gitignore` does not mention `.vscode`. Workspace settings can be committed; they are not ignored today.
- `.vscode/settings.json` exists and is currently untracked. It only sets `editor.codeActionsOnSave` so `source.organizeImports` and `source.sortImports` are `"never"` (likely to avoid fighting `eslint-plugin-perfectionist` in `eslint.config.js`). No `extensions.json` or other `.vscode` files.
- `package.json` scripts: `"lint": "eslint"` (no path args) and `"typecheck": "pnpm tokens:build && tsc --noEmit"`. Agents that invoke those scripts run the full configured project, not a single file.
- `lefthook.yml` pre-commit ESLint runs on staged `*.{js,jsx,ts,tsx,mts,mjs,cjs}` (excludes `scripts/**`). Pre-push typecheck runs `pnpm typecheck` when TypeScript or related config/token files are in the push. Hooks are not the same as an agent invoking lint/typecheck on the whole tree.
- `eslint.config.js` replaces `eslint-config-next` default ignores via `globalIgnores` (comment: “Override default ignores of eslint-config-next”). The listed ignores include `.next/**`, `out/**`, `build/**`, `next-env.d.ts`, `.agents/**`, `scripts/**`, `public/mockServiceWorker.js`, `messages/**/*.d.json.ts`, `tokens/build.js`, `tokens/generated/**`, `babel.config.js`, `postcss.config.js`. That list does **not** mention `node_modules`, `coverage`, or `storybook-static`. Whether ESLint still ignores `node_modules` by engine default after this override is unverified here.
- `tsconfig.json` has `"include"` of `**/*.ts` / `**/*.tsx` (plus Next/Storybook type roots) and `"exclude": ["node_modules"]` only. `skipLibCheck` is true. Generated StyleX under `tokens/generated/` is gitignored (`.gitignore`) but is produced locally by `pnpm tokens:build` (README: StyleX and tokens). `storybook-static/` exists on disk in this working tree and is gitignored; it is not in `exclude`. `.next/types/**/*.ts` is included on purpose for Next.
- `.prettierignore` already skips `node_modules`, `.next`, generated tokens, next-intl `*.d.json.ts`, MSW worker, lockfiles, `.agents`. Prettier ignore is not ESLint or `tsc` ignore.
- README documents lint/typecheck via hooks (`pnpm exec eslint` on staged files; `pnpm typecheck` on pre-push) and does not document committed editor settings.

## Progress and results

None. Draft only; no implementation.

## Parked

- Cursor-specific rules or skills telling agents how to invoke lint/typecheck (depends on chunk 2 mechanism).
- CI adding or changing lint/typecheck jobs (not requested).
- Knip / cycle scanners: README “Not shipping” already rejects them as starter contract.
