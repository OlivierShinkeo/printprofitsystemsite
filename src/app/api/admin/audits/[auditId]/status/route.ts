import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AUDIT_STATUSES, isAuditEditable, type AuditStatus } from "@/lib/audit/status";
import { sendAuditStatusNotificationEmail } from "@/lib/email/audit-status-notification";
import type { Profile } from "@/lib/audit/types";

export const runtime = "nodejs";

const AUDIT_STATUS_SET = new Set<string>(AUDIT_STATUSES);

// Statuts pour lesquels le prospect reçoit un email l'informant qu'un membre
// de l'équipe va le recontacter — jamais pour les statuts de travail interne
// où rien n'est encore décidé (invited/in_progress/submitted/archived).
const NOTIFY_PROSPECT_STATUSES = new Set<AuditStatus>([
  "under_review",
  "additional_information_requested",
  "approved",
  "approved_with_conditions",
  "rejected",
]);

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
    .select("status, company_name, contact_first_name, contact_email")
    .eq("id", auditId)
    .single<{ status: AuditStatus; company_name: string; contact_first_name: string; contact_email: string }>();

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

  if (NOTIFY_PROSPECT_STATUSES.has(newStatus)) {
    try {
      await sendAuditStatusNotificationEmail({
        to: audit.contact_email,
        firstName: audit.contact_first_name,
        companyName: audit.company_name,
        status: newStatus,
      });
    } catch (emailError) {
      // Le statut est déjà mis à jour et loggé en base — un échec d'envoi ne
      // doit jamais faire passer l'action de l'admin pour un échec.
      console.error("Status update: sendAuditStatusNotificationEmail failed", emailError);
    }
  }

  return NextResponse.json({ ok: true });
}
