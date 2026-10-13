---
id: "1.1"
title: "What a rigid body is"
module: "m1"
minutes: 6
prerequisites: []
visual: "none"
readings_essential: ["hecker-rigid-body-dynamics"]
readings_deeper: ["box2d-documentation"]
---

## The question

What is the smallest set of numbers that says where a rigid body is and how it is moving?

## The idea

A rigid body is an object that never deforms. Every point of it keeps its distance from every other point, whatever forces act on it. Real objects flex a little; the model ignores that, because it lets us describe the whole body with a handful of numbers instead of one position per atom.

In 2D a rigid body can do exactly two things: slide and spin. Describing where it is therefore takes three numbers:

- a **position**, `x` and `y`: where the body's centre of mass is;
- an **angle**, `θ`: how far the body is rotated about that centre.

Describing how it is moving takes three more, the rates of change of the first three:

- a **linear velocity**, `vx` and `vy`, in metres per second;
- an **angular velocity**, `ω`, in radians per second.

That is the whole motion state: six numbers. (In 3D it would be twelve: three for position, three for orientation, and three each for the two velocities. Flatland saves a lot of work.)

Everything else about the body is _constant_ while the simulation runs: its shape, its mass, how hard it is to spin (pill 1.3), how bouncy and how grippy it is. The split matters. Integration (pill 1.4) rewrites the six state numbers every step. The constants are set once, when the body is created.

Our conventions come from the frozen contract (`docs/plan/02-contract`), and every later pill relies on them:

| Topic    | Convention                                                              |
| -------- | ----------------------------------------------------------------------- |
| Units    | metres, seconds, kilograms, radians                                     |
| Axes     | `y` is up in the world. The renderer flips it for the canvas.           |
| Rotation | counter-clockwise is positive                                           |
| Position | the centre of mass, which for a circle or a box is its geometric centre |

The body record in the starter code (`starter/src/dynamics/body.ts`) holds all of this:

```ts
type Body = {
  id: number;
  shape: Shape; // pill 1.6
  position: Vec2; // centre of mass, metres
  angle: number; // radians, counter-clockwise positive
  linearVelocity: Vec2; // metres per second
  angularVelocity: number; // radians per second
  invMass: number; // pill 1.2
  invInertia: number; // pills 1.2 and 1.3
  restitution: number; // bounciness, used in Module 5
  friction: number; // grip, used in Module 5
};
```

Bodies are _mutable records_: `integrate` and, later, the solver change the fields in place. There is no `Body` class with methods. Vector functions such as `add` never mutate their arguments; only the code that owns a body writes to it.

## Visual

None.

## The maths

Why the centre of mass, and not, say, the bottom-left corner? Because it makes linear and angular motion independent. A force on a free body changes the motion of its centre of mass exactly as if the whole mass sat at that point, and a spin about the centre of mass does not move it. If position were a corner, a spinning body would have a position that wobbles around even with no force at all, and the two kinds of motion would be tangled together.

Two relationships connect the six state numbers, and they are the definition of velocity:

```
d(position)/dt = linearVelocity
d(angle)/dt    = angularVelocity
```

Pill 1.4 turns these into code by replacing `d/dt` with a small finite step `dt`. Note the symmetry: angle and angular velocity are the rotational twins of position and linear velocity. Much of 2D rigid body dynamics is that twin pattern, with a scalar standing in for a vector.

A sign check on the conventions. With `angle = π/2` and `angularVelocity = -1`, the body is turned a quarter of a turn counter-clockwise from its starting orientation, and it is currently turning clockwise (negative), at one radian per second, which is a bit under a sixth of a turn per second (1 rad is 360°/(2π) ≈ 57.3°).

## Common mistakes

- **Treating `angle` as degrees.** It is radians everywhere. `Math.sin` and `Math.cos` take radians too.
- **Putting `y` down.** The canvas has `y` down; the world has `y` up. Physics code never thinks about the canvas.
- **Mixing up position and angle.** Position is where the centre is; angle is a rotation about it. Rotating a body never changes its position.
- **Expecting angles to stay in [0, 2π).** Nothing wraps `angle` in this engine; after a few spins it is a large number, and that is fine.

## Checkpoint

1. How many numbers make up the motion state of a 2D rigid body, and which ones are rates of change of others?
2. A body has `angle = 0`, `angularVelocity = 2` and no linear velocity. Does its `position` change as time passes? What does change?

## Readings

- Essential: Chris Hecker, "Rigid Body Dynamics" (four Game Developer articles, 1996-97), https://www.chrishecker.com/Rigid_Body_Dynamics . The start of the series covers 2D linear and angular motion. We verified the index page only; the PDFs were not opened, and the author notes some equations in them are garbled.
- Deeper: "Box2D: Overview", https://box2d.org/documentation/ . How a mature engine separates bodies from shapes. Read it for vocabulary; Box2D v3's API is bigger than ours.
