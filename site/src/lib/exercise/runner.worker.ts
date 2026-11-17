// Runs the learner's transpiled code. There is no DOM in a worker, and the main thread can
// terminate this worker if the code never returns. It builds the bodies, calls the learner's
// integrate for every body on every step, and sends back one snapshot per frame.
import type { Scene, BodyState } from "../../../../starter/oracle/lib/types";

export type RunRequest = { js: string; scene: Scene };
export type RunResponse =
  | { ok: true; frames: BodyState[][] }
  | { ok: false; error: string; step: number | null };

type Body = {
  id: number;
  shape: Scene["bodies"][number]["shape"];
  position: { x: number; y: number };
  angle: number;
  linearVelocity: { x: number; y: number };
  angularVelocity: number;
  invMass: number;
  invInertia: number;
  restitution: number;
  friction: number;
};

// Given, not part of the exercise: the harness builds bodies itself so that this exercise does
// not depend on createBody. Box: I = m (w^2 + h^2) / 12 with w = 2 hw, h = 2 hh. Disc: I = m r^2 / 2.
function makeBody(d: Scene["bodies"][number], id: number): Body {
  let invMass = 0;
  let invInertia = 0;
  if (d.mass > 0) {
    const inertia =
      d.shape.kind === "circle"
        ? (d.mass * d.shape.radius ** 2) / 2
        : (d.mass * ((2 * d.shape.halfWidth) ** 2 + (2 * d.shape.halfHeight) ** 2)) / 12;
    invMass = 1 / d.mass;
    invInertia = 1 / inertia;
  }
  return {
    id,
    shape: d.shape,
    position: { ...d.position },
    angle: d.angle ?? 0,
    linearVelocity: { ...(d.linearVelocity ?? { x: 0, y: 0 }) },
    angularVelocity: d.angularVelocity ?? 0,
    invMass,
    invInertia,
    restitution: d.restitution ?? 0,
    friction: d.friction ?? 0.5,
  };
}

const snapshot = (b: Body): BodyState => ({
  position: { ...b.position },
  angle: b.angle,
  linearVelocity: { ...b.linearVelocity },
  angularVelocity: b.angularVelocity,
});

self.onmessage = (e: MessageEvent<RunRequest>) => {
  const { js, scene } = e.data;
  let step: number | null = null;
  const reply = (r: RunResponse) => (self as unknown as Worker).postMessage(r);
  try {
    const mod: { exports: Record<string, unknown> } = { exports: {} };
    const noImports = (name: string): never => {
      throw new Error(
        `import "${name}" does not work in this editor yet. Only "import type" lines are allowed.`,
      );
    };
    new Function("exports", "module", "require", js)(mod.exports, mod, noImports);
    const integrate = mod.exports.integrate;
    if (typeof integrate !== "function") {
      throw new Error("Your code must export a function called integrate.");
    }
    // The gravity vector is read-only: writing to it throws, as it would be a bug in real code too.
    const gravity = Object.freeze({ ...scene.gravity });
    const bodies = scene.bodies.map(makeBody);
    const steps = Math.round(scene.seconds / scene.dt);
    const frames: BodyState[][] = [bodies.map(snapshot)];
    for (step = 1; step <= steps; step++) {
      for (const b of bodies) integrate(b, scene.dt, gravity);
      frames.push(bodies.map(snapshot));
    }
    reply({ ok: true, frames });
  } catch (err) {
    reply({ ok: false, error: err instanceof Error ? err.message : String(err), step });
  }
};
