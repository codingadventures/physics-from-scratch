---
section: "09-advanced"
status: drafted
depends_on: ["08-modules"]
owner: unassigned
outputs: ["course/advanced/"]
definition_of_done: "Each advanced module has a spec, pills, exercises with tests, and a before/after demo. Work starts after the author finishes the standard track."
---


# 09 Advanced track

Each advanced module revisits and rebuilds a standard-track piece, with before and after demos for the blog. **Work starts only after the author has finished the standard track**, because the author's experience (what was hard, what failed) shapes this content. Until then this is an outline.

| Module | Topic | Rebuilds | Notes |
|---|---|---|---|
| A1 | Derive SAT yourself: projection, minimum translation, feature identification, edge cases | 4.6-4.7 | Replaces the recipe with a derivation |
| A2 | Solver deep dive: warm starting, accumulated impulse clamping, sequential impulses vs projected Gauss-Seidel, soft constraints | 5.6-5.7 | Fixes the limitations documented in 5.8 |
| A3 | Position-based comparison (XPBD) side by side with impulses, with the benefit and cost of each | Module 5 | Gives the blog its why-this-one-over-that episode |
| A4 | Stacking (stretch): contact persistence, manifold caching, convergence to rest | A2 | The payoff for A2 |
| A5 | Determinism: fixed-point or controlled floats, ordering, replay tests | whole engine | |
| A6 | Performance: spatial hashing or dynamic AABB trees, sleeping, islands | Module 3 | |
| A7 | Port the stable core to Rust or C++ | whole engine | |
| A8 | Integrators compared: explicit and semi-implicit Euler, velocity Verlet, RK4, implicit Euler; accuracy, energy behaviour, cost and stability on the same scenes | 1.4 | Pill 1.4 promises this comparison (D-018) |

Suggested agents for every advanced module: general-purpose, Opus tier, high effort, plus a fresh-context review. Specs are written when work starts.
