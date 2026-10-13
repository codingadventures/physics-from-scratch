---
id: "0.4"
title: "Vector maths utilities and the debug draw API"
module: "m0"
minutes: 7
prerequisites: ["0.2", "0.3"]
visual: "none"
readings_essential: []
readings_deeper: []
---

## The question

What are the vector operations this engine is built on, how are they written, and how do you draw what the engine is doing?

## The idea

**Vectors are plain objects and the operations are free functions.** A `Vec2` is `{ x: number; y: number }`, nothing more: no class, no operator overloading, no mutation. You write `add(a, b)`, not `a + b`, and every function returns a new vector. The contract accepts the cost of allocating so that the code reads like the maths and cannot corrupt a caller's data (pill 0.2: objects are shared references).

These are the functions of Exercise 0, in `starter/src/math/vec2.ts`. All take and return `Vec2` unless stated:

| Function                         | Result                                                           |
| -------------------------------- | ---------------------------------------------------------------- |
| `add(a, b)`, `sub(a, b)`         | componentwise sum, difference                                    |
| `scale(a, s)`, `negate(a)`       | each component times `s`; each component's sign flipped          |
| `dot(a, b)`                      | a number                                                         |
| `cross(a, b)`                    | a number (the 2D cross product)                                  |
| `crossSV(s, v)`, `crossVS(v, s)` | a vector (scalar with vector, either order)                      |
| `perp(a)`                        | `a` rotated 90 degrees counter-clockwise                         |
| `length(a)`, `lengthSq(a)`       | the length; the length squared                                   |
| `normalize(a)`                   | the unit vector along `a`; the zero vector gives the zero vector |

**Drawing what the engine is doing.** Physics bugs are geometric, so you will draw constantly. The given module, `starter/src/render/debugDraw.ts`, works in world space (metres, y up) and flips to canvas pixels for you. It imports only types from your code, so it works while your stubs throw. A `View` (from `src/render/view.ts`) pairs a canvas with a camera: a `center` in world coordinates and `pixelsPerMetre` for zoom (default 50).

| Function                                            | Draws                                                                                                       |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `clear(view)`                                       | the background, a 1 m grid (10 m when zoomed far out) and the axes                                          |
| `drawBody(view, body, color?)`                      | a circle with a radius line, so you see it spin; a rotated box; a plane as a line hatched on its solid side |
| `drawAABB(view, aabb, color?)`                      | a dashed rectangle (skipped if infinite, as for planes)                                                     |
| `drawManifold(view, m)`                             | each contact point and an arrow along the normal from A to B                                                |
| `drawPrim(view, prim)` and `drawPrims(view, prims)` | trace primitives: `point`, `segment`, `arrow`, `circle`, `polygon`, `text`                                  |
| `drawMessage(view, text)`                           | text in the top-left corner                                                                                 |

Each also takes an optional palette as its last argument; the default follows your system's light or dark setting. A primitive's `color` is a palette name (`"a"`, `"b"`, `"normal"`, `"contact"`, `"muted"`, `"highlight"`) or any CSS colour. A minimal frame, given a canvas element `canvas`:

```ts
const view = createView(canvas, { center: { x: 0, y: 1 }, pixelsPerMetre: 50 });
clear(view);
drawPrims(view, [
  {
    kind: "arrow",
    from: { x: 0, y: 0 },
    to: { x: 2, y: 1 },
    label: "v",
    color: "a",
  },
  { kind: "point", p: { x: 2, y: 1 }, label: "tip" },
]);
```

The same primitives are what the step-through player draws, which pill 0.5 covers.

## Visual

None.

## The maths

All of it is derived from the component form. Take a = (a.x, a.y) and b = (b.x, b.y), and write them in polar form: a = |a|(cos p, sin p) and b = |b|(cos q, sin q), where p and q are their angles from the x axis.

**Dot product.** Multiply componentwise and add: a.x*b.x + a.y*b.y = |a||b|(cos p cos q + sin p sin q) = |a||b| cos(q - p), by the cosine difference identity. So the dot product is the lengths times the cosine of the angle between the vectors. It is zero for perpendicular vectors.

**Cross product.** The 2D cross product is a.x*b.y - a.y*b.x = |a||b|(cos p sin q - sin p cos q) = |a||b| sin(q - p), by the sine difference identity. It is the signed area of the parallelogram on a and b, positive when b is counter-clockwise from a. Consequences: cross(b, a) = -cross(a, b), and cross(a, a) = 0.

**Worked example.** a = (1, 2), b = (3, 4):

- a + b = (4, 6).
- dot = 1*3 + 2*4 = 3 + 8 = 11.
- cross = 1*4 - 2*3 = 4 - 6 = -2. Negative, because b is slightly clockwise from a.

**Perpendicular.** Rotating (x, y) by the angle t counter-clockwise gives (x cos t - y sin t, x sin t + y cos t). At t = 90 degrees, cos t = 0 and sin t = 1, so perp(a) = (-a.y, a.x). Then dot(a, perp(a)) = -a.x*a.y + a.y*a.x = 0, as it must for a quarter turn. It also connects the two products: dot(perp(a), b) = -a.y*b.x + a.x*b.y = cross(a, b).

**Cross with a scalar.** In 2D, angular velocity is a single number w, a vector along the z axis. The 3D cross product of (0, 0, s) with (v.x, v.y, 0) has components (0*0 - s*v.y, s*v.x - 0*0, 0), so crossSV(s, v) = (-s*v.y, s*v.x) = s * perp(v). The other order, (v.x, v.y, 0) x (0, 0, s) = (v.y*s - 0, 0 - v.x*s, 0), gives crossVS(v, s) = (s*v.y, -s*v.x). So crossSV(s, v) = -crossVS(v, s). Why it matters: the velocity of a point at offset r on a body spinning at w is w x r. With w = 2 and r = (1, 0) that is (-2*0, 2*1) = (0, 2), straight up, as a counter-clockwise spin moves a point on the positive x axis. Its x component is -2*0 = -0, a real negative zero (pill 0.2).

**Length.** Pythagoras: |a| = sqrt(a.x^2 + a.y^2), and a.x^2 + a.y^2 = dot(a, a). So lengthSq(a) is the length without the square root. Comparing squared lengths avoids the square root. Example: |(3, 4)| = sqrt(9 + 16) = 5 and lengthSq = 25.

**Normalise.** Dividing by the length gives a unit vector: (3, 4) / 5 = (0.6, 0.8), and 0.36 + 0.64 = 1 as required. The zero vector has no direction, and dividing 0 by 0 in floating point gives NaN, which then spreads through every later calculation. The contract therefore fixes the answer: the zero vector returns the zero vector.

## Common mistakes

- **Mutating an input.** Every function returns a new vector. A body's position is mutated in place by the engine's own code, never by a vector function.
- **Confusing the three cross products.** `cross` returns a number; `crossSV` and `crossVS` return vectors, and swapping their order flips the sign.
- **Treating perp as a clockwise rotation.** It is counter-clockwise: perp((1, 0)) = (0, 1).
- **Normalising a possibly-zero vector without a guard.** The result is NaN.
- **Flipping y yourself.** Debug draw takes world coordinates, y up, and does the flip.

## Checkpoint

1. Without a calculator: what are dot and cross for a = (2, 0) and b = (0, 3), and what do the signs tell you about b relative to a?
2. Why is lengthSq often preferable to length when you only need to compare two distances?

## Readings

- Deeper: none for this pill.
