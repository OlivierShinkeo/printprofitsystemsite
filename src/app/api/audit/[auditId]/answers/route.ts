import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AUDIT_SECTIONS, AUDIT_SECTION_SLUGS } from "@/lib/audit/sections";
import type { AuditStatus } from "@/lib/audit/status";

export const runtime = "nodejs";

export async function PATCH(request: Request, { params }: { params: Promise<{ auditId: string }> }) {
  const { auditId } = await params;
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  let body: { section?: string; data?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (
    !body.section ||
    !AUDIT_SECTION_SLUGS.has(body.section) ||
    typeof body.data !== "object" ||
    body.data === null
  ) {
    return NextResponse.json({ error: "Section invalide." }, { status: 400 });
  }

  // RLS (`audit_answers_insert_own_draft` / `_update_own_draft`) rejects this
  // write outright if the audit isn't this user's own, or is no longer
  // editable (submitted/locked) — no extra ownership check needed here.
  const { error: upsertError } = await supabase
    .from("audit_answers")
    .upsert(
      { audit_id: auditId, section_slug: body.section, data: body.data },
      { onConflict: "audit_id,section_slug" }
    );

  if (upsertError) {
    return NextResponse.json(
      { error: "Impossible d'enregistrer. Cet audit n'est peut-être plus modifiable." },
      { status: 403 }
    );
  }

  const { data: savedSections } = await supabase
    .from("audit_answers")
    .select("section_slug")
    .eq("audit_id", auditId);

  const progressPercent = Math.round(((savedSections?.length ?? 0) / AUDIT_SECTIONS.length) * 100);

  const { data: audit } = await supabase
    .from("audits")
    .select("status")
    .eq("id", auditId)
    .single<{ status: AuditStatus }>();

  const nowIso = new Date().toISOString();
  const updatePayload: Record<string, unknown> = {
    last_saved_at: nowIso,
    progress_percent: progressPercent,
  };
  if (audit?.status === "invited") {
    updatePayload.status = "in_progress";
  }

  await supabase.from("audits").update(updatePayload).eq("id", auditId);

  return NextResponse.json({ ok: true, lastSavedAt: nowIso, progressPercent });
}
