/**
 * Image optimiser.
 *
 * Writes a WebP sibling next to every JPG/PNG in /public and
 * /src/assets, resizing anything wider than MAX_WIDTH. The site's
 * <Picture> component offers the .webp first and falls back to the
 * original file, so re-running this is always safe and never breaks a
 * page that has not been converted yet.
 *
 *   npm run images          # convert what changed
 *   npm run images -- --force
 *
 * Originals are left untouched — delete nothing by hand until you have
 * confirmed the site renders from the WebP copies.
 */

import { readdir, stat, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TARGETS = ["public", "src/assets"];
const MAX_WIDTH = 2400;
const QUALITY = 76;
const FORCE = process.argv.includes("--force");

const SOURCE = /\.(jpe?g|png)$/i;

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return; // directory does not exist — nothing to convert
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (SOURCE.test(entry.name)) yield full;
  }
}

function format(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}

async function convert(file) {
  const out = file.replace(SOURCE, ".webp");

  const src = await stat(file);
  if (!FORCE && existsSync(out)) {
    const dest = await stat(out);
    // Skip when the WebP is already newer than its source.
    if (dest.mtimeMs >= src.mtimeMs) return null;
  }

  await mkdir(path.dirname(out), { recursive: true });

  const image = sharp(file);
  const meta = await image.metadata();

  await image
    .resize({
      width: meta.width && meta.width > MAX_WIDTH ? MAX_WIDTH : undefined,
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(out);

  const dest = await stat(out);
  return { file, before: src.size, after: dest.size };
}

let converted = 0;
let before = 0;
let after = 0;

for (const target of TARGETS) {
  for await (const file of walk(path.join(ROOT, target))) {
    const result = await convert(file);
    if (!result) continue;

    converted += 1;
    before += result.before;
    after += result.after;

    const rel = path.relative(ROOT, result.file).replace(/\\/g, "/");
    const saved = Math.round((1 - result.after / result.before) * 100);
    console.log(`${rel}  ${format(result.before)} -> ${format(result.after)}  (-${saved}%)`);
  }
}

if (converted === 0) {
  console.log("Every image already has an up-to-date WebP copy.");
} else {
  const saved = Math.round((1 - after / before) * 100);
  console.log(
    `\n${converted} image(s): ${format(before)} -> ${format(after)} (-${saved}% overall)`
  );
}
