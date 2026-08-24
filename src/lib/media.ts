/**
 * Media path helpers.
 *
 * Every image and PDF referenced from projects.json lives in /public,
 * so paths must be resolved against Vite's BASE_URL to keep working
 * when the site is deployed under a sub-path.
 */

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function withBase(path: string): string {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path)) return path; // already absolute
  return path.startsWith("/") ? base + path : path;
}

/**
 * Sibling .webp path for a raster image.
 *
 * `npm run images` writes a .webp next to every .jpg/.png in /public,
 * so `<picture>` can offer the modern format with the original as the
 * fallback source. Returns null for formats that are already modern.
 */
export function webpFor(path: string): string | null {
  if (!/\.(jpe?g|png)$/i.test(path)) return null;
  return withBase(path.replace(/\.(jpe?g|png)$/i, ".webp"));
}

/** Filename without extension — used for readable image alt text. */
export function fileLabel(path: string): string {
  const name = path.split("/").pop() ?? path;
  return name.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ");
}
