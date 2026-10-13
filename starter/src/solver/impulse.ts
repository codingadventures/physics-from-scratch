// Exercises 5a, 5b and 5c: collision response. You implement every function in this file.
import type { Vec2 } from "../math/vec2";
import type { Body } from "../dynamics/body";
import type { ContactPoint, Manifold } from "../narrowphase/manifold";

// Exercise 5a: linear normal impulse with restitution.

/** dot(vB - vA, normal), linear velocities only. Negative means approaching. */
export function relativeNormalVelocity(a: Body, b: Body, normal: Vec2): number {
  throw new Error("TODO: Exercise 5a, relativeNormalVelocity");
}

/** Applies the normal impulse to m.a and m.b, ignoring rotation and contact points. */
export function solveNormalImpulseLinear(m: Manifold): void {
  throw new Error("TODO: Exercise 5a, solveNormalImpulseLinear");
}

// Exercise 5b: rotation and friction.

/** Applies impulse at offset r from the centre of mass: changes linear and angular velocity. */
export function applyImpulse(body: Body, impulse: Vec2, r: Vec2): void {
  throw new Error("TODO: Exercise 5b, applyImpulse");
}

/** Normal impulse (with rotation) and Coulomb friction for one contact point of m. */
export function solveContact(m: Manifold, point: ContactPoint): void {
  throw new Error("TODO: Exercise 5b, solveContact");
}

// Exercise 5c: iteration and positional correction.

/** Calls solveContact on every contact point of every manifold, iterations times, in a fixed order. */
export function solveContacts(manifolds: Manifold[], iterations: number): void {
  throw new Error("TODO: Exercise 5c, solveContacts");
}

/** Pushes m.a and m.b apart along the normal to remove penetration beyond slop. */
export function positionalCorrection(m: Manifold, percent: number, slop: number): void {
  throw new Error("TODO: Exercise 5c, positionalCorrection");
}
