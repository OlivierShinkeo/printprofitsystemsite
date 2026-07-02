import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { LegalList } from "@/components/legal/legal-list";
import { CompanyBlock } from "@/components/legal/company-block";
import { CONTACT_EMAIL_LEGAL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et de protection des données de Print Profit System™.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: true, follow: true },
};

const sections: LegalSection[] = [
  {
    heading: "1. Introduction",
    content: (
      <p>
        La présente politique de confidentialité a pour objectif d&apos;informer les utilisateurs du
        site et des services proposés par Shinkéo sur la collecte, l&apos;utilisation et la protection
        de leurs données personnelles.
      </p>
    ),
  },
  {
    heading: "2. Responsable du traitement",
    content: (
      <>
        <p>Le responsable du traitement des données est :</p>
        <CompanyBlock />
      </>
    ),
  },
  {
    heading: "3. Données collectées",
    content: (
      <>
        <p>Nous pouvons collecter les données suivantes :</p>
        <LegalList
          items={[
            "Nom et prénom",
            "Adresse email",
            "Informations de paiement (via des prestataires sécurisés)",
            "Données de connexion à l'application",
            "Données d'utilisation du service",
          ]}
        />
      </>
    ),
  },
  {
    heading: "4. Finalité de la collecte",
    content: (
      <>
        <p>Les données collectées sont utilisées pour :</p>
        <LegalList
          items={[
            "Fournir l'accès aux produits et services",
            "Gérer les commandes et abonnements",
            "Assurer le support client",
            "Envoyer des communications (emails, newsletters)",
            "Améliorer les services proposés",
          ]}
        />
      </>
    ),
  },
  {
    heading: "5. Base légale",
    content: (
      <>
        <p>Le traitement des données repose sur :</p>
        <LegalList
          items={[
            "l'exécution du contrat (achat, abonnement)",
            "le consentement (newsletter, cookies)",
            "l'intérêt légitime (amélioration des services)",
          ]}
        />
      </>
    ),
  },
  {
    heading: "6. Hébergement et sous-traitants",
    content: (
      <>
        <p>Les données peuvent être traitées par les services suivants :</p>
        <LegalList
          items={[
            "Systeme.io (hébergement, tunnel de vente)",
            "Stripe (paiement sécurisé)",
            "Make (automatisation)",
            "Zite / Fillout (application et base de données)",
          ]}
        />
        <p>Ces prestataires respectent les normes de sécurité en vigueur.</p>
      </>
    ),
  },
  {
    heading: "7. Conservation des données",
    content: (
      <p>
        Les données sont conservées pendant la durée nécessaire à la relation commerciale et
        conformément aux obligations légales.
      </p>
    ),
  },
  {
    heading: "8. Sécurité",
    content: (
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles afin de protéger les
        données contre tout accès non autorisé, perte ou divulgation.
      </p>
    ),
  },
  {
    heading: "9. Droits des utilisateurs",
    content: (
      <>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <LegalList
          items={[
            "Droit d'accès",
            "Droit de rectification",
            "Droit de suppression",
            "Droit d'opposition",
            "Droit à la limitation du traitement",
          ]}
        />
        <p>Pour exercer vos droits, contactez : {CONTACT_EMAIL_LEGAL}</p>
      </>
    ),
  },
  {
    heading: "10. Cookies",
    content: (
      <>
        <p>Le site peut utiliser des cookies afin de :</p>
        <LegalList
          items={[
            "assurer le bon fonctionnement du site",
            "analyser l'audience",
            "améliorer l'expérience utilisateur",
          ]}
        />
        <p>Vous pouvez configurer votre navigateur pour refuser les cookies.</p>
      </>
    ),
  },
  {
    heading: "11. Modification de la politique",
    content: (
      <p>La présente politique peut être modifiée à tout moment afin de rester conforme à la réglementation.</p>
    ),
  },
  {
    heading: "12. Droit applicable",
    content: <p>La présente politique est soumise au droit français.</p>,
  },
];

export default function ConfidentialitePage() {
  return <LegalPage title="Politique de confidentialité" updated="2 juillet 2026" sections={sections} />;
}
