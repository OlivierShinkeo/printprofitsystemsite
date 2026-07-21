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
    const { data } = await supabase.from("audits").select("id").limit(1).maybeSingle();
    if (data) return `/audit/${data.id}`;
  }
  return fallbackPath;
}
