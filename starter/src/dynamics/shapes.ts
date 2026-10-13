// Exercise 1: moments of inertia. You implement the functions in this file.
import type { Vec2 } from "../math/vec2";

/**
 * Given: the three shapes. Do not change this type.
 * A plane is the solid half-space dot(normal, p) <= offset, with a unit normal.
 * Planes are always static.
 */
export type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "box"; halfWidth: number; halfHeight: number }
  | { kind: "plane"; normal: Vec2; offset: number };

/** Moment of inertia of a solid disc about its centre. */
export function circleInertia(mass: number, radius: number): number {
  throw new Error("TODO: Exercise 1, circleInertia");
}

/** Moment of inertia of a solid rectangle about its centre. */
export function boxInertia(mass: number, halfWidth: number, halfHeight: number): number {
  throw new Error("TODO: Exercise 1, boxInertia");
}
