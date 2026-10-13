---
id: "1.6"
title: "Shapes and transforms"
module: "m1"
minutes: 7
prerequisites: ["1.1", "1.3"]
visual: "none"
readings_essential: ["box2d-documentation"]
readings_deeper: ["gaul-tutsplus-part-1"]
---

## The question

What shapes does the engine have, how are they described, and how does a point on a shape in its own frame become a point in the world?

## The idea

Collision detection needs geometry; dynamics needs mass. The body holds both, but they are separate: `shape` says what the body looks like, `invMass` and `invInertia` say how it moves. Inertia depends on the shape (pill 1.3), so `createBody` reads the shape to compute it.

The engine has three shapes. Each is a record with a `kind` field naming the variant, followed by that variant's numbers. (The exercise page explains the TypeScript syntax; here we only need the data.)

| `kind`     | Numbers                   | Notes                                                                                           |
| ---------- | ------------------------- | ----------------------------------------------------------------------------------------------- |
| `"circle"` | `radius`                  | The centre is the body's `position`. Rotation does not change it.                               |
| `"box"`    | `halfWidth`, `halfHeight` | A rectangle centred on `position`, rotated by the body's `angle`. Half-extents, not full sizes. |
| `"plane"`  | `normal`, `offset`        | An infinite half-space. Always static.                                                          |

**The plane** is the odd one, so take it slowly. It has a unit `normal` `n` and a number `d` (named `offset` in the code). A point `p` is _inside the solid_ when

```
dot(n, p) <= d
```

and the boundary surface is where `dot(n, p) = d`. The normal points out of the solid, into free space. A plane ignores its body's `position` and `angle` (the contract says so), and `createBody` rejects a plane with non-zero mass.

Examples, each a solid half-space:

| Plane                 | `normal`  | `offset` | Solid region                |
| --------------------- | --------- | -------- | --------------------------- |
| Floor at `y = 0`      | `(0, 1)`  | `0`      | `y <= 0`                    |
| Ceiling at `y = 10`   | `(0, -1)` | `-10`    | `-y <= -10`, i.e. `y >= 10` |
| Left wall at `x = -5` | `(1, 0)`  | `-5`     | `x <= -5`                   |
| Right wall at `x = 5` | `(-1, 0)` | `-5`     | `-x <= -5`, i.e. `x >= 5`   |

Check the sign of `offset` on a wall with a point you know is inside.

## Visual

None.

## The maths

**Why the normal must be unit length.** The projection of `p` onto the direction `n` is `dot(n, p)` only when `|n| = 1`. The surface is the set of points whose projection is `d`, so `d` is the signed distance of the surface from the origin along `n` (negative when the surface lies on the far side, as for a ceiling). The **signed distance** of a point from the surface is then

```
s(p) = dot(n, p) - d
```

positive outside (free space), zero on the surface, negative inside the solid. If `n` were not unit, `s` would be scaled by `|n|` and every depth computed from it would be wrong by that factor. Floor example: `n = (0,1)`, `d = 0`, `p = (3, 2)`: `s = 2`, 2 m above the floor. `p = (3, -0.5)`: `s = -0.5`, half a metre inside. Narrowphase (Module 4) builds circle-plane and box-plane contacts from exactly this quantity.

**Local and world coordinates.** A box is easiest to describe in its **local frame**: origin at the body's centre, axes along the box's own sides. Its four corners are `(±halfWidth, ±halfHeight)`, always, whatever the body's `angle` or `position`. To compare with other bodies we need **world** coordinates: rotate by `angle`, then translate by `position`.

The rotation by an angle `θ` counter-clockwise is the 2D rotation matrix. Derive it from where the axes go. The vector `(1, 0)` rotated by `θ` becomes `(cos θ, sin θ)` (basic trigonometry). The vector `(0, 1)` is `(1, 0)` turned 90° counter-clockwise, so it becomes `(cos θ, sin θ)` turned 90° counter-clockwise, which is `perp` from Exercise 0: `(-sin θ, cos θ)`. Rotation is linear, so the images of these two columns determine everything:

```
R(θ) = [ cos θ  -sin θ ]
       [ sin θ   cos θ ]

world.x = position.x + cos θ · local.x - sin θ · local.y
world.y = position.y + sin θ · local.x + cos θ · local.y
```

**Worked example.** A box with `halfWidth = 1`, `halfHeight = 0.5` at `position = (2, 3)` with `angle = π/2`. Its local corner `(1, 0.5)`: `cos(π/2) = 0`, `sin(π/2) = 1`, so

```
world.x = 2 + 0 · 1 - 1 · 0.5 = 1.5
world.y = 3 + 1 · 1 + 0 · 0.5 = 4
```

Check by hand: turning `(1, 0.5)` a quarter turn counter-clockwise gives `perp = (-0.5, 1)`, and adding `(2, 3)` gives `(1.5, 4)`. Same.

**The inverse.** To go from world to local, subtract `position`, then rotate by `-θ`. The matrix for `-θ` is the transpose of `R(θ)` (since `cos(-θ) = cos θ` and `sin(-θ) = -sin θ`):

```
local.x =  cos θ · d.x + sin θ · d.y
local.y = -sin θ · d.x + cos θ · d.y      where d = world - position
```

Test with the example: `d = (1.5 - 2, 4 - 3) = (-0.5, 1)`, `cos = 0`, `sin = 1`: `local.x = 0 · (-0.5) + 1 · 1 = 1` and `local.y = -1 · (-0.5) + 0 · 1 = 0.5`. So `local = (1, 0.5)`: it round-trips.

No exercise in this module asks you to write these transforms: Exercise 2 (the AABB of a rotated box) builds on the same rotated-corner idea, and Module 4 uses both directions heavily.

## Common mistakes

- **Rotating about the origin and forgetting to translate.** Rotate the local offset, then add `position`.
- **Using full width where the code stores half.** A box with `halfWidth = 1` is 2 wide.
- **Normal not unit.** A plane built with `normal = (1, 1)` is wrong; use `(√2/2, √2/2)`. Check: `(0.7071)² · 2 = 1`.

## Checkpoint

1. Write the plane (`normal`, `offset`) for the solid region `y <= -2`. Is the point `(0, -3)` inside?
2. A box with half-extents `(2, 1)` at the origin has `angle = π/2`. Where in the world is its local corner `(2, 1)`?

## Readings

- Essential: "Box2D: Overview", https://box2d.org/documentation/ . How bodies and shapes relate in a real engine. Box2D v3's shape list is larger than ours.
- Deeper: Randy Gaul, "How to Create a Custom 2D Physics Engine: The Basics and Impulse Resolution" (Envato Tuts+, 2013), https://code.tutsplus.com/how-to-create-a-custom-2d-physics-engine-the-basics-and-impulse-resolution--gamedev-6331t . Circle and box collision shapes in a small engine (unverified: from memory, confirm when you open it).
