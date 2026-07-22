"use client";

import { useId, useState } from "react";
import { useAutosaveSection } from "@/lib/audit/use-autosave-section";
import { QuestionnaireShell } from "@/components/audit/questionnaire-shell";
import { OuiNonSelect } from "@/components/audit/fields/oui-non-select";
import { ACCOMPAGNEMENT_EMPTY, type AccompagnementData } from "@/lib/audit/schemas/accompagnement";

interface AccompagnementStepProps {
  auditId: string;
  initialData: Partial<AccompagnementData>;
}

const labelClass = "mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600";
const fieldClass =
  "light-input h-11 w-full rounded-md border border-neutral-300 bg-white px-4 font-sans text-[15px] text-navy-800";
const textareaClass =
  "light-textarea min-h-[100px] w-full resize-y rounded-md border border-neutral-300 bg-white px-4 py-3 font-sans text-[15px] text-navy-800";

export function AccompagnementStep({ auditId, initialData }: AccompagnementStepProps) {
  const formId = useId();
  const [data, setData] = useState<AccompagnementData>({ ...ACCOMPAGNEMENT_EMPTY, ...initialData });
  const { status, lastSavedAt } = useAutosaveSection(auditId, "accompagnement", data);

  function update<K extends keyof AccompagnementData>(key: K, value: AccompagnementData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  return (
    <QuestionnaireShell
      auditId={auditId}
      sectionSlug="accompagnement"
      status={status}
      lastSavedAt={lastSavedAt}
    >
      <form className="flex flex-col gap-6" onSubmit={(event) => event.preventDefault()}>
        <div>
          <label htmlFor={`${formId}-pourquoiAccompagne`} className={labelClass}>
            Pourquoi souhaitez-vous être accompagné ?
          </label>
          <textarea
            id={`${formId}-pourquoiAccompagne`}
            className={textareaClass}
            value={data.pourquoiAccompagne}
            onChange={(event) => update("pourquoiAccompagne", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-pourquoiMaintenant`} className={labelClass}>
            Pourquoi maintenant ?
          </label>
          <textarea
            id={`${formId}-pourquoiMaintenant`}
            className={textareaClass}
            value={data.pourquoiMaintenant}
            onChange={(event) => update("pourquoiMaintenant", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-attentesConcretes`} className={labelClass}>
            Qu&apos;attendez-vous concrètement d&apos;un accompagnement ?
          </label>
          <textarea
            id={`${formId}-attentesConcretes`}
            className={textareaClass}
            value={data.attentesConcretes}
            onChange={(event) => update("attentesConcretes", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-contraintes`} className={labelClass}>
            Quelles contraintes pourraient freiner le projet ?
          </label>
          <textarea
            id={`${formId}-contraintes`}
            className={textareaClass}
            value={data.contraintes}
            onChange={(event) => update("contraintes", event.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-quiDecidera`} className={labelClass}>
              Qui prendra les décisions ?
            </label>
            <input
              id={`${formId}-quiDecidera`}
              className={fieldClass}
              type="text"
              value={data.quiDecidera}
              onChange={(event) => update("quiDecidera", event.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${formId}-quiParticipera`} className={labelClass}>
              Qui participera aux séances ?
            </label>
            <input
              id={`${formId}-quiParticipera`}
              className={fieldClass}
              type="text"
              value={data.quiParticipera}
              onChange={(event) => update("quiParticipera", event.target.value)}
            />
          </div>
          <OuiNonSelect
            id={`${formId}-pretPartagerDonnees`}
            label="Prêt à partager vos données de pilotage ?"
            value={data.pretPartagerDonnees}
            onChange={(value) => update("pretPartagerDonnees", value)}
          />
          <OuiNonSelect
            id={`${formId}-pretModifierHabitudes`}
            label="Prêt à modifier certaines habitudes ?"
            value={data.pretModifierHabitudes}
            onChange={(value) => update("pretModifierHabitudes", value)}
          />
          <div>
            <label htmlFor={`${formId}-implicationHebdomadaire`} className={labelClass}>
              Niveau d&apos;implication par semaine
            </label>
            <input
              id={`${formId}-implicationHebdomadaire`}
              className={fieldClass}
              type="text"
              placeholder="ex. 2 heures / semaine"
              value={data.implicationHebdomadaire}
              onChange={(event) => update("implicationHebdomadaire", event.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${formId}-experienceConsultantAnterieure`} className={labelClass}>
            Avez-vous déjà travaillé avec un consultant ou un formateur ?
          </label>
          <textarea
            id={`${formId}-experienceConsultantAnterieure`}
            className={textareaClass}
            value={data.experienceConsultantAnterieure}
            onChange={(event) => update("experienceConsultantAnterieure", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-resultatJustifiantInvestissement`} className={labelClass}>
            Quel résultat justifierait l&apos;investissement dans un accompagnement ?
          </label>
          <textarea
            id={`${formId}-resultatJustifiantInvestissement`}
            className={textareaClass}
            value={data.resultatJustifiantInvestissement}
            onChange={(event) => update("resultatJustifiantInvestissement", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-pourquoiPpsAdapte`} className={labelClass}>
            Pourquoi pensez-vous que Print Profit System™ pourrait être adapté à votre entreprise ?
          </label>
          <textarea
            id={`${formId}-pourquoiPpsAdapte`}
            className={textareaClass}
            value={data.pourquoiPpsAdapte}
            onChange={(event) => update("pourquoiPpsAdapte", event.target.value)}
          />
        </div>
      </form>
    </QuestionnaireShell>
  );
}
