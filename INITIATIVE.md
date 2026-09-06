# Editor workspace settings and vendor-safe lint / typecheck

Working context for this initiative. Read this file before planning or implementing it. It records current agreements and findings; it is not permanent project policy.

**Goal.** Share project editor settings through git. Keep ESLint and typecheck from failing or wasting time on vendor or generated files.

**Current step.** 1. Commit useful VS Code workspace settings — draft. Proposed: include project settings and keep personal settings local. ESLint and typecheck are step 2.

**Done when.** Proposed: the agreed files are tracked in git, appear in a fresh clone, and apply when the project folder is opened in VS Code.

**Open questions.** Use the current VS Code settings as a starting point, or create a small set for this project? Which settings should be shared? Should this step include recommended extensions and search or file watcher exclusions?

## Steps

- [ ] 1. Commit useful VS Code workspace settings
- [ ] 2. Keep agent-run ESLint and typecheck off vendor-shipped / generated trees

## Continue from this file

Use the repo's [grill-me skill](.agents/skills/grill-me/SKILL.md) to resolve open questions. Save agreed decisions and their reasons after each round. Mark the current step ready when the user confirms it.

Implement when the user requests it. If an agreed decision must change, ask the user. Record progress and check the result against **Done when**.

When the step is complete, mark it done and prepare the next step for discussion.

## Facts and references

- [Workspace settings](.vscode/settings.json) disable import sorting on save. [.gitignore](.gitignore) permits `.vscode` files. After the shared settings are agreed, compare them with the current settings.
- [ESLint configuration](eslint.config.js) lists generated files to ignore. Check whether engine defaults also exclude vendor files.
- [TypeScript configuration](tsconfig.json) excludes only `node_modules`. Check whether typecheck processes generated output. Some Next.js generated types are included on purpose.
- [Project scripts](package.json) run ESLint and typecheck across the configured project. [Git hooks](lefthook.yml) select work differently. Check the scripts used by agents.
