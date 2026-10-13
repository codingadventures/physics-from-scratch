---
id: "1.4"
title: "Integration"
module: "m1"
minutes: 7
prerequisites: ["1.1", "1.2"]
visual: "v1-euler-energy"
readings_essential: ["fiedler-integration-basics"]
readings_deeper: ["hecker-rigid-body-dynamics"]
---

## The question

Given the state of a body now, how do we compute its state one timestep later, and why does the order of the two updates matter?

## The idea

Pill 1.1 said that position changes at the rate of velocity. Velocity in turn changes at the rate of acceleration, which for falling bodies is gravity. A computer cannot follow a continuous curve. It takes small steps of fixed size `dt` and assumes the rate is constant during each step. This is **numerical integration**, and the simplest scheme is Euler's method.

For a body falling under gravity `g` (an acceleration, pill 1.2), one step has two updates:

```
velocity += gravity * dt      (A)
position += velocity * dt     (B)
```

The question is the order. Run (B) then (A) and position moves using the velocity from the _start_ of the step. This is **explicit Euler**. Run (A) then (B) and position moves using the velocity _at the end_ of the step, which already includes this step's gravity. This is **semi-implicit Euler** (also called symplectic Euler). Same cost, same two lines, swapped.

The engine uses semi-implicit Euler (decision D-018). The same rule applies to rotation:

```
angularVelocity += angularAcceleration * dt   (no torque in Exercise 1)
angle           += angularVelocity * dt
```

In Exercise 1 nothing applies torque or force other than gravity, so for each dynamic body you update the linear velocity from gravity, then the position and the angle from the velocities. Static bodies are skipped. There is no damping.

## Visual

<!-- visual: v1-euler-energy -->

Both schemes run on the same spring with the same `dt`, and the plot shows total energy over time. Explicit Euler's energy climbs; semi-implicit Euler's stays level, with a small wobble.

## The maths

**Free fall, step by step.** Start at rest at `y = 0`, with `v₀ = 0`, gravity `-g`, step `dt`. Semi-implicit: step `k` first sets `vₖ = vₖ₋₁ - g dt`, then `yₖ = yₖ₋₁ + vₖ dt`. So after `n` steps:

```
vₙ = -g · n · dt
yₙ = Σₖ₌₁ⁿ vₖ dt = -g dt² Σₖ₌₁ⁿ k = -g dt² · n(n+1)/2
```

(using `1 + 2 + ... + n = n(n+1)/2`). For `dt = 1/60`, `g = 9.81`, `n = 60` (one second):

```
yₙ = -9.81 · (60 · 61 / 2) / 3600 = -9.81 · 1830 / 3600 = -4.98675
```

The exact answer is `-½ g t² = -½ · 9.81 · 1 = -4.905`. The discrete result is 0.08175 too far. In general, with `t = n dt`:

```
yₙ = -g dt² (n² + n)/2 = -½ g (t² + t dt)
```

so the error is `½ g t dt`, which is `½ · 9.81 · (1/60) = 0.08175` at `t = 1`. It shrinks in proportion to `dt`: first-order accuracy.

**Explicit Euler** does (B) first, so step `k` moves by the velocity from step `k-1`, and the sum runs one term shorter:

```
yₙ = -g dt² Σₖ₌₀ⁿ⁻¹ k = -g dt² · n(n-1)/2 = -9.81 · 1770 / 3600 = -4.82325
```

It is off by the same amount, `0.08175`, in the other direction. For plain free fall the two schemes are equally accurate; they differ for oscillating systems.

**Energy on a spring.** Take unit mass and a spring with angular frequency `ω`. Acceleration is `-ω² x`, and energy is `E = ½ (v² + ω² x²)`, constant in reality. Explicit Euler is `x' = x + v dt`, `v' = v - ω² x dt`. Expand `v'² + ω² x'²`:

```
(v - ω² x dt)² + ω² (x + v dt)²
= v² - 2ω² x v dt + ω⁴ x² dt² + ω² x² + 2ω² x v dt + ω² v² dt²
= (1 + ω² dt²)(v² + ω² x²)
```

The cross terms cancel, and the energy is multiplied by `1 + ω² dt²` **every step**, exactly. Take a spring with a period of one second (`ω = 2π`) and `dt = 1/60`: `ω dt = 0.10472`, `(ω dt)² = 0.010966`, so one period (60 steps) multiplies the energy by `1.010966⁶⁰ = 1.924` (also checked by running the two-line update). After ten seconds it is multiplied by about 695. The spring explodes.

Semi-implicit Euler is `v' = v - ω² x dt`, then `x' = x + v' dt`. It is not energy-conserving either, but it conserves a nearby quantity exactly: `Q = v² + ω² x² - ω² dt · x v`. Proof: after the step, `x' - dt v' = x`, so `ω² x'² - ω² dt x' v' = ω² x' x`, and `Q' = v'² + ω² x x'`. Substitute `x' = x + dt v'`: `Q' = v'(v' + ω² dt x) + ω² x²`. Since `v' + ω² dt x = v`, this is `v'v + ω² x² = (v - ω² dt x)v + ω² x² = Q`. (Also checked numerically over 6000 steps.) `Q` differs from `v² + ω² x²` by at most a fraction `ω dt / 2` (because `ω|x||v| ≤ (v² + ω² x²)/2`), about 5% here, so the true energy stays within about 5% of a constant (Q/2) and never grows. That is the benefit of the swap, and why most engines use it. Fiedler's "Integration Basics" shows the same contrast on a damped spring.

Neither scheme is exact. Semi-implicit Euler still drifts in _phase_ (the oscillation gets a slightly wrong period), and we accept that.

## Common mistakes

- **Updating position before velocity.** That is explicit Euler, the unstable one. The Exercise 1 tests catch it: the known free-fall answer only matches the other order.
- **Using the velocity from before the update for the position, "to be safe".** Same mistake.
- **Moving static bodies.** Skip any body with `invMass = 0`.
- **Applying gravity to the position.** Gravity is an acceleration: it changes velocity. Position changes only through velocity.

## Checkpoint

1. A ball starts at rest and `dt = 1/10`, `g = 10`. Using semi-implicit Euler, what are its velocity and position after 3 steps? (Use the formulas above.)
2. Why does a spring simulated with explicit Euler gain energy with every step, while semi-implicit Euler's energy stays bounded?

## Readings

- Essential: Glenn Fiedler, "Integration Basics", Gaffer On Games, 1 Jun 2004, https://gafferongames.com/post/integration_basics/ . Explicit and semi-implicit Euler on a spring, and RK4, which we do not use.
- Deeper: Chris Hecker, "Rigid Body Dynamics", https://www.chrishecker.com/Rigid_Body_Dynamics . Integration for rigid bodies (index verified; PDFs not opened).
