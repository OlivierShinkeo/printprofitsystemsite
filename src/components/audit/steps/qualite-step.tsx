"use client";

import { useId, useState } from "react";
import { useAutosaveSection } from "@/lib/audit/use-autosave-section";
import { QuestionnaireShell } from "@/components/audit/questionnaire-shell";
import { OuiNonSelect } from "@/components/audit/fields/oui-non-select";
import { QUALITE_EMPTY, type QualiteData } from "@/lib/audit/schemas/qualite";

interface QualiteStepProps {
  auditId: string;
  initialData: Partial<QualiteData>;
}

const labelClass = "mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600";
const fieldClass =
  "light-input h-11 w-full rounded-md border border-neutral-300 bg-white px-4 font-sans text-[15px] text-navy-800";

const INCIDENT_FIELDS: { key: keyof QualiteData; label: string }[] = [
  { key: "nbReimpressions", label: "Nombre de réimpressions" },
  { key: "erreursFichier", label: "Erreurs fichier" },
  { key: "erreursCouleur", label: "Erreurs couleur" },
  { key: "erreursMatiere", label: "Erreurs matière" },
  { key: "erreursQuantite", label: "Erreurs quantité" },
  { key: "defautsFinition", label: "Défauts de finition" },
  { key: "retards", label: "Retards" },
  { key: "reclamationsClient", label: "Réclamations client" },
  { key: "urgencesNonPlanifiees", label: "Urgences non planifiées" },
  { key: "travauxRefaitsGratuitement", label: "Travaux refaits gratuitement" },
];

export function QualiteStep({ auditId, initialData }: QualiteStepProps) {
  const formId = useId();
  const [data, setData] = useState<QualiteData>({ ...QUALITE_EMPTY, ...initialData });
  const { status, lastSavedAt } = useAutosaveSection(auditId, "qualite", data);

  function update<K extends keyof QualiteData>(key: K, value: QualiteData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  return (
    <QuestionnaireShell auditId={auditId} sectionSlug="qualite" status={status} lastSavedAt={lastSavedAt}>
      <form className="flex flex-col gap-6" onSubmit={(event) => event.preventDefault()}>
        <div>
          <p className={labelClass}>Estimation sur les trois derniers mois</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {INCIDENT_FIELDS.map(({ key, label }) => (
              <div key={key}>
                <label htmlFor={`${formId}-${key}`} className={labelClass}>
                  {label}
                </label>
                <input
                  id={`${formId}-${key}`}
                  className={fieldClass}
                  type="number"
                  inputMode="numeric"
                  value={data[key]}
                  onChange={(event) => update(key, event.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <OuiNonSelect
            id={`${formId}-incidentsEnregistres`}
            label="Ces incidents sont-ils enregistrés ?"
            value={data.incidentsEnregistres}
            onChange={(value) => update("incidentsEnregistres", value)}
          />
          <OuiNonSelect
            id={`${formId}-causesAnalysees`}
            label="Leurs causes sont-elles analysées ?"
            value={data.causesAnalysees}
            onChange={(value) => update("causesAnalysees", value)}
          />
          <OuiNonSelect
            id={`${formId}-reunionSuivi`}
            label="Existe-t-il une réunion de suivi ?"
            value={data.reunionSuivi}
            onChange={(value) => update("reunionSuivi", value)}
          />
          <OuiNonSelect
            id={`${formId}-actionsCorrectives`}
            label="Existe-t-il des actions correctives ?"
            value={data.actionsCorrectives}
            onChange={(value) => update("actionsCorrectives", value)}
          />
          <OuiNonSelect
            id={`${formId}-coutEstime`}
            label="Existe-t-il un coût estimé de ces incidents ?"
            value={data.coutEstime}
            onChange={(value) => update("coutEstime", value)}
          />
        </div>
      </form>
    </QuestionnaireShell>
  );
}
