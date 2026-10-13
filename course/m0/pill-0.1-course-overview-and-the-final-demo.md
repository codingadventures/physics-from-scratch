---
id: "0.1"
title: "Course overview and the final demo"
module: "m0"
minutes: 6
prerequisites: []
visual: "none"
readings_essential: ["gaul-tutsplus-part-1"]
readings_deeper: ["catto-sequential-impulses-gdc2006"]
  ["Erin Catto, Fast and Simple Physics using Sequential Impulses (GDC 2006)"]
---

## The question

What will you have built by the end of this course, and how does the course get you there?

## The idea

You will build a small 2D rigid body physics engine in TypeScript. Not read about one: build one, test-first. The repository gives you stubs (functions that throw `TODO`) and tests that fail until your code is right. It does not contain a finished engine. If you are stuck, the hint ladder on each exercise page goes from a nudge to pseudocode, never to a full solution.

**What a rigid body is, for now.** A shape that never deforms, with a position, an angle and velocities. Module 1 makes that precise.

**What the engine does each frame.** The `World` advances in fixed steps, and one step runs five stages in this order (this is the frozen contract, `World.step` in the engine API):

1. **Integrate.** Move every body forward by `dt` using its velocity and gravity.
2. **Gather.** Collect every body with its current transform and its world-space bounding box.
3. **Broadphase.** Cheaply list the pairs of bodies that might be touching.
4. **Narrowphase.** For each candidate pair, decide whether the shapes really overlap and, if so, compute a contact: a normal, a penetration depth and one or two contact points.
5. **Solver.** Apply impulses so that bodies stop moving into each other, bounce and slide with friction, then nudge them apart.

Each module teaches one of these stages, and the exercises are the functions that make it work.

**The route.**

| Module | You build                                                                                |
| ------ | ---------------------------------------------------------------------------------------- |
| M0     | Setup and the vector utilities (Exercise 0)                                              |
| M1     | A body, its inertia and integration (Exercise 1)                                         |
| M2     | The world and the gather stage (Exercise 2)                                              |
| M3     | Two broadphases, brute force and sort and sweep (Exercise 3)                             |
| M4     | Collision detection for the shape pairs, up to box against box (Exercises 4a, 4b)        |
| M5     | The collision response: impulses, restitution, friction, correction (Exercises 5a to 5c) |
| M6     | The capstone: you put everything together and test it in scenes                          |

That is 7 modules, 38 pills and 9 exercises. A pill is a 5-7 minute page with one idea and a checkpoint. An exercise follows every three or four pills.

**The final demo.** Module 6 runs your engine in scenes: a ball pit, a ramp, a box dropped onto the floor. The capstone uses six acceptance scenarios as tests. Two examples, both derived so you can check them:

- A circle of radius 0.5 dropped onto the floor plane at y = 0 should end up resting with its centre at y = 0.5. The centre sits one radius above the surface it touches: 0 + 0.5.
- A box sliding on the floor with friction coefficient 0.5 (both surfaces at 0.5, mixed as sqrt(0.5 * 0.5) = 0.5) and initial speed 5 m/s should stop after about 1.02 s. Friction decelerates at mu * g, because the friction force mu * m * g divided by the mass m gives mu * g, so the stopping time is v / (mu * g) = 5 / (0.5 * 9.81) = 5 / 4.905 = 1.019 s. Module 5 explains where the friction force comes from.

**The honest limits.** The engine you build does not stack boxes stably, a resting body jitters slightly, and a fast small body can tunnel through a thin one because there is no continuous collision detection. The course says so openly. Pill 5.8 explains why, and the advanced track (after the standard one) is where these get attacked.

**How the pieces fit together.**

- **Pills** explain the idea and the maths. Every formula is derived on the page, so you can check it rather than trust it.
- **Visuals** are interactive. They run the real algorithm, record each step, and let you step and scrub through it. Pill 0.5 teaches the controls.
- **Exercises** give you stubs in `starter/src/`. You make the tests in `starter/tests/` pass.
- **TypeScript** is taught as you go. Pill 0.2 gives you just enough to read a test and write a function. Each exercise page then has a short "TypeScript you need here" box for whatever is new, compared with C++.

**Time.** The estimates assume some game-development and physics background. If you are new to TypeScript and to physics, plan on one and a half to two times longer.

**What you should already know.** Vectors, dot and cross products, matrices, basic trigonometry, 2D rotation, and the idea that velocity is the derivative of position. The course states these and does not teach them. You also need to read C++, because that is the language the TypeScript explanations compare against.

## Visual

None.

## The maths

None in this pill. The two scenario numbers above carry their derivations inline.

## Common mistakes

- **Expecting a finished engine to read.** The repository holds stubs and tests only. The point is that you write the engine.
- **Opening `starter/src/visuals/algos/` early.** Those files are small standalone implementations used by the site visuals. They solve little pieces of the maths the visuals show. Read the pill first, then decide whether you want the spoiler.
- **Treating the limits as bugs to fix in the standard track.** Jitter and unstable stacking are a lesson, not a failure of your code.
- **Skipping the tests.** The tests are the specification. Where a pill and a test seem to disagree, trust the test and reread the pill.

## Checkpoint

1. Name the five stages of one `World.step`, in order, and say which one produces a contact normal and a penetration depth.
2. Why does the course ship no reference solution, and where do you look when you are stuck?

## Readings

- Essential: Randy Gaul, "How to Create a Custom 2D Physics Engine: The Basics and Impulse Resolution", Envato Tuts+, 2013 (part 1 of the series). Skim it for the vocabulary only; the code is C++ and not needed yet.
- Deeper: Erin Catto, "Fast and Simple Physics using Sequential Impulses", GDC 2006. The talk behind the solver of Module 5. Open it after Module 4, not now.
