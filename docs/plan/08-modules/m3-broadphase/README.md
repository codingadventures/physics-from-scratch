---
section: "08-modules/m3-broadphase"
status: drafted
depends_on: ["01-format", "02-contract", "03-repo-spec", "04-visual-layer"]
owner: unassigned
outputs: ["course/m3/pill-3.1-why-broadphase-exists.md", "course/m3/pill-3.2-brute-force.md", "course/m3/pill-3.3-sort-and-sweep.md", "course/m3/pill-3.4-pair-filtering.md", "course/m3/exercise-3.md", "starter/tests/ex3-broadphase.test.ts"]
definition_of_done: "Every pill file exists, is 5-7 minutes, follows the 01-format template and has checkpoint questions and verified readings. Every exercise page has hints 1-3 and its test file, which compiles against the WP-02 stubs. Every formula and known-answer number carries its derivation. The fresh-context review found no unresolved issues."
---

# M3 Broadphase (~2h)

Spec drafted; pills, exercise pages and tests are not written yet. Function signatures below are proposals: WP-02 finalises them and records them in 02-contract.

## Purpose

Find candidate pairs cheaply before running exact collision tests: a brute-force baseline and sort and sweep, behind one interface.

## Prerequisites

Modules 0-2 complete.

## Pills (planned)

| ID | Title | Key idea |
|---|---|---|
| 3.1 | Why broadphase exists | O(n^2) pairs and what that costs |
| 3.2 | Brute force | all pairs with an AABB overlap test: our baseline |
| 3.3 | Sort and sweep | sort on one axis, sweep, active list |
| 3.4 | Pair filtering | static-static, same body; collision groups come later |

## Exercises

### Exercise 3: Two broadphases

- **Covers pills:** 3.1-3.4
- **Files (stubs):** `starter/src/broadphase/bruteForce.ts`, `starter/src/broadphase/sortAndSweep.ts`
- **Tests:** `starter/tests/ex3-broadphase.test.ts`

**Functions (proposed):**

- `class BruteForceBroadphase implements Broadphase`
- `class SortAndSweepBroadphase implements Broadphase`

**Behaviour spec:**

- Return pairs whose AABBs overlap (inclusive: touching counts).
- Exclude pairs where both bodies are static.
- Pairs are `[a, b]` with `a.id < b.id`, no duplicates.
- Sort and sweep sorts by `aabb.min.x` and sweeps with an active list. Planes have infinite AABBs and pair with every non-static body; this must not break the sweep.

**Tests to write** (known-answer tests carry their derivation in a comment):

- Two overlapping circles give one pair; separated circles give none; touching AABBs give a pair.
- A static box and a static plane give no pair; a plane and a dynamic circle give a pair.
- Pair order is a.id < b.id with no duplicates.
- Chain: A overlaps B, B overlaps C, A does not overlap C gives exactly 2 pairs.
- Empty input and single-body input give no pairs.
- Both implementations return identical pair sets on 200 seeded random scenes (compare after sorting pairs by ids). The seeded RNG is a given helper.

**Hints to write** (1-3, no code): why one axis is enough to discard most pairs; what the active list holds; how the plane's infinite extent behaves in the sweep

## Visuals

- **V4 (must-have):** sort and sweep: the sweep position moving along the axis, the active list, and pairs appearing.
- V5 (optional): brute force vs sweep pair counts as the body count grows.

## Readings

Candidates only. Cite a source in a pill only if it is marked verified in `06-references`.

- Ericson, Real-Time Collision Detection (unverified).
- Allen Chou, game physics series (listed in the amano.games devlog, not yet opened).
- Box2D Lite source (to be verified) for how a small engine finds pairs.

## Work package: turning this spec into content

**Outputs** (create these; write nowhere else):

- `course/m3/pill-3.1-why-broadphase-exists.md`
- `course/m3/pill-3.2-brute-force.md`
- `course/m3/pill-3.3-sort-and-sweep.md`
- `course/m3/pill-3.4-pair-filtering.md`
- `course/m3/exercise-3.md`
- `starter/tests/ex3-broadphase.test.ts`
- visuals: see the Visuals section and `04-visual-layer` (after WP-03)

**Steps:**

1. Draft each pill from the table above using the pill template in `01-format`. Check every formula and derive every number.
2. Write each exercise page with hints 1-3 (approach descriptions, never code).
3. Write the test file against the stub signatures from WP-02. Keep each exercise's tests dependent only on given code and earlier exercises.
4. Build the visuals listed above, after WP-03 delivers the trace framework.
5. Request a fresh-context review (see `13-agent-plan`) and fix what it finds.
6. Set `status` here and in `INDEX.md`.

**Suggested agents** (see `13-agent-plan` for the rules):

| Step | Agent type | Model tier | Effort |
|---|---|---|---|
| Pills | general-purpose | Sonnet | medium |
| Exercise pages and hints | general-purpose | Sonnet | medium |
| Tests | general-purpose | Opus | high |
| Visuals | general-purpose | Sonnet | medium |
| Review (fresh context, report only) | general-purpose | Opus | high |

## Definition of done

Every pill file exists, is 5-7 minutes, follows the 01-format template and has checkpoint questions and verified readings. Every exercise page has hints 1-3 and its test file, which compiles against the WP-02 stubs. Every formula and known-answer number carries its derivation. The fresh-context review found no unresolved issues.
