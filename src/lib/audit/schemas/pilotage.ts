export const INDICATEURS_OPTIONS = [
  "Chiffre d'affaires",
  "Marge brute",
  "Marge par commande",
  "Coût horaire machine",
  "Productivité",
  "Temps prévu / temps réel",
  "Taux de reprise",
  "Respect des délais",
  "Taux de service",
  "Encours atelier",
  "Taux d'occupation",
  "Taux de valeur ajoutée",
  "Trésorerie",
  "Aucun indicateur structuré",
  "Autre",
] as const;

export const FREQUENCE_OPTIONS = ["Quotidienne", "Hebdomadaire", "Mensuelle", "Trimestrielle", "Aucune"] as const;

export interface PilotageData {
  indicateurs: string[];
  indicateursAutrePrecision: string;
  frequenceSuivi: string;
  outilUtilise: string;
  personneResponsable: string;
  qualitePercueDonnees: string;
  decisionsPermises: string;
  indicateursManquants: string;
}

export const PILOTAGE_EMPTY: PilotageData = {
  indicateurs: [],
  indicateursAutrePrecision: "",
  frequenceSuivi: "",
  outilUtilise: "",
  personneResponsable: "",
  qualitePercueDonnees: "",
  decisionsPermises: "",
  indicateursManquants: "",
};
