import type { SupabaseBrowserClient } from "@/lib/supabase/client";

interface ResolveDestinationOptions {
  /** Look up the signed-in prospect's own audit and redirect there instead of `fallbackPath`. */
  lookupOwnAudit: boolean;
  fallbackPath: string;
}

/** Shared by the auth callback page and the in-form OTP code verification — both need to send a freshly-authenticated user somewhere useful. */
export async function resolvePostAuthDestination(
  supabase: SupabaseBrowserClient,
  { lookupOwnAudit, fallbackPath }: ResolveDestinationOptions
): Promise<string> {
  if (lookupOwnAudit) {
    // A prospect should normally have exactly one audit, but if several
    // exist (e.g. re-invited), resume whichever was worked on most
    // recently rather than an arbitrary row.
    const { data } = await supabase
      .from("audits")
      .select("id")
      .order("last_saved_at", { ascending: false, nullsFirst: false })
      .order("invited_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data) return `/audit/${data.id}`;
  }
  return fallbackPath;
}
