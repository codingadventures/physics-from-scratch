// Exercise 3: the sort and sweep broadphase. You implement findPairs.
import type { Body } from "../dynamics/body";
import type { Broadphase } from "./broadphase";

/** Sorts by aabb.min.x and sweeps with an active list. */
export class SortAndSweepBroadphase implements Broadphase {
  findPairs(bodies: readonly Body[]): Array<[Body, Body]> {
    throw new Error("TODO: Exercise 3, SortAndSweepBroadphase.findPairs");
  }
}
