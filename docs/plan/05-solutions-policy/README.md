---
section: "05-solutions-policy"
status: drafted
depends_on: ["01-format"]
owner: unassigned
outputs: ["docs/plan/05-solutions-policy/README.md"]
definition_of_done: "The author has reviewed the policy and the test-validation approach (OQ-05)."
---


# 05 Solutions policy

## Current policy

1. **No reference solutions exist, and agents do not write any.** The repository contains stubs and tests only. This was the author's decision: if stuck while learning, the author asks Claude directly, outside the repository.
2. **The author's solutions become the published solutions.** The author does the course first. Passing solutions are added with a short "what I did and why" note per exercise, in a location to be decided (OQ-12; the original idea was a `solutions` branch). Until then that location stays empty.
3. **Hint ladder per exercise, written by agents without code:** (1) a nudge about where to look, (2) the approach in words, (3) pseudocode. The full solution (4) is the author's, added later. Hints describe approaches, never complete implementations.
4. **Quality gate:** a solution is only published if it passes every test, including behavioural ones. A fragile solution gets a limitation note, not silent approval.

## Consequences to manage

- **Tests cannot be validated against a reference.** A wrong or over-tight test is only caught when a correct solution fails it. Mitigations: known-answer tests with derivations in comments; a fresh-context review of each test file that re-derives the expected values; the author flagging any failing test they think is wrong; tolerances for behavioural tests tuned when the author's first solution passes them. See OQ-05 for an optional stronger approach.
- **Learners without the author's solutions yet** only have hints 1-3 until the author's solutions are published.
- **Site visuals** need their own small algorithm implementations (see 04-visual-layer, OQ-11).
