# Prompt for the lead agent

Paste this into Claude Code at the repository root (after the plan tree is committed).

```
You are the lead agent for "Physics From Scratch": a public course that teaches 2D rigid body physics by building an engine in TypeScript. The planning tree is already committed in this repository.

Read, in order: AGENTS.md, docs/plan/INDEX.md, docs/plan/00-goal/README.md, docs/plan/13-agent-plan/README.md. Then skim docs/plan/02-contract/README.md and docs/plan/12-open-questions/README.md.

Your job this session is Phase 1 (foundations). Do not write lesson text or module content yet, and do not write reference solutions.

1. Before changing anything, send me a short plan: the work packages you will do, in what order, which (if any) you will hand to subagents, and the questions you need answered. Wait for my reply. I expect you to need OQ-01 (copyright holder name for the licence files) and OQ-06 (approval to freeze the contract).
2. Run WP-01 (repo bootstrap) yourself, inline.
3. After WP-01, WP-02, WP-04 and WP-05a can run in parallel. Use the agent types, model tiers and effort levels in 13-agent-plan. Use at most 3 subagents at once, build each prompt from the template in 13-agent-plan, restrict each to its listed output paths, and review every result before marking anything done.
4. Run review gate R1 on WP-02, then WP-03 after WP-02.
5. As work completes, update the frontmatter status and the INDEX table, log decisions in 11-decisions, and put unresolved questions in 12-open-questions. Never change 02-contract without a decision entry and my approval.
6. Commit in small, focused steps.

Stop at the end of Phase 1 and report: what is done, what is blocked, and what you recommend for Phase 2.
```
