import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendAdminNotificationEmail } from "@/lib/email/admin-notification";
import type { AuditStatus } from "@/lib/audit/status";

export const runtime = "nodejs";

interface AuditRow {
  status: AuditStatus;
  company_name: string;
  contact_first_name: string;
  contact_last_name: string;
}

export async function POST(request: Request, { params }: { params: Promise<{ auditId: string }> }) {
  const { auditId } = await params;
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  let body: { certifie?: boolean; accepte?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!body.certifie || !body.accepte) {
    return NextResponse.json({ error: "Les deux cases doivent être cochées." }, { status: 400 });
  }

  const { data: audit } = await supabase
    .from("audits")
    .select("status, company_name, contact_first_name, contact_last_name")
    .eq("id", auditId)
    .single<AuditRow>();

  if (!audit) {
    return NextResponse.json({ error: "Audit introuvable." }, { status: 404 });
  }
  if (audit.status !== "invited" && audit.status !== "in_progress") {
    return NextResponse.json({ error: "Cet audit a déjà été soumis." }, { status: 409 });
  }

  const nowIso = new Date().toISOString();

  // RLS (`audits_prospect_submit`) is the only policy that allows this
  // specific invited/in_progress → submitted transition from the
  // prospect's own session.
  const { error: updateError } = await supabase
    .from("audits")
    .update({ status: "submitted", locked: true, submitted_at: nowIso, progress_percent: 100 })
    .eq("id", auditId);

  if (updateError) {
    return NextResponse.json({ error: "Impossible de soumettre l'audit." }, { status: 403 });
  }

  // audit_status_history is admin-only under RLS (never prospect-writable),
  // so this one log entry uses the service-role client — a controlled
  // system action, not a door opened to the prospect's own session.
  const admin = createSupabaseAdminClient();
  await admin.from("audit_status_history").insert({
    audit_id: auditId,
    from_status: audit.status,
    to_status: "submitted",
    changed_by: user.id,
  });

  await sendAdminNotificationEmail({
    companyName: audit.company_name,
    contactName: `${audit.contact_first_name} ${audit.contact_last_name}`,
    auditId,
  });

  return NextResponse.json({ ok: true });
}
