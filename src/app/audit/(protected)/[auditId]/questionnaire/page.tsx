import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAuditEditable, type AuditStatus } from "@/lib/audit/status";
import { EntrepriseStep } from "@/components/audit/steps/entreprise-step";
import type { EntrepriseData } from "@/lib/audit/schemas/entreprise";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function QuestionnairePage({
  params,
}: {
  params: Promise<{ auditId: string }>;
}) {
  const { auditId } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: audit } = await supabase
    .from("audits")
    .select("status")
    .eq("id", auditId)
    .single<{ status: AuditStatus }>();

  // Already submitted/locked (or gone) — the layout already confirmed
  // ownership, so this is purely a "not editable anymore" redirect.
  if (!audit || !isAuditEditable(audit.status)) {
    redirect(`/audit/${auditId}`);
  }

  const [{ data: answerRow }, { data: settings }] = await Promise.all([
    supabase
      .from("audit_answers")
      .select("data")
      .eq("audit_id", auditId)
      .eq("section_slug", "entreprise")
      .maybeSingle<{ data: Partial<EntrepriseData> }>(),
    supabase
      .from("app_settings")
      .select("chiffre_affaires_obligatoire")
      .eq("id", true)
      .single<{ chiffre_affaires_obligatoire: boolean }>(),
  ]);

  return (
    <EntrepriseStep
      auditId={auditId}
      initialData={answerRow?.data ?? {}}
      caObligatoire={settings?.chiffre_affaires_obligatoire ?? false}
    />
  );
}
