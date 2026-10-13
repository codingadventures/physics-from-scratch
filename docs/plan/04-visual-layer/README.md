---
section: "04-visual-layer"
status: drafted
depends_on: ["02-contract", "03-repo-spec"]
owner: unassigned
outputs: ["starter/src/trace/", "starter/src/visuals/", "site/ (embedding)"]
definition_of_done: "Recorder and player work, the 6 must-have visuals exist, run the real algorithm trace, and work on desktop and mobile."
---


# 04 Visual layer

**Problem:** formulas like SAT or the impulse equation are hard to absorb without seeing what each term does. The course needs visuals that unfold the algorithm, in the spirit of a debug draw that steps through a loop one iteration at a time.

**Can it live on a static GitHub site?** Yes. Interactive visuals are client-side JavaScript drawing to a canvas, and GitHub Pages serves static files, including JavaScript. Only server-side features (accounts, saved progress) are out.

## Core idea: algorithms emit a trace, visuals replay it

1. Algorithms call an optional ambient `trace` (no-op by default): `trace.step("project A onto axis n0", [draw primitives])`.
2. A recorder collects the steps into frames: label, drawn primitives, and the values at that moment.
3. A player widget replays them: play, pause, step forward and back, scrub.
4. The same code runs in the engine (live debug draw), in the tests (trace off), and on the site (replayed).

Consequences:

- **No divergence:** the visual cannot disagree with the maths, because it is the real algorithm.
- **Time travel:** stepping backwards and scrubbing come free from recording.
- **One mechanism** serves the lessons, the learner's own debugging, and the engine's debug draw.
- **Learner cost is near zero:** exercise signatures do not change. A learner's own solution shows up in the visuals if they add `trace.step` calls.
- **Caveat:** since there are no reference solutions, site visuals need an algorithm to run. See OQ-11: the visuals' algorithms are small standalone implementations written for the visuals (not the exercise solutions), kept outside the learner's stub paths.

## Widget types

| Type | What it does | Example use |
|---|---|---|
| Step-through | Replays a recorded trace with play, step, scrub | SAT axis by axis; face clipping; one solver iteration at a time |
| Drag and see | Shapes you can drag, with live normal, depth, contacts | Circle vs box closest point; manifold updating as you move |
| Formula-linked | Hovering a term in an equation highlights its geometry | In the impulse formula, hover the relative velocity term and see that vector |
| Parameter play | Sliders for restitution, friction, iterations, timestep | Bounce height vs restitution; jitter vs iteration count |
| Simulation recorder | Records a whole simulation, then scrub back and forth | The engine's debug tool and the Module 6 capstone |

## Planned visuals

| ID | Module | Visual | Priority |
|---|---|---|---|
| V0 | 0 | Vector addition, doubling as the player tutorial (`v0-vector-add`, demo 0) | optional, built |
| V1 | 1 | Explicit vs semi-implicit Euler energy drift on a spring or orbit | must-have |
| V2 | 1 | Inertia of a box vs a circle | optional |
| V3 | 2 | AABB of a rotating box growing and shrinking | optional |
| V4 | 3 | Sort and sweep: the sweep moving along the axis, pairs appearing | must-have |
| V5 | 3 | Brute force vs sweep pair counts | optional |
| V6 | 4 | Closest point on a box to a circle | optional |
| V7 | 4 | SAT projection intervals on each axis, overlap or gap | must-have |
| V8 | 4 | Reference and incident face selection | optional |
| V9 | 4 | Clipping a segment against side planes | must-have |
| V10 | 5 | Relative velocity split into normal and tangent | must-have |
| V11 | 5 | Impulse applied at a lever arm and the resulting spin | must-have |
| V12 | 5 | Friction cone | optional |
| V13 | 5 | Solver iterations converging, and jittering | optional |
| V14 | Advanced | Warm starting on and off; impulses vs XPBD; stacking before and after | later |

There are 6 must-haves (V1, V4, V7, V9, V10, V11).

## Cost and risk

- The framework (recorder, player, drag helpers) is built once. Each visual then takes roughly an hour or two. About 14 visuals is meaningful work, so the must-haves come first.
- A visual that does not match its lesson text is worse than none: each visual is reviewed alongside its pill, and the author reviews as the first learner.
- Mobile layouts need testing since drag interactions differ on touch.
- Respect `prefers-reduced-motion` and keep a static image fallback per visual.
