"use client";

import { useState } from "react";
import { useDebouncedAutosave } from "@/lib/audit/use-debounced-autosave";
import { QuestionnaireShell } from "@/components/audit/questionnaire-shell";
import { SelectField } from "@/components/audit/fields/select-field";
import { Button } from "@/components/ui/button";
import {
  MAINTENANCE_OPTIONS,
  createEmptyMachine,
  type MachineData,
} from "@/lib/audit/schemas/machines";

interface MachinesStepProps {
  auditId: string;
  initialMachines: MachineData[];
}

const labelClass = "mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600";
const fieldClass =
  "light-input h-11 w-full rounded-md border border-neutral-300 bg-white px-4 font-sans text-[15px] text-navy-800";

async function saveMachines(auditId: string, machines: MachineData[]) {
  const response = await fetch(`/api/audit/${auditId}/machines`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ machines }),
  });
  if (!response.ok) throw new Error("save failed");
  return response.json();
}

export function MachinesStep({ auditId, initialMachines }: MachinesStepProps) {
  const [machines, setMachines] = useState<MachineData[]>(initialMachines);
  const { status, lastSavedAt } = useDebouncedAutosave(machines, (value) =>
    saveMachines(auditId, value)
  );

  function updateMachine<K extends keyof MachineData>(index: number, key: K, value: MachineData[K]) {
    setMachines((current) =>
      current.map((machine, i) => (i === index ? { ...machine, [key]: value } : machine))
    );
  }

  function addMachine() {
    setMachines((current) => [...current, createEmptyMachine()]);
  }

  function removeMachine(index: number) {
    setMachines((current) => current.filter((_, i) => i !== index));
  }

  return (
    <QuestionnaireShell auditId={auditId} sectionSlug="machines" status={status} lastSavedAt={lastSavedAt}>
      <div className="flex flex-col gap-8">
        {machines.length === 0 && (
          <p className="text-sm text-neutral-500">Aucune machine ajoutée pour le moment.</p>
        )}

        {machines.map((machine, index) => (
          <div key={index} className="rounded-md border border-neutral-200 bg-cream/40 p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-base font-bold text-navy-800">Machine {index + 1}</p>
              <button
                type="button"
                onClick={() => removeMachine(index)}
                className="text-xs font-semibold uppercase tracking-widest text-[#8b2020] hover:underline"
              >
                Supprimer
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <label className={labelClass}>Type</label>
                <input
                  className={fieldClass}
                  type="text"
                  value={machine.type}
                  onChange={(event) => updateMachine(index, "type", event.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Marque</label>
                <input
                  className={fieldClass}
                  type="text"
                  value={machine.marque}
                  onChange={(event) => updateMachine(index, "marque", event.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Modèle</label>
                <input
                  className={fieldClass}
                  type="text"
                  value={machine.modele}
                  onChange={(event) => updateMachine(index, "modele", event.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Année</label>
                <input
                  className={fieldClass}
                  type="number"
                  inputMode="numeric"
                  value={machine.annee}
                  onChange={(event) => updateMachine(index, "annee", event.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Technologie</label>
                <input
                  className={fieldClass}
                  type="text"
                  value={machine.technologie}
                  onChange={(event) => updateMachine(index, "technologie", event.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Format</label>
                <input
                  className={fieldClass}
                  type="text"
                  value={machine.format}
                  onChange={(event) => updateMachine(index, "format", event.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>État général</label>
                <input
                  className={fieldClass}
                  type="text"
                  value={machine.etatGeneral}
                  onChange={(event) => updateMachine(index, "etatGeneral", event.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Fréquence d&apos;utilisation</label>
                <input
                  className={fieldClass}
                  type="text"
                  value={machine.frequenceUtilisation}
                  onChange={(event) => updateMachine(index, "frequenceUtilisation", event.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Volume mensuel estimé</label>
                <input
                  className={fieldClass}
                  type="text"
                  value={machine.volumeMensuel}
                  onChange={(event) => updateMachine(index, "volumeMensuel", event.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Principal usage</label>
                <input
                  className={fieldClass}
                  type="text"
                  value={machine.principalUsage}
                  onChange={(event) => updateMachine(index, "principalUsage", event.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Principale difficulté</label>
                <input
                  className={fieldClass}
                  type="text"
                  value={machine.principaleDifficulte}
                  onChange={(event) => updateMachine(index, "principaleDifficulte", event.target.value)}
                />
              </div>
              <SelectField
                id={`machine-${index}-maintenance`}
                label="Maintenance"
                options={MAINTENANCE_OPTIONS}
                value={machine.maintenance}
                onChange={(value) => updateMachine(index, "maintenance", value)}
              />
              <div className="flex items-end">
                <label className="flex items-center gap-2.5 text-sm text-navy-800">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-gold-500"
                    checked={machine.critique}
                    onChange={(event) => updateMachine(index, "critique", event.target.checked)}
                  />
                  Machine considérée comme critique
                </label>
              </div>
            </div>
          </div>
        ))}

        <div>
          <Button type="button" variant="secondary" size="md" onClick={addMachine}>
            + Ajouter une machine
          </Button>
        </div>
      </div>
    </QuestionnaireShell>
  );
}
