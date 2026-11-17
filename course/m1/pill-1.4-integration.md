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

This course uses semi-implicit Euler, for now, for three reasons: it costs exactly the same as explicit Euler, it does not pump energy into the system the way explicit Euler does (the spring below shows it), and it is what small engines such as Box2D Lite use, so what you build matches what you will read. It is not the only choice. Velocity Verlet, Runge-Kutta (RK4) and implicit methods trade more work per step for accuracy or stability, and the advanced track compares them side by side once your engine runs. The same rule applies to rotation:

```
angularVelocity += angularAcceleration * dt   (no torque in Exercise 1)
angle           += angularVelocity * dt
```

In Exercise 1 nothing applies torque or force other than gravity, so for each dynamic body you update the linear velocity from gravity, then the position and the angle from the velocities. Static bodies are skipped. There is no damping.

## Visual

<!-- visual: v1-euler-energy -->

Both schemes run on the same spring with the same `dt`, and the plot shows total energy over time. Explicit Euler's energy climbs; semi-implicit Euler's stays level, with a small wobble.

## The maths

**Free fall, step by step.** Start at rest at $y = 0$, with $v_0 = 0$, gravity $-g$, step $dt$. Semi-implicit: step $k$ first sets $v_k = v_{k-1} - g\,dt$, then $y_k = y_{k-1} + v_k\,dt$. So after $n$ steps:

$$
\begin{aligned}
v_n &= -g\, n\, dt \\
y_n &= \sum_{k=1}^{n} v_k\,dt = -g\,dt^2 \sum_{k=1}^{n} k = -g\,dt^2 \cdot \frac{n(n+1)}{2}
\end{aligned}
$$

(using $1 + 2 + \dots + n = n(n+1)/2$). For $dt = 1/60$, $g = 9.81$, $n = 60$ (one second):

$$
y_n = -9.81 \cdot \frac{60 \cdot 61 / 2}{3600} = -9.81 \cdot \frac{1830}{3600} = -4.98675
$$

The exact answer is $-\tfrac12 g t^2 = -\tfrac12 \cdot 9.81 \cdot 1 = -4.905$. The discrete result is 0.08175 too far. In general, with $t = n\,dt$:

$$
y_n = -g\,dt^2\,\frac{n^2 + n}{2} = -\tfrac12 g\,(t^2 + t\,dt)
$$

so the error is $\tfrac12 g\,t\,dt$, which is $\tfrac12 \cdot 9.81 \cdot (1/60) = 0.08175$ at $t = 1$. It shrinks in proportion to $dt$: first-order accuracy.

**Explicit Euler** does (B) first, so step $k$ moves by the velocity from step $k-1$, and the sum runs one term shorter:

$$
y_n = -g\,dt^2 \sum_{k=0}^{n-1} k = -g\,dt^2 \cdot \frac{n(n-1)}{2} = -9.81 \cdot \frac{1770}{3600} = -4.82325
$$

It is off by the same amount, $0.08175$, in the other direction. For plain free fall the two schemes are equally accurate; they differ for oscillating systems.

**Energy on a spring.** Take unit mass and a spring with angular frequency $\omega$. Acceleration is $-\omega^2 x$, and energy is $E = \tfrac12 (v^2 + \omega^2 x^2)$, constant in reality. Explicit Euler is $x' = x + v\,dt$, $v' = v - \omega^2 x\,dt$. Expand $v'^2 + \omega^2 x'^2$:

$$
\begin{aligned}
&(v - \omega^2 x\,dt)^2 + \omega^2 (x + v\,dt)^2 \\
&= v^2 - 2\omega^2 x v\,dt + \omega^4 x^2 dt^2 + \omega^2 x^2 + 2\omega^2 x v\,dt + \omega^2 v^2 dt^2 \\
&= (1 + \omega^2 dt^2)(v^2 + \omega^2 x^2)
\end{aligned}
$$

The cross terms cancel, and the energy is multiplied by $1 + \omega^2 dt^2$ **every step**, exactly. Take a spring with a period of one second ($\omega = 2\pi$) and $dt = 1/60$: $\omega\,dt = 0.10472$, $(\omega\,dt)^2 = 0.010966$, so one period (60 steps) multiplies the energy by $1.010966^{60} = 1.924$ (also checked by running the two-line update). After ten seconds it is multiplied by about 695. The spring explodes.

Semi-implicit Euler is $v' = v - \omega^2 x\,dt$, then $x' = x + v'\,dt$. It is not energy-conserving either, but it conserves a nearby quantity exactly:

$$
Q = v^2 + \omega^2 x^2 - \omega^2\,dt\; x v
$$

Proof: after the step, $x' - dt\,v' = x$, so $\omega^2 x'^2 - \omega^2 dt\,x' v' = \omega^2 x' x$, and $Q' = v'^2 + \omega^2 x x'$. Substitute $x' = x + dt\,v'$: $Q' = v'(v' + \omega^2 dt\,x) + \omega^2 x^2$. Since $v' + \omega^2 dt\,x = v$, this is $v'v + \omega^2 x^2 = (v - \omega^2 dt\,x)v + \omega^2 x^2 = Q$. (Also checked numerically over 6000 steps.) $Q$ differs from $v^2 + \omega^2 x^2$ by at most a fraction $\omega\,dt/2$ (because $\omega|x||v| \le (v^2 + \omega^2 x^2)/2$), about 5% here, so the true energy stays within about 5% of a constant ($Q/2$) and never grows. That is the benefit of the swap, and why most engines use it. Fiedler's "Integration Basics" shows the same contrast on a damped spring.

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
