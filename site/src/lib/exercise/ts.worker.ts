// The TypeScript language service, running in a worker so typing never waits for it.
// It powers the "." member list, hover types and error squiggles in the editor.
//
// The project it sees is the starter's own given types (Vec2, Shape, Body) at their real paths,
// so `body.` lists the real fields. Those files are the exercise stubs: types only, no solutions.
import ts from "typescript";
import { createSystem, createVirtualTypeScriptEnvironment } from "@typescript/vfs";
import * as Comlink from "comlink";
import { createWorker } from "@valtown/codemirror-ts/worker";
import vec2Source from "../../../../starter/src/math/vec2.ts?raw";
import shapesSource from "../../../../starter/src/dynamics/shapes.ts?raw";
import bodySource from "../../../../starter/src/dynamics/body.ts?raw";
import integrateStub from "../../../../starter/src/dynamics/integrate.ts?raw";
import { EXERCISE_PATH } from "./tsPath";

// The standard library typings (Math, Array, ...) come from the installed typescript package,
// bundled with the worker: no network at run time. DOM typings are left out on purpose.
const libs = import.meta.glob(
  ["/node_modules/typescript/lib/lib.es*.d.ts", "/node_modules/typescript/lib/lib.decorators*.d.ts"],
  { query: "?raw", import: "default", eager: true },
) as Record<string, string>;

Comlink.expose(
  createWorker(async () => {
    const files = new Map<string, string>();
    for (const [p, src] of Object.entries(libs)) files.set("/" + p.split("/").pop()!, src);
    files.set("/src/math/vec2.ts", vec2Source);
    files.set("/src/dynamics/shapes.ts", shapesSource);
    files.set("/src/dynamics/body.ts", bodySource);
    files.set(EXERCISE_PATH, integrateStub);
    return createVirtualTypeScriptEnvironment(
      createSystem(files),
      [EXERCISE_PATH],
      ts,
      {
        target: ts.ScriptTarget.ES2022,
        lib: ["es2022"],
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        strict: true,
        noEmit: true,
      },
    );
  }),
);
