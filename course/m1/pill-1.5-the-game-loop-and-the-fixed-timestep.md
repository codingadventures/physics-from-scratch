---
id: "1.5"
title: "The game loop and the fixed timestep"
module: "m1"
minutes: 6
prerequisites: ["1.4"]
visual: "none"
readings_essential: ["fiedler-fix-your-timestep"]
readings_deeper: []
---

## The question

The screen refreshes at its own rate and frames take uneven time. How do we advance the physics so that it behaves the same on every machine?

## The idea

The obvious loop measures how long the last frame took and passes that to the physics: `step(frameTime)`. This is a **variable timestep**. It keeps the game at the right speed on any hardware, but the _results_ now depend on the machine. In pill 1.4 we found that a free-falling body's position error is `½ g t dt`, proportional to the step size. At `t = 1 s` that error is about `9.81 / 60 / 2 = 0.082 m` at 60 Hz, but `9.81 / 30 / 2 = 0.164 m` at 30 Hz and `9.81 / 144 / 2 = 0.034 m` at 144 Hz. The same jump lands at different heights on different machines. Worse, collision code assumes bodies move a modest distance per step: with a huge `dt` a fast body skips over a thin wall (tunnelling), and springs can blow up (pill 1.4).

The fix is to decouple the two clocks:

- **Physics** always advances in identical steps of a fixed `dt` (we use `1/60`).
- **Rendering** happens once per screen refresh, whenever that is.

The glue is an **accumulator**: a number holding real time that has passed but has not yet been simulated. Each frame:

```ts
accumulator += frameTime;
while (accumulator >= dt) {
  step(dt);
  accumulator -= dt;
}
render();
```

Whole steps are taken out of the accumulator; the leftover (less than one `dt`) waits for the next frame. On a 144 Hz screen, a frame lasts about 6.9 ms, so most frames take zero steps (the state does not change, and `render` draws the same picture again) and about one frame in 2.4 takes a step. On a 30 Hz screen, a frame lasts 33 ms, so each frame takes about two steps. Either way the physics sees exactly `dt` each time. The tests use the same fixed `dt = 1/60`, which is why a test and a demo agree.

## Visual

None.

## The maths

The given file `starter/src/render/loop.ts` implements the pattern as `startLoop(options)`. Its behaviour, accurately:

- `options.step(dt)` advances the simulation; `options.render()` draws; `options.dt` defaults to `1/60`.
- Each animation frame it measures the real elapsed time in seconds from the browser's timestamps and caps it at `MAX_FRAME_TIME = 0.25`. If the tab was hidden for a minute, the next frame simulates at most a quarter of a second.
- If not paused, it adds `elapsed * timeScale` to the accumulator, then runs `step(dt)` while the accumulator is at least `dt`, subtracting `dt` each time. Then it calls `render()` once.
- `timeScale` scales the _time fed in_, not `dt`. At `0.25` the physics runs a quarter as many steps per second, each still exactly `dt`, so slow motion behaves like normal motion, just slower.
- `pause()` stops the accumulator growing. `resume()` zeroes the accumulator and resets the clock, so paused time is not replayed. `stepOnce()` runs one step and a render, ignoring the accumulator.

**The cap and the spiral of death.** Suppose one `step` call takes longer in real time than the `dt` of game time it covers. Then each frame the accumulator grows faster than it is drained, the next frame needs even more steps, which takes even longer: the game freezes. The cap limits the damage: `0.25 / (1/60) = 15`, so at most about 15 steps per frame. Past that point the game simply runs slower than real time rather than locking up. A small engine with tens of bodies should never spiral, but the cap is still reached in ordinary use: return to a tab that sat in the background, and the first frame reports a long gap that the cap trims to 0.25 s.

**Render lag.** `render` draws the latest physics state, but the leftover in the accumulator (up to one `dt`, 16.7 ms) is real time the picture has not caught up with. The result is a slight judder on screens whose rate is not a multiple of 60. The usual cure is to draw an interpolation between the previous and current state, which Fiedler's article describes. Our loop does not; it draws the latest state as it is. Interpolation would mean keeping a copy of the previous state, for a cosmetic gain only.

**What fixed does not buy.** The steps are identical in size, but the course makes no promise of bit-identical results across machines or runs (D-005: no determinism guarantee). A fixed `dt` gives _similar_, not identical, behaviour.

Where does the code you write sit? `integrate(body, dt, gravity)` is called with `dt` as an argument. It never reads a clock. That is what lets the tests call it 60 times with `1/60` and get exact answers, no browser involved.

## Common mistakes

- **Passing frame time to the physics.** Different machines, different behaviour, and occasional huge steps.
- **No cap on the elapsed time.** Alt-tabbing away and back would ask for thousands of steps.
- **Reading the clock inside the physics.** Keep `dt` a parameter; the clock belongs to the loop.
- **Thinking `timeScale` changes `dt`.** It changes how much real time is fed in; every step is still `dt`.

## Checkpoint

1. The loop has `dt = 1/60` and a frame arrives 40 ms after the last one, with an empty accumulator. How many steps run, and how much time is left in the accumulator?
2. Why can't a game just run `step(frameTime)` and fix tunnelling by making walls thicker?

## Readings

- Essential: Glenn Fiedler, "Fix Your Timestep!", Gaffer On Games, 10 Jun 2004, https://gafferongames.com/post/fix_your_timestep/ . The variable, semi-fixed and fixed timestep approaches, the accumulator, the spiral of death, and interpolation.
