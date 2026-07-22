import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { computeProgressPercent } from "@/lib/audit/progress";
import { DIFFICULTES_COUNT, type DifficulteData } from "@/lib/audit/schemas/difficultes";
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

  let body: { difficulties?: DifficulteData[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!Array.isArray(body.difficulties) || body.difficulties.length !== DIFFICULTES_COUNT) {
    return NextResponse.json({ error: "Liste de difficultés invalide." }, { status: 400 });
  }

  // Same replace-all strategy as /machines — RLS rejects both steps
  // outright if the audit isn't this user's own or is no longer editable.
  const { error: deleteError } = await supabase
    .from("audit_difficulties")
    .delete()
    .eq("audit_id", auditId);
  if (deleteError) {
    return NextResponse.json(
      { error: "Impossible d'enregistrer. Cet audit n'est peut-être plus modifiable." },
      { status: 403 }
    );
  }

  const rows = body.difficulties.map((difficulte, index) => ({
    audit_id: auditId,
    rank: index + 1,
    description: difficulte.description,
    frequency: difficulte.frequence,
    age: difficulte.anciennete,
    operational_impact: difficulte.impactOperationnel,
    financial_impact: difficulte.impactFinancier,
    client_impact: difficulte.impactClient,
    urgency: difficulte.urgence,
    actions_tried: difficulte.actionsTentees,
    result: difficulte.resultat,
  }));

  const { error: insertError } = await supabase.from("audit_difficulties").insert(rows);
  if (insertError) {
    return NextResponse.json({ error: "Impossible d'enregistrer." }, { status: 403 });
  }

  const progressPercent = await computeProgressPercent(supabase, auditId);

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
