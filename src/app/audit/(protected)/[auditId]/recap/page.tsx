import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AuditRecap } from "@/components/audit/audit-recap";
import { Button } from "@/components/ui/button";
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

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function RecapPage({ params }: { params: Promise<{ auditId: string }> }) {
  const { auditId } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: audit } = await supabase
    .from("audits")
    .select("company_name")
    .eq("id", auditId)
    .maybeSingle<{ company_name: string }>();

  if (!audit) notFound();

  const [{ data: allAnswers }, { data: machineRows }, { data: difficulteRows }] = await Promise.all([
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

  return (
    <section className="cnt-n py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 font-display text-2xl font-bold text-navy-800">
          Vos réponses — {audit.company_name}
        </h1>
        <div className="rounded-md border border-neutral-200 bg-white px-8 py-10">
          <AuditRecap answersBySection={answersBySection} machines={machines} difficultes={difficultes} />
        </div>
        <div className="mt-6">
          <Button href={`/audit/${auditId}`} variant="secondary" size="md">
            Retour au tableau de bord
          </Button>
        </div>
      </div>
    </section>
  );
}
