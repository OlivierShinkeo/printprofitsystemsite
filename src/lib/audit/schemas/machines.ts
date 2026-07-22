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
