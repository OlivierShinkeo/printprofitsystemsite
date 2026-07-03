import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { LegalList } from "@/components/legal/legal-list";
import { CompanyBlock } from "@/components/legal/company-block";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Conditions générales de vente",
  description: "Conditions générales de vente de Print Profit System™, édité par Shinkéo SAS.",
  path: "/conditions-generales-de-vente",
});

const sections: LegalSection[] = [
  {
    heading: "1. Identification du vendeur",
    content: <CompanyBlock />,
  },
  {
    heading: "2. Objet",
    content: (
      <>
        <p>
          Les présentes Conditions Générales de Vente régissent la vente de produits et services
          proposés par Shinkéo, incluant notamment :
        </p>
        <LegalList
          items={[
            "des produits numériques téléchargeables (ebooks, fiches mémo, ressources)",
            "des applications en ligne accessibles par abonnement (calculateur de pertes)",
            "des prestations associées",
          ]}
        />
      </>
    ),
  },
  {
    heading: "3. Description des produits et services",
    content: (
      <>
        <p>
          <strong className="font-semibold text-navy-800">3.1 Produits numériques</strong>
          <br />
          Les ebooks, fiches et ressources sont fournis sous format numérique. Ils sont accessibles
          immédiatement après paiement.
        </p>
        <p>
          <strong className="font-semibold text-navy-800">3.2 Application en ligne (SaaS)</strong>
          <br />
          Le calculateur de pertes est une application accessible en ligne. L&apos;accès est
          conditionné à un abonnement actif.
        </p>
      </>
    ),
  },
  {
    heading: "4. Accès aux produits",
    content: (
      <LegalList
        items={[
          "Les produits numériques sont accessibles immédiatement après paiement.",
          "L'accès au service SaaS est activé après validation du paiement et reste actif tant que l'abonnement est en cours.",
        ]}
      />
    ),
  },
  {
    heading: "5. Tarifs",
    content: (
      <>
        <p>Les prix sont indiqués en euros HT (ou TTC si applicable).</p>
        <p>Le vendeur se réserve le droit de modifier ses tarifs à tout moment, sans effet rétroactif.</p>
      </>
    ),
  },
  {
    heading: "6. Modalités de paiement",
    content: (
      <>
        <p>Le paiement est réalisé via [Systeme.io / Stripe].</p>
        <p>Pour les abonnements :</p>
        <LegalList items={["la facturation est mensuelle", "l'abonnement est reconduit automatiquement"]} />
      </>
    ),
  },
  {
    heading: "7. Résiliation",
    content: (
      <>
        <p>Le client peut résilier son abonnement à tout moment.</p>
        <p>La résiliation prend effet à la fin de la période en cours.</p>
        <p>Aucun remboursement ne sera effectué pour une période entamée.</p>
      </>
    ),
  },
  {
    heading: "8. Droit de rétractation",
    content: (
      <>
        <p>
          <strong className="font-semibold text-navy-800">Produits numériques</strong>
          <br />
          Conformément à l&apos;article L221-28 du Code de la consommation, le droit de rétractation
          ne s&apos;applique pas aux contenus numériques fournis immédiatement après paiement.
        </p>
        <p>
          <strong className="font-semibold text-navy-800">Services SaaS</strong>
          <br />
          Le client accepte expressément que l&apos;accès au service commence immédiatement après
          paiement, ce qui exclut le droit de rétractation.
        </p>
      </>
    ),
  },
  {
    heading: "9. Responsabilité",
    content: (
      <>
        <p>Le vendeur ne saurait être tenu responsable :</p>
        <LegalList
          items={[
            "d'une mauvaise utilisation des produits",
            "des décisions prises sur la base des analyses fournies",
            "des pertes indirectes ou de manque à gagner",
          ]}
        />
      </>
    ),
  },
  {
    heading: "10. Propriété intellectuelle",
    content: (
      <>
        <p>Tous les contenus (ebooks, fiches, outils, application) sont protégés.</p>
        <p>Toute reproduction, diffusion ou revente est interdite sans autorisation.</p>
      </>
    ),
  },
  {
    heading: "11. Données personnelles",
    content: (
      <>
        <p>Les données collectées sont utilisées dans le cadre de la relation commerciale.</p>
        <p>Le client dispose d&apos;un droit d&apos;accès, de modification et de suppression.</p>
      </>
    ),
  },
  {
    heading: "12. Droit applicable",
    content: (
      <>
        <p>Les présentes CGV sont soumises au droit français.</p>
        <p>Tout litige relève des tribunaux compétents du siège social du vendeur.</p>
      </>
    ),
  },
];

export default function ConditionsGeneralesDeVentePage() {
  return (
    <LegalPage title="Conditions générales de vente" updated="2 juillet 2026" sections={sections} />
  );
}
