// Tests for the pill 0.4 visual algorithms (given code, not an exercise).
import { describe, expect, it } from "vitest";
import { recordTrace } from "../../trace/trace";
import { tracedCross, tracedDot, tracedProjection } from "./vectorProducts";

// The visuals start from a = (3, 1), b = (1, 2):
//   dot   = 3*1 + 1*2 = 5
//   cross = 3*2 - 1*1 = 5
//   |a| = sqrt(10), |b| = sqrt(5), cos = 5 / sqrt(50) = 1/sqrt(2), so the angle is 45 degrees
//   and |a||b| sin(45) = sqrt(50) / sqrt(2) = 5, matching the cross.
const a = { x: 3, y: 1 };
const b = { x: 1, y: 2 };

describe("vector product visuals", () => {
  it("dot is 5, shadow length is 5 / sqrt(10), angle 45 degrees", () => {
    const rec = recordTrace(() => expect(tracedDot(a, b)).toBe(5));
    expect(rec.frames).toHaveLength(3);
    const last = rec.frames[2]!.values;
    expect(last["shadow length"]).toBeCloseTo(5 / Math.sqrt(10), 12);
    expect(last["|a| × shadow"]).toBeCloseTo(5, 12); // |a| * (dot / |a|) = dot
    expect(last["angle (degrees)"]).toBeCloseTo(45, 9);
  });

  it("cross is 5, positive because b is counter-clockwise from a; swapping flips the sign", () => {
    const rec = recordTrace(() => expect(tracedCross(a, b)).toBe(5));
    expect(rec.frames).toHaveLength(3);
    expect(rec.frames[2]!.label).toContain("counter-clockwise");
    expect(rec.frames[2]!.values["sin(angle)"]).toBeCloseTo(Math.SQRT1_2, 12);
    expect(tracedCross(b, a)).toBe(-5);
  });

  it("projection: along = 5/sqrt(10), across = 5/sqrt(10), and along^2 + across^2 = |b|^2 = 5", () => {
    // n = a / sqrt(10); along = b.n = 5/sqrt(10); across = cross(n, b) = (3*2 - 1*1)/sqrt(10) = 5/sqrt(10).
    const { along, across } = tracedProjection(a, b);
    expect(along).toBeCloseTo(5 / Math.sqrt(10), 12);
    expect(across).toBeCloseTo(5 / Math.sqrt(10), 12);
    expect(along * along + across * across).toBeCloseTo(5, 12);
  });

  it("a zero vector does not produce NaN", () => {
    const zero = { x: 0, y: 0 };
    const rec = recordTrace(() => {
      tracedDot(zero, b);
      tracedCross(zero, b);
      tracedProjection(zero, b);
    });
    for (const f of rec.frames)
      for (const v of Object.values(f.values)) expect(Number.isNaN(v)).toBe(false);
  });
});
