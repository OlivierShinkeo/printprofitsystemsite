import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Print Profit System™.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "Éditeur du site",
    body: [
      "[À COMPLÉTER] Raison sociale — Print Profit System™",
      "[À COMPLÉTER] Forme juridique (SASU, EI, EURL…)",
      "[À COMPLÉTER] Adresse du siège social",
      "[À COMPLÉTER] SIRET",
      "[À COMPLÉTER] Numéro de TVA intracommunautaire",
      "[À COMPLÉTER] Capital social (si applicable)",
    ],
  },
  {
    title: "Directeur de la publication",
    body: ["[À COMPLÉTER] Nom du responsable de publication — Olivier Puyravaud"],
  },
  {
    title: "Hébergement",
    body: [
      "[À COMPLÉTER] Nom de l'hébergeur (ex. Vercel Inc.)",
      "[À COMPLÉTER] Adresse de l'hébergeur",
    ],
  },
  {
    title: "Propriété intellectuelle",
    body: [
      "L'ensemble des contenus présents sur ce site (textes, marques, logos, illustrations) est la propriété exclusive de Print Profit System™, sauf mention contraire. Toute reproduction, représentation ou diffusion, en tout ou partie, sans autorisation préalable, est interdite.",
      "« Print Profit System™ », « Pertes Invisibles™ », « Journées d'Immersion Terrain™ » et « Print Profit Accelerator™ » sont des marques utilisées par Print Profit System™.",
    ],
  },
  {
    title: "Contact",
    body: [`Pour toute question relative aux présentes mentions légales : ${CONTACT_EMAIL}`],
  },
];

export default function MentionsLegalesPage() {
  return (
    <section className="bg-white py-32">
      <div className="cnt-n">
        <h1 className="mb-4 font-display text-[clamp(2rem,3.5vw,2.875rem)] font-bold leading-snug tracking-tight text-navy-800">
          Mentions légales
        </h1>
        <p className="mb-14 text-sm text-neutral-400">
          Dernière mise à jour&nbsp;: [À COMPLÉTER — date de publication]
        </p>

        <div className="flex flex-col gap-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-4 font-display text-xl font-bold text-navy-800">{section.title}</h2>
              <div className="flex flex-col gap-2.5">
                {section.body.map((line, index) => (
                  <p key={index} className="text-md leading-loose text-neutral-700">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
