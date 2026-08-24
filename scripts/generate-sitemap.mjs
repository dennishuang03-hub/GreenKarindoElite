/**
 * Writes dist/sitemap.xml and dist/robots.txt after a production build.
 *
 * A sitemap must contain absolute URLs, so the site's own domain has to
 * be supplied — there is no safe default. Set it once in the hosting
 * environment (Vercel: Project Settings -> Environment Variables):
 *
 *   SITE_URL=https://your-domain.com
 *
 * Without it this script skips quietly; the build still succeeds and
 * the static public/robots.txt is used as-is.
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");

const origin = (process.env.SITE_URL ?? "").trim().replace(/\/$/, "");

if (!origin) {
  console.log(
    "sitemap: SITE_URL is not set — skipping sitemap.xml. " +
      "Set SITE_URL=https://your-domain.com to generate it."
  );
  process.exit(0);
}

const staticPaths = [
  { loc: "/", priority: "1.0", changefreq: "monthly" },
  { loc: "/projects", priority: "0.9", changefreq: "weekly" },
  { loc: "/about", priority: "0.6", changefreq: "yearly" },
  { loc: "/contact", priority: "0.7", changefreq: "yearly" },
];

let projectPaths = [];
try {
  const raw = await readFile(path.join(ROOT, "public", "projects.json"), "utf8");
  const data = JSON.parse(raw);
  const projects = Array.isArray(data) ? data : (data.projects ?? []);
  projectPaths = projects
    .filter((p) => typeof p.id === "string" && p.id)
    .map((p) => ({
      loc: `/projects/${p.id}`,
      priority: "0.8",
      changefreq: "weekly",
    }));
} catch (err) {
  console.warn(`sitemap: could not read projects.json (${err.message})`);
}

const today = new Date().toISOString().slice(0, 10);
const entries = [...staticPaths, ...projectPaths];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${origin}${e.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

await writeFile(path.join(DIST, "sitemap.xml"), xml, "utf8");
await writeFile(path.join(DIST, "robots.txt"), robots, "utf8");

console.log(`sitemap: wrote ${entries.length} URLs for ${origin}`);
