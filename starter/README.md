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

## Commands

| Command              | Purpose                                                |
| -------------------- | ------------------------------------------------------ |
| `npm run doctor`     | check your setup                                       |
| `npm test`           | run all tests                                          |
| `npm test -- ex4a`   | run one exercise's tests                               |
| `npm run test:watch` | re-run tests as you edit                               |
| `npm run typecheck`  | type-check without running                             |
| `npm run check`      | typecheck, lint, format check and tests (what CI runs) |

The exercise stubs and test helpers are in place. Exercise tests, `npm run progress` and the demos arrive in later work packages.
