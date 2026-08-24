import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase browser client.
 *
 * Both values come from .env.local (VITE_ prefixed, so they are baked
 * into the bundle — only ever put the *publishable* anon key here).
 * When either is missing the client is null and callers fall back to
 * the WhatsApp hand-off instead of failing.
 */

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const supabase: SupabaseClient | null =
  url && key
    ? createClient(url, key, {
        auth: { persistSession: false },
      })
    : null;

export const hasSupabase = supabase !== null;
