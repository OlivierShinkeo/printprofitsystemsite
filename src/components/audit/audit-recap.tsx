import { AUDIT_SECTIONS } from "@/lib/audit/sections";
import { humanizeKey } from "@/lib/audit/humanize";
import type { MachineData } from "@/lib/audit/schemas/machines";
import type { DifficulteData } from "@/lib/audit/schemas/difficultes";

interface AuditRecapProps {
  answersBySection: Record<string, Record<string, unknown>>;
  machines: MachineData[];
  difficultes: DifficulteData[];
}

function renderValue(value: unknown): string {
  if (value == null || value === "") return "—";
  if (Array.isArray(value)) return value.length ? value.join(", ") : "—";
  if (typeof value === "boolean") return value ? "Oui" : "Non";
  return String(value);
}

const NON_RECAP_SLUGS = new Set(["machines", "difficultes", "validation"]);

/** Read-only display of every answered section — shared by the "Validation finale" step and the post-submission recap page. */
export function AuditRecap({ answersBySection, machines, difficultes }: AuditRecapProps) {
  const jsonSections = AUDIT_SECTIONS.filter((section) => !NON_RECAP_SLUGS.has(section.slug));

  return (
    <div className="flex flex-col gap-10">
      {jsonSections.map((section) => {
        const data = answersBySection[section.slug];
        const entries = data ? Object.entries(data) : [];
        if (entries.length === 0) return null;

        return (
          <div key={section.slug}>
            <h2 className="mb-4 font-display text-lg font-bold text-navy-800">{section.title}</h2>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {entries.map(([key, value]) => (
                <div key={key}>
                  <dt className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
                    {humanizeKey(key)}
                  </dt>
                  <dd className="text-sm text-navy-800">{renderValue(value)}</dd>
                </div>
              ))}
            </dl>
          </div>
        );
      })}

      {machines.length > 0 && (
        <div>
          <h2 className="mb-4 font-display text-lg font-bold text-navy-800">Parc machines</h2>
          <div className="flex flex-col gap-4">
            {machines.map((machine, index) => (
              <div key={index} className="rounded-md border border-neutral-200 p-4 text-sm text-navy-800">
                <p className="mb-2 font-semibold">Machine {index + 1}</p>
                <p>
                  {[machine.type, machine.marque, machine.modele].filter(Boolean).join(" — ") || "—"}
                  {machine.critique && " · critique"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {difficultes.some((difficulte) => difficulte.description) && (
        <div>
          <h2 className="mb-4 font-display text-lg font-bold text-navy-800">Difficultés actuelles</h2>
          <div className="flex flex-col gap-4">
            {difficultes.map(
              (difficulte, index) =>
                difficulte.description && (
                  <div key={index} className="rounded-md border border-neutral-200 p-4 text-sm text-navy-800">
                    <p className="mb-1 font-semibold">Difficulté {index + 1}</p>
                    <p>{difficulte.description}</p>
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
