"use client";

import { useId, useState } from "react";
import { useAutosaveSection } from "@/lib/audit/use-autosave-section";
import { QuestionnaireShell } from "@/components/audit/questionnaire-shell";
import { OBJECTIFS_EMPTY, type ObjectifsData } from "@/lib/audit/schemas/objectifs";

interface ObjectifsStepProps {
  auditId: string;
  initialData: Partial<ObjectifsData>;
}

const labelClass = "mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600";
const fieldClass =
  "light-input h-11 w-full rounded-md border border-neutral-300 bg-white px-4 font-sans text-[15px] text-navy-800";
const textareaClass =
  "light-textarea min-h-[100px] w-full resize-y rounded-md border border-neutral-300 bg-white px-4 py-3 font-sans text-[15px] text-navy-800";

export function ObjectifsStep({ auditId, initialData }: ObjectifsStepProps) {
  const formId = useId();
  const [data, setData] = useState<ObjectifsData>({ ...OBJECTIFS_EMPTY, ...initialData });
  const { status, lastSavedAt } = useAutosaveSection(auditId, "objectifs", data);

  function update<K extends keyof ObjectifsData>(key: K, value: ObjectifsData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  return (
    <QuestionnaireShell auditId={auditId} sectionSlug="objectifs" status={status} lastSavedAt={lastSavedAt}>
      <form className="flex flex-col gap-6" onSubmit={(event) => event.preventDefault()}>
        <div>
          <label htmlFor={`${formId}-objectifs6Mois`} className={labelClass}>
            Objectifs à 6 mois
          </label>
          <textarea
            id={`${formId}-objectifs6Mois`}
            className={textareaClass}
            value={data.objectifs6Mois}
            onChange={(event) => update("objectifs6Mois", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-objectifs12Mois`} className={labelClass}>
            Objectifs à 12 mois
          </label>
          <textarea
            id={`${formId}-objectifs12Mois`}
            className={textareaClass}
            value={data.objectifs12Mois}
            onChange={(event) => update("objectifs12Mois", event.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-objectifCA`} className={labelClass}>
              Objectif de chiffre d&apos;affaires
            </label>
            <input
              id={`${formId}-objectifCA`}
              className={fieldClass}
              type="text"
              value={data.objectifCA}
              onChange={(event) => update("objectifCA", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${formId}-objectifRentabilite`} className={labelClass}>
              Objectif de rentabilité
            </label>
            <input
              id={`${formId}-objectifRentabilite`}
              className={fieldClass}
              type="text"
              value={data.objectifRentabilite}
              onChange={(event) => update("objectifRentabilite", event.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${formId}-objectifOrganisation`} className={labelClass}>
            Objectif d&apos;organisation
          </label>
          <textarea
            id={`${formId}-objectifOrganisation`}
            className={textareaClass}
            value={data.objectifOrganisation}
            onChange={(event) => update("objectifOrganisation", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-objectifRecrutement`} className={labelClass}>
            Objectif de recrutement
          </label>
          <textarea
            id={`${formId}-objectifRecrutement`}
            className={textareaClass}
            value={data.objectifRecrutement}
            onChange={(event) => update("objectifRecrutement", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-objectifFormation`} className={labelClass}>
            Objectif de formation
          </label>
          <textarea
            id={`${formId}-objectifFormation`}
            className={textareaClass}
            value={data.objectifFormation}
            onChange={(event) => update("objectifFormation", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-objectifInvestissement`} className={labelClass}>
            Objectif d&apos;investissement
          </label>
          <textarea
            id={`${formId}-objectifInvestissement`}
            className={textareaClass}
            value={data.objectifInvestissement}
            onChange={(event) => update("objectifInvestissement", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-resultatPrioritaire`} className={labelClass}>
            Résultat prioritaire attendu
          </label>
          <textarea
            id={`${formId}-resultatPrioritaire`}
            className={textareaClass}
            value={data.resultatPrioritaire}
            onChange={(event) => update("resultatPrioritaire", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-mesureSucces`} className={labelClass}>
            Comment le succès serait-il mesuré ?
          </label>
          <textarea
            id={`${formId}-mesureSucces`}
            className={textareaClass}
            value={data.mesureSucces}
            onChange={(event) => update("mesureSucces", event.target.value)}
          />
        </div>
      </form>
    </QuestionnaireShell>
  );
}
