"use client";

import { useId, useState } from "react";
import { useAutosaveSection } from "@/lib/audit/use-autosave-section";
import { QuestionnaireShell } from "@/components/audit/questionnaire-shell";
import { OuiNonSelect } from "@/components/audit/fields/oui-non-select";
import { SelectField } from "@/components/audit/fields/select-field";
import { FREQUENCE_OPTIONS } from "@/lib/audit/schemas/pilotage";
import { EQUIPE_EMPTY, NIVEAU_OPTIONS, type EquipeData } from "@/lib/audit/schemas/equipe";

interface EquipeStepProps {
  auditId: string;
  initialData: Partial<EquipeData>;
}

const labelClass = "mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600";
const textareaClass =
  "light-textarea min-h-[100px] w-full resize-y rounded-md border border-neutral-300 bg-white px-4 py-3 font-sans text-[15px] text-navy-800";
const fieldClass =
  "light-input h-11 w-full rounded-md border border-neutral-300 bg-white px-4 font-sans text-[15px] text-navy-800";

export function EquipeStep({ auditId, initialData }: EquipeStepProps) {
  const formId = useId();
  const [data, setData] = useState<EquipeData>({ ...EQUIPE_EMPTY, ...initialData });
  const { status, lastSavedAt } = useAutosaveSection(auditId, "equipe", data);

  function update<K extends keyof EquipeData>(key: K, value: EquipeData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  return (
    <QuestionnaireShell auditId={auditId} sectionSlug="equipe" status={status} lastSavedAt={lastSavedAt}>
      <form className="flex flex-col gap-6" onSubmit={(event) => event.preventDefault()}>
        <div>
          <label htmlFor={`${formId}-effectifDetaille`} className={labelClass}>
            Effectif détaillé
          </label>
          <textarea
            id={`${formId}-effectifDetaille`}
            className={textareaClass}
            value={data.effectifDetaille}
            onChange={(event) => update("effectifDetaille", event.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <OuiNonSelect
            id={`${formId}-rolesDefinis`}
            label="Rôles clairement définis"
            value={data.rolesDefinis}
            onChange={(value) => update("rolesDefinis", value)}
          />
          <SelectField
            id={`${formId}-niveauPolyvalence`}
            label="Niveau de polyvalence"
            options={NIVEAU_OPTIONS}
            value={data.niveauPolyvalence}
            onChange={(value) => update("niveauPolyvalence", value)}
          />
          <div>
            <label htmlFor={`${formId}-turnover`} className={labelClass}>
              Turnover
            </label>
            <input
              id={`${formId}-turnover`}
              className={fieldClass}
              type="text"
              value={data.turnover}
              onChange={(event) => update("turnover", event.target.value)}
            />
          </div>
          <OuiNonSelect
            id={`${formId}-standardsDocumentes`}
            label="Standards documentés"
            value={data.standardsDocumentes}
            onChange={(value) => update("standardsDocumentes", value)}
          />
          <OuiNonSelect
            id={`${formId}-reunionsProduction`}
            label="Réunions de production"
            value={data.reunionsProduction}
            onChange={(value) => update("reunionsProduction", value)}
          />
          <SelectField
            id={`${formId}-frequencePointsEquipe`}
            label="Fréquence des points d'équipe"
            options={FREQUENCE_OPTIONS}
            value={data.frequencePointsEquipe}
            onChange={(value) => update("frequencePointsEquipe", value)}
          />
          <SelectField
            id={`${formId}-autonomieResponsables`}
            label="Niveau d'autonomie des responsables"
            options={NIVEAU_OPTIONS}
            value={data.autonomieResponsables}
            onChange={(value) => update("autonomieResponsables", value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-besoinFormation`} className={labelClass}>
            Besoin de formation
          </label>
          <textarea
            id={`${formId}-besoinFormation`}
            className={textareaClass}
            value={data.besoinFormation}
            onChange={(event) => update("besoinFormation", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-competencesManquantes`} className={labelClass}>
            Compétences manquantes
          </label>
          <textarea
            id={`${formId}-competencesManquantes`}
            className={textareaClass}
            value={data.competencesManquantes}
            onChange={(event) => update("competencesManquantes", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-integrationNouveaux`} className={labelClass}>
            Intégration des nouveaux
          </label>
          <textarea
            id={`${formId}-integrationNouveaux`}
            className={textareaClass}
            value={data.integrationNouveaux}
            onChange={(event) => update("integrationNouveaux", event.target.value)}
          />
        </div>
      </form>
    </QuestionnaireShell>
  );
}
