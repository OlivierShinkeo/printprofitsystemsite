import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site-config";

interface PageMetadataInput {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/mentions-legales". */
  path: string;
}

/**
 * Per-page metadata (canonical + OpenGraph) for routes that aren't the
 * homepage. Without this, Next.js silently inherits the root layout's
 * OpenGraph block (title/description/url) unchanged on every subpage —
 * so a shared link to /mentions-legales would preview as the homepage.
 */
export function buildMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url: path,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${title} — ${SITE_NAME}`,
      description,
    },
  };
}
