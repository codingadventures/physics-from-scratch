---
section: "08-modules/m6-capstone"
status: drafted
depends_on: ["01-format", "02-contract", "03-repo-spec", "04-visual-layer"]
owner: unassigned
outputs: ["course/m6/pill-6.1-putting-it-together.md", "course/m6/pill-6.2-the-debug-toolkit.md", "course/m6/pill-6.3-retrospective.md"]
definition_of_done: "Every pill file exists, is 5-7 minutes, follows the 01-format template and has checkpoint questions and verified readings. Every exercise page has hints 1-3 and its test file, which compiles against the WP-02 stubs. Every formula and known-answer number carries its derivation. The fresh-context review found no unresolved issues."
---

# M6 Capstone (~2h)

Spec drafted; pills, exercise pages and tests are not written yet. Function signatures below are proposals: WP-02 finalises them and records them in 02-contract.

## Purpose

Put the whole engine together, learn the debug toolkit, and take stock of what the basic engine does and does not do.

## Prerequisites

Modules 0-5 complete.

## Pills (planned)

| ID | Title | Key idea |
|---|---|---|
| 6.1 | Putting it together | scenes: ball pit, ramp, box drop |
| 6.2 | The debug toolkit | pause, step, slow motion, contact inspector, recording and scrubbing a simulation |
| 6.3 | Retrospective | what you built, what is missing, where the advanced track goes |

## Exercises

None. See the notes: capstone checks only, no new stubs.

## Visuals

- The simulation recorder (a widget type in 04-visual-layer) powers pill 6.2 and the demos. It is given code built in WP-03.
- No new must-have visuals.

## Readings

Candidates only. Cite a source in a pill only if it is marked verified in `06-references`.

- Revisit the references used in earlier modules. No new sources needed.

## Work package: turning this spec into content

**Outputs** (create these; write nowhere else):

- `course/m6/pill-6.1-putting-it-together.md`
- `course/m6/pill-6.2-the-debug-toolkit.md`
- `course/m6/pill-6.3-retrospective.md`
- `starter/tests/ex6-capstone.test.ts`
- `starter/src/demos/demo6.ts`
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
| Capstone checks and demos | general-purpose | Sonnet | medium |
| Review (fresh context, report only) | general-purpose | Opus | high |

## Notes

Capstone checks are not an exercise: there are no new stubs. They are smoke tests the learner's finished engine must pass: S5 (ball pit of 20 circles between a floor and two walls for 10 s: no NaN or Infinity, nothing escapes the bounds) and S6 (mixed circles and boxes for 10 s: no NaN, no body above 50 m/s, nothing escapes the bounds), in `starter/tests/ex6-capstone.test.ts`. Demo scenes live in `starter/src/demos/demo6.ts`. S4 (tilted box comes to rest) is best effort with the basic solver.

## Definition of done

Every pill file exists, is 5-7 minutes, follows the 01-format template and has checkpoint questions and verified readings. Every exercise page has hints 1-3 and its test file, which compiles against the WP-02 stubs. Every formula and known-answer number carries its derivation. The fresh-context review found no unresolved issues.
