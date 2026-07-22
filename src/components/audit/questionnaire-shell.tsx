import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/audit/progress-bar";
import { SaveIndicator } from "@/components/audit/save-indicator";
import { AUDIT_SECTIONS } from "@/lib/audit/sections";
import type { AutosaveStatus } from "@/lib/audit/use-autosave-section";

interface QuestionnaireShellProps {
  auditId: string;
  sectionSlug: string;
  status: AutosaveStatus;
  lastSavedAt: Date | null;
  children: React.ReactNode;
}

/** Shared chrome (title, progress, prev/next, save indicator) around every step's own field markup. */
export function QuestionnaireShell({
  auditId,
  sectionSlug,
  status,
  lastSavedAt,
  children,
}: QuestionnaireShellProps) {
  const index = AUDIT_SECTIONS.findIndex((section) => section.slug === sectionSlug);
  const section = AUDIT_SECTIONS[index];
  const prev = index > 0 ? AUDIT_SECTIONS[index - 1] : null;
  const next = index < AUDIT_SECTIONS.length - 1 ? AUDIT_SECTIONS[index + 1] : null;
  const progressPercent = Math.round(((index + 1) / AUDIT_SECTIONS.length) * 100);

  return (
    <section className="cnt-n py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-gold-600">
            Étape {index + 1} sur {AUDIT_SECTIONS.length}
          </p>
          <h1 className="mb-4 font-display text-2xl font-bold text-navy-800">{section.title}</h1>
          <ProgressBar percent={progressPercent} />
        </div>

        <div className="rounded-md border border-neutral-200 bg-white px-8 py-10">{children}</div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-3">
            {prev ? (
              <Button
                href={`/audit/${auditId}/questionnaire?step=${prev.slug}`}
                variant="secondary"
                size="md"
              >
                Précédent
              </Button>
            ) : (
              <Button href={`/audit/${auditId}`} variant="secondary" size="md">
                Retour au tableau de bord
              </Button>
            )}
            {next && (
              <Button
                href={`/audit/${auditId}/questionnaire?step=${next.slug}`}
                variant="primary"
                size="md"
              >
                Suivant
              </Button>
            )}
          </div>
          <SaveIndicator status={status} lastSavedAt={lastSavedAt} />
        </div>
      </div>
    </section>
  );
}
