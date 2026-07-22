import type { AutosaveStatus } from "@/lib/audit/use-autosave-section";

interface SaveIndicatorProps {
  status: AutosaveStatus;
  lastSavedAt: Date | null;
}

export function SaveIndicator({ status, lastSavedAt }: SaveIndicatorProps) {
  if (status === "idle" && !lastSavedAt) return null;

  const label =
    status === "saving"
      ? "Enregistrement…"
      : status === "error"
        ? "Erreur de sauvegarde — nouvelle tentative à la prochaine modification"
        : lastSavedAt
          ? `Enregistré à ${lastSavedAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`
          : null;

  if (!label) return null;

  return (
    <p
      role="status"
      aria-live="polite"
      className={`text-xs ${status === "error" ? "text-[#8b2020]" : "text-neutral-500"}`}
    >
      {label}
    </p>
  );
}
