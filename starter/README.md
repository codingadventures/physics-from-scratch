# Starter project

Your workspace for the course. You implement the stubs in `src/` until the tests in `tests/` pass. Files marked "given" are complete and you do not edit them.

## Setup

Pick one:

- **GitHub Codespaces (nothing to install):** on the repository page, choose **Code > Codespaces > Create codespace**. Dependencies install automatically.
- **Local:** install the current [Node.js LTS](https://nodejs.org) (22.12 or later), then:

  ```sh
  cd starter
  npm install
  npm run doctor
  ```

The same commands work on macOS, Windows and Linux.

**Your editor.** Any editor works. The `.devcontainer/` is a standard `devcontainer.json`, and its VS Code settings are ignored by other tools. In WebStorm (or another JetBrains IDE), the simplest path is the Local one: open the folder and use its terminal. WebStorm can also open the dev container (it needs Docker running; Colima is not supported yet): open `.devcontainer/devcontainer.json` and use the gutter action **Create Dev Container and Mount Sources**, and pick WebStorm if it asks for the IDE to run inside. JetBrains also lists GitHub Codespaces as supported through Gateway. We have not tested any of this yet, and we do not know whether the dev server's port is forwarded to your browser, so if the demo page does not open, browse to the address below yourself.

## Commands

| Command              | Purpose                                                               |
| -------------------- | --------------------------------------------------------------------- |
| `npm run doctor`     | check your setup                                                      |
| `npm test`           | run all tests                                                         |
| `npm test -- ex4a`   | run one exercise's tests                                              |
| `npm run progress`   | passing tests per exercise                                            |
| `npm run test:watch` | re-run tests as you edit                                              |
| `npm run typecheck`  | type-check without running                                            |
| `npm run demo:0`     | open a demo in the browser (0 to 6; demo 0 teaches the visual player) |
| `npm run check`      | typecheck, lint, format check and all tests                           |

Demos are served at <http://localhost:5173>. VS Code and Codespaces open it for you; in other editors, open that address yourself.

The exercise stubs and test helpers are in place. Exercise tests arrive module by module (Exercise 0 is in). Demos 1 to 6 arrive with their modules. Exercise tests fail until you solve them; that is expected.
