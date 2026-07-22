export interface QualiteData {
  nbReimpressions: string;
  erreursFichier: string;
  erreursCouleur: string;
  erreursMatiere: string;
  erreursQuantite: string;
  defautsFinition: string;
  retards: string;
  reclamationsClient: string;
  urgencesNonPlanifiees: string;
  travauxRefaitsGratuitement: string;
  incidentsEnregistres: string;
  causesAnalysees: string;
  reunionSuivi: string;
  actionsCorrectives: string;
  coutEstime: string;
}

export const QUALITE_EMPTY: QualiteData = {
  nbReimpressions: "",
  erreursFichier: "",
  erreursCouleur: "",
  erreursMatiere: "",
  erreursQuantite: "",
  defautsFinition: "",
  retards: "",
  reclamationsClient: "",
  urgencesNonPlanifiees: "",
  travauxRefaitsGratuitement: "",
  incidentsEnregistres: "",
  causesAnalysees: "",
  reunionSuivi: "",
  actionsCorrectives: "",
  coutEstime: "",
};
