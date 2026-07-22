"use client";

import { useId, useState } from "react";
import { useAutosaveSection } from "@/lib/audit/use-autosave-section";
import { QuestionnaireShell } from "@/components/audit/questionnaire-shell";
import { CheckboxGroup } from "@/components/audit/fields/checkbox-group";
import { SelectField } from "@/components/audit/fields/select-field";
import {
  FREQUENCE_OPTIONS,
  INDICATEURS_OPTIONS,
  PILOTAGE_EMPTY,
  type PilotageData,
} from "@/lib/audit/schemas/pilotage";

interface PilotageStepProps {
  auditId: string;
  initialData: Partial<PilotageData>;
}

const labelClass = "mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600";
const fieldClass =
  "light-input h-11 w-full rounded-md border border-neutral-300 bg-white px-4 font-sans text-[15px] text-navy-800";
const textareaClass =
  "light-textarea min-h-[100px] w-full resize-y rounded-md border border-neutral-300 bg-white px-4 py-3 font-sans text-[15px] text-navy-800";

export function PilotageStep({ auditId, initialData }: PilotageStepProps) {
  const formId = useId();
  const [data, setData] = useState<PilotageData>({ ...PILOTAGE_EMPTY, ...initialData });
  const { status, lastSavedAt } = useAutosaveSection(auditId, "pilotage", data);

  function update<K extends keyof PilotageData>(key: K, value: PilotageData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function toggleIndicateur(option: string) {
    setData((current) => ({
      ...current,
      indicateurs: current.indicateurs.includes(option)
        ? current.indicateurs.filter((item) => item !== option)
        : [...current.indicateurs, option],
    }));
  }

  return (
    <QuestionnaireShell auditId={auditId} sectionSlug="pilotage" status={status} lastSavedAt={lastSavedAt}>
      <form className="flex flex-col gap-6" onSubmit={(event) => event.preventDefault()}>
        <CheckboxGroup
          label="Indicateurs suivis"
          options={INDICATEURS_OPTIONS}
          selected={data.indicateurs}
          onToggle={toggleIndicateur}
        />
        {data.indicateurs.includes("Autre") && (
          <input
            className={fieldClass}
            type="text"
            placeholder="Précisez"
            value={data.indicateursAutrePrecision}
            onChange={(event) => update("indicateursAutrePrecision", event.target.value)}
          />
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <SelectField
            id={`${formId}-frequenceSuivi`}
            label="Fréquence de suivi"
            options={FREQUENCE_OPTIONS}
            value={data.frequenceSuivi}
            onChange={(value) => update("frequenceSuivi", value)}
          />
          <div>
            <label htmlFor={`${formId}-outilUtilise`} className={labelClass}>
              Outil utilisé
            </label>
            <input
              id={`${formId}-outilUtilise`}
              className={fieldClass}
              type="text"
              value={data.outilUtilise}
              onChange={(event) => update("outilUtilise", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${formId}-personneResponsable`} className={labelClass}>
              Personne responsable
            </label>
            <input
              id={`${formId}-personneResponsable`}
              className={fieldClass}
              type="text"
              value={data.personneResponsable}
              onChange={(event) => update("personneResponsable", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${formId}-qualitePercueDonnees`} className={labelClass}>
              Qualité perçue des données
            </label>
            <input
              id={`${formId}-qualitePercueDonnees`}
              className={fieldClass}
              type="text"
              value={data.qualitePercueDonnees}
              onChange={(event) => update("qualitePercueDonnees", event.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${formId}-decisionsPermises`} className={labelClass}>
            Quelles décisions ces indicateurs permettent-ils de prendre ?
          </label>
          <textarea
            id={`${formId}-decisionsPermises`}
            className={textareaClass}
            value={data.decisionsPermises}
            onChange={(event) => update("decisionsPermises", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-indicateursManquants`} className={labelClass}>
            Quels indicateurs manquent aujourd&apos;hui ?
          </label>
          <textarea
            id={`${formId}-indicateursManquants`}
            className={textareaClass}
            value={data.indicateursManquants}
            onChange={(event) => update("indicateursManquants", event.target.value)}
          />
        </div>
      </form>
    </QuestionnaireShell>
  );
}
