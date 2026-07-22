"use client";

import { useState } from "react";
import { useDebouncedAutosave } from "@/lib/audit/use-debounced-autosave";
import { QuestionnaireShell } from "@/components/audit/questionnaire-shell";
import type { DifficulteData } from "@/lib/audit/schemas/difficultes";

interface DifficultesStepProps {
  auditId: string;
  initialDifficultes: DifficulteData[];
}

const labelClass = "mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600";
const fieldClass =
  "light-input h-11 w-full rounded-md border border-neutral-300 bg-white px-4 font-sans text-[15px] text-navy-800";
const textareaClass =
  "light-textarea min-h-[80px] w-full resize-y rounded-md border border-neutral-300 bg-white px-4 py-3 font-sans text-[15px] text-navy-800";

async function saveDifficultes(auditId: string, difficulties: DifficulteData[]) {
  const response = await fetch(`/api/audit/${auditId}/difficulties`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ difficulties }),
  });
  if (!response.ok) throw new Error("save failed");
  return response.json();
}

export function DifficultesStep({ auditId, initialDifficultes }: DifficultesStepProps) {
  const [difficultes, setDifficultes] = useState<DifficulteData[]>(initialDifficultes);
  const { status, lastSavedAt } = useDebouncedAutosave(difficultes, (value) =>
    saveDifficultes(auditId, value)
  );

  function update<K extends keyof DifficulteData>(index: number, key: K, value: DifficulteData[K]) {
    setDifficultes((current) =>
      current.map((difficulte, i) => (i === index ? { ...difficulte, [key]: value } : difficulte))
    );
  }

  return (
    <QuestionnaireShell auditId={auditId} sectionSlug="difficultes" status={status} lastSavedAt={lastSavedAt}>
      <div className="flex flex-col gap-8">
        <p className="text-sm leading-relaxed text-neutral-600">
          Décrivez vos cinq principales difficultés actuelles, de la plus importante à la moins
          importante.
        </p>

        {difficultes.map((difficulte, index) => (
          <div key={index} className="rounded-md border border-neutral-200 bg-cream/40 p-6">
            <p className="mb-4 font-display text-base font-bold text-navy-800">
              Difficulté {index + 1}
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  className={textareaClass}
                  value={difficulte.description}
                  onChange={(event) => update(index, "description", event.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Fréquence</label>
                  <input
                    className={fieldClass}
                    type="text"
                    value={difficulte.frequence}
                    onChange={(event) => update(index, "frequence", event.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Ancienneté</label>
                  <input
                    className={fieldClass}
                    type="text"
                    value={difficulte.anciennete}
                    onChange={(event) => update(index, "anciennete", event.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Urgence à résoudre</label>
                  <input
                    className={fieldClass}
                    type="text"
                    value={difficulte.urgence}
                    onChange={(event) => update(index, "urgence", event.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Impact opérationnel</label>
                  <input
                    className={fieldClass}
                    type="text"
                    value={difficulte.impactOperationnel}
                    onChange={(event) => update(index, "impactOperationnel", event.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Impact financier estimé</label>
                  <input
                    className={fieldClass}
                    type="text"
                    value={difficulte.impactFinancier}
                    onChange={(event) => update(index, "impactFinancier", event.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Impact client</label>
                  <input
                    className={fieldClass}
                    type="text"
                    value={difficulte.impactClient}
                    onChange={(event) => update(index, "impactClient", event.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Actions déjà tentées</label>
                <textarea
                  className={textareaClass}
                  value={difficulte.actionsTentees}
                  onChange={(event) => update(index, "actionsTentees", event.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Résultat obtenu</label>
                <textarea
                  className={textareaClass}
                  value={difficulte.resultat}
                  onChange={(event) => update(index, "resultat", event.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </QuestionnaireShell>
  );
}
