"use client";

import { useEffect, useRef, useState } from "react";

export type AutosaveStatus = "idle" | "saving" | "saved" | "error";

interface AutosaveResult {
  status: AutosaveStatus;
  lastSavedAt: Date | null;
}

/**
 * Debounces (1.5s) calls to `save(data)`. Skips the very first run (mount,
 * with data just loaded from the server) so opening a step never re-saves
 * it unchanged. Server response's `lastSavedAt` is always the source of
 * truth — never relies on localStorage.
 */
export function useDebouncedAutosave<T>(
  data: T,
  save: (data: T) => Promise<{ lastSavedAt: string }>,
  delayMs = 1500
): AutosaveResult {
  const [status, setStatus] = useState<AutosaveStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const isFirstRun = useRef(true);
  const saveRef = useRef(save);
  saveRef.current = save;

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    setStatus("saving");
    const timeoutId = setTimeout(async () => {
      try {
        const result = await saveRef.current(data);
        setStatus("saved");
        setLastSavedAt(new Date(result.lastSavedAt));
      } catch {
        setStatus("error");
      }
    }, delayMs);

    return () => clearTimeout(timeoutId);
  }, [data, delayMs]);

  return { status, lastSavedAt };
}
