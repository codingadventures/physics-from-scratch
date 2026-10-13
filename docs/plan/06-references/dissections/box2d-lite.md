# Box2D Lite: a dissection

**Source:** https://github.com/erincatto/box2d-lite, commit `227b71b` (9 Jan 2020), cloned and read on 2026-10-13. Every claim below cites `file:line` at that commit. Licence: MIT (repository `LICENSE`, 2019); the source file headers carry Erin Catto's older 2006-2009 permissive notice.

**Companion talk:** Erin Catto, "Fast and Simple Physics using Sequential Impulses", GDC 2006 (see `06-references`).

**Scope:** the engine only: `include/box2d-lite/*.h` and `src/*.cpp`, about 1,300 lines. Joints (`Joint.cpp`) are out of the course's scope and only mentioned. The sample app (`samples/main.cpp`) is used for its settings and scenes. Code is paraphrased, not copied. Lessons may point learners here, but exercises must not be solvable by transcribing it.

## 1. Pipeline map

`World::Step(dt)` (`src/World.cpp:81-136`) runs, in order:

| # | Stage | Where | What it does |
|---|---|---|---|
| 1 | Broadphase + narrowphase | `World::BroadPhase`, `World.cpp:44-79` | Every pair of bodies (skipping static-static) is collided at once. Contacts are kept in a persistent map of arbiters keyed by the body pair. |
| 2 | Integrate forces | `World.cpp:88-98` | Dynamic bodies only: velocity += dt * (gravity + invMass * force); angular velocity += dt * invI * torque. |
| 3 | Pre-step | `Arbiter::PreStep`, `Arbiter.cpp:83-123` | Per contact: effective masses for normal and tangent, the position bias, and (if enabled) re-applies last step's impulses (warm starting). |
| 4 | Iterate | `World.cpp:111-123`, `Arbiter::ApplyImpulse`, `Arbiter.cpp:125-197` | `iterations` passes over all arbiters (and joints), applying normal then friction impulses per contact. |
| 5 | Integrate velocities | `World.cpp:125-135` | position += dt * velocity; rotation += dt * angularVelocity; clear forces. |

Steps 2 and 5 together are semi-implicit Euler (velocity first, then position with the new velocity), as in this course (D-018). The important difference is **where the solver sits** between them: see section 7.

Sample settings (`samples/main.cpp:36-38`): dt = 1/60, 10 iterations, gravity (0, -10).

## 2. Data structures

- **Body** (`include/box2d-lite/Body.h:17-41`): position, rotation, velocity, angular velocity, accumulated force and torque, `width` (full box size, not half), friction, mass and inverse mass, inertia and inverse inertia. **Boxes only**: there are no circles and no planes. The ground in every sample is a large static box (`main.cpp:136`).
- **Static bodies:** mass `FLT_MAX` gives invMass 0 and invI 0 (`Body.cpp:44-55`), the same idea as this course's mass 0.
- **Inertia:** m(w^2 + h^2)/12 with full widths (`Body.cpp:47`). This is the course's box formula with w = 2*hw, h = 2*hh (m1 spec).
- **Contact** (`Arbiter.h:31-45`): position, normal, lever arms r1 and r2, `separation` (negative when penetrating), accumulated normal and tangent impulses (`Pn`, `Pt`), cached effective masses, bias, and a `FeaturePair` that identifies which edges produced the point. `Pnb` is declared and copied but never used by the solver.
- **Arbiter** (`Arbiter.h:65-84`): one per touching pair, up to 2 contacts, plus the mixed friction. Bodies are ordered by **pointer address** (`Arbiter.cpp:18-27`, `ArbiterKey` in `Arbiter.h:47-63`).
- **World** (`World.h:23-43`): vectors of body and joint pointers, the arbiter map, gravity, iteration count, and three global switches: `accumulateImpulses`, `warmStarting`, `positionCorrection`, all on by default (`World.cpp:23-25`). The sample app toggles them with A, W and P (`main.cpp:547-557`), which makes them good for showing what each one buys.

## 3. Broadphase

Brute force over all pairs, O(n^2), with a comment saying so (`World.cpp:46-78`). Static-static pairs are skipped (`World.cpp:55`). There is no AABB test: the full box-box collision runs for every pair. A new arbiter is inserted when contacts appear, updated when they persist, and erased when they disappear.

**Course comparison:** Exercise 3 adds the AABB filter and sort and sweep, which Box2D Lite does not have. Its pair ordering uses pointers; the course uses ids (`a.id < b.id`, 02-contract), which is deterministic across runs.

## 4. Narrowphase: box vs box (SAT and clipping)

`Collide` (`src/Collide.cpp:156-328`) is the only collision routine.

**SAT on 4 face axes** (`Collide.cpp:158-186`):
1. Work in each box's frame: d = posB - posA expressed in A's frame and in B's frame, and C = R_A^T R_B, the rotation of B relative to A.
2. For A's two face normals, separation = |d_A| - hA - |C| hB (component-wise). The term |C| hB is the projected half-extent of B onto A's axes. Any positive component means a separating axis: return no contacts.
3. The same for B's two face normals with |C|^T.

**Axis choice with a bias** (`Collide.cpp:188-221`): start with A's x axis, then switch to another axis only if its separation beats the current one by a margin: a relative tolerance of 0.95 and an absolute one of 0.01 times the half-extent. This favours A's faces and avoids flip-flopping between near-equal axes from frame to frame, which keeps contact features stable for warm starting. The normal points from A to B (`Collide.cpp:155`, sign chosen from d).

**Reference and incident faces** (`Collide.cpp:223-287`): the box that owns the chosen axis gives the reference face (its front plane and two side planes). `ComputeIncidentEdge` (`Collide.cpp:95-153`) picks the other box's edge whose normal is most anti-parallel to the reference normal, by comparing the components of the normal in the incident box's frame.

**Clipping** (`ClipSegmentToLine`, `Collide.cpp:57-93`): keep the endpoints behind a plane, and if the segment crosses it, add the intersection point found by linear interpolation of the two signed distances. The incident edge is clipped against both side planes (`Collide.cpp:295-305`). Then each remaining point below the reference face becomes a contact (`Collide.cpp:310-326`).

**Contact point placement:** the point is moved onto the reference face (`Collide.cpp:319-320`). The course instead uses the midpoint of the penetration region (02-contract). Both are valid; the course's choice is symmetric in A and B.

**Feature pairs:** each clip vertex records which edges it came from (`Collide.cpp:44-55`, `ClipSegmentToLine`, `ComputeIncidentEdge`). That id lets the arbiter match a new contact to last step's contact (section 6).

**Course comparison:**

| Topic | Box2D Lite | This course |
|---|---|---|
| Shapes | boxes only | circle, box, plane |
| Depth sign | `separation`, negative when penetrating | `depth`, positive when penetrating |
| Exactly touching | counts as a collision (only `> 0` separates, `Collide.cpp:180`, `:185`) | no collision (narrowphase returns null) |
| Axis choice | biased toward A's faces with tolerances | least penetration (m4 spec); the tolerance trick is worth a "Common mistakes" note in pill 4.6 |
| Contact point | on the reference face | midpoint of the penetration region |

## 5. Solver: sequential impulses

**Pre-step** (`Arbiter.cpp:83-123`):
- Effective normal mass: invMassA + invMassB + invIA (r1·r1 - (r1·n)^2) + invIB (r2·r2 - (r2·n)^2) (`Arbiter.cpp:96-100`). In 2D, r·r - (r·n)^2 = cross(r, n)^2, so this is the same denominator as the m5 spec.
- Tangent: a fixed perpendicular of the normal, `Cross(normal, 1)` = (n.y, -n.x) (`Arbiter.cpp:102`, `MathUtils.h:96-99`). The friction impulse is clamped symmetrically, so the sliding direction does not need to be chosen. The m5 spec builds the tangent from the sliding direction instead; both work.
- Position bias: bias = -0.2/dt * min(0, separation + 0.01) (`Arbiter.cpp:85-86`, `:109`). This is **Baumgarte stabilisation**: penetration beyond a 0.01 slop becomes an extra target separating velocity.
- Warm start: re-apply last step's accumulated impulses (`Arbiter.cpp:111-121`).

**Per iteration, per contact** (`Arbiter.cpp:125-197`):
1. Relative velocity at the contact: vB + wB x rB - vA - wA x rA (`:137`).
2. Normal impulse dPn = massNormal * (-vn + bias) (`:140-142`).
3. **Accumulated clamp:** clamp the running total Pn to >= 0 and apply only the change (`:144-150`). With the switch off, clamp each increment to >= 0 instead (`:151-154`): that is the course's standard-track solver (m5, Exercise 5c).
4. Apply the normal impulse to both bodies, linear and angular (`:156-163`).
5. Recompute the relative velocity, then the friction impulse, clamped to friction * Pn, again on the running total (`:165-186`).
6. Apply the friction impulse (`:188-195`).

**Friction mixing:** sqrt(frictionA * frictionB) (`Arbiter.cpp:31`), the same rule as 02-contract.

**Restitution: none.** No restitution appears anywhere in the engine. Every collision is perfectly inelastic. The course adds restitution in Exercise 5a with the max() mixing rule.

## 6. Contact persistence and warm starting

`Arbiter::Update` (`Arbiter.cpp:34-80`) matches each new contact to an old one with the same feature id and, if warm starting is on, copies its accumulated impulses. The pre-step then applies those impulses before iterating, so the solver starts close to last step's answer. Together with accumulated impulses this is what makes the pyramid demo (`main.cpp:241-272`) stand. This is advanced track A2 in this course (D-006, D-009).

## 7. Differences that matter for this course

1. **Solver position in the step (finding).** Box2D Lite applies gravity to velocities *before* the solver and integrates positions *after* it, so for a resting body the solver cancels gravity in the same step and the body does not move. This course's frozen step order (02-contract, `World.step`) is integrate (velocity and position), then collide, then solve. A resting body therefore moves down by g*dt^2 every step before the solver sees it, and only positional correction pushes it back. Derivation of the steady state, with p = percent and s = slop, both from Exercise 5c: each step the body sinks g*dt^2 and correction removes p*(d - s), so equilibrium needs p*(d - s) = g*dt^2, giving a depth at narrowphase of d = s + g*dt^2/p and a depth after correction of s + g*dt^2*(1/p - 1). With dt = 1/60 and g = 9.81, g*dt^2 = 0.0027250. Logged as OQ-19 (lesson impact) and OQ-20 (S1 tolerance).
2. **Penetration recovery.** Box2D Lite uses a velocity bias (Baumgarte), the course uses a separate position projection (Exercise 5c). Pill 5.7 can show both; the bias version injects energy into the velocity, which is why it uses a small factor (0.2).
3. **Accumulated impulses and warm starting:** on by default in Box2D Lite, absent from the standard track by design (D-006). The A, W and P toggles in the sample app are a ready-made demonstration for pill 5.8 and advanced A2.
4. **No restitution, no circles, no planes, no AABBs:** the course covers more shapes and adds restitution, so Box2D Lite is a reference for boxes and the solver, not for the whole course.
5. **Determinism:** pair order follows pointer addresses (`ArbiterKey`), so iteration order can change between runs. The course orders by id.

## 8. Where each module can point learners

| Module | Box2D Lite reading |
|---|---|
| M1 | `Body.cpp:31-56` (inverse mass, static bodies, box inertia) |
| M2 | `World.cpp:81-136` (one step, and the order question in section 7) |
| M3 | `World.cpp:44-79` (the brute force baseline, without AABBs) |
| M4 | `Collide.cpp` (SAT on face axes, reference and incident faces, clipping) after Exercise 4b, not before |
| M5 | `Arbiter.cpp:83-197` (effective mass, bias, clamping, friction) after Exercise 5c |
| A2 | `Arbiter.cpp:34-80` and the switches in `World.cpp:23-25` (warm starting, accumulated impulses) |

## Not verified

- The engine was read, not built or run. Behaviour claims (stable stacking with the switches on) come from the source structure and the companion talk, not from running the samples.
- `docs/GDC2006_Catto_Erin_PhysicsTutorial.pdf` is stored in Git LFS and was not checked out with the clone; the same deck was read from box2d.org (`06-references`).
