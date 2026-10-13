---
id: "exercise-1"
module: "m1"
files:
  [
    "starter/src/dynamics/shapes.ts",
    "starter/src/dynamics/body.ts",
    "starter/src/dynamics/integrate.ts",
  ]
tests: ["starter/tests/ex1-rigid-body.test.ts"]
---

## Goal

Make a rigid body real: compute the moment of inertia of a circle and a box, build a `Body` from a `BodyDef`, and advance a body in time with semi-implicit Euler. This covers pills 1.1 to 1.6.

## What to implement

Four functions, in three files under `starter/src/dynamics/`. The types `Shape`, `Body` and `BodyDef` are given: do not change them.

### `circleInertia(mass: number, radius: number): number` in `shapes.ts`

The moment of inertia of a solid disc about its centre (pill 1.3).

### `boxInertia(mass: number, halfWidth: number, halfHeight: number): number` in `shapes.ts`

The moment of inertia of a solid rectangle about its centre, taking **half**-extents (pill 1.3). The tests use `boxInertia(12, 1, 2) = 20`.

### `createBody(def: BodyDef, id: number): Body` in `body.ts`

Build a `Body` from a definition.

- Copy over the `id`, the `shape`, the position, and the values from the def.
- Defaults for the optional fields: `angle` 0, `linearVelocity` `(0, 0)`, `angularVelocity` 0, `restitution` 0, `friction` 0.5.
- `mass > 0`: `invMass = 1 / mass`, and `invInertia = 1 / I`, with `I` from the inertia function for the shape.
- `mass === 0`: a static body, with `invMass = 0` and `invInertia = 0`.
- A **plane** with `mass > 0` throws an `Error`. A plane with `mass` 0 is fine and has no inertia to compute.
- Edge cases to keep out of your way: do not divide by a zero mass or a zero inertia. Negative masses are not supported and not tested.

### `integrate(body: Body, dt: number, gravity: Vec2): void` in `integrate.ts`

Advance one body by `dt` seconds with semi-implicit Euler, changing it in place (pill 1.4).

- `gravity` is an acceleration (metres per second squared), the same for every dynamic body.
- The linear velocity is updated first, from gravity. Then the position is updated from the **new** velocity, and the angle from the angular velocity.
- No damping, no torque, no forces other than gravity.
- A static body (`invMass` 0) is not changed at all.
- The angle is not wrapped into any range.

Implement them in this order: the two inertia functions, then `createBody`, which calls them, then `integrate`.

## How to check

From the `starter/` directory:

```
npm test -- tests/ex1-rigid-body.test.ts
```

Before you start, every test fails with `TODO: Exercise 1, ...`: that is the stub talking. When you are done, all 17 tests in the file pass. `npm run progress` shows the count per exercise.

Every expected number in the test file has its derivation in a comment next to it. If a test fails, read the comment first and check your arithmetic against it. If you still believe a test is wrong, say so (the tests were written without a reference solution, so a mistaken test is possible).

## TypeScript you need here

Four features come up for the first time. Each is compared with C++ and shown on a tiny example unrelated to the exercise.

### 1. Union types and the `kind` field

`Shape` is a union: a value is exactly one of several record types, and a `kind` field says which. In C++ this is a `std::variant` with the tag stored in the value itself.

```ts
type Pet =
  { kind: "dog"; barkVolume: number } | { kind: "fish"; depth: number };

function describe(p: Pet): number {
  if (p.kind === "dog") {
    return p.barkVolume; // here TypeScript knows p is the dog variant
  }
  return p.depth; // and here, the fish
}
```

Checking `kind` is called _narrowing_: inside the `if`, only the fields of that variant exist. Reading `p.depth` when `p` could still be a dog is a compile error, where in C++ you would get the wrong `std::get`. A `switch (p.kind)` works the same way.

### 2. Optional fields and `??`

A field marked `?` may be absent. Its type is then "the type, or `undefined`". `BodyDef` has several (`angle?`, `friction?`, ...). The operator `??` supplies a default when the left side is `undefined` (or `null`). It is the nearest thing to `std::optional::value_or`.

```ts
type Settings = { volume?: number };

function effectiveVolume(s: Settings): number {
  return s.volume ?? 5; // 5 only if volume is missing
}
```

Do not use `||` for this. `||` replaces _any falsy value_, and `0` is falsy: `{ volume: 0 }` (muted on purpose) would turn into 5. `??` only replaces a missing value, so an explicit `0` is kept.

### 3. Throwing errors

`throw new Error("message")` raises an exception, like `throw std::runtime_error("message")` in C++. There is no list of exception types a function may throw. The tests check it with `expect(() => ...).toThrow()`.

```ts
function half(n: number): number {
  if (n < 0) {
    throw new Error("n must not be negative");
  }
  return n / 2;
}
```

### 4. Objects are shared, and mutating them in place

An object in TypeScript is always handled by reference, as if every variable were a C++ reference or pointer that you never have to dereference. Assigning an object, or passing it to a function, does **not** copy it.

```ts
type Counter = { n: number };

function bump(c: Counter): void {
  c.n += 1; // changes the caller's object
}

const a: Counter = { n: 0 };
const b = a; // b and a are the same object
bump(b);
// a.n is now 1
```

Two consequences. First, a function that returns `void` and changes its argument, like `integrate`, is the normal way to update a body ("in place"). Second, `const` stops you from _reassigning_ a variable, not from changing the object it points at: `a.n += 1` is legal even though `a` is `const`.

Aliasing is the trap. If `createBody` stores the `position` object from the def as it is, the body and the def then share one object, and a later `integrate` that writes components in place (`p.x += ...`) would silently move the def's vector too. The same trap applies to `linearVelocity`, including a single shared default zero vector used for every body. To avoid it, build a new vector with the same numbers: `{ x: p.x, y: p.y }`. (The tests do not check this. Doing it keeps your bodies independent.)

## Hints

Use as few as you need. Hints 1 and 2 are the next step in words; hint 3 is pseudocode, not code.

### Hint 1: where to look

- Inertia: the derivations and the final formulas are in pill 1.3. Pay attention to which row of the table takes half-extents.
- `createBody`: pill 1.2 has the mass table. The order of the checks matters: decide what to do with a plane and with mass 0 before you compute any inertia.
- `integrate`: pill 1.4, the two numbered updates and the free-fall derivation. The test comments show the first step worked by hand.

### Hint 2: the approach in words

- Inertia: each function is one multiplication-and-division line. The box formula with half-extents is the full-width rectangle formula after substituting `w = 2 * halfWidth` and `h = 2 * halfHeight`: the 12 becomes a 3 because `4 / 12 = 1 / 3`.
- `createBody`: static means "inverse mass 0", because 1 divided by an infinite mass gives 0. Handle the static case first, so that you never compute `1 / 0`. For a dynamic body, compute the inertia from the shape kind, then invert. Fill in each optional field from the def with a default.
- `integrate`: velocity changes first, using gravity, and position changes second, using the velocity you just changed. If you did it the other way round, the one-step test would still see `y = 0` after step 1. Static bodies return early.

### Hint 3: pseudocode (not TypeScript)

```
createBody(def, id):
    if the shape is a plane and mass is not 0: report an error
    if mass is 0: inverse mass and inverse inertia are both 0
    otherwise: inverse mass = 1 / mass
               I = inertia for this shape kind, from mass and its size
               inverse inertia = 1 / I
    return a record with id, shape, a copy of the position,
           and each optional field = the def's value, or its default

integrate(body, dt, gravity):
    if the body is static: nothing to do
    linear velocity moves by gravity over dt
    position moves by (the new) linear velocity over dt
    angle moves by angular velocity over dt
```

## Demo

Planned: a falling-bodies demo with the given loop (`src/render/loop.ts`), run with `npm run demo:1`. It is not written yet, so the demo page currently says it arrives with Module 1. When it exists, it will show bodies falling under gravity and spinning at constant rate, stepped at the fixed `dt` of pill 1.5.
