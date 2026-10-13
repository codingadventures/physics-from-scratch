// Exercise 4a: circle vs box. You implement circleVsBox.
import type { Body } from "../dynamics/body";
import type { Manifold } from "./manifold";

/**
 * A is a circle, B is a box. Returns null when they do not overlap (touching counts as no collision).
 * The normal points from A to B.
 */
export function circleVsBox(a: Body, b: Body): Manifold | null {
  throw new Error("TODO: Exercise 4a, circleVsBox");
}
