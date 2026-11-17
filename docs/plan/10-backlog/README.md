---
section: "10-backlog"
status: drafted
depends_on: []
owner: unassigned
outputs: ["docs/plan/10-backlog/README.md"]
definition_of_done: "Items are moved to a module or the advanced track when scheduled."
---


# 10 Backlog (left out, for later)

Not excluded, just not scheduled.

- Joints and constraints (hinge, distance, spring)
- Continuous collision detection (swept shapes, time of impact)
- GJK/EPA and general convex polygons
- Compound shapes and concave decomposition
- Islands and sleeping (listed in A6, with a deeper treatment later)
- 3D (quaternions, 3D inertia tensors, 3D manifolds)
- Soft bodies, cloth, fluids
- Raycasts and spatial queries
- Collision filtering layers, sensors and triggers
- Multithreading
- Integration with a game engine (the UE5 Chaos architecture is a natural comparison)
- In-browser coding is built for Exercise 1 (D-045). Still to do: the other exercises, an in-browser copy of the whole `starter/` tree so later exercises build on earlier ones (with a project download and upload), a "Link folder" button using the File System Access API (Chrome and Edge only), and mirroring progress to the learner's GitHub repository (D-046)
- Reference solutions for learners (see 05-solutions-policy)
- A live side-by-side viewer in `starter/`, as a demo page on the Vite dev server (port 5173, which Codespaces forwards), importing the learner's `src/` and the oracle engines, reusing the scene, comparison and drawing code from the site's in-browser exercise (D-045). Today the oracle is a test and report harness only (D-047)
