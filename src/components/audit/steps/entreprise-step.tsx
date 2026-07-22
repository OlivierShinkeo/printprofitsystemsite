"use client";

import { useId, useState } from "react";
import { useAutosaveSection } from "@/lib/audit/use-autosave-section";
import { QuestionnaireShell } from "@/components/audit/questionnaire-shell";
import {
  DEVISE_OPTIONS,
  ENTREPRISE_EMPTY,
  type EntrepriseData,
} from "@/lib/audit/schemas/entreprise";

interface EntrepriseStepProps {
  auditId: string;
  initialData: Partial<EntrepriseData>;
  caObligatoire: boolean;
}

const labelClass = "mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600";
const fieldClass =
  "light-input h-11 w-full rounded-md border border-neutral-300 bg-white px-4 font-sans text-[15px] text-navy-800";

export function EntrepriseStep({ auditId, initialData, caObligatoire }: EntrepriseStepProps) {
  const formId = useId();
  const [data, setData] = useState<EntrepriseData>({ ...ENTREPRISE_EMPTY, ...initialData });
  const { status, lastSavedAt } = useAutosaveSection(auditId, "entreprise", data);

  function update<K extends keyof EntrepriseData>(key: K, value: EntrepriseData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  return (
    <QuestionnaireShell
      auditId={auditId}
      sectionSlug="entreprise"
      status={status}
      lastSavedAt={lastSavedAt}
    >
      <form className="flex flex-col gap-5" onSubmit={(event) => event.preventDefault()}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-raisonSociale`} className={labelClass}>
              Raison sociale
            </label>
            <input
              id={`${formId}-raisonSociale`}
              className={fieldClass}
              type="text"
              value={data.raisonSociale}
              onChange={(event) => update("raisonSociale", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-nomCommercial`} className={labelClass}>
              Nom commercial
            </label>
            <input
              id={`${formId}-nomCommercial`}
              className={fieldClass}
              type="text"
              value={data.nomCommercial}
              onChange={(event) => update("nomCommercial", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-pays`} className={labelClass}>
              Pays
            </label>
            <input
              id={`${formId}-pays`}
              className={fieldClass}
              type="text"
              value={data.pays}
              onChange={(event) => update("pays", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-ville`} className={labelClass}>
              Ville
            </label>
            <input
              id={`${formId}-ville`}
              className={fieldClass}
              type="text"
              value={data.ville}
              onChange={(event) => update("ville", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-anneeCreation`} className={labelClass}>
              Année de création
            </label>
            <input
              id={`${formId}-anneeCreation`}
              className={fieldClass}
              type="number"
              inputMode="numeric"
              value={data.anneeCreation}
              onChange={(event) => update("anneeCreation", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-formeJuridique`} className={labelClass}>
              Forme juridique
            </label>
            <input
              id={`${formId}-formeJuridique`}
              className={fieldClass}
              type="text"
              value={data.formeJuridique}
              onChange={(event) => update("formeJuridique", event.target.value)}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor={`${formId}-siteInternet`} className={labelClass}>
              Site internet
            </label>
            <input
              id={`${formId}-siteInternet`}
              className={fieldClass}
              type="text"
              placeholder="https://"
              value={data.siteInternet}
              onChange={(event) => update("siteInternet", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-effectifTotal`} className={labelClass}>
              Effectif total
            </label>
            <input
              id={`${formId}-effectifTotal`}
              className={fieldClass}
              type="number"
              inputMode="numeric"
              value={data.effectifTotal}
              onChange={(event) => update("effectifTotal", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-effectifProduction`} className={labelClass}>
              Personnes en production
            </label>
            <input
              id={`${formId}-effectifProduction`}
              className={fieldClass}
              type="number"
              inputMode="numeric"
              value={data.effectifProduction}
              onChange={(event) => update("effectifProduction", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-effectifPrepresse`} className={labelClass}>
              Personnes au prépresse
            </label>
            <input
              id={`${formId}-effectifPrepresse`}
              className={fieldClass}
              type="number"
              inputMode="numeric"
              value={data.effectifPrepresse}
              onChange={(event) => update("effectifPrepresse", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-effectifCommercial`} className={labelClass}>
              Nombre de commerciaux
            </label>
            <input
              id={`${formId}-effectifCommercial`}
              className={fieldClass}
              type="number"
              inputMode="numeric"
              value={data.effectifCommercial}
              onChange={(event) => update("effectifCommercial", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-chiffreAffaires`} className={labelClass}>
              Chiffre d&apos;affaires annuel
              {!caObligatoire && (
                <span className="ml-1 font-normal normal-case tracking-normal opacity-65">
                  (optionnel)
                </span>
              )}
            </label>
            <input
              id={`${formId}-chiffreAffaires`}
              className={fieldClass}
              type="number"
              inputMode="numeric"
              required={caObligatoire}
              value={data.chiffreAffaires}
              onChange={(event) => update("chiffreAffaires", event.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-devise`} className={labelClass}>
              Devise
            </label>
            <select
              id={`${formId}-devise`}
              className={fieldClass}
              value={data.devise}
              onChange={(event) => update("devise", event.target.value)}
            >
              <option value="">—</option>
              {DEVISE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </QuestionnaireShell>
  );
}
