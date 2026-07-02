export const SITE_NAME = "Print Profit System™";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://printprofitsystem.fr";

/** Placeholder until the real scheduling link is provided — update via env var. */
export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/printprofitsystem/30min";

export const CONTACT_EMAIL = "contact@printprofitsystem.fr";

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-bleu-or.png`,
  image: `${SITE_URL}/images/portrait-bureau.png`,
  description:
    "Print Profit System™ accompagne les dirigeants d'imprimeries de 10 à 100 salariés dans l'identification et l'élimination des Pertes Invisibles™.",
  founder: {
    "@type": "Person",
    name: "Olivier Puyravaud",
  },
  areaServed: "FR",
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Dirigeants d'imprimeries",
  },
  email: CONTACT_EMAIL,
} as const;
