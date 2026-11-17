import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Pills and exercise pages are plain Markdown in ../course so they also read on GitHub.
// Pills have `id: "1.4"`; exercise pages have `id: "exercise-1"` and no title.
const course = defineCollection({
  loader: glob({ base: "../course", pattern: "m*/*.md", generateId: ({ data }) => String(data.id) }),
  schema: z.object({
    id: z.string(),
    title: z.string().optional(),
    module: z.string(),
    minutes: z.number().optional(),
    visual: z.string().optional(),
  }),
});

export const collections = { course };
