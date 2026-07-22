export const OUTILS_OPTIONS = ["Email", "WhatsApp", "ERP", "Excel", "Papier", "Autre"] as const;

export interface FluxCommercialData {
  demandesClients: string;
  etablissementDevis: string;
  quiValideDevis: string;
  confirmationCommandes: string;
  dossierFabrication: string;
  ficheProduction: string;
  bat: string;
  quiValideCouleurs: string;
  quiValideMatieres: string;
  quiFixePriorites: string;
  nbInterlocuteurs: string;
  outils: string[];
  outilsAutrePrecision: string;
  ouPertesInformation: string;
  parcoursCommande: string;
}

export const FLUX_COMMERCIAL_EMPTY: FluxCommercialData = {
  demandesClients: "",
  etablissementDevis: "",
  quiValideDevis: "",
  confirmationCommandes: "",
  dossierFabrication: "",
  ficheProduction: "",
  bat: "",
  quiValideCouleurs: "",
  quiValideMatieres: "",
  quiFixePriorites: "",
  nbInterlocuteurs: "",
  outils: [],
  outilsAutrePrecision: "",
  ouPertesInformation: "",
  parcoursCommande: "",
};
