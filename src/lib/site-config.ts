export const SITE_NAME = "Print Profit System™";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://printprofitsystem.fr";

export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/printprofitsystem/appel-de-decouverte-print-profit-system";

/** Marketing/support inbox, used throughout the site's CTAs and footer. */
export const CONTACT_EMAIL = "contact@printprofitsystem.fr";

/** Official contact address for legal/RGPD matters (mentions légales, confidentialité, CGV). */
export const CONTACT_EMAIL_LEGAL = "contact@shinkeo.com";

/** The legal entity operating Print Profit System™ — used on the legal pages. */
export const COMPANY = {
  name: "Shinkéo SAS",
  address: "13 impasse Nicolas Poussin - 79000 Niort",
  siret: "10293539200013",
} as const;

export const HOST = {
  name: "Systeme.io",
  legalName: "ITACWT Limited",
  address: "6 Fern Road, Sandyford Business Park, Dublin 18, Irlande",
} as const;

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  legalName: COMPANY.name,
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
