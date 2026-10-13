// Exercise 4a: circle vs plane. You implement circleVsPlane.
import type { Body } from "../dynamics/body";
import type { Manifold } from "./manifold";

/**
 * A is a circle, B is a plane. Returns null when they do not overlap (touching counts as no collision).
 * The normal points from A to B.
 */
export function circleVsPlane(a: Body, b: Body): Manifold | null {
  throw new Error("TODO: Exercise 4a, circleVsPlane");
}
