"use client";

import { useId, useState } from "react";
import { useAutosaveSection } from "@/lib/audit/use-autosave-section";
import { QuestionnaireShell } from "@/components/audit/questionnaire-shell";
import { OuiNonSelect } from "@/components/audit/fields/oui-non-select";
import { SelectField } from "@/components/audit/fields/select-field";
import {
  CONTROLE_QUALITE_OPTIONS,
  ORDRES_FABRICATION_OPTIONS,
  PLANNING_OPTIONS,
  PRODUCTION_EMPTY,
  type ProductionData,
} from "@/lib/audit/schemas/production";

interface ProductionStepProps {
  auditId: string;
  initialData: Partial<ProductionData>;
}

const labelClass = "mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600";
const textareaClass =
  "light-textarea min-h-[100px] w-full resize-y rounded-md border border-neutral-300 bg-white px-4 py-3 font-sans text-[15px] text-navy-800";

export function ProductionStep({ auditId, initialData }: ProductionStepProps) {
  const formId = useId();
  const [data, setData] = useState<ProductionData>({ ...PRODUCTION_EMPTY, ...initialData });
  const { status, lastSavedAt } = useAutosaveSection(auditId, "production", data);

  function update<K extends keyof ProductionData>(key: K, value: ProductionData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  return (
    <QuestionnaireShell auditId={auditId} sectionSlug="production" status={status} lastSavedAt={lastSavedAt}>
      <form className="flex flex-col gap-6" onSubmit={(event) => event.preventDefault()}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <SelectField
            id={`${formId}-planning`}
            label="Planning"
            options={PLANNING_OPTIONS}
            value={data.planning}
            onChange={(value) => update("planning", value)}
          />
          <SelectField
            id={`${formId}-ordresFabrication`}
            label="Ordres de fabrication"
            options={ORDRES_FABRICATION_OPTIONS}
            value={data.ordresFabrication}
            onChange={(value) => update("ordresFabrication", value)}
          />
          <OuiNonSelect
            id={`${formId}-standardsTravail`}
            label="Standards de travail disponibles"
            value={data.standardsTravail}
            onChange={(value) => update("standardsTravail", value)}
          />
          <OuiNonSelect
            id={`${formId}-tempsReglageMesures`}
            label="Temps de réglage mesurés"
            value={data.tempsReglageMesures}
            onChange={(value) => update("tempsReglageMesures", value)}
          />
          <OuiNonSelect
            id={`${formId}-tempsReelMesure`}
            label="Temps réel mesuré"
            value={data.tempsReelMesure}
            onChange={(value) => update("tempsReelMesure", value)}
          />
          <OuiNonSelect
            id={`${formId}-tauxOccupationSuivi`}
            label="Taux d'occupation machine suivi"
            value={data.tauxOccupationSuivi}
            onChange={(value) => update("tauxOccupationSuivi", value)}
          />
          <OuiNonSelect
            id={`${formId}-productiviteSuivie`}
            label="Productivité suivie"
            value={data.productiviteSuivie}
            onChange={(value) => update("productiviteSuivie", value)}
          />
          <SelectField
            id={`${formId}-controleQualite`}
            label="Qualité contrôlée"
            options={CONTROLE_QUALITE_OPTIONS}
            value={data.controleQualite}
            onChange={(value) => update("controleQualite", value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-organisationChangementsSerie`} className={labelClass}>
            Organisation des changements de série
          </label>
          <textarea
            id={`${formId}-organisationChangementsSerie`}
            className={textareaClass}
            value={data.organisationChangementsSerie}
            onChange={(event) => update("organisationChangementsSerie", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-gestionUrgences`} className={labelClass}>
            Gestion des urgences
          </label>
          <textarea
            id={`${formId}-gestionUrgences`}
            className={textareaClass}
            value={data.gestionUrgences}
            onChange={(event) => update("gestionUrgences", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-gestionReprises`} className={labelClass}>
            Gestion des reprises
          </label>
          <textarea
            id={`${formId}-gestionReprises`}
            className={textareaClass}
            value={data.gestionReprises}
            onChange={(event) => update("gestionReprises", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-suiviRetards`} className={labelClass}>
            Suivi des retards
          </label>
          <textarea
            id={`${formId}-suiviRetards`}
            className={textareaClass}
            value={data.suiviRetards}
            onChange={(event) => update("suiviRetards", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-suiviSousTraitance`} className={labelClass}>
            Suivi de la sous-traitance
          </label>
          <textarea
            id={`${formId}-suiviSousTraitance`}
            className={textareaClass}
            value={data.suiviSousTraitance}
            onChange={(event) => update("suiviSousTraitance", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-causesRalentissement`} className={labelClass}>
            Principales causes de ralentissement
          </label>
          <textarea
            id={`${formId}-causesRalentissement`}
            className={textareaClass}
            value={data.causesRalentissement}
            onChange={(event) => update("causesRalentissement", event.target.value)}
          />
        </div>
      </form>
    </QuestionnaireShell>
  );
}
