// npm run progress: how many tests pass per exercise.
//
// With --expect-stubs (used by CI on the course repository itself), it also
// checks that every failing test fails only because a stub still throws
// "TODO: Exercise ...", and that the given code's own tests all pass. That
// catches a broken test file without needing a reference solution.
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const expectStubs = process.argv.includes("--expect-stubs");
const dir = mkdtempSync(join(tmpdir(), "pfs-progress-"));
const out = join(dir, "results.json");

const npx = process.platform === "win32" ? "npx.cmd" : "npx";
const run = spawnSync(npx, ["vitest", "run", "--reporter=json", `--outputFile=${out}`], {
  cwd: root,
  encoding: "utf8",
  shell: process.platform === "win32",
});

let results;
try {
  results = JSON.parse(readFileSync(out, "utf8"));
} catch {
  console.error("Could not run the tests. Output:\n" + run.stdout + run.stderr);
  process.exit(1);
} finally {
  rmSync(dir, { recursive: true, force: true });
}

const rows = new Map(); // exercise -> { pass, total }
const problems = [];

for (const file of results.testResults) {
  const path = relative(root, file.name).split("\\").join("/");
  const match = /^tests\/ex([0-9a-z]+)-/.exec(path);
  const exercise = match ? `Exercise ${match[1]}` : null;

  // A file that fails to load (syntax error, bad import) has no assertions.
  if (file.assertionResults.length === 0 && file.status === "failed") {
    problems.push(`${path}: the file did not load: ${(file.message ?? "").split("\n")[0]}`);
  }

  for (const t of file.assertionResults) {
    const passed = t.status === "passed";
    if (exercise) {
      const row = rows.get(exercise) ?? { pass: 0, total: 0 };
      row.total++;
      if (passed) row.pass++;
      rows.set(exercise, row);
      if (expectStubs && t.status === "failed") {
        const msg = (t.failureMessages ?? []).join("\n");
        if (!msg.includes("TODO: Exercise")) {
          problems.push(`${path} > ${t.fullName}: failed for a reason other than a TODO stub`);
        }
      }
    } else if (expectStubs && t.status === "failed") {
      problems.push(`${path} > ${t.fullName}: given code's test failed`);
    }
  }
}

const sorted = [...rows.entries()].sort(([a], [b]) => a.localeCompare(b, "en", { numeric: true }));
const width = Math.max(10, ...sorted.map(([name]) => name.length));
console.log(`${"".padEnd(width)}  passing`);
for (const [name, { pass, total }] of sorted) {
  const bar = "#".repeat(Math.round((pass / total) * 20)).padEnd(20, ".");
  console.log(
    `${name.padEnd(width)}  ${String(pass).padStart(3)} / ${String(total).padEnd(3)} ${bar}`,
  );
}
if (sorted.length === 0) console.log("No exercise tests yet.");

if (expectStubs) {
  if (problems.length) {
    console.error(`\n${problems.length} problem(s):\n  ` + problems.join("\n  "));
    process.exit(1);
  }
  console.log("\nStub check passed: every failing test fails on a TODO stub.");
}
