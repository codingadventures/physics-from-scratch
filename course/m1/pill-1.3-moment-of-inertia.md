---
id: "1.3"
title: "Moment of inertia"
module: "m1"
minutes: 7
prerequisites: ["1.1", "1.2"]
visual: "none"
readings_essential: ["hecker-rigid-body-dynamics"]
readings_deeper: ["millington-game-physics-engine-development"]
---

## The question

How hard is a circle or a box to spin, and what formula gives that number from its mass and size?

## The idea

Mass measures how hard a body is to _push_: the same force gives a smaller acceleration to a heavier body. The moment of inertia, `I`, is the rotational counterpart: it measures how hard a body is to _spin_. For a torque `τ` the angular acceleration is `α = τ / I`, the twin of `a = F / m`.

Unlike mass, `I` depends on **where the mass is**, not only how much there is. Mass far from the centre counts for more. A figure skater spins slowly with arms out and quickly with arms in, with the same mass in both cases. Two discs of equal mass, one solid and one a thin ring, have different `I`: the ring is harder to spin because all its mass sits at the rim.

Definition: split the body into tiny pieces of mass `dm`, and for each take its squared distance `r²` from the centre of mass (the rotation axis, sticking out of the screen):

```
I = ∫ r² dm
```

Units: kg·m². In 2D this is a single number per body, because there is only one rotation axis. (In 3D it is a 3×3 matrix.) The body's mass is spread uniformly over its shape, which is the course's assumption. Position, remember, is the centre of mass, so `I` is always about the shape's own centre.

The results we need:

| Shape                                                       | Moment of inertia about its centre |
| ----------------------------------------------------------- | ---------------------------------- |
| Solid disc, mass `m`, radius `r`                            | `m r² / 2`                         |
| Solid rectangle, mass `m`, width `w`, height `h`            | `m (w² + h²) / 12`                 |
| The same rectangle with half-extents `hw = w/2`, `hh = h/2` | `m (hw² + hh²) / 3`                |

The starter code takes half-extents, because `Shape` stores `halfWidth` and `halfHeight`. That is why Exercise 1's `boxInertia(mass, halfWidth, halfHeight)` uses the third row.

## Visual

None.

## The maths

All three come from the same integral. Use a uniform density `σ` (mass per area), so `dm = σ dA` and `σ = m / area`.

**Disc.** Use polar coordinates. The area element is `dA = ρ dρ dθ`, with distance `ρ` from the centre running over `[0, R]`, and angle `θ` over `[0, 2π]`:

```
I = σ ∫₀^{2π} ∫₀^R ρ² · ρ dρ dθ
  = σ · 2π · R⁴/4
  = σ · π R⁴ / 2
```

With `σ = m / (π R²)`:

```
I = m/(π R²) · π R⁴ / 2 = m R² / 2
```

**Rectangle.** Put the origin at the centre. A point `(x, y)` has `r² = x² + y²`, and the integral splits into two:

```
I = σ ∫_{-h/2}^{h/2} ∫_{-w/2}^{w/2} (x² + y²) dx dy
```

For the `x²` term: `∫_{-w/2}^{w/2} x² dx = 2 · (w/2)³ / 3 = w³/12`, and the `y` integral just multiplies by `h`. That gives `w³ h / 12`. By symmetry the `y²` term gives `w h³ / 12`. With `σ = m / (w h)`:

```
I = m/(w h) · (w³ h + w h³) / 12 = m (w² + h²) / 12
```

**Half-extents.** Substitute `w = 2 hw` and `h = 2 hh`:

```
I = m (4 hw² + 4 hh²) / 12 = m (hw² + hh²) / 3
```

**Known answers, with the arithmetic** (these appear in the Exercise 1 tests):

- Circle, `m = 2`, `r = 3`: `I = ½ · 2 · 3² = 9` kg·m².
- Box, `m = 12`, `hw = 1`, `hh = 2`: `I = 12 · (1² + 2²) / 3 = 12 · 5 / 3 = 20` kg·m². Check through the full-width form: `w = 2`, `h = 4`, `I = 12 · (4 + 16) / 12 = 20`. Same.

**Sanity checks.** Compare a disc of radius `r` with a square of half-extent `r` (so it just contains the disc) and the same mass `m`: the square has `I = m · 2r² / 3 ≈ 0.667 m r²`, against `0.5 m r²` for the disc. The square is larger, as it should be: its corners reach out to `√2 · r` from the centre. Another check: `I` must grow when you widen the box with the mass fixed, and the formula does.

Finally, `invInertia = 1 / I` for a dynamic body, and `0` for a static one (pill 1.2).

## Common mistakes

- **Using full widths in the half-extent formula.** `m (w² + h²) / 12` takes full width and height; `m (hw² + hh²) / 3` takes half-extents. Mixing them is off by a factor of 4. A box with `hw = 1` is 2 wide.
- **Using `m r²` for a disc.** That is the thin ring. A solid disc has the factor ½.
- **Forgetting `I` is about the centre of mass.** An off-centre rotation axis needs the parallel axis theorem; this course always rotates about the centre.
- **Confusing `I` with mass.** Doubling the size of a box at fixed density multiplies the mass by 4 and `I` by 16 in 2D, since `I ∝ m · length²`.

## Checkpoint

1. Without calculating: a disc and a square have the same mass, and the square has half-extent equal to the disc's radius. Which is harder to spin, and why?
2. A box has `m = 3`, `hw = 0.5`, `hh = 1.5`. What is `I`? (Work it with the half-extent formula.)

## Readings

- Essential: Chris Hecker, "Rigid Body Dynamics", second article "Angular Effects", https://www.chrishecker.com/Rigid_Body_Dynamics . We verified the title on the index page; the PDF was not opened, and some equations in these PDFs are garbled, so check formulas against the derivations above.
- Deeper: Ian Millington, _Game Physics Engine Development_, 2nd edition, CRC Press, 2010, ISBN 9780123819765 (publisher page verified). Covers rigid body mechanics in more depth (unverified: we have not read the chapters). Page references wait on the author's copy (OQ-07).
