// Tests for the oracle harness itself, using the bundled Box2D Lite and Box2D engines.
// These run in CI: they check the scoring maths on hand-made traces, and that both bundles
// load and give sane answers. They say nothing about the learner's engine.
import { describe, expect, it } from "vitest";
import { box2d, lite, liteBasic } from "./engines";
import { compareContacts, compareTraces, halfExtents, massOf, record, score } from "./score";
import { sceneById, scenes } from "./scenes";
import type { BodyState, Scene, Trace } from "./types";

const still = (x: number, y: number, angle = 0): BodyState => ({
  position: { x, y },
  angle,
  linearVelocity: { x: 0, y: 0 },
  angularVelocity: 0,
});

describe("scoring maths (hand-made traces)", () => {
  const scene: Scene = {
    id: "t",
    title: "t",
    gravity: { x: 0, y: -10 },
    dt: 0.1,
    seconds: 0.3,
    ground: 0,
    bodies: [
      { shape: { kind: "box", halfWidth: 50, halfHeight: 5 }, position: { x: 0, y: -5 }, mass: 0 },
      {
        shape: { kind: "box", halfWidth: 0.5, halfHeight: 0.5 },
        position: { x: 0, y: 0.5 },
        mass: 2,
      },
    ],
    expect: { restY: { body: 1, y: 0.5, tol: 0.01 }, why: "test" },
  };

  it("mass and inertia: box m(w^2+h^2)/12, disc m r^2/2", () => {
    // Unit box, mass 2: 2 * (1 + 1) / 12 = 1/3.
    expect(massOf(scene.bodies[1]).I).toBeCloseTo(1 / 3, 12);
    // Disc r = 2, mass 3: 0.5 * 3 * 4 = 6.
    const disc = {
      shape: { kind: "circle" as const, radius: 2 },
      position: { x: 0, y: 0 },
      mass: 3,
    };
    expect(massOf(disc).I).toBe(6);
    expect(massOf(scene.bodies[0])).toEqual({ m: 0, I: 0 });
  });

  it("a box turned 45 degrees reaches 0.5*(cos45+sin45) = 0.7071 above and below its centre", () => {
    expect(halfExtents(scene.bodies[1], Math.PI / 4).y).toBeCloseTo(Math.SQRT1_2, 12);
  });

  it("a body resting exactly on the ground scores zero penetration, zero energy change, settled at t = 0", () => {
    const trace: Trace = [0, 0.1, 0.2, 0.3].map((t) => ({
      t,
      bodies: [still(0, -5), still(0, 0.5)],
    }));
    const m = score(scene, trace);
    expect(m.finite).toBe(true);
    expect(m.maxGroundPenetration).toBeCloseTo(0, 12);
    expect(m.energyDrift).toBeCloseTo(0, 12);
    expect(m.maxEnergyGain).toBeCloseTo(0, 12);
    expect(m.settleTime).toBe(0);
    expect(m.restYError).toBeCloseTo(0, 12);
  });

  it("sinking 0.02 into the ground scores penetration 0.02; a box 0.1 too low has restYError -0.1", () => {
    const trace: Trace = [{ t: 0, bodies: [still(0, -5), still(0, 0.48)] }];
    expect(score(scene, trace).maxGroundPenetration).toBeCloseTo(0.02, 12);
    expect(score(scene, [{ t: 0, bodies: [still(0, -5), still(0, 0.4)] }]).restYError).toBeCloseTo(
      -0.1,
      12,
    );
  });

  it("energy: mass 2 at height 0.5 and then 1.5 gains m*g*dh = 2*10*1 = 20 J", () => {
    const trace: Trace = [
      { t: 0, bodies: [still(0, -5), still(0, 0.5)] },
      { t: 0.1, bodies: [still(0, -5), still(0, 1.5)] },
    ];
    const m = score(scene, trace);
    expect(m.maxEnergyGain).toBeCloseTo(20, 9);
    expect(m.energyDrift).toBeCloseTo(20, 9);
  });

  it("NaN is reported as not finite", () => {
    const trace: Trace = [{ t: 0, bodies: [still(0, -5), still(NaN, 0.5)] }];
    expect(score(scene, trace).finite).toBe(false);
  });

  it("settle time is the start of the last calm stretch, null if the run ends moving", () => {
    const moving: BodyState = { ...still(0, 0.5), linearVelocity: { x: 1, y: 0 } };
    const calmLater: Trace = [
      { t: 0, bodies: [still(0, -5), moving] },
      { t: 0.1, bodies: [still(0, -5), still(0, 0.5)] },
      { t: 0.2, bodies: [still(0, -5), still(0, 0.5)] },
    ];
    expect(score(scene, calmLater).settleTime).toBeCloseTo(0.1, 12);
    const endsMoving: Trace = [...calmLater, { t: 0.3, bodies: [still(0, -5), moving] }];
    expect(score(scene, endsMoving).settleTime).toBeNull();
  });

  it("compareTraces and compareContacts report the largest gaps", () => {
    const a: Trace = [{ t: 0, bodies: [still(0, 0), still(3, 4)] }];
    const b: Trace = [{ t: 0, bodies: [still(0, 0), still(0, 0, 0.25)] }];
    const d = compareTraces(a, b);
    expect(d.maxPosition).toBe(5);
    expect(d.maxAngle).toBe(0.25);
    const ca = [
      { a: 0, b: 1, normal: { x: 0, y: 1 }, points: [{ point: { x: 0, y: 0 }, depth: 0.1 }] },
    ];
    const cb = [
      {
        a: 0,
        b: 1,
        normal: { x: 1, y: 0 },
        points: [{ point: { x: 0, y: 0.5 }, depth: 0.04 }],
      },
      { a: 1, b: 2, normal: { x: 0, y: 1 }, points: [] },
    ];
    const c = compareContacts(ca, cb);
    expect(c.maxNormalError).toBeCloseTo(Math.PI / 2, 12);
    expect(c.maxPointError).toBeCloseTo(0.5, 12);
    expect(c.maxDepthError).toBeCloseTo(0.06, 12);
    expect(c.onlyInB).toEqual(["1-2"]);
    // Ignoring the normal offset: the gap (0, 0.5) lies along the normal (0, 1) of ca, so 0.
    expect(compareContacts(ca, cb, { ignoreNormalOffset: true }).maxPointError).toBeCloseTo(0, 12);
  });
});

describe("the bundled engines", () => {
  it("Box2D runs every scene and keeps everything finite", () => {
    for (const scene of scenes) {
      const { trace } = record(box2d, scene);
      expect(score(scene, trace).finite, scene.id).toBe(true);
    }
  });

  it("Lite runs the box scenes it supports and refuses the others", () => {
    for (const scene of scenes) {
      const why = lite.unsupported(scene);
      if (why !== null) {
        expect(
          scene.bodies.some((b) => b.shape.kind === "circle"),
          scene.id,
        ).toBe(true);
        continue;
      }
      expect(score(scene, record(lite, scene).trace).finite, scene.id).toBe(true);
    }
  });

  it("free fall: Lite and Box2D both match hand-rolled semi-implicit Euler to 1e-9", () => {
    // v += g*dt, then x += v*dt (see 02-contract and lesson 1.4). Derived here by hand.
    const scene = sceneById("free-fall");
    let y = scene.bodies[1].position.y;
    let v = 0;
    const expected: number[] = [y];
    for (let i = 0; i < Math.round(scene.seconds / scene.dt); i++) {
      v += scene.gravity.y * scene.dt;
      y += v * scene.dt;
      expected.push(y);
    }
    for (const engine of [lite, liteBasic, box2d]) {
      const { trace } = record(engine, scene);
      const worst = Math.max(
        ...trace.map((f, i) => Math.abs(f.bodies[1].position.y - expected[i])),
      );
      expect(worst, engine.id).toBeLessThan(1e-9);
    }
  });

  it("a box dropped on the ground ends at rest near y = 0.5 in Lite and Box2D", () => {
    const scene = sceneById("box-drop");
    for (const engine of [lite, box2d]) {
      const m = score(scene, record(engine, scene).trace);
      expect(Math.abs(m.restYError ?? 1), engine.id).toBeLessThan(0.02);
      expect(m.settleTime, engine.id).not.toBeNull();
    }
  });

  it("a circle dropped on the ground rests near y = 0.5 in Box2D (S1)", () => {
    const scene = sceneById("circle-drop");
    const m = score(scene, record(box2d, scene).trace);
    expect(Math.abs(m.restYError ?? 1)).toBeLessThan(0.01);
  });

  it("two equal circles with e = 1 exchange velocities in Box2D (S2)", () => {
    const scene = sceneById("circles-head-on");
    const last = record(box2d, scene).trace.at(-1)!;
    expect(last.bodies[0].linearVelocity.x).toBeCloseTo(-2, 2);
    expect(last.bodies[1].linearVelocity.x).toBeCloseTo(2, 2);
  });
});
