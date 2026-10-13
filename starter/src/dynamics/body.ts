// Exercise 1: creating bodies. You implement createBody.
import type { Vec2 } from "../math/vec2";
import type { Shape } from "./shapes";

/**
 * Given: a rigid body. Do not change this type.
 * Bodies are mutable records, updated in place by integrate and the solver.
 * position is the centre of mass. A static body has invMass 0 and invInertia 0.
 */
export type Body = {
  id: number;
  shape: Shape;
  position: Vec2;
  angle: number;
  linearVelocity: Vec2;
  angularVelocity: number;
  invMass: number;
  invInertia: number;
  restitution: number;
  friction: number;
};

/**
 * Given: what you pass to createBody. Do not change this type.
 * mass 0 means static. Defaults: angle 0, velocities 0, restitution 0, friction 0.5.
 */
export type BodyDef = {
  shape: Shape;
  position: Vec2;
  angle?: number;
  linearVelocity?: Vec2;
  angularVelocity?: number;
  mass: number;
  restitution?: number;
  friction?: number;
};

/**
 * Build a Body from a BodyDef: apply the defaults and compute invMass and invInertia.
 * mass 0 gives a static body. A plane with mass > 0 must throw.
 */
export function createBody(def: BodyDef, id: number): Body {
  throw new Error("TODO: Exercise 1, createBody");
}
