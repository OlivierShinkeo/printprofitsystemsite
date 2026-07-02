import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_URL, SITE_NAME, ORGANIZATION_JSON_LD } from "@/lib/site-config";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Récupérez durablement la rentabilité de votre imprimerie`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Print Profit System™ accompagne les dirigeants d'imprimeries de 10 à 100 salariés dans l'identification et l'élimination des Pertes Invisibles™ — ces pertes structurelles qui consomment votre rentabilité sans apparaître sur aucun tableau de bord.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Récupérez durablement la rentabilité de votre imprimerie`,
    description:
      "Cabinet de conseil spécialisé dans la rentabilité des imprimeries de 10 à 100 salariés. Méthode terrain, actions concrètes, résultats durables.",
    images: [{ url: "/images/logo-bleu-or.png", width: 595, height: 109, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — Récupérez durablement la rentabilité de votre imprimerie`,
    description:
      "Cabinet de conseil spécialisé dans la rentabilité des imprimeries de 10 à 100 salariés.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${manrope.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-white font-sans text-navy-800 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[2000] focus:rounded-md focus:bg-navy-800 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Aller au contenu principal
        </a>
        <Nav />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <Script
          id="ld-json-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
      </body>
    </html>
  );
}
