// Turns the learner's TypeScript into JavaScript (Sucrase strips the types) and runs it in a
// worker. A fresh worker per run, so an infinite loop is cleaned up by terminating it.
import { transform } from "sucrase";
import type { BodyState, Scene } from "../../../../starter/oracle/lib/types";
import type { RunRequest, RunResponse } from "./runner.worker";

export type RunResult =
  | { ok: true; frames: BodyState[][] }
  | { ok: false; kind: "syntax" | "runtime" | "timeout"; message: string };

const TIMEOUT_MS = 3000;

export function toJavaScript(ts: string): string {
  return transform(ts, { transforms: ["typescript", "imports"] }).code;
}

export function runLearnerCode(ts: string, scene: Scene): Promise<RunResult> {
  let js: string;
  try {
    js = toJavaScript(ts);
  } catch (e) {
    return Promise.resolve({
      ok: false,
      kind: "syntax",
      message: e instanceof Error ? e.message : String(e),
    });
  }
  return new Promise((resolve) => {
    const worker = new Worker(new URL("./runner.worker.ts", import.meta.url), { type: "module" });
    const done = (r: RunResult) => {
      clearTimeout(timer);
      worker.terminate();
      resolve(r);
    };
    const timer = setTimeout(
      () =>
        done({
          ok: false,
          kind: "timeout",
          message: `Your code ran for more than ${TIMEOUT_MS / 1000} s. Is there a loop that never ends?`,
        }),
      TIMEOUT_MS,
    );
    worker.onmessage = (e: MessageEvent<RunResponse>) => {
      const r = e.data;
      if (r.ok) return done({ ok: true, frames: r.frames });
      const where = r.step === null ? "" : ` (at step ${r.step})`;
      done({ ok: false, kind: "runtime", message: r.error + where });
    };
    worker.onerror = (e) => done({ ok: false, kind: "runtime", message: e.message || "Worker error" });
    const req: RunRequest = { js, scene };
    worker.postMessage(req);
  });
}
