"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuditRecap } from "@/components/audit/audit-recap";
import { Button } from "@/components/ui/button";
import { AUDIT_STATUSES, AUDIT_STATUS_LABELS_FR, type AuditStatus } from "@/lib/audit/status";
import { RECOMMENDATION_OPTIONS, type RecommendationData } from "@/lib/admin/recommendation";
import type { MachineData } from "@/lib/audit/schemas/machines";
import type { DifficulteData } from "@/lib/audit/schemas/difficultes";

interface StatusHistoryEntry {
  id: string;
  from_status: AuditStatus | null;
  to_status: AuditStatus;
  note: string | null;
  changed_at: string;
}

interface AdminNote {
  id: string;
  note: string;
  created_at: string;
}

interface AuditDetailProps {
  auditId: string;
  companyName: string;
  country: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  status: AuditStatus;
  progressPercent: number;
  invitedAt: string;
  submittedAt: string | null;
  answersBySection: Record<string, Record<string, unknown>>;
  machines: MachineData[];
  difficultes: DifficulteData[];
  statusHistory: StatusHistoryEntry[];
  initialNotes: AdminNote[];
  initialRecommendation: RecommendationData;
}

const labelClass = "mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600";
const fieldClass =
  "light-input h-11 w-full rounded-md border border-neutral-300 bg-white px-4 font-sans text-[15px] text-navy-800";
const textareaClass =
  "light-textarea min-h-[90px] w-full resize-y rounded-md border border-neutral-300 bg-white px-4 py-3 font-sans text-[15px] text-navy-800";

function formatDateTime(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" });
}

export function AuditDetail({
  auditId,
  companyName,
  country,
  contactFirstName,
  contactLastName,
  contactEmail,
  status,
  progressPercent,
  invitedAt,
  submittedAt,
  answersBySection,
  machines,
  difficultes,
  statusHistory,
  initialNotes,
  initialRecommendation,
}: AuditDetailProps) {
  const router = useRouter();

  const [selectedStatus, setSelectedStatus] = useState<AuditStatus>(status);
  const [statusNote, setStatusNote] = useState("");
  const [statusSaving, setStatusSaving] = useState(false);
  const [statusError, setStatusError] = useState("");

  const [notes, setNotes] = useState<AdminNote[]>(initialNotes);
  const [newNote, setNewNote] = useState("");
  const [noteSaving, setNoteSaving] = useState(false);

  const [recommendation, setRecommendation] = useState<RecommendationData>(initialRecommendation);
  const [recommendationSaving, setRecommendationSaving] = useState(false);
  const [recommendationSaved, setRecommendationSaved] = useState(false);

  function updateRecommendation<K extends keyof RecommendationData>(key: K, value: RecommendationData[K]) {
    setRecommendationSaved(false);
    setRecommendation((current) => ({ ...current, [key]: value }));
  }

  async function handleStatusUpdate() {
    setStatusSaving(true);
    setStatusError("");
    try {
      const response = await fetch(`/api/admin/audits/${auditId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selectedStatus, note: statusNote }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setStatusError(data?.error ?? "Une erreur est survenue.");
        setStatusSaving(false);
        return;
      }
      setStatusNote("");
      router.refresh();
    } catch {
      setStatusError("Impossible de vous joindre au serveur.");
    } finally {
      setStatusSaving(false);
    }
  }

  async function handleAddNote() {
    if (!newNote.trim()) return;
    setNoteSaving(true);
    try {
      const response = await fetch(`/api/admin/audits/${auditId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: newNote }),
      });
      if (response.ok) {
        const data = await response.json();
        setNotes((current) => [data.note, ...current]);
        setNewNote("");
      }
    } finally {
      setNoteSaving(false);
    }
  }

  async function handleSaveRecommendation() {
    setRecommendationSaving(true);
    try {
      const response = await fetch(`/api/admin/audits/${auditId}/recommendation`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recommendation),
      });
      if (response.ok) setRecommendationSaved(true);
    } finally {
      setRecommendationSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="rounded-md border border-neutral-200 bg-white px-8 py-8">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-gold-600">
          {AUDIT_STATUS_LABELS_FR[status]}
        </p>
        <h1 className="mb-1 font-display text-2xl font-bold text-navy-800">{companyName}</h1>
        <p className="mb-6 text-sm text-neutral-500">
          {contactFirstName} {contactLastName} — {contactEmail} — {country}
        </p>

        <div className="grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Avancement</p>
            <p className="mt-1 font-medium text-navy-800">{progressPercent}%</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Invité le</p>
            <p className="mt-1 font-medium text-navy-800">{formatDateTime(invitedAt)}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Soumis le</p>
            <p className="mt-1 font-medium text-navy-800">{formatDateTime(submittedAt)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-md border border-neutral-200 bg-white px-8 py-8">
        <h2 className="mb-5 font-display text-lg font-bold text-navy-800">Changer le statut</h2>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="status-select" className={labelClass}>
                Nouveau statut
              </label>
              <select
                id="status-select"
                className={fieldClass}
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value as AuditStatus)}
              >
                {AUDIT_STATUSES.map((value) => (
                  <option key={value} value={value}>
                    {AUDIT_STATUS_LABELS_FR[value]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="status-note" className={labelClass}>
                Note (optionnel)
              </label>
              <input
                id="status-note"
                className={fieldClass}
                type="text"
                value={statusNote}
                onChange={(event) => setStatusNote(event.target.value)}
              />
            </div>
          </div>
          {statusError && <p className="text-sm text-[#8b2020]">{statusError}</p>}
          <div>
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleStatusUpdate}
              disabled={statusSaving || selectedStatus === status}
            >
              {statusSaving ? "Mise à jour…" : "Mettre à jour le statut"}
            </Button>
          </div>
        </div>

        {statusHistory.length > 0 && (
          <div className="mt-8 border-t border-neutral-100 pt-6">
            <p className={labelClass}>Historique</p>
            <ul className="flex flex-col gap-2 text-sm text-neutral-700">
              {statusHistory.map((entry) => (
                <li key={entry.id}>
                  {formatDateTime(entry.changed_at)} — {entry.from_status ? AUDIT_STATUS_LABELS_FR[entry.from_status] : "—"}{" "}
                  → {AUDIT_STATUS_LABELS_FR[entry.to_status]}
                  {entry.note && <span className="text-neutral-500"> ({entry.note})</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="rounded-md border border-neutral-200 bg-white px-8 py-8">
        <h2 className="mb-5 font-display text-lg font-bold text-navy-800">Analyse interne</h2>
        <p className="mb-6 text-xs text-neutral-500">
          Ces informations ne sont jamais visibles par le prospect.
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Niveau de maturité</label>
            <input
              className={fieldClass}
              type="text"
              value={recommendation.maturityLevel}
              onChange={(event) => updateRecommendation("maturityLevel", event.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Niveau d&apos;organisation</label>
            <input
              className={fieldClass}
              type="text"
              value={recommendation.organizationLevel}
              onChange={(event) => updateRecommendation("organizationLevel", event.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Potentiel de progression</label>
            <input
              className={fieldClass}
              type="text"
              value={recommendation.growthPotential}
              onChange={(event) => updateRecommendation("growthPotential", event.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Compatibilité avec Print Profit System™</label>
            <input
              className={fieldClass}
              type="text"
              value={recommendation.compatibility}
              onChange={(event) => updateRecommendation("compatibility", event.target.value)}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-5">
          <div>
            <label className={labelClass}>Principaux besoins</label>
            <textarea
              className={textareaClass}
              value={recommendation.mainNeeds}
              onChange={(event) => updateRecommendation("mainNeeds", event.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Risques</label>
            <textarea
              className={textareaClass}
              value={recommendation.risks}
              onChange={(event) => updateRecommendation("risks", event.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Recommandation</label>
            <select
              className={fieldClass}
              value={recommendation.recommendation}
              onChange={(event) => updateRecommendation("recommendation", event.target.value)}
            >
              <option value="">—</option>
              {RECOMMENDATION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Commentaire libre</label>
            <textarea
              className={textareaClass}
              value={recommendation.comment}
              onChange={(event) => updateRecommendation("comment", event.target.value)}
            />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <Button type="button" variant="primary" size="md" onClick={handleSaveRecommendation} disabled={recommendationSaving}>
            {recommendationSaving ? "Enregistrement…" : "Enregistrer l'analyse"}
          </Button>
          {recommendationSaved && <p className="text-sm text-neutral-500">Enregistré.</p>}
        </div>
      </div>

      <div className="rounded-md border border-neutral-200 bg-white px-8 py-8">
        <h2 className="mb-5 font-display text-lg font-bold text-navy-800">Notes internes</h2>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <input
            className={`${fieldClass} flex-1`}
            type="text"
            placeholder="Ajouter une note…"
            value={newNote}
            onChange={(event) => setNewNote(event.target.value)}
          />
          <Button type="button" variant="secondary" size="md" onClick={handleAddNote} disabled={noteSaving}>
            Ajouter
          </Button>
        </div>
        {notes.length === 0 ? (
          <p className="text-sm text-neutral-500">Aucune note pour le moment.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {notes.map((note) => (
              <li key={note.id} className="rounded-md border border-neutral-100 px-4 py-3 text-sm text-navy-800">
                <p>{note.note}</p>
                <p className="mt-1 text-xs text-neutral-500">{formatDateTime(note.created_at)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-md border border-neutral-200 bg-white px-8 py-8">
        <h2 className="mb-5 font-display text-lg font-bold text-navy-800">Réponses de l&apos;audit</h2>
        <AuditRecap answersBySection={answersBySection} machines={machines} difficultes={difficultes} />
      </div>
    </div>
  );
}
