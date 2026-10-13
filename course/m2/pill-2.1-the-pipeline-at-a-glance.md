---
id: "2.1"
title: "The pipeline at a glance"
module: "m2"
minutes: 6
prerequisites: ["1.4", "1.6"]
visual: "none"
readings_essential: ["box2d-documentation"]
readings_deeper: ["box2d-lite-dissection"]
---

## The question

Between "some bodies exist" and "they bounce off each other", what happens in one step, and why in that order?

## The idea

A physics step is a pipeline. Each stage takes the output of the one before and narrows the problem. Ours has five stages, in a fixed order:

1. **Integrate.** Move every dynamic body forward by `dt` (Module 1): gravity changes velocity, velocity changes position and angle.
2. **Gather.** Walk the bodies and pair each with its current world-space bounding box (pill 2.3).
3. **Broadphase.** Find the _candidate_ pairs: pairs of bodies whose bounding boxes overlap. Cheap and approximate.
4. **Narrowphase.** Test each candidate pair exactly. The result is a _manifold_ (a contact normal plus one or two contact points with depths) or nothing if the shapes do not really touch.
5. **Solver.** Take the manifolds and change the bodies' velocities (and, a little, positions) so they stop moving into each other.

| Stage       | Reads                 | Produces                   | Work                                     |
| ----------- | --------------------- | -------------------------- | ---------------------------------------- |
| Integrate   | bodies, `dt`, gravity | the same bodies, moved     | one pass over n bodies                   |
| Gather      | bodies                | bodies with bounding boxes | one pass over n bodies                   |
| Broadphase  | bodies                | candidate pairs            | up to n(n-1)/2 box tests for brute force |
| Narrowphase | one pair              | a manifold or `null`       | exact geometry, once per candidate pair  |
| Solver      | manifolds             | changed velocities         | a few passes over the manifolds          |

The expensive step, exact geometry, runs only on pairs that survived the cheap step. With 20 bodies there are up to 20 x 19 / 2 = 190 pairs; in a typical scene most are far apart and never reach the narrowphase.

## Visual

None.

## The maths

There is little new maths here, but the order of the stages has consequences you can compute.

**Why integrate first.** Detection should look at where the bodies are _now_. If we detected before integrating, we would solve contacts for positions that are about to change. So integrate, then detect, then solve.

**Why the solver is last.** It rewrites velocities. The next step's integrate then uses those corrected velocities to move the bodies. A solver that ran before detection would have nothing to fix.

**One consequence, stated honestly.** The course keeps this step order on purpose. It runs the solver _after_ integrate has already applied gravity. Take a body resting on the ground, with its velocity just zeroed by the solver. The next step does:

- velocity: `v = 0 + g * dt`, so `v = -g * dt` (gravity points down);
- position (semi-implicit Euler, velocity first): `y += v * dt`, so `y` changes by `-g * dt^2`.

With `g = 9.81` and `dt = 1/60`, `g * dt^2 = 9.81 / 3600 = 0.002725` m. So a resting body sinks about 2.7 mm each step before the solver sees it and pushes it back. This is not a bug in your code; it is the cost of this order. Pill 5.8 returns to it, and shows how Box2D Lite avoids it by solving between the velocity update and the position update.

**Where the World fits.** The `World` class owns the bodies and runs the five stages in order. It does not know how any stage works. Broadphase, narrowphase and solver are _injected_: the world holds them in public fields (`broadphase`, `narrowphase`, `solver`) and calls them. By default they do nothing: no pairs, no manifolds, an empty solver. That is deliberate. You write the World in Exercise 2, long before the stages exist, and it still runs: bodies fall under gravity and nothing collides. In Exercises 3 to 5 you give it a real broadphase, narrowphase and solver by assigning them to those fields.

The three stage contracts, in words:

- the broadphase takes the list of bodies and returns pairs `[a, b]` with `a.id < b.id`;
- the narrowphase takes two bodies and returns a manifold or `null`;
- the solver takes the list of manifolds and `dt`, and changes the bodies in place.

**What about gather?** Read the contract closely: `Broadphase.findPairs` takes the _bodies_, not the gathered bounding boxes. So nothing in `step` consumes the output of gather. In this course gather serves the renderer and debugging (a debug draw can show every body's box), and `step` still calls it at the position the contract fixes, between integrate and broadphase. A broadphase that wants bounding boxes computes them from the bodies itself. This is a wrinkle in the design; the course keeps it and says so.

## Common mistakes

- **Detecting before integrating.** You would collide bodies at last step's positions and solve against a world that has already moved.
- **Thinking the broadphase decides collisions.** It only discards pairs that cannot collide. A pair that passes can still miss in the narrowphase.
- **Treating "resting bodies sink a little" as a bug to fix in `step`.** The order is frozen. Positional correction in Module 5 handles it.

## Checkpoint

1. Why must the narrowphase come after the broadphase rather than the other way round? Answer in terms of cost.
2. A body rests on a plane with zero velocity at the start of a step. Following the integrate-then-solve order, what is its velocity after integrate, and how far has it moved? (Use `g = 9.81`, `dt = 1/60`.)

## Readings

- Essential: "Box2D: Overview", https://box2d.org/documentation/ . Look for the world and its step function; the exact section is not pinned down here. Box2D v3 is larger than ours, and its stages are not named as ours are.
- Deeper: the Box2D Lite dissection, `docs/plan/06-references/dissections/box2d-lite.md` (section 1, the pipeline map). Open it after finishing Exercise 2, not before: it shows a different step order and explains why.
