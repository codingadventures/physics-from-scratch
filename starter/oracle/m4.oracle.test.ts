// npm run oracle, Milestone 4: your box-box collide against Box2D Lite's Collide, on random
// poses. Lite uses the same recipe the course teaches (SAT, then clip against the reference
// face), so a mismatch usually means a bug in one of your stages. Points are compared along
// the tangent only, because Lite slides each point onto the reference face and you may not.
//
// A diagnostic: it prints how many poses disagree, and fails only on a large disagreement
// rate, since near-ties between axes can legitimately go either way. Skipped until
// Exercise 4b (collide) is solved.
import { describe, expect, it } from "vitest";
import { collide } from "../src/narrowphase/dispatch";
import { box, seededRng } from "../test-helpers";
import { LiteBody, collideBoxes } from "./engines/lite.js";
import { compareContacts } from "./lib/score";

const isTodo = (e: unknown): boolean =>
  e instanceof Error && e.message.startsWith("TODO: Exercise");

describe("M4: box-box contacts agree with Box2D Lite", () => {
  it("1000 random overlapping poses", (ctx) => {
    const rng = seededRng(7);
    const range = (lo: number, hi: number): number => rng.range(lo, hi);
    let compared = 0;
    let overlapping = 0;
    let bad = 0;
    let worstNormal = 0;
    let worstDepth = 0;
    const examples: string[] = [];

    for (let i = 0; i < 1000; i++) {
      const hwA = range(0.3, 1);
      const hhA = range(0.3, 1);
      const hwB = range(0.3, 1);
      const hhB = range(0.3, 1);
      const pa = { x: 0, y: 0 };
      const pb = { x: range(-1.5, 1.5), y: range(-1.5, 1.5) };
      const angA = range(-Math.PI, Math.PI);
      const angB = range(-Math.PI, Math.PI);

      const la = new LiteBody({ x: 2 * hwA, y: 2 * hhA }, 1);
      const lb = new LiteBody({ x: 2 * hwB, y: 2 * hhB }, 1);
      la.position = pa;
      la.rotation = angA;
      lb.position = pb;
      lb.rotation = angB;
      const ref = collideBoxes(la, lb);

      let mine;
      try {
        mine = collide(
          box(0, pa, hwA, hhA, { angle: angA, invMass: 1, invInertia: 1 }),
          box(1, pb, hwB, hhB, { angle: angB, invMass: 1, invInertia: 1 }),
        );
      } catch (e) {
        if (isTodo(e)) return ctx.skip();
        throw e;
      }

      const refReport =
        ref.length === 0
          ? []
          : [
              {
                a: 0,
                b: 1,
                normal: ref[0].normal,
                points: ref.map((c) => ({ point: c.position, depth: -c.separation })),
              },
            ];
      const myReport =
        mine === null ? [] : [{ a: 0, b: 1, normal: mine.normal, points: mine.points }];
      const cmp = compareContacts(myReport, refReport, { ignoreNormalOffset: true });
      compared++;
      if (ref.length > 0) overlapping++;
      worstNormal = Math.max(worstNormal, cmp.maxNormalError);
      worstDepth = Math.max(worstDepth, cmp.maxDepthError);
      const disagree =
        cmp.onlyInA.length + cmp.onlyInB.length + cmp.pointCountMismatch.length > 0 ||
        cmp.maxNormalError > 1e-6 ||
        cmp.maxDepthError > 1e-6 ||
        cmp.maxPointError > 1e-6;
      if (disagree) {
        bad++;
        if (examples.length < 3) examples.push(`pose ${i}: ${JSON.stringify(cmp)}`);
      }
    }
    console.log(
      `M4 box-box: ${compared - bad}/${compared} poses agree with Lite to 1e-6 (${overlapping} overlap). ` +
        `Worst normal error ${worstNormal.toExponential(1)} rad, worst depth error ${worstDepth.toExponential(1)} m.`,
    );
    if (examples.length) console.log("First disagreements:\n" + examples.join("\n"));
    expect(bad / compared, "share of poses that disagree with Lite").toBeLessThan(0.05);
  });
});
