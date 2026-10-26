import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { LegalList } from "@/components/legal/legal-list";
import { CompanyBlock } from "@/components/legal/company-block";
import { CONTACT_EMAIL_LEGAL } from "@/lib/site-config";
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
    heading: "2. Champ d'application",
    content: (
      <>
        <p>
          Les présentes conditions générales de vente (CGV) s&apos;appliquent à toute vente de
          l&apos;accompagnement Print Profit System™.
        </p>
        <p>
          Elles sont réservées exclusivement aux clients professionnels (entreprises, indépendants,
          sociétés) agissant pour les besoins de leur activité.
        </p>
        <p>
          Toute commande vaut reconnaissance de la qualité de professionnel du client et acceptation
          sans réserve des présentes CGV.
        </p>
      </>
    ),
  },
  {
    heading: "3. Description de l'accompagnement",
    content: (
      <>
        <p>L&apos;accompagnement est hybride et comprend :</p>
        <LegalList
          items={[
            "des séances en visioconférence avec Shinkéo",
            "l'accès à un espace en ligne contenant des ressources (contenus, fiches, ebooks)",
            "l'accès à l'application de calcul des pertes pendant toute la durée de l'accompagnement",
          ]}
        />
        <p>
          La durée, le nombre de séances et le contenu précis sont indiqués sur la page de vente ou
          dans la proposition commerciale remise au client.
        </p>
        <p>
          Les ressources et outils sont inclus dans l&apos;accompagnement et ne sont pas vendus
          séparément.
        </p>
      </>
    ),
  },
  {
    heading: "4. Tarifs",
    content: (
      <>
        <p>
          Les prix sont indiqués en euros hors taxes (HT), auxquels s&apos;ajoute la TVA au taux en
          vigueur.
        </p>
        <p>Le prix applicable est celui affiché au moment de la commande.</p>
      </>
    ),
  },
  {
    heading: "5. Modalités de paiement",
    content: (
      <>
        <p>Le paiement s&apos;effectue par carte bancaire via Stripe ou par virement bancaire.</p>
        <p>
          Il peut être réalisé en une fois ou en plusieurs fois sans frais, selon l&apos;échéancier
          proposé lors de la commande.
        </p>
        <p>
          Le paiement échelonné est une facilité de paiement : la totalité des échéances reste due,
          même en cas d&apos;arrêt de l&apos;accompagnement par le client.
        </p>
        <p>Tout retard de paiement entraîne de plein droit :</p>
        <LegalList
          items={[
            "des pénalités de retard au taux de la BCE majoré de 10 points",
            "une indemnité forfaitaire pour frais de recouvrement de 40 € (article L441-10 du Code de commerce)",
          ]}
        />
        <p>Shinkéo se réserve le droit de suspendre l&apos;accès à l&apos;accompagnement en cas d&apos;impayé.</p>
      </>
    ),
  },
  {
    heading: "6. Accès et déroulement",
    content: (
      <>
        <p>L&apos;accès à l&apos;espace en ligne est ouvert dès réception du premier paiement.</p>
        <p>Les séances en visioconférence sont planifiées d&apos;un commun accord.</p>
        <p>
          Toute séance annulée moins de 24 h à l&apos;avance ou non honorée par le client est
          considérée comme effectuée.
        </p>
      </>
    ),
  },
  {
    heading: "7. Absence de droit de rétractation et de remboursement",
    content: (
      <>
        <p>
          L&apos;accompagnement étant réservé aux professionnels, le droit de rétractation prévu par
          le Code de la consommation ne s&apos;applique pas.
        </p>
        <p>
          Aucun remboursement, total ou partiel, ne sera effectué, y compris en cas d&apos;arrêt de
          l&apos;accompagnement en cours de route.
        </p>
      </>
    ),
  },
  {
    heading: "8. Engagement de Shinkéo",
    content: (
      <>
        <p>
          Shinkéo s&apos;engage à identifier, avec le client, des leviers significatifs de gains ou de
          réduction des pertes dans son activité d&apos;impression.
        </p>
        <p>
          Si, au terme de l&apos;accompagnement, aucun levier significatif n&apos;a été identifié,
          l&apos;accompagnement est prolongé sans frais jusqu&apos;à leur identification, dans la
          limite de 3 mois supplémentaires.
        </p>
        <p>
          Cet engagement est conditionné à la participation active du client : présence aux séances,
          transmission des données demandées et mise en œuvre des actions convenues.
        </p>
        <p>
          Il porte sur l&apos;identification des leviers et non sur le résultat financier final, qui
          dépend des décisions et de la mise en œuvre du client.
        </p>
      </>
    ),
  },
  {
    heading: "9. Obligations du client",
    content: (
      <p>
        Le client s&apos;engage à fournir des informations exactes et complètes, à participer aux
        séances et à conserver la confidentialité de ses identifiants d&apos;accès.
      </p>
    ),
  },
  {
    heading: "10. Responsabilité",
    content: (
      <>
        <p>Shinkéo est tenue à une obligation de moyens.</p>
        <p>Shinkéo ne saurait être tenue responsable :</p>
        <LegalList
          items={[
            "des décisions prises par le client sur la base des analyses fournies",
            "des pertes indirectes ou du manque à gagner",
          ]}
        />
        <p>
          En tout état de cause, sa responsabilité est limitée au montant payé par le client au titre
          de l&apos;accompagnement.
        </p>
      </>
    ),
  },
  {
    heading: "11. Propriété intellectuelle",
    content: (
      <>
        <p>Les contenus, méthodes, outils et l&apos;application restent la propriété exclusive de Shinkéo.</p>
        <p>
          Le client bénéficie d&apos;un droit d&apos;utilisation pour son usage interne pendant la
          durée de l&apos;accompagnement.
        </p>
        <p>Toute reproduction, diffusion ou revente est interdite sans autorisation écrite.</p>
      </>
    ),
  },
  {
    heading: "12. Données personnelles",
    content: (
      <>
        <p>Les données personnelles sont traitées conformément aux mentions légales du site.</p>
        <p>
          Le client dispose d&apos;un droit d&apos;accès, de rectification, d&apos;opposition et de
          suppression en écrivant à {CONTACT_EMAIL_LEGAL}.
        </p>
      </>
    ),
  },
  {
    heading: "13. Droit applicable et litiges",
    content: (
      <>
        <p>Les présentes CGV sont soumises au droit français.</p>
        <p>
          En cas de litige, les parties rechercheront d&apos;abord une solution amiable. À défaut, le
          tribunal de commerce de Niort sera seul compétent.
        </p>
      </>
    ),
  },
];

export default function ConditionsGeneralesDeVentePage() {
  return (
    <LegalPage title="Conditions générales de vente" updated="26 octobre 2026" sections={sections} />
  );
}
