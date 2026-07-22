import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AuditDetail } from "@/components/admin/audit-detail";
import type { AuditStatus } from "@/lib/audit/status";
import {
  MACHINE_SELECT_COLUMNS,
  mapMachineRowToData,
  type MachineRow,
} from "@/lib/audit/schemas/machines";
import {
  DIFFICULTE_SELECT_COLUMNS,
  DIFFICULTES_COUNT,
  mapDifficulteRowToData,
  type DifficulteRow,
} from "@/lib/audit/schemas/difficultes";
import { RECOMMENDATION_EMPTY, type RecommendationData } from "@/lib/admin/recommendation";

export const metadata: Metadata = { robots: { index: false, follow: false } };

interface AuditRow {
  company_name: string;
  country: string;
  contact_first_name: string;
  contact_last_name: string;
  contact_email: string;
  status: AuditStatus;
  progress_percent: number;
  invited_at: string;
  submitted_at: string | null;
}

interface RecommendationRow {
  maturity_level: string | null;
  organization_level: string | null;
  growth_potential: string | null;
  compatibility: string | null;
  main_needs: string | null;
  risks: string | null;
  recommendation: string | null;
  comment: string | null;
}

export default async function AdminAuditDetailPage({
  params,
}: {
  params: Promise<{ auditId: string }>;
}) {
  const { auditId } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: audit } = await supabase
    .from("audits")
    .select(
      "company_name, country, contact_first_name, contact_last_name, contact_email, status, progress_percent, invited_at, submitted_at"
    )
    .eq("id", auditId)
    .maybeSingle<AuditRow>();

  if (!audit) notFound();

  const [
    { data: allAnswers },
    { data: machineRows },
    { data: difficulteRows },
    { data: statusHistory },
    { data: notes },
    { data: recommendationRow },
  ] = await Promise.all([
    supabase.from("audit_answers").select("section_slug, data").eq("audit_id", auditId),
    supabase
      .from("audit_machines")
      .select(MACHINE_SELECT_COLUMNS)
      .eq("audit_id", auditId)
      .order("position", { ascending: true })
      .returns<MachineRow[]>(),
    supabase
      .from("audit_difficulties")
      .select(DIFFICULTE_SELECT_COLUMNS)
      .eq("audit_id", auditId)
      .order("rank", { ascending: true })
      .returns<DifficulteRow[]>(),
    supabase
      .from("audit_status_history")
      .select("id, from_status, to_status, note, changed_at")
      .eq("audit_id", auditId)
      .order("changed_at", { ascending: false }),
    supabase
      .from("admin_notes")
      .select("id, note, created_at")
      .eq("audit_id", auditId)
      .order("created_at", { ascending: false }),
    supabase
      .from("audit_recommendations")
      .select(
        "maturity_level, organization_level, growth_potential, compatibility, main_needs, risks, recommendation, comment"
      )
      .eq("audit_id", auditId)
      .maybeSingle<RecommendationRow>(),
  ]);

  const answersBySection: Record<string, Record<string, unknown>> = {};
  for (const row of allAnswers ?? []) {
    answersBySection[row.section_slug] = row.data as Record<string, unknown>;
  }

  const machines = (machineRows ?? []).map(mapMachineRowToData);
  const difficultes =
    difficulteRows && difficulteRows.length === DIFFICULTES_COUNT
      ? difficulteRows.map(mapDifficulteRowToData)
      : [];

  const initialRecommendation: RecommendationData = recommendationRow
    ? {
        maturityLevel: recommendationRow.maturity_level ?? "",
        organizationLevel: recommendationRow.organization_level ?? "",
        growthPotential: recommendationRow.growth_potential ?? "",
        compatibility: recommendationRow.compatibility ?? "",
        mainNeeds: recommendationRow.main_needs ?? "",
        risks: recommendationRow.risks ?? "",
        recommendation: recommendationRow.recommendation ?? "",
        comment: recommendationRow.comment ?? "",
      }
    : RECOMMENDATION_EMPTY;

  return (
    <section className="cnt-n py-16">
      <AuditDetail
        auditId={auditId}
        companyName={audit.company_name}
        country={audit.country}
        contactFirstName={audit.contact_first_name}
        contactLastName={audit.contact_last_name}
        contactEmail={audit.contact_email}
        status={audit.status}
        progressPercent={audit.progress_percent}
        invitedAt={audit.invited_at}
        submittedAt={audit.submitted_at}
        answersBySection={answersBySection}
        machines={machines}
        difficultes={difficultes}
        statusHistory={statusHistory ?? []}
        initialNotes={notes ?? []}
        initialRecommendation={initialRecommendation}
      />
    </section>
  );
}
