// Opt-in hand-drawn look for the canvas visuals, using Rough.js (https://roughjs.com).
// Wraps a 2D context: strokes of 1.5 px or more (shapes, arrows, bodies) are redrawn
// sketchy; the grid, dashed lines, fills and text stay crisp. The starter code is untouched.
import rough from "roughjs";

type Cmd =
  | { t: "M" | "L"; x: number; y: number }
  | { t: "A"; x: number; y: number; r: number; full: boolean }
  | { t: "Z" };

export function sketchyContext(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D {
  const rc = rough.canvas(ctx.canvas);
  let path: Cmd[] = [];

  function sketchStroke(): boolean {
    if (ctx.lineWidth < 1.5 || ctx.getLineDash().length > 0 || typeof ctx.strokeStyle !== "string")
      return false;
    const opts = {
      stroke: ctx.strokeStyle,
      strokeWidth: ctx.lineWidth,
      roughness: 1.3,
      bowing: 1,
      seed: 7, // fixed, so the lines do not shimmer when the visual redraws
    };
    const pts = path.filter((c): c is Cmd & { t: "M" | "L" } => c.t === "M" || c.t === "L");
    const arc = path.find((c) => c.t === "A");
    if (arc && arc.t === "A" && arc.full) {
      rc.circle(arc.x, arc.y, arc.r * 2, opts);
    } else if (pts.length === 2) {
      rc.line(pts[0]!.x, pts[0]!.y, pts[1]!.x, pts[1]!.y, opts);
    } else if (pts.length > 2) {
      const xy = pts.map((p) => [p.x, p.y] as [number, number]);
      if (path.some((c) => c.t === "Z")) rc.polygon(xy, opts);
      else rc.linearPath(xy, opts);
    } else {
      return false;
    }
    return true;
  }

  return new Proxy(ctx, {
    get(target, prop) {
      switch (prop) {
        case "beginPath":
          return () => {
            path = [];
            target.beginPath();
          };
        case "moveTo":
        case "lineTo":
          return (x: number, y: number) => {
            path.push({ t: prop === "moveTo" ? "M" : "L", x, y });
            target[prop](x, y);
          };
        case "arc":
          return (x: number, y: number, r: number, a0: number, a1: number, ccw?: boolean) => {
            path.push({ t: "A", x, y, r, full: Math.abs(a1 - a0) >= Math.PI * 2 - 1e-6 });
            target.arc(x, y, r, a0, a1, ccw);
          };
        case "closePath":
          return () => {
            path.push({ t: "Z" });
            target.closePath();
          };
        case "stroke":
          return () => {
            if (!sketchStroke()) target.stroke();
          };
      }
      const v = Reflect.get(target, prop, target);
      return typeof v === "function" ? v.bind(target) : v;
    },
    set(target, prop, value) {
      return Reflect.set(target, prop, value, target);
    },
  });
}
