"use client";

import { useId, useState } from "react";
import { useAutosaveSection } from "@/lib/audit/use-autosave-section";
import { QuestionnaireShell } from "@/components/audit/questionnaire-shell";
import {
  DIRIGEANT_EMPTY,
  NIVEAU_MAITRISE_OPTIONS,
  type DirigeantData,
} from "@/lib/audit/schemas/dirigeant";

interface DirigeantStepProps {
  auditId: string;
  initialData: Partial<DirigeantData>;
}

const labelClass = "mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600";
const fieldClass =
  "light-input h-11 w-full rounded-md border border-neutral-300 bg-white px-4 font-sans text-[15px] text-navy-800";
const textareaClass =
  "light-textarea min-h-[100px] w-full resize-y rounded-md border border-neutral-300 bg-white px-4 py-3 font-sans text-[15px] text-navy-800";

export function DirigeantStep({ auditId, initialData }: DirigeantStepProps) {
  const formId = useId();
  const [data, setData] = useState<DirigeantData>({ ...DIRIGEANT_EMPTY, ...initialData });
  const { status, lastSavedAt } = useAutosaveSection(auditId, "dirigeant", data);

  function update<K extends keyof DirigeantData>(key: K, value: DirigeantData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  return (
    <QuestionnaireShell auditId={auditId} sectionSlug="dirigeant" status={status} lastSavedAt={lastSavedAt}>
      <form className="flex flex-col gap-5" onSubmit={(event) => event.preventDefault()}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-prenom`} className={labelClass}>
              Prénom
            </label>
            <input
              id={`${formId}-prenom`}
              className={fieldClass}
              type="text"
              value={data.prenom}
              onChange={(event) => update("prenom", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-nom`} className={labelClass}>
              Nom
            </label>
            <input
              id={`${formId}-nom`}
              className={fieldClass}
              type="text"
              value={data.nom}
              onChange={(event) => update("nom", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-fonction`} className={labelClass}>
              Fonction
            </label>
            <input
              id={`${formId}-fonction`}
              className={fieldClass}
              type="text"
              value={data.fonction}
              onChange={(event) => update("fonction", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-anneesEntreprise`} className={labelClass}>
              Années dans l&apos;entreprise
            </label>
            <input
              id={`${formId}-anneesEntreprise`}
              className={fieldClass}
              type="number"
              inputMode="numeric"
              value={data.anneesEntreprise}
              onChange={(event) => update("anneesEntreprise", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-niveauMaitrise`} className={labelClass}>
              Niveau de maîtrise estimé du métier
            </label>
            <select
              id={`${formId}-niveauMaitrise`}
              className={fieldClass}
              value={data.niveauMaitrise}
              onChange={(event) => update("niveauMaitrise", event.target.value)}
            >
              <option value="">—</option>
              {NIVEAU_MAITRISE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`${formId}-disponibilite`} className={labelClass}>
              Disponibilité hebdomadaire pour un accompagnement
            </label>
            <input
              id={`${formId}-disponibilite`}
              className={fieldClass}
              type="text"
              placeholder="ex. 2 à 3 heures / semaine"
              value={data.disponibiliteHebdomadaire}
              onChange={(event) => update("disponibiliteHebdomadaire", event.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${formId}-experiencePrealable`} className={labelClass}>
            Expérience préalable dans l&apos;imprimerie
          </label>
          <textarea
            id={`${formId}-experiencePrealable`}
            className={textareaClass}
            value={data.experiencePrealable}
            onChange={(event) => update("experiencePrealable", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-formationsSuivies`} className={labelClass}>
            Formations suivies
          </label>
          <textarea
            id={`${formId}-formationsSuivies`}
            className={textareaClass}
            value={data.formationsSuivies}
            onChange={(event) => update("formationsSuivies", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-responsabilitesActuelles`} className={labelClass}>
            Principales responsabilités actuelles
          </label>
          <textarea
            id={`${formId}-responsabilitesActuelles`}
            className={textareaClass}
            value={data.responsabilitesActuelles}
            onChange={(event) => update("responsabilitesActuelles", event.target.value)}
          />
        </div>
      </form>
    </QuestionnaireShell>
  );
}
