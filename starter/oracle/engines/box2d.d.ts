// Types for the part of the box2d.ts bundle that the oracle uses (see box2d.js for provenance).
export class Vec2 {
  x: number;
  y: number;
  constructor(x?: number, y?: number);
  Set(x: number, y: number): this;
}
export enum BodyType {
  b2_staticBody = 0,
  b2_kinematicBody = 1,
  b2_dynamicBody = 2,
}
export class BodyDef {
  type: BodyType;
  position: Vec2;
  angle: number;
  linearVelocity: Vec2;
  angularVelocity: number;
  userData: unknown;
}
export class PolygonShape {
  SetAsBox(hx: number, hy: number): this;
}
export class CircleShape {
  m_radius: number;
}
export class FixtureDef {
  shape: PolygonShape | CircleShape;
  density: number;
  friction: number;
  restitution: number;
}
export class WorldManifold {
  normal: Vec2;
  points: Vec2[];
  separations: number[];
}
export class Fixture {
  GetBody(): Body;
}
export class Contact {
  IsTouching(): boolean;
  GetNext(): Contact | null;
  GetFixtureA(): Fixture;
  GetFixtureB(): Fixture;
  GetManifold(): { pointCount: number };
  GetWorldManifold(wm: WorldManifold): void;
}
export class Body {
  GetPosition(): Readonly<Vec2>;
  GetAngle(): number;
  GetLinearVelocity(): Readonly<Vec2>;
  GetAngularVelocity(): number;
  GetUserData(): unknown;
  CreateFixture(def: FixtureDef): Fixture;
}
export class World {
  constructor(gravity: Vec2);
  CreateBody(def: BodyDef): Body;
  Step(dt: number, velocityIterations: number, positionIterations: number): void;
  SetAllowSleeping(flag: boolean): void;
  SetWarmStarting(flag: boolean): void;
  SetContinuousPhysics(flag: boolean): void;
  GetContactList(): Contact | null;
}
