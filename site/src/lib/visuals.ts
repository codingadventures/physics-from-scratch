// Mounts the real starter widgets into <div data-visual="id"> placeholders.
// Each visual is loaded on demand, so a page only downloads the code it uses.

// `sketchy` is opt-in per visual: the hand-drawn Rough.js look. Add `?sketchy=1` or
// `?sketchy=0` to a page URL to compare.
type Options = { sketchy: boolean };
type Mount = (el: HTMLElement, o: Options) => Promise<void>;

const sketchyDefault: Record<string, boolean> = { "v0-vector-add": true };

const visuals: Record<string, Mount> = {
  "v1-euler-energy": async (el) => {
    const { createEulerEnergyVisual } = await import("../../../starter/src/visuals/eulerEnergy");
    createEulerEnergyVisual(el);
  },
  "v0-vector-add": async (el, { sketchy }) => {
    const [{ recordTrace }, { createPlayer }, { makeDraggable }, { tracedVectorAdd }] =
      await Promise.all([
        import("../../../starter/src/trace/trace"),
        import("../../../starter/src/visuals/player"),
        import("../../../starter/src/visuals/drag"),
        import("../../../starter/src/visuals/algos/vectorAdd"),
      ]);
    // Same setup as starter/src/demos/demo0.ts.
    let a = { x: 2, y: 1 };
    let b = { x: 1, y: 2 };
    const record = () => recordTrace(() => tracedVectorAdd(a, b));
    const player = createPlayer(el, record(), { center: { x: 1.5, y: 1.5 }, pixelsPerMetre: 60 });
    makeDraggable(
      player.view,
      [
        { get: () => a, set: (p) => (a = p) },
        { get: () => ({ x: a.x + b.x, y: a.y + b.y }), set: (p) => (b = { x: p.x - a.x, y: p.y - a.y }) },
      ],
      () => player.setRecording(record()),
    );
    if (sketchy) {
      const { sketchyContext } = await import("./sketchy");
      player.view.ctx = sketchyContext(player.view.ctx);
    }
    player.goTo(2);
  },
};

// Pills hold `<!-- visual: id -->` (valid Markdown, invisible on GitHub). Astro keeps the
// comment in the HTML, so we swap each one for a placeholder here, then mount into it.
function placeholders(): HTMLElement[] {
  const found: Comment[] = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT);
  while (walker.nextNode()) found.push(walker.currentNode as Comment);
  const out: HTMLElement[] = [];
  for (const c of found) {
    const m = /^\s*visual:\s*([\w-]+)\s*$/.exec(c.data);
    if (!m) continue;
    const div = document.createElement("div");
    div.className = "visual";
    div.dataset.visual = m[1];
    c.replaceWith(div);
    out.push(div);
  }
  return out;
}

export function mountVisuals(): void {
  for (const el of placeholders()) {
    const id = el.dataset.visual!;
    const mount = visuals[id];
    if (!mount) {
      el.textContent = `Visual ${id} is not built yet.`;
      el.className = "visual meta";
      continue;
    }
    const q = new URLSearchParams(location.search).get("sketchy");
    const sketchy = q === null ? (sketchyDefault[id] ?? false) : q === "1";
    mount(el, { sketchy }).catch((e) => {
      el.textContent = "This visual failed to load.";
      console.error(e);
    });
  }
}
