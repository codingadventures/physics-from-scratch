---
id: "2.3"
title: "World-space AABBs"
module: "m2"
minutes: 7
prerequisites: ["1.6", "2.1"]
visual: "V3"
readings_essential: ["ericson-real-time-collision-detection"]
readings_deeper: ["allen-chou-game-physics-series"]
---

## The question

How do you put a cheap, axis-aligned box around a shape that may be rotated, and what does it cost you in accuracy?

## The idea

An **AABB** (axis-aligned bounding box) is the smallest rectangle with sides parallel to the x and y axes that contains a shape. It is stored as two corners, `min` and `max`. Two AABBs overlap exactly when their x ranges overlap _and_ their y ranges overlap, which is four comparisons. That is why the broadphase uses them: they let it throw away most pairs cheaply, before any exact geometry runs.

An AABB must be **conservative**: it may be bigger than the shape, but never smaller. A box that is too big only costs the narrowphase some extra work on a pair that turns out not to touch. A box that is too small makes the broadphase discard a pair that really collides, and the collision is lost for good. Too big is a slowdown; too small is a bug.

For each shape kind, the AABB of a body at world position `p` and angle `a`:

- **Circle**, radius `r`: `min = p - (r, r)`, `max = p + (r, r)`. Rotation changes nothing. Example: centre (1, 2), `r = 0.5` gives `min = (0.5, 1.5)` and `max = (1.5, 2.5)`.
- **Box**, half-width `hw`, half-height `hh`: `min = p - (ex, ey)`, `max = p + (ex, ey)`, with half-extents `ex` and `ey` derived below.
- **Plane**: the half-space has no bounds, so the AABB is infinite: `min = (-Infinity, -Infinity)` and `max = (Infinity, Infinity)`. That is the only conservative choice. The broadphase will pair a plane with every non-static body, which is what we want, and static-static pairs (a plane with a wall) are filtered out there.

## Visual

<!-- visual: V3 -->

(Optional visual V3, not yet built: a spinning box with its AABB growing and shrinking around it.)

## The maths

**Goal.** For a box centred at the origin, rotated by angle `a` (counter-clockwise, per the contract), find the half-extents of the smallest axis-aligned rectangle around it.

A box is convex, so its AABB is the AABB of its four corners. In its own frame the corners are `(sx * hw, sy * hh)` with `sx` and `sy` each `+1` or `-1`. Rotating a point `(x, y)` by `a` gives `(x cos a - y sin a, x sin a + y cos a)`. So a rotated corner has

- `x' = sx * hw * cos a - sy * hh * sin a`
- `y' = sx * hw * sin a + sy * hh * cos a`

Look at `x'`. It is the sum of two terms, and `sx` and `sy` are chosen independently, so the maximum of the sum is the sum of the maxima. The first term is largest, over `sx = +/-1`, when `sx` matches the sign of `cos a`, and then equals `hw * |cos a|`. The second term is largest when `sy` is the opposite of the sign of `sin a`, and equals `hh * |sin a|`. Hence

> `ex = |cos a| * hw + |sin a| * hh`

The same argument on `y'` gives

> `ey = |sin a| * hw + |cos a| * hh`

Flipping both signs flips `x'` and `y'`, so the minimum is `-ex` and `-ey`: the AABB is centred on the body's position.

**Why absolute values.** Without them the formula returns a negative half-extent for some angles. Try `a = pi`: `cos a = -1`, so `ex = -hw`, and `min` would be to the right of `max`. A box rotated by 180 degrees looks the same as the unrotated box, and the absolute values make the formula agree.

**Check the known answers.**

- `a = 0`, `hw = 2`, `hh = 1`: `ex = 1*2 + 0*1 = 2`, `ey = 0*2 + 1*1 = 1`. Unrotated, so the AABB is the box.
- `a = pi/2`, same box: `cos a = 0` and `sin a = 1`, so `ex = 0*2 + 1*1 = 1` and `ey = 1*2 + 0*1 = 2`. A quarter turn swaps width and height, as it should. In floating point `cos(pi/2)` is about `6e-17`, not 0, so results are within about `1e-16` of 1 and 2: compare with a tolerance.
- Unit square (`hw = hh = 1`) at `a = pi/4`: `cos a = sin a = sqrt(2)/2`, so `ex = ey = (sqrt(2)/2)(1) + (sqrt(2)/2)(1) = sqrt(2)`, about 1.4142. Cross-check: the square's half-diagonal is `sqrt(1^2 + 1^2) = sqrt(2)`, and at 45 degrees a diagonal lies along each axis.

**How wasteful is it?** The AABB area is `4 * ex * ey`; the box area is `4 * hw * hh`. For a square at 45 degrees the ratio is `(sqrt(2) * sqrt(2)) = 2`: the AABB is twice the area of the shape. For a long thin plank it is far worse. Take `hw = 10`, `hh = 0.1` at 45 degrees: `ex = ey = (10 + 0.1)(sqrt(2)/2) = 7.142`, so the AABB area is `4 * 7.142^2 = 204.0`, against a box area of `4 * 10 * 0.1 = 4`. About 51 times larger. The narrowphase rejects the false pairs that box produces. That is the price of a four-comparison test.

## Common mistakes

- **Using `hw` and `hh` unrotated for a rotated box.** Correct only at multiples of a half turn. At a quarter turn the roles of `hw` and `hh` swap, so the unrotated version is already wrong there.
- **Dropping the absolute values.** Gives negative extents for some angles, for example any angle between a quarter turn and a half turn, or any negative angle.
- **Using degrees.** The contract uses radians.
- **Giving the plane a huge but finite box.** It will eventually be too small. Use infinity; just never subtract one infinity from another (`Infinity - Infinity` is `NaN`).

## Checkpoint

1. A box has `hw = 3` and `hh = 1`. What are the AABB half-extents at `a = pi/2`? At `a = pi`?
2. Why is returning an AABB that is too large safe for the engine, and returning one that is too small not?

## Readings

- Essential: Christer Ericson, _Real-Time Collision Detection_ (2004), https://shop.elsevier.com/books/real-time-collision-detection/ericson/978-1-55860-732-3 . The standard reference for bounding volumes including AABBs. The chapter number is not given here; use the contents page of your copy.
- Deeper: Allen Chou, "Game Physics Series", https://allenchou.net/game-physics-series/ . Verified at the index level only. Open the broadphase post from the index before relying on it.
