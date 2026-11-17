// Scenes every engine can run. All use boxes (and a few circles), with the ground as a static box
// whose top surface is at y = 0, so a box-only engine such as Box2D Lite can run them too.
import type { Scene, SceneBody } from "./types";

const G = { x: 0, y: -9.81 };
const DT = 1 / 60;

const ground: SceneBody = {
  shape: { kind: "box", halfWidth: 50, halfHeight: 5 },
  position: { x: 0, y: -5 },
  mass: 0,
};

const unitBox = (x: number, y: number, extra: Partial<SceneBody> = {}): SceneBody => ({
  shape: { kind: "box", halfWidth: 0.5, halfHeight: 0.5 },
  position: { x, y },
  mass: 1,
  ...extra,
});

const stack = (n: number): SceneBody[] => {
  const boxes: SceneBody[] = [];
  // A small x offset per box and a 5 cm gap, so the stack starts slightly imperfect.
  for (let i = 0; i < n; i++) boxes.push(unitBox(0.02 * i, 0.5 + 1.05 * i));
  return boxes;
};

export const scenes: Scene[] = [
  {
    id: "free-fall",
    title: "Box in free fall, no ground contact",
    gravity: G,
    dt: DT,
    seconds: 3,
    ground: 0,
    bodies: [ground, unitBox(0, 100)],
    expect: {
      why: "No contact: the result is pure integration, so engines using semi-implicit Euler agree exactly.",
    },
  },
  {
    id: "box-drop",
    title: "Box dropped from y = 3 onto the ground (M5, like S1 with a box)",
    gravity: G,
    dt: DT,
    seconds: 4,
    ground: 0,
    bodies: [ground, unitBox(0, 3)],
    expect: {
      restY: { body: 1, y: 0.5, tol: 0.01 },
      why: "A box of half height 0.5 resting on a surface at y = 0 has its centre at y = 0.5. The tolerance is the S1 tolerance from 00-goal.",
    },
  },
  {
    id: "box-slide",
    title: "Box sliding on the ground, friction 0.5 (S3)",
    gravity: G,
    dt: DT,
    seconds: 3,
    ground: 0,
    bodies: [ground, unitBox(-5, 0.5, { linearVelocity: { x: 5, y: 0 } })],
    expect: {
      stopX: { body: 1, x: -5 + (5 * 5) / (2 * 0.5 * 9.81), tol: 0.3 },
      why: "Friction decelerates at mu*g = 4.905 m/s^2, so the slide distance is v^2 / (2 mu g) = 25 / 9.81 = 2.548 m. The tolerance is loose because contact solvers differ on how friction ends a slide.",
    },
  },
  {
    id: "box-tilted",
    title: "Box dropped tilted onto the ground (S4)",
    gravity: G,
    dt: DT,
    seconds: 6,
    ground: 0,
    bodies: [ground, unitBox(0, 2, { angle: 0.6 })],
    expect: {
      why: "No closed form for where it ends up. It should come to rest (speed and spin under 0.1, S4).",
    },
  },
  {
    id: "stack-5",
    title: "Stack of five boxes",
    gravity: G,
    dt: DT,
    seconds: 4,
    ground: 0,
    bodies: [ground, ...stack(5)],
    expect: {
      restY: { body: 5, y: 4.5, tol: 0.1 },
      why: "Five unit boxes touching are centred at y = 0.5, 1.5, ..., 4.5. The top box should be near 4.5.",
    },
  },
  {
    id: "offset-pair",
    title: "Box landing off-centre on another box",
    gravity: G,
    dt: DT,
    seconds: 4,
    ground: 0,
    bodies: [
      ground,
      unitBox(0, 0.5),
      unitBox(0.4, 1.6, { angle: 0.1, linearVelocity: { x: 0, y: -1 } }),
    ],
    expect: {
      why: "No closed form. Compares how engines handle a rotated box-box contact with two points.",
    },
  },
  {
    id: "circle-drop",
    title: "Circle dropped from y = 3, restitution 0 (S1)",
    gravity: G,
    dt: DT,
    seconds: 5,
    ground: 0,
    bodies: [
      ground,
      { shape: { kind: "circle", radius: 0.5 }, position: { x: 0, y: 3 }, mass: 1, restitution: 0 },
    ],
    expect: {
      restY: { body: 1, y: 0.5, tol: 0.01 },
      why: "A circle of radius 0.5 resting on y = 0 has its centre at y = 0.5. S1 tolerance 0.01.",
    },
  },
  {
    id: "circles-head-on",
    title: "Two equal circles collide head on, restitution 1, no gravity (S2)",
    gravity: { x: 0, y: 0 },
    dt: DT,
    seconds: 2,
    ground: null,
    bodies: [
      {
        shape: { kind: "circle", radius: 0.5 },
        position: { x: -2, y: 5 },
        linearVelocity: { x: 2, y: 0 },
        mass: 1,
        restitution: 1,
      },
      {
        shape: { kind: "circle", radius: 0.5 },
        position: { x: 2, y: 5 },
        linearVelocity: { x: -2, y: 0 },
        mass: 1,
        restitution: 1,
      },
    ],
    expect: {
      why: "Equal masses and e = 1 exchange velocities: circle 1 ends at about vx = -2 and circle 2 at +2.",
    },
  },
];

export function sceneById(id: string): Scene {
  const scene = scenes.find((s) => s.id === id);
  if (!scene) throw new Error(`unknown scene ${id}`);
  return scene;
}
