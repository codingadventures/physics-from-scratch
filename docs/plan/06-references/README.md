---
section: "06-references"
status: partly verified
depends_on: []
owner: unassigned
outputs: ["docs/plan/06-references/README.md", "docs/plan/06-references/dissections/"]
definition_of_done: "Every source is marked verified or unverified with an edition and URL, the Box2D Lite dissection guide exists and is based on cloned source, and the author's PDF list is recorded."
---


# 06 References

Lessons cite only sources marked **verified** here.

## Verification status

- **Fetched:** a page was opened and read.
- **Listed in a fetched page:** a source we read links to it, so it exists, but nobody has opened it yet.
- **From memory, unverified:** from background knowledge. WP-05a checks these.

### Fetched

| Source | Why it matters |
|---|---|
| amano.games devlog, "Making a pinball game for Playdate: Part 02, the physics" (Dec 2024) | A practitioner's account of choosing between a pixel-mask approach and a full rigid body engine. The author finished a paid 2D physics course in about a week, reimplemented the engine in C, and says he could not derive the formulas himself. That gap (using the maths without seeing why it works) is what the visual layer targets. Also a useful resource list. URL: https://amano.games/devlog/making-a-pinball-game-for-the-playdate-part-02-the-physics |

### Listed in that devlog (target pages not yet opened)

| Source | Notes from the devlog |
|---|---|
| Randy Gaul, "How to create a custom physics engine" (Tuts+ series) | Described as the easiest entry point, buildable in about a day |
| Allen Chou, game physics series (allenchou.net) | More in depth, intermediate topics |
| Chris Hecker, Rigid Body Dynamics articles | Classic reference |
| Physac (Victor Fisac), header-only 2D physics library in C | Small codebase to read alongside |
| Erin Catto, Box2D and Box2D Lite (github.com/erincatto/box2d-lite) | The devlog says Box2D Lite was intended to teach physics simulation, which makes it the best first dissection target |
| Richard Tonge, "Solving Rigid Body Contacts" (GDC 2012 slides) | Helped with multiple collisions in a single frame |
| Pikuma, 2D game physics engine course | Commercial course. Context only, not a source to copy from. |

### From memory, unverified

- **Books:** Millington, *Game Physics Engine Development*; Ericson, *Real-Time Collision Detection*.
- **Erin Catto:** GDC talks on constraints and contact solving, and the Box2D v3 blog posts, including the Solver2D comparison.
- **Randy Gaul:** the ImpulseEngine and qu3e projects.
- **Glenn Fiedler:** "Fix Your Timestep" and the integration basics articles.
- **Matthias Muller:** Ten Minute Physics, for position-based dynamics.
- **Dirk Gregorius:** GDC talks on SAT and robust contact creation.
- **TypeScript:** the official TypeScript Handbook, for Module 0.

## The author's PDFs

The author owns PDFs of many physics books and will provide them. Titles and editions: to be listed here (OQ-07).

- Agents read them to draft accurate lessons and to point learners to specific chapters and pages.
- Lessons paraphrase and cite. They do not reproduce long passages: the books are copyrighted.
- Reading lists record the exact edition used, so page references stay valid.

## Code dissection plan

Clone and read the real source (never recall it from memory), then write a guide per topic. Anything not verified in the source is flagged in the guide.

1. **Box2D Lite:** the smallest real reference, built for teaching. First target (WP-05b).
2. **Box2D v3:** pipeline, solver, manifold generation, for the advanced track.
3. **Physac:** optional, as a second small reading for comparison.

Dissection guide outline: pipeline map; data structures; broadphase approach; manifold generation (SAT and clipping); solver loop; how it differs from this course's choices.

## Open work

WP-05a (verify every entry, Haiku-tier, low effort) and WP-05b (Box2D Lite dissection, Opus-tier, high effort). See `13-agent-plan`.
