// Scoring: turn a recorded run into numbers, and compare two runs.
//
// Metrics are measured the same way for every engine, from positions and velocities only, so
// no engine marks its own homework. Penetration is measured against the flat ground (top at
// y = 0) and, as a proxy, between bodies by bounding-box overlap (exact for axis-aligned
// boxes, an overestimate for rotated ones).
import type { BodyState, ContactReport, Engine, Scene, SceneBody, Trace, V } from "./types";

export type Mass = { m: number; I: number };

/** Mass and moment of inertia about the centre: box m(w^2+h^2)/12, disc m r^2 / 2. */
export function massOf(b: SceneBody): Mass {
  if (b.mass === 0) return { m: 0, I: 0 };
  if (b.shape.kind === "circle") return { m: b.mass, I: 0.5 * b.mass * b.shape.radius ** 2 };
  const { halfWidth: hw, halfHeight: hh } = b.shape;
  return { m: b.mass, I: (b.mass * ((2 * hw) ** 2 + (2 * hh) ** 2)) / 12 };
}

/** Half extents of the axis-aligned box around a body. */
export function halfExtents(b: SceneBody, angle: number): V {
  if (b.shape.kind === "circle") return { x: b.shape.radius, y: b.shape.radius };
  const c = Math.abs(Math.cos(angle));
  const s = Math.abs(Math.sin(angle));
  const { halfWidth: hw, halfHeight: hh } = b.shape;
  return { x: hw * c + hh * s, y: hw * s + hh * c };
}

export type RunMetrics = {
  /** Every position, angle and velocity stayed finite. */
  finite: boolean;
  /** Deepest penetration into the ground over the run, metres. */
  maxGroundPenetration: number;
  /** Deepest bounding-box overlap between two dynamic bodies, metres (proxy). */
  maxPairOverlap: number;
  /** Largest amount by which total mechanical energy rose above its starting value, joules. */
  maxEnergyGain: number;
  /** Final minus initial mechanical energy, joules. Negative means energy was lost. */
  energyDrift: number;
  /** First time (s) after which every body stays slower than the tolerances, or null. */
  settleTime: number | null;
  /** Fastest body speed seen at any step, m/s. */
  maxSpeed: number;
  /** Final centre of each body. */
  finalPositions: V[];
  /** Error against the scene's known answer, or null if the scene has none. */
  restYError: number | null;
  stopXError: number | null;
};

export const SETTLE_SPEED = 0.05;
export const SETTLE_SPIN = 0.05;

function energy(scene: Scene, frame: BodyState[]): number {
  let e = 0;
  scene.bodies.forEach((b, i) => {
    const { m, I } = massOf(b);
    if (m === 0) return;
    const s = frame[i];
    e += 0.5 * m * (s.linearVelocity.x ** 2 + s.linearVelocity.y ** 2);
    e += 0.5 * I * s.angularVelocity ** 2;
    e += m * -scene.gravity.y * s.position.y - m * scene.gravity.x * s.position.x;
  });
  return e;
}

export function score(scene: Scene, trace: Trace): RunMetrics {
  const first = trace[0];
  const last = trace[trace.length - 1];
  const e0 = energy(scene, first.bodies);
  let finite = true;
  let maxPen = 0;
  let maxOverlap = 0;
  let maxGain = 0;
  let maxSpeed = 0;
  let settleIndex: number | null = null;

  trace.forEach((frame, fi) => {
    let calm = true;
    frame.bodies.forEach((s, i) => {
      const nums = [s.position.x, s.position.y, s.angle, s.angularVelocity];
      nums.push(s.linearVelocity.x, s.linearVelocity.y);
      if (!nums.every(Number.isFinite)) finite = false;
      const b = scene.bodies[i];
      if (b.mass === 0) return;
      const speed = Math.hypot(s.linearVelocity.x, s.linearVelocity.y);
      maxSpeed = Math.max(maxSpeed, speed);
      if (speed > SETTLE_SPEED || Math.abs(s.angularVelocity) > SETTLE_SPIN) calm = false;
      if (scene.ground !== null) {
        const g = scene.bodies[scene.ground];
        const gHalfW = g.shape.kind === "box" ? g.shape.halfWidth : 0;
        const ext = halfExtents(b, s.angle);
        const overGround = Math.abs(s.position.x - g.position.x) <= gHalfW + ext.x;
        if (overGround) maxPen = Math.max(maxPen, -(s.position.y - ext.y));
      }
    });
    if (!calm) settleIndex = null;
    else if (settleIndex === null) settleIndex = fi;

    for (let i = 0; i < scene.bodies.length; i++) {
      for (let j = i + 1; j < scene.bodies.length; j++) {
        if (scene.bodies[i].mass === 0 || scene.bodies[j].mass === 0) continue;
        const a = frame.bodies[i];
        const b = frame.bodies[j];
        const ea = halfExtents(scene.bodies[i], a.angle);
        const eb = halfExtents(scene.bodies[j], b.angle);
        const ox = ea.x + eb.x - Math.abs(a.position.x - b.position.x);
        const oy = ea.y + eb.y - Math.abs(a.position.y - b.position.y);
        if (ox > 0 && oy > 0) maxOverlap = Math.max(maxOverlap, Math.min(ox, oy));
      }
    }
    if (finite) maxGain = Math.max(maxGain, energy(scene, frame.bodies) - e0);
  });

  const exp = scene.expect;
  return {
    finite,
    maxGroundPenetration: maxPen,
    maxPairOverlap: maxOverlap,
    maxEnergyGain: maxGain,
    energyDrift: energy(scene, last.bodies) - e0,
    settleTime: settleIndex === null ? null : trace[settleIndex].t,
    maxSpeed,
    finalPositions: last.bodies.map((s) => ({ ...s.position })),
    restYError: exp?.restY ? last.bodies[exp.restY.body].position.y - exp.restY.y : null,
    stopXError: exp?.stopX ? last.bodies[exp.stopX.body].position.x - exp.stopX.x : null,
  };
}

/** Largest position and angle difference between two traces of the same scene, over all frames. */
export function compareTraces(
  a: Trace,
  b: Trace,
): { maxPosition: number; maxAngle: number; maxVelocity: number } {
  let maxPosition = 0;
  let maxAngle = 0;
  let maxVelocity = 0;
  const n = Math.min(a.length, b.length);
  for (let f = 0; f < n; f++) {
    a[f].bodies.forEach((s, i) => {
      const o = b[f].bodies[i];
      maxPosition = Math.max(
        maxPosition,
        Math.hypot(s.position.x - o.position.x, s.position.y - o.position.y),
      );
      maxAngle = Math.max(maxAngle, Math.abs(s.angle - o.angle));
      maxVelocity = Math.max(
        maxVelocity,
        Math.hypot(
          s.linearVelocity.x - o.linearVelocity.x,
          s.linearVelocity.y - o.linearVelocity.y,
        ),
      );
    });
  }
  return { maxPosition, maxAngle, maxVelocity };
}

export type ContactComparison = {
  /** Body pairs in contact in A but not in B, and the reverse. */
  onlyInA: string[];
  onlyInB: string[];
  /** Pairs where the number of contact points differs. */
  pointCountMismatch: string[];
  /** Largest angle between normals (radians), nearest-point position gap and depth gap. */
  maxNormalError: number;
  maxPointError: number;
  maxDepthError: number;
};

const pairKey = (c: ContactReport): string => `${c.a}-${c.b}`;

/**
 * Compare two engines' contacts for one frame. Points are matched greedily by distance, so the
 * order an engine lists them in does not matter. Depth is positive when overlapping.
 * With ignoreNormalOffset, point gaps are measured along the tangent only.
 */
export function compareContacts(
  a: ContactReport[],
  b: ContactReport[],
  options: { ignoreNormalOffset?: boolean } = {},
): ContactComparison {
  const mapA = new Map(a.map((c) => [pairKey(c), c]));
  const mapB = new Map(b.map((c) => [pairKey(c), c]));
  const out: ContactComparison = {
    onlyInA: [...mapA.keys()].filter((k) => !mapB.has(k)),
    onlyInB: [...mapB.keys()].filter((k) => !mapA.has(k)),
    pointCountMismatch: [],
    maxNormalError: 0,
    maxPointError: 0,
    maxDepthError: 0,
  };
  for (const [key, ca] of mapA) {
    const cb = mapB.get(key);
    if (!cb) continue;
    const cross = ca.normal.x * cb.normal.y - ca.normal.y * cb.normal.x;
    const dot = ca.normal.x * cb.normal.x + ca.normal.y * cb.normal.y;
    out.maxNormalError = Math.max(out.maxNormalError, Math.abs(Math.atan2(cross, dot)));
    if (ca.points.length !== cb.points.length) out.pointCountMismatch.push(key);
    const free = [...cb.points];
    for (const p of ca.points) {
      if (free.length === 0) break;
      let best = 0;
      let bestD = Infinity;
      free.forEach((q, k) => {
        const dx = p.point.x - q.point.x;
        const dy = p.point.y - q.point.y;
        // Engines differ on where along the normal they place a point (on the incident vertex or
        // slid onto the reference face), so optionally compare only along the tangent.
        const d = options.ignoreNormalOffset
          ? Math.abs(dx * -ca.normal.y + dy * ca.normal.x)
          : Math.hypot(dx, dy);
        if (d < bestD) {
          bestD = d;
          best = k;
        }
      });
      const [q] = free.splice(best, 1);
      out.maxPointError = Math.max(out.maxPointError, bestD);
      out.maxDepthError = Math.max(out.maxDepthError, Math.abs(p.depth - q.depth));
    }
  }
  return out;
}

/** Run an engine on a scene and record every step (frame 0 is the start state). */
export function record(
  engine: Engine,
  scene: Scene,
  options: { contacts?: boolean } = {},
): { trace: Trace; contacts: ContactReport[][] } {
  const run = engine.create(scene);
  const steps = Math.round(scene.seconds / scene.dt);
  const trace: Trace = [{ t: 0, bodies: run.state() }];
  const contacts: ContactReport[][] = [];
  for (let i = 1; i <= steps; i++) {
    run.step();
    trace.push({ t: i * scene.dt, bodies: run.state() });
    if (options.contacts && run.contacts) contacts.push(run.contacts());
  }
  return { trace, contacts };
}
