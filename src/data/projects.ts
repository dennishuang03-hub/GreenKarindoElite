// ─────────────────────────────────────────────────────────────
// Project data layer.
//
// Projects are NOT hard-coded here — they are loaded at runtime
// from /public/projects.json. That means the content (text,
// images, status, brochure links) can be changed WITHOUT touching
// any code or rebuilding the site. This is the foundation for a
// future "office" admin tool: it only needs to write projects.json
// and drop image files into /public/projects/.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";

// A string that exists in both languages.
export interface LocalizedString {
  id: string;
  en: string;
}

// A single "label: value" specification row (e.g. Type: 36/72).
export interface ProjectSpec {
  label: LocalizedString;
  value: LocalizedString;
}

export type ProjectStatus = "new-launch" | "available" | "coming-soon";

// A project's gallery can be either a plain list of images, OR two
// parallel lists (same scenes shot at morning and night). When the
// `morning`/`night` form is used, the Projects page automatically
// shows a Morning / Night switch under the gallery. Keep the two
// lists in the same order so switching keeps the same scene.
export interface TimeOfDayImages {
  morning: string[];
  night: string[];
}

export type ProjectImages = string[] | TimeOfDayImages;

export interface Project {
  /** Unique id — also used as the URL hash anchor (/projects#<id>). */
  id: string;
  status: ProjectStatus;
  name: LocalizedString;
  location: LocalizedString;
  /** Short one-line tagline shown under the name. */
  tagline: LocalizedString;
  /** Longer descriptive paragraph. */
  description: LocalizedString;
  /** Either a plain list of image URLs, or { morning: [...], night: [...] }. */
  images: ProjectImages;
  /** Key facts shown as a small spec grid. */
  specs: ProjectSpec[];
  /** Optional link to a brochure (PDF or page). */
  brochureUrl?: string;
  /** Optional Google Maps (or any) location link. */
  mapUrl?: string;
}

interface ProjectsFile {
  projects: Project[];
}

// ── Cached fetch so Navbar + Projects page share one request ──────
let cache: Project[] | null = null;
let inflight: Promise<Project[]> | null = null;

export function fetchProjects(): Promise<Project[]> {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;

  const url = `${import.meta.env.BASE_URL}projects.json`;
  inflight = fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load projects.json (${res.status})`);
      return res.json() as Promise<ProjectsFile | Project[]>;
    })
    .then((data) => {
      cache = Array.isArray(data) ? data : data.projects ?? [];
      return cache;
    })
    .catch((err) => {
      inflight = null; // allow a retry on next call
      throw err;
    });

  return inflight;
}

export interface UseProjectsResult {
  projects: Project[] | null; // null while loading
  error: boolean;
}

// Convenience hook for components.
export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[] | null>(cache);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (cache) {
      setProjects(cache);
      return;
    }
    let active = true;
    fetchProjects()
      .then((p) => {
        if (active) setProjects(p);
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, []);

  return { projects, error };
}
