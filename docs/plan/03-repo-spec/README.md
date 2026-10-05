---
section: "03-repo-spec"
status: drafted
depends_on: ["02-contract"]
owner: unassigned
outputs: ["starter/ (built by WP-01 and WP-02)"]
definition_of_done: "starter/ exists as specified, npm test runs, every exercise stub and its failing tests are present, and npm run progress works."
---


# 03 Repo spec

The starter project lives in `starter/`. It is the contract made concrete: stubs with fixed signatures, tests that already exist and fail, and given code the learner never edits.

## Layout

```
starter/
  package.json  tsconfig.json  vite.config.ts  vitest.config.ts
  src/
    math/vec2.ts                 Exercise 0
    dynamics/shapes.ts           Exercise 1
    dynamics/body.ts             Exercise 1
    dynamics/integrate.ts        Exercise 1
    world/world.ts               Exercise 2
    world/aabb.ts                Exercise 2
    broadphase/broadphase.ts     given (interface)
    broadphase/bruteForce.ts     Exercise 3
    broadphase/sortAndSweep.ts   Exercise 3
    narrowphase/manifold.ts      given (types)
    narrowphase/circleCircle.ts  Exercise 4a
    narrowphase/circlePlane.ts   Exercise 4a
    narrowphase/boxPlane.ts      Exercise 4a
    narrowphase/circleBox.ts     Exercise 4a
    narrowphase/boxBox.ts        Exercise 4b
    narrowphase/dispatch.ts      Exercise 4b
    solver/impulse.ts            Exercises 5a-5c
    render/                      given: canvas, debug draw, loop
    trace/                       given: trace recorder
    visuals/                     given: player widget and per-lesson visuals
    demos/                       given: demo1.ts ... demo6.ts
  tests/                         one file per exercise: ex0-vec2.test.ts, ...
  test-helpers/                  expectClose, seeded RNG, scene builders, fixed-step runner
```

"Given" files are complete and not edited by the learner. Everything else starts as a stub.

## Example stub and test

```ts
// src/narrowphase/circleCircle.ts (the learner edits this)
export function circleVsCircle(a: Body, b: Body): Manifold | null {
  throw new Error("TODO: Exercise 4a, circle vs circle");
}
```

```ts
// tests/ex4a-narrowphase.test.ts (already present, failing at the start)
it("returns null for separated circles", () => { /* ... */ });
it("normal points from A to B", () => { /* ... */ });
it("A vs B mirrors B vs A", () => { /* ... */ });
```

## Scripts

| Command | Purpose |
|---|---|
| `npm test` | all tests |
| `npm test -- ex4a` | one exercise |
| `npm run progress` | passing and total tests per exercise, so progress is visible |
| `npm run demo:4` | open the demo for a module |

## Toolchain

TypeScript in strict mode, Vite, Vitest, ESLint and Prettier. WP-01 picks current versions and records them. Versions are not pinned in this plan.

## Known risks

1. **Exercise dependencies:** later tests use earlier exercises (everything needs `Vec2`). A learner stuck on Exercise 0 is blocked everywhere. Mitigation: each exercise's tests may depend only on given code and earlier exercises, and the exercise page lists its prerequisites. There is no reference-solution switch (see 05-solutions-policy).
2. **Wrong or over-tight tests:** with no reference solution, a wrong test is only caught when a correct solution fails it. Mitigation: analytic known-answer tests with derivations in comments, and a fresh-context review of every test file. See OQ-05.
3. **API churn:** the contract is frozen once lessons are written, because lessons quote signatures.
