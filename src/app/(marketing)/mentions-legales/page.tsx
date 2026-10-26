import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { LegalList } from "@/components/legal/legal-list";
import { CompanyBlock } from "@/components/legal/company-block";
import { COMPANY, CONTACT_EMAIL_LEGAL, HOST } from "@/lib/site-config";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Mentions légales",
  description: "Mentions légales de Print Profit System™, édité par Shinkéo SAS.",
  path: "/mentions-legales",
});

const sections: LegalSection[] = [
  {
    heading: "1. Éditeur du site",
    content: (
      <>
        <p>Le présent site est édité par :</p>
        <CompanyBlock />
        <p>Directeur de la publication : {COMPANY.director}</p>
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
        <p>
          Le site présente et commercialise Print Profit System™, un accompagnement destiné
          exclusivement aux professionnels de l&apos;impression numérique, visant à identifier et
          mettre en œuvre des leviers d&apos;amélioration de leur rentabilité.
        </p>
        <p>L&apos;accompagnement est hybride et comprend :</p>
        <LegalList
          items={[
            "des séances en visioconférence",
            "des ressources en ligne (contenus, fiches, ebooks)",
            "l'accès à une application en ligne (calculateur de pertes)",
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
          L&apos;ensemble des contenus présents sur le site et dans l&apos;accompagnement (textes,
          images, vidéos, méthodes, outils, application, logos) est la propriété exclusive de Shinkéo.
        </p>
        <p>
          Toute reproduction, diffusion, modification ou utilisation, même partielle, sans autorisation
          écrite préalable est strictement interdite.
        </p>
      </>
    ),
  },
  {
    heading: "5. Responsabilité",
    content: (
      <>
        <p>
          Shinkéo s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées sur le
          site, sans pouvoir en garantir l&apos;exhaustivité.
        </p>
        <p>
          Shinkéo ne saurait être tenue responsable des dommages indirects résultant de
          l&apos;utilisation du site.
        </p>
      </>
    ),
  },
  {
    heading: "6. Données personnelles",
    content: (
      <>
        <p>
          Les données collectées sont utilisées uniquement pour la gestion de la relation commerciale
          et la communication avec les prospects et clients.
        </p>
        <p>Elles ne sont jamais revendues à des tiers.</p>
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
          d&apos;opposition et de suppression de vos données personnelles.
        </p>
        <p>Pour exercer ce droit, vous pouvez contacter : {CONTACT_EMAIL_LEGAL}</p>
        <p>Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).</p>
      </>
    ),
  },
  {
    heading: "7. Cookies",
    content: (
      <>
        <p>
          Le site peut utiliser des cookies à des fins de fonctionnement, de mesure d&apos;audience ou
          de marketing.
        </p>
        <p>L&apos;utilisateur peut configurer son navigateur pour refuser les cookies.</p>
      </>
    ),
  },
  {
    heading: "8. Droit applicable",
    content: <p>Le présent site est soumis au droit français.</p>,
  },
];

export default function MentionsLegalesPage() {
  return <LegalPage title="Mentions légales" updated="26 octobre 2026" sections={sections} />;
}
