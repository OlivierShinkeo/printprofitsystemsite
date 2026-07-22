export interface DirigeantData {
  prenom: string;
  nom: string;
  fonction: string;
  anneesEntreprise: string;
  experiencePrealable: string;
  formationsSuivies: string;
  niveauMaitrise: string;
  disponibiliteHebdomadaire: string;
  responsabilitesActuelles: string;
}

export const NIVEAU_MAITRISE_OPTIONS = [
  "Débutant",
  "Intermédiaire",
  "Confirmé",
  "Expert",
] as const;

export const DIRIGEANT_EMPTY: DirigeantData = {
  prenom: "",
  nom: "",
  fonction: "",
  anneesEntreprise: "",
  experiencePrealable: "",
  formationsSuivies: "",
  niveauMaitrise: "",
  disponibiliteHebdomadaire: "",
  responsabilitesActuelles: "",
};
