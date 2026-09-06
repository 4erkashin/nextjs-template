# Generic usage examples

These illustrate the workflow, not requirements for every initiative. `$initiative` creates a file; subsequent planning uses the user's existing `$grill-me`, and implementation uses an ordinary request with the file attached or referenced.

## Start from a rough goal

> $initiative Create an initiative for adding CSV import to the admin app. We want to reduce manual entry, but haven't settled validation or duplicate handling. Put it near the import feature.

The creator inspects the relevant project context and produces a draft. It records reducing manual entry as the user's goal. Validation policy, duplicate handling, and the first implementation boundary remain open; a suggested queue is labelled provisional.

An illustrative current card might read:

**Now:** 1. First import slice — draft; needs grilling.

**Goal (draft).** Proposed: establish one useful import flow for administrators. The accepted input, persistence behavior, and error handling remain to be agreed.

**Done when (draft).** The agreed input produces the agreed outcome; invalid input and duplicate behavior are explicit. Concrete acceptance examples await grilling.

**Verify (draft).** Choose representative successful, invalid, and duplicate inputs after agreeing on their expected behavior. Use the repository's relevant checks.

**Scope (draft).** Proposed first slice: one input format and one destination. Batch limits, preview, and partial success are undecided.

**Open decisions.** Which records go first? What should happen to duplicate rows? Should any invalid row reject the entire import?

The draft does not silently select answers to make itself implementable.

## Resume planning in a fresh conversation

> $grill-me Read features/import/INITIATIVE.md and resume its unresolved decisions. Save each answered round back to the file.

If the file already records “reject the entire import when any row is invalid” and its reason, the next session uses that decision rather than asking it again. It investigates remaining factual prerequisites and continues with the unresolved user decisions. Recommendations stay unagreed until accepted.

## Hand an agreed card to an implementation model

> Implement the agreed current card in features/import/INITIATIVE.md. Use the file for context and update it with progress and results.

Routine choices include naming a private helper or using an existing parser that satisfies the agreed behavior. Changing all-or-nothing import into partial success changes agreed behavior and returns to planning.

An illustrative decision handoff:

**Status:** Needs decision — import consistency.

**Evidence:** The inspected persistence API commits records individually and offers no rollback. Link the actual API or source location here.

**Decision needed:** The card requires all-or-nothing persistence. Should this chunk add a transaction-capable path, or should its scope be reconsidered?

**Progress:** Parsing and validation are complete; persistence and its acceptance checks remain pending. Any workaround is a proposal, not an accepted change.

## Finish a chunk and advance the document

After acceptance checks pass, the implementation session records the result, updates relevant facts, and checks the completed queue entry. The top becomes the next draft, for example “2. Import feedback — draft; needs grilling.” New findings may change that proposed chunk. The next grilling session agrees its scope before implementation.

## Reuse for a different initiative

> $initiative Create docs/initiatives/search-migration.md for replacing our search provider. Preserve the agreed requirement that existing public search URLs keep working. Leave the provider choice and rollout policy for grilling.

The file carries the supplied URL-compatibility agreement, observed integration points, and open provider and rollout decisions. It does not inherit the CSV example's validation policy or assume a particular vendor.
