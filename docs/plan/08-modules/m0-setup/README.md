---
section: "08-modules/m0-setup"
status: drafted
depends_on: ["01-format", "02-contract", "03-repo-spec", "04-visual-layer"]
owner: unassigned
outputs: ["course/m0/pill-0.1-course-overview-and-the-final-demo.md", "course/m0/pill-0.2-just-enough-typescript.md", "course/m0/pill-0.3-project-tour.md", "course/m0/pill-0.4-vector-maths-utilities-and-the-debug-draw-api.md", "course/m0/pill-0.5-how-to-read-the-interactive-visuals.md", "course/m0/exercise-0.md", "starter/tests/ex0-vec2.test.ts"]
definition_of_done: "Every pill file exists, is 5-7 minutes, follows the 01-format template and has checkpoint questions and verified readings. Every exercise page has hints 1-3 and its test file, which compiles against the WP-02 stubs. Every formula and known-answer number carries its derivation. The fresh-context review found no unresolved issues."
---

# M0 Setup and TypeScript for C++ developers (~1.5h)

Spec drafted; pills, exercise pages and tests are not written yet. Function signatures below are proposals: WP-02 finalises them and records them in 02-contract.

## Purpose

Get the learner and the project running: just enough TypeScript to read a test and write one function, the tooling, the vector utilities, and how the interactive visuals work. The rest of TypeScript is taught as the exercises need it (D-029).

## Prerequisites

Programming experience in C++ (the TypeScript boxes compare against C++). No TypeScript. No physics.

## Pills (planned)

| ID | Title | Key idea |
|---|---|---|
| 0.1 | Course overview and the final demo | what we build; how pills, exercises and visuals work |
| 0.2 | Just enough TypeScript | values and types, functions, objects, import and export, reading a test; no pointers or manual memory; everything else arrives with the exercise that needs it |
| 0.3 | Project tour | Vite, Vitest, the renderer, running one test |
| 0.4 | Vector maths utilities and the debug draw API | Vec2 as plain objects, free functions, drawing helpers |
| 0.5 | How to read the interactive visuals | step, scrub, drag; what a trace is |

## Exercises

### Exercise 0: Vec2 operations

- **Covers pills:** 0.1-0.5
- **Files (stubs):** `starter/src/math/vec2.ts`
- **Tests:** `starter/tests/ex0-vec2.test.ts`

**Functions (proposed):**

- `add, sub, scale, negate, dot, cross, crossSV, crossVS, perp, length, lengthSq, normalize (signatures in 02-contract)`

**Behaviour spec:**

- Pure functions: never mutate their arguments.
- `normalize` of the zero vector returns the zero vector.
- `cross(a, b) = a.x*b.y - a.y*b.x`; `crossSV(s, v) = {-s*v.y, s*v.x}`; `crossVS(v, s) = {s*v.y, -s*v.x}`.

**Tests to write** (known-answer tests carry their derivation in a comment):

- add({1,2},{3,4}) = {4,6}; sub, scale and negate likewise.
- dot({1,2},{3,4}) = 1*3 + 2*4 = 11. cross({1,2},{3,4}) = 1*4 - 2*3 = -2.
- cross(a, b) = -cross(b, a) and cross(a, a) = 0 on several seeded random vectors.
- perp({1,0}) = {0,1}, perp({0,1}) = {-1,0}, dot(a, perp(a)) = 0.
- length({3,4}) = 5, lengthSq = 25, normalize({3,4}) = {0.6, 0.8}, normalize({0,0}) = {0,0}.
- crossSV(2, {1,0}) = {0,2} and crossVS({1,0}, 2) = {0,-2}; crossSV(s, v) = -crossVS(v, s).
- Compare numbers with `expectClose`, not `toEqual`: `toEqual` distinguishes -0 from 0 (for example crossSV(2, {1,0}) can produce -0 in x), which would fail correct solutions.

**Hints to write** (1-3, no code): which formula each function is; why perp is a 90 degree counter-clockwise rotation; how to guard the zero-length case

### TypeScript you need here (Exercise 0)

Taught in a short box on the exercise page, only when first needed (D-029): types (`number`, object types, `type` aliases), functions, `export`/`import`, `const` vs `let`, reading a Vitest test (`describe`, `it`, `expect`). C++ comparison: free functions in a namespace; a `type` alias is like a struct declaration but checked structurally.

## Visuals

No must-have visual. Optional V0: a small vector-add widget that doubles as the tutorial for the player controls (pill 0.5).

## Readings

Candidates only. Cite a source in a pill only if it is marked verified in `06-references`.

- TypeScript Handbook (official): candidate for 0.2, to be verified.
- No physics sources needed in this module.

## Work package: turning this spec into content

**Outputs** (create these; write nowhere else):

- `course/m0/pill-0.1-course-overview-and-the-final-demo.md`
- `course/m0/pill-0.2-just-enough-typescript.md`
- `course/m0/pill-0.3-project-tour.md`
- `course/m0/pill-0.4-vector-maths-utilities-and-the-debug-draw-api.md`
- `course/m0/pill-0.5-how-to-read-the-interactive-visuals.md`
- `course/m0/exercise-0.md`
- `starter/tests/ex0-vec2.test.ts`
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
| Tests | general-purpose | Sonnet | medium |
| Visuals | general-purpose | Sonnet | low |
| Review (fresh context, report only) | general-purpose | Opus | high |

## Definition of done

Every pill file exists, is 5-7 minutes, follows the 01-format template and has checkpoint questions and verified readings. Every exercise page has hints 1-3 and its test file, which compiles against the WP-02 stubs. Every formula and known-answer number carries its derivation. The fresh-context review found no unresolved issues.
