// Tests for the V1 visual algorithm (given code, not an exercise).
import { describe, expect, it } from "vitest";
import { springEnergies } from "./eulerSpring";

describe("springEnergies", () => {
  it("explicit Euler multiplies energy by exactly 1 + w^2 dt^2 per step", () => {
    // E' = (v - w^2 x dt)^2/2 + w^2 (x + v dt)^2/2 = (1 + w^2 dt^2) E (cross terms cancel).
    const dt = 1 / 60;
    const w = 2 * Math.PI;
    const s = springEnergies(dt, 1, w);
    const factor = 1 + w * w * dt * dt;
    for (let i = 1; i < s.t.length; i++) {
      expect(s.explicit[i]! / s.explicit[i - 1]!).toBeCloseTo(factor, 12);
    }
    // 60 steps: 1.010966^60 = 1.9240 (pill 1.4).
    expect(s.explicit[60]! / s.explicit[0]!).toBeCloseTo(1.924, 3);
  });

  it("semi-implicit Euler stays within w*dt/2 of a constant and never grows", () => {
    // Q = v^2 + w^2 x^2 - w^2 dt x v is conserved exactly; E differs from Q/2 by at most w dt / 2.
    const dt = 1 / 60;
    const w = 2 * Math.PI;
    const s = springEnergies(dt, 10, w);
    const e0 = s.semiImplicit[0]!;
    const bound = (w * dt) / 2; // about 0.0524
    for (const e of s.semiImplicit) {
      expect(Math.abs(e / e0 - 1)).toBeLessThan(2 * bound);
    }
  });
});
