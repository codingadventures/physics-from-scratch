// Exercise 2: world-space bounding boxes. You implement computeAABB.
import type { Vec2 } from "../math/vec2";
import type { Body } from "../dynamics/body";

/** Given: an axis-aligned bounding box. Do not change this type. */
export type AABB = { min: Vec2; max: Vec2 };

/**
 * The world-space AABB of a body at its current position and angle.
 * A plane's AABB is unbounded: min (-Infinity, -Infinity), max (Infinity, Infinity).
 */
export function computeAABB(body: Body): AABB {
  throw new Error("TODO: Exercise 2, computeAABB");
}
