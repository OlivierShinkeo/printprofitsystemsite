"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionnaireShell } from "@/components/audit/questionnaire-shell";
import { AuditRecap } from "@/components/audit/audit-recap";
import { Button } from "@/components/ui/button";
import type { MachineData } from "@/lib/audit/schemas/machines";
import type { DifficulteData } from "@/lib/audit/schemas/difficultes";

interface ValidationStepProps {
  auditId: string;
  answersBySection: Record<string, Record<string, unknown>>;
  machines: MachineData[];
  difficultes: DifficulteData[];
}

export function ValidationStep({
  auditId,
  answersBySection,
  machines,
  difficultes,
}: ValidationStepProps) {
  const router = useRouter();
  const [certifie, setCertifie] = useState(false);
  const [accepte, setAccepte] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleConfirmSubmit() {
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch(`/api/audit/${auditId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ certifie, accepte }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.error ?? "Une erreur est survenue. Merci de réessayer.");
        setSubmitting(false);
        setShowConfirm(false);
        return;
      }

      router.push(`/audit/${auditId}`);
      router.refresh();
    } catch {
      setError("Impossible de vous joindre au serveur. Vérifiez votre connexion et réessayez.");
      setSubmitting(false);
      setShowConfirm(false);
    }
  }

  const canSubmit = certifie && accepte;

  return (
    <QuestionnaireShell auditId={auditId} sectionSlug="validation" status="idle" lastSavedAt={null}>
      <div className="flex flex-col gap-8">
        <AuditRecap answersBySection={answersBySection} machines={machines} difficultes={difficultes} />

        <div className="flex flex-col gap-4 border-t border-neutral-200 pt-8">
          <label className="flex items-start gap-3 text-sm leading-relaxed text-navy-800">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 flex-shrink-0 accent-gold-500"
              checked={certifie}
              onChange={(event) => setCertifie(event.target.checked)}
            />
            Je certifie que les informations communiquées sont sincères et reflètent au mieux la
            situation actuelle de mon entreprise.
          </label>
          <label className="flex items-start gap-3 text-sm leading-relaxed text-navy-800">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 flex-shrink-0 accent-gold-500"
              checked={accepte}
              onChange={(event) => setAccepte(event.target.checked)}
            />
            J&apos;accepte que ces informations soient utilisées exclusivement dans le cadre de
            l&apos;étude de faisabilité d&apos;un accompagnement Print Profit System™.
          </label>

          {error && <p className="text-sm text-[#8b2020]">{error}</p>}

          <div>
            <Button
              type="button"
              variant="primary"
              size="lg"
              disabled={!canSubmit}
              onClick={() => setShowConfirm(true)}
            >
              Soumettre définitivement mon audit
            </Button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-navy-900/60 px-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-submit-title"
        >
          <div className="w-full max-w-md rounded-md bg-white p-8">
            <h2 id="confirm-submit-title" className="mb-3 font-display text-xl font-bold text-navy-800">
              Confirmer la soumission
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-neutral-700">
              Une fois soumis, vous ne pourrez plus modifier vos réponses. Confirmez-vous l&apos;envoi
              définitif de votre audit&nbsp;?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setShowConfirm(false)}
                disabled={submitting}
              >
                Annuler
              </Button>
              <Button type="button" variant="primary" size="md" onClick={handleConfirmSubmit} disabled={submitting}>
                {submitting ? "Envoi…" : "Confirmer"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </QuestionnaireShell>
  );
}
