# Oracle: how good is your engine?

You write your own solution. This folder measures it against two established engines.
They are yardsticks. Nothing here says your engine must match them.

```
npm run oracle        # runs the comparisons and writes oracle/out/report.md
```

## The yardsticks

| Engine             | What it is                                                                                             | Use it for                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Box2D 2.4          | [box2d.ts](https://github.com/flyover/box2d.ts), a TypeScript port of full Box2D, sleeping off         | "Is this good physics?" Circles, restitution, stacking, the quality bar           |
| Box2D Lite         | A TypeScript port of [Box2D Lite](https://github.com/erincatto/box2d-lite), boxes only, no restitution | "Does my code do what the lessons teach?" Near-identical numbers for box contacts |
| Lite, course order | The same Lite in your step order (integrate, collide, solve) with a basic solver                       | A diagnostic for the solver exercises                                             |

Both are shipped as minified bundles in `engines/`, so try the exercises yourself first.

## What it reports

For each scene (`lib/scenes.ts`) and engine, `lib/score.ts` measures from positions and
velocities only, the same way for every engine:

- **Ground penetration**: deepest overlap with the ground.
- **Pair overlap**: deepest bounding-box overlap between two bodies. A proxy: exact for
  axis-aligned boxes, too big for rotated ones.
- **Energy gain**: how far total energy rose above its start. Near 0 is good; a rise means
  energy was created.
- **Energy drift**: final minus initial energy. Negative means energy was lost.
- **Settle time**: when every body stays slower than 0.05 m/s and 0.05 rad/s. "never" means
  it was still jittering.
- **Rest y error / stop x error**: distance from the known answer, with the derivation in the
  scene (`expect.why`).

## Milestone checks

Run with `npm run oracle`. They skip until the exercise they need is solved.

| File                    | Milestone | Checks                                                                                                          |
| ----------------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| `m1.oracle.test.ts`     | M1        | `integrate` matches the engines on free fall to 1e-9 (no contact: they must agree)                              |
| `m4.oracle.test.ts`     | M4        | `collide` on 1000 random box-box poses against Lite: contact count, normal, depth, and points along the tangent |
| `scenes.oracle.test.ts` | M2, M5    | Scores your whole engine on every scene (needs the World and the solver stages)                                 |

## What to expect

Full Box2D and Lite differ from each other, and from you, in ways that are not bugs:

- **Step order.** The course integrates, then collides, then solves. Lite and Box2D collide first,
  then change velocities, solve, and only then move bodies; Box2D adds a separate position pass.
- **Solver.** Lite and Box2D accumulate and warm-start impulses. The course's basic solver
  clamps per iteration and does not warm-start, so it jitters at rest. That is a known limit.
- **Box2D extras.** A block solver, a separate position-correction pass, a 0.005 m slop, a
  skin radius on polygons, continuous collision (it does not tunnel at impact) and a
  restitution threshold. Penetration at first contact is therefore 0 in Box2D and a few
  centimetres in Lite and in engines like yours.

So after the first contact, paths drift apart. Compare the scores, not the paths.

## Provenance and checks

- `engines/lite.js`: Box2D Lite (Erin Catto, MIT). Doubles instead of float32, joints removed.
  Checked against the C++ original built in double precision: identical to 1e-10 on single
  boxes and 8e-7 on a five-box stack (the only difference is the maths library's sin and cos).
  Against the float32 original the difference is around 1e-6, and 4e-3 on a slide that stops on a
  float-sensitive threshold.
- `engines/box2d.js`: box2d.ts commit 7b387c3 (2023-06-29), zlib licence, banner kept in the
  file. Tree-shaken to the classes the oracle uses.
- `lib/oracle.test.ts` runs in CI. It tests the scoring maths on hand-made traces and checks
  that both bundles load and give sane answers.
