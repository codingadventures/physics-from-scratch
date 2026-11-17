export type V = {
    x: number;
    y: number;
};
export declare class LiteBody {
    position: V;
    rotation: number;
    velocity: V;
    angularVelocity: number;
    force: V;
    torque: number;
    /** Full width and height, as in the original (not half extents). */
    width: V;
    friction: number;
    mass: number;
    invMass: number;
    I: number;
    invI: number;
    index: number;
    /** Body::Set. mass Infinity (or 0) means static. */
    constructor(width: V, mass: number);
}
type FeaturePair = [number, number, number, number];
export type LiteContact = {
    position: V;
    normal: V;
    r1: V;
    r2: V;
    separation: number;
    Pn: number;
    Pt: number;
    Pnb: number;
    massNormal: number;
    massTangent: number;
    bias: number;
    feature: FeaturePair;
};
/** Collide(): box against box. The normal points from A to B. Returns 0, 1 or 2 contacts. */
export declare function collideBoxes(bodyA: LiteBody, bodyB: LiteBody): LiteContact[];
export type LiteOptions = {
    iterations?: number;
    accumulateImpulses?: boolean;
    warmStarting?: boolean;
    positionCorrection?: boolean;
    stepOrder?: "lite" | "course";
};
export declare class LiteWorld {
    bodies: LiteBody[];
    gravity: V;
    readonly options: Required<LiteOptions>;
    private arbiters;
    constructor(gravity: V, options?: LiteOptions);
    add(body: LiteBody): LiteBody;
    /** Live arbiters in std::map order (by body index pair). */
    private sortedArbiters;
    /** Current manifolds, for comparing narrowphase output. */
    contacts(): Array<{
        a: LiteBody;
        b: LiteBody;
        contacts: LiteContact[];
    }>;
    /** World::BroadPhase: O(n^2) pairs, then create, update or erase arbiters. */
    broadPhase(): void;
    private integrateForces;
    private integratePositions;
    private solve;
    step(dt: number): void;
}
export {};
