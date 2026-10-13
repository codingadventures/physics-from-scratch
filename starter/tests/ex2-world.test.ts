// Exercise 2: AABBs and the World. These tests fail until you implement
// src/world/aabb.ts and the TODO methods in src/world/world.ts.
// The World tests also use your Exercise 1 code (createBody, integrate).
// Every expected value is derived in a comment, so you can check it by hand.
import { describe, expect, it } from "vitest";
import type { Body, BodyDef } from "../src/dynamics/body";
import type { Manifold } from "../src/narrowphase/manifold";
import { computeAABB } from "../src/world/aabb";
import { World } from "../src/world/world";
import {
  box,
  circle,
  expectClose,
  expectVecClose,
  plane,
  runSteps,
  seededRng,
} from "../test-helpers";

const circleDef = (x: number, y: number, mass = 1): BodyDef => ({
  shape: { kind: "circle", radius: 0.5 },
  position: { x, y },
  mass,
});

describe("computeAABB", () => {
  it("circle at (1,2), r = 0.5: min (0.5,1.5), max (1.5,2.5)", () => {
    // position -/+ radius on both axes.
    const aabb = computeAABB(circle(0, { x: 1, y: 2 }, 0.5));
    expectVecClose(aabb.min, { x: 0.5, y: 1.5 });
    expectVecClose(aabb.max, { x: 1.5, y: 2.5 });
  });

  it("box hw = 2, hh = 1 at angle 0 has half-extents (2, 1)", () => {
    // Centre (3,-1): min (3-2, -1-1) = (1,-2), max (3+2, -1+1) = (5,0).
    const aabb = computeAABB(box(0, { x: 3, y: -1 }, 2, 1));
    expectVecClose(aabb.min, { x: 1, y: -2 });
    expectVecClose(aabb.max, { x: 5, y: 0 });
  });

  it("box hw = 2, hh = 1 at angle pi/2 has half-extents (1, 2)", () => {
    // ex = |cos a| hw + |sin a| hh = 0*2 + 1*1 = 1; ey = |sin a| hw + |cos a| hh = 1*2 + 0*1 = 2.
    // cos(pi/2) is about 6e-17 in floating point, hence the 1e-12 tolerance.
    const aabb = computeAABB(box(0, { x: 0, y: 0 }, 2, 1, { angle: Math.PI / 2 }));
    expectVecClose(aabb.min, { x: -1, y: -2 }, 1e-12);
    expectVecClose(aabb.max, { x: 1, y: 2 }, 1e-12);
  });

  it("unit square (hw = hh = 1) at pi/4 has half-extents sqrt(2)", () => {
    // ex = ey = cos(pi/4) + sin(pi/4) = 2 * (sqrt(2)/2) = sqrt(2): the corner points along an axis.
    const aabb = computeAABB(box(0, { x: 0, y: 0 }, 1, 1, { angle: Math.PI / 4 }));
    expectVecClose(aabb.max, { x: Math.SQRT2, y: Math.SQRT2 }, 1e-12);
    expectVecClose(aabb.min, { x: -Math.SQRT2, y: -Math.SQRT2 }, 1e-12);
  });

  it("a rotated box's AABB is the tightest box around its four corners", () => {
    // The corners are centre + R(angle) (+/-hw, +/-hh). Every corner must be inside the
    // AABB, and each side of the AABB must touch at least one corner (no slack).
    const rng = seededRng(2);
    for (let i = 0; i < 200; i++) {
      const centre = rng.vec2(-5, 5);
      const hw = rng.range(0.1, 3);
      const hh = rng.range(0.1, 3);
      const angle = rng.range(-Math.PI, Math.PI);
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      const corners = [
        [-hw, -hh],
        [hw, -hh],
        [hw, hh],
        [-hw, hh],
      ].map(([x, y]) => ({ x: centre.x + c * x - s * y, y: centre.y + s * x + c * y }));

      const aabb = computeAABB(box(0, centre, hw, hh, { angle }));
      const eps = 1e-9;
      for (const p of corners) {
        expect(p.x).toBeGreaterThanOrEqual(aabb.min.x - eps);
        expect(p.x).toBeLessThanOrEqual(aabb.max.x + eps);
        expect(p.y).toBeGreaterThanOrEqual(aabb.min.y - eps);
        expect(p.y).toBeLessThanOrEqual(aabb.max.y + eps);
      }
      expectClose(aabb.min.x, Math.min(...corners.map((p) => p.x)), eps);
      expectClose(aabb.max.x, Math.max(...corners.map((p) => p.x)), eps);
      expectClose(aabb.min.y, Math.min(...corners.map((p) => p.y)), eps);
      expectClose(aabb.max.y, Math.max(...corners.map((p) => p.y)), eps);
    }
  });

  it("a plane's AABB is unbounded on both axes", () => {
    // A half-space has no finite bounds; the broadphase treats it conservatively.
    const aabb = computeAABB(plane(0, { x: 0, y: 1 }, 0));
    expect(aabb.min).toEqual({ x: -Infinity, y: -Infinity });
    expect(aabb.max).toEqual({ x: Infinity, y: Infinity });
  });
});

describe("World bodies", () => {
  it("addBody gives ids 0, 1, 2 in order and keeps the bodies in order", () => {
    const world = new World();
    const a = world.addBody(circleDef(0, 0));
    const b = world.addBody(circleDef(1, 0));
    const c = world.addBody(circleDef(2, 0));
    expect([a.id, b.id, c.id]).toEqual([0, 1, 2]);
    expect(world.bodies).toEqual([a, b, c]);
  });

  it("removeBody removes it, and its id is never reused", () => {
    const world = new World();
    world.addBody(circleDef(0, 0));
    const b = world.addBody(circleDef(1, 0));
    world.removeBody(b);
    expect(world.bodies.map((x) => x.id)).toEqual([0]);
    expect(world.gather().map((g) => g.body.id)).toEqual([0]);
    // Ids 0 and 1 have been handed out, so the next one is 2.
    expect(world.addBody(circleDef(2, 0)).id).toBe(2);
  });

  it("gather returns every body with its AABB", () => {
    const world = new World();
    world.addBody(circleDef(1, 2));
    const gathered = world.gather();
    expect(gathered).toHaveLength(1);
    // Circle r = 0.5 at (1,2): same numbers as the computeAABB test above.
    expectVecClose(gathered[0].aabb.min, { x: 0.5, y: 1.5 });
    expectVecClose(gathered[0].aabb.max, { x: 1.5, y: 2.5 });
  });
});

describe("World.step", () => {
  it("integrates gravity like Exercise 1 (default gravity (0, -9.81))", () => {
    // 60 steps from rest: y = -9.81 * 60 * 61 / (2 * 3600) = -4.98675 (derived in ex1).
    const world = new World();
    const b = world.addBody(circleDef(0, 0));
    runSteps((dt) => world.step(dt), 60);
    expectClose(b.position.y, -4.98675, 1e-9);
  });

  it("uses the gravity it was given", () => {
    // gravity (2, 0), one step from rest: v = 2/60, x = v/60 = 2/3600.
    const world = new World({ gravity: { x: 2, y: 0 } });
    const b = world.addBody(circleDef(0, 0));
    world.step(1 / 60);
    expectClose(b.position.x, 2 / 3600, 1e-12);
    expectClose(b.position.y, 0, 1e-12);
  });

  it("static bodies stay put", () => {
    const world = new World();
    const ground = world.addBody(circleDef(0, -1, 0));
    runSteps((dt) => world.step(dt), 30);
    expectVecClose(ground.position, { x: 0, y: -1 });
  });

  it("gather after a step reflects the new positions", () => {
    // One step from rest: y = -9.81/3600 = -0.002725, so the AABB moves down by that much.
    const world = new World();
    world.addBody(circleDef(0, 0));
    world.step(1 / 60);
    const [g] = world.gather();
    expectClose(g.aabb.min.y, -0.5 - 0.002725, 1e-12);
    expectClose(g.aabb.max.y, 0.5 - 0.002725, 1e-12);
  });

  it("runs the stages in order: integrate, broadphase, narrowphase, solver", () => {
    const calls: string[] = [];
    let yWhenBroadphaseRan = NaN;
    let pairSeen: [number, number] | null = null;
    let manifoldsSeen: Manifold[] | null = null;
    let dtSeen = NaN;

    const world = new World({
      broadphase: {
        findPairs(bodies: readonly Body[]) {
          calls.push("broadphase");
          yWhenBroadphaseRan = bodies[0].position.y;
          return [[bodies[0], bodies[1]]];
        },
      },
      narrowphase(a, b) {
        calls.push("narrowphase");
        pairSeen = [a.id, b.id];
        return { a, b, normal: { x: 1, y: 0 }, points: [{ point: { x: 0, y: 0 }, depth: 0.1 }] };
      },
      solver(manifolds, dt) {
        calls.push("solver");
        manifoldsSeen = manifolds;
        dtSeen = dt;
      },
    });
    world.addBody(circleDef(0, 0));
    world.addBody(circleDef(0.5, 0));
    world.step(1 / 60);

    expect(calls).toEqual(["broadphase", "narrowphase", "solver"]);
    // Integration comes first: the broadphase already sees the moved body
    // (y = -0.002725 after one step from rest, derived above).
    expectClose(yWhenBroadphaseRan, -0.002725, 1e-12);
    expect(pairSeen).toEqual([0, 1]);
    expect(manifoldsSeen).toHaveLength(1);
    expect(dtSeen).toBe(1 / 60);
  });

  it("uses a stage assigned after construction", () => {
    // The stages are public fields (02-contract). Exercise 5c plugs in the solver
    // this way, so step must read the field when it runs, not a copy taken earlier.
    let solverCalls = 0;
    const world = new World({
      broadphase: { findPairs: (bodies: readonly Body[]) => [[bodies[0], bodies[1]]] },
      narrowphase: (a, b) => ({ a, b, normal: { x: 1, y: 0 }, points: [] }),
    });
    world.addBody(circleDef(0, 0));
    world.addBody(circleDef(0.5, 0));
    world.solver = () => {
      solverCalls++;
    };
    world.step(1 / 60);
    expect(solverCalls).toBe(1);
  });

  it("calls the narrowphase once per pair from the broadphase", () => {
    let narrowCalls = 0;
    const world = new World({
      broadphase: {
        findPairs: (bodies: readonly Body[]) => [
          [bodies[0], bodies[1]],
          [bodies[0], bodies[2]],
        ],
      },
      narrowphase: () => {
        narrowCalls++;
        return null;
      },
    });
    world.addBody(circleDef(0, 0));
    world.addBody(circleDef(1, 0));
    world.addBody(circleDef(2, 0));
    world.step(1 / 60);
    expect(narrowCalls).toBe(2);
  });
});
