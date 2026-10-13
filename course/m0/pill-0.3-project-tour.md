---
id: "0.3"
title: "Project tour"
module: "m0"
minutes: 6
prerequisites: ["0.1", "0.2"]
visual: "none"
readings_essential: []
readings_deeper: []
---

## The question

What is in the `starter/` project, how do you get it running, and what does a failing test look like?

## The idea

Everything you touch lives in `starter/`. Run every command below from inside that folder. A command run from the repository root will not find the project.

**Setup: pick one path.**

- **GitHub Codespaces.** Nothing to install. On the repository page choose Code, then Codespaces, then Create codespace. The dependencies install automatically.
- **Local.** Install the current Node.js LTS (the project needs Node 22.12 or later) from nodejs.org, then:

  ```sh
  cd starter
  npm install
  npm run doctor
  ```

The same commands work on macOS, Windows and Linux.

`npm run doctor` is a small script with no dependencies, so it works even before `npm install`. It checks three things: that your Node version meets the project's minimum, that the dependencies are installed, and that the test runner starts. A failing check prints a `fix:` line telling you what to do. Run it first whenever something strange happens.

**The tools, and what each is for.**

| Tool                | Role                                                                                  | Compare with C++                                 |
| ------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Node.js             | runs JavaScript outside a browser; `npm` installs packages and runs the scripts below | the runtime, plus a package manager              |
| TypeScript          | the type checker (`npm run typecheck`)                                                | the compiler's type errors, without machine code |
| Vitest              | the test runner (`npm test`)                                                          | a test framework such as Catch2 or GoogleTest    |
| Vite                | serves the browser demos, with live reload                                            | a build tool plus a dev server                   |
| ESLint and Prettier | lint and formatting (`npm run lint`, `npm run format`)                                | clang-tidy and clang-format                      |

**The commands you will use.**

| Command              | Purpose                                                     |
| -------------------- | ----------------------------------------------------------- |
| `npm run doctor`     | check your setup                                            |
| `npm test`           | run all tests                                               |
| `npm test -- ex0`    | run one exercise's tests                                    |
| `npm run test:watch` | re-run tests as you edit                                    |
| `npm run typecheck`  | type-check without running                                  |
| `npm run demo:0`     | open demo 0 in the browser (demos 0 to 6 exist as commands) |
| `npm run check`      | typecheck, lint, format check and all tests                 |
| `npm run progress`   | passing tests per exercise                                  |

The `--` in `npm test -- ex0` separates npm's own arguments from the ones passed on to Vitest. Vitest treats `ex0` as a filter and runs the test files whose path contains it, which is why test files are named `ex0-vec2.test.ts`, `ex1-...` and so on.

**What is in the folder.**

- `src/math`, `src/dynamics`, `src/world`, `src/broadphase`, `src/narrowphase`, `src/solver`: the engine. These hold your **stubs**. Each stub already has its final signature and a body that throws an error starting `TODO: Exercise N`. You replace the body; you do not change the signature.
- `tests/`: one test file per exercise. For Exercise 0 it is `starter/tests/ex0-vec2.test.ts`. You read the tests; you do not edit them.
- `test-helpers/`: given helpers for tests (`expectClose`, a seeded random number generator, and builders for bodies).
- `src/render`, `src/trace`, `src/visuals`, `src/demos`: **given** code. The debug drawing, the step-through player and the demos. Their header comment says "Given". The debug-draw code imports only types from your files, so it keeps working while your stubs still throw.
- `scripts/doctor.mjs`: the setup check.

Files marked "Given: do not change this type" inside a stub file (for example `Vec2` in `src/math/vec2.ts`) are part of the contract that lessons and tests rely on.

**Running one test, the first time.** From `starter/`, run `npm test -- ex0`. Nothing is implemented, so expect failures. Each failing test reports the error thrown by the stub, which names the function you have not written, for example `TODO: Exercise 0, add`. That message is the project telling you the next job. As you fill in functions, the failures turn into passes one function at a time. `npm run test:watch` re-runs on every save, which is the loop you will use for most of the course.

**Running the demo.** `npm run demo:0` starts the Vite dev server and opens `/?demo=0` in your browser. Demos are chosen by the `demo` query parameter. If a demo needs code you have not written yet, it shows a message that names the missing piece instead of crashing. Demo 0 needs nothing from you, and pill 0.5 uses it.

## Visual

None.

## The maths

None in this pill.

## Common mistakes

- **Running commands from the repository root.** Change into `starter/` first.
- **Editing a given file** or changing a stub's signature. The tests are written against the signatures.
- **Reading a TODO failure as a broken setup.** It means the setup works and the function is still a stub. Use `npm run doctor` to check the setup itself.
- **Dropping the `--`.** Write `npm test -- ex0` exactly as the README does; npm uses the `--` to hand the rest to Vitest, and options that start with a dash need it.
- **Stopping at "tests pass".** `npm run check` also runs the type checker, the linter and the format check.

## Checkpoint

1. Which command runs only Exercise 0's tests, and what does the error from a stub that you have not yet written say?
2. Why can the debug-draw code run before any exercise is finished?

## Readings

- Essential: none for this pill. The commands above are the reference.
