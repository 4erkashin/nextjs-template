---
name: initiative
description: Create a concise initiative Markdown file from a goal or rough plan, for later interviews and implementation sessions.
---

# Initiative

Create a draft that a human or agent can use in a new session. End after creating the file; the repo's [grill-me skill](../grill-me/SKILL.md) handles the interview.

## Create the file

1. Read the user's goal, references, and project instructions. Inspect enough project context to identify the starting point and decisions still needed.
2. Use the requested path, or place `INITIATIVE.md` near the work. Preserve existing initiatives unless the user requests an update or replacement. If no goal is supplied, create an unfilled starter.
3. Adapt [the template](assets/INITIATIVE.md). Its four opening fields and section rules define the output. Keep its continuation instructions. Resolve the grill-me skill link relative to the generated file so humans and agents can find the repo's installed skill in any editor.
4. Use short sentences and consistent project terms. Mark proposed choices as proposed. Record user questions only for the current step. Keep facts to findings that affect decisions, with relative source links and necessary agent checks.
5. Check the draft against the template: one current step; checks included in **Done when**; each question or decision recorded once; optional sections included only when useful. Leave the current step in draft state.
6. Return the file link and a short suggestion to continue with the repo's grill-me skill.

For usage examples, read [examples](references/examples.md). Example requirements apply only to their example.
