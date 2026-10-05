// npm run doctor: checks that this machine can run the course.
// Plain Node with no dependencies, so it works on macOS, Windows and Linux,
// and still runs when `npm install` has not been done yet.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
let failures = 0;

function ok(msg) {
  console.log(`  ok    ${msg}`);
}
function fail(msg, fix) {
  failures++;
  console.log(`  FAIL  ${msg}\n        fix: ${fix}`);
}

console.log("Physics From Scratch: checking your setup\n");

// 1. Node version against package.json "engines" (a ">=X.Y.Z" range).
const required = pkg.engines.node.replace(">=", "");
const toNums = (v) => v.replace(/^v/, "").split(".").map(Number);
const [rMaj, rMin] = toNums(required);
const [maj, min] = toNums(process.version);
if (maj > rMaj || (maj === rMaj && min >= rMin)) {
  ok(`Node ${process.version} (need ${required} or later)`);
} else {
  fail(
    `Node ${process.version} is too old (need ${required} or later)`,
    "install the current LTS from https://nodejs.org, or open the repo in GitHub Codespaces",
  );
}

// 2. Dependencies installed.
if (existsSync(join(root, "node_modules", "vitest"))) {
  ok("dependencies installed");
} else {
  fail("dependencies are not installed", "run `npm install` in the starter/ folder");
}

// 3. The test runner starts. Exercise tests fail until you implement them,
// so only a crash of the runner itself counts here.
if (failures === 0) {
  const npm = process.platform === "win32" ? "npm.cmd" : "npm";
  const run = spawnSync(npm, ["exec", "--", "vitest", "--version"], {
    cwd: root,
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  if (run.status === 0) {
    const version = /vitest\/(\S+)/.exec(run.stdout)?.[1] ?? "unknown version";
    ok(`test runner starts (vitest ${version})`);
  } else {
    fail("the test runner did not start", "delete node_modules and run `npm install` again");
  }
}

console.log(
  failures === 0
    ? "\nAll good. Run `npm test` to see the exercise tests."
    : `\n${failures} problem(s) found.`,
);
process.exit(failures === 0 ? 0 : 1);
