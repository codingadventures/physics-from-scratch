---
id: "2.4"
title: "Per-step data"
module: "m2"
minutes: 6
prerequisites: ["2.1", "2.2"]
visual: "none"
readings_essential: ["catto-contact-manifolds-gdc2007"]
readings_deeper: ["box2d-lite-dissection"]
---

## The question

What data does one step produce between the stages, how long does it live, and what does that choice cost us?

## The idea

Between the stages of the pipeline, two lists are passed along:

- a list of **pairs**, produced by the broadphase;
- a list of **manifolds**, produced by the narrowphase.

Both are **rebuilt from scratch every step**. They are local to `step`: created after integrate, consumed by the solver, then dropped. Nothing about last step's pairs or manifolds is kept. This is a deliberate simplification, and it has a price that we name below.

### A pair

A pair is two bodies `[a, b]` with `a.id < b.id`. Each unordered pair of bodies appears at most once, and a pair of two static bodies never appears, because two things that cannot move cannot need resolving. The ordering rule means "the pair of body 3 and body 7" has exactly one spelling, `[3, 7]`, so duplicates are easy to detect.

A pair is _candidate_, not _colliding_. It says the AABBs overlap, and the contract makes that test inclusive: AABBs that merely touch overlap. Many pairs will not survive the next stage. Two examples with circles of radius 1:

- Centres (0, 0) and (1.9, 1.9). The boxes are `[-1, 1]` in each axis and `[0.9, 2.9]` in each axis, which overlap. The distance between centres is `1.9 * sqrt(2) = 2.687`, which is more than `r + r = 2`. The circles do not touch. Pair passes, no collision.
- Centres (0, 0) and (2, 0). The boxes are `[-1, 1]` and `[1, 3]` in x: they touch at x = 1, so they overlap. The circles are exactly `2 = r + r` apart, so they touch at one point. The contract says touching exactly counts as _no_ collision. Pair passes, no collision.

### A manifold

A manifold is the narrowphase's answer for one pair that really overlaps: `{ a, b, normal, points }`.

- `a` and `b` are the two bodies;
- `normal` is a unit vector pointing from `a` towards `b`;
- `points` has one or two entries, each with a world-space `point` and a positive `depth`.

For pairs that do not overlap, the narrowphase returns `null`. The step collects the non-null results into the manifold list. The solver is handed _only_ manifolds that exist: it never sees a `null`. How a solver behaves when the list is empty is not part of the contract; write yours so that an empty list is harmless.

### Live bodies, not copies

A manifold holds the same `Body` objects the World owns. It does not copy their state. So when the solver changes `a.linearVelocity`, it is changing the world's body. That is what we want: the solver's job is to modify the bodies, and it needs no way to hand results back.

### Why rebuild every step?

- **No stale contacts.** Bodies separate, bodies are removed, bodies tunnel. A list rebuilt each step always matches the current positions. There is no "is this contact still alive?" bookkeeping.
- **Simple stages.** Each stage is a function from its input to its output with no memory. That is easy to test with a hand-made input, and each of your exercises is tested exactly that way.

### What it costs

Without memory of the previous step, the solver starts every step from zero. It cannot reuse last step's impulses as a first guess ("warm starting"), and it cannot tell that a contact point this step is _the same_ contact as one last step. Box2D Lite does keep contacts between steps and matches them using ids stored on the clip points; that is part of how it can stack boxes. Our basic solver cannot, and the course says so openly: stacking is not stable with the basic solver, and the advanced track picks this up.

### How much work is it?

Counting: with `n` bodies there are at most `n(n-1)/2` pairs (20 bodies: 190). Manifolds are at most one per candidate pair, so the manifold count is at most the pair count. In a scene of tens of bodies these lists are tiny, so we ignore the cost of allocating new arrays every step. Allocation cost is ignored on purpose (the contract).

## Visual

None.

## The maths

Only counting. A set of `n` bodies has `C(n, 2) = n(n-1)/2` unordered pairs: choose the first body in `n` ways, the second in `n-1` ways, and divide by 2 because `[a, b]` and `[b, a]` are the same pair. For `n = 20` that is `20 * 19 / 2 = 190`; for `n = 100` it is `4950`, which is why the broadphase exists. In the worst case every pair overlaps, so manifolds `<=` pairs `<=` `n(n-1)/2`.

## Common mistakes

- **Keeping the pair or manifold list on the World between steps.** It would hold last step's data after bodies moved or were removed.
- **Forgetting that broadphase output includes non-colliding pairs.** Always handle `null` from the narrowphase.
- **Passing `null` entries to the solver.** The solver stage takes only real manifolds.
- **Copying bodies into manifolds.** The solver would update copies and the world would never change.

## Checkpoint

1. A candidate pair reaches the narrowphase and comes back `null`. What does the step do with that pair, and does the solver see it?
2. Name one thing a solver could do better if it were given last step's contacts, and say why our pipeline cannot offer it.

## Readings

- Essential: Erin Catto, "Contact Manifolds" (GDC 2007), https://box2d.org/files/ErinCatto_ContactManifolds_GDC2007.pdf . Verified (text read). It covers what a manifold is and how contact points are produced; Module 4 uses it more heavily. Cite it as GDC 2007: the PDF's embedded metadata shows a wrong year.
- Deeper: the Box2D Lite dissection, `docs/plan/06-references/dissections/box2d-lite.md` (section 2, data structures: how its arbiters keep contacts between steps). Open it after finishing Exercise 2.
