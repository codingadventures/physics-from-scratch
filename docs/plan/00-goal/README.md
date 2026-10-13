---
section: "00-goal"
status: drafted
depends_on: []
owner: unassigned
outputs: ["docs/plan/00-goal/README.md"]
definition_of_done: "The author has reviewed the goal and the success criteria and set status to reviewed."
---


# 00 Goal

## Vision

A public, hands-on course that teaches how a 2D rigid body physics engine works by having the learner build one in TypeScript, test-first, with interactive visualisations that unfold the maths step by step. The project produces the lessons, the exercises with tests, the visual widgets and a public blog. **The engine itself is the learner's output.** The project ships stubs and tests, not a finished engine.

## State of the project today

**Exists:**

- This planning tree: goal, format, draft contract, repo spec, visual layer spec, solutions policy, reference list, blog stack proposal, decisions log, open questions, agent plan.
- Outlines for 7 standard modules (38 pills, 9 exercises) and a 7-module advanced track.
- A reference list: one source fetched and read, several more listed in it (existence not yet checked by opening them), the rest from background knowledge and unverified.

**Does not exist yet:**

- Any code, test, repo skeleton, CI or website.
- Any lesson text, exercise page or visual.
- Verified references, licence files, a blog name or domain.
- Reference solutions. This is deliberate: there are none (see 05-solutions-policy).

## Audience

- **Target learner:** an experienced programmer comfortable with vectors, matrices and basic calculus, new to physics engines and to TypeScript, with C++ as the reference language. TypeScript is taught as you go, inside the exercises, not as a separate tutorial (D-029). Prior game-development experience helps but is not required.
- **First learner:** the author, who builds the course material while doing it and writes the journal posts from that experience.
- **Prerequisites are stated, not taught:** vectors, dot and cross products, matrices, basic trigonometry, 2D rotation, the idea that velocity is the derivative of position.

## Deliverables

| ID | Deliverable | Location | Definition of done |
|---|---|---|---|
| D1 | Course content: 7 standard modules, 38 pills, 9 exercises | `course/` | Every pill is 5-7 minutes, has checkpoint questions and verified readings, and passed a fresh-context review. Every exercise has a page, a hint ladder and tests. |
| D2 | Starter project | `starter/` | `npm install && npm test` runs. Every exercise is a stub with a fixed signature and failing tests. Demos run in the browser. `npm run progress` reports passing tests per exercise. |
| D3 | Visual layer | `starter/src/trace/`, `starter/src/visuals/`, embedded in the site | Recorder and player work. All 6 must-have visuals exist, run the real algorithm, and work on desktop and mobile. |
| D4 | Website | `site/` | Builds statically and deploys to GitHub Pages. Renders every pill with embedded visuals. Has a Journal area for the author's posts. |
| D5 | Reference guides | `docs/plan/06-references/` | Every cited source is verified. A dissection guide of Box2D Lite exists, based on the cloned source. |
| D6 | The author's solutions and journal posts | `journal/` and a solutions location (see 05) | Produced by the author while doing the course. Agents only prepare the scaffolding. |
| D7 | Advanced track | `course/` (advanced) | Starts after the author finishes the standard track. Outline in 09-advanced. |

## The engine the learner ends up with

**Scope:** 2D, TypeScript, correctness over performance, small body counts (tens of bodies), no determinism guarantee.

| Area | End state |
|---|---|
| Bodies | Position, angle, linear and angular velocity, mass and inertia, static bodies (inverse mass 0) |
| Shapes | Circle, box, static plane (half-space) |
| Integration | Semi-implicit Euler at a fixed timestep |
| Gathering | Each frame the world gathers every body with its current transform and world-space AABB, ready for the later stages |
| Broadphase | Brute force baseline and sort and sweep on one axis, behind one interface |
| Narrowphase | Circle-circle, circle-plane, box-plane, circle-box, box-box (SAT as a recipe, with clipping to a manifold of up to 2 points) |
| Response | Sequential impulses with a fixed iteration count, restitution, Coulomb friction, positional correction |
| Known limits | Stacking is not stable, resting contact jitters, no continuous collision detection (fast bodies can tunnel). These are documented in the lessons, not hidden. |

### Engine acceptance scenarios

These become behavioural tests and capstone demos. Tolerances are loose and will be tuned when the author's first solution passes them (there is no reference solution to tune against).

| ID | Scenario | Pass condition |
|---|---|---|
| S1 | Circle (radius 0.5, mass 1, restitution 0) dropped from y = 3 onto a plane at y = 0 | Within 5 s it rests: y within 0.01 of 0.5, speed under 0.05 |
| S2 | Two equal-mass circles collide head on in zero gravity, restitution 1 | Velocities exchange within 1e-3; momentum conserved within 1e-9 |
| S3 | Box sliding on a plane with friction 0.5, initial speed 5 m/s | Stops after about v / (mu g) = 5 / (0.5 x 9.81), roughly 1.02 s, within 10% |
| S4 | Box dropped tilted onto a plane | Comes to rest (speed and spin under 0.1) within 8 s. Best effort with the basic solver. |
| S5 | Ball pit: 20 circles between a floor and two walls, 10 s | No NaN or Infinity, nothing escapes the bounds |
| S6 | Mixed circles and boxes, 10 s | No NaN, no body above 50 m/s, nothing escapes the bounds |

## Success criteria

1. **Project:** D1-D5 meet their definitions of done, and the author has completed the standard track with all exercise tests passing.
2. **Learner outcome:** a learner who finishes can explain each pipeline stage (gather, broadphase, narrowphase, response) and what each one costs and gets wrong.
3. **Quality:** every formula and known-answer number carries its derivation, and every source cited is verified.
4. **Visuals:** the 6 must-have visuals exist and are driven by the real algorithm trace.

## Non-goals (for now)

Everything below is in `10-backlog`, not excluded forever:

3D; continuous collision detection; GJK/EPA and general polygons; joints; stable stacking in the standard track (advanced stretch); determinism; performance targets; hosted accounts or saved progress; multithreading.

## Constraints

- Language: TypeScript. Rendering: Canvas 2D, minimal.
- Public repository and public site, static hosting on GitHub Pages, no server.
- Licences: MIT for code, CC BY 4.0 for written content.
- Test-first: stubs with fixed signatures and failing tests, per exercise.
- Lessons are 5-7 minutes. An exercise follows every 3-4 pills.

## Principles

1. Correctness over performance.
2. Be honest about limitations: the basic solver's failures are a lesson, not a secret.
3. The visual is the real algorithm, never a separate illustration of it.
4. The contract is frozen: lessons quote signatures, so changing them means redoing content.
5. Verify before citing.

## Glossary

| Term | Meaning |
|---|---|
| Pill | One lesson page, 5-7 minutes |
| Module | A group of pills ending in an exercise and a demo |
| Contract | The frozen engine API and conventions in `02-contract` |
| Stub | A function with a fixed signature that throws `TODO` |
| Trace | A recorded list of algorithm steps that a visual replays |
| Manifold | The collision result: normal, and 1-2 contact points with depth |
| Work package (WP) | A unit of work for an agent, defined in `13-agent-plan` |

## Phases

| Phase | Content |
|---|---|
| 0 | This tree committed to the repository (done by the author) |
| 1 | Foundations: repo bootstrap, contract in code, trace and player, blog scaffold, reference verification |
| 2 | Module content, in three batches |
| 3 | Advanced track, after the author finishes the standard track |
| 4 | Integration, polish, launch |

Details, agent types and effort levels: [13-agent-plan](../13-agent-plan/README.md).
