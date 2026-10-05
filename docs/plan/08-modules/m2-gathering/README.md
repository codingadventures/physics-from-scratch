---
section: "08-modules/m2-gathering"
status: drafted
depends_on: ["01-format", "02-contract", "03-repo-spec", "04-visual-layer"]
owner: unassigned
outputs: ["course/m2/pill-2.1-the-pipeline-at-a-glance.md", "course/m2/pill-2.2-the-world.md", "course/m2/pill-2.3-world-space-aabbs.md", "course/m2/pill-2.4-per-step-data.md", "course/m2/exercise-2.md", "starter/tests/ex2-world.test.ts"]
definition_of_done: "Every pill file exists, is 5-7 minutes, follows the 01-format template and has checkpoint questions and verified readings. Every exercise page has hints 1-3 and its test file, which compiles against the WP-02 stubs. Every formula and known-answer number carries its derivation. The fresh-context review found no unresolved issues."
---

# M2 Gathering, the world and the step pipeline (~2h)

Spec drafted; pills, exercise pages and tests are not written yet. Function signatures below are proposals: WP-02 finalises them and records them in 02-contract.

## Purpose

Build the layer that owns the bodies and, every frame, gathers them with their current transforms and world-space AABBs, ready for broadphase, narrowphase and the solver.

## Prerequisites

Modules 0-1 complete.

## Pills (planned)

| ID | Title | Key idea |
|---|---|---|
| 2.1 | The pipeline at a glance | integrate, gather, broadphase, narrowphase, solve |
| 2.2 | The World | registering bodies, ids, gathering them every frame |
| 2.3 | World-space AABBs | rotated boxes, conservative bounds |
| 2.4 | Per-step data | pair lists and contact lists, rebuilt every step |

## Exercises

### Exercise 2: AABBs and the World

- **Covers pills:** 2.1-2.4
- **Files (stubs):** `starter/src/world/aabb.ts`, `starter/src/world/world.ts`
- **Tests:** `starter/tests/ex2-world.test.ts`

**Functions (proposed):**

- `computeAABB(body: Body): AABB`
- `class World { gravity: Vec2; bodies: readonly Body[]; addBody(def: BodyDef): Body; removeBody(body: Body): void; gather(): Array<{ body: Body; aabb: AABB }>; step(dt: number): void }`
- `World stage hooks: broadphase, narrowphase, solver (injectable, no-ops by default)`

**Behaviour spec:**

- Circle AABB: position +/- radius.
- Box AABB half-extents: ex = |cos(a)|*hw + |sin(a)|*hh, ey = |sin(a)|*hw + |cos(a)|*hh (the extent of the four rotated corners).
- Plane AABB is unbounded: min = (-Infinity, -Infinity), max = (Infinity, Infinity) (conservative; static-static pairs are filtered in broadphase).
- Ids are unique, increasing, and never reused after removal.
- `step(dt)` order: integrate dynamic bodies, then gather, then broadphase.findPairs, then narrowphase over the pairs, then solver. This module only wires the order; the stages are injected.

**Tests to write** (known-answer tests carry their derivation in a comment):

- Circle at (1,2), r = 0.5: min (0.5,1.5), max (1.5,2.5).
- Box hw = 2, hh = 1: angle 0 gives half-extents (2,1); angle pi/2 gives (|0|*2 + 1*1, 1*2 + 0) = (1,2) within 1e-12; a square hw = hh = 1 at pi/4 gives sqrt(2) in both.
- Property test: for seeded random boxes and angles, the AABB contains all four rotated corners.
- Plane AABB is infinite on both axes.
- addBody returns bodies with ids 0, 1, 2; after removeBody the id is not reused; removed bodies are absent from gather().
- step integrates gravity using the discrete formula from Exercise 1; gather() afterwards reflects the new positions.
- Pipeline order: with spy stages, step calls integrate, broadphase, narrowphase, solver in that order.

**Hints to write** (1-3, no code): why the box extent formula uses absolute values; where gather sits relative to integration; why ids must not be reused

## Visuals

V3 (optional): the AABB of a rotating box growing and shrinking as it spins.

## Readings

Candidates only. Cite a source in a pill only if it is marked verified in `06-references`.

- Ericson, Real-Time Collision Detection (unverified), for AABBs.
- Box2D Lite source (to be verified) for how a small engine structures its world.

## Work package: turning this spec into content

**Outputs** (create these; write nowhere else):

- `course/m2/pill-2.1-the-pipeline-at-a-glance.md`
- `course/m2/pill-2.2-the-world.md`
- `course/m2/pill-2.3-world-space-aabbs.md`
- `course/m2/pill-2.4-per-step-data.md`
- `course/m2/exercise-2.md`
- `starter/tests/ex2-world.test.ts`
- visuals: see the Visuals section and `04-visual-layer` (after WP-03)

**Steps:**

1. Draft each pill from the table above using the pill template in `01-format`. Check every formula and derive every number.
2. Write each exercise page with hints 1-3 (approach descriptions, never code).
3. Write the test file against the stub signatures from WP-02. Keep each exercise's tests dependent only on given code and earlier exercises.
4. Build the visuals listed above, after WP-03 delivers the trace framework.
5. Request a fresh-context review (see `13-agent-plan`) and fix what it finds.
6. Set `status` here and in `INDEX.md`.

**Suggested agents** (see `13-agent-plan` for the rules):

| Step | Agent type | Model tier | Effort |
|---|---|---|---|
| Pills | general-purpose | Sonnet | medium |
| Exercise pages and hints | general-purpose | Sonnet | medium |
| Tests | general-purpose | Opus | high |
| Visuals | general-purpose | Sonnet | low |
| Review (fresh context, report only) | general-purpose | Opus | high |

## Definition of done

Every pill file exists, is 5-7 minutes, follows the 01-format template and has checkpoint questions and verified readings. Every exercise page has hints 1-3 and its test file, which compiles against the WP-02 stubs. Every formula and known-answer number carries its derivation. The fresh-context review found no unresolved issues.
