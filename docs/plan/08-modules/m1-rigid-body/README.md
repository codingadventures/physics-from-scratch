---
section: "08-modules/m1-rigid-body"
status: drafted
depends_on: ["01-format", "02-contract", "03-repo-spec", "04-visual-layer"]
owner: unassigned
outputs: ["course/m1/pill-1.1-what-a-rigid-body-is.md", "course/m1/pill-1.2-mass-inverse-mass-static-bodies.md", "course/m1/pill-1.3-moment-of-inertia.md", "course/m1/pill-1.4-integration.md", "course/m1/pill-1.5-the-game-loop-and-the-fixed-timestep.md", "course/m1/pill-1.6-shapes-and-transforms.md", "course/m1/exercise-1.md", "starter/tests/ex1-rigid-body.test.ts"]
definition_of_done: "Every pill file exists, is 5-7 minutes, follows the 01-format template and has checkpoint questions and verified readings. Every exercise page has hints 1-3 and its test file, which compiles against the WP-02 stubs. Every formula and known-answer number carries its derivation. The fresh-context review found no unresolved issues."
---

# M1 Rigid body representation (~3h)

Spec drafted; pills, exercise pages and tests are not written yet. Function signatures below are proposals: WP-02 finalises them and records them in 02-contract.

## Purpose

Define what a rigid body is in code: state, mass and inertia, shapes, and how it moves under integration at a fixed timestep.

## Prerequisites

Module 0 complete (Vec2). Basic calculus intuition.

## Pills (planned)

| ID | Title | Key idea |
|---|---|---|
| 1.1 | What a rigid body is | state: position, angle, linear and angular velocity |
| 1.2 | Mass, inverse mass, static bodies | why we store 1/m; inverse mass 0 means static |
| 1.3 | Moment of inertia | circle and box formulas with a derivation sketch |
| 1.4 | Integration | explicit vs semi-implicit Euler; why we pick semi-implicit (decision D-018) |
| 1.5 | The game loop and the fixed timestep | accumulator pattern; why dt is fixed |
| 1.6 | Shapes and transforms | circle, box, plane; local vs world coordinates |

## Exercises

### Exercise 1: Body, inertia and integration

- **Covers pills:** 1.1-1.6
- **Files (stubs):** `starter/src/dynamics/shapes.ts`, `starter/src/dynamics/body.ts`, `starter/src/dynamics/integrate.ts`
- **Tests:** `starter/tests/ex1-rigid-body.test.ts`

**Functions (proposed):**

- `circleInertia(mass: number, radius: number): number`
- `boxInertia(mass: number, halfWidth: number, halfHeight: number): number`
- `createBody(def: BodyDef, id: number): Body`
- `integrate(body: Body, dt: number, gravity: Vec2): void`

**Behaviour spec:**

- Bodies are mutable records; `integrate` updates them in place.
- `createBody` sets invMass = 1/mass and invInertia = 1/inertia; mass 0 gives invMass 0 and invInertia 0 (static). A non-static plane throws. Defaults: angle 0, velocities 0, restitution 0, friction 0.5.
- `integrate` is semi-implicit Euler: for dynamic bodies, velocity += gravity*dt first, then position += velocity*dt and angle += angularVelocity*dt. Gravity is an acceleration (mass-independent). No damping.
- Static bodies (invMass 0) are not changed by `integrate`.

**Tests to write** (known-answer tests carry their derivation in a comment):

- Free fall from rest, dt = 1/60, g = (0,-9.81), n steps: v_n = -g*n*dt and y_n = -g*dt^2*n*(n+1)/2 (velocity is updated before position). For n = 60: y = -9.81 * 60*61 / (2*3600) = -4.98675 (exact to 1e-9). Also within 0.1 of the analytic -0.5*g*t^2 = -4.905 at t = 1 (the difference, about 0.082, is the discretisation error).
- Constant angular velocity w = 2 for 60 steps of 1/60 gives angle = 2 (1e-9).
- Zero gravity: velocity unchanged and position = x0 + v*t.
- Static bodies (mass 0) do not move under gravity.
- Inertia: circle, m = 2, r = 3 gives 0.5*2*9 = 9. Box, m = 12, hw = 1, hh = 2 gives m*(hw^2 + hh^2)/3 = 12*5/3 = 20 (from m*(w^2 + h^2)/12 with w = 2*hw, h = 2*hh).
- createBody: mass 4 gives invMass 0.25; mass 0 gives invMass 0 and invInertia 0; a plane with mass > 0 throws; defaults applied.

**Hints to write** (1-3, no code): which update happens first in semi-implicit Euler and why; why static bodies use inverse mass 0; how the box inertia formula follows from the rectangle formula

## Visuals

- **V1 (must-have):** explicit vs semi-implicit Euler energy drift on a spring or orbit. Run the real integration step on the same system with both schemes and plot energy over time.
- V2 (optional): inertia of a box vs a circle.

## Readings

Candidates only. Cite a source in a pill only if it is marked verified in `06-references`.

- Glenn Fiedler, integration basics and 'Fix Your Timestep' (unverified).
- Chris Hecker, Rigid Body Dynamics (listed in the amano.games devlog, not yet opened).
- Millington, Game Physics Engine Development (unverified).

## Work package: turning this spec into content

**Outputs** (create these; write nowhere else):

- `course/m1/pill-1.1-what-a-rigid-body-is.md`
- `course/m1/pill-1.2-mass-inverse-mass-static-bodies.md`
- `course/m1/pill-1.3-moment-of-inertia.md`
- `course/m1/pill-1.4-integration.md`
- `course/m1/pill-1.5-the-game-loop-and-the-fixed-timestep.md`
- `course/m1/pill-1.6-shapes-and-transforms.md`
- `course/m1/exercise-1.md`
- `starter/tests/ex1-rigid-body.test.ts`
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
| Visuals | general-purpose | Sonnet | medium |
| Review (fresh context, report only) | general-purpose | Opus | high |

## Notes

Semi-implicit Euler is a proposal (D-018). The author approves it before pill 1.4 is drafted.

## Definition of done

Every pill file exists, is 5-7 minutes, follows the 01-format template and has checkpoint questions and verified readings. Every exercise page has hints 1-3 and its test file, which compiles against the WP-02 stubs. Every formula and known-answer number carries its derivation. The fresh-context review found no unresolved issues.
