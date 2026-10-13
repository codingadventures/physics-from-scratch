---
section: "08-modules/m5-response"
status: drafted
depends_on: ["01-format", "02-contract", "03-repo-spec", "04-visual-layer"]
owner: unassigned
outputs: ["course/m5/pill-5.1-relative-velocity-at-a-contact.md", "course/m5/pill-5.2-the-normal-impulse-linear.md", "course/m5/pill-5.3-restitution.md", "course/m5/pill-5.4-adding-rotation.md", "course/m5/pill-5.5-friction.md", "course/m5/pill-5.6-iterating-over-contacts.md", "course/m5/pill-5.7-fixing-penetration.md", "course/m5/pill-5.8-what-this-solver-gets-wrong.md", "course/m5/exercise-5a.md", "starter/tests/ex5a-linear-impulse.test.ts", "course/m5/exercise-5b.md", "starter/tests/ex5b-rotation-friction.test.ts", "course/m5/exercise-5c.md", "starter/tests/ex5c-solver.test.ts"]
definition_of_done: "Every pill file exists, is 5-7 minutes, follows the 01-format template and has checkpoint questions and verified readings. Every exercise page has hints 1-3 and its test file, which compiles against the WP-02 stubs. Every formula and known-answer number carries its derivation. The fresh-context review found no unresolved issues."
---

# M5 Collision response (~5h)

Spec drafted; pills, exercise pages and tests are not written yet. Function signatures below are proposals: WP-02 finalises them and records them in 02-contract.

## Purpose

Turn manifolds into velocity changes: normal impulses with restitution, then rotation, friction, iteration and positional correction. The solver is deliberately basic, and its failures are part of the lesson.

## Prerequisites

Modules 0-4 complete.

## Pills (planned)

| ID | Title | Key idea |
|---|---|---|
| 5.1 | Relative velocity at a contact | vrel = dot(vB - vA, n); approaching vs separating |
| 5.2 | The normal impulse (linear) | derive j = -(1+e)*vrel / (invMassA + invMassB); apply equal and opposite |
| 5.3 | Restitution | bounciness, the mixing rule, e = 0 and e = 1 |
| 5.4 | Adding rotation | lever arms, velocity at a point v + w x r, effective mass, the full impulse formula |
| 5.5 | Friction | tangent impulse, the Coulomb clamp |jt| <= mu*jn |
| 5.6 | Iterating over contacts | the sequential impulse loop and the iteration count |
| 5.7 | Fixing penetration | positional correction and slop |
| 5.8 | What this solver gets wrong | jitter, sinking, no stacking, tunnelling; pointers to the advanced track |

## Exercises

### Exercise 5a: Linear normal impulse with restitution

- **Covers pills:** 5.1-5.3
- **Files (stubs):** `starter/src/solver/impulse.ts`
- **Tests:** `starter/tests/ex5a-linear-impulse.test.ts`

**Functions (proposed):**

- `relativeNormalVelocity(a: Body, b: Body, normal: Vec2): number`
- `solveNormalImpulseLinear(m: Manifold): void`

**Behaviour spec:**

- vrel = dot(vB - vA, n) with n from A to B. Bodies approach when vrel < 0; do nothing when vrel >= 0.
- e = max(restitutionA, restitutionB) (contract). j = -(1 + e) * vrel / (invMassA + invMassB). Apply -j*n/mA to A and +j*n/mB to B (use invMass). Linear only: ignore rotation and the contact point.

**Tests to write** (known-answer tests carry their derivation in a comment):

- Equal masses 1, vA = (1,0), vB = (-1,0), n = (1,0), e = 1: vrel = -2, j = 2*2/2 = 2, vA' = -1, vB' = +1 (velocities exchange). With e = 0: j = 1, both end at 0.
- Masses 1 and 3, vA = (2,0), vB = 0, e = 1: j = 4/(1 + 1/3) = 3; vA' = -1, vB' = 1. Momentum 2 before and 1*(-1) + 3*1 = 2 after; energy 2 before and 0.5 + 1.5 = 2 after.
- Static B (invMass 0), vA = (1,0), e: vA' = -e.
- Separating bodies are unchanged.
- Momentum is conserved exactly in all non-static cases.

**Hints to write** (1-3, no code): the sign convention for vrel; where the (1 + e) factor comes from; why inverse masses make static bodies work without special cases

### Exercise 5b: Rotation and friction

- **Covers pills:** 5.4-5.5
- **Files (stubs):** `starter/src/solver/impulse.ts`
- **Tests:** `starter/tests/ex5b-rotation-friction.test.ts`

**Functions (proposed):**

- `applyImpulse(body: Body, impulse: Vec2, r: Vec2): void`
- `solveContact(m: Manifold, point: ContactPoint): void`

**Behaviour spec:**

- applyImpulse: v += invMass*J and w += invInertia*cross(r, J), with r from the centre of mass to the contact point.
- Velocity at a point: v + crossSV(w, r). Normal impulse: j = -(1 + e)*vrel_n / (invMassA + invMassB + cross(rA,n)^2*invIA + cross(rB,n)^2*invIB).
- Friction: tangent t perpendicular to n along the sliding direction; jt = -vrel_t / (the same denominator with t); clamp |jt| <= mu*j where mu = sqrt(muA*muB) (contract).

**Tests to write** (known-answer tests carry their derivation in a comment):

- applyImpulse: invMass 1, J = (0,-1) at r = (1,0): linear velocity gets (0,-1) and w gets invInertia * cross(r, J) = invInertia * (1*(-1) - 0*0) = -invInertia (clockwise, as a downward push on the right side should be).
- Off-centre hit on a box induces spin with the expected sign; a central hit induces none.
- Friction clamp with invInertia = 0: tangential speed 5, jn = 1, mu = 0.5, invMass 1: needed jt = 5 exceeds mu*jn = 0.5, so jt = 0.5 and the new tangential speed is 4.5. With tangential speed 0.3: needed 0.3 is within the cone, so speed becomes 0.
- Energy never increases in a frictionless collision with e <= 1 (kinetic energy after <= before + 1e-9), rotation included. Positional correction is off in this test.

**Hints to write** (1-3, no code): why the lever arm appears in the denominator; how to build the tangent from the relative velocity; what the friction cone clamp does

### Exercise 5c: Iteration and positional correction

- **Covers pills:** 5.6-5.8
- **Files (stubs):** `starter/src/solver/impulse.ts`, `starter/src/world/world.ts`
- **Tests:** `starter/tests/ex5c-solver.test.ts`

**Functions (proposed):**

- `solveContacts(manifolds: Manifold[], iterations: number): void`
- `positionalCorrection(m: Manifold, percent: number, slop: number): void`
- `World wires the solver stage (World.solver)`

**Behaviour spec:**

- Loop `iterations` times over all contact points in a fixed order, calling solveContact. Basic version: each normal impulse is clamped to >= 0 per iteration, with no accumulated impulse and no warm starting (a documented limitation, fixed in A2).
- positionalCorrection: corr = max(depth - slop, 0) / (invMassA + invMassB) * percent; A -= invMassA*corr*n, B += invMassB*corr*n. Typical values from memory (to tune): percent 0.2-0.8, slop 0.01-0.05, iterations 8-10.

**Tests to write** (known-answer tests carry their derivation in a comment):

- S1: a circle (r 0.5, m 1, e 0) dropped from y = 3 on a plane at y = 0 comes to rest within 5 s: |y - 0.5| < 0.01, speed < 0.05.
- S2: equal circles head on in zero gravity, e = 1: velocities exchange within 1e-3; momentum conserved within 1e-9.
- S3: box sliding with friction 0.5 and v = 5 stops after about v/(mu*g) = 5/(0.5*9.81) = 1.02 s, within 10%.
- No tunnelling at normal speeds: a ball dropped from 10 m (about 14 m/s on impact, about 0.23 m per step) stays above the plane.
- After settling, penetration depth < 0.05.
- Tolerances are loose and are tuned when the author's first solution passes (there is no reference solution).

**Hints to write** (1-3, no code): why one pass is not enough when contacts share bodies; what slop prevents; why positional correction is separate from the velocity solve

### TypeScript you need here (Exercises 5a-5c)

Taught in a short box on the exercise page, only when first needed (D-029): functions as values and closures (the World's solver stage), `for` and `for...of` loops, numeric precision with `Math.max`/`Math.min`/`Math.sqrt`. C++ comparison: a closure is like a lambda that captures by reference.

## Visuals

- **V10 (must-have):** relative velocity split into normal and tangent components at a contact.
- **V11 (must-have):** an impulse applied at a lever arm and the resulting spin.
- V12 (optional): the friction cone. V13 (optional): solver iterations converging, and jittering.

## Readings

Candidates only. Cite a source in a pill only if it is marked verified in `06-references`.

- Erin Catto, GDC talks on contact solving (unverified); Box2D Lite source (to be verified) as the dissection target.
- Richard Tonge, Solving Rigid Body Contacts, GDC 2012 (listed in the amano.games devlog, not yet opened).
- Chris Hecker and Allen Chou (listed in the devlog, not yet opened); Randy Gaul's tutorial (listed).
- Millington (unverified).

## Work package: turning this spec into content

**Outputs** (create these; write nowhere else):

- `course/m5/pill-5.1-relative-velocity-at-a-contact.md`
- `course/m5/pill-5.2-the-normal-impulse-linear.md`
- `course/m5/pill-5.3-restitution.md`
- `course/m5/pill-5.4-adding-rotation.md`
- `course/m5/pill-5.5-friction.md`
- `course/m5/pill-5.6-iterating-over-contacts.md`
- `course/m5/pill-5.7-fixing-penetration.md`
- `course/m5/pill-5.8-what-this-solver-gets-wrong.md`
- `course/m5/exercise-5a.md`
- `starter/tests/ex5a-linear-impulse.test.ts`
- `course/m5/exercise-5b.md`
- `starter/tests/ex5b-rotation-friction.test.ts`
- `course/m5/exercise-5c.md`
- `starter/tests/ex5c-solver.test.ts`
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

Pill order differs from the single-file plan: restitution (5.3) now comes before rotation (5.4) so that Exercise 5a's linear tests match the pills it covers (decision D-021). The impulse formulas above are the standard ones; the pill author derives them rather than quoting them, and the test author re-derives every number.

## Definition of done

Every pill file exists, is 5-7 minutes, follows the 01-format template and has checkpoint questions and verified readings. Every exercise page has hints 1-3 and its test file, which compiles against the WP-02 stubs. Every formula and known-answer number carries its derivation. The fresh-context review found no unresolved issues.
