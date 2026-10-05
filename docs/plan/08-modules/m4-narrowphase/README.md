---
section: "08-modules/m4-narrowphase"
status: drafted
depends_on: ["01-format", "02-contract", "03-repo-spec", "04-visual-layer"]
owner: unassigned
outputs: ["course/m4/pill-4.1-manifolds.md", "course/m4/pill-4.2-circle-vs-circle.md", "course/m4/pill-4.3-circle-vs-plane.md", "course/m4/pill-4.4-box-vs-plane.md", "course/m4/pill-4.5-circle-vs-box.md", "course/m4/pill-4.6-box-vs-box-sat.md", "course/m4/pill-4.7-box-vs-box-clipping.md", "course/m4/pill-4.8-dispatching.md", "course/m4/exercise-4a.md", "starter/tests/ex4a-narrowphase.test.ts", "course/m4/exercise-4b.md", "starter/tests/ex4b-box-box.test.ts"]
definition_of_done: "Every pill file exists, is 5-7 minutes, follows the 01-format template and has checkpoint questions and verified readings. Every exercise page has hints 1-3 and its test file, which compiles against the WP-02 stubs. Every formula and known-answer number carries its derivation. The fresh-context review found no unresolved issues."
---

# M4 Narrowphase (~5h)

Spec drafted; pills, exercise pages and tests are not written yet. Function signatures below are proposals: WP-02 finalises them and records them in 02-contract.

## Purpose

Turn candidate pairs into exact collision results (manifolds) for every shape pair we support. Box-box uses SAT with clipping, taught as a recipe here and derived properly in advanced module A1.

## Prerequisites

Modules 0-3 complete.

## Pills (planned)

| ID | Title | Key idea |
|---|---|---|
| 4.1 | Manifolds | normal, depth, contact points; the conventions in 02-contract |
| 4.2 | Circle vs circle | distance test, normal, depth, contact point |
| 4.3 | Circle vs plane | signed distance to a half-space |
| 4.4 | Box vs plane | corners below the plane; at most the two deepest |
| 4.5 | Circle vs box | closest point on a box; the centre-inside case |
| 4.6 | Box vs box: SAT | the separating axis test, used as a recipe |
| 4.7 | Box vs box: clipping | reference and incident face, clipping to a manifold |
| 4.8 | Dispatching | the shape-pair table and argument swapping |

## Exercises

### Exercise 4a: Circle and plane collisions

- **Covers pills:** 4.1-4.5
- **Files (stubs):** `starter/src/narrowphase/circleCircle.ts`, `starter/src/narrowphase/circlePlane.ts`, `starter/src/narrowphase/boxPlane.ts`, `starter/src/narrowphase/circleBox.ts`
- **Tests:** `starter/tests/ex4a-narrowphase.test.ts`

**Functions (proposed):**

- `circleVsCircle(a: Body, b: Body): Manifold | null`
- `circlePlane: circleVsPlane(a: Body, b: Body): Manifold | null`
- `boxVsPlane(a: Body, b: Body): Manifold | null`
- `circleVsBox(a: Body, b: Body): Manifold | null`

**Behaviour spec:**

- Conventions are in 02-contract: normal from A to B, depth positive, touching gives null, contact point is the midpoint of the penetration region along the normal.
- Coincident circle centres: normal (1,0), depth rA + rB (arbitrary but deterministic).
- Circle vs plane: with s = dot(n, c) - d, depth = r - s when s < r. The manifold normal (A to B) is -n, and the point is c - n*(r + s)/2.
- Box vs plane: return the corners with signed distance below the plane, keeping at most the two deepest; normal -n; each point is the midpoint between the corner and its projection onto the plane.
- Circle vs box: work in the box's local frame and clamp the circle centre to the box. Centre outside: normal points from the circle toward the box, depth = r - distance. Centre inside: use the nearest face; normal is minus that face's outward normal.

**Tests to write** (known-answer tests carry their derivation in a comment):

- circleVsCircle: A (0,0) r=1, B (1.5,0) r=1 gives normal (1,0), depth 0.5, point (0.75,0). Derivation: dist 1.5; depth = 2 - 1.5; A's surface point toward B (1,0), B's toward A (0.5,0); midpoint (0.75,0). Separated and exactly touching give null. Swapping arguments gives normal (-1,0), same depth and point.
- circleVsPlane: circle centre (0,0.5), r=1, plane n=(0,1), d=0: s=0.5, depth 0.5, normal (0,-1), point (0,-0.25) (deepest circle point (0,-0.5), plane surface (0,0), midpoint). Centre below the plane (s = -0.2): depth 1.2, point (0,-0.6). Tilted plane n=(0.6,0.8), circle (0,1), r=1: s=0.8, depth 0.2, normal (-0.6,-0.8).
- boxVsPlane: box hw=hh=1 at (0,0.5), angle 0, plane y=0: two points (-1,-0.25) and (1,-0.25), depth 0.5, normal (0,-1). Rotated pi/4 at (0,1): one point, depth sqrt(2) - 1 = 0.41421, point (0,-0.20711). Box fully above: null.
- circleVsBox: box hw=hh=1 at origin, circle centre (1.5,0), r=1: closest point (1,0), depth 0.5, normal (-1,0), point (0.75,0). Centre inside at (0.8,0): nearest face x=1, depth 1 + 0.2 = 1.2, normal (-1,0), point (0.4,0).
- Rotation invariance: rotating a whole configuration by theta rotates the normal by theta and keeps depth.

**Hints to write** (1-3, no code): how to get the signed distance from a point to a plane; why the normal for circle vs plane is minus n; how to clamp in the box's local frame

### Exercise 4b: Box vs box and dispatch

- **Covers pills:** 4.6-4.8
- **Files (stubs):** `starter/src/narrowphase/boxBox.ts`, `starter/src/narrowphase/dispatch.ts`
- **Tests:** `starter/tests/ex4b-box-box.test.ts`

**Functions (proposed):**

- `boxVsBox(a: Body, b: Body): Manifold | null`
- `collide(a: Body, b: Body): Manifold | null`

**Behaviour spec:**

- SAT over the four face normals (two per box); pick the axis of least penetration; null if any axis separates.
- Reference face from the box with the least-penetration axis; incident face is the other box's face most anti-parallel to it; clip the incident edge against the reference face's side planes; keep points at or below the reference face.
- `collide` accepts any pair in any order, swaps to canonical order and flips the normal back. Plane-plane and static-static return null.

**Tests to write** (known-answer tests carry their derivation in a comment):

- Separated boxes (A at (0,0), B at (3,0), hw=hh=1) give null.
- Face to face: A (0,0), B (0,1.8): normal (0,1), depth 0.2, two points (-1,0.9) and (1,0.9) (the incident face y=0.8 lies under the reference face y=1; midpoint y=0.9).
- Corner into face: B rotated pi/4 at (0,2.2): lowest corner y = 2.2 - sqrt(2) = 0.78579, depth 1 - 0.78579 = 0.21421, one point (0,0.89289). Other axes overlap more (for example 0.8586 along B's diagonal axis), so the y axis is the minimum.
- Swapping arguments flips the normal and keeps depth.
- collide: all pair types in both orders return the same manifold up to a flipped normal; plane-plane and static-static return null (use spies or known shapes to cover the table).

**Hints to write** (1-3, no code): what projecting a box onto an axis means; how to pick the incident face; what to keep after clipping

## Visuals

- **V7 (must-have):** SAT projection intervals on each axis, showing overlap or gap, stepping axis by axis.
- **V9 (must-have):** clipping the incident edge against the reference face's side planes.
- V6 (optional): closest point on a box to a circle. V8 (optional): reference and incident face selection.

## Readings

Candidates only. Cite a source in a pill only if it is marked verified in `06-references`.

- Dirk Gregorius, GDC talks on SAT and contact creation (unverified).
- Ericson, Real-Time Collision Detection (unverified).
- Randy Gaul, custom physics engine tutorial (listed in the amano.games devlog, not yet opened).
- Box2D Lite source (to be verified): its box-box collision is the natural reference.

## Work package: turning this spec into content

**Outputs** (create these; write nowhere else):

- `course/m4/pill-4.1-manifolds.md`
- `course/m4/pill-4.2-circle-vs-circle.md`
- `course/m4/pill-4.3-circle-vs-plane.md`
- `course/m4/pill-4.4-box-vs-plane.md`
- `course/m4/pill-4.5-circle-vs-box.md`
- `course/m4/pill-4.6-box-vs-box-sat.md`
- `course/m4/pill-4.7-box-vs-box-clipping.md`
- `course/m4/pill-4.8-dispatching.md`
- `course/m4/exercise-4a.md`
- `starter/tests/ex4a-narrowphase.test.ts`
- `course/m4/exercise-4b.md`
- `starter/tests/ex4b-box-box.test.ts`
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
| Pills | general-purpose | Opus | high |
| Exercise pages and hints | general-purpose | Opus | high |
| Tests | general-purpose | Opus | high |
| Visuals | general-purpose | Opus | medium |
| Review (fresh context, report only) | general-purpose | Opus | high |

## Notes

Exercise 4a covers five pills (4.1-4.5), over the 3-4 pill guideline. See OQ-13 for a proposed split. The depth and point values in the test list are hand derivations: the test author re-derives every one and records the derivation in a comment.

## Definition of done

Every pill file exists, is 5-7 minutes, follows the 01-format template and has checkpoint questions and verified readings. Every exercise page has hints 1-3 and its test file, which compiles against the WP-02 stubs. Every formula and known-answer number carries its derivation. The fresh-context review found no unresolved issues.
