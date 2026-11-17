// Compares the learner's frames with the oracle's trace, field by field.
import type { BodyState, Trace } from "../../../../starter/oracle/lib/types";

export type Mismatch = {
  frame: number;
  body: number;
  field: string;
  mine: number;
  oracle: number;
};

export type Comparison = {
  /** Largest absolute difference over every body, frame and field. */
  maxError: number;
  /** The earliest field that differs by more than the tolerance, or null. */
  first: Mismatch | null;
  /** Largest absolute difference per body (same order as the scene's bodies). */
  perBody: number[];
};

const fields: Array<[string, (s: BodyState) => number]> = [
  ["position.x", (s) => s.position.x],
  ["position.y", (s) => s.position.y],
  ["angle", (s) => s.angle],
  ["linearVelocity.x", (s) => s.linearVelocity.x],
  ["linearVelocity.y", (s) => s.linearVelocity.y],
  ["angularVelocity", (s) => s.angularVelocity],
];

export function compare(mine: BodyState[][], oracle: Trace, tolerance: number): Comparison {
  let maxError = 0;
  let first: Mismatch | null = null;
  const perBody: number[] = oracle[0].bodies.map(() => 0);
  for (let frame = 0; frame < oracle.length; frame++) {
    for (let body = 0; body < oracle[frame].bodies.length; body++) {
      for (const [field, get] of fields) {
        const a = get(mine[frame][body]);
        const b = get(oracle[frame].bodies[body]);
        // NaN or Infinity count as an infinite error, never as a pass.
        const err = Number.isFinite(a) ? Math.abs(a - b) : Infinity;
        if (err > maxError) maxError = err;
        if (err > perBody[body]) perBody[body] = err;
        if (first === null && err > tolerance) first = { frame, body, field, mine: a, oracle: b };
      }
    }
  }
  return { maxError, first, perBody };
}
