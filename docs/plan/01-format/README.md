---
section: "01-format"
status: drafted
depends_on: ["00-goal"]
owner: unassigned
outputs: ["docs/plan/01-format/README.md"]
definition_of_done: "Templates are agreed by the author and used unchanged by every module work package."
---


# 01 Format

## Elements

| Element | Rule |
|---|---|
| Pill | One page, one idea, 5-7 minutes. Guideline: roughly 600-1000 words of prose plus the visual and formulas. A reviewer checks the reading time. |
| Checkpoint | 1-2 questions at the end of each pill, answerable without code |
| Exercise | After every 3-4 pills. Implement stubs until the tests pass |
| Demo | Each module ends with a browser demo using debug draw |
| Interactive visual | Maths-heavy pills embed one (see 04-visual-layer) |
| Reading list | 1-3 sources per pill, split into essential and deeper. Only verified sources (see 06-references). |

Time estimates are guesses. They assume some prior physics and game-development experience: someone new to TypeScript and physics should plan on 1.5-2x.

## File naming

```
course/m1/pill-1.1-what-a-rigid-body-is.md
course/m1/exercise-1.md
```

## Pill template

```markdown
---
id: "1.1"
title: "What a rigid body is"
module: "m1"
minutes: 6
prerequisites: []
visual: "none"            # or a visual id from 04-visual-layer
readings_essential: []    # ids from 06-references, verified only
readings_deeper: []
---

## The question
(One or two sentences: what this pill answers.)

## The idea
(The concept in plain language.)

## Visual
<!-- visual: visual-id -->   (marker the site replaces with the widget)

## The maths
(Short derivation. Every formula is derived or sourced.)

## Common mistakes

## Checkpoint
1. ...
2. ...

## Readings
- Essential: ...
- Deeper: ...
```

## Exercise page template

```markdown
---
id: "exercise-1"
module: "m1"
files: ["starter/src/dynamics/body.ts"]
tests: ["starter/tests/ex1-rigid-body.test.ts"]
---

## Goal
## What to implement
(Each function: signature, behaviour, edge cases.)

## How to check
(Commands, and what a pass looks like.)

## Hints
1. Where to look
2. The approach in words
3. Pseudocode

## Demo
```

## Test kinds

1. **Pure maths and geometry:** exact input and output (overlap tests, manifolds).
2. **Behavioural:** fixed timestep with tolerances (a ball rests at `y = r`, energy never grows).
3. **Visual only:** no test, covered by the module demo.

Every known-answer test carries its derivation in a comment, because there is no reference solution to check it against.

## Language

English. Spelling variant: OQ-04 (default British).
