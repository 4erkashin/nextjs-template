# Editor workspace settings and vendor-safe lint / typecheck

Working context for this initiative. Read this file before planning or implementing it. It records current agreements and findings; it is not permanent project policy.

**Goal.** Share project editor settings through git. Keep ESLint and typecheck from failing or wasting time on vendor or generated files.

**Current step.** 2. Sanity-check `.vscode` against current user settings — draft. Confirm workspace objects did not drop user keys. Intentional overrides stay: import organize/sort `never`, ESLint fix `always`.

**Done when.** Proposed: Cursor user settings were compared to [workspace settings](.vscode/settings.json); every replaced object or array is either a full copy of the user keys we still want, or an agreed override. Accidental drops are fixed or recorded.

**Open questions.** Does the written workspace file miss any user `codeActionsOnSave` or ESLint keys besides the agreed overrides? Should any other user-level objects be copied so they cannot be frozen later by a partial workspace value?

## Steps

- [x] 1. Commit useful VS Code workspace settings
- [ ] 2. Sanity-check `.vscode` against current user settings so workspace objects do not drop user keys by accident
- [ ] 3. Review installed editor extensions — keep, recommend, or drop stale ones
- [ ] 4. Keep agent-run ESLint and typecheck off vendor-shipped / generated trees

## Continue from this file

Use the repo's [grill-me skill](.agents/skills/grill-me/SKILL.md) to resolve open questions. Save agreed decisions and their reasons after each round. Mark the current step ready when the user confirms it.

Implement when the user requests it. If an agreed decision must change, ask the user. Record progress and check the result against **Done when**.

When the step is complete, mark it done and prepare the next step for discussion.

## Decisions

- Shared workspace settings are conflict-prevention plus clone format/lint wiring, not a broader convenience dump. Personal UI stays local. Reason: the editor must not fight Prettier and ESLint, which is the same rule as the existing import-sort setting.
- Step 1 `extensions.json` recommends only `dbaeumer.vscode-eslint` and `esbenp.prettier-vscode`. Step 3 reviews the machine install for more recommendations, personal-only tools, and stale extensions.
- One `.vscode` set for both Cursor and VS Code. No editor-specific overlay unless a later round finds a setting only one honors.
- Workspace-wide `editor.formatOnSave` and Prettier as `editor.defaultFormatter`. Keep the existing import organize/sort `never` keys.
- `.gitignore` ignores `.vscode/*` and un-ignores `settings.json` and `extensions.json`.
- Workspace `editor.codeActionsOnSave` must list every user key we care about, because the object is replaced, not merged. `source.fixAll.eslint` is `always` (try it; change if it annoys). Import organize/sort stay `never`.
- Copy Cursor user auto-save wiring into the workspace: `files.autoSave: onFocusChange`, plus `editor.formatOnSave`. Snapshot source is Cursor user settings, not VS Code.
- Copy Cursor user ESLint extension keys: `eslint.enable`, `eslint.useFlatConfig`, and `eslint.validate` (JS/TS list). Do not copy `prettier.enableDebugLogs` or VS Code's `eslint.format.enable` (that would fight Prettier).
- Step 2 reviews the written `.vscode` files against current user settings so a partial object cannot undo user keys by accident.
- Step 1 payload is confirmed: workspace `settings.json` as listed below; `extensions.json` recommends `dbaeumer.vscode-eslint` and `esbenp.prettier-vscode` only. Intentional user-setting overrides: import organize/sort `never`, ESLint fix `always` instead of `explicit`. `eslint.validate` stays in the workspace (frozen language list for this folder).

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always",
    "source.organizeImports": "never",
    "source.sortImports": "never"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "eslint.enable": true,
  "eslint.useFlatConfig": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "files.autoSave": "onFocusChange"
}
```

## Progress and results

- Step 1 written: [workspace settings](.vscode/settings.json) match the agreed payload; [recommended extensions](.vscode/extensions.json) list ESLint and Prettier; [.gitignore](.gitignore) ignores other `.vscode` files. `git check-ignore` reports `launch.json` / `tasks.json` ignored and the two shared files not ignored.

## Parked

- Search and file-watcher exclusions. Not part of step 1.

## Facts and references

- [Workspace settings](.vscode/settings.json) and [recommended extensions](.vscode/extensions.json) are the shared files. Other `.vscode` paths are ignored.
- [Git hooks](lefthook.yml) run Prettier with `--write` on staged files, then ESLint without `--fix`.
- Cursor user settings (snapshot source) use `files.autoSave: onFocusChange`, `editor.formatOnSave: true`, Prettier as default formatter, `source.fixAll.eslint: explicit`, and organize/sort imports `explicit`. VS Code user settings are similar but include `eslint.format.enable: true` and omit `eslint.useFlatConfig` / `eslint.validate` / `source.sortImports`.
- `files.autoSave` is a string; user and workspace do not merge it. A workspace value replaces the user value. Including `onFocusChange` matches Cursor today. `editor.codeActionsOnSave` and `eslint.validate` are replaced as a whole, so every key/item we still want must be listed.
- `always` code actions run on auto-save; `explicit` does not. `formatOnSave` runs when auto-save is `onFocusChange` or `onWindowChange`.
- Cursor has ESLint and Prettier installed, plus extensions for other stacks (Tailwind, Docker, Prisma, GraphQL, Biome, WGSL). This repo has no Tailwind, Docker, Prisma, GraphQL, Biome, or `.editorconfig`. Step 3 will review that list.
- [ESLint configuration](eslint.config.js) lists generated files to ignore. Check whether engine defaults also exclude vendor files.
- [TypeScript configuration](tsconfig.json) excludes only `node_modules`. Check whether typecheck processes generated output. Some Next.js generated types are included on purpose.
- [Project scripts](package.json) run ESLint and typecheck across the configured project. [Git hooks](lefthook.yml) select work differently. Check the scripts used by agents.
