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
.pfs-ex { margin: 1rem 0; container-type: inline-size; }
/* Two columns only when the widget itself is wide (the try page), stacked in a lesson column. */
.pfs-ex .pfs-grid { display: grid; gap: 16px; }
@container (min-width: 900px) { .pfs-ex .pfs-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: start; } }
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

/** A game-over style banner: the scene dims, a red title sits in the centre, the reason below it. */
function drawFailure(view: View, f: { title: string; detail: string }, pal: Palette): void {
  const { ctx, canvas } = view;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const dark = pal.background !== "#fbfbf9";
  ctx.save();
  ctx.fillStyle = dark ? "rgba(0,0,0,0.62)" : "rgba(255,255,255,0.7)";
  ctx.fillRect(0, 0, w, h);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = dark ? "#ff6b6b" : "#c2262d";
  const size = Math.max(20, Math.min(40, w / 15));
  ctx.font = `800 ${size}px system-ui, sans-serif`;
  ctx.fillText(f.title.toUpperCase(), w / 2, h / 2 - 8);
  ctx.fillStyle = pal.ink;
  ctx.font = "13px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  // The reason is the real message, wrapped on spaces (at most 5 lines) rather than cut short.
  const perLine = Math.max(16, Math.floor((w - 32) / 7.8));
  const lines: string[] = [];
  let cur = "";
  for (const word of f.detail.split(/\s+/)) {
    if (cur && cur.length + 1 + word.length > perLine) {
      lines.push(cur);
      cur = word;
    } else cur = cur ? `${cur} ${word}` : word;
  }
  if (cur) lines.push(cur);
  const shown = lines.slice(0, 5);
  if (lines.length > 5) shown[4] = shown[4].slice(0, perLine - 1) + "…";
  shown.forEach((line, i) => ctx.fillText(line, w / 2, h / 2 + size * 0.6 + i * 18));
  ctx.restore();
}

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
  const downloadBtn = el("button", { textContent: "Download" });
  downloadBtn.title = `Save your code as ${opts.filename}`;
  const openBtn = el("button", { textContent: "Open" });
  openBtn.title = `Load a ${opts.filename} you downloaded earlier into the editor`;
  const picker = el("input", { type: "file", accept: ".ts,.txt,text/plain", hidden: true });
  const savedLabel = el("span", { textContent: "Not saved yet" });
  const tsLabel = el("span", { textContent: "Loading type help…" });
  const editorHost = el("div", { className: "editor" });
  const left = el(
    "div",
    {},
    el("div", { className: "bar" }, runBtn, resetBtn, downloadBtn, openBtn, picker),
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
  legend.innerHTML = `<span><i style="border-color:var(--accent);background:color-mix(in srgb,var(--accent) 18%,transparent)"></i>Your result</span><span><i style="border-color:#c2410c;border-style:dashed"></i>Box2D</span>`;
  const score = el("div", { className: "score" });
  score.setAttribute("aria-live", "polite");
  const right = el("div", {}, canvas, el("div", { className: "controls" }, playBtn, slider, time), legend, score);
  root.append(el("div", { className: "pfs-grid" }, left, right));
  // Until the Box2D reference and the editor have loaded, the buttons would do nothing. Say so
  // instead of letting a click vanish.
  runBtn.disabled = playBtn.disabled = true;
  editorHost.textContent = "Loading the editor…";
  editorHost.style.padding = "12px";
  editorHost.style.color = "var(--muted)";

  // ---- state ----
  let oracle: Trace | null = null;
  let mine: BodyState[][] | null = null;
  // The scene alone fits x from -5.5 to 4.6 and y from -1.3 to 5.5. The view starts there on every
  // Play and zooms out as your box strays: the bounds at frame f cover everything up to frame f.
  type Bounds = { minX: number; maxX: number; minY: number; maxY: number };
  const sceneBounds: Bounds = { minX: -6, maxX: 5, minY: -1.5, maxY: 5.8 };
  let cumBounds: Bounds[] | null = null;
  const fitTo = (frames: BodyState[][] | null) => {
    if (!frames) {
      cumBounds = null;
      return;
    }
    const LIMIT = 60; // ignore wild values (NaN, 1e9): they stay off screen rather than zoom to nothing
    const b = { ...sceneBounds };
    cumBounds = frames.map((f) => {
      for (const s of f) {
        const { x, y } = s.position;
        if (!Number.isFinite(x) || !Number.isFinite(y) || Math.abs(x) > LIMIT || Math.abs(y) > LIMIT) continue;
        b.minX = Math.min(b.minX, x - 1);
        b.maxX = Math.max(b.maxX, x + 1);
        b.minY = Math.min(b.minY, y - 1);
        b.maxY = Math.max(b.maxY, y + 1);
      }
      return { ...b };
    });
  };
  // Shown over the canvas when your code does not compile or does not run.
  let failure: { title: string; detail: string } | null = null;
  // Whether your last run matched Box2D (null before the first run).
  let matched: boolean | null = null;
  // The same, per body: each body is green if its whole run matches Box2D, blue if not.
  let bodyOk: boolean[] = [];
  // The code the last Run used, so Play can tell whether you have changed anything since.
  let lastRunCode: string | null = null;
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
    // Fit the view to the scene, and to your result too, so a box that flies off still shows.
    const bounds = cumBounds ? cumBounds[Math.min(frame, cumBounds.length - 1)] : sceneBounds;
    const w = bounds.maxX - bounds.minX;
    const h = bounds.maxY - bounds.minY;
    view.pixelsPerMetre = Math.min(canvas.clientWidth / w, canvas.clientHeight / h);
    view.center = { x: (bounds.minX + bounds.maxX) / 2, y: (bounds.minY + bounds.maxY) / 2 };
    clear(view, pal);
    const { ctx } = view;
    const ghost = oracle?.map((f) => f.bodies);
    const mover = launchScene.bodies.findIndex((b) => b.mass > 0);

    const dashedOutlines = (states: BodyState[], alpha: number): void => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = pal.b;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      states.forEach((s, i) => {
        bodyOutline(view, i, s);
        ctx.stroke();
      });
      ctx.restore();
    };

    if (ghost && mine === null) {
      // No result of yours yet: the reference is the star of the show, full strength and filled.
      ctx.save();
      ctx.strokeStyle = pal.b;
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 4]);
      path(view, ghost, mover, ghost.length);
      ctx.setLineDash([]);
      ghost[Math.min(frame, ghost.length - 1)].forEach((s, i) => {
        bodyOutline(view, i, s);
        ctx.fillStyle = launchScene.bodies[i].mass === 0 ? pal.grid : pal.b + "30";
        ctx.fill();
        ctx.stroke();
      });
      ctx.restore();
    }
    if (mine) {
      // Under your box: the faint reference path. Over it: the reference as a dashed outline, so
      // a perfect match still shows (orange dashes on your outline) instead of disappearing.
      if (ghost) {
        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = pal.b;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 4]);
        path(view, ghost, mover, ghost.length);
        ctx.restore();
      }
      // Every body is drawn the same way: blue while it differs from Box2D, green once it matches.
      const colorOf = (i: number) => (bodyOk[i] ? pal.normal : pal.a);
      ctx.save();
      ctx.strokeStyle = colorOf(mover);
      ctx.lineWidth = 1.5;
      path(view, mine, mover, frame);
      const now = mine[Math.min(frame, mine.length - 1)];
      now.forEach((s, i) => {
        if (![s.position.x, s.position.y, s.angle].every(Number.isFinite)) return;
        bodyOutline(view, i, s);
        ctx.fillStyle = colorOf(i) + "30";
        ctx.fill();
        ctx.strokeStyle = colorOf(i);
        ctx.lineWidth = 2;
        ctx.stroke();
      });
      ctx.restore();
      if (ghost) {
        const g = ghost[Math.min(frame, ghost.length - 1)];
        dashedOutlines(g, 0.95);
        // For every body: a line between the two centres, with its length, while they are apart.
        now.forEach((s, i) => {
          const gap = Math.hypot(s.position.x - g[i].position.x, s.position.y - g[i].position.y);
          if (!Number.isFinite(gap) || gap <= 0.01) return;
          const pa = worldToScreen(view, s.position);
          const pb = worldToScreen(view, g[i].position);
          ctx.save();
          ctx.strokeStyle = pal.contact;
          ctx.fillStyle = pal.contact;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.stroke();
          ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
          const mx = (pa.x + pb.x) / 2;
          const nearRight = mx > canvas.clientWidth - 110; // keep the label on the canvas
          ctx.textAlign = nearRight ? "right" : "left";
          ctx.fillText(`${gap.toFixed(2)} m apart`, mx + (nearRight ? -10 : 10), (pa.y + pb.y) / 2 - 6);
          ctx.restore();
        });
      }
      if (matched) {
        ctx.save();
        ctx.fillStyle = pal.normal;
        ctx.font = "600 14px system-ui, sans-serif";
        ctx.fillText("✓ Matches Box2D", 12, 22);
        ctx.restore();
      }
    }
    if (failure) drawFailure(view, failure, pal);
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
    try {
      await runInner();
    } catch (e) {
      // Never leave the Run button stuck: show whatever went wrong.
      runBtn.disabled = false;
      mine = null;
      matched = null;
      fitTo(null);
      frame = 0;
      failure = { title: "Runtime Error", detail: e instanceof Error ? `${e.name}: ${e.message}` : String(e) };
      draw();
      setScore("fail", "Runtime Error", "");
    }
  }

  async function runInner(): Promise<void> {
    setPlaying(false);
    runBtn.disabled = true;
    setScore("", "Running…");
    failure = null;
    lastRunCode = editor.get();
    const fail = (title: string, detail: string) => {
      runBtn.disabled = false;
      mine = null;
      matched = null;
      fitTo(null);
      frame = 0;
      failure = { title, detail };
      draw();
      setScore("fail", title, `<code></code>`);
      score.querySelector("code")!.textContent = detail;
    };
    // Type errors first (when the type help has loaded): the real project would not compile them.
    const typeErrors = await editor.typeErrors().catch(() => [] as string[]); // type help is optional
    if (typeErrors.length > 0) return fail("Compilation Failure", typeErrors[0]);
    const r = await runLearnerCode(editor.get(), launchScene);
    runBtn.disabled = false;
    if (!r.ok) {
      if (r.kind === "syntax") return fail("Compilation Failure", r.message);
      return fail(r.kind === "timeout" ? "Timed Out" : "Runtime Error", r.message);
    }
    mine = r.frames;
    fitTo(mine);
    const c: Comparison = compare(mine, oracle!, TOLERANCE);
    matched = c.first === null;
    bodyOk = c.perBody.map((e) => e <= TOLERANCE);
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
  // Browser storage can be cleared (site data, private windows, Safari after a week away). Ask the
  // browser to treat ours as persistent, and say plainly which case we are in.
  let kept = false;
  let persistAsked = false;
  const keepStorage = async (): Promise<boolean> => {
    try {
      if (!navigator.storage?.persist) return false;
      if (await navigator.storage.persisted()) return true;
      if (persistAsked) return false;
      persistAsked = true;
      return await navigator.storage.persist();
    } catch {
      return false;
    }
  };
  const describeSaved = (ok: boolean) => {
    savedLabel.textContent = !ok
      ? "Not saved (browser storage is blocked)"
      : kept
        ? "Saved · the browser will keep it"
        : "Saved in this browser only";
    savedLabel.title = ok
      ? kept
        ? "Stored in this browser. Download a copy if you want a backup."
        : "Stored in this browser only. Clearing site data removes it, so Download a copy to keep it."
      : "";
  };
  const showSaved = (ok: boolean) => {
    describeSaved(ok);
    if (ok) void keepStorage().then((k) => k !== kept && ((kept = k), describeSaved(true)));
  };
  editorHost.textContent = "";
  editorHost.removeAttribute("style");
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
    // Back to the target view: nothing of yours to show any more.
    setPlaying(false);
    mine = null;
    matched = null;
    bodyOk = [];
    lastRunCode = null;
    failure = null;
    fitTo(null);
    frame = 0;
    draw();
    setScore("", "Press Play to see the target", "This is Box2D with the launch your code has to reproduce. When you are ready, write integrate and press Run.");
  };
  openBtn.onclick = () => picker.click();
  picker.onchange = async () => {
    const file = picker.files?.[0];
    picker.value = "";
    if (!file) return;
    if (file.size > 200_000) return void alert("That file is too big to be your integrate.ts.");
    editor.set(await file.text()); // one edit, so Ctrl/⌘ Z brings your previous code back
    savedLabel.textContent = "Opened " + file.name;
  };
  downloadBtn.onclick = () => {
    const url = URL.createObjectURL(new Blob([editor.get()], { type: "text/plain" }));
    const a = el("a", { href: url, download: opts.filename });
    a.click();
    URL.revokeObjectURL(url);
  };
  playBtn.onclick = () => {
    // Play runs your code when it has changed since the last Run (or that Run failed). Only the
    // untouched stub plays the Box2D target on its own.
    const code = editor.get();
    if (!playing && code !== opts.stub && (code !== lastRunCode || mine === null)) {
      void run();
      return;
    }
    failure = null; // Play shows the target again
    if (!playing && frame >= steps) frame = 0;
    setPlaying(!playing);
  };
  slider.oninput = () => {
    setPlaying(false);
    frame = Number(slider.value);
    draw();
  };
  runBtn.disabled = playBtn.disabled = false;
  new ResizeObserver(draw).observe(canvas);
  setScore("", "Press Play to see the target", "This is Box2D with the launch your code has to reproduce. When you are ready, write integrate and press Run.");
  draw();
}
