// Exercise 0: Vec2 operations. You implement every function in this file.
//
// Vectors are plain { x, y } objects. Functions never mutate their arguments:
// they always return a new vector (02-contract, "Vectors").

/** Given: a 2D vector. Do not change this type. */
export type Vec2 = { x: number; y: number };

export function add(a: Vec2, b: Vec2): Vec2 {
  throw new Error("TODO: Exercise 0, add");
}

export function sub(a: Vec2, b: Vec2): Vec2 {
  throw new Error("TODO: Exercise 0, sub");
}

export function scale(a: Vec2, s: number): Vec2 {
  throw new Error("TODO: Exercise 0, scale");
}

export function negate(a: Vec2): Vec2 {
  throw new Error("TODO: Exercise 0, negate");
}

export function dot(a: Vec2, b: Vec2): number {
  throw new Error("TODO: Exercise 0, dot");
}

/** 2D cross product, a scalar: a.x*b.y - a.y*b.x. */
export function cross(a: Vec2, b: Vec2): number {
  throw new Error("TODO: Exercise 0, cross");
}

/** Scalar x vector: { x: -s*v.y, y: s*v.x }. */
export function crossSV(s: number, v: Vec2): Vec2 {
  throw new Error("TODO: Exercise 0, crossSV");
}

/** Vector x scalar: { x: s*v.y, y: -s*v.x }. */
export function crossVS(v: Vec2, s: number): Vec2 {
  throw new Error("TODO: Exercise 0, crossVS");
}

/** Rotate 90 degrees counter-clockwise: { x: -a.y, y: a.x }. */
export function perp(a: Vec2): Vec2 {
  throw new Error("TODO: Exercise 0, perp");
}

export function length(a: Vec2): number {
  throw new Error("TODO: Exercise 0, length");
}

export function lengthSq(a: Vec2): number {
  throw new Error("TODO: Exercise 0, lengthSq");
}

/** Unit vector in the direction of a. The zero vector returns the zero vector. */
export function normalize(a: Vec2): Vec2 {
  throw new Error("TODO: Exercise 0, normalize");
}
