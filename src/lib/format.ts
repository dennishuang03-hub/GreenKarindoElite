import type { Lang } from "../i18n/translations";

const LOCALE: Record<Lang, string> = { id: "id-ID", en: "en-GB" };

/**
 * Formats the loose date strings used in projects.json — "2026",
 * "2026-03" or "2026-03-18" — into a readable label in the visitor's
 * language. Unparseable values are returned untouched so the office
 * can always fall back to free text.
 */
export function formatMilestoneDate(value: string, lang: Lang): string {
  const match = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/.exec(value.trim());
  if (!match) return value;

  const [, y, m, d] = match;
  const year = Number(y);

  if (!m) return y;

  const date = new Date(year, Number(m) - 1, d ? Number(d) : 1);
  return new Intl.DateTimeFormat(LOCALE[lang], {
    year: "numeric",
    month: "short",
    ...(d ? { day: "numeric" } : {}),
  }).format(date);
}
