// npm run oracle: run every scene on every engine, score it, and write oracle/out/report.md.
//
// This is a yardstick, not a pass/fail gate. The only hard checks are that the engines you
// are measured against stay finite. Your own engine is listed once its exercises are solved,
// and is never failed for being worse than Box2D: the table is for you to read.
import { mkdirSync, writeFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { box2d, lite, liteBasic, oursEngine } from "./lib/engines";
import { sceneTable, type ReportRow } from "./lib/report";
import { scenes } from "./lib/scenes";
import { compareTraces, record, score } from "./lib/score";
import type { Engine } from "./lib/types";

describe("scenes on every engine", () => {
  it("scores each scene and writes the report", async () => {
    const ours = await oursEngine();
    const engines: Engine[] = [lite, liteBasic, box2d];
    const sections: string[] = [];
    const notes: string[] = [];

    if (typeof ours === "string") notes.push(`Your engine is not scored yet: ${ours}`);
    else engines.unshift(ours);

    for (const scene of scenes) {
      const rows: ReportRow[] = [];
      for (const engine of engines) {
        const why = engine.unsupported(scene);
        if (why !== null) {
          rows.push({ engine: engine.label, skipped: why });
          continue;
        }
        const { trace } = record(engine, scene);
        const metrics = score(scene, trace);
        if (engine !== ours) expect(metrics.finite, `${engine.id} on ${scene.id}`).toBe(true);
        rows.push({ engine: engine.label, metrics });
      }
      let section = sceneTable(`${scene.title} (\`${scene.id}\`)`, rows);
      if (scene.expect) section += `\n\nKnown answer: ${scene.expect.why}`;

      // How far your engine's trajectory is from each yardstick, as a diagnostic.
      if (typeof ours !== "string" && ours.unsupported(scene) === null) {
        const mine = record(ours, scene).trace;
        const gaps = [lite, liteBasic, box2d]
          .filter((e) => e.unsupported(scene) === null)
          .map((e) => {
            const d = compareTraces(mine, record(e, scene).trace);
            return `${e.label}: position ${d.maxPosition.toExponential(1)} m, angle ${d.maxAngle.toExponential(1)} rad`;
          });
        section += `\n\nLargest gap from your engine over the run: ${gaps.join("; ")}.`;
      }
      sections.push(section);
    }

    const report = [
      "# Oracle report",
      "",
      ...notes,
      "Penetration is measured the same way for every engine (see oracle/lib/score.ts).",
      "Energy gain is how far total mechanical energy rose above its starting value: it should be near 0.",
      "",
      ...sections,
    ].join("\n\n");
    mkdirSync("oracle/out", { recursive: true });
    writeFileSync("oracle/out/report.md", report + "\n");
    console.log("\n" + report + "\n");
  });
});
