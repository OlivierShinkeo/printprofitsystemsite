"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";

/**
 * Sends a GA4 page_view on every client-side navigation.
 *
 * `<GoogleAnalytics>` only configures GA once on initial load — App Router
 * navigations via next/link don't reload the page, so without this they'd
 * never register as a pageview.
 */
export function GAPageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    sendGAEvent("event", "page_view", {
      page_path: query ? `${pathname}?${query}` : pathname,
    });
  }, [pathname, searchParams]);

  return null;
}
