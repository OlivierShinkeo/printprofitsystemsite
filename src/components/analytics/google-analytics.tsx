import { Suspense } from "react";
import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";
import { GA_MEASUREMENT_ID } from "@/lib/site-config";
import { GAPageviewTracker } from "./ga-pageview-tracker";

/**
 * Loads GA4 in production only. `useSearchParams` (inside the pageview
 * tracker) requires a Suspense boundary in the App Router.
 */
export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <NextGoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      <Suspense fallback={null}>
        <GAPageviewTracker />
      </Suspense>
    </>
  );
}
