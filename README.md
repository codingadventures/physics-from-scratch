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

**Foundations phase.** The starter toolchain is set up; exercise stubs, tests, lessons and the site are not written yet. The plan lives in [docs/plan/INDEX.md](docs/plan/INDEX.md).

## Getting started

Use this repository as a template (**Use this template** on GitHub) so you have your own copy for your solutions. Then either open your copy in **GitHub Codespaces** (nothing to install) or clone it and run `npm install` in `starter/`. Details: [starter/README.md](starter/README.md).

## Repository layout

| Path | Purpose |
|---|---|
| `docs/plan/` | The plan, one folder per section (start at INDEX.md) |
| `course/` | Lesson content: pills and exercise pages (not yet written) |
| `starter/` | The TypeScript starter project: given code, stubs, tests, demos (toolchain only so far) |
| `site/` | The website (not yet created) |
| `journal/` | The author's own posts about doing the course (written by the author) |

## Working with agents

Agents (Claude Code) start from [AGENTS.md](AGENTS.md).

## Licence

Code: MIT ([LICENSE](LICENSE)). Written content: CC BY 4.0 ([LICENSE-CONTENT](LICENSE-CONTENT)). Copyright (c) 2026 Gio Campo.
