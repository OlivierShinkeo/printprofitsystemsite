import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAuditEditable, type AuditStatus } from "@/lib/audit/status";
import { AUDIT_SECTION_SLUGS } from "@/lib/audit/sections";
import { QuestionnaireShell } from "@/components/audit/questionnaire-shell";
import { EntrepriseStep } from "@/components/audit/steps/entreprise-step";
import { DirigeantStep } from "@/components/audit/steps/dirigeant-step";
import { ActivitesStep } from "@/components/audit/steps/activites-step";
import { FluxCommercialStep } from "@/components/audit/steps/flux-commercial-step";
import { PrepresseStep } from "@/components/audit/steps/prepresse-step";
import { ProductionStep } from "@/components/audit/steps/production-step";
import { QualiteStep } from "@/components/audit/steps/qualite-step";
import { PilotageStep } from "@/components/audit/steps/pilotage-step";
import { EquipeStep } from "@/components/audit/steps/equipe-step";
import { ObjectifsStep } from "@/components/audit/steps/objectifs-step";
import { AccompagnementStep } from "@/components/audit/steps/accompagnement-step";
import { MachinesStep } from "@/components/audit/steps/machines-step";
import { DifficultesStep } from "@/components/audit/steps/difficultes-step";
import type { MachineData } from "@/lib/audit/schemas/machines";
import { createEmptyDifficultes, DIFFICULTES_COUNT, type DifficulteData } from "@/lib/audit/schemas/difficultes";

export const metadata: Metadata = { robots: { index: false, follow: false } };

const FIRST_STEP = "entreprise";

export default async function QuestionnairePage({
  params,
  searchParams,
}: {
  params: Promise<{ auditId: string }>;
  searchParams: Promise<{ step?: string }>;
}) {
  const { auditId } = await params;
  const { step } = await searchParams;
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

  if (step && !AUDIT_SECTION_SLUGS.has(step)) {
    redirect(`/audit/${auditId}/questionnaire?step=${FIRST_STEP}`);
  }
  const stepSlug = step ?? FIRST_STEP;

  const { data: answerRow } = await supabase
    .from("audit_answers")
    .select("data")
    .eq("audit_id", auditId)
    .eq("section_slug", stepSlug)
    .maybeSingle<{ data: Record<string, unknown> }>();

  const initialData = answerRow?.data ?? {};

  switch (stepSlug) {
    case "entreprise": {
      const { data: settings } = await supabase
        .from("app_settings")
        .select("chiffre_affaires_obligatoire")
        .eq("id", true)
        .single<{ chiffre_affaires_obligatoire: boolean }>();

      return (
        <EntrepriseStep
          auditId={auditId}
          initialData={initialData}
          caObligatoire={settings?.chiffre_affaires_obligatoire ?? false}
        />
      );
    }

    case "dirigeant":
      return <DirigeantStep auditId={auditId} initialData={initialData} />;

    case "activites":
      return <ActivitesStep auditId={auditId} initialData={initialData} />;

    case "flux_commercial":
      return <FluxCommercialStep auditId={auditId} initialData={initialData} />;

    case "prepresse":
      return <PrepresseStep auditId={auditId} initialData={initialData} />;

    case "production":
      return <ProductionStep auditId={auditId} initialData={initialData} />;

    case "qualite":
      return <QualiteStep auditId={auditId} initialData={initialData} />;

    case "pilotage":
      return <PilotageStep auditId={auditId} initialData={initialData} />;

    case "equipe":
      return <EquipeStep auditId={auditId} initialData={initialData} />;

    case "objectifs":
      return <ObjectifsStep auditId={auditId} initialData={initialData} />;

    case "accompagnement":
      return <AccompagnementStep auditId={auditId} initialData={initialData} />;

    case "machines": {
      const { data: machineRows } = await supabase
        .from("audit_machines")
        .select(
          "type, brand, model, year, technology, format, condition, usage_frequency, monthly_volume, main_use, main_difficulty, maintenance_type, is_critical"
        )
        .eq("audit_id", auditId)
        .order("position", { ascending: true });

      const initialMachines: MachineData[] = (machineRows ?? []).map((row) => ({
        type: row.type ?? "",
        marque: row.brand ?? "",
        modele: row.model ?? "",
        annee: row.year != null ? String(row.year) : "",
        technologie: row.technology ?? "",
        format: row.format ?? "",
        etatGeneral: row.condition ?? "",
        frequenceUtilisation: row.usage_frequency ?? "",
        volumeMensuel: row.monthly_volume ?? "",
        principalUsage: row.main_use ?? "",
        principaleDifficulte: row.main_difficulty ?? "",
        maintenance: row.maintenance_type ?? "",
        critique: Boolean(row.is_critical),
      }));

      return <MachinesStep auditId={auditId} initialMachines={initialMachines} />;
    }

    case "difficultes": {
      const { data: difficulteRows } = await supabase
        .from("audit_difficulties")
        .select(
          "rank, description, frequency, age, operational_impact, financial_impact, client_impact, urgency, actions_tried, result"
        )
        .eq("audit_id", auditId)
        .order("rank", { ascending: true });

      const initialDifficultes: DifficulteData[] =
        difficulteRows && difficulteRows.length === DIFFICULTES_COUNT
          ? difficulteRows.map((row) => ({
              description: row.description ?? "",
              frequence: row.frequency ?? "",
              anciennete: row.age ?? "",
              impactOperationnel: row.operational_impact ?? "",
              impactFinancier: row.financial_impact ?? "",
              impactClient: row.client_impact ?? "",
              urgence: row.urgency ?? "",
              actionsTentees: row.actions_tried ?? "",
              resultat: row.result ?? "",
            }))
          : createEmptyDifficultes();

      return <DifficultesStep auditId={auditId} initialDifficultes={initialDifficultes} />;
    }

    default:
      // "validation" (recap + submit, part of Phase 4) isn't built yet —
      // keep sequential Prev/Next navigation working rather than bouncing
      // back to step 1.
      return (
        <QuestionnaireShell auditId={auditId} sectionSlug={stepSlug} status="idle" lastSavedAt={null}>
          <p className="text-sm text-neutral-600">Cette étape sera disponible prochainement.</p>
        </QuestionnaireShell>
      );
  }
}
