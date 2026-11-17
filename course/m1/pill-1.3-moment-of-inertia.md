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

Mass measures how hard a body is to _push_: the same force gives a smaller acceleration to a heavier body. The moment of inertia, `I`, is the rotational counterpart: it measures how hard a body is to _spin_. For a torque $\tau$ the angular acceleration is $\alpha = \tau / I$, the twin of $a = F/m$.

Unlike mass, `I` depends on **where the mass is**, not only how much there is. Mass far from the centre counts for more. A figure skater spins slowly with arms out and quickly with arms in, with the same mass in both cases. Two discs of equal mass, one solid and one a thin ring, have different `I`: the ring is harder to spin because all its mass sits at the rim.

Definition: split the body into tiny pieces of mass $dm$, and for each take its squared distance $r^2$ from the centre of mass (the rotation axis, sticking out of the screen):

$$
I = \int r^2 \, dm
$$

Units: kg·m$^2$. In 2D this is a single number per body, because there is only one rotation axis. (In 3D it is a 3×3 matrix.) The body's mass is spread uniformly over its shape, which is the course's assumption. Position, remember, is the centre of mass, so `I` is always about the shape's own centre.

The results we need:

| Shape                                                       | Moment of inertia about its centre |
| ----------------------------------------------------------- | ---------------------------------- |
| Solid disc, mass $m$, radius $r$                            | $\tfrac{1}{2} m r^2$              |
| Solid rectangle, mass $m$, width $w$, height $h$            | $\tfrac{1}{12} m (w^2 + h^2)$     |
| The same rectangle with half-extents $hw = w/2$, $hh = h/2$ | $\tfrac{1}{3} m (hw^2 + hh^2)$    |

The starter code takes half-extents, because `Shape` stores `halfWidth` and `halfHeight`. That is why Exercise 1's `boxInertia(mass, halfWidth, halfHeight)` uses the third row.

## Visual

None.

## The maths

All three come from the same integral. Use a uniform density $\sigma$ (mass per area), so $dm = \sigma\, dA$ and $\sigma = m/\text{area}$.

**Disc.** Use polar coordinates. The area element is $dA = \rho\, d\rho\, d\theta$, with distance $\rho$ from the centre running over $[0, R]$, and angle $\theta$ over $[0, 2\pi]$:

$$
\begin{aligned}
I &= \sigma \int_0^{2\pi} \int_0^R \rho^2 \cdot \rho \, d\rho \, d\theta \\
  &= \sigma \cdot 2\pi \cdot \frac{R^4}{4} \\
  &= \sigma \cdot \frac{\pi R^4}{2}
\end{aligned}
$$

With $\sigma = m / (\pi R^2)$:

$$
I = \frac{m}{\pi R^2} \cdot \frac{\pi R^4}{2} = \frac{m R^2}{2}
$$

**Rectangle.** Put the origin at the centre. A point $(x, y)$ has $r^2 = x^2 + y^2$, and the integral splits into two:

$$
I = \sigma \int_{-h/2}^{h/2} \int_{-w/2}^{w/2} (x^2 + y^2) \, dx \, dy
$$

For the $x^2$ term: $\int_{-w/2}^{w/2} x^2 \, dx = 2 \cdot (w/2)^3 / 3 = w^3/12$, and the $y$ integral just multiplies by $h$. That gives $w^3 h / 12$. By symmetry the $y^2$ term gives $w h^3 / 12$. With $\sigma = m/(w h)$:

$$
I = \frac{m}{w h} \cdot \frac{w^3 h + w h^3}{12} = \frac{m (w^2 + h^2)}{12}
$$

**Half-extents.** Substitute $w = 2\,hw$ and $h = 2\,hh$:

$$
I = \frac{m (4\,hw^2 + 4\,hh^2)}{12} = \frac{m (hw^2 + hh^2)}{3}
$$

**Known answers, with the arithmetic** (these appear in the Exercise 1 tests):

- Circle, $m = 2$, $r = 3$: $I = \tfrac12 \cdot 2 \cdot 3^2 = 9$ kg·m$^2$.
- Box, $m = 12$, $hw = 1$, $hh = 2$: $I = 12 \cdot (1^2 + 2^2)/3 = 12 \cdot 5/3 = 20$ kg·m$^2$. Check through the full-width form: $w = 2$, $h = 4$, $I = 12 \cdot (4 + 16)/12 = 20$. Same.

**Sanity checks.** Compare a disc of radius `r` with a square of half-extent `r` (so it just contains the disc) and the same mass `m`: the square has $I = m \cdot 2r^2/3 \approx 0.667\, m r^2$, against $0.5\, m r^2$ for the disc. The square is larger, as it should be: its corners reach out to $\sqrt{2}\, r$ from the centre. Another check: `I` must grow when you widen the box with the mass fixed, and the formula does.

Finally, `invInertia = 1 / I` for a dynamic body, and `0` for a static one (pill 1.2).

## Common mistakes

- **Using full widths in the half-extent formula.** $m(w^2 + h^2)/12$ takes full width and height; $m(hw^2 + hh^2)/3$ takes half-extents. Mixing them is off by a factor of 4. A box with `hw = 1` is 2 wide.
- **Using `m r²` for a disc.** That is the thin ring. A solid disc has the factor ½.
- **Forgetting `I` is about the centre of mass.** An off-centre rotation axis needs the parallel axis theorem; this course always rotates about the centre.
- **Confusing `I` with mass.** Doubling the size of a box at fixed density multiplies the mass by 4 and $I$ by 16 in 2D, since $I \propto m \cdot \text{length}^2$.

## Checkpoint

1. Without calculating: a disc and a square have the same mass, and the square has half-extent equal to the disc's radius. Which is harder to spin, and why?
2. A box has `m = 3`, `hw = 0.5`, `hh = 1.5`. What is `I`? (Work it with the half-extent formula.)

## Readings

- Essential: Chris Hecker, "Rigid Body Dynamics", second article "Angular Effects", https://www.chrishecker.com/Rigid_Body_Dynamics . We verified the title on the index page; the PDF was not opened, and some equations in these PDFs are garbled, so check formulas against the derivations above.
- Deeper: Ian Millington, _Game Physics Engine Development_, 2nd edition, CRC Press, 2010, ISBN 9780123819765 (publisher page verified). Covers rigid body mechanics in more depth (unverified: we have not read the chapters). Page references wait on the author's copy (OQ-07).
