// Exercise 4a: circle vs circle. You implement circleVsCircle.
import type { Body } from "../dynamics/body";
import type { Manifold } from "./manifold";

/**
 * A is a circle, B is a circle. Returns null when they do not overlap (touching counts as no collision).
 * The normal points from A to B.
 */
export function circleVsCircle(a: Body, b: Body): Manifold | null {
  throw new Error("TODO: Exercise 4a, circleVsCircle");
}
