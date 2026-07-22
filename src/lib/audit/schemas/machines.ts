export const MAINTENANCE_OPTIONS = ["Interne", "Externe", "Les deux"] as const;

export interface MachineData {
  type: string;
  marque: string;
  modele: string;
  annee: string;
  technologie: string;
  format: string;
  etatGeneral: string;
  frequenceUtilisation: string;
  volumeMensuel: string;
  principalUsage: string;
  principaleDifficulte: string;
  maintenance: string;
  critique: boolean;
}

export function createEmptyMachine(): MachineData {
  return {
    type: "",
    marque: "",
    modele: "",
    annee: "",
    technologie: "",
    format: "",
    etatGeneral: "",
    frequenceUtilisation: "",
    volumeMensuel: "",
    principalUsage: "",
    principaleDifficulte: "",
    maintenance: "",
    critique: false,
  };
}

/** Shape returned by the `audit_machines` select used across the questionnaire, recap, and submit routes. */
export interface MachineRow {
  type: string | null;
  brand: string | null;
  model: string | null;
  year: number | null;
  technology: string | null;
  format: string | null;
  condition: string | null;
  usage_frequency: string | null;
  monthly_volume: string | null;
  main_use: string | null;
  main_difficulty: string | null;
  maintenance_type: string | null;
  is_critical: boolean | null;
}

export function mapMachineRowToData(row: MachineRow): MachineData {
  return {
    type: row.type ?? "",
    marque: row.brand ?? "",
    modele: row.model ?? "",
    annee: row.year != null ? String(row.year) : "",
    technologie: row.technology ?? "",
    format: row.format ?? "",
    etatGeneral: row.condition ?? "",
    frequenceUtilisation: row.usage_frequency ?? "",
    volumeMensuel: row.monthly_volume ?? "",
    principalUsage: row.main_use ?? "",
    principaleDifficulte: row.main_difficulty ?? "",
    maintenance: row.maintenance_type ?? "",
    critique: Boolean(row.is_critical),
  };
}

export const MACHINE_SELECT_COLUMNS =
  "type, brand, model, year, technology, format, condition, usage_frequency, monthly_volume, main_use, main_difficulty, maintenance_type, is_critical";
