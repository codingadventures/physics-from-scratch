// The shared vocabulary of the oracle harness: scenes, engines and what they report.

export type V = { x: number; y: number };

export type SceneShape =
  { kind: "box"; halfWidth: number; halfHeight: number } | { kind: "circle"; radius: number };

export type SceneBody = {
  shape: SceneShape;
  position: V;
  angle?: number;
  linearVelocity?: V;
  angularVelocity?: number;
  /** 0 means static, as in the course's BodyDef. */
  mass: number;
  /** Default 0.5, the course default. */
  friction?: number;
  /** Default 0. */
  restitution?: number;
};

/** A known answer for a scene, with the derivation in `why` so a reviewer can check it. */
export type Expectation = {
  /** Body index and the y its centre should settle at. */
  restY?: { body: number; y: number; tol: number };
  /** Body index and the x its centre should stop at. */
  stopX?: { body: number; x: number; tol: number };
  why: string;
};

export type Scene = {
  id: string;
  title: string;
  gravity: V;
  dt: number;
  seconds: number;
  bodies: SceneBody[];
  /** Index of the static ground body, whose top surface is at y = 0, or null if there is none. */
  ground: number | null;
  expect?: Expectation;
};

export type BodyState = {
  position: V;
  angle: number;
  linearVelocity: V;
  angularVelocity: number;
};

/** One contact between two bodies (indices into scene.bodies, a < b). Normal points a to b. */
export type ContactReport = {
  a: number;
  b: number;
  normal: V;
  points: Array<{ point: V; depth: number }>;
};

export interface EngineRun {
  /** Advance by scene.dt. */
  step(): void;
  state(): BodyState[];
  /** Contacts after the latest step, if the engine can report them. */
  contacts?(): ContactReport[];
}

export interface Engine {
  id: string;
  label: string;
  /** Why this engine cannot run the scene, or null when it can. */
  unsupported(scene: Scene): string | null;
  create(scene: Scene): EngineRun;
}

/** One recorded frame: time and every body's state. */
export type Frame = { t: number; bodies: BodyState[] };

export type Trace = Frame[];
