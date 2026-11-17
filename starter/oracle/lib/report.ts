// Turn scores into a table for the console or a Markdown file.
import type { RunMetrics } from "./score";

const fmt = (x: number | null, digits = 4): string =>
  x === null ? "-" : Math.abs(x) < 1e-12 ? "0" : x.toFixed(digits);

export type ReportRow =
  { engine: string; metrics: RunMetrics } | { engine: string; skipped: string };

/** One Markdown table for one scene. Rows are engines, columns are metrics. */
export function sceneTable(title: string, rows: ReportRow[]): string {
  const head = [
    "engine",
    "finite",
    "ground pen (m)",
    "pair overlap (m)",
    "energy gain (J)",
    "energy drift (J)",
    "settle (s)",
    "rest y err",
    "stop x err",
  ];
  const lines = [
    `### ${title}`,
    "",
    `| ${head.join(" | ")} |`,
    `|${head.map(() => "---").join("|")}|`,
  ];
  for (const row of rows) {
    if ("skipped" in row) {
      lines.push(`| ${row.engine} | ${row.skipped} |${" |".repeat(head.length - 2)}`);
      continue;
    }
    const m = row.metrics;
    lines.push(
      `| ${[
        row.engine,
        m.finite ? "yes" : "NO",
        fmt(m.maxGroundPenetration),
        fmt(m.maxPairOverlap),
        fmt(m.maxEnergyGain, 3),
        fmt(m.energyDrift, 3),
        m.settleTime === null ? "never" : fmt(m.settleTime, 2),
        fmt(m.restYError),
        fmt(m.stopXError),
      ].join(" | ")} |`,
    );
  }
  return lines.join("\n");
}
