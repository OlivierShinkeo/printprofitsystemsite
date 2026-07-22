"use client";

import { useId, useState } from "react";
import { useAutosaveSection } from "@/lib/audit/use-autosave-section";
import { QuestionnaireShell } from "@/components/audit/questionnaire-shell";
import {
  ACTIVITES_EMPTY,
  ACTIVITES_OPTIONS,
  POSITIONNEMENT_OPTIONS,
  type ActivitesData,
} from "@/lib/audit/schemas/activites";

interface ActivitesStepProps {
  auditId: string;
  initialData: Partial<ActivitesData>;
}

const labelClass = "mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600";
const fieldClass =
  "light-input h-11 w-full rounded-md border border-neutral-300 bg-white px-4 font-sans text-[15px] text-navy-800";
const textareaClass =
  "light-textarea min-h-[100px] w-full resize-y rounded-md border border-neutral-300 bg-white px-4 py-3 font-sans text-[15px] text-navy-800";

export function ActivitesStep({ auditId, initialData }: ActivitesStepProps) {
  const formId = useId();
  const [data, setData] = useState<ActivitesData>({ ...ACTIVITES_EMPTY, ...initialData });
  const { status, lastSavedAt } = useAutosaveSection(auditId, "activites", data);

  function update<K extends keyof ActivitesData>(key: K, value: ActivitesData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function toggleActivite(option: string) {
    setData((current) => ({
      ...current,
      activites: current.activites.includes(option)
        ? current.activites.filter((item) => item !== option)
        : [...current.activites, option],
    }));
  }

  return (
    <QuestionnaireShell auditId={auditId} sectionSlug="activites" status={status} lastSavedAt={lastSavedAt}>
      <form className="flex flex-col gap-6" onSubmit={(event) => event.preventDefault()}>
        <div>
          <p className={labelClass}>Activités exercées</p>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {ACTIVITES_OPTIONS.map((option) => (
              <label key={option} className="flex items-center gap-2.5 text-sm text-navy-800">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-gold-500"
                  checked={data.activites.includes(option)}
                  onChange={() => toggleActivite(option)}
                />
                {option}
              </label>
            ))}
          </div>
          {data.activites.includes("Autre") && (
            <input
              className={`${fieldClass} mt-3`}
              type="text"
              placeholder="Précisez"
              value={data.autrePrecision}
              onChange={(event) => update("autrePrecision", event.target.value)}
            />
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-produitsVendus`} className={labelClass}>
            Principaux produits vendus
          </label>
          <textarea
            id={`${formId}-produitsVendus`}
            className={textareaClass}
            value={data.produitsVendus}
            onChange={(event) => update("produitsVendus", event.target.value)}
          />
        </div>

        <div>
          <p className={labelClass}>Trois produits les plus rentables</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <input
              className={fieldClass}
              type="text"
              value={data.produitRentable1}
              onChange={(event) => update("produitRentable1", event.target.value)}
            />
            <input
              className={fieldClass}
              type="text"
              value={data.produitRentable2}
              onChange={(event) => update("produitRentable2", event.target.value)}
            />
            <input
              className={fieldClass}
              type="text"
              value={data.produitRentable3}
              onChange={(event) => update("produitRentable3", event.target.value)}
            />
          </div>
        </div>

        <div>
          <p className={labelClass}>Trois produits les moins rentables</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <input
              className={fieldClass}
              type="text"
              value={data.produitMoinsRentable1}
              onChange={(event) => update("produitMoinsRentable1", event.target.value)}
            />
            <input
              className={fieldClass}
              type="text"
              value={data.produitMoinsRentable2}
              onChange={(event) => update("produitMoinsRentable2", event.target.value)}
            />
            <input
              className={fieldClass}
              type="text"
              value={data.produitMoinsRentable3}
              onChange={(event) => update("produitMoinsRentable3", event.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${formId}-typesClients`} className={labelClass}>
            Principaux types de clients
          </label>
          <textarea
            id={`${formId}-typesClients`}
            className={textareaClass}
            value={data.typesClients}
            onChange={(event) => update("typesClients", event.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor={`${formId}-partB2B`} className={labelClass}>
              Part B2B (%)
            </label>
            <input
              id={`${formId}-partB2B`}
              className={fieldClass}
              type="number"
              inputMode="numeric"
              value={data.partB2B}
              onChange={(event) => update("partB2B", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${formId}-partB2C`} className={labelClass}>
              Part B2C (%)
            </label>
            <input
              id={`${formId}-partB2C`}
              className={fieldClass}
              type="number"
              inputMode="numeric"
              value={data.partB2C}
              onChange={(event) => update("partB2C", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${formId}-partSousTraitance`} className={labelClass}>
              Part de sous-traitance (%)
            </label>
            <input
              id={`${formId}-partSousTraitance`}
              className={fieldClass}
              type="number"
              inputMode="numeric"
              value={data.partSousTraitance}
              onChange={(event) => update("partSousTraitance", event.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${formId}-saisonnalite`} className={labelClass}>
            Saisonnalité de l&apos;activité
          </label>
          <textarea
            id={`${formId}-saisonnalite`}
            className={textareaClass}
            value={data.saisonnalite}
            onChange={(event) => update("saisonnalite", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-positionnementPrix`} className={labelClass}>
            Positionnement prix
          </label>
          <select
            id={`${formId}-positionnementPrix`}
            className={fieldClass}
            value={data.positionnementPrix}
            onChange={(event) => update("positionnementPrix", event.target.value)}
          >
            <option value="">—</option>
            {POSITIONNEMENT_OPTIONS.map((option) => (
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
