"use client";

import { useDebouncedAutosave, type AutosaveStatus } from "@/lib/audit/use-debounced-autosave";

export type { AutosaveStatus };

/** Autosaves a single JSONB section's data via PATCH /api/audit/[auditId]/answers. */
export function useAutosaveSection<T>(
  auditId: string,
  sectionSlug: string,
  data: T,
  delayMs = 1500
) {
  return useDebouncedAutosave(
    data,
    async (value) => {
      const response = await fetch(`/api/audit/${auditId}/answers`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: sectionSlug, data: value }),
      });
      if (!response.ok) throw new Error("save failed");
      return response.json();
    },
    delayMs
  );
}
