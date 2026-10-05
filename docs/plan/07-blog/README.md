---
section: "07-blog"
status: drafted
depends_on: ["00-goal", "04-visual-layer"]
owner: unassigned
outputs: ["site/", ".github/workflows/pages.yml"]
definition_of_done: "The site builds statically, deploys to GitHub Pages, renders every pill with embedded visuals, and has a Journal area for the author's posts."
---


# 07 Blog and site

## Two kinds of content

| Kind | Written by | Where it lives | Purpose |
|---|---|---|---|
| Course | Agents, from the module specs | `course/` | Pills and exercise pages: the learning background |
| Journal | The author | `journal/` | Posts about doing the course: what went wrong, what was learned |

## Stack (recommendation, not yet verified)

- **Astro with MDX**: static output that deploys to GitHub Pages, with interactive components embedded as islands that only load JavaScript where used. Content stays Markdown.
- Visual widgets are plain TypeScript with Canvas 2D, sharing source with the starter project, no framework dependency.
- **Uncertainty:** the approach is sound, but the current Astro and GitHub Pages deployment steps have not been checked. WP-04 verifies them against the official documentation before building, and falls back to plain Vite plus Markdown if Astro is awkward.

## Open design points (WP-04 confirms)

- Pills are plain `.md` in `course/` with a visual marker (`<!-- visual: id -->`), so they render on GitHub too. Can the site build ingest them from outside `site/` and replace markers with widgets? (OQ-09)
- Blog name, domain and the number of posts to aim for (OQ-02, OQ-03).

## Site structure (proposed)

Home; course index; one page per module; one page per pill (with embedded visual); Journal index and posts; About (licences, how it was built).

## Definition of done

Builds statically; deploys to GitHub Pages through a workflow; every pill renders with its visual; visuals work on mobile and respect reduced motion; the Journal area exists and renders the author's posts.
