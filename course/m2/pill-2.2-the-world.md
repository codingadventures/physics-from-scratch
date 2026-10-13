---
id: "2.2"
title: "The World"
module: "m2"
minutes: 6
prerequisites: ["2.1"]
visual: "none"
readings_essential: ["gaul-tutsplus-series"]
readings_deeper: ["box2d-lite-dissection"]
---

## The question

Who owns the bodies, how do they get their identity, and how does each frame get a fresh view of them?

## The idea

Until now a body was a loose record: you built one with `createBody` and moved it with `integrate`. A simulation needs one place that holds _all_ the bodies, hands out their ids, and runs the stages over them. That place is the **World**.

The World does five jobs and nothing else:

1. **Create bodies.** `addBody(def)` takes a `BodyDef`, gives it the next id, builds a `Body` with `createBody` from Exercise 1, stores it, and returns it.
2. **Remove bodies.** `removeBody(body)` takes it out again.
3. **Show the bodies.** The `bodies` getter exposes them for reading, in the order they were added.
4. **Gather.** `gather()` returns each body together with its current bounding box.
5. **Step.** `step(dt)` runs the pipeline from pill 2.1.

The World holds _references_. The body that `addBody` returns is the very object the World keeps, so when `integrate` moves it inside `step`, your variable sees the new position. There are no copies to synchronise.

### Ids

Every body gets an integer `id`. Ids are unique, increasing from 0, and **never reused**, even after the body is removed. Why such a strong rule? Two reasons.

- **Identity.** Broadphase pairs are ordered `a.id < b.id` and deduplicated by id (the contract says so). If two live bodies could share an id, that rule breaks.
- **Stale references.** If a debug label, a recorded trace or (later) a cached contact refers to "body 2" and id 2 is later handed to a different body, the reference now silently points at the wrong thing. A never-reused id can only point at the original body or at nothing.

The counter must be its own variable. A tempting shortcut is "next id = number of bodies", and it fails on removal. Derivation: add three bodies and they get ids 0, 1, 2. Remove body 1. Now the list has two bodies, so "next id = length" gives 2, which a live body already owns. Two bodies, one id. "Next id = largest id + 1" fails too: remove the _last_ body (id 2) and the next one gets 2 again, which is reuse. Only a separate counter that is incremented on every `addBody` and never decremented satisfies the rule.

### `bodies` and `gather`

`bodies` is a **read-only view** of the list, in insertion order. Callers can look at it and mutate the bodies in it (that is how tests and the solver work) but they cannot add or remove bodies behind the World's back. Adding and removing go through `addBody` and `removeBody`, so the World stays in charge of ids.

`gather()` returns a list with one entry per body, `{ body, aabb }`, where `aabb` is the body's bounding box at its _current_ position and angle (pill 2.3 shows how to compute it). Two design choices are worth stating:

- **Computed on demand, not stored.** The `Body` type has no bounding-box field, and a stored box would go stale the moment `integrate` moves the body. Recomputing costs one small calculation per body, which is nothing at tens of bodies. Correctness over performance (D-004).
- **A fresh list each call.** Whatever the caller does with the returned list, the World's own state is untouched.

As pill 2.1 said, `step` calls `gather()` after integrating but does not pass its result to the broadphase, which takes bodies. The gathered list is for the renderer and for debugging.

### Stages are read when `step` runs

The World keeps `broadphase`, `narrowphase` and `solver` as public fields. Your `step` must read them _when it runs_, not copy them somewhere at construction time. Exercise 5c plugs in a solver simply by assigning `world.solver = ...` after the world exists, and that only works if every step looks the field up afresh. The same goes for `gravity`: `step` uses whatever `world.gravity` is at that moment.

## Visual

None.

## The maths

Almost none beyond the counter argument. One detail to check by hand: the World's `step` integrates _every_ body, static ones included, and relies on `integrate` to leave static bodies alone (inverse mass 0, from Exercise 1). A plane body has inverse mass 0 too, because planes must be static (the contract), so it is skipped by the same rule. The World needs no special case for either.

## Common mistakes

- **Deriving ids from the list length.** Fails after the first removal, as derived above.
- **Reusing an id.** Even "to keep ids small". The id is an identity, not an index.
- **Caching the stage functions.** `world.solver = ...` would then do nothing.

## Checkpoint

1. Add three bodies, remove the one with id 1, then add a fourth. What id should the fourth get, and why would "ids = position in the list" give the wrong answer?
2. Why does `gather()` compute the bounding boxes each time it is called instead of storing them when the body is added?

## Readings

- Essential: Randy Gaul's Tuts+ series "How to Create a Custom Physics Engine", https://code.tutsplus.com/series/how-to-create-a-custom-physics-engine--gamedev-12715 . The part titled "Scene and Jump Table" is the likely place to see how a small engine holds its bodies (inferred from the title; that part has not been checked for this course).
- Deeper: the Box2D Lite dissection, `docs/plan/06-references/dissections/box2d-lite.md` (section 2, data structures). Open it after finishing Exercise 2: it shows a world that keeps its bodies in a plain list and tracks contacts across steps, which this course does not.
