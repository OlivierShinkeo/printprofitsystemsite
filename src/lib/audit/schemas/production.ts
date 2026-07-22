export const PLANNING_OPTIONS = ["Formalisé", "Informel"] as const;
export const ORDRES_FABRICATION_OPTIONS = ["Écrits", "Oraux"] as const;
export const CONTROLE_QUALITE_OPTIONS = ["À chaque étape", "En fin de production"] as const;

export interface ProductionData {
  planning: string;
  ordresFabrication: string;
  standardsTravail: string;
  tempsReglageMesures: string;
  tempsReelMesure: string;
  tauxOccupationSuivi: string;
  productiviteSuivie: string;
  controleQualite: string;
  organisationChangementsSerie: string;
  gestionUrgences: string;
  gestionReprises: string;
  suiviRetards: string;
  suiviSousTraitance: string;
  causesRalentissement: string;
}

export const PRODUCTION_EMPTY: ProductionData = {
  planning: "",
  ordresFabrication: "",
  standardsTravail: "",
  tempsReglageMesures: "",
  tempsReelMesure: "",
  tauxOccupationSuivi: "",
  productiviteSuivie: "",
  controleQualite: "",
  organisationChangementsSerie: "",
  gestionUrgences: "",
  gestionReprises: "",
  suiviRetards: "",
  suiviSousTraitance: "",
  causesRalentissement: "",
};
