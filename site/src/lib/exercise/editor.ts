// CodeMirror 6 editor for TypeScript, themed with the site's CSS variables so it follows
// light and dark mode without a second theme package.
import { EditorView, keymap } from "@codemirror/view";
import { Compartment, EditorState } from "@codemirror/state";
import { basicSetup } from "codemirror";
import { autocompletion } from "@codemirror/autocomplete";
import { javascript } from "@codemirror/lang-javascript";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { indentWithTab } from "@codemirror/commands";
import { tags as t } from "@lezer/highlight";

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const theme = EditorView.theme({
  "&": { color: "var(--ink)", backgroundColor: "var(--code)", fontSize: "14px", height: "26rem" },
  "&.cm-focused": { outline: "2px solid var(--accent)", outlineOffset: "-2px" },
  ".cm-scroller": { fontFamily: MONO, lineHeight: "1.5", overflow: "auto" },
  ".cm-content": { caretColor: "var(--ink)" },
  ".cm-gutters": { backgroundColor: "var(--code)", color: "var(--muted)", border: "none" },
  ".cm-activeLine": { backgroundColor: "color-mix(in srgb, var(--ink) 6%, transparent)" },
  ".cm-activeLineGutter": { backgroundColor: "color-mix(in srgb, var(--ink) 6%, transparent)" },
  ".cm-cursor": { borderLeftColor: "var(--ink)" },
  ".cm-tooltip": { backgroundColor: "var(--bg)", color: "var(--ink)", border: "1px solid var(--line)", borderRadius: "6px" },
  ".cm-tooltip-autocomplete > ul": { fontFamily: MONO, fontSize: "13px" },
  ".cm-tooltip-autocomplete > ul > li[aria-selected]": { backgroundColor: "var(--accent)", color: "#fff" },
  ".cm-completionDetail": { color: "var(--muted)" },
  ".cm-selectionBackground, &.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":
    { backgroundColor: "color-mix(in srgb, var(--accent) 30%, transparent)" },
});

// Colours are CSS variables, defined in the page for light and dark.
const highlight = HighlightStyle.define([
  { tag: [t.keyword, t.modifier, t.controlKeyword], color: "var(--syn-keyword)" },
  { tag: [t.string, t.regexp], color: "var(--syn-string)" },
  { tag: [t.number, t.bool, t.null], color: "var(--syn-number)" },
  { tag: t.comment, color: "var(--syn-comment)", fontStyle: "italic" },
  { tag: [t.typeName, t.className], color: "var(--syn-type)" },
  { tag: [t.function(t.variableName), t.function(t.propertyName)], color: "var(--syn-fn)" },
]);

export type Editor = {
  get(): string;
  set(code: string): void;
  focus(): void;
  /**
   * Loads the TypeScript language service in a worker and turns on the "." member list, hover
   * types and error squiggles. Resolves when it is ready; the editor works fine before that.
   */
  enableTypeScript(): Promise<void>;
  /** Type errors in the current code, as "Line N: message". Empty if none, or if type help has not loaded yet. */
  typeErrors(): Promise<string[]>;
};

const tsSupport = new Compartment();

export function createEditor(
  parent: HTMLElement,
  doc: string,
  handlers: { onChange: () => void; onRun: () => void },
): Editor {
  const view = new EditorView({
    parent,
    state: EditorState.create({
      doc,
      extensions: [
        basicSetup,
        javascript({ typescript: true }),
        EditorView.lineWrapping,
        tsSupport.of([]),
        syntaxHighlighting(highlight),
        theme,
        keymap.of([
          { key: "Mod-Enter", run: () => (handlers.onRun(), true) },
          // Tab indents. Keyboard users leave the editor with Esc, then Tab.
          indentWithTab,
        ]),
        EditorView.updateListener.of((u) => u.docChanged && handlers.onChange()),
        EditorView.contentAttributes.of({ "aria-label": "Code editor for integrate.ts" }),
      ],
    }),
  });
  let checker: { worker: import("@valtown/codemirror-ts/worker").WorkerShape; path: string } | null = null;
  return {
    get: () => view.state.doc.toString(),
    set: (code) => view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: code } }),
    focus: () => view.focus(),
    async typeErrors() {
      if (!checker) return [];
      const code = view.state.doc.toString();
      await checker.worker.updateFile({ path: checker.path, code });
      const lints = await checker.worker.getLints({ path: checker.path, diagnosticCodesToIgnore: [] });
      return lints
        .filter((l) => l.severity === "error")
        .map((l) => `Line ${view.state.doc.lineAt(Math.min(l.from, view.state.doc.length)).number}: ${l.message}`);
    },
    async enableTypeScript() {
      // Everything heavy is imported here, so it is downloaded only now, after the editor is up.
      const [comlink, { tsExtensions }, { EXERCISE_PATH }] = await Promise.all([
        import("comlink"),
        import("./tsClient"),
        import("./tsPath"),
      ]);
      const raw = new Worker(new URL("./ts.worker.ts", import.meta.url), { type: "module" });
      const worker = comlink.wrap<import("@valtown/codemirror-ts/worker").WorkerShape>(raw);
      await worker.initialize();
      checker = { worker, path: EXERCISE_PATH };
      const { source, extensions } = tsExtensions(worker, EXERCISE_PATH);
      // Make sure the worker has the learner's text (not the stub) before the first request.
      await worker.updateFile({ path: EXERCISE_PATH, code: view.state.doc.toString() });
      view.dispatch({
        effects: tsSupport.reconfigure([...extensions, autocompletion({ override: [source] })]),
      });
    },
  };
}
