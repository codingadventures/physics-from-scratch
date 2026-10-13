// Given: assertions for floating-point results.
import { expect } from "vitest";
import type { Vec2 } from "../src/math/vec2";

/** Default tolerance for geometry (02-contract). Simulated results use looser ones. */
export const GEOMETRY_TOL = 1e-6;

/**
 * Passes when |actual - expected| <= tol. Unlike toEqual it treats -0 and 0 as equal.
 * Equal infinities pass. NaN never passes.
 */
export function expectClose(actual: number, expected: number, tol = GEOMETRY_TOL): void {
  if (actual === expected) return;
  const ok = Math.abs(actual - expected) <= tol;
  expect(ok, `expected ${actual} to be within ${tol} of ${expected}`).toBe(true);
}

/** expectClose on both components. */
export function expectVecClose(actual: Vec2, expected: Vec2, tol = GEOMETRY_TOL): void {
  const ok =
    (actual.x === expected.x || Math.abs(actual.x - expected.x) <= tol) &&
    (actual.y === expected.y || Math.abs(actual.y - expected.y) <= tol);
  expect(
    ok,
    `expected (${actual.x}, ${actual.y}) to be within ${tol} of (${expected.x}, ${expected.y})`,
  ).toBe(true);
}
