// Exercise 3: the brute force broadphase. You implement findPairs.
import type { Body } from "../dynamics/body";
import type { Broadphase } from "./broadphase";

export class BruteForceBroadphase implements Broadphase {
  findPairs(bodies: readonly Body[]): Array<[Body, Body]> {
    throw new Error("TODO: Exercise 3, BruteForceBroadphase.findPairs");
  }
}
