export const NIVEAU_OPTIONS = ["Faible", "Moyen", "Élevé"] as const;

export interface EquipeData {
  effectifDetaille: string;
  rolesDefinis: string;
  niveauPolyvalence: string;
  besoinFormation: string;
  competencesManquantes: string;
  turnover: string;
  integrationNouveaux: string;
  standardsDocumentes: string;
  reunionsProduction: string;
  frequencePointsEquipe: string;
  autonomieResponsables: string;
}

export const EQUIPE_EMPTY: EquipeData = {
  effectifDetaille: "",
  rolesDefinis: "",
  niveauPolyvalence: "",
  besoinFormation: "",
  competencesManquantes: "",
  turnover: "",
  integrationNouveaux: "",
  standardsDocumentes: "",
  reunionsProduction: "",
  frequencePointsEquipe: "",
  autonomieResponsables: "",
};
