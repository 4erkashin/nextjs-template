# Editor workspace settings and vendor-safe lint / typecheck

Working context for this initiative. Read this file before planning or implementing it. It records current agreements and findings; it is not permanent project policy.

**Goal.** Share project editor settings through git. Keep ESLint and typecheck from failing or wasting time on vendor or generated files.

**Current step.** 3. Review installed editor extensions — grilling. Decide what to recommend in this template, what stays personal, and what to uninstall as stale.

**Done when.** Proposed: each installed Cursor extension is classified (recommend in `.vscode/extensions.json` / keep personal / uninstall). Agreed `extensions.json` changes are in git. Uninstalls happen only for extensions the user marked drop.

**Open questions.** Anything beyond ESLint and Prettier belong in this template's recommendations? Which installed extensions are leftover from other stacks and should be uninstalled?

## Steps

- [x] 1. Commit useful VS Code workspace settings
- [x] 2. Sanity-check `.vscode` and user settings — understand the shape, drop stale keys, keep workspace from undoing what remains
- [ ] 3. Review installed editor extensions — keep, recommend, or drop stale ones
- [ ] 4. Keep agent-run ESLint and typecheck off vendor-shipped / generated trees

## Continue from this file

Ask an agent to read this file, resolve the current step's open questions, and save agreed decisions with their reasons. Set the current step to **ready to implement** when its frontier is empty.

Implement when the user requests it. If an agreed decision must change, ask the user. Record progress and check the result against **Done when**.

When the step is complete, mark it done and prepare the next step for discussion.

## Decisions

- Shared workspace settings are conflict-prevention plus clone format/lint wiring, not a broader convenience dump. Personal UI stays local. Reason: the editor must not fight Prettier and ESLint.
- One `.vscode` set for both Cursor and VS Code. No editor-specific overlay unless a later round finds a setting only one honors.
- `.gitignore` ignores `.vscode/*` and un-ignores `settings.json` and `extensions.json`.
- Snapshot source is Cursor user settings, not VS Code.
- Step 1 workspace payload, after step 2, is in [workspace settings](.vscode/settings.json): Prettier as default formatter, `editor.formatOnSave`, `files.autoSave: onFocusChange`, and `editor.codeActionsOnSave` (`source.fixAll.eslint: always`; import organize/sort `never`). No `eslint.enable` / `useFlatConfig` / `validate`. Do not copy `prettier.enableDebugLogs` or VS Code's `eslint.format.enable`.
- [Recommended extensions](.vscode/extensions.json) list only `dbaeumer.vscode-eslint` and `esbenp.prettier-vscode`. Step 3 reviews the machine install for more recommendations, personal-only tools, and stale extensions.
- Step 2 is a full Cursor user-settings pass, plus the VS Code user file, plus `.vscode`. Agent edits those files when the user asks to implement. Extension uninstall stays step 3; this step only drops stale settings.
- Drop `eslint.enable`, `eslint.useFlatConfig`, and `eslint.validate` from Cursor user settings and from `.vscode`. Reason: ESLint 10 ignores `useFlatConfig`; `enable` is the default; a `validate` list limits probing.
- User `codeActionsOnSave` keeps `source.fixAll.eslint: explicit` and `source.organizeImports: explicit`; drops `source.sortImports`. This workspace still overrides ESLint to `always` and organize to `never`.
- Drop from Cursor user settings: `javascript.suggest.autoImports`, `typescript.suggest.autoImports`, `typescript.validate.enable`, `diffEditor.renderSideBySide`, `workbench.preferredDarkColorTheme`, `prettier.enableDebugLogs`, `yaml.disableSchemaDetection`.
- VS Code user file: drop `eslint.format.enable`, the atlascode `yaml.schemas` absolute path, `codestream.serverUrl`, `github.copilot.editor.enableAutoCompletions`, the `*.copilotmd` editor association, and `javascript.suggest.autoImports` / `typescript.suggest.autoImports`. Do not make the two user files identical.
- Keep `source.sortImports: never` in `.vscode` after it leaves the user file, so a later user-level paste cannot fight `perfectionist`.
- Remaining Cursor user keys stay (Tab/partial accepts, Prettier, font/tab/linked editing, explorer and git nags, auto-save, update-imports-on-move, terminal keybindings, color scheme/zoom, Cursor Light, vscode-icons, SVG as text, tree double-click, `jock.svg`, Docker engine prompt off, queue=`steer`). Extension uninstall is step 3.

Agreed workspace `settings.json` after step 2:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always",
    "source.organizeImports": "never",
    "source.sortImports": "never"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "files.autoSave": "onFocusChange"
}
```

## Progress and results

- Step 1 written: [workspace settings](.vscode/settings.json) match the agreed payload; [recommended extensions](.vscode/extensions.json) list ESLint and Prettier; [.gitignore](.gitignore) ignores other `.vscode` files. `git check-ignore` reports `launch.json` / `tasks.json` ignored and the two shared files not ignored.
- Step 2 applied: workspace file matches the agreed JSON (no ESLint `enable` / `useFlatConfig` / `validate`; import-sort lock kept). Cursor and VS Code user settings had the agreed keys removed, except Cursor `yaml.disableSchemaDetection`: vscode-yaml writes that list back immediately. Treat it as extension-owned until step 3.

## Parked

- Search and file-watcher exclusions. Not part of step 1.

## Facts and references

- This repo uses ESLint 10.9.1. For ESLint ≥10 the ESLint extension **ignores** `eslint.useFlatConfig`. `eslint.enable: true` matches the extension default. An `eslint.validate` list replaces probing and can **limit** languages the extension would otherwise pick up.
- Cursor user `yaml.disableSchemaDetection` is written by vscode-yaml at runtime when Docker/GitHub Actions extensions are present. Step 2 removes it; the extension may write it back until those extensions are reviewed in step 3.
- `prettier.enableDebugLogs: true` is a troubleshooting leftover (default is false).
- Cursor and VS Code user settings have drifted (VS Code has `eslint.format.enable`, atlascode YAML schema path, CodeStream URL, Copilot keys; Cursor has `useFlatConfig` / `validate` / `sortImports`).
- [Git hooks](lefthook.yml) run Prettier with `--write` on staged files, then ESLint without `--fix`.
- Cursor user settings (snapshot source) use `files.autoSave: onFocusChange`, `editor.formatOnSave: true`, Prettier as default formatter, `source.fixAll.eslint: explicit`, and organize/sort imports `explicit`. VS Code user settings are similar but include `eslint.format.enable: true` and omit `eslint.useFlatConfig` / `eslint.validate` / `source.sortImports`.
- `files.autoSave` is a string; user and workspace do not merge it. A workspace value replaces the user value. `editor.codeActionsOnSave` and `eslint.validate` are replaced as a whole, so every key/item we still want must be listed.
- `always` code actions run on auto-save; `explicit` does not. `formatOnSave` runs when auto-save is `onFocusChange` or `onWindowChange`.
- Cursor has ESLint and Prettier installed, plus extensions for other stacks (Tailwind, Docker, Prisma, GraphQL, Biome, WGSL). This repo has no Tailwind, Docker, Prisma, GraphQL, Biome, or `.editorconfig`. Step 3 will review that list.
- [ESLint configuration](eslint.config.js) lists generated files to ignore. Check whether engine defaults also exclude vendor files.
- [TypeScript configuration](tsconfig.json) excludes only `node_modules`. Check whether typecheck processes generated output. Some Next.js generated types are included on purpose.
- [Project scripts](package.json) run ESLint and typecheck across the configured project. [Git hooks](lefthook.yml) select work differently. Check the scripts used by agents.
