import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { LegalList } from "@/components/legal/legal-list";
import { CompanyBlock } from "@/components/legal/company-block";
import { CONTACT_EMAIL_LEGAL, HOST } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Print Profit System™, édité par Shinkéo SAS.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

const sections: LegalSection[] = [
  {
    heading: "1. Éditeur du site",
    content: (
      <>
        <p>Le présent site est édité par :</p>
        <CompanyBlock />
      </>
    ),
  },
  {
    heading: "2. Hébergement",
    content: (
      <>
        <p>Le site est hébergé par :</p>
        <p>
          {HOST.name}
          <br />
          {HOST.legalName}
          <br />
          {HOST.address}
        </p>
      </>
    ),
  },
  {
    heading: "3. Activité",
    content: (
      <>
        <p>Le site propose :</p>
        <LegalList
          items={[
            "la vente de produits numériques (ebooks, fiches, ressources)",
            "l'accès à une application en ligne (calculateur de pertes)",
            "des services liés à l'optimisation des performances en impression numérique",
          ]}
        />
      </>
    ),
  },
  {
    heading: "4. Propriété intellectuelle",
    content: (
      <>
        <p>
          L&apos;ensemble des contenus présents sur le site (textes, images, graphismes, logos, vidéos,
          outils, application) est la propriété exclusive de Shinkéo.
        </p>
        <p>
          Toute reproduction, diffusion, modification ou utilisation, même partielle, sans autorisation
          préalable est strictement interdite.
        </p>
      </>
    ),
  },
  {
    heading: "5. Responsabilité",
    content: (
      <>
        <p>L&apos;éditeur ne saurait être tenu responsable :</p>
        <LegalList
          items={[
            "des erreurs ou omissions dans les informations diffusées",
            "d'une mauvaise utilisation des produits ou services",
            "des dommages indirects résultant de l'utilisation du site",
          ]}
        />
        <p>L&apos;utilisateur est seul responsable de l&apos;utilisation qu&apos;il fait des informations et services proposés.</p>
      </>
    ),
  },
  {
    heading: "6. Données personnelles",
    content: (
      <>
        <p>
          Les informations collectées sur le site sont utilisées dans le cadre de la relation
          commerciale avec les utilisateurs.
        </p>
        <p>Elles ne sont jamais revendues à des tiers.</p>
        <p>
          Conformément à la réglementation en vigueur (RGPD), vous disposez d&apos;un droit d&apos;accès,
          de modification et de suppression de vos données personnelles.
        </p>
        <p>Pour exercer ce droit, vous pouvez contacter : {CONTACT_EMAIL_LEGAL}</p>
      </>
    ),
  },
  {
    heading: "7. Cookies",
    content: (
      <>
        <p>Le site peut utiliser des cookies à des fins de fonctionnement, d&apos;analyse ou de marketing.</p>
        <p>L&apos;utilisateur peut configurer son navigateur pour refuser les cookies.</p>
      </>
    ),
  },
  {
    heading: "8. Droit applicable",
    content: (
      <>
        <p>Le présent site est soumis au droit français.</p>
        <p>
          En cas de litige, les tribunaux compétents seront ceux du ressort du siège social de
          l&apos;éditeur.
        </p>
      </>
    ),
  },
];

export default function MentionsLegalesPage() {
  return <LegalPage title="Mentions légales" updated="2 juillet 2026" sections={sections} />;
}
