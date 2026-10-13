---
id: "0.2"
title: "Just enough TypeScript"
module: "m0"
minutes: 7
prerequisites: ["0.1"]
visual: "none"
readings_essential: ["typescript-handbook"]
readings_deeper: []
---

## The question

What is the smallest amount of TypeScript you need to read a test and write a short function, if you already know C++?

## The idea

TypeScript is JavaScript with types written in the source. The type checker (`npm run typecheck`) reads them, then they are erased: at run time there are no types, only JavaScript. Nothing here is compiled to machine code, and there are no headers, no pointers and no manual memory. Everything beyond what follows arrives with the exercise that first needs it.

**Values and types.** There are three basic types you need: `number`, `string` and `boolean`. There is one number type, a 64-bit floating point value like C++ `double`. No `int` exists, so `7 / 2` is `3.5`, not `3`. A type goes after the name:

```ts
const mass: number = 2.5; // C++: const double mass = 2.5;
let count = 0; // the type number is inferred
count = count + 1;
```

**`const` and `let`.** Use `const` unless you will reassign the name, then use `let`. There is no `var` in this course. One trap, detailed below: `const` fixes the name, not the contents of an object.

**Functions.** Parameters and the return type are annotated after the name. Statements end with semicolons, blocks use braces, and `if`, `for` and `while` look like C++:

```ts
function area(width: number, height: number): number {
  return width * height;
}

const twice = (n: number): number => n * 2; // C++: [](double n) { return n * 2; }
```

The second form is an **arrow function**, TypeScript's lambda. It has no capture list because it sees the surrounding variables automatically. Tests use arrows constantly.

**Objects and `type`.** A `type` alias names the shape of an object, much as a `struct` declaration does in C++. The difference is that typing is **structural**: any object with the right fields fits, whatever it was created from.

```ts
type Size = { width: number; height: number };

function perimeter(s: Size): number {
  return 2 * (s.width + s.height);
}

perimeter({ width: 2, height: 3 }); // an object literal, no constructor
```

An object literal like `{ width: 2, height: 3 }` is also how you return several numbers from a function. Arrays are written `number[]`, indexed with `xs[0]`, and have `xs.length`. The `Math` object holds `Math.sqrt`, `Math.abs`, `Math.max` and friends, like `<cmath>`.

**Objects are references.** This is the biggest difference from C++, where a struct is a value by default. In TypeScript an object variable refers to a shared object:

```ts
const a: Size = { width: 1, height: 2 };
const b = a; // C++ equivalent: Size& b = a;  (not a copy)
b.width = 9; // a.width is now 9 as well
```

`const` did not stop `b.width = 9`, because it only forbids reassigning `b`. This is why the vector functions in the contract never change their arguments: if a function edits the object it was handed, the caller's data changes too. To produce a different value you build a new object.

**Comparing.** Use `===` and `!==` (never `==`, which converts types quietly). The values `0` and `-0` both exist; they compare as equal with `===`, and a test using `toEqual` treats them as different (more below).

**Failing loudly.** `throw new Error("message")` is the equivalent of throwing `std::runtime_error`. Every exercise stub does exactly this until you replace its body, so a stub that has not been written yet fails with a message starting `TODO`.

**`export` and `import`.** Each file is a module. A name is private to its file until you write `export` in front of it. Another file pulls it in by name and path:

```ts
// geometry.ts
export function area(width: number, height: number): number {
  return width * height;
}

// geometry.test.ts
import { area } from "./geometry"; // C++: roughly #include plus a using-declaration
import type { Size } from "./shapes"; // a type only: it vanishes at run time
```

Relative paths start with `./` or `../` and omit the `.ts` ending. There are no header files: the one file holds the declaration and the code. This project turns on a setting that makes `npm run typecheck` reject a plain `import` of something that is only a type, so write `import type` for those. The starter files already do.

**Reading a Vitest test.** A test file groups checks. `describe(name, fn)` opens a group, `it(name, fn)` is one test, and `expect(value)` followed by a matcher is one check. The two callbacks are arrow functions:

```ts
import { describe, it, expect } from "vitest";
import { area } from "./geometry";

describe("area", () => {
  it("multiplies width by height", () => {
    expect(area(2, 3)).toBe(6);
  });
});
```

`toBe` compares with `Object.is`, which suits numbers and identity. `toEqual` compares objects field by field. Neither suits floating point, because `0.1 + 0.2` is `0.30000000000000004`. Our tests use the project's `expectClose(actual, expected, tol)` and `expectVecClose`, which accept a small error (default `1e-6`, the helper's `GEOMETRY_TOL`). They also treat `-0` and `0` as equal. Both `toEqual` and `toBe` reject `-0` where `0` is expected (checked against Vitest 5.0.3), and `-0` appears naturally, for example from `0 * -1`. That is the reason Exercise 0 never compares with `toEqual`.

**Reading the tests.** The test files are given code, written by people fluent in TypeScript, so they use some syntax this course never asks you to write (spreads, default parameters, `Partial<...>`). You only need to read their names and the derivations in their comments; each exercise page teaches what you need to write.

## Visual

None.

## The maths

None in this pill.

## Common mistakes

- **Mutating an argument.** `function f(v: Size) { v.width = 0; }` changes the caller's object. Build and return a new one.
- **Expecting integer division.** `7 / 2` is `3.5`. Nothing rounds for you.
- **Forgetting `return`.** With a `: number` return type the type checker reports it. Without an annotation, a function that falls off the end quietly returns `undefined`.
- **Using `==`.** It converts types before comparing. Use `===`.
- **Importing a type without `type`.** The type checker will complain; add `import type`.
- **Reaching for the deep-equality matcher on floats.** Use `expectClose`.

## Checkpoint

1. After `const q = p;` where `p` is an object, you write `q.x = 5`. What is `p.x`, and what would C++ do differently by default?
2. Why can a function declared to take a `Size` accept an object literal that was never declared as a `Size`?

## Readings

- Essential: "The TypeScript Handbook", Microsoft. Skim the sections on everyday types and on modules. You will not need the rest for a long time.
