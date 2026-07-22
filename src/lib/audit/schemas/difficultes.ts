export interface DifficulteData {
  description: string;
  frequence: string;
  anciennete: string;
  impactOperationnel: string;
  impactFinancier: string;
  impactClient: string;
  urgence: string;
  actionsTentees: string;
  resultat: string;
}

export function createEmptyDifficulte(): DifficulteData {
  return {
    description: "",
    frequence: "",
    anciennete: "",
    impactOperationnel: "",
    impactFinancier: "",
    impactClient: "",
    urgence: "",
    actionsTentees: "",
    resultat: "",
  };
}

export const DIFFICULTES_COUNT = 5;

export function createEmptyDifficultes(): DifficulteData[] {
  return Array.from({ length: DIFFICULTES_COUNT }, () => createEmptyDifficulte());
}
