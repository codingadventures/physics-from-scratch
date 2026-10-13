// Tests for the given trace recorder (not an exercise).
import { describe, expect, it } from "vitest";
import { recordTrace, trace } from "./trace";

describe("trace", () => {
  it("is a no-op when nothing records", () => {
    expect(trace.enabled).toBe(false);
    expect(() => trace.step("ignored", [])).not.toThrow();
  });

  it("records steps with their group path and values", () => {
    const rec = recordTrace(() => {
      expect(trace.enabled).toBe(true);
      trace.begin("outer");
      trace.step("one", [{ kind: "point", p: { x: 1, y: 2 } }], { depth: 0.5 });
      trace.begin("inner");
      trace.step("two", []);
      trace.end();
      trace.end();
      trace.step("three", []);
    });
    expect(rec.frames.map((f) => f.label)).toEqual(["one", "two", "three"]);
    expect(rec.frames.map((f) => f.group)).toEqual([["outer"], ["outer", "inner"], []]);
    expect(rec.frames[0]!.values).toEqual({ depth: 0.5 });
    expect(trace.enabled).toBe(false);
  });

  it("copies primitives, so later mutation does not change a frame", () => {
    const p = { x: 1, y: 1 };
    const rec = recordTrace(() => trace.step("s", [{ kind: "point", p }]));
    p.x = 99;
    expect(rec.frames[0]!.prims[0]).toEqual({ kind: "point", p: { x: 1, y: 1 } });
  });

  it("stops recording when the traced code throws", () => {
    expect(() =>
      recordTrace(() => {
        throw new Error("TODO: Exercise 4b, boxVsBox");
      }),
    ).toThrow("TODO");
    expect(trace.enabled).toBe(false);
  });

  it("nested recordings keep their frames apart", () => {
    let inner = 0;
    const outer = recordTrace(() => {
      trace.step("outer", []);
      inner = recordTrace(() => trace.step("inner", [])).frames.length;
    });
    expect(inner).toBe(1);
    expect(outer.frames.map((f) => f.label)).toEqual(["outer"]);
  });
});
