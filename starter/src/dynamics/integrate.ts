// Exercise 1: integration. You implement integrate.
import type { Vec2 } from "../math/vec2";
import type { Body } from "./body";

/**
 * Advance one body by dt with semi-implicit Euler, in place.
 * gravity is an acceleration. Static bodies (invMass 0) do not change.
 */
export function integrate(body: Body, dt: number, gravity: Vec2): void {
  throw new Error("TODO: Exercise 1, integrate");
}
