---
section: "13-agent-plan"
status: drafted
depends_on: ["00-goal", "02-contract", "08-modules"]
owner: unassigned
outputs: ["docs/plan/13-agent-plan/README.md"]
definition_of_done: "The author has reviewed the work packages, agent types and effort levels."
---


# 13 Agent plan

Agents run in Claude Code. The author wants subagent use to be deliberate, with the agent type and reasoning effort chosen per task.

## Subagent rules

1. **Work inline by default.** A subagent starts cold, re-derives context and costs tokens.
2. **Spawn only for:** (a) independent work packages that write to disjoint paths; (b) a read-only investigation that would flood the main context; (c) a fresh-context review, where the reviewer must not see how the work was produced.
3. **Do not spawn** for work that takes about ten minutes or less, or when the lead already holds the needed context.
4. **Suggested cap:** 3 concurrent subagents.
5. **The lead reviews every subagent result** before marking a task done. Subagent output is a draft.
6. Every spawn uses the prompt template at the bottom of this file.

## Agent types, model tiers and effort

- **Agent types** (the built-in types as of 2026-10-01; check `/agents` in your Claude Code): `general-purpose` for work that edits files or fetches pages; `Explore` for read-only fan-out search; `Plan` for read-only design and planning. Custom agents can be added under `.claude/agents/` (optional, a WP-01 stretch).
- **Model tiers** (names change, so think in tiers): Haiku-tier for mechanical work; Sonnet-tier for drafting from a clear spec; Opus-tier for derivations, API design, test authorship and review.
- **Effort** (use the closest levels your Claude Code offers; names may differ by version): **low** = mechanical (scaffolding from a spec, link checks, formatting); **medium** = drafting from a clear spec (pills, stubs, site pages); **high** = derivations, API design, test authorship, adversarial review.

## Phase 1: foundations

| WP | What | Depends on | Writes only to | Agent type | Model | Effort | Parallel with |
|---|---|---|---|---|---|---|---|
| WP-01 | Repo bootstrap: `starter/` (TypeScript strict, Vite, Vitest, ESLint, Prettier), licence files, CI (test and build), README polish | OQ-01 | `starter/`, `.github/`, `LICENSE*` | lead, inline | Sonnet | medium | none |
| WP-02 | Contract in code: given types, `Vec2` and all exercise stubs (bodies throw `TODO`), test helpers (`expectClose`, seeded RNG, scene builders, fixed-step runner). Records the final exercise signatures in 02-contract. | WP-01, OQ-06 | `starter/src/` (types and stubs), `starter/test-helpers/`, `docs/plan/02-contract/` | general-purpose | Opus | high | WP-04, WP-05a |
| WP-03 | Trace recorder, player widget, debug-draw renderer, `npm run demo:N` harness | WP-02 | `starter/src/trace/`, `starter/src/render/`, `starter/src/visuals/` (framework only) | general-purpose | Opus | high | WP-05b |
| WP-04 | Site scaffold: verify Astro and GitHub Pages steps against the official docs first; Pages workflow; ingest `course/`; embed visuals | WP-01 | `site/`, `.github/workflows/` | general-purpose | Sonnet | medium | WP-02, WP-05a |
| WP-05a | Verify every candidate reference: fetch, record verified or not, edition, URL | none | `docs/plan/06-references/` | general-purpose | Haiku | low | anything |
| WP-05b | Clone Box2D Lite and write the dissection guide | WP-05a (URL only) | `docs/plan/06-references/dissections/` | general-purpose | Opus | high | WP-03 |
| R1 | Review gate on WP-02: do stubs match the contract and module specs, do they throw, do the test helpers compile? Report only. | WP-02 | none | general-purpose, fresh context | Opus | high | none |

Order: WP-01 first. Then WP-02, WP-04 and WP-05a in parallel. R1 after WP-02. WP-03 after WP-02. WP-05b any time after WP-05a.

## Phase 2: module content

Per module, four steps: pills, tests, visuals, review. Details are in each module's work package. Visuals wait for WP-03.

| Module | Pills | Tests | Visuals | Review |
|---|---|---|---|---|
| M0 | general-purpose, Sonnet, medium | general-purpose, Sonnet, medium | general-purpose, Sonnet, low (optional) | fresh context, Opus, high |
| M1 | Sonnet, medium | Opus, high | Sonnet, medium (V1 must-have) | fresh context, Opus, high |
| M2 | Sonnet, medium | Opus, high | Sonnet, low (optional) | fresh context, Opus, high |
| M3 | Sonnet, medium | Opus, high | Sonnet, medium (V4 must-have) | fresh context, Opus, high |
| M4 | Opus, high | Opus, high | Opus, medium (V7 and V9 must-have) | fresh context, Opus, high |
| M5 | Opus, high | Opus, high | Opus, medium (V10 and V11 must-have) | fresh context, Opus, high |
| M6 | Sonnet, medium | Sonnet, medium | none new | fresh context, Opus, high |

Suggested batches (so later pills can refer to earlier ones, and at most 3 run at once): **A** = M0, M1, M2; **B** = M3, M4; **C** = M5, M6.

**Review checklist** (the reviewer reads the pills and tests without seeing how they were produced): re-derive every formula and known-answer number independently; check reading time is 5-7 minutes; check every cited source is verified in 06-references; check tests depend only on given code and earlier exercises; check hints contain no complete code; report issues, do not fix them.

## Phase 3: advanced track

Starts after the author finishes the standard track. Each module: general-purpose, Opus, high, plus a fresh-context review.

## Phase 4: integration and launch

Integrate all content into the site, check accessibility and mobile layouts, deploy: general-purpose, Sonnet, medium.

## Spawn prompt template

```
Task: <WP id and one-line goal>
Read first: AGENTS.md, docs/plan/<section>/README.md, docs/plan/02-contract/README.md
You may write only to: <paths>
Frozen: the contract in 02-contract. If it blocks you, stop and report; do not change it.
Definition of done: <copy from the section>
Do not: write reference solutions, invent sources, cite unverified references.
Return: a short report: files written, anything unverified, open questions.
```
