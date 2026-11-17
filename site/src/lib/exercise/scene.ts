// The scene the integration exercise runs: a box launched off a pad, no collisions.
// Same Scene type as the oracle harness, so Box2D can run it unchanged.
import type { Scene } from "../../../../starter/oracle/lib/types";

// Derivation (for a reviewer): launch velocity (4, 9) from y = 0.8 for 2 s, 120 steps of 1/60.
// Exact physics gives y(2) = 0.8 + 9*2 - 4.905*4 = -0.82. Semi-implicit Euler adds the gravity
// term -g dt^2 n (n + 1) / 2 instead of -g t^2 / 2, which is lower by g t dt / 2 = 0.1635 m at
// t = 2, so y after 120 steps = -0.9835. Box2D uses the same scheme, so it is the reference.
export const launchScene: Scene = {
  id: "launch",
  title: "Box launched off a pad",
  gravity: { x: 0, y: -9.81 },
  dt: 1 / 60,
  seconds: 2,
  ground: null,
  bodies: [
    // The pad is static: a correct integrate leaves it exactly where it is.
    { shape: { kind: "box", halfWidth: 1.5, halfHeight: 0.25 }, position: { x: -4, y: -0.25 }, mass: 0 },
    {
      shape: { kind: "box", halfWidth: 0.4, halfHeight: 0.4 },
      position: { x: -4, y: 0.8 },
      linearVelocity: { x: 4, y: 9 },
      angularVelocity: 3,
      mass: 1,
    },
  ],
};
