"use client";

import { useEffect, useRef, useState } from "react";

export type AutosaveStatus = "idle" | "saving" | "saved" | "error";

interface AutosaveResult {
  status: AutosaveStatus;
  lastSavedAt: Date | null;
}

/**
 * Debounces (1.5s) writes of `data` to `PATCH /api/audit/[auditId]/answers`
 * for the given section. Skips the very first run (mount, with the data
 * just loaded from the server) so opening a step never re-saves it
 * unchanged. Server is always the source of truth for `last_saved_at` —
 * never relies on localStorage.
 */
export function useAutosaveSection<T>(
  auditId: string,
  sectionSlug: string,
  data: T,
  delayMs = 1500
): AutosaveResult {
  const [status, setStatus] = useState<AutosaveStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    setStatus("saving");
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(`/api/audit/${auditId}/answers`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ section: sectionSlug, data }),
        });
        if (!response.ok) throw new Error("save failed");
        const result: { lastSavedAt: string } = await response.json();
        setStatus("saved");
        setLastSavedAt(new Date(result.lastSavedAt));
      } catch {
        setStatus("error");
      }
    }, delayMs);

    return () => clearTimeout(timeoutId);
  }, [auditId, sectionSlug, data, delayMs]);

  return { status, lastSavedAt };
}
