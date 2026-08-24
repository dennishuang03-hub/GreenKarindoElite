// ─────────────────────────────────────────────────────────────
// Project data layer.
//
// Projects are NOT hard-coded here — they are loaded at runtime from
// /public/projects.json, so content (text, images, status, site plan,
// build progress, brochures) can change without touching code or
// rebuilding. See public/projects/README.md for the field reference.
// ─────────────────────────────────────────────────────────────

import { useSyncExternalStore } from "react";

/** A string that exists in both languages. */
export interface LocalizedString {
  id: string;
  en: string;
}

/** A single "label: value" specification row (e.g. Type: 36/72). */
export interface ProjectSpec {
  label: LocalizedString;
  value: LocalizedString;
}

export type ProjectStatus = "new-launch" | "available" | "coming-soon";

/**
 * A gallery is either a plain list of images, or two parallel lists of
 * the same scenes shot morning and night. With the morning/night form
 * the gallery shows a time-of-day switch; keep both lists in the same
 * order so switching holds the same scene.
 */
export interface TimeOfDayImages {
  morning: string[];
  night: string[];
}

export type ProjectImages = string[] | TimeOfDayImages;

/** Availability of one plot/unit on the interactive site plan. */
export type UnitStatus = "available" | "booked" | "sold";

/**
 * One clickable plot on the site plan. Geometry is expressed in
 * percentages of the plan image so hotspots scale with any screen —
 * x/y is the top-left corner, w/h the size, all 0–100.
 */
export interface SitePlanUnit {
  id: string;
  /** Plot number shown on the plan, e.g. "A-12". */
  label: string;
  status: UnitStatus;
  type?: LocalizedString;
  /** Land / building size, free text: "72 m²" or "6 x 12 m". */
  size?: string;
  /** Free text so the office controls formatting: "Rp 450 Jt". */
  price?: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SitePlan {
  /** Master plan image (a drawing or render). */
  image: string;
  title?: LocalizedString;
  units: SitePlanUnit[];
}

export type MilestoneStatus = "done" | "ongoing" | "planned";

/** One dated step in a project's construction timeline. */
export interface ProgressMilestone {
  /** ISO-ish date, "2026-03" or "2026-03-18". */
  date: string;
  title: LocalizedString;
  description?: LocalizedString;
  /** Completion of this stage, 0–100. */
  percent?: number;
  status: MilestoneStatus;
  images?: string[];
}

export interface ProjectProgress {
  /** Overall completion of the whole project, 0–100. */
  overall: number;
  /** When the office last updated these figures. */
  updated?: string;
  milestones: ProgressMilestone[];
}

export interface Project {
  /** Unique id — also the URL slug (/projects/<id>). */
  id: string;
  status: ProjectStatus;
  name: LocalizedString;
  location: LocalizedString;
  /** Short one-line tagline shown under the name. */
  tagline: LocalizedString;
  /** Longer descriptive paragraph. */
  description: LocalizedString;
  /** Either a plain list of image URLs, or { morning, night }. */
  images: ProjectImages;
  /** Optional wide image for the project page header. */
  heroImage?: string;
  /** Key facts shown as a spec grid. */
  specs: ProjectSpec[];
  /** Optional headline price, free text: "Mulai Rp 450 Jt". */
  priceFrom?: LocalizedString;
  /** Selling points listed on the project page. */
  highlights?: LocalizedString[];
  /** Optional interactive master plan. */
  sitePlan?: SitePlan;
  /** Optional construction progress timeline. */
  progress?: ProjectProgress;
  /** Optional link to a brochure (PDF or page). */
  brochureUrl?: string;
  /** Optional Google Maps (or any) location link. */
  mapUrl?: string;
}

interface ProjectsFile {
  projects: Project[];
}

/* ── Helpers ─────────────────────────────────────────────────── */

/** First image, whichever gallery shape the project uses. */
export function firstImage(images: ProjectImages): string {
  const list = Array.isArray(images) ? images : (images?.morning ?? []);
  return list[0] ?? "";
}

/** Every image in the gallery, flattened (morning first, then night). */
export function allImages(images: ProjectImages): string[] {
  if (Array.isArray(images)) return images;
  return [...(images?.morning ?? []), ...(images?.night ?? [])];
}

/** The image a project should lead with on cards and share previews. */
export function coverImage(project: Project): string {
  return project.heroImage ?? firstImage(project.images);
}

/* ── Normalisation ───────────────────────────────────────────── */
//
// projects.json is edited by hand, so it will sometimes contain a
// half-finished block — an empty "sitePlan": {} left as a placeholder,
// a milestone without a title, a plot missing its coordinates. None of
// that may be allowed to break a page: anything incomplete is dropped
// here, once, so every component downstream can trust what it gets.

const EMPTY_TEXT: LocalizedString = { id: "", en: "" };

function isLocalized(value: unknown): value is LocalizedString {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as LocalizedString).id === "string" &&
    typeof (value as LocalizedString).en === "string"
  );
}

function num(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function cleanImages(images: unknown): ProjectImages {
  if (Array.isArray(images)) return images.filter((i) => typeof i === "string");

  if (images && typeof images === "object") {
    const { morning, night } = images as Partial<TimeOfDayImages>;
    const m = Array.isArray(morning) ? morning.filter((i) => typeof i === "string") : [];
    const n = Array.isArray(night) ? night.filter((i) => typeof i === "string") : [];
    // The morning/night switch only makes sense when both sets exist.
    if (m.length && n.length) return { morning: m, night: n };
    return [...m, ...n];
  }

  return [];
}

function cleanSitePlan(plan: unknown): SitePlan | undefined {
  if (!plan || typeof plan !== "object") return undefined;

  const { image, title, units } = plan as Partial<SitePlan>;
  if (typeof image !== "string" || !image) return undefined;

  const cleanUnits = (Array.isArray(units) ? units : [])
    .filter(
      (u): u is SitePlanUnit =>
        Boolean(u) &&
        typeof u.id === "string" &&
        typeof u.label === "string" &&
        ["available", "booked", "sold"].includes(u.status)
    )
    .map((u) => ({
      ...u,
      x: num(u.x),
      y: num(u.y),
      w: num(u.w, 5),
      h: num(u.h, 4),
      type: isLocalized(u.type) ? u.type : undefined,
    }));

  // A plan drawing with no plots on it has nothing to interact with.
  if (cleanUnits.length === 0) return undefined;

  return { image, title: isLocalized(title) ? title : undefined, units: cleanUnits };
}

function cleanProgress(progress: unknown): ProjectProgress | undefined {
  if (!progress || typeof progress !== "object") return undefined;

  const { overall, updated, milestones } = progress as Partial<ProjectProgress>;

  const cleanMilestones = (Array.isArray(milestones) ? milestones : [])
    .filter(
      (m): m is ProgressMilestone =>
        Boolean(m) &&
        typeof m.date === "string" &&
        isLocalized(m.title) &&
        ["done", "ongoing", "planned"].includes(m.status)
    )
    .map((m) => ({
      ...m,
      description: isLocalized(m.description) ? m.description : undefined,
      images: Array.isArray(m.images) ? m.images.filter((i) => typeof i === "string") : undefined,
      percent: typeof m.percent === "number" ? m.percent : undefined,
    }));

  if (cleanMilestones.length === 0) return undefined;

  return {
    overall: Math.max(0, Math.min(100, num(overall))),
    updated: typeof updated === "string" ? updated : undefined,
    milestones: cleanMilestones,
  };
}

/** Drops projects that cannot render and repairs the ones that can. */
export function normalizeProjects(raw: unknown): Project[] {
  const list = Array.isArray(raw) ? raw : [];

  return list
    .filter(
      (p): p is Project =>
        Boolean(p) && typeof p.id === "string" && p.id.length > 0 && isLocalized(p.name)
    )
    .map((p) => ({
      ...p,
      status: (["new-launch", "available", "coming-soon"] as ProjectStatus[]).includes(p.status)
        ? p.status
        : "available",
      // Text blocks are read as text[lang] all over the app, so a
      // missing one must still be an object, not undefined.
      location: isLocalized(p.location) ? p.location : EMPTY_TEXT,
      tagline: isLocalized(p.tagline) ? p.tagline : EMPTY_TEXT,
      description: isLocalized(p.description) ? p.description : EMPTY_TEXT,
      images: cleanImages(p.images),
      specs: (Array.isArray(p.specs) ? p.specs : []).filter(
        (s) => isLocalized(s?.label) && isLocalized(s?.value)
      ),
      highlights: (Array.isArray(p.highlights) ? p.highlights : []).filter(isLocalized),
      priceFrom: isLocalized(p.priceFrom) ? p.priceFrom : undefined,
      sitePlan: cleanSitePlan(p.sitePlan),
      progress: cleanProgress(p.progress),
    }));
}

/* ── Shared store ────────────────────────────────────────────── */
//
// projects.json is fetched once for the whole app and held in a tiny
// external store. Navbar, Footer, the portfolio and every project page
// read the same snapshot, so switching pages never re-requests it.

export interface UseProjectsResult {
  projects: Project[] | null; // null while loading
  error: boolean;
}

const LOADING: UseProjectsResult = { projects: null, error: false };

let snapshot: UseProjectsResult = LOADING;
let inflight: Promise<Project[]> | null = null;
const listeners = new Set<() => void>();

function publish(next: UseProjectsResult) {
  snapshot = next;
  for (const listener of listeners) listener();
}

export function fetchProjects(): Promise<Project[]> {
  if (snapshot.projects) return Promise.resolve(snapshot.projects);
  if (inflight) return inflight;

  const url = `${import.meta.env.BASE_URL}projects.json`;
  inflight = fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load projects.json (${res.status})`);
      return res.json() as Promise<ProjectsFile | Project[]>;
    })
    .then((data) => {
      const list = normalizeProjects(Array.isArray(data) ? data : data.projects);
      publish({ projects: list, error: false });
      return list;
    })
    .catch((err) => {
      inflight = null; // allow a retry on the next call
      publish({ projects: null, error: true });
      throw err;
    });

  return inflight;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  // Kick off the single shared request the first time anything reads.
  void fetchProjects().catch(() => {});
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): UseProjectsResult {
  return snapshot;
}

/** Convenience hook used throughout the app. */
export function useProjects(): UseProjectsResult {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export interface UseProjectResult {
  project: Project | null;
  /** True once loading finished and no project matched the slug. */
  notFound: boolean;
  loading: boolean;
}

/** Look up one project by its slug, for the /projects/:slug route. */
export function useProject(slug: string | undefined): UseProjectResult {
  const { projects, error } = useProjects();

  if (!projects) {
    return { project: null, notFound: error, loading: !error };
  }

  const project = projects.find((p) => p.id === slug) ?? null;
  return { project, notFound: project === null, loading: false };
}
