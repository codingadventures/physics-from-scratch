// Exercise 4b: dispatching. You implement collide.
import type { Body } from "../dynamics/body";
import type { Manifold } from "./manifold";

/**
 * Collides any two bodies, in any order. Swaps to the canonical argument order
 * of the matching function (see 02-contract), then flips the normal back so it
 * points from the original a to the original b. Plane-plane and static-static
 * pairs return null.
 */
export function collide(a: Body, b: Body): Manifold | null {
  throw new Error("TODO: Exercise 4b, collide");
}
