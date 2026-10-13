---
section: "08-modules"
status: drafted
depends_on: ["01-format", "02-contract", "03-repo-spec", "04-visual-layer"]
owner: unassigned
outputs: ["course/", "starter/tests/", "starter/src/visuals/"]
definition_of_done: "Every module spec is turned into pills, exercise pages, tests and visuals, and each passed its fresh-context review."
---


# 08 Modules

Seven standard modules: 38 pills and 9 exercises, about 20 hours for a learner with some physics and game-development experience (plan on 1.5-2x otherwise).

## How a spec becomes content

The `README.md` in each module folder is the **spec**: purpose, planned pills, exercise function signatures, the tests to write, the visuals, and a work package. The next agents expand each spec into real files:

| Spec says | Becomes |
|---|---|
| Pills table | one `course/mX/pill-X.Y-<slug>.md` per pill, using the template in `01-format` |
| Exercise block | `course/mX/exercise-N.md` plus the test file in `starter/tests/` |
| Visuals section | visual components built on the WP-03 trace framework |
| Readings | verified citations from `06-references` |

Function signatures in the specs are **proposals**. WP-02 finalises them, writes them into `02-contract`, and the author approves them before they freeze.

## Modules

| Module | Spec | Pills | Exercises | Estimate |
|---|---|---|---|---|
| M0 Setup and just enough TypeScript | [m0-setup](m0-setup/README.md) | 0.1-0.5 (5) | 0 | ~1.5h |
| M1 Rigid body representation | [m1-rigid-body](m1-rigid-body/README.md) | 1.1-1.6 (6) | 1 | ~3h |
| M2 Gathering and the world | [m2-gathering](m2-gathering/README.md) | 2.1-2.4 (4) | 2 | ~2h |
| M3 Broadphase | [m3-broadphase](m3-broadphase/README.md) | 3.1-3.4 (4) | 3 | ~2h |
| M4 Narrowphase | [m4-narrowphase](m4-narrowphase/README.md) | 4.1-4.8 (8) | 4a, 4b | ~5h |
| M5 Collision response | [m5-response](m5-response/README.md) | 5.1-5.8 (8) | 5a, 5b, 5c | ~5h |
| M6 Capstone | [m6-capstone](m6-capstone/README.md) | 6.1-6.3 (3) | capstone checks | ~2h |

## Cross-module rules

- TypeScript is taught as you go (D-029): each module spec lists the features its exercise introduces, and lessons, hints and tests use nothing that has not been introduced yet. Comparisons are with C++.

- Pill ids are stable. Lessons refer to each other by id.
- An exercise's tests may depend only on given code and earlier exercises.
- Every module ends with a demo using the debug draw.
- Every known-answer number carries its derivation.
