export interface PrepresseData {
  personneDediee: string;
  logicielsUtilises: string;
  controleFichiers: string;
  controleResolution: string;
  controleFondsPerdus: string;
  controleColorimetrique: string;
  gestionPantone: string;
  batSystematique: string;
  checklistExistante: string;
  tempsMoyenPreparation: string;
  principalesDifficultes: string;
  niveauFormationEquipe: string;
}

export const PREPRESSE_EMPTY: PrepresseData = {
  personneDediee: "",
  logicielsUtilises: "",
  controleFichiers: "",
  controleResolution: "",
  controleFondsPerdus: "",
  controleColorimetrique: "",
  gestionPantone: "",
  batSystematique: "",
  checklistExistante: "",
  tempsMoyenPreparation: "",
  principalesDifficultes: "",
  niveauFormationEquipe: "",
};
