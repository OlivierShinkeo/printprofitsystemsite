"use client";

import { useId, useState } from "react";
import { useAutosaveSection } from "@/lib/audit/use-autosave-section";
import { QuestionnaireShell } from "@/components/audit/questionnaire-shell";
import { CheckboxGroup } from "@/components/audit/fields/checkbox-group";
import { OuiNonSelect } from "@/components/audit/fields/oui-non-select";
import {
  FLUX_COMMERCIAL_EMPTY,
  OUTILS_OPTIONS,
  type FluxCommercialData,
} from "@/lib/audit/schemas/flux-commercial";

interface FluxCommercialStepProps {
  auditId: string;
  initialData: Partial<FluxCommercialData>;
}

const labelClass = "mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600";
const fieldClass =
  "light-input h-11 w-full rounded-md border border-neutral-300 bg-white px-4 font-sans text-[15px] text-navy-800";
const textareaClass =
  "light-textarea min-h-[100px] w-full resize-y rounded-md border border-neutral-300 bg-white px-4 py-3 font-sans text-[15px] text-navy-800";

export function FluxCommercialStep({ auditId, initialData }: FluxCommercialStepProps) {
  const formId = useId();
  const [data, setData] = useState<FluxCommercialData>({ ...FLUX_COMMERCIAL_EMPTY, ...initialData });
  const { status, lastSavedAt } = useAutosaveSection(auditId, "flux_commercial", data);

  function update<K extends keyof FluxCommercialData>(key: K, value: FluxCommercialData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function toggleOutil(option: string) {
    setData((current) => ({
      ...current,
      outils: current.outils.includes(option)
        ? current.outils.filter((item) => item !== option)
        : [...current.outils, option],
    }));
  }

  return (
    <QuestionnaireShell
      auditId={auditId}
      sectionSlug="flux_commercial"
      status={status}
      lastSavedAt={lastSavedAt}
    >
      <form className="flex flex-col gap-6" onSubmit={(event) => event.preventDefault()}>
        <div>
          <label htmlFor={`${formId}-demandesClients`} className={labelClass}>
            Comment les demandes clients arrivent-elles ?
          </label>
          <textarea
            id={`${formId}-demandesClients`}
            className={textareaClass}
            value={data.demandesClients}
            onChange={(event) => update("demandesClients", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-etablissementDevis`} className={labelClass}>
            Comment les devis sont-ils établis ?
          </label>
          <textarea
            id={`${formId}-etablissementDevis`}
            className={textareaClass}
            value={data.etablissementDevis}
            onChange={(event) => update("etablissementDevis", event.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-quiValideDevis`} className={labelClass}>
              Qui valide les devis ?
            </label>
            <input
              id={`${formId}-quiValideDevis`}
              className={fieldClass}
              type="text"
              value={data.quiValideDevis}
              onChange={(event) => update("quiValideDevis", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${formId}-nbInterlocuteurs`} className={labelClass}>
              Nombre d&apos;interlocuteurs avant production
            </label>
            <input
              id={`${formId}-nbInterlocuteurs`}
              className={fieldClass}
              type="number"
              inputMode="numeric"
              value={data.nbInterlocuteurs}
              onChange={(event) => update("nbInterlocuteurs", event.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${formId}-confirmationCommandes`} className={labelClass}>
            Comment les commandes sont-elles confirmées ?
          </label>
          <textarea
            id={`${formId}-confirmationCommandes`}
            className={textareaClass}
            value={data.confirmationCommandes}
            onChange={(event) => update("confirmationCommandes", event.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <OuiNonSelect
            id={`${formId}-dossierFabrication`}
            label="Existe-t-il un dossier de fabrication ?"
            value={data.dossierFabrication}
            onChange={(value) => update("dossierFabrication", value)}
          />
          <OuiNonSelect
            id={`${formId}-ficheProduction`}
            label="Existe-t-il une fiche de production ?"
            value={data.ficheProduction}
            onChange={(value) => update("ficheProduction", value)}
          />
          <OuiNonSelect
            id={`${formId}-bat`}
            label="Existe-t-il un BAT ?"
            value={data.bat}
            onChange={(value) => update("bat", value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor={`${formId}-quiValideCouleurs`} className={labelClass}>
              Qui valide les couleurs ?
            </label>
            <input
              id={`${formId}-quiValideCouleurs`}
              className={fieldClass}
              type="text"
              value={data.quiValideCouleurs}
              onChange={(event) => update("quiValideCouleurs", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${formId}-quiValideMatieres`} className={labelClass}>
              Qui valide les matières ?
            </label>
            <input
              id={`${formId}-quiValideMatieres`}
              className={fieldClass}
              type="text"
              value={data.quiValideMatieres}
              onChange={(event) => update("quiValideMatieres", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${formId}-quiFixePriorites`} className={labelClass}>
              Qui fixe les priorités ?
            </label>
            <input
              id={`${formId}-quiFixePriorites`}
              className={fieldClass}
              type="text"
              value={data.quiFixePriorites}
              onChange={(event) => update("quiFixePriorites", event.target.value)}
            />
          </div>
        </div>

        <CheckboxGroup
          label="Outils utilisés"
          options={OUTILS_OPTIONS}
          selected={data.outils}
          onToggle={toggleOutil}
        />
        {data.outils.includes("Autre") && (
          <input
            className={fieldClass}
            type="text"
            placeholder="Précisez"
            value={data.outilsAutrePrecision}
            onChange={(event) => update("outilsAutrePrecision", event.target.value)}
          />
        )}

        <div>
          <label htmlFor={`${formId}-ouPertesInformation`} className={labelClass}>
            Où se produisent le plus souvent les pertes d&apos;information ?
          </label>
          <textarea
            id={`${formId}-ouPertesInformation`}
            className={textareaClass}
            value={data.ouPertesInformation}
            onChange={(event) => update("ouPertesInformation", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-parcoursCommande`} className={labelClass}>
            Décrivez le parcours complet d&apos;une commande, depuis la demande du client jusqu&apos;à
            la livraison
          </label>
          <textarea
            id={`${formId}-parcoursCommande`}
            className={`${textareaClass} min-h-[160px]`}
            value={data.parcoursCommande}
            onChange={(event) => update("parcoursCommande", event.target.value)}
          />
        </div>
      </form>
    </QuestionnaireShell>
  );
}
