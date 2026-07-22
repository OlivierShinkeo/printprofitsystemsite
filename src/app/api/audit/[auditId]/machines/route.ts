import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { computeProgressPercent } from "@/lib/audit/progress";
import type { MachineData } from "@/lib/audit/schemas/machines";
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

  let body: { machines?: MachineData[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!Array.isArray(body.machines)) {
    return NextResponse.json({ error: "Liste de machines invalide." }, { status: 400 });
  }

  // Simplest correct strategy for a modest-sized list: replace everything
  // this audit has, in the order the client sent it. RLS (`audit_machines
  // _delete_own_draft` / `_write_own_draft`) rejects both steps outright if
  // the audit isn't this user's own or is no longer editable.
  const { error: deleteError } = await supabase.from("audit_machines").delete().eq("audit_id", auditId);
  if (deleteError) {
    return NextResponse.json(
      { error: "Impossible d'enregistrer. Cet audit n'est peut-être plus modifiable." },
      { status: 403 }
    );
  }

  if (body.machines.length > 0) {
    const rows = body.machines.map((machine, index) => ({
      audit_id: auditId,
      position: index,
      type: machine.type,
      brand: machine.marque,
      model: machine.modele,
      year: machine.annee ? Number(machine.annee) : null,
      technology: machine.technologie,
      format: machine.format,
      condition: machine.etatGeneral,
      usage_frequency: machine.frequenceUtilisation,
      monthly_volume: machine.volumeMensuel,
      main_use: machine.principalUsage,
      main_difficulty: machine.principaleDifficulte,
      maintenance_type: machine.maintenance,
      is_critical: Boolean(machine.critique),
    }));

    const { error: insertError } = await supabase.from("audit_machines").insert(rows);
    if (insertError) {
      return NextResponse.json({ error: "Impossible d'enregistrer." }, { status: 403 });
    }
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
