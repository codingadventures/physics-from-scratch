---
section: "02-contract"
status: drafted
depends_on: ["00-goal", "01-format"]
owner: unassigned
outputs: ["docs/plan/02-contract/README.md", "starter/src/ (types and stubs, built by WP-02)"]
definition_of_done: "The author approves it and sets status to frozen. After that, changes need an entry in 11-decisions."
---


# 02 Contract

**Status: drafted, not yet frozen.** Once frozen, every lesson, stub and test depends on this. The Tracer API at the bottom is a proposal that WP-03 finalises.

## Conventions

| Topic | Convention |
|---|---|
| Units | metres, seconds, kilograms, radians |
| Axes | y up in the world. The renderer flips for the canvas. |
| Rotation | counter-clockwise positive. `angle` rotates a body about its position. |
| Position | the body's centre of mass, which is the geometric centre of a circle or box |
| Vectors | plain `{ x, y }` objects and free functions (`add(a, b)`). No operator tricks, no mutation. Allocation cost is ignored on purpose. |
| Bodies | mutable records, updated in place by `integrate` and the solver. Vector functions never mutate. |
| Static body | inverse mass 0 and inverse inertia 0 |
| Plane | unit `normal` and `offset d`. The solid half-space is `dot(normal, p) <= d`. Planes must be static. `position` and `angle` of a plane body are ignored. |
| Manifold normal | unit vector pointing from body A to body B |
| Penetration depth | positive when overlapping. Touching exactly counts as no collision (narrowphase returns null). |
| Contact point | world space. The midpoint of the penetration region along the normal. |
| AABB overlap | inclusive: touching AABBs overlap (broadphase is conservative) |
| Pair order | broadphase pairs are `[a, b]` with `a.id < b.id`, no duplicates |
| Mixing | friction = sqrt(frictionA x frictionB). Restitution = max(restitutionA, restitutionB). These are this course's choices. |
| Timestep | fixed `dt = 1/60` in all behavioural tests |
| Float tolerance | `expectClose(a, b, 1e-6)` for geometry, looser for simulated results |
| Tracing | optional ambient `trace` module, no-op by default, never required by tests or exercise signatures |

## Core types

```ts
export type Vec2 = { x: number; y: number };

export type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "box"; halfWidth: number; halfHeight: number }
  | { kind: "plane"; normal: Vec2; offset: number };

export type Body = {
  id: number;
  shape: Shape;
  position: Vec2;
  angle: number;
  linearVelocity: Vec2;
  angularVelocity: number;
  invMass: number;
  invInertia: number;
  restitution: number;
  friction: number;
};

// Proposed defaults: angle 0, velocities 0, restitution 0, friction 0.5.
// mass 0 means static. A non-static plane makes createBody throw.
export type BodyDef = {
  shape: Shape;
  position: Vec2;
  angle?: number;
  linearVelocity?: Vec2;
  angularVelocity?: number;
  mass: number;
  restitution?: number;
  friction?: number;
};

export type AABB = { min: Vec2; max: Vec2 };

export type ContactPoint = { point: Vec2; depth: number };
export type Manifold = { a: Body; b: Body; normal: Vec2; points: ContactPoint[] };

export interface Broadphase {
  findPairs(bodies: readonly Body[]): Array<[Body, Body]>;
}
```

## Vec2 functions (Exercise 0)

```ts
add(a, b): Vec2         sub(a, b): Vec2        scale(a, s): Vec2      negate(a): Vec2
dot(a, b): number       cross(a, b): number    // a.x*b.y - a.y*b.x
crossSV(s, v): Vec2     // scalar x vector: { x: -s*v.y, y: s*v.x }
crossVS(v, s): Vec2     // vector x scalar: { x: s*v.y, y: -s*v.x }
perp(a): Vec2           // 90 degrees counter-clockwise: { x: -a.y, y: a.x }
length(a): number       lengthSq(a): number
normalize(a): Vec2      // zero vector returns the zero vector
```

## Exercise signatures

The signatures for Exercises 1-5c are proposed in each module spec (`08-modules`). WP-02 finalises them and records the final table here, and the author approves it as part of freezing this contract.

## Narrowphase signatures

Every narrowphase function has the shape `(a: Body, b: Body) => Manifold | null`. Argument order is fixed by the name:

| Function | A | B |
|---|---|---|
| `circleVsCircle` | circle | circle |
| `circleVsPlane` | circle | plane |
| `boxVsPlane` | box | plane |
| `circleVsBox` | circle | box |
| `boxVsBox` | box | box |

`collide(a, b)` in `dispatch.ts` accepts any pair in any order, swaps to the canonical order and flips the normal back. Plane-plane and static-static pairs return null.

| | circle | box | plane |
|---|---|---|---|
| **circle** | circleVsCircle | circleVsBox | circleVsPlane |
| **box** | circleVsBox (swapped) | boxVsBox | boxVsPlane |
| **plane** | circleVsPlane (swapped) | boxVsPlane (swapped) | none |

## Tracer API (proposal, finalised by WP-03)

```ts
export type DrawPrim =
  | { kind: "point"; p: Vec2; label?: string }
  | { kind: "segment"; a: Vec2; b: Vec2; label?: string }
  | { kind: "arrow"; from: Vec2; to: Vec2; label?: string }
  | { kind: "circle"; c: Vec2; r: number }
  | { kind: "polygon"; pts: Vec2[] }
  | { kind: "text"; p: Vec2; text: string };

export interface Trace {
  readonly enabled: boolean;
  begin(title: string): void;
  step(label: string, prims: DrawPrim[], values?: Record<string, number>): void;
  end(): void;
}
```

## Change policy

After freezing, a change needs: an entry in `11-decisions`, the author's approval, and a list of affected lessons, stubs and tests. Agents never change this file on their own.
