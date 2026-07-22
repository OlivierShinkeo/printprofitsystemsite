"use client";

import { useId, useState } from "react";
import { useAutosaveSection } from "@/lib/audit/use-autosave-section";
import { QuestionnaireShell } from "@/components/audit/questionnaire-shell";
import { OuiNonSelect } from "@/components/audit/fields/oui-non-select";
import { NIVEAU_MAITRISE_OPTIONS } from "@/lib/audit/schemas/dirigeant";
import { PREPRESSE_EMPTY, type PrepresseData } from "@/lib/audit/schemas/prepresse";

interface PrepresseStepProps {
  auditId: string;
  initialData: Partial<PrepresseData>;
}

const labelClass = "mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600";
const fieldClass =
  "light-input h-11 w-full rounded-md border border-neutral-300 bg-white px-4 font-sans text-[15px] text-navy-800";
const textareaClass =
  "light-textarea min-h-[100px] w-full resize-y rounded-md border border-neutral-300 bg-white px-4 py-3 font-sans text-[15px] text-navy-800";

export function PrepresseStep({ auditId, initialData }: PrepresseStepProps) {
  const formId = useId();
  const [data, setData] = useState<PrepresseData>({ ...PREPRESSE_EMPTY, ...initialData });
  const { status, lastSavedAt } = useAutosaveSection(auditId, "prepresse", data);

  function update<K extends keyof PrepresseData>(key: K, value: PrepresseData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  return (
    <QuestionnaireShell auditId={auditId} sectionSlug="prepresse" status={status} lastSavedAt={lastSavedAt}>
      <form className="flex flex-col gap-6" onSubmit={(event) => event.preventDefault()}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <OuiNonSelect
            id={`${formId}-personneDediee`}
            label="Existe-t-il une personne dédiée au prépresse ?"
            value={data.personneDediee}
            onChange={(value) => update("personneDediee", value)}
          />
          <div>
            <label htmlFor={`${formId}-tempsMoyenPreparation`} className={labelClass}>
              Temps moyen de préparation
            </label>
            <input
              id={`${formId}-tempsMoyenPreparation`}
              className={fieldClass}
              type="text"
              placeholder="ex. 30 minutes"
              value={data.tempsMoyenPreparation}
              onChange={(event) => update("tempsMoyenPreparation", event.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${formId}-logicielsUtilises`} className={labelClass}>
            Logiciels utilisés
          </label>
          <textarea
            id={`${formId}-logicielsUtilises`}
            className={textareaClass}
            value={data.logicielsUtilises}
            onChange={(event) => update("logicielsUtilises", event.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <OuiNonSelect
            id={`${formId}-controleFichiers`}
            label="Contrôle des fichiers"
            value={data.controleFichiers}
            onChange={(value) => update("controleFichiers", value)}
          />
          <OuiNonSelect
            id={`${formId}-controleResolution`}
            label="Contrôle résolution"
            value={data.controleResolution}
            onChange={(value) => update("controleResolution", value)}
          />
          <OuiNonSelect
            id={`${formId}-controleFondsPerdus`}
            label="Contrôle fonds perdus"
            value={data.controleFondsPerdus}
            onChange={(value) => update("controleFondsPerdus", value)}
          />
          <OuiNonSelect
            id={`${formId}-controleColorimetrique`}
            label="Contrôle colorimétrique"
            value={data.controleColorimetrique}
            onChange={(value) => update("controleColorimetrique", value)}
          />
          <OuiNonSelect
            id={`${formId}-batSystematique`}
            label="BAT systématique"
            value={data.batSystematique}
            onChange={(value) => update("batSystematique", value)}
          />
          <OuiNonSelect
            id={`${formId}-checklistExistante`}
            label="Check-list existante"
            value={data.checklistExistante}
            onChange={(value) => update("checklistExistante", value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-gestionPantone`} className={labelClass}>
            Gestion Pantone
          </label>
          <textarea
            id={`${formId}-gestionPantone`}
            className={textareaClass}
            value={data.gestionPantone}
            onChange={(event) => update("gestionPantone", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-principalesDifficultes`} className={labelClass}>
            Principales difficultés
          </label>
          <textarea
            id={`${formId}-principalesDifficultes`}
            className={textareaClass}
            value={data.principalesDifficultes}
            onChange={(event) => update("principalesDifficultes", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-niveauFormationEquipe`} className={labelClass}>
            Niveau de formation estimé de l&apos;équipe
          </label>
          <select
            id={`${formId}-niveauFormationEquipe`}
            className={fieldClass}
            value={data.niveauFormationEquipe}
            onChange={(event) => update("niveauFormationEquipe", event.target.value)}
          >
            <option value="">—</option>
            {NIVEAU_MAITRISE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </form>
    </QuestionnaireShell>
  );
}
