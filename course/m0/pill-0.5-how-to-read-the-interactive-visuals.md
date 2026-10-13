---
id: "0.5"
title: "How to read the interactive visuals"
module: "m0"
minutes: 6
prerequisites: ["0.3", "0.4"]
visual: "v0-vector-add"
readings_essential: []
readings_deeper: []
---

## The question

How do the step-through visuals in this course work, and how do you get the most from them?

## The idea

A visual in this course is not an illustration drawn by hand. It runs the actual algorithm, and the algorithm describes each step as it goes. That description is called a **trace**.

**What a trace is.** An algorithm calls `trace.step(label, prims, values)` at the moments worth showing. Here `label` is a sentence, `prims` is a list of shapes to draw (the same `point`, `segment`, `arrow`, `circle`, `polygon` and `text` primitives as pill 0.4), and `values` is a few named numbers. Outside a recording, `trace` does nothing, so tests and exercise signatures never depend on it. A visual turns recording on with `recordTrace(fn)`, which runs `fn`, collects every step as a **frame** and returns a `Recording`. Each frame stores its label, its primitives, its values and the names of the groups it sits in (`trace.begin("a + b")` opens a group, `trace.end()` closes it). Primitives are copied when recorded, so changing a body afterwards cannot rewrite an earlier frame.

**The player.** `createPlayer` takes a recording and replays it one frame at a time. You can:

- press the previous and next buttons, or **focus the player and use the left and right arrow keys**;
- press **play** (or Space) to advance automatically, about 0.8 s per frame by default, and press again to pause;
- **scrub** with the slider to jump to any step;
- read the counter, for example `3 / 3`, to see where you are.

Below the picture you see the group path and label of the current frame, and a panel of its values. Whole numbers appear as they are; others are rounded to four decimals for display. Nothing moves unless you ask: under the browser's reduced-motion setting the player never starts itself, and in demo 0 it waits for you either way.

**Dragging.** Some visuals have **handles**: points you can grab. Mouse, pen and touch all work through the same pointer events. A handle has a grab radius of 14 CSS pixels, and the cursor turns into a grab hand when you are over one. When you drag, the visual calls the algorithm again with the new input, records a new trace and keeps your current step. So you are watching the real code respond to your input, not a recording of one example.

**The colours.** They carry a meaning that stays the same across the course, and visuals label the shapes that matter, so colour is rarely the only cue:

| Colour           | Meaning                                            |
| ---------------- | -------------------------------------------------- |
| blue             | body or vector **a**                               |
| orange           | body or vector **b**                               |
| grey (muted)     | something already seen earlier in the walk-through |
| gold (highlight) | the thing this step produces                       |
| green            | a contact normal (later modules)                   |
| pink             | a contact point (later modules)                    |

Both colour schemes (light and dark) follow your system setting.

**Worked example: demo 0.** Run `npm run demo:0` from `starter/` (pill 0.3). The picture shows vectors a = (2, 1) and b = (1, 2) on a grid with 1 m squares. The y axis points up, as in the contract. The trace has three frames:

1. "Start with a, from the origin." A blue arrow from (0, 0) to (2, 1). Values: a.x = 2, a.y = 1.
2. "Place b at the tip of a." An orange arrow from the tip of a, (2, 1), to (3, 3). Values: b.x = 1, b.y = 2.
3. "a + b goes from the origin to the tip of b." Both earlier arrows turn grey and a gold arrow runs from the origin to (3, 3). Values: sum.x = 3, sum.y = 3.

The demo opens on the last frame (`3 / 3`), so step back with the left arrow to watch the build-up. Then drag the tip of a, or the tip of the orange arrow, and watch both the picture and the numbers change.

```ts
const recording = recordTrace(() => tracedVectorAdd(a, b));
const player = createPlayer(container, recording, {
  center: { x: 1.5, y: 1.5 },
  pixelsPerMetre: 60,
});
```

That is the whole recipe: run the algorithm inside `recordTrace`, hand the result to the player. The vector addition behind it, in `starter/src/visuals/algos/vectorAdd.ts`, is deliberately separate from your Exercise 0 code so the demo works before you write anything. Files in that folder solve small pieces of the maths the visuals show, so read the pill first.

## Visual

<!-- visual: v0-vector-add -->

## The maths

The only arithmetic in demo 0 is vector addition: add the components. With a = (2, 1) and b = (1, 2), the sum is (2 + 1, 1 + 2) = (3, 3). Tip to tail, you start at the origin, move by a to reach (2, 1), then move by b to reach (2 + 1, 1 + 2) = (3, 3). Order does not matter, because (1 + 2, 2 + 1) is the same point. When you drag a handle, the demo recomputes b as the dragged sum minus a (the second handle sits at the sum), so `a + b` always equals where the handle is.

## Common mistakes

- **Looking only at the last frame.** The point is the order of steps. Step back and forwards.
- **Reading grey as unimportant.** Grey means "already explained". The new thing in a frame is drawn in a stronger colour.
- **Dragging empty space.** Only a handle responds, within 14 pixels. Watch for the grab cursor.
- **Forgetting keyboard focus.** The arrow keys work once the player has focus (click it or tab to it).
- **Thinking the visual is a separate model.** It runs the same algorithm the engine uses, so a surprising picture is information.

## Checkpoint

1. At step 2 of demo 0, which numbers are in the values panel, and where does the orange arrow start?
2. You drag the tip of the sum arrow in demo 0. Which of a and b changes, and why does the other stay put?

## Readings

- None for this pill. No source in the course's verified list covers it, and the pill relies on the repository's own code.
