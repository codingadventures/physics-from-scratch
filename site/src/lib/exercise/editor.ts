// CodeMirror 6 editor for TypeScript, themed with the site's CSS variables so it follows
// light and dark mode without a second theme package.
import { EditorView, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { indentWithTab } from "@codemirror/commands";
import { tags as t } from "@lezer/highlight";

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const theme = EditorView.theme({
  "&": { color: "var(--ink)", backgroundColor: "var(--code)", fontSize: "14px", maxHeight: "30rem" },
  "&.cm-focused": { outline: "2px solid var(--accent)", outlineOffset: "-2px" },
  ".cm-scroller": { fontFamily: MONO, lineHeight: "1.5", overflow: "auto" },
  ".cm-content": { caretColor: "var(--ink)" },
  ".cm-gutters": { backgroundColor: "var(--code)", color: "var(--muted)", border: "none" },
  ".cm-activeLine": { backgroundColor: "color-mix(in srgb, var(--ink) 6%, transparent)" },
  ".cm-activeLineGutter": { backgroundColor: "color-mix(in srgb, var(--ink) 6%, transparent)" },
  ".cm-cursor": { borderLeftColor: "var(--ink)" },
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
};

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
  return {
    get: () => view.state.doc.toString(),
    set: (code) => view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: code } }),
    focus: () => view.focus(),
  };
}
