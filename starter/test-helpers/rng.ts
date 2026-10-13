// Given: a small seeded random number generator, so random tests are repeatable.
// Algorithm: mulberry32 (a public-domain 32-bit generator). Statistical quality
// does not matter here, only that the same seed gives the same sequence.
import type { Vec2 } from "../src/math/vec2";

export type Rng = {
  /** Uniform in [0, 1). */
  next(): number;
  /** Uniform in [min, max). */
  range(min: number, max: number): number;
  /** Both components uniform in [min, max). */
  vec2(min: number, max: number): Vec2;
};

export function seededRng(seed: number): Rng {
  let state = seed >>> 0;
  const next = (): number => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const range = (min: number, max: number): number => min + (max - min) * next();
  return { next, range, vec2: (min, max) => ({ x: range(min, max), y: range(min, max) }) };
}
