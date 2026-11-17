// The learner's edited files, saved together in the browser and keyed by the path each file has
// in the starter project. A downloaded zip therefore unpacks straight into the repository.
//
// Only files in EDITABLE are ever read from a zip, so opening someone else's zip cannot put
// anything else into the editor or the store.
import { makeZip, readZip } from "./zip";

const KEY = "pfs:project:v1";
// Before the project store existed, the integrate exercise kept its code under its own key.
const LEGACY_KEYS: Record<string, string> = {
  "starter/src/dynamics/integrate.ts": "pfs:exercise:integrate:v1",
};

/** The files the site lets learners edit. Grows with the exercises. */
export const EDITABLE: string[] = ["starter/src/dynamics/integrate.ts"];

/** Fired on `window` after a project is opened from a zip, so editors can reload their file. */
export const PROJECT_CHANGED = "pfs:project-changed";

type Files = Record<string, string>;

function read(): Files {
  let files: Files = {};
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
          if (EDITABLE.includes(k) && typeof v === "string") files[k] = v;
        }
      }
    }
    // Move code saved under an older key into the project, once.
    for (const [path, legacy] of Object.entries(LEGACY_KEYS)) {
      const old = localStorage.getItem(legacy);
      if (old !== null) {
        if (!(path in files)) files[path] = old;
        localStorage.removeItem(legacy);
        write(files);
      }
    }
  } catch {
    files = {};
  }
  return files;
}

function write(files: Files): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(files));
    return true;
  } catch {
    return false;
  }
}

export const getFile = (path: string): string | null => read()[path] ?? null;

export function setFile(path: string, code: string): boolean {
  const files = read();
  files[path] = code;
  return write(files);
}

export function removeFile(path: string): boolean {
  const files = read();
  delete files[path];
  return write(files);
}

/** The edited files, in path order. */
export const editedFiles = (): Array<[string, string]> =>
  Object.entries(read()).sort(([a], [b]) => a.localeCompare(b));

/** Maps a path found in a zip to an editable file, or null. Accepts the path with or without `starter/`. */
function matchEditable(zipPath: string): string | null {
  const p = zipPath.replace(/\\/g, "/").replace(/^\.\//, "");
  for (const e of EDITABLE) {
    const short = e.replace(/^starter\//, "");
    if (p === e || p.endsWith("/" + e) || p === short || p.endsWith("/" + short)) return e;
  }
  return null;
}

/** A zip of every edited file, at its path in the starter project. */
export function projectZip(): Blob {
  const enc = new TextEncoder();
  const entries = editedFiles().map(([path, code]) => ({ path, data: enc.encode(code) }));
  return new Blob([makeZip(entries) as BlobPart], { type: "application/zip" });
}

const MAX_FILE = 200_000;

/** Loads the editable files found in a zip. Reports what was used and what was ignored. */
export async function openProjectZip(buffer: ArrayBuffer): Promise<{ loaded: string[]; skipped: number }> {
  const entries = await readZip(buffer);
  const files = read();
  const loaded: string[] = [];
  let skipped = 0;
  const dec = new TextDecoder();
  for (const e of entries) {
    const path = matchEditable(e.path);
    if (path === null || e.data.length > MAX_FILE) {
      skipped++;
      continue;
    }
    files[path] = dec.decode(e.data);
    loaded.push(path);
  }
  if (loaded.length > 0) {
    if (!write(files)) throw new Error("The browser would not let me save the files (storage is blocked).");
    window.dispatchEvent(new CustomEvent(PROJECT_CHANGED));
  }
  return { loaded, skipped };
}
