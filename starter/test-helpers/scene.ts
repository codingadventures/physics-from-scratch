// Given: build Body records directly, without your createBody.
//
// Tests for Exercises 2-6 use these so a bug in Exercise 1 does not cascade.
// invMass and invInertia are set explicitly. The defaults (1 and 1) are
// placeholders, not physical values: a test that depends on them states them.
import type { Vec2 } from "../src/math/vec2";
import type { Shape } from "../src/dynamics/shapes";
import type { Body } from "../src/dynamics/body";

export type BodyOverrides = Partial<Omit<Body, "id" | "shape">>;

export function makeBody(id: number, shape: Shape, overrides: BodyOverrides = {}): Body {
  return {
    id,
    shape,
    position: { x: 0, y: 0 },
    angle: 0,
    linearVelocity: { x: 0, y: 0 },
    angularVelocity: 0,
    invMass: 1,
    invInertia: 1,
    restitution: 0,
    friction: 0.5,
    ...overrides,
  };
}

export function circle(id: number, position: Vec2, radius: number, o: BodyOverrides = {}): Body {
  return makeBody(id, { kind: "circle", radius }, { position, ...o });
}

export function box(
  id: number,
  position: Vec2,
  halfWidth: number,
  halfHeight: number,
  o: BodyOverrides = {},
): Body {
  return makeBody(id, { kind: "box", halfWidth, halfHeight }, { position, ...o });
}

/** Always static. normal must be a unit vector. */
export function plane(id: number, normal: Vec2, offset: number, o: BodyOverrides = {}): Body {
  return makeBody(
    id,
    { kind: "plane", normal, offset },
    { ...o, invMass: 0, invInertia: 0, linearVelocity: { x: 0, y: 0 }, angularVelocity: 0 },
  );
}

/** Mark a body static (inverse mass and inverse inertia 0). Returns the same body. */
export function makeStatic(body: Body): Body {
  body.invMass = 0;
  body.invInertia = 0;
  return body;
}
