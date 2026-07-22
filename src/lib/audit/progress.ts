import type { SupabaseClient } from "@supabase/supabase-js";
import { AUDIT_SECTIONS } from "@/lib/audit/sections";

/**
 * A step counts as "done" once it has any saved data: a row in
 * `audit_answers` for JSONB-based steps, or at least one row in the
 * dedicated table for "machines"/"difficultes". "validation" only
 * completes on actual submission (Phase 4), so 100% isn't reachable
 * before then — a deliberate property, not an oversight.
 */
export async function computeProgressPercent(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: SupabaseClient<any, any, any>,
  auditId: string
): Promise<number> {
  const [{ data: answers }, machinesResult, difficultiesResult] = await Promise.all([
    supabase.from("audit_answers").select("section_slug").eq("audit_id", auditId),
    supabase.from("audit_machines").select("id", { count: "exact", head: true }).eq("audit_id", auditId),
    supabase
      .from("audit_difficulties")
      .select("id", { count: "exact", head: true })
      .eq("audit_id", auditId),
  ]);

  let completed = answers?.length ?? 0;
  if ((machinesResult.count ?? 0) > 0) completed += 1;
  if ((difficultiesResult.count ?? 0) > 0) completed += 1;

  return Math.round((completed / AUDIT_SECTIONS.length) * 100);
}
