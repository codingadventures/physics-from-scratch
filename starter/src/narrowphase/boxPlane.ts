// Exercise 4a: box vs plane. You implement boxVsPlane.
import type { Body } from "../dynamics/body";
import type { Manifold } from "./manifold";

/**
 * A is a box, B is a plane. Returns null when they do not overlap (touching counts as no collision).
 * The normal points from A to B.
 */
export function boxVsPlane(a: Body, b: Body): Manifold | null {
  throw new Error("TODO: Exercise 4a, boxVsPlane");
}
