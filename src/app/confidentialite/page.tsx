import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et de protection des données de Print Profit System™.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "Responsable du traitement",
    body: [
      "[À COMPLÉTER] Raison sociale — Print Profit System™",
      "[À COMPLÉTER] Adresse",
      `Contact : ${CONTACT_EMAIL}`,
    ],
  },
  {
    title: "Données collectées",
    body: [
      "Via le formulaire de contact du site, nous collectons : nom, entreprise, téléphone (facultatif), email et le message que vous nous adressez.",
      "Aucune autre donnée personnelle n'est collectée à votre insu sur ce site.",
    ],
  },
  {
    title: "Finalités du traitement",
    body: [
      "Ces données sont utilisées exclusivement pour répondre à votre demande de contact ou de rappel, et pour assurer le suivi commercial de votre dossier si vous devenez client.",
    ],
  },
  {
    title: "Base légale",
    body: [
      "Le traitement repose sur votre consentement, exprimé par l'envoi volontaire du formulaire de contact (article 6.1.a du RGPD).",
    ],
  },
  {
    title: "Durée de conservation",
    body: [
      "[À COMPLÉTER] Les données issues du formulaire de contact sont conservées pendant [durée à préciser, ex. 3 ans à compter du dernier contact] avant suppression ou anonymisation.",
    ],
  },
  {
    title: "Destinataires des données",
    body: [
      "Vos données sont transmises uniquement à Print Profit System™ (par email) et, le cas échéant, à ses outils internes de gestion de la relation client (CRM/automatisation). Elles ne sont jamais vendues ni cédées à des tiers à des fins commerciales.",
    ],
  },
  {
    title: "Vos droits",
    body: [
      "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition concernant vos données personnelles.",
      <>
        Pour exercer ces droits, contactez-nous à {CONTACT_EMAIL}. Vous disposez également du droit
        d&apos;introduire une réclamation auprès de la{" "}
        <a
          href="https://www.cnil.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold-600 underline underline-offset-2 hover:text-gold-400"
        >
          CNIL
        </a>
        .
      </>,
    ],
  },
  {
    title: "Cookies",
    body: [
      "[À COMPLÉTER] Décrire ici les cookies déposés (mesure d'audience, etc.) si un outil analytique est ajouté au site. En l'état, ce site ne dépose pas de cookie de suivi publicitaire.",
    ],
  },
];

export default function ConfidentialitePage() {
  return (
    <section className="bg-white py-32">
      <div className="cnt-n">
        <h1 className="mb-4 font-display text-[clamp(2rem,3.5vw,2.875rem)] font-bold leading-snug tracking-tight text-navy-800">
          Politique de confidentialité
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
