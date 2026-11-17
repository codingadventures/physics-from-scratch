# Study guide

For **Gio**, not for learners. Read a topic, then write the lesson in your own words. These are not lessons: no course voice, no exercises. Each topic has an index, the one idea to hold, a way to explain it to a non-expert, numbers you can check, and where to read more.

| Topic | Feeds | Status |
|---|---|---|
| [Integration](integration.md) | pill 1.4 | ready |
| Moment of inertia | pill 1.3 | not started |
| Fixed timestep | pill 1.5 | not started |
| Broadphase | M3 | not started |
| Narrowphase | M4 | not started |
| Collision response | M5 | not started |

Pick the next topic and say so; I write it the same way.

Rules for these guides: short, scannable, every number carries its check (AGENTS.md rule 7), unverified claims are flagged, no copied passages.

## Writing formulas

Use `$...$` for a formula inside a sentence and `$$...$$` on its own lines for a displayed one. KaTeX renders them on the site, and GitHub renders the same syntax.

```
The energy is $E = \tfrac12 m v^2$. Displayed:

$$
I = \int r^2 \, dm
$$
```

Keep code names (`invMass`, `angle`) in backticks. Full syntax: https://katex.org/docs/supported.html
