// Exercise 0: Vec2 operations. These tests fail until you implement src/math/vec2.ts.
// Every expected value is derived in a comment, so you can check it by hand.
import { describe, expect, it } from "vitest";
import {
  add,
  cross,
  crossSV,
  crossVS,
  dot,
  length,
  lengthSq,
  negate,
  normalize,
  perp,
  scale,
  sub,
  type Vec2,
} from "../src/math/vec2";
import { expectClose, expectVecClose, seededRng } from "../test-helpers";

// Numbers are compared with a tolerance, never with toEqual: toEqual tells -0
// from 0, and a correct crossSV(2, {1,0}) may produce -0 in x.

describe("add, sub, scale, negate", () => {
  it("add({1,2},{3,4}) = {4,6}", () => {
    // (1 + 3, 2 + 4) = (4, 6)
    expectVecClose(add({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 });
  });
  it("sub({1,2},{3,4}) = {-2,-2}", () => {
    // (1 - 3, 2 - 4) = (-2, -2)
    expectVecClose(sub({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: -2, y: -2 });
  });
  it("scale({1,2}, 3) = {3,6}", () => {
    // (1 * 3, 2 * 3) = (3, 6)
    expectVecClose(scale({ x: 1, y: 2 }, 3), { x: 3, y: 6 });
  });
  it("negate({1,-2}) = {-1,2}", () => {
    expectVecClose(negate({ x: 1, y: -2 }), { x: -1, y: 2 });
  });
});

describe("dot and cross", () => {
  it("dot({1,2},{3,4}) = 11", () => {
    // 1*3 + 2*4 = 3 + 8 = 11
    expectClose(dot({ x: 1, y: 2 }, { x: 3, y: 4 }), 11);
  });
  it("cross({1,2},{3,4}) = -2", () => {
    // a.x*b.y - a.y*b.x = 1*4 - 2*3 = -2
    expectClose(cross({ x: 1, y: 2 }, { x: 3, y: 4 }), -2);
  });
  it("cross(x axis, y axis) = 1 (counter-clockwise is positive)", () => {
    // 1*1 - 0*0 = 1
    expectClose(cross({ x: 1, y: 0 }, { x: 0, y: 1 }), 1);
  });
  it("cross(a, b) = -cross(b, a) and cross(a, a) = 0 on random vectors", () => {
    // a.x*b.y - a.y*b.x = -(b.x*a.y - b.y*a.x); with b = a both terms cancel.
    const rng = seededRng(7);
    for (let i = 0; i < 50; i++) {
      const a = rng.vec2(-10, 10);
      const b = rng.vec2(-10, 10);
      expectClose(cross(a, b), -cross(b, a), 1e-9);
      expectClose(cross(a, a), 0, 1e-9);
    }
  });
});

describe("crossSV and crossVS", () => {
  it("crossSV(2, {1,0}) = {0,2}", () => {
    // { x: -s*v.y, y: s*v.x } = { -2*0, 2*1 } = { -0, 2 }
    expectVecClose(crossSV(2, { x: 1, y: 0 }), { x: 0, y: 2 });
  });
  it("crossVS({1,0}, 2) = {0,-2}", () => {
    // { x: s*v.y, y: -s*v.x } = { 2*0, -2*1 } = { 0, -2 }
    expectVecClose(crossVS({ x: 1, y: 0 }, 2), { x: 0, y: -2 });
  });
  it("crossSV(s, v) = -crossVS(v, s) on random inputs", () => {
    // crossSV = (-s*v.y, s*v.x) and crossVS = (s*v.y, -s*v.x): component-wise negatives.
    const rng = seededRng(11);
    for (let i = 0; i < 50; i++) {
      const s = rng.range(-5, 5);
      const v = rng.vec2(-10, 10);
      const a = crossSV(s, v);
      const b = crossVS(v, s);
      expectVecClose(a, { x: -b.x, y: -b.y }, 1e-9);
    }
  });
});

describe("perp", () => {
  it("rotates 90 degrees counter-clockwise", () => {
    // perp(a) = (-a.y, a.x): (1,0) -> (-0, 1) and (0,1) -> (-1, 0)
    expectVecClose(perp({ x: 1, y: 0 }), { x: 0, y: 1 });
    expectVecClose(perp({ x: 0, y: 1 }), { x: -1, y: 0 });
  });
  it("is perpendicular: dot(a, perp(a)) = 0", () => {
    // a.x*(-a.y) + a.y*a.x = 0
    const rng = seededRng(3);
    for (let i = 0; i < 50; i++) {
      const a = rng.vec2(-10, 10);
      expectClose(dot(a, perp(a)), 0, 1e-9);
    }
  });
});

describe("length and normalize", () => {
  it("length({3,4}) = 5 and lengthSq({3,4}) = 25", () => {
    // 3^2 + 4^2 = 9 + 16 = 25, sqrt(25) = 5
    expectClose(lengthSq({ x: 3, y: 4 }), 25);
    expectClose(length({ x: 3, y: 4 }), 5);
  });
  it("normalize({3,4}) = {0.6, 0.8}", () => {
    // (3/5, 4/5)
    expectVecClose(normalize({ x: 3, y: 4 }), { x: 0.6, y: 0.8 });
  });
  it("normalize({0,0}) = {0,0}", () => {
    // Contract: the zero vector returns the zero vector (no division by zero, no NaN).
    expectVecClose(normalize({ x: 0, y: 0 }), { x: 0, y: 0 });
  });
  it("normalize gives unit length on random non-zero vectors", () => {
    // Components in [-10, 10): a zero vector is practically impossible, and
    // the seed is fixed, so the run is repeatable.
    const rng = seededRng(5);
    for (let i = 0; i < 50; i++) {
      const v = rng.vec2(-10, 10);
      expectClose(length(normalize(v)), 1, 1e-9);
    }
  });
});

describe("purity", () => {
  it("never mutates its arguments", () => {
    const a: Vec2 = { x: 1, y: 2 };
    const b: Vec2 = { x: 3, y: 4 };
    add(a, b);
    sub(a, b);
    scale(a, 2);
    negate(a);
    perp(a);
    normalize(b);
    crossSV(2, a);
    crossVS(a, 2);
    expect(a).toEqual({ x: 1, y: 2 });
    expect(b).toEqual({ x: 3, y: 4 });
  });
  it("returns a new object, not one of its arguments", () => {
    // Returning an argument would let a later change to the result change the
    // caller's vector, which breaks the "never mutate" rule in 02-contract.
    const a: Vec2 = { x: 1, y: 2 };
    const zero: Vec2 = { x: 0, y: 0 };
    expect(add(a, zero)).not.toBe(a);
    expect(scale(a, 1)).not.toBe(a);
    expect(normalize(zero)).not.toBe(zero);
  });
});
