import { getCollection, type CollectionEntry } from "astro:content";

export type Lesson = CollectionEntry<"course">;

/** Base path without a trailing slash, so `${base}/course/` never has a double slash. */
export const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export const href = (id: string) => `${base}/course/${id}/`;

export const label = (e: Lesson) =>
  e.data.title ? `${e.data.id} ${e.data.title}` : `Exercise ${e.data.id.replace("exercise-", "")}`;

/** Reading order: each module's pills by number, then its exercise, then the next module.
 *  The module (m0, m1, ...) is an internal marker only; it is never shown to readers. */
export async function lessonsInOrder(): Promise<Lesson[]> {
  const all = await getCollection("course");
  const key = (e: Lesson): [number, number, number] => {
    const mod = Number(e.data.module.replace("m", ""));
    if (!e.data.title) return [mod, 1, 0]; // exercise: after the module's pills
    return [mod, 0, Number(e.data.id.split(".")[1])];
  };
  return all.sort((a, b) => {
    const ka = key(a);
    const kb = key(b);
    return ka[0] - kb[0] || ka[1] - kb[1] || ka[2] - kb[2];
  });
}
