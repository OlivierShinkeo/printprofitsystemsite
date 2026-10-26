import { CONTACT_EMAIL_LEGAL, COMPANY } from "@/lib/site-config";

/** The recurring "who operates this site" identity block, reused across all three legal pages. */
export function CompanyBlock() {
  return (
    <p>
      {COMPANY.name}, au capital de {COMPANY.capital}
      <br />
      RCS {COMPANY.rcs}
      <br />
      Siège social : {COMPANY.address}
      <br />
      SIRET : {COMPANY.siret}
      <br />
      Email : {CONTACT_EMAIL_LEGAL}
    </p>
  );
}
