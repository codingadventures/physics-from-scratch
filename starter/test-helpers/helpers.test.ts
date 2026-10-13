// Tests for the given helpers themselves (not an exercise).
import { describe, expect, it } from "vitest";
import {
  allFinite,
  circle,
  expectClose,
  expectVecClose,
  kineticEnergy,
  linearMomentum,
  plane,
  runForSeconds,
  seededRng,
} from "./index";

describe("expectClose", () => {
  it("treats -0 and 0 as equal and accepts values within tolerance", () => {
    expectClose(-0, 0);
    expectClose(1 + 1e-7, 1);
    expectClose(Infinity, Infinity);
    expectVecClose({ x: -0, y: 1 }, { x: 0, y: 1 });
  });
  it("rejects values outside tolerance and NaN", () => {
    expect(() => expectClose(1.1, 1)).toThrow();
    expect(() => expectClose(NaN, NaN)).toThrow();
    expect(() => expectVecClose({ x: 0, y: 0 }, { x: 0, y: 1e-3 })).toThrow();
  });
});

describe("seededRng", () => {
  it("repeats for the same seed and stays in range", () => {
    const a = seededRng(42);
    const b = seededRng(42);
    for (let i = 0; i < 1000; i++) {
      const x = a.range(-2, 3);
      expect(x).toBe(b.range(-2, 3));
      expect(x).toBeGreaterThanOrEqual(-2);
      expect(x).toBeLessThan(3);
    }
  });
  it("differs for different seeds", () => {
    expect(seededRng(1).next()).not.toBe(seededRng(2).next());
  });
});

describe("runForSeconds", () => {
  it("runs round(seconds / dt) steps", () => {
    let calls = 0;
    // 2 s at 1/60 s per step: 2 * 60 = 120 steps.
    expect(runForSeconds(() => calls++, 2)).toBe(120);
    expect(calls).toBe(120);
  });
});

describe("physical quantities", () => {
  it("kinetic energy: m = 2, v = (3,4), I = 4, w = 2 gives 33", () => {
    // Linear: 0.5 * 2 * (9 + 16) = 25. Angular: 0.5 * 4 * 2^2 = 8. Total 33.
    const b = circle(0, { x: 0, y: 0 }, 1, {
      invMass: 0.5,
      invInertia: 0.25,
      linearVelocity: { x: 3, y: 4 },
      angularVelocity: 2,
    });
    expectClose(kineticEnergy(b), 33);
  });
  it("momentum skips static bodies", () => {
    // Dynamic: m = 2 (invMass 0.5), v = (1, -1) gives (2, -2). The plane is static.
    const a = circle(0, { x: 0, y: 0 }, 1, { invMass: 0.5, linearVelocity: { x: 1, y: -1 } });
    const p = plane(1, { x: 0, y: 1 }, 0);
    expectVecClose(linearMomentum([a, p]), { x: 2, y: -2 });
  });
  it("allFinite catches NaN", () => {
    const a = circle(0, { x: 0, y: 0 }, 1);
    expect(allFinite([a])).toBe(true);
    a.angularVelocity = NaN;
    expect(allFinite([a])).toBe(false);
  });
});
