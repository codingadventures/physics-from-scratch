# Rules for agents

This repository holds a public course that teaches 2D rigid body physics by building an engine in TypeScript. You are one of several agents. Work only on the section you are assigned.

## Read first

1. `docs/plan/INDEX.md` (the tree, statuses, dependencies)
2. `docs/plan/00-goal/README.md` (what exists, what we are building, success criteria)
3. `docs/plan/13-agent-plan/README.md` (work packages, subagent rules)
4. The section you are assigned, and `docs/plan/02-contract/README.md`

## Rules

1. **The tree is the source of truth.** `docs/plan/_archive/` holds the superseded single-file plan. Never edit it.
2. **The contract is frozen.** `02-contract` defines the engine API and conventions that every lesson, stub and test depends on. Do not change it. If it blocks you, stop, add an entry to `12-open-questions`, and report.
3. **Stay in your lane.** Write only to the paths listed under your work package. Do not edit other sections, except to update status (see rule 8).
4. **No reference solutions.** The repository contains stubs and tests, never solutions. The author writes the solutions as the first learner. Hints may describe approaches, not provide full code (see `05-solutions-policy`).
5. **No invented sources.** Cite only references marked verified in `06-references`. Mark anything else as unverified. Do not reproduce long passages from books or articles: paraphrase, and quote under 15 words at most.
6. **Be honest about uncertainty.** If you could not verify a fact, formula or API detail, say so in the file. A flagged gap is better than a confident error.
7. **Math must be checked.** Every formula and known-answer number in a lesson or test must carry its derivation (a comment or a line in the lesson) so a reviewer can check it without a solution.
8. **Keep the tree current.** When you finish, set `status` in your section's frontmatter and update its row in `docs/plan/INDEX.md`. Record decisions in `11-decisions` and unresolved questions in `12-open-questions`.
9. **Do not guess the author's preferences.** Put the question in `12-open-questions`.
10. **Commits:** small and focused, with a prefix such as `docs(plan):`, `feat(starter):`, `feat(site):`, `chore:`.

## Style

Terse, technically grounded, direct. Prefer a verdict over a pile of caveats, but state real uncertainty plainly. Prose spelling follows OQ-04 (default British English).

## Subagents

Work inline by default. Spawn a subagent only for independent work packages, noisy read-only investigation, or a fresh-context review. The rules, agent types, model tiers and effort levels are in `docs/plan/13-agent-plan/README.md`.
