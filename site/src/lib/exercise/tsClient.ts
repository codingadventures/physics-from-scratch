// The editor side of the TypeScript help: three small bridges to the language service worker.
//
// This replaces the main-thread half of @valtown/codemirror-ts. That half imports the whole
// TypeScript compiler (about 1 MB gzipped) just to read a few enum names; we only need to forward
// calls to the worker, so we do it here and keep the compiler in the worker alone. Only the
// worker half of that package is used, for the TypeScript side of the same calls.
import { EditorView, hoverTooltip } from "@codemirror/view";
import { linter } from "@codemirror/lint";
import type { CompletionSource } from "@codemirror/autocomplete";
import type { Extension } from "@codemirror/state";
import type { WorkerShape } from "@valtown/codemirror-ts/worker";

export function tsExtensions(
  worker: WorkerShape,
  path: string,
): { source: CompletionSource; extensions: Extension[] } {
  // Send every edit to the worker. The first update also sends the starting text.
  let first = true;
  const sync = EditorView.updateListener.of((u) => {
    if (!u.docChanged && !first) return;
    first = false;
    void worker.updateFile({ path, code: u.state.doc.toString() });
  });

  const source: CompletionSource = (context) =>
    worker.getAutocompletion({ path, context: { pos: context.pos, explicit: context.explicit } });

  const lint = linter(async () => worker.getLints({ path, diagnosticCodesToIgnore: [] }));

  const hover = hoverTooltip(async (_view, pos) => {
    const info = await worker.getHover({ path, pos });
    if (!info?.quickInfo) return null;
    const text = (parts?: ReadonlyArray<{ text: string }>) => (parts ?? []).map((p) => p.text).join("");
    return {
      pos: info.start,
      end: info.end,
      create: () => {
        const dom = document.createElement("div");
        dom.style.cssText = "padding:4px 8px;max-width:420px;font:13px ui-monospace,Menlo,monospace;white-space:pre-wrap";
        dom.textContent = text(info.quickInfo!.displayParts);
        const docs = text(info.quickInfo!.documentation);
        if (docs) {
          const p = document.createElement("div");
          p.style.cssText = "margin-top:4px;font:12px system-ui,sans-serif;color:var(--muted)";
          p.textContent = docs;
          dom.append(p);
        }
        return { dom };
      },
    };
  });

  return { source, extensions: [sync, lint, hover] };
}
