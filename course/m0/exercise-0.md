---
id: "exercise-0"
module: "m0"
files: ["starter/src/math/vec2.ts"]
tests: ["starter/tests/ex0-vec2.test.ts"]
---

## Goal

Implement the twelve vector functions that the rest of the engine is built on. Each one is short, so the real goal is to get the toolchain working end to end: edit a stub, run the tests, read the failure, fix it, see green.

You need pills 0.1 to 0.5. Pill 0.4 holds the derivations of every formula below.

## What to implement

All in `starter/src/math/vec2.ts`. The `Vec2` type there is given: do not change it. Every function starts as a stub that throws an error beginning `TODO: Exercise 0`. Replace the body and keep the signature.

| Function    | Signature                    | Behaviour                                                          |
| ----------- | ---------------------------- | ------------------------------------------------------------------ |
| `add`       | `(a: Vec2, b: Vec2): Vec2`   | componentwise sum                                                  |
| `sub`       | `(a: Vec2, b: Vec2): Vec2`   | componentwise difference, a minus b                                |
| `scale`     | `(a: Vec2, s: number): Vec2` | each component times `s`                                           |
| `negate`    | `(a: Vec2): Vec2`            | each component's sign flipped                                      |
| `dot`       | `(a: Vec2, b: Vec2): number` | the dot product                                                    |
| `cross`     | `(a: Vec2, b: Vec2): number` | the 2D cross product, a scalar: a.x*b.y - a.y*b.x                  |
| `crossSV`   | `(s: number, v: Vec2): Vec2` | scalar x vector: { x: -s*v.y, y: s*v.x }                           |
| `crossVS`   | `(v: Vec2, s: number): Vec2` | vector x scalar: { x: s*v.y, y: -s*v.x }                           |
| `perp`      | `(a: Vec2): Vec2`            | a rotated 90 degrees counter-clockwise: { x: -a.y, y: a.x }        |
| `length`    | `(a: Vec2): number`          | the Euclidean length                                               |
| `lengthSq`  | `(a: Vec2): number`          | the length squared, without taking a square root                   |
| `normalize` | `(a: Vec2): Vec2`            | the unit vector along `a`; the zero vector returns the zero vector |

**Rules for every function.**

- **Pure.** Never mutate an argument. Returning a new object every time is the safe habit, even when the answer equals an input: bodies are mutable, so a returned argument could end up shared. The tests check that arguments are never changed.
- **Edge case.** `normalize` of the zero vector must return the zero vector, not `NaN`.
- **Signs of zero.** Some results can legitimately be `-0`, for example `crossSV(2, { x: 1, y: 0 })` has `x = -2 * 0 = -0`. Do not try to avoid it: the tests compare with `expectClose` and `expectVecClose`, which treat `-0` and `0` as equal.

**Hand-checkable values** (derivations are in pill 0.4):

- dot of (1, 2) and (3, 4) = 1*3 + 2*4 = 11.
- cross of (1, 2) and (3, 4) = 1*4 - 2*3 = -2.
- length of (3, 4) = sqrt(9 + 16) = 5, so the normalised vector is (3/5, 4/5) = (0.6, 0.8).

## How to check

From inside `starter/`:

```sh
npm test -- ex0
```

This runs `starter/tests/ex0-vec2.test.ts` only. At first every test fails with the `TODO` error naming the stub. Implement a function, save, and watch its tests pass. `npm run test:watch` re-runs on every save.

You are done with the tests when every test in the file passes. Then run `npm run typecheck` to make sure the types are right, and `npm run check` for the full check: typecheck, lint, format check and all tests. If `npm run format:check` complains, `npm run format` fixes the layout.

If a test fails and you believe the test is wrong, check its derivation comment against pill 0.4 first. If it still looks wrong, tell the author: tests are not validated against a reference solution, so a wrong test is possible (see the solutions policy).

## TypeScript you need here

Everything in this box is also in pill 0.2. Each item gives a C++ comparison and a tiny example that is not the solution.

**Numbers.** `number` is a 64-bit float, like `double`. There is no `int`: `7 / 2` is `3.5`. `Math.sqrt(2)` is the square root, like `std::sqrt`.

**Functions with typed parameters.** Types go after the name; the return type goes after the parameter list.

```ts
function average(a: number, b: number): number {
  return (a + b) / 2;
}
```

**Object types and `type`.** A `type` alias names an object's shape, like a `struct` declaration, but typing is structural: any object with the right fields fits. An object literal is how you return several values. `Vec2` is such a type.

```ts
type Range = { low: number; high: number };

function widen(r: Range, by: number): Range {
  return { low: r.low - by, high: r.high + by };
}
```

**Objects are references.** `const b = a;` makes `b` another name for the same object (C++: `Range& b = a;`). Editing `b.low` edits `a.low`. This is why the vector functions must build and return a new object instead of changing their argument.

**`const` and `let`.** `const` forbids reassigning the name (not editing the object's fields). Use `let` for a variable you will reassign.

```ts
let total = 0;
for (let i = 1; i <= 3; i++) {
  total = total + i;
}
const answer = total; // 6
```

**Conditions.** `if (x === 0) { ... }` works as in C++. Use `===` and `!==`, never `==`.

**`export` and `import`.** A name needs `export` to be visible to other files. The stub functions already have it. Tests import them by name with a relative path and no `.ts` ending; a type needs `import type`.

```ts
import { average } from "../src/average";
import type { Range } from "../src/range";
```

**Reading a Vitest test.** `describe` groups tests, `it` is one test, `expect(actual)` plus a matcher is one check, and the callbacks are arrow functions, TypeScript's lambdas.

```ts
import { describe, it, expect } from "vitest";
import { average } from "../src/average";

describe("average", () => {
  it("is halfway between two numbers", () => {
    expect(average(2, 4)).toBe(3);
  });
});
```

Floating-point results are compared with `expectClose(actual, expected)` and `expectVecClose(actual, expected)` from `test-helpers`, which allow a tiny error (`1e-6` by default) and treat `-0` and `0` as equal.

## Hints

1. **Where to look.** Open `starter/src/math/vec2.ts`: the doc comments on the trickier stubs (`cross`, `crossSV`, `crossVS`, `perp`, `normalize`) carry their formulas. Pill 0.4, section "The maths", derives every one. Start with `add` and run `npm test -- ex0` before doing anything else, so you see the failure turn into a pass. Then work down the file. Most functions are one line.
2. **The approach in words.**
   - `add`, `sub`, `scale` and `negate` each work on the two components separately and return a fresh object.
   - `dot` multiplies matching components and adds. `cross` multiplies crosswise (x of the first with y of the second) and subtracts, so swapping the arguments flips the sign.
   - `crossSV` and `crossVS` are the same idea with opposite signs. If you get the signs mixed up, work them out for one concrete case, for example a spin of 2 acting on the vector (1, 0), and compare with the expected result in pill 0.4.
   - `perp` takes the second component, negated, as the new first component, and the first as the new second. To see why it is a counter-clockwise quarter turn, apply it to (1, 0) and then to (0, 1) and picture where each lands.
   - `lengthSq` is the dot product of a vector with itself. `length` is the square root of that.
   - `normalize` divides by the length. Dividing zero by zero gives `NaN`, so the zero-length case needs its own early exit, and only an exactly zero length does.
3. **Pseudocode** (not TypeScript):

   ```
   normalize(a):
       n = squared length of a
       if n is exactly zero: result is the zero vector
       otherwise: result is a, scaled by one over the square root of n

   cross(a, b):
       result is (a's first part times b's second part) minus (a's second part times b's first part)
   ```

   If your own `perp` and `dot` disagree with the property that `dot(a, perp(a))` is always 0, one of them has a sign error; check by hand with a = (1, 2).

## Demo

Demo 0 is the visual tutorial from pill 0.5 and does not use your functions, so it runs before you write anything: `npm run demo:0` from `starter/`. From Exercise 1 on, the demos run your engine and draw it with the debug-draw API from pill 0.4.
