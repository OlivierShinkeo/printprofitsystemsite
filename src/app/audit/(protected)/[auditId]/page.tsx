import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import {
  AUDIT_STATUS_LABELS_FR,
  AUDIT_STATUS_MESSAGES_FR,
  isAuditEditable,
} from "@/lib/audit/status";
import type { AuditListItem } from "@/lib/audit/types";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function AuditDashboardPage({
  params,
}: {
  params: Promise<{ auditId: string }>;
}) {
  const { auditId } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: audit } = await supabase
    .from("audits")
    .select(
      "id, company_name, country, contact_first_name, contact_last_name, contact_email, status, invited_at, submitted_at, last_saved_at, progress_percent"
    )
    .eq("id", auditId)
    .single<AuditListItem>();

  if (!audit) notFound();

  const editable = isAuditEditable(audit.status);

  return (
    <section className="cnt-n py-16">
      <div className="mx-auto max-w-2xl rounded-md border border-neutral-200 bg-white px-10 py-12">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-gold-600">
          Audit de faisabilité
        </p>
        <h1 className="mb-1 font-display text-2xl font-bold text-navy-800">{audit.company_name}</h1>
        <p className="mb-8 text-sm text-neutral-500">
          {audit.contact_first_name} {audit.contact_last_name}
        </p>

        <div className="mb-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-neutral-100 py-6 text-sm">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Statut</p>
            <p className="mt-1 font-medium text-navy-800">{AUDIT_STATUS_LABELS_FR[audit.status]}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
              Avancement
            </p>
            <p className="mt-1 font-medium text-navy-800">{audit.progress_percent}%</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
              Dernière sauvegarde
            </p>
            <p className="mt-1 font-medium text-navy-800">
              {audit.last_saved_at
                ? new Date(audit.last_saved_at).toLocaleString("fr-FR")
                : "Aucune pour le moment"}
            </p>
          </div>
        </div>

        <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
          <div
            className="h-full rounded-full bg-gold-500 transition-all"
            style={{ width: `${audit.progress_percent}%` }}
          />
        </div>

        <p className="mb-8 text-md leading-relaxed text-neutral-700">
          {AUDIT_STATUS_MESSAGES_FR[audit.status]}
        </p>

        <div className="flex flex-wrap gap-4">
          {editable && (
            <Button href={`/audit/${audit.id}/questionnaire`} variant="primary" size="lg">
              Reprendre l&apos;audit
            </Button>
          )}
          {!editable && audit.status !== "invited" && (
            <Button href={`/audit/${audit.id}/recap`} variant="secondary" size="lg">
              Consulter mes réponses
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
