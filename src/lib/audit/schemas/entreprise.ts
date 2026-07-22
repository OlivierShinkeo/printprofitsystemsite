/** All values kept as strings — this is autosaved draft data typed field-by-field, not a validated submission. */
export interface EntrepriseData {
  raisonSociale: string;
  nomCommercial: string;
  pays: string;
  ville: string;
  anneeCreation: string;
  formeJuridique: string;
  siteInternet: string;
  effectifTotal: string;
  effectifProduction: string;
  effectifPrepresse: string;
  effectifCommercial: string;
  chiffreAffaires: string;
  devise: string;
}

export const DEVISE_OPTIONS = ["EUR", "USD", "CHF", "CAD", "XOF", "Autre"] as const;

export const ENTREPRISE_EMPTY: EntrepriseData = {
  raisonSociale: "",
  nomCommercial: "",
  pays: "",
  ville: "",
  anneeCreation: "",
  formeJuridique: "",
  siteInternet: "",
  effectifTotal: "",
  effectifProduction: "",
  effectifPrepresse: "",
  effectifCommercial: "",
  chiffreAffaires: "",
  devise: "",
};
