---
section: "11-decisions"
status: drafted
depends_on: []
owner: unassigned
outputs: ["docs/plan/11-decisions/README.md"]
definition_of_done: "Append a row for every decision. Proposed rows are confirmed or reversed by the author."
---


# 11 Decisions

Append-only. A decision that changes a frozen contract needs a row here and the author's approval.

| ID | Date | Decision | By | Status |
|---|---|---|---|---|
| D-001 | 2026-10-01 | 2D first, 3D later | Author | decided |
| D-002 | 2026-10-01 | TypeScript as the course language | Author | decided |
| D-003 | 2026-10-01 | Minimal Canvas 2D renderer, scaffolded by agents | Author (accepted Claude's default) | decided |
| D-004 | 2026-10-01 | Correctness over performance; small body counts | Author | decided |
| D-005 | 2026-10-01 | No determinism for now (advanced A5) | Author | decided |
| D-006 | 2026-10-01 | Standard solver: basic sequential impulses, limitations documented | Author | decided |
| D-007 | 2026-10-01 | Advanced track compares impulses with position-based (XPBD) | Author (accepted Claude's proposal) | decided |
| D-008 | 2026-10-01 | SAT taught as a recipe in the standard track, derived in advanced A1 | Author | decided |
| D-009 | 2026-10-01 | Stable stacking is an advanced stretch goal | Author | decided |
| D-010 | 2026-10-01 | Pills are 5-7 minutes; an exercise follows every 3-4 pills | Author | decided |
| D-011 | 2026-10-01 | Starter project with stubs and failing tests; keep it simple; a code-along site with saved progress is future work | Author | decided |
| D-012 | 2026-10-01 | Public blog as a static site on GitHub Pages | Author | decided |
| D-013 | 2026-10-01 | Interactive visuals driven by a recorded trace of the real algorithm | Author (mechanism proposed by Claude) | decided |
| D-014 | 2026-10-01 | Tracing is an optional ambient module, no-op by default, so exercise signatures do not change | Claude | proposed (WP-03 finalises) |
| D-015 | 2026-10-01 | No reference solutions in the repository; the author asks Claude when stuck; the author's solutions are published later | Author | decided |
| D-016 | 2026-10-01 | Licences: MIT for code, CC BY 4.0 for written content | Author | decided |
| D-017 | 2026-10-01 | One public monorepo; the plan is a tree of section files; work by Claude Code agents with subagent type and effort recommended per task | Author | decided |
| D-018 | 2026-10-01 | Semi-implicit Euler as the integrator. Pill 1.4 says why it is used for now; advanced A8 compares other integrators (approved 2026-10-13) | Author (accepted Claude's proposal) | decided |
| D-019 | 2026-10-01 | "Gathering" means gathering the rigid bodies every frame | Author | decided |
| D-020 | 2026-10-01 | Two content kinds: Course (drafted by agents) and Journal (written by the author) | Author | decided |
| D-021 | 2026-10-01 | Module 5 pill order: restitution (5.3) before rotation (5.4), so Exercise 5a matches its pills | Claude | proposed |
| D-022 | 2026-10-01 | A module README is its entry spec; agents expand it into files under `course/` | Claude | proposed (awaiting the author's confirmation) |
| D-023 | 2026-10-05 | Copyright holder for the licence files: Gio Campo, 2026 (answers OQ-01) | Author | decided |
| D-024 | 2026-10-05 | Repository: public `codingadventures/physics-from-scratch` on GitHub (answers the repository part of OQ-02) | Author | decided |
| D-025 | 2026-10-05 | Two setup paths, no per-platform scripts: GitHub Codespaces via `.devcontainer/` (nothing to install), or local Node LTS + `npm install`. A cross-platform `npm run doctor` checks the setup. The repository is a GitHub template so each learner gets their own copy. Codespaces free quota checked 2026-10-05 on docs.github.com: 120 core hours and 15 GB-month per month for GitHub Free personal accounts (60 hours on a 2-core machine). | Author (accepted Claude's proposal) | decided |
| D-026 | 2026-10-05 | WP-01 toolchain: Node 24 LTS in CI and the dev container (`engines` >= 22.12, Vite 8's floor); TypeScript 6.0 (not 7.0, because typescript-eslint 8.71 supports TypeScript < 6.1); Vite 8.3, Vitest 5.0, ESLint 10 with typescript-eslint 8.71, Prettier 3.9. actions/checkout and actions/setup-node v7. Exact versions are in `starter/package-lock.json`. | Claude | proposed |
| D-027 | 2026-10-13 | `02-contract` frozen (answers OQ-06). The Tracer API section is excluded and stays a proposal until WP-03 (OQ-10). | Author | decided |
| D-028 | 2026-10-13 | WP-02 final exercise signatures, recorded in `02-contract`. World stages (broadphase, narrowphase, solver) are public fields set through constructor options and default to no-ops; `bodies` is a getter. Given types live in the files listed in `02-contract`. Test helpers build `Body` records directly, so tests that take `Body` records (Exercises 3-5b) do not depend on `createBody`; World-based tests (Exercises 2, 5c, 6) still go through `createBody` and `integrate`. | Claude | proposed (approved by merging the WP-02 PR) |
| D-029 | 2026-10-13 | TypeScript is taught as you go: M0 covers just enough to read a test and write one function, and every exercise page has a "TypeScript you need here" box for the features it introduces. Comparisons are with C++ for now. | Author | decided |
| D-030 | 2026-10-13 | `noUncheckedIndexedAccess` off in the starter tsconfig, to keep array indexing simple for TypeScript beginners. Candidate to turn back on in the advanced track. | Author (accepted Claude's proposal) | decided |
| D-031 | 2026-10-13 | WP-03 visual framework: the Tracer API in `02-contract` (adds per-primitive colour, `Frame`, `Recording`, `recordTrace`); a step-through player with keyboard, scrub and touch support that never autoplays under `prefers-reduced-motion`; pointer-event drag handles; a debug-draw renderer that imports only types, never learner functions, so it works while stubs throw; demos chosen by `?demo=N`, with a message instead of a crash when a demo hits a TODO stub. | Claude | proposed (approve with OQ-10) |
| D-032 | 2026-10-13 | Box2D Lite dissection written from the cloned source at commit 227b71b (`06-references/dissections/box2d-lite.md`). Lessons may point to it after the matching exercise, never before. | Claude | proposed |
| D-033 | 2026-10-13 | Keep the frozen step order (integrate, collide, solve). Pill 5.8 explains why a resting body sinks g*dt^2 per step under this order and how Box2D Lite avoids it by solving between the velocity and position updates (answers OQ-19). | Author | decided |
| D-034 | 2026-10-14 | Batch A model choice: Sonnet drafts pills and exercise pages; Opus writes the tests and runs every fresh-context review. | Author | decided |
| D-035 | 2026-10-14 | `npm run check` is the learner's full check (all tests). CI runs `check:course` steps instead: the given code's tests plus a check that every exercise test fails only on a TODO stub (`scripts/progress.mjs --expect-stubs`). | Claude | proposed |
| D-036 | 2026-10-14 | Vector functions are not required to return a new object (the contract only forbids mutation); exercise pages recommend it. Reading ids are defined in `06-references`. | Claude | proposed |
