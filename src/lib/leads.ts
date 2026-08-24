import { whatsappLink } from "../config/site";

/**
 * Lead capture.
 *
 * The contact form used to discard everything the visitor typed. Now a
 * submission is written to the `leads` table (see
 * supabase/migrations/0001_leads.sql) and, whether or not that write
 * succeeds, the visitor is handed a pre-filled WhatsApp message so a
 * lead is never lost to a backend outage.
 */

export interface LeadInput {
  name: string;
  phone: string;
  project: string;
  scheme: string;
  message?: string;
  /** Which form/page produced this lead — useful for attribution. */
  source: string;
  lang: string;
}

export type LeadResult =
  | { ok: true; stored: boolean }
  | { ok: false; error: string };

/** Indonesian mobile numbers: 08xx… or +628xx…, 9–15 digits total. */
export function isValidPhone(raw: string): boolean {
  const digits = raw.replace(/[^\d]/g, "");
  return /^(0|62)\d{8,14}$/.test(digits);
}

/** Normalise 08xx / 8xx / +62 8xx into the 62xxxxxxxxxx wa.me form. */
export function normalisePhone(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "");
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  return "62" + digits;
}

export function leadWhatsappLink(lead: LeadInput): string {
  const lines = [
    `Halo Green Karindo Elite, saya ${lead.name}.`,
    `Saya tertarik dengan: ${lead.project}`,
    `Skema pembayaran: ${lead.scheme}`,
    lead.message ? `Pesan: ${lead.message}` : "",
    `No. WhatsApp saya: ${lead.phone}`,
  ].filter(Boolean);
  return whatsappLink(lines.join("\n"));
}

export async function submitLead(lead: LeadInput): Promise<LeadResult> {
  if (!lead.name.trim()) return { ok: false, error: "name" };
  if (!isValidPhone(lead.phone)) return { ok: false, error: "phone" };

  // The Supabase client is ~120 kB of JavaScript that only matters at
  // the moment someone submits, so it is loaded on demand instead of
  // riding along in the main bundle.
  const { supabase } = await import("./supabase");

  // No backend configured — the WhatsApp hand-off still works.
  if (!supabase) return { ok: true, stored: false };

  const { error } = await supabase.from("leads").insert({
    name: lead.name.trim(),
    phone: normalisePhone(lead.phone),
    project: lead.project,
    scheme: lead.scheme,
    message: lead.message?.trim() || null,
    source: lead.source,
    lang: lead.lang,
    page_url: window.location.href,
  });

  if (error) {
    console.error("Lead insert failed:", error.message);
    // Storage failed, but the caller still opens WhatsApp — the lead
    // reaches a human either way, so this is not a hard failure.
    return { ok: true, stored: false };
  }

  return { ok: true, stored: true };
}
