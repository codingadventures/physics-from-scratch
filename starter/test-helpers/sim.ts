// Given: fixed-step running and physical quantities for behavioural tests.
import type { Vec2 } from "../src/math/vec2";
import type { Body } from "../src/dynamics/body";

/** The fixed timestep used in every behavioural test (02-contract). */
export const DT = 1 / 60;

/** Calls step(dt) n times. after(i) runs after step i (0-based). */
export function runSteps(
  step: (dt: number) => void,
  n: number,
  dt = DT,
  after?: (i: number) => void,
): void {
  for (let i = 0; i < n; i++) {
    step(dt);
    after?.(i);
  }
}

/** Runs round(seconds / dt) steps. Returns the number of steps run. */
export function runForSeconds(
  step: (dt: number) => void,
  seconds: number,
  dt = DT,
  after?: (i: number) => void,
): number {
  const n = Math.round(seconds / dt);
  runSteps(step, n, dt, after);
  return n;
}

/**
 * 0.5*m*|v|^2 + 0.5*I*w^2, with m = 1/invMass and I = 1/invInertia.
 * Static bodies (invMass 0) count as 0; a zero invInertia contributes no rotational term.
 */
export function kineticEnergy(body: Body): number {
  if (body.invMass === 0) return 0;
  const v = body.linearVelocity;
  const linear = (0.5 * (v.x * v.x + v.y * v.y)) / body.invMass;
  const w = body.angularVelocity;
  const angular = body.invInertia === 0 ? 0 : (0.5 * w * w) / body.invInertia;
  return linear + angular;
}

/** Sum of m*v over dynamic bodies. */
export function linearMomentum(bodies: readonly Body[]): Vec2 {
  let x = 0;
  let y = 0;
  for (const b of bodies) {
    if (b.invMass === 0) continue;
    x += b.linearVelocity.x / b.invMass;
    y += b.linearVelocity.y / b.invMass;
  }
  return { x, y };
}

/** True when position, angle and velocities of every body are finite (no NaN or Infinity). */
export function allFinite(bodies: readonly Body[]): boolean {
  return bodies.every((b) =>
    [
      b.position.x,
      b.position.y,
      b.angle,
      b.linearVelocity.x,
      b.linearVelocity.y,
      b.angularVelocity,
    ].every(Number.isFinite),
  );
}
