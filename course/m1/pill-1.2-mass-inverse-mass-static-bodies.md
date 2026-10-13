---
id: "1.2"
title: "Mass, inverse mass, static bodies"
module: "m1"
minutes: 6
prerequisites: ["1.1"]
visual: "none"
readings_essential: ["gaul-tutsplus-part-1"]
readings_deeper: ["box2d-lite-dissection"]
---

## The question

Why does every body store `invMass` (one over the mass) instead of the mass itself, and what does `invMass = 0` mean?

## The idea

Newton's second law says that a force `F` on a body of mass `m` gives it an acceleration `a = F / m`. Written with the inverse mass, that is `a = F * invMass`. Impulses behave the same way: an impulse `J` (a sudden change of momentum, Module 5) changes velocity by `Δv = J / m = J * invMass`. Almost every place the engine touches mass, it touches it as a _division by m_, so we store the result of the division once.

That is convenient, but the real reason is **static bodies**. A floor, a wall or a platform should not move however hard something hits it. Physically, that is a body of infinite mass. Infinity is awkward in code, but its inverse is clean:

```
infinite mass  <=>  invMass = 0
```

A body with `invMass = 0` has `Δv = J * 0 = 0` for any impulse, however large. No special case, no `if (isStatic)` scattered through the solver: the formulas just work, and the immovable body stays put. The tempting alternative, storing `mass = 0` for static and dividing by it, goes wrong quietly: `1 / 0` in JavaScript and TypeScript raises no error. It evaluates to `Infinity`, so a body meant to be immovable would instead get an infinite inverse mass, the weakest possible body, with no warning.

The course convention (frozen in the contract) is: in a `BodyDef`, **`mass: 0` means static**. `createBody` (Exercise 1) turns that into `invMass = 0` and `invInertia = 0`. Static bodies neither translate nor rotate.

Two things to keep apart:

- **Gravity is an acceleration**, in metres per second squared. It does not get multiplied by mass or inverse mass. A 1 kg ball and a 100 kg ball fall identically. `integrate` adds `gravity * dt` to the velocity of every dynamic body. (Gravity _force_ would be `m * g`, and dividing by `m` to get the acceleration cancels it. We skip both steps.)
- **A body is static if `invMass` is 0.** `integrate` uses exactly that test to skip a body. It does not look at velocity: a "static" body given a velocity by mistake still does not move.

## Visual

None.

## The maths

Check the claim that storing the inverse costs nothing. For a normal body of mass 4 kg, `invMass = 1/4 = 0.25`. A force of 8 N gives `a = 8 / 4 = 2 m/s²` or `8 * 0.25 = 2 m/s²`. Same answer.

Now the static case, to see the formulas stay well behaved. Two bodies, A with mass 4 (`invMass = 0.25`) and B static (`invMass = 0`), are pressed together by equal and opposite impulses of size `J = 8` along a line. Momentum change is shared by:

```
ΔvA = J * invMassA = 8 * 0.25 = 2
ΔvB = J * invMassB = 8 * 0     = 0
```

Body A takes the whole velocity change and B takes none. Later, the collision response formula (pill 5.2) has the sum `invMassA + invMassB` in a denominator. For a dynamic body against a static one that sum is `0.25 + 0 = 0.25`, still positive, so nothing divides by zero. If _both_ bodies were static the sum would be 0 and a naive solver would divide by it. The engine therefore never solves static-static pairs (`collide` returns null for them, per the contract).

The angular twin follows the same pattern. A torque `τ` gives an angular acceleration `α = τ / I`, where `I` is the moment of inertia (next pill), so we store `invInertia = 1 / I`. A static body gets `invInertia = 0` for the same reason: no torque can spin it.

Putting the rule for `createBody` in one place:

| `mass` in the def | `invMass` | `invInertia`                  |
| ----------------- | --------- | ----------------------------- |
| `m > 0`           | `1/m`     | `1/I`, with `I` from pill 1.3 |
| `0`               | `0`       | `0`                           |

A plane (pill 1.6) is always static, so a plane with `mass > 0` is a mistake in the definition, and `createBody` rejects it rather than guess.

## Common mistakes

- **Storing mass and dividing later.** A static body then needs `Infinity` or a special case everywhere. Keep `invMass`.
- **Multiplying gravity by `invMass`.** Gravity is already an acceleration. Doing it would make heavy bodies fall slower, and would freeze static ones for the wrong reason.
- **Forgetting `invInertia` for a static body.** A static box with `invMass = 0` but a non-zero `invInertia` would still spin when hit. Both must be 0.
- **Using a tiny mass such as `1e-9` for "static".** It is not static: the body moves, and `1/m` is enormous and breaks the arithmetic. Use 0.

## Checkpoint

1. A body has mass 5 kg. What are its `invMass`, and the velocity change from an impulse of 10 N·s?
2. Why is `invMass = 0` a better encoding of "immovable" than a very large mass such as `1e9`?

## Readings

- Essential: Randy Gaul, "How to Create a Custom 2D Physics Engine: The Basics and Impulse Resolution" (Envato Tuts+, 6 Apr 2013), https://code.tutsplus.com/how-to-create-a-custom-2d-physics-engine-the-basics-and-impulse-resolution--gamedev-6331t . It stores inverse mass in its body data, as we do (unverified: from memory, confirm when you open it).
- Deeper (open this only after you finish Exercise 1): the Box2D Lite dissection, `docs/plan/06-references/dissections/box2d-lite.md`, section 2. Box2D Lite encodes a static body as a huge mass that becomes invMass 0; ours is the same idea with an explicit 0.
