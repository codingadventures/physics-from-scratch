---
section: "06-references"
status: done
depends_on: []
owner: unassigned
outputs: ["docs/plan/06-references/README.md", "docs/plan/06-references/dissections/"]
definition_of_done: "Every source is marked verified or unverified with an edition and URL, the Box2D Lite dissection guide exists and is based on cloned source, and the author's PDF list is recorded."
---


# 06 References

Lessons cite only sources marked **verified** here.

## Verification status

Checked by WP-05a on 2026-10-13, with follow-up fixes the same day. qu3e (Randy Gaul) was removed: it is a 3D engine. Lessons may cite only rows marked **verified**.

- **verified:** the page or file was fetched and its title and author matched.
- **exists:** seen on a fetched page or fetched as a file, but the content was not read. Read it before citing.
- **not found:** no source located. Do not cite.

### Tutorials, articles and talks

| Source | Status | Title, author, date | URL | Covers |
|---|---|---|---|---|
| amano.games devlog | verified | "Making a pinball game for Playdate: Part 02, the physics", Games About Contact, 2 Dec 2024 | https://amano.games/devlog/making-a-pinball-game-for-the-playdate-part-02-the-physics | A practitioner choosing between a pixel-mask approach and a rigid body engine; the resource list below came from here. Context, not a maths source. |
| Randy Gaul, Tuts+ series | verified (part 1 and the series index) | "How to Create a Custom 2D Physics Engine: The Basics and Impulse Resolution", Envato Tuts+, 6 Apr 2013; series "How to Create a Custom Physics Engine" (parts: The Core Engine, Oriented Rigid Bodies, Friction, Scene and Jump Table) | https://code.tutsplus.com/how-to-create-a-custom-2d-physics-engine-the-basics-and-impulse-resolution--gamedev-6331t ; index https://code.tutsplus.com/series/how-to-create-a-custom-physics-engine--gamedev-12715 | Impulse resolution from the contact normal and depth (part 1). Parts 2-4: titles only. |
| Allen Chou, Game Physics Series | verified (index only) | "Game Physics Series", Ming-Lun "Allen" Chou, posts Dec 2013 to Feb 2014 | https://allenchou.net/game-physics-series/ | Motion dynamics, broadphase (dynamic AABB tree), GJK, EPA, sequential-impulse and contact constraints, slop, warm starting. Open each post before citing it. |
| Chris Hecker, Rigid Body Dynamics | verified (index; PDFs not opened) | Four Game Developer magazine articles, 1996-97: "The Next Frontier", "Angular Effects", "Collision Response", "The Third Dimension" (3D) | https://www.chrishecker.com/Rigid_Body_Dynamics | 2D linear and angular dynamics, integration, collision response. The author notes some equations are garbled in the PDFs. |
| Erin Catto, Box2D Lite | verified | erincatto/box2d-lite, written for the GDC 2006 physics tutorial, MIT licence | https://github.com/erincatto/box2d-lite | Teaching engine: sequential impulses, contacts, friction, stacking. WP-05b dissection target. |
| Erin Catto, "Fast and Simple Physics using Sequential Impulses" | verified (PDF text read, 53 slides) | GDC 2006, Crystal Dynamics. The same deck is in box2d-lite as `docs/GDC2006_Catto_Erin_PhysicsTutorial.pdf` | https://box2d.org/files/ErinCatto_SequentialImpulses_GDC2006.pdf ; https://media.githubusercontent.com/media/erincatto/box2d-lite/master/docs/GDC2006_Catto_Erin_PhysicsTutorial.pdf | The talk behind Box2D Lite: why impulses, relative velocity, accumulated impulses, friction. M5. (The github.com blob URL returns a Git LFS pointer, not the PDF.) |
| Erin Catto, publications | verified (list) | box2d.org publications page: GDC talks 2006-2019 (Sequential Impulses, Contact Manifolds, Constraints and Numerical Integration, Soft Constraints, Continuous Collision, Understanding Constraints, Numerical Methods, Dynamic BVH) | https://box2d.org/publications/ | Index to the talks. |
| Erin Catto, "Understanding Constraints" | verified (PDF text read) | GDC 2014 | https://box2d.org/files/ErinCatto_UnderstandingConstraints_GDC2014.pdf | Constraints and solver design. |
| Erin Catto, "Contact Manifolds" | verified (PDF text read, 32 slides; year from the author's publications page) | GDC 2007, Blizzard Entertainment. Cite it as GDC 2007: the PDF's embedded metadata (2005, another name) is a leftover template field and is wrong | https://box2d.org/files/ErinCatto_ContactManifolds_GDC2007.pdf | Contact points, manifolds via SAT in one shot or via GJK point by point. M4. |
| Erin Catto, "Solver2D" | verified | box2d.org post, 5 Feb 2024 | https://box2d.org/posts/2024/02/solver2d/ | Test bed comparing eight Gauss-Seidel style solvers, including XPBD. Advanced track (A2, D-007). |
| Erin Catto, Box2D v3 posts | verified (titles and dates) | "Starting Box2D 3.0", 15 Jan 2023; "Releasing Box2D 3.0", 9 Aug 2024 | https://box2d.org/posts/2023/01/starting-box2d-3.0/ ; https://box2d.org/posts/2024/08/releasing-box2d-3.0/ | Project history. Little technical content. |
| Box2D documentation | verified | "Box2D: Overview" | https://box2d.org/documentation/ | API and concepts of Box2D v3. |
| Glenn Fiedler, "Fix Your Timestep!" | verified | Gaffer On Games, 10 Jun 2004 | https://gafferongames.com/post/fix_your_timestep/ | Fixed and semi-fixed timesteps, the accumulator. Pill 1.5. |
| Glenn Fiedler, "Integration Basics" | verified | Gaffer On Games, 1 Jun 2004 | https://gafferongames.com/post/integration_basics/ | Explicit and semi-implicit Euler, RK4. Pill 1.4. |
| Matthias Muller, Ten Minute Physics | verified (index; videos not watched) | "Ten Minute Physics" | https://matthias-research.github.io/pages/tenMinutePhysics/ | PBD and XPBD episodes, including rigid bodies and 2D ball collisions. Advanced track. Videos, not text. |
| Dirk Gregorius, "Robust Contact Creation for Physics Simulation" | verified (PDF text read, 124 slides with speaker notes) | GDC 2015, Physics for Game Programmers | https://media.steampowered.com/apps/valve/2015/DirkGregorius_Contacts.pdf ; https://gdcvault.com/play/1022193/Physics-for-Game-Programmers-Robust | Contact points and manifolds, SAT, reference and incident faces, clipping, capsules. Deeper reading for M4 (pills 4.6-4.7). |
| Dirk Gregorius, "The Separating Axis Test between Convex Polyhedra" | verified (slides read, 51 slides with speaker notes) | GDC 2013, Physics for Game Programmers, Valve. Valve's archive holds the slides (PDF, PPTX) and sample C++ code | https://gdcvault.com/play/1017646/Physics-for-Game-Programmers-The ; slides https://media.steampowered.com/apps/valve/2013/DGregorius_GDC2013.zip | Builds SAT up from two spheres: projecting onto an axis, interval overlap, the Minkowski difference, then polygons and polyhedra (face and edge axes, Gauss map pruning in 3D). The early 2D part fits pill 4.6. Do not copy its sample code. |
| Richard Tonge, "Solving Rigid Body Contacts" | verified (PDF text read, 59 slides with speaker notes) | GDC 2012, Physics for Game Programmers. Hosted on the author's site (the devlog links it); GDC Vault does not list it under this title | http://www.richardtonge.com/presentations/Tonge-2012-GDC-solvingRigidBodyContacts.pdf | The common iterative rigid body contact solver, explained for beginners. M5. The site is plain http. |
| Physac | verified | victorfisac/Physac, Victor Fisac. Header-only C, needs raylib | https://github.com/victorfisac/Physac | Small engine: collision info, dynamics, solving, position correction, fixed step. (raysan5/physac is a fork; cite the original.) |
| Randy Gaul, ImpulseEngine | verified (repo page; README returned 404) | RandyGaul/ImpulseEngine, 2D impulse engine for education | https://github.com/RandyGaul/ImpulseEngine | Companion code to the Tuts+ series. |
| Pikuma, Game Physics Engine Programming | verified (course page) | Paid course, 2D rigid body engine in C++ | https://pikuma.com/courses/game-physics-engine-development | Context only. Never a source to copy from. |
| TypeScript Handbook | verified | "The TypeScript Handbook", Microsoft | https://www.typescriptlang.org/docs/handbook/intro.html | Reference for the "TypeScript you need here" boxes (D-029). |

### Books

| Book | Status | Edition | Publisher page | Notes |
|---|---|---|---|---|
| Ian Millington, *Game Physics Engine Development* | verified (publisher page) | 2nd edition, 2010, CRC Press, ISBN 9780123819765 | https://www.routledge.com/Game-Physics-Engine-Development/Millington/p/book/9780123819765 | The 2nd edition adds 2D material (publisher blurb). Page references must match the author's copy (OQ-07). |
| Christer Ericson, *Real-Time Collision Detection* | verified (publisher page) | 1st edition, 2004, ISBN 978-1-55860-732-3 | https://shop.elsevier.com/books/real-time-collision-detection/ericson/978-1-55860-732-3 | Imprint not confirmed on the page. |

### Still to do before citing

1. Open individual Allen Chou posts, Tuts+ parts 2-4 and Hecker PDFs before citing a specific one.
2. Confirm editions against the author's own copies when the PDF list arrives (OQ-07).

### Reading ids

Pill frontmatter (`readings_essential`, `readings_deeper`) uses these ids. Add a row here before citing a new source.

| Id | Source |
|---|---|
| `typescript-handbook` | TypeScript Handbook |
| `gaul-tutsplus-part-1` | Randy Gaul, Tuts+ part 1 |
| `gaul-tutsplus-series` | Randy Gaul, Tuts+ series index |
| `allen-chou-game-physics-series` | Allen Chou, Game Physics Series |
| `hecker-rigid-body-dynamics` | Chris Hecker, Rigid Body Dynamics |
| `box2d-lite` | Box2D Lite repository |
| `box2d-lite-dissection` | `dissections/box2d-lite.md` (only after the matching exercise, D-032) |
| `box2d-documentation` | Box2D documentation overview |
| `catto-sequential-impulses-gdc2006` | Catto, "Fast and Simple Physics using Sequential Impulses" |
| `catto-contact-manifolds-gdc2007` | Catto, "Contact Manifolds" |
| `catto-understanding-constraints-gdc2014` | Catto, "Understanding Constraints" |
| `catto-solver2d` | Catto, "Solver2D" |
| `fiedler-fix-your-timestep` | Fiedler, "Fix Your Timestep!" |
| `fiedler-integration-basics` | Fiedler, "Integration Basics" |
| `muller-ten-minute-physics` | Muller, Ten Minute Physics |
| `gregorius-sat-gdc2013` | Gregorius, "The Separating Axis Test between Convex Polyhedra" |
| `gregorius-contacts-gdc2015` | Gregorius, "Robust Contact Creation for Physics Simulation" |
| `tonge-solving-contacts-gdc2012` | Tonge, "Solving Rigid Body Contacts" |
| `physac` | Physac |
| `impulse-engine` | Randy Gaul, ImpulseEngine |
| `millington-game-physics-engine-development` | Millington, *Game Physics Engine Development*, 2nd ed. |
| `ericson-real-time-collision-detection` | Ericson, *Real-Time Collision Detection* |

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

WP-05a: done on 2026-10-13 (the tables above). WP-05b: done on 2026-10-13, see [dissections/box2d-lite.md](dissections/box2d-lite.md). Box2D v3 and Physac dissections are optional later work.
