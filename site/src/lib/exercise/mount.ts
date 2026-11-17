// Mounts the exercise widget: editor on one side, canvas and score on the other.
// Learner result is drawn solid, the oracle (Box2D) as a faded ghost.
import type { BodyState, Trace } from "../../../../starter/oracle/lib/types";
import { clear, } from "../../../../starter/src/render/debugDraw";
import { createView, worldToScreen, type View } from "../../../../starter/src/render/view";
import { palette, type Palette } from "../../../../starter/src/render/colors";
import { createEditor } from "./editor";
import { runLearnerCode } from "./run";
import { compare, type Comparison } from "./compare";
import { launchScene } from "./scene";

const TOLERANCE = 1e-9; // same bar as the milestone check in starter/oracle/m1.oracle.test.ts
const STORAGE_KEY = "pfs:exercise:integrate:v1";

type Options = { stub: string; filename: string };

const CSS = `
.pfs-ex { display: grid; gap: 16px; margin: 1rem 0; }
@media (min-width: 900px) { .pfs-ex { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: start; } }
.pfs-ex { --syn-keyword:#8a3ffc; --syn-string:#0f7b55; --syn-number:#b45309; --syn-comment:#7a786e; --syn-type:#1d6fa5; --syn-fn:#2563c9; }
@media (prefers-color-scheme: dark) { .pfs-ex { --syn-keyword:#c4a2ff; --syn-string:#6fd3a8; --syn-number:#f0a35e; --syn-comment:#8c8a83; --syn-type:#7cc4f0; --syn-fn:#8bb4f7; } }
.pfs-ex button { font: inherit; font-size: 14px; min-height: 36px; padding: 0 14px; border: 1px solid var(--line); border-radius: 6px; background: var(--bg); color: var(--ink); cursor: pointer; }
.pfs-ex button.primary { background: var(--accent); border-color: var(--accent); color: #fff; font-weight: 600; }
.pfs-ex button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.pfs-ex .bar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
/* One fixed-height row under the editor: its content changes, its size never does. */
.pfs-ex .statusbar { display: flex; justify-content: space-between; gap: 12px; height: 28px; line-height: 28px; padding: 0 2px; color: var(--muted); font-size: 13px; white-space: nowrap; overflow: hidden; }
.pfs-ex .statusbar span { overflow: hidden; text-overflow: ellipsis; }
.pfs-ex .editor { border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
.pfs-ex canvas { display: block; width: 100%; aspect-ratio: 16 / 10; border: 1px solid var(--line); border-radius: 8px; }
.pfs-ex .controls { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
.pfs-ex .controls input { flex: 1; min-width: 0; }
.pfs-ex .time { color: var(--muted); font-size: 13px; font-variant-numeric: tabular-nums; min-width: 4.5em; text-align: right; }
.pfs-ex .legend { display: flex; gap: 16px; font-size: 13px; color: var(--muted); margin-top: 6px; }
.pfs-ex .legend i { display: inline-block; width: 14px; height: 10px; vertical-align: -1px; margin-right: 6px; border: 2px solid; border-radius: 2px; }
.pfs-ex .score { margin-top: 12px; padding: 10px 14px; border: 1px solid var(--line); border-left-width: 4px; border-radius: 6px; }
.pfs-ex .score strong { display: block; font-size: 1.05rem; }
.pfs-ex .score.pass { border-left-color: #0f8a5f; }
.pfs-ex .score.fail { border-left-color: #b7791f; }
.pfs-ex .score p { margin: 4px 0 0; font-size: 14px; color: var(--muted); }
.pfs-ex .score code { font-size: 13px; }
`;

const num = (n: number) => (Math.abs(n) >= 1e-3 || n === 0 ? n.toFixed(4) : n.toExponential(2));

function load(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function save(code: string | null): boolean {
  try {
    if (code === null) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, code);
    return true;
  } catch {
    return false;
  }
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<HTMLElementTagNameMap[K]> & { className?: string } = {},
  ...children: Array<Node | string>
): HTMLElementTagNameMap[K] {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
}

export async function mountExercise(root: HTMLElement, opts: Options): Promise<void> {
  const style = el("style", { textContent: CSS });
  document.head.append(style);
  root.classList.add("pfs-ex");

  // ---- left: editor ----
  const runBtn = el("button", { className: "primary", textContent: "Run  (Ctrl/⌘ Enter)" });
  const resetBtn = el("button", { textContent: "Reset" });
  const downloadBtn = el("button", { textContent: `Download ${opts.filename}` });
  const savedLabel = el("span", { textContent: "Not saved yet" });
  const tsLabel = el("span", { textContent: "Loading type help…" });
  const editorHost = el("div", { className: "editor" });
  const left = el(
    "div",
    {},
    el("div", { className: "bar" }, runBtn, resetBtn, downloadBtn),
    editorHost,
    el("div", { className: "statusbar" }, savedLabel, tsLabel),
  );

  // ---- right: canvas, controls, score ----
  const canvas = el("canvas");
  canvas.setAttribute("aria-label", "Your box (solid) and the Box2D reference (faded)");
  const playBtn = el("button", { textContent: "Play" });
  const slider = el("input", { type: "range", min: "0", max: "0", value: "0" });
  slider.setAttribute("aria-label", "Time");
  const time = el("span", { className: "time", textContent: "0.00 s" });
  const legend = el("div", { className: "legend" });
  legend.innerHTML = `<span><i style="border-color:var(--accent);background:color-mix(in srgb,var(--accent) 18%,transparent)"></i>Your result</span><span><i style="border-color:#c2410c;opacity:.4"></i>Box2D</span>`;
  const score = el("div", { className: "score" });
  score.setAttribute("aria-live", "polite");
  const right = el("div", {}, canvas, el("div", { className: "controls" }, playBtn, slider, time), legend, score);
  root.append(left, right);

  // ---- state ----
  let oracle: Trace | null = null;
  let mine: BodyState[][] | null = null;
  let frame = 0;
  let playing = false;
  let raf = 0;
  const steps = Math.round(launchScene.seconds / launchScene.dt);
  slider.max = String(steps);
  const view: View = createView(canvas);

  const setScore = (cls: "" | "pass" | "fail", head: string, detail = "") => {
    score.className = `score ${cls}`;
    score.replaceChildren(el("strong", { textContent: head }));
    if (detail) {
      const p = el("p");
      p.innerHTML = detail;
      score.append(p);
    }
  };

  // ---- drawing ----
  function bodyOutline(v: View, i: number, s: BodyState): void {
    const shape = launchScene.bodies[i].shape;
    const { ctx } = v;
    ctx.beginPath();
    if (shape.kind === "circle") {
      const c = worldToScreen(v, s.position);
      ctx.arc(c.x, c.y, shape.radius * v.pixelsPerMetre, 0, Math.PI * 2);
    } else {
      const cos = Math.cos(s.angle);
      const sin = Math.sin(s.angle);
      [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([sx, sy], k) => {
        const lx = sx * shape.halfWidth;
        const ly = sy * shape.halfHeight;
        const p = worldToScreen(v, { x: s.position.x + cos * lx - sin * ly, y: s.position.y + sin * lx + cos * ly });
        if (k === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
    }
  }

  function path(v: View, states: Array<BodyState[]>, body: number, upTo: number): void {
    const { ctx } = v;
    ctx.beginPath();
    let started = false;
    for (let f = 0; f <= upTo && f < states.length; f++) {
      const p = states[f][body].position;
      if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) continue;
      const s = worldToScreen(v, p);
      if (!started) ctx.moveTo(s.x, s.y);
      else ctx.lineTo(s.x, s.y);
      started = true;
    }
    ctx.stroke();
  }

  function draw(): void {
    const pal: Palette = palette();
    // Fit the whole scene (x from -5.5 to 4.6, y from -1.3 to 5.5) into whatever size the canvas has.
    view.pixelsPerMetre = Math.min(canvas.clientWidth / 11.5, canvas.clientHeight / 7.4);
    view.center = { x: -0.45, y: 2.1 };
    clear(view, pal);
    const { ctx } = view;
    const ghost = oracle?.map((f) => f.bodies);
    const mover = launchScene.bodies.findIndex((b) => b.mass > 0);

    if (ghost) {
      // With no result of yours yet, the reference is the star of the show: full strength and filled.
      const target = mine === null;
      ctx.save();
      ctx.globalAlpha = target ? 1 : 0.4;
      ctx.strokeStyle = pal.b;
      ctx.lineWidth = target ? 2 : 1.5;
      ctx.setLineDash([5, 4]);
      path(view, ghost, mover, ghost.length);
      ctx.setLineDash([]);
      ghost[Math.min(frame, ghost.length - 1)].forEach((s, i) => {
        bodyOutline(view, i, s);
        if (target) {
          ctx.fillStyle = launchScene.bodies[i].mass === 0 ? pal.grid : pal.b + "30";
          ctx.fill();
        }
        ctx.stroke();
      });
      ctx.restore();
    }
    if (mine) {
      ctx.save();
      ctx.strokeStyle = pal.a;
      ctx.lineWidth = 1.5;
      path(view, mine, mover, frame);
      mine[Math.min(frame, mine.length - 1)].forEach((s, i) => {
        if (![s.position.x, s.position.y, s.angle].every(Number.isFinite)) return;
        bodyOutline(view, i, s);
        ctx.fillStyle = launchScene.bodies[i].mass === 0 ? pal.grid : pal.a + "30";
        ctx.fill();
        ctx.strokeStyle = launchScene.bodies[i].mass === 0 ? pal.static : pal.a;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
      ctx.restore();
    }
    slider.value = String(frame);
    time.textContent = `${(frame * launchScene.dt).toFixed(2)} s`;
  }

  function setPlaying(on: boolean): void {
    playing = on; // the Box2D reference plays even before you have run any code
    playBtn.textContent = playing ? "Pause" : "Play";
    cancelAnimationFrame(raf);
    if (!playing) return;
    let last: number | null = null;
    let acc = 0;
    const tick = (now: number) => {
      // The first timestamp only sets the clock: rAF's `now` can be earlier than performance.now().
      if (last !== null) acc += Math.max(0, now - last) / 1000;
      last = now;
      const advance = Math.floor(acc / launchScene.dt);
      acc -= advance * launchScene.dt;
      frame = Math.min(steps, frame + advance);
      draw();
      if (frame >= steps) return setPlaying(false);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }

  // ---- oracle (the ghost) ----
  const [{ box2d }, { record }] = await Promise.all([
    import("../../../../starter/oracle/lib/engines"),
    import("../../../../starter/oracle/lib/score"),
  ]);
  oracle = record(box2d, launchScene).trace;

  // ---- running ----
  async function run(): Promise<void> {
    setPlaying(false);
    runBtn.disabled = true;
    setScore("", "Running…");
    const r = await runLearnerCode(editor.get(), launchScene);
    runBtn.disabled = false;
    if (!r.ok) {
      mine = null;
      draw();
      const what = { syntax: "Syntax error", runtime: "Your code threw", timeout: "Timed out" }[r.kind];
      setScore("fail", what, `<code></code>`);
      score.querySelector("code")!.textContent = r.message;
      return;
    }
    mine = r.frames;
    const c: Comparison = compare(mine, oracle!, TOLERANCE);
    if (c.first === null) {
      setScore("pass", "Matches Box2D", `Largest difference ${c.maxError.toExponential(1)} over ${steps} steps and every body. The bar is ${TOLERANCE.toExponential(0)}.`);
    } else {
      const m = c.first;
      const who = launchScene.bodies[m.body].mass === 0 ? "the pad" : "the box";
      setScore(
        "fail",
        "Differs from Box2D",
        `First difference at step ${m.frame}: for ${who}, <code>${m.field}</code> is ${num(m.mine)} but Box2D has ${num(m.oracle)}. Largest difference ${c.maxError.toExponential(1)}.`,
      );
    }
    frame = 0;
    setPlaying(true);
  }

  // ---- editor and saving ----
  let saveTimer = 0;
  const showSaved = (ok: boolean) => {
    savedLabel.textContent = ok ? "Saved in this browser" : "Not saved (browser storage is blocked)";
  };
  const editor = createEditor(editorHost, load() ?? opts.stub, {
    onChange: () => {
      savedLabel.textContent = "Editing…";
      clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => showSaved(save(editor.get())), 400);
    },
    onRun: () => void run(),
  });
  if (load() !== null) showSaved(true);
  // Type-aware help (the "." member list, hover types, error squiggles) arrives a moment later.
  editor.enableTypeScript().then(
    () => (tsLabel.textContent = "Type help on: press . for members"),
    (e) => {
      tsLabel.textContent = "Type help unavailable";
      console.error(e);
    },
  );

  runBtn.onclick = () => void run();
  resetBtn.onclick = () => {
    if (!confirm("Replace your code with the original stub? Download first if you want to keep it.")) return;
    editor.set(opts.stub);
    save(null);
    savedLabel.textContent = "Reset";
  };
  downloadBtn.onclick = () => {
    const url = URL.createObjectURL(new Blob([editor.get()], { type: "text/plain" }));
    const a = el("a", { href: url, download: opts.filename });
    a.click();
    URL.revokeObjectURL(url);
  };
  playBtn.onclick = () => {
    if (!playing && frame >= steps) frame = 0;
    setPlaying(!playing);
  };
  slider.oninput = () => {
    setPlaying(false);
    frame = Number(slider.value);
    draw();
  };
  new ResizeObserver(draw).observe(canvas);
  setScore("", "Press Play to see the target", "This is Box2D with the launch your code has to reproduce. When you are ready, write integrate and press Run.");
  draw();
}
