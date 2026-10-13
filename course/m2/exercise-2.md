---
id: "exercise-2"
module: "m2"
files: ["starter/src/world/aabb.ts", "starter/src/world/world.ts"]
tests: ["starter/tests/ex2-world.test.ts"]
---

## Goal

Build the layer that owns the bodies. You write `computeAABB`, the world-space bounding box of a body, and the `World` class: it stores bodies, hands out ids, gathers bodies with their boxes, and runs one step of the pipeline in the order from pill 2.1.

You need Exercise 1 done first: `World.addBody` calls your `createBody`, and `World.step` calls your `integrate`.

## What to implement

### `computeAABB(body: Body): AABB` in `starter/src/world/aabb.ts`

The bounding box of the body at its current `position` and `angle`.

- **Circle:** `position` plus and minus `radius` on both axes. The angle does not matter.
- **Box:** `position` plus and minus half-extents `ex` and `ey`, where `ex` and `ey` come from `halfWidth`, `halfHeight` and the angle. Pill 2.3 derives them.
- **Plane:** unbounded: `min = (-Infinity, -Infinity)` and `max = (Infinity, Infinity)`. Ignore the plane's `position` and `angle` (the contract says they are ignored).

Return a new object each time. Do not store or share the result between bodies.

### `class World` in `starter/src/world/world.ts`

The constructor and the public stage fields (`gravity`, `broadphase`, `narrowphase`, `solver`) are given. You add whatever private fields you need and implement these:

- **`get bodies(): readonly Body[]`**: every body in the world, in the order added.
- **`addBody(def: BodyDef): Body`**: builds a body with the next id (0, 1, 2, ...) using `createBody`, stores it and returns it. Ids are unique, increasing and **never reused**, even after removal.
- **`removeBody(body: Body): void`**: takes the body out of the world. Later bodies keep their ids and the order of the remaining bodies is unchanged. The contract does not say what happens if the body is not in the world, so do not rely on it.
- **`gather(): GatheredBody[]`**: one `{ body, aabb }` per body in the world, in the order added, with each `aabb` computed from the body's _current_ position and angle. Removed bodies are absent. Return a fresh array each call.
- **`step(dt: number): void`**: in this order:
  1. integrate every body by `dt` under `this.gravity` (static bodies do not move, which `integrate` already guarantees);
  2. gather;
  3. ask `this.broadphase` for candidate pairs from the bodies;
  4. run `this.narrowphase` on each pair, keeping the non-null manifolds;
  5. call `this.solver` with those manifolds and `dt`.

Edge cases and notes:

- Read the stage fields when `step` runs, not earlier. Exercise 5c assigns `world.solver` after the world exists.
- The solver receives only non-null manifolds. Whether you call it on a step with no manifolds is up to you; the tests do not depend on it.
- The gathered list is not passed to the broadphase, which takes bodies (pill 2.1). `step` still calls `gather()` at its place in the order.
- `world.ts` starts with `import type` lines, which are erased at compile time and cannot be used as values. For functions you call (`createBody`, `integrate`, `computeAABB`) you add ordinary `import { ... } from "..."` lines.

## How to check

From `starter/`:

```
npx vitest run tests/ex2-world.test.ts
```

or `npm test` to run everything. Until you implement a function, its tests fail with `TODO: Exercise 2, ...`. A pass is every test in `ex2-world.test.ts` green. The tests cover (per the module spec): circle, box and plane boxes, a rotated-box check against hand-derived numbers, a seeded random check that your box contains all four rotated corners and touches the outermost one on each side (no slack), ids across removal, `gather` after `step`, the order in which `step` calls its stages, and that `step` uses a stage assigned after construction (Exercise 5 plugs in the solver that way). Run `npm run typecheck` as well: a pass here means it reports no errors.

## TypeScript you need here

You have read objects, functions and `type` aliases (pill 0.2) and the `kind` field of `Shape` (Exercise 1). New in this exercise: classes, `private`, getters, `readonly` arrays, `Infinity` and arrays of objects. Each example below is unrelated to the exercise.

**Classes.** A class bundles data and methods in one block. There is no header/source split and no destructor; the garbage collector frees objects nobody refers to any more.

```ts
class Counter {
  count = 0; // a field with an initial value

  increment(by: number): number {
    this.count += by; // `this.` is always required, unlike C++
    return this.count;
  }
}

const c = new Counter(); // `new` builds an object; there is no `delete`
c.increment(2);
```

C++: `class Counter { int count = 0; int increment(int by); };` in the header, the body in a `.cpp`. In TypeScript, objects live on the heap and variables hold references, so `const d = c;` makes `d` another name for the same counter, not a copy.

**`private`.** A `private` field can only be touched from inside the class.

```ts
class Tally {
  private total = 0;
  add(n: number): void {
    this.total += n;
  }
}
```

Like C++ `private`, with one difference: it is checked by the compiler only. At run time it is an ordinary property. Fine here; just do not expect it to stop code that bypasses the type checker.

**Getters.** `get name()` declares a method that you read like a field, with no parentheses. C++ has no direct equivalent; it is like an accessor `int size() const` that you call as `x.size` instead of `x.size()`.

```ts
class Tally {
  private total = 0;
  get doubled(): number {
    return this.total * 2;
  }
}
// new Tally().doubled   <- no ()
```

**`readonly` arrays.** `readonly Body[]` is an array type you may read but not change: no `push`, no assigning to an index. You may pass a normal array where a `readonly` one is wanted.

```ts
function sum(xs: readonly number[]): number {
  // xs.push(1);  <- compile error
  return xs[0];
}
```

C++: roughly `const std::vector<Body*>&`. The analogy holds for the elements too: the _array_ is read-only but the objects in it are not (like a `const` vector of non-const pointers), so you can still change a body's fields through it. Also compile-time only.

**`Infinity`.** The global constant `Infinity` (and `-Infinity`) is a `number`. C++: `std::numeric_limits<double>::infinity()`. All numbers are doubles. Comparisons work (`5 < Infinity` is true), but arithmetic can produce `NaN`: `Infinity - Infinity` and `Infinity * 0` are both `NaN`. That is why you return the plane's box directly and never compute with it.

**Arrays of objects.** `Item[]` is a growable array, like `std::vector<Item>` (of references).

```ts
type Item = { name: string; qty: number };
const items: Item[] = [];
items.push({ name: "bolt", qty: 3 }); // append
for (const it of items) {
  /* it.qty ... */
} // iterate in order
const n = items.length; // size
const i = items.indexOf(items[0]); // index of this exact object, -1 if absent
items.splice(i, 1); // remove 1 element at index i, in place
const kept = items.filter((it) => it.qty > 0); // new array; the lambda is like [](auto it){ return it.qty > 0; }
```

`===` and `indexOf` compare objects **by reference**, like comparing pointers, not by value. Two separate `{ name: "bolt", qty: 3 }` objects are different. `Math.abs`, `Math.cos` and `Math.sin` are plain functions on the global `Math` object, like `std::abs`, `std::cos` and `std::sin` from `<cmath>`; angles are in radians.

### Dropping the nulls: `!== null`

The narrowphase stage returns `Manifold | null`: a manifold, or nothing. The solver wants only real manifolds. Checking `if (m !== null)` narrows the type: inside the `if`, TypeScript knows `m` is a `Manifold`. C++ comparison: like testing a pointer before dereferencing it, except the compiler refuses to let you skip the test.

```ts
let label: string | null = null;
label = "ground";
if (label !== null) {
  console.log(label.length); // fine: label is a string here
}
```

## Hints

### `computeAABB`

1. Where to look: pill 2.3, "The maths". Start with the circle; it needs no angle. For the box, you need the half-extent formulas, and the shape's `kind` tells you which case you are in (the same pattern as Exercise 1).
2. The approach: compute a pair of half-extents `(hx, hy)` for the circle and the box, then build `min` as the position minus the half-extents and `max` as the position plus them. The plane is handled before any of that: its box is fixed. For the box, the half-extent along x gets a contribution from the width and one from the height, each weighted by how far the rotation tilts that side towards x. The weights must be non-negative, because an extent is a distance. A box turned half a turn looks the same, so the answer cannot go negative.
3. Pseudocode:

```
if plane: return the infinite box
(hx, hy) = per kind:
   circle: (radius, radius)
   box:    (  ?  ,   ?  )     // pill 2.3, with absolute values
return { min: position - (hx, hy), max: position + (hx, hy) }
```

### `World`

1. Where to look: `starter/src/world/world.ts`. The constructor shows how the fields are declared. You need somewhere to keep the bodies, and a second thing, separate from them, to remember the next id. Pills 2.1 and 2.2 give the `step` order.
2. The approach: `addBody` takes the next id, advances the counter, builds the body and stores it. `removeBody` finds that exact body (by reference) and drops it; it never touches the counter. `bodies` hands back the stored list as read-only. `gather` walks the bodies in order and pairs each with its box. `step` is the five stages from pill 2.1, one after the other: the only subtlety is to run them in that order and to read the stage fields at that moment. `gather` sits after integrate on purpose: that way the boxes it returns reflect the bodies' new positions, whereas gathering first would give boxes one step out of date. A reminder on why ids are never reused: with ids 0, 1, 2, removing 1 and then using the list length as the next id gives 2 again.
3. Pseudocode:

```
addBody(def):  id = <counter>;  <counter moves on>
               body = <build from def and id>;  <keep it>;  return body
removeBody(b): <remove b from the kept list>        // counter untouched
gather():      for each kept body: { body, aabb of that body now }
step(dt):      1 every body moves by dt under this world's gravity
               2 gather
               3 pairs = <this world's broadphase> applied to the bodies
               4 manifolds = [ result for each pair, dropping the nulls ]
               5 <this world's solver> applied to manifolds and dt
```

## Demo

Run `npm run demo:2` from `starter/`. Your `World` steps a spinning plank, a spinning square, a circle and a floor plane, with gravity off so nothing falls away. The dashed boxes are the AABBs from your `gather()`: watch the plank's box grow and shrink as it turns, as pill 2.3 predicts. The plane is not drawn as a box because its AABB is infinite. Space pauses and S steps once. Until your World is written, the page shows which TODO it hit.
