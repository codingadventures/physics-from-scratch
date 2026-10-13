---
section: "12-open-questions"
status: drafted
depends_on: []
owner: unassigned
outputs: ["docs/plan/12-open-questions/README.md"]
definition_of_done: "Every question is answered, or has an accepted default, and the answer is recorded in 11-decisions."
---


# 12 Open questions

Owner of every answer is the author unless stated. A default applies if the author does not answer.

| ID | Question | Default | Blocks |
|---|---|---|---|
| OQ-01 | Copyright holder name (and year) for the licence files | **Answered:** Gio Campo, 2026 (D-023) | nothing |
| OQ-02 | Repository name, blog name and domain (suggested repository name: `physics-from-scratch`) | **Repository answered:** public `codingadventures/physics-from-scratch` (D-024). Blog name and domain still open. | WP-04 titles |
| OQ-03 | Blog target: how many journal posts, what cadence | none set | nothing |
| OQ-04 | Spelling variant for prose | British English | nothing (a later pass can normalise) |
| OQ-05 | Test validation without reference solutions. Default: known-answer tests with derivations, a fresh-context review that re-derives expected values, and the author as the oracle. Option: agents validate tests against a throwaway reference in a temporary folder outside the repository, deleted afterwards (spoiler risk if it sits on the author's machine). | default | nothing |
| OQ-06 | Approve and freeze `02-contract` | **Answered:** frozen 2026-10-13 (D-027) | nothing |
| OQ-07 | Which PDFs, with title and edition, and how they will be provided | none | pill drafting |
| OQ-08 | Astro vs something simpler for the site | Astro, if WP-04 verifies the deployment steps | WP-04 |
| OQ-09 | Pills as plain `.md` in `course/` with visual markers, ingested by the site | as stated; WP-04 confirms feasibility | WP-04 |
| OQ-10 | Final Tracer API | WP-03 proposes, the author approves | WP-03 |
| OQ-11 | Visuals need algorithm implementations to run, and there are no reference solutions | small standalone implementations under `starter/src/visuals/algos/`, separate from the learner's stubs | visual work |
| OQ-12 | Where the author's published solutions live (branch, folder or separate repository) | undecided | nothing yet |
| OQ-13 | Exercise 4a covers five pills, over the 3-4 guideline. Split as 4a = 4.1-4.4 and 4b = 4.5-4.8? | leave as is; revisit when drafting Module 4 | M4 drafting |
| OQ-14 | Is Module 0 (about 1.5 h of TypeScript for C++ developers) enough, or is a longer primer needed? | **Answered:** neither; TypeScript is taught as you go, compared with C++ (D-029) | nothing |
| OQ-15 | `World.step` runs gather before broadphase, but `Broadphase.findPairs` takes `Body[]`, not the gathered AABBs, so gather has no consumer in `step` (R1 finding). Say gather is for the renderer and debugging only, or change the step order? | gather is for rendering and debugging; the ex2 test does not assert when gather runs | ex2 tests |
| OQ-16 | Does `collide` return a manifold with `a` = original a and `b` = original b (so the normal still points from `m.a` to `m.b`)? The contract says only "flips the normal back" (R1 finding). | yes: a, b and the normal all refer to the original argument order | ex4b tests, M4 pills |
| OQ-17 | Is the solver stage called with only non-null manifolds, and is it called on a step with no manifolds? (R1 finding) | only non-null manifolds; ex2 tests assert nothing that depends on the empty case | ex2 tests |
| OQ-18 | The m5 spec lists `world.ts` as an Exercise 5c file, but in WP-02 the solver is plugged in by assigning `world.solver`, so `world.ts` does not change. Who builds that closure (iterations, percent, slop) for the S1-S6 tests: each test, or a given helper? | a given helper in `test-helpers/`, written with the ex5c tests | ex5c and ex6 tests |
