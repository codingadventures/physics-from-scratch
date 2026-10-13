// Exercise 1: bodies, inertia and integration. These tests fail until you implement
// src/dynamics/shapes.ts, src/dynamics/body.ts and src/dynamics/integrate.ts.
// Every expected value is derived in a comment, so you can check it by hand.
import { describe, expect, it } from "vitest";
import { boxInertia, circleInertia } from "../src/dynamics/shapes";
import { createBody } from "../src/dynamics/body";
import type { BodyDef } from "../src/dynamics/body";
import type { Shape } from "../src/dynamics/shapes";
import { integrate } from "../src/dynamics/integrate";
import { DT, expectClose, expectVecClose, runSteps } from "../test-helpers";

const G = { x: 0, y: -9.81 };
const NO_GRAVITY = { x: 0, y: 0 };

const circleDef = (mass: number, extra: Partial<BodyDef> = {}): BodyDef => ({
  shape: { kind: "circle", radius: 0.5 },
  position: { x: 0, y: 0 },
  mass,
  ...extra,
});

describe("moments of inertia", () => {
  it("disc: m = 2, r = 3 gives 9", () => {
    // I = m r^2 / 2 = 2 * 9 / 2 = 9
    expectClose(circleInertia(2, 3), 9);
  });
  it("rectangle: m = 12, hw = 1, hh = 2 gives 20", () => {
    // I = m (w^2 + h^2) / 12 with w = 2 hw = 2 and h = 2 hh = 4:
    // 12 * (4 + 16) / 12 = 20. Equivalently m (hw^2 + hh^2) / 3 = 12 * 5 / 3 = 20.
    expectClose(boxInertia(12, 1, 2), 20);
  });
  it("scales linearly with mass", () => {
    // Both formulas are m times a shape factor, so doubling m doubles I.
    expectClose(circleInertia(4, 3), 2 * circleInertia(2, 3));
    expectClose(boxInertia(24, 1, 2), 2 * boxInertia(12, 1, 2));
  });
});

describe("createBody", () => {
  it("computes inverse mass and inverse inertia for a circle", () => {
    // m = 4: invMass = 1/4 = 0.25. I = 4 * 0.5^2 / 2 = 0.5, so invInertia = 2.
    const b = createBody(circleDef(4), 7);
    expectClose(b.invMass, 0.25);
    expectClose(b.invInertia, 2);
  });
  it("computes inverse inertia for a box", () => {
    // m = 12, hw = 1, hh = 2: I = 20 (see above), so invInertia = 1/20 = 0.05.
    const b = createBody(
      { shape: { kind: "box", halfWidth: 1, halfHeight: 2 }, position: { x: 0, y: 0 }, mass: 12 },
      0,
    );
    expectClose(b.invMass, 1 / 12);
    expectClose(b.invInertia, 0.05);
  });
  it("keeps the id and the shape", () => {
    const b = createBody(circleDef(1), 7);
    expect(b.id).toBe(7);
    expect(b.shape).toEqual({ kind: "circle", radius: 0.5 });
  });
  it("mass 0 makes a static body: invMass 0 and invInertia 0", () => {
    // 02-contract: a static body has inverse mass 0 and inverse inertia 0.
    const b = createBody(circleDef(0), 0);
    expectClose(b.invMass, 0);
    expectClose(b.invInertia, 0);
  });
  it("applies the defaults", () => {
    // 02-contract: angle 0, velocities 0, restitution 0, friction 0.5.
    const b = createBody(circleDef(1, { position: { x: 1, y: 2 } }), 0);
    expectVecClose(b.position, { x: 1, y: 2 });
    expectClose(b.angle, 0);
    expectVecClose(b.linearVelocity, { x: 0, y: 0 });
    expectClose(b.angularVelocity, 0);
    expect(b.restitution).toBe(0);
    expect(b.friction).toBe(0.5);
  });
  it("uses the values given instead of the defaults", () => {
    const b = createBody(
      circleDef(1, {
        angle: 0.3,
        linearVelocity: { x: 1, y: -1 },
        angularVelocity: 2,
        restitution: 0.4,
        friction: 0.1,
      }),
      0,
    );
    expect(b.angle).toBe(0.3);
    expectVecClose(b.linearVelocity, { x: 1, y: -1 });
    expect(b.angularVelocity).toBe(2);
    expect(b.restitution).toBe(0.4);
    expect(b.friction).toBe(0.1);
  });
  it("a plane with mass is an error; a static plane is fine", () => {
    // 02-contract: planes must be static, and a non-static plane makes createBody throw.
    const plane: Shape = { kind: "plane", normal: { x: 0, y: 1 }, offset: 0 };
    expect(() => createBody({ shape: plane, position: { x: 0, y: 0 }, mass: 1 }, 0)).toThrow();
    const ground = createBody({ shape: plane, position: { x: 0, y: 0 }, mass: 0 }, 0);
    expectClose(ground.invMass, 0);
    expectClose(ground.invInertia, 0);
  });
});

describe("integrate (semi-implicit Euler)", () => {
  it("one step from rest already moves the body (velocity first, then position)", () => {
    // v1 = 0 + g dt = -9.81/60. y1 = 0 + v1 dt = -9.81/3600 = -0.002725.
    // (Explicit Euler would update position with the old velocity 0 and leave y1 = 0.)
    const b = createBody(circleDef(1), 0);
    integrate(b, DT, G);
    expectClose(b.linearVelocity.y, -9.81 / 60, 1e-12);
    expectClose(b.position.y, -0.002725, 1e-12);
  });

  it("free fall for 60 steps matches the discrete formula", () => {
    // After n steps: v_n = -g n dt and y_n = -g dt^2 (1 + 2 + ... + n) = -g dt^2 n (n + 1) / 2.
    // n = 60, dt = 1/60: v = -9.81 * 60/60 = -9.81.
    // y = -9.81 * 60 * 61 / (2 * 3600) = -9.81 * 0.508333... = -4.98675.
    const b = createBody(circleDef(1), 0);
    runSteps((dt) => integrate(b, dt, G), 60);
    expectClose(b.linearVelocity.y, -9.81, 1e-9);
    expectClose(b.position.y, -4.98675, 1e-9);
    expectClose(b.position.x, 0, 1e-12);
  });

  it("free fall stays within 0.1 of the exact answer after 1 s", () => {
    // Exact: y = -g t^2 / 2 = -4.905 at t = 1. The discrete answer -4.98675 differs
    // by 0.08175, the discretisation error of a 1/60 s step.
    const b = createBody(circleDef(1), 0);
    runSteps((dt) => integrate(b, dt, G), 60);
    expectClose(b.position.y, -4.905, 0.1);
  });

  it("gravity is an acceleration: the result does not depend on mass", () => {
    const light = createBody(circleDef(1), 0);
    const heavy = createBody(circleDef(10), 1);
    runSteps((dt) => {
      integrate(light, dt, G);
      integrate(heavy, dt, G);
    }, 30);
    expectClose(light.position.y, heavy.position.y, 1e-12);
    expectClose(light.linearVelocity.y, heavy.linearVelocity.y, 1e-12);
  });

  it("constant angular velocity: w = 2 for 1 s turns the body by 2 rad", () => {
    // angle_n = n * w * dt = 60 * 2 / 60 = 2.
    const b = createBody(circleDef(1, { angularVelocity: 2 }), 0);
    runSteps((dt) => integrate(b, dt, NO_GRAVITY), 60);
    expectClose(b.angle, 2, 1e-9);
    expectClose(b.angularVelocity, 2, 1e-12);
  });

  it("without gravity, velocity is unchanged and position = x0 + v t", () => {
    // 120 steps of 1/60 s is t = 2. x = 1 + 3 * 2 = 7, y = 2 + (-1) * 2 = 0.
    const b = createBody(
      circleDef(1, { position: { x: 1, y: 2 }, linearVelocity: { x: 3, y: -1 } }),
      0,
    );
    runSteps((dt) => integrate(b, dt, NO_GRAVITY), 120);
    expectVecClose(b.linearVelocity, { x: 3, y: -1 }, 1e-12);
    expectVecClose(b.position, { x: 7, y: 0 }, 1e-9);
  });

  it("static bodies do not move under gravity", () => {
    const b = createBody(circleDef(0, { position: { x: 1, y: 2 } }), 0);
    runSteps((dt) => integrate(b, dt, G), 60);
    expectVecClose(b.position, { x: 1, y: 2 });
    expectVecClose(b.linearVelocity, { x: 0, y: 0 });
    expectClose(b.angle, 0);
  });
});
