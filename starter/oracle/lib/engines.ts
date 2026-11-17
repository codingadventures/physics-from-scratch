// Adapters: each engine behind the same Engine interface.
//
// - "lite" variants: Box2D Lite (boxes only, no restitution), see oracle/engines/lite.js.
// - "box2d": the full Box2D 2.4 port, sleeping off, see oracle/engines/box2d.js.
// - "ours": the learner's engine, built from the course's own stages. It reports itself as
//   unsupported until the exercises it needs are solved (the stubs throw "TODO: Exercise").
import * as B2 from "../engines/box2d.js";
import { LiteBody, LiteWorld, type LiteOptions } from "../engines/lite.js";
import type { BodyState, ContactReport, Engine, EngineRun, Scene, SceneBody } from "./types";

const staticBox = (b: SceneBody): boolean => b.mass === 0;

// ---------- Box2D Lite ----------

function liteUnsupported(scene: Scene): string | null {
  for (const b of scene.bodies) {
    if (b.shape.kind !== "box") return "Lite has boxes only";
    if ((b.restitution ?? 0) !== 0) return "Lite has no restitution";
  }
  return null;
}

export function liteEngine(id: string, label: string, options: LiteOptions): Engine {
  return {
    id,
    label,
    unsupported: liteUnsupported,
    create(scene: Scene): EngineRun {
      const world = new LiteWorld(scene.gravity, options);
      const bodies = scene.bodies.map((sb) => {
        if (sb.shape.kind !== "box") throw new Error("Lite has boxes only");
        const b = new LiteBody(
          { x: 2 * sb.shape.halfWidth, y: 2 * sb.shape.halfHeight },
          staticBox(sb) ? Infinity : sb.mass,
        );
        b.position = { ...sb.position };
        b.rotation = sb.angle ?? 0;
        b.velocity = { ...(sb.linearVelocity ?? { x: 0, y: 0 }) };
        b.angularVelocity = sb.angularVelocity ?? 0;
        b.friction = sb.friction ?? 0.5;
        return world.add(b);
      });
      return {
        step: () => world.step(scene.dt),
        state: (): BodyState[] =>
          bodies.map((b) => ({
            position: { ...b.position },
            angle: b.rotation,
            linearVelocity: { ...b.velocity },
            angularVelocity: b.angularVelocity,
          })),
        contacts: (): ContactReport[] =>
          world.contacts().map((c) => ({
            a: c.a.index,
            b: c.b.index,
            normal: { ...c.contacts[0].normal },
            points: c.contacts.map((p) => ({ point: { ...p.position }, depth: -p.separation })),
          })),
      };
    },
  };
}

/** Original step order and solver (accumulated impulses, warm starting, Baumgarte bias). */
export const lite = liteEngine("lite", "Box2D Lite", {});

/**
 * Lite in the course's step order (integrate, collide, solve) with the solver cut down to what
 * the course teaches first: per-iteration clamping, no warm starting. A diagnostic yardstick for
 * the exercises, not the original algorithm.
 */
export const liteBasic = liteEngine("lite-basic", "Lite, course order, basic solver", {
  stepOrder: "course",
  accumulateImpulses: false,
  warmStarting: false,
});

// ---------- Box2D 2.4 (box2d.ts) ----------

export const box2d: Engine = {
  id: "box2d",
  label: "Box2D 2.4 (sleeping off)",
  unsupported: () => null,
  create(scene: Scene): EngineRun {
    const world = new B2.World(new B2.Vec2(scene.gravity.x, scene.gravity.y));
    world.SetAllowSleeping(false);
    const bodies = scene.bodies.map((sb, index) => {
      const def = new B2.BodyDef();
      def.type = staticBox(sb) ? B2.BodyType.b2_staticBody : B2.BodyType.b2_dynamicBody;
      def.position.Set(sb.position.x, sb.position.y);
      def.angle = sb.angle ?? 0;
      def.linearVelocity.Set(sb.linearVelocity?.x ?? 0, sb.linearVelocity?.y ?? 0);
      def.angularVelocity = sb.angularVelocity ?? 0;
      def.userData = index;
      const body = world.CreateBody(def);
      const fd = new B2.FixtureDef();
      let area: number;
      if (sb.shape.kind === "box") {
        const shape = new B2.PolygonShape();
        shape.SetAsBox(sb.shape.halfWidth, sb.shape.halfHeight);
        fd.shape = shape;
        area = 4 * sb.shape.halfWidth * sb.shape.halfHeight;
      } else {
        const shape = new B2.CircleShape();
        shape.m_radius = sb.shape.radius;
        fd.shape = shape;
        area = Math.PI * sb.shape.radius ** 2;
      }
      // Density chosen so the body's mass matches the scene's mass.
      fd.density = staticBox(sb) ? 0 : sb.mass / area;
      fd.friction = sb.friction ?? 0.5;
      fd.restitution = sb.restitution ?? 0;
      body.CreateFixture(fd);
      return body;
    });
    const wm = new B2.WorldManifold();
    return {
      step: () => world.Step(scene.dt, 8, 3),
      state: (): BodyState[] =>
        bodies.map((b) => ({
          position: { x: b.GetPosition().x, y: b.GetPosition().y },
          angle: b.GetAngle(),
          linearVelocity: { x: b.GetLinearVelocity().x, y: b.GetLinearVelocity().y },
          angularVelocity: b.GetAngularVelocity(),
        })),
      contacts: (): ContactReport[] => {
        const out: ContactReport[] = [];
        for (let c = world.GetContactList(); c !== null; c = c.GetNext()) {
          if (!c.IsTouching()) continue;
          let a = c.GetFixtureA().GetBody().GetUserData() as number;
          let b = c.GetFixtureB().GetBody().GetUserData() as number;
          c.GetWorldManifold(wm);
          const n = c.GetManifold().pointCount;
          const sign = a < b ? 1 : -1;
          if (a > b) [a, b] = [b, a];
          out.push({
            a,
            b,
            normal: { x: sign * wm.normal.x, y: sign * wm.normal.y },
            points: Array.from({ length: n }, (_, i) => ({
              point: { x: wm.points[i].x, y: wm.points[i].y },
              depth: -wm.separations[i],
            })),
          });
        }
        return out;
      },
    };
  },
};

// ---------- Ours ----------

type OursKit = {
  World: typeof import("../../src/world/world").World;
  BruteForceBroadphase: typeof import("../../src/broadphase/bruteForce").BruteForceBroadphase;
  collide: typeof import("../../src/narrowphase/dispatch").collide;
  solveContacts: typeof import("../../src/solver/impulse").solveContacts;
  positionalCorrection: typeof import("../../src/solver/impulse").positionalCorrection;
};

/** Solver settings from OQ-20: slop 0.005, correction percent 0.8, 10 iterations. */
export const OURS_SETTINGS = { iterations: 10, percent: 0.8, slop: 0.005 };

async function loadOurs(): Promise<OursKit> {
  const [w, b, n, s] = await Promise.all([
    import("../../src/world/world"),
    import("../../src/broadphase/bruteForce"),
    import("../../src/narrowphase/dispatch"),
    import("../../src/solver/impulse"),
  ]);
  return {
    World: w.World,
    BruteForceBroadphase: b.BruteForceBroadphase,
    collide: n.collide,
    solveContacts: s.solveContacts,
    positionalCorrection: s.positionalCorrection,
  };
}

/**
 * The learner's engine. Resolves to an Engine, or to a reason string if a stage is still a
 * stub (probed by running one tiny scene).
 */
export async function oursEngine(): Promise<Engine | string> {
  const kit = await loadOurs();
  const engine: Engine = {
    id: "ours",
    label: "Ours (your engine)",
    unsupported: () => null,
    create(scene: Scene): EngineRun {
      const world = new kit.World({
        gravity: scene.gravity,
        broadphase: new kit.BruteForceBroadphase(),
        narrowphase: kit.collide,
        solver: (manifolds) => {
          kit.solveContacts(manifolds, OURS_SETTINGS.iterations);
          for (const m of manifolds) {
            kit.positionalCorrection(m, OURS_SETTINGS.percent, OURS_SETTINGS.slop);
          }
        },
      });
      const bodies = scene.bodies.map((sb) =>
        world.addBody({
          shape: sb.shape,
          position: { ...sb.position },
          angle: sb.angle,
          linearVelocity: sb.linearVelocity ? { ...sb.linearVelocity } : undefined,
          angularVelocity: sb.angularVelocity,
          mass: sb.mass,
          friction: sb.friction,
          restitution: sb.restitution,
        }),
      );
      return {
        step: () => world.step(scene.dt),
        state: (): BodyState[] =>
          bodies.map((b) => ({
            position: { ...b.position },
            angle: b.angle,
            linearVelocity: { ...b.linearVelocity },
            angularVelocity: b.angularVelocity,
          })),
      };
    },
  };
  try {
    const probe: Scene = {
      id: "probe",
      title: "probe",
      gravity: { x: 0, y: -9.81 },
      dt: 1 / 60,
      seconds: 1 / 60,
      ground: null,
      bodies: [
        { shape: { kind: "box", halfWidth: 1, halfHeight: 1 }, position: { x: 0, y: 0 }, mass: 0 },
        {
          shape: { kind: "box", halfWidth: 1, halfHeight: 1 },
          position: { x: 0, y: 1.5 },
          mass: 1,
        },
      ],
    };
    const run = engine.create(probe);
    run.step();
    return engine;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return msg.startsWith("TODO: Exercise") ? msg : `failed: ${msg}`;
  }
}
