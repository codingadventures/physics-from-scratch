# Physics From Scratch

A hands-on, test-driven course: build a 2D rigid body physics engine in TypeScript, with interactive visualisations of the maths.

## What you will build

A small engine that simulates 2..N rigid bodies, detects collisions between circles, boxes and static planes, and responds with impulses (restitution and friction included). You write it yourself, one exercise at a time, against tests that already exist.

## How the course works

- **Pills:** short lessons, 5-7 minutes each, one idea per pill.
- **Exercises:** after every 3-4 pills you implement stubs in the starter project until the tests pass.
- **Visuals:** the maths-heavy pills embed interactive visuals you can step through, scrub and drag. They run the real algorithm, so they cannot disagree with the code.
- **Advanced track:** after the standard track you go back and rebuild parts properly (derive SAT yourself, compare solvers, stacking, determinism, performance, a port).

## Status

**Planning phase.** Nothing is built yet. The plan lives in [docs/plan/INDEX.md](docs/plan/INDEX.md).

## Repository layout

| Path | Purpose |
|---|---|
| `docs/plan/` | The plan, one folder per section (start at INDEX.md) |
| `course/` | Lesson content: pills and exercise pages (not yet written) |
| `starter/` | The TypeScript starter project: given code, stubs, tests, demos (not yet created) |
| `site/` | The website (not yet created) |
| `journal/` | The author's own posts about doing the course (written by the author) |

## Working with agents

Agents (Claude Code) start from [AGENTS.md](AGENTS.md).

## Licence

Code: MIT ([LICENSE](LICENSE)). Written content: CC BY 4.0 ([LICENSE-CONTENT](LICENSE-CONTENT)). Copyright (c) 2026 Gio Campo.
