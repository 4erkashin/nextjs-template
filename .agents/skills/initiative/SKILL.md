---
name: initiative
description: Create a durable initiative Markdown file for later grill-me sessions and bounded implementation handoffs. Use when starting an initiative document from a goal or rough plan; this skill creates the draft rather than running the interview or implementing it.
---

# Initiative

Create one Markdown file per initiative, with enough project context and explicit unknowns for a fresh `$grill-me` conversation. The file also carries the agreed work to a separate implementation conversation. The user chooses the models and starts those sessions.

This skill ends after creating the draft. `$grill-me` owns the interview; use the user's existing version rather than copying, replacing, installing, or automatically invoking it.

## Create the file

1. Read the user's goal, supplied references, and relevant project instructions. Inspect enough nearby code or documents to identify the starting point, useful references, and concrete unknowns. Creation needs a grounded draft, not exhaustive research or an interview.
2. Choose the requested path. Otherwise place `INITIATIVE.md` near the work it concerns; use a descriptive filename if multiple initiatives share that directory. Preserve an existing initiative: unless replacement was requested, use another descriptive filename and explain the choice.
3. Read [the template](assets/INITIATIVE.md) and adapt it to this initiative. Keep its continuation instructions in the generated file so later sessions need no access to this skill or the creation chat.
4. Populate the overall goal, provisional queue, and one current draft card from the available context. Separate user-agreed decisions, observed facts, proposals, and unknowns. Capture brief reasoning for agreed choices where available. Treat inferred defaults as unagreed proposals. The queue suggests sequence, not detailed specifications or implementation authorization.
5. Use repository-relative references for project facts. Include the finding as well as its source, so readers know why to open it. Record research still needed as agent work; reserve questions for `$grill-me` for user decisions. If information is missing, label it rather than inventing requirements. If no initiative context is supplied, create an explicitly unfilled starter instead of assuming a project goal.
6. Check that the document is understandable without this conversation, has one current card, and distinguishes what is known from what needs agreement. Leave it in draft state. Return the file link and a short suggested `$grill-me` prompt.

Keep the document proportional to the initiative. Preserve useful decisions and boundaries, not a transcript. Use [generic examples](references/examples.md) when the user wants usage examples or when a handoff distinction needs clarification; examples are illustrative, not defaults to import into unrelated work.
