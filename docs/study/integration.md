# Study: integration

Feeds pill 1.4. Time to read: about 10 minutes.

## Index

1. [The one idea](#1-the-one-idea)
2. [Explain it to anyone](#2-explain-it-to-anyone)
3. [Why the order matters](#3-why-the-order-matters)
4. [Numbers you can check](#4-numbers-you-can-check)
5. [Other integrators](#5-other-integrators)
6. [Where it lives in the engine](#6-where-it-lives-in-the-engine)
7. [Test yourself](#7-test-yourself)
8. [Read next](#8-read-next)

## 1. The one idea

Physics gives you rates: position changes at the rate of velocity, velocity changes at the rate of acceleration. A computer cannot follow a smooth curve. It jumps forward by $dt$ and pretends the rate stayed constant during the jump. That jump is **integration**. Every method is a different guess about what the rate did inside the jump.

## 2. Explain it to anyone

A flip book. Each page is one $dt$. You never see the motion between pages, only where the ball is on each one. To draw the next page you ask two questions: how fast is it going now, and where does that put it?

- Smaller $dt$: more pages, smoother motion, more drawing.
- Gravity does not move the ball. It changes how fast the ball is moving. The speed moves the ball.

## 3. Why the order matters

Two lines, run once per step:

```
velocity += gravity * dt
position += velocity * dt
```

Swap them and you change which velocity moves the ball: the old one (explicit Euler) or the new one (semi-implicit Euler). Same cost. The difference only shows on things that swing back and forth, like a spring: explicit Euler adds energy every step, semi-implicit keeps it within a few percent of constant. This course uses semi-implicit (D-018).

In C++ terms: it is the difference between reading `v` before or after the line that writes it. Nothing else changes.

## 4. Numbers you can check

All reproducible in a few lines of code. Derivations are in pill 1.4.

| Setup | Result | Check |
|---|---|---|
| Free fall, $g = 9.81$, $dt = 1/60$, 60 steps, semi-implicit | $y = -4.98675$ | $-g\,dt^2 \cdot n(n+1)/2$ with $n = 60$ |
| Same, explicit | $y = -4.82325$ | $-g\,dt^2 \cdot n(n-1)/2$ |
| Exact | $y = -4.905$ | $-\tfrac12 g t^2$ |
| $g = 10$, $dt = 0.1$, 3 steps, semi-implicit | $v = -3$, $y = -0.6$ | $v = -g\,n\,dt$, $y = -g\,dt^2 \cdot n(n+1)/2$ |
| Spring, period 1 s, $dt = 1/60$, explicit | energy ×1.924 per period | $(1 + \omega^2 dt^2)^{60}$, $\omega = 2\pi$ |
| Same spring, semi-implicit | energy stays within about ±5% of 1 | measured 0.950 to 1.055 over 10 s |

I ran every row. Note the free-fall rows: both schemes miss the exact answer by the same amount (0.08175), in opposite directions. The order only wins on oscillating systems.

## 5. Other integrators

Background from general knowledge, not checked against `06-references`: treat as unverified.

| Method | Idea | Cost per step | Order |
|---|---|---|---|
| Explicit Euler | use the old velocity | 1 force evaluation | 1 |
| Semi-implicit Euler | use the new velocity | 1 | 1 |
| Velocity Verlet | average old and new acceleration | 1 (reuses the last) | 2 |
| RK4 | four samples per step, weighted | 4 | 4 |
| Implicit Euler | solve for the end state | a solve per step | 1 |

Check: velocity Verlet on the free fall above gives $-4.905$ exactly (constant acceleration is its easy case). Advanced track A8 compares them properly.

## 6. Where it lives in the engine

- `starter/src/dynamics/integrate.ts`: the exercise. Static bodies (`invMass = 0`) are skipped. Angle works the same way: `angle += angularVelocity * dt`.
- The step order is frozen (D-033): integrate, collide, solve. A resting body therefore sinks $g\,dt^2$ per step before the solver pushes it back. That is pill 5.8's story.
- `dt` must be fixed. Pill 1.5 says why.

## 7. Test yourself

1. A ball is at rest, $dt = 0.5$, $g = 10$. What are `v` and `y` after 2 steps, semi-implicit? ($v = -10$, $y = -7.5$: step 1 gives $v = -5$, $y = -2.5$; step 2 gives $v = -10$, $y = -7.5$.)
2. Why does gravity not appear in the position line?
3. Say in one sentence why a spring explodes under explicit Euler.
4. Which order does your `integrate` use, and which test fails if you swap?

## 8. Read next

- Glenn Fiedler, "Integration Basics" (verified, `fiedler-integration-basics`): https://gafferongames.com/post/integration_basics/
- Chris Hecker, "Rigid Body Dynamics" (index verified, PDFs not opened): https://www.chrishecker.com/Rigid_Body_Dynamics
- Pill 1.4: `course/m1/pill-1.4-integration.md`, with the full derivations.
