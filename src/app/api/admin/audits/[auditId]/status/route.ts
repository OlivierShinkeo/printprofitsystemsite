import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AUDIT_STATUSES, isAuditEditable, type AuditStatus } from "@/lib/audit/status";
import type { Profile } from "@/lib/audit/types";

export const runtime = "nodejs";

const AUDIT_STATUS_SET = new Set<string>(AUDIT_STATUSES);

export async function PATCH(request: Request, { params }: { params: Promise<{ auditId: string }> }) {
  const { auditId } = await params;
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const { data: callerProfile } = await supabase
    .from("profiles")
    .select("id, role, first_name, last_name, email")
    .eq("id", user.id)
    .single<Profile>();

  if (callerProfile?.role !== "admin") {
    return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  }

  let body: { status?: string; note?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!body.status || !AUDIT_STATUS_SET.has(body.status)) {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  }
  const newStatus = body.status as AuditStatus;

  const { data: audit } = await supabase
    .from("audits")
    .select("status")
    .eq("id", auditId)
    .single<{ status: AuditStatus }>();

  if (!audit) {
    return NextResponse.json({ error: "Audit introuvable." }, { status: 404 });
  }

  const { error: updateError } = await supabase
    .from("audits")
    .update({ status: newStatus, locked: !isAuditEditable(newStatus) })
    .eq("id", auditId);

  if (updateError) {
    return NextResponse.json({ error: "Impossible de mettre à jour le statut." }, { status: 500 });
  }

  await supabase.from("audit_status_history").insert({
    audit_id: auditId,
    from_status: audit.status,
    to_status: newStatus,
    changed_by: callerProfile.id,
    note: body.note?.trim() || null,
  });

  return NextResponse.json({ ok: true });
}
