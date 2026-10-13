// Exercise 2: the World. You implement the methods marked TODO.
// Exercise 5c plugs your solver into the solver stage; no other change here is needed.
import type { Vec2 } from "../math/vec2";
import type { Body, BodyDef } from "../dynamics/body";
import type { Broadphase } from "../broadphase/broadphase";
import type { Manifold } from "../narrowphase/manifold";
import type { AABB } from "./aabb";

// ---- Given: stage types and the constructor. Do not change these. ----

/** Narrowphase stage: collides one pair. `collide` from Exercise 4b fits this type. */
export type NarrowphaseStage = (a: Body, b: Body) => Manifold | null;

/** Solver stage: resolves this step's manifolds, in place. */
export type SolverStage = (manifolds: Manifold[], dt: number) => void;

/** What gather() returns for each body. */
export type GatheredBody = { body: Body; aabb: AABB };

export type WorldOptions = {
  gravity?: Vec2;
  broadphase?: Broadphase;
  narrowphase?: NarrowphaseStage;
  solver?: SolverStage;
};

export class World {
  gravity: Vec2;
  broadphase: Broadphase;
  narrowphase: NarrowphaseStage;
  solver: SolverStage;

  /** Stages default to no-ops, so the world runs before Exercises 3-5 exist. */
  constructor(options: WorldOptions = {}) {
    this.gravity = options.gravity ?? { x: 0, y: -9.81 };
    this.broadphase = options.broadphase ?? { findPairs: () => [] };
    this.narrowphase = options.narrowphase ?? (() => null);
    this.solver = options.solver ?? (() => {});
  }

  // ---- Exercise 2: add whatever private fields you need, and implement these. ----

  /** Every body currently in the world, in the order it was added. */
  get bodies(): readonly Body[] {
    throw new Error("TODO: Exercise 2, World.bodies");
  }

  /** Creates a body with the next id (0, 1, 2, ...). Ids are never reused. */
  addBody(def: BodyDef): Body {
    throw new Error("TODO: Exercise 2, World.addBody");
  }

  removeBody(body: Body): void {
    throw new Error("TODO: Exercise 2, World.removeBody");
  }

  /** Every body with its current world-space AABB. */
  gather(): GatheredBody[] {
    throw new Error("TODO: Exercise 2, World.gather");
  }

  /** One step: integrate, gather, broadphase, narrowphase over the pairs, solver. */
  step(dt: number): void {
    throw new Error("TODO: Exercise 2, World.step");
  }
}
