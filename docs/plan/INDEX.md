# Plan index

This tree is the source of truth for the project. Each section is a folder with a `README.md` that starts with a frontmatter block (status, dependencies, outputs, definition of done), so an agent can pick up one section without reading the rest.

## Repository layout (target)

```
physics-course/
  README.md  AGENTS.md  CLAUDE.md
  docs/plan/          the plan (this tree)
  course/             lesson content: pills and exercise pages, written from the module specs (proposed, see OQ-09)
  starter/            the TypeScript starter project: given code, stubs, tests, demos
  site/               the website
  journal/            the author's own posts (written by the author)
```

`docs/plan/`, the root files, `starter/` (toolchain, given types, exercise stubs, test helpers), `.devcontainer/` and `.github/` exist today. Everything else is created by work packages in `13-agent-plan`.

## Sections

| # | Section | Status | Depends on | Next action |
|---|---|---|---|---|
| 00 | [Goal](00-goal/README.md) | drafted | none | Author review |
| 01 | [Format](01-format/README.md) | drafted | 00 | Author review |
| 02 | [Contract](02-contract/README.md) | frozen | 00, 01 | Author confirms the WP-02 signature table (D-028) |
| 03 | [Repo spec](03-repo-spec/README.md) | drafted | 02 | WP-01 and WP-02 done; R1 review, then `npm run progress` and WP-03 |
| 04 | [Visual layer](04-visual-layer/README.md) | drafted | 02, 03 | WP-03 framework done; must-have visuals come with module content |
| 05 | [Solutions policy](05-solutions-policy/README.md) | drafted | 01 | Author review |
| 06 | [References](06-references/README.md) | drafted (WP-05a done) | none | WP-05b; read the "exists" rows before citing |
| 07 | [Blog and site](07-blog/README.md) | drafted | 00, 04 | WP-04 |
| 08 | [Modules](08-modules/README.md) | outlines drafted | 01, 02, 03, 04 | Phase 2 work packages |
| 09 | [Advanced track](09-advanced/README.md) | outline drafted | 08 complete | After the author finishes the standard track |
| 10 | [Backlog](10-backlog/README.md) | drafted | none | none |
| 11 | [Decisions](11-decisions/README.md) | drafted | none | Append as decisions are made |
| 12 | [Open questions](12-open-questions/README.md) | drafted | none | Author answers |
| 13 | [Agent plan](13-agent-plan/README.md) | drafted | all | Hand [NEXT-AGENT-PROMPT](NEXT-AGENT-PROMPT.md) to the lead agent |

Modules:

| Module | Spec | Status |
|---|---|---|
| M0 Setup and just enough TypeScript | [m0](08-modules/m0-setup/README.md) | outline drafted |
| M1 Rigid body representation | [m1](08-modules/m1-rigid-body/README.md) | outline drafted |
| M2 Gathering and the world | [m2](08-modules/m2-gathering/README.md) | outline drafted |
| M3 Broadphase | [m3](08-modules/m3-broadphase/README.md) | outline drafted |
| M4 Narrowphase | [m4](08-modules/m4-narrowphase/README.md) | outline drafted |
| M5 Collision response | [m5](08-modules/m5-response/README.md) | outline drafted |
| M6 Capstone | [m6](08-modules/m6-capstone/README.md) | outline drafted |

## Dependency graph

```
00 goal
 +-- 01 format -- 05 solutions policy
 +-- 02 contract -- 03 repo spec -- 04 visual layer -- 07 blog and site
                \
                 +-- 08 modules (M0..M6) -- 09 advanced
06 references (independent; feeds the reading lists in 08)
10 backlog, 11 decisions, 12 open questions (no dependencies)
```

## Reading order for a new agent

1. `AGENTS.md`
2. This file
3. `00-goal`
4. `13-agent-plan`
5. Your assigned section, then `02-contract`

## Status vocabulary

| Status | Meaning |
|---|---|
| todo | Not started |
| drafted | Content exists, not yet reviewed by the author |
| reviewed | The author has reviewed it |
| frozen | Approved and locked. Changes need a decision entry |
| done | Built and verified against its definition of done |

## Other files

- [NEXT-AGENT-PROMPT.md](NEXT-AGENT-PROMPT.md): the prompt for the lead agent
- [_archive/course-map-v1.md](_archive/course-map-v1.md): the superseded single-file plan, kept for traceability. Do not edit.
