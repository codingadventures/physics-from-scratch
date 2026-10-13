// Exercise 4b: box vs box. You implement boxVsBox.
import type { Body } from "../dynamics/body";
import type { Manifold } from "./manifold";

/**
 * A is a box, B is a box. Returns null when they do not overlap (touching counts as no collision).
 * The normal points from A to B.
 */
export function boxVsBox(a: Body, b: Body): Manifold | null {
  throw new Error("TODO: Exercise 4b, boxVsBox");
}
