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

/** Shape returned by the `audit_difficulties` select used across the questionnaire, recap, and submit routes. */
export interface DifficulteRow {
  description: string | null;
  frequency: string | null;
  age: string | null;
  operational_impact: string | null;
  financial_impact: string | null;
  client_impact: string | null;
  urgency: string | null;
  actions_tried: string | null;
  result: string | null;
}

export function mapDifficulteRowToData(row: DifficulteRow): DifficulteData {
  return {
    description: row.description ?? "",
    frequence: row.frequency ?? "",
    anciennete: row.age ?? "",
    impactOperationnel: row.operational_impact ?? "",
    impactFinancier: row.financial_impact ?? "",
    impactClient: row.client_impact ?? "",
    urgence: row.urgency ?? "",
    actionsTentees: row.actions_tried ?? "",
    resultat: row.result ?? "",
  };
}

export const DIFFICULTE_SELECT_COLUMNS =
  "description, frequency, age, operational_impact, financial_impact, client_impact, urgency, actions_tried, result";
