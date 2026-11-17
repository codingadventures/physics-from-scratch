// npm run oracle, Milestone 1: your integrate against hand-rolled semi-implicit Euler, Box2D
// Lite and Box2D. Free fall has no contact, so every engine should agree to rounding error.
//
// Skipped until Exercise 1 (createBody, integrate) is solved.
import { describe, expect, it } from "vitest";
import { integrate } from "../src/dynamics/integrate";
import { createBody } from "../src/dynamics/body";
import { box2d, lite } from "./lib/engines";
import { sceneById } from "./lib/scenes";
import { record } from "./lib/score";

const isTodo = (e: unknown): boolean =>
  e instanceof Error && e.message.startsWith("TODO: Exercise");

describe("M1: integration agrees with the oracles", () => {
  it("free fall for 3 s matches Lite and Box2D to 1e-9", (ctx) => {
    const scene = sceneById("free-fall");
    const def = scene.bodies[1];
    const steps = Math.round(scene.seconds / scene.dt);
    const mine: number[] = [];
    try {
      const body = createBody(
        { shape: def.shape, position: { ...def.position }, mass: def.mass },
        1,
      );
      mine.push(body.position.y);
      for (let i = 0; i < steps; i++) {
        integrate(body, scene.dt, scene.gravity);
        mine.push(body.position.y);
      }
    } catch (e) {
      if (isTodo(e)) return ctx.skip();
      throw e;
    }
    for (const engine of [lite, box2d]) {
      const { trace } = record(engine, scene);
      const worst = Math.max(...trace.map((f, i) => Math.abs(f.bodies[1].position.y - mine[i])));
      // Derivation: v1 = v0 + g*dt, y1 = y0 + v1*dt. Box2D and Lite do the same in this order.
      expect(worst, `${engine.label} vs your integrate`).toBeLessThan(1e-9);
    }
  });
});
