export const ACTIVITES_OPTIONS = [
  "Impression numérique petit format",
  "Impression numérique grand format",
  "Offset",
  "Signalétique",
  "Textile",
  "Packaging",
  "Étiquettes",
  "Reprographie",
  "Finition",
  "Sous-traitance",
  "Autre",
] as const;

export const POSITIONNEMENT_OPTIONS = ["Économique", "Standard", "Premium"] as const;

export interface ActivitesData {
  activites: string[];
  autrePrecision: string;
  produitsVendus: string;
  produitRentable1: string;
  produitRentable2: string;
  produitRentable3: string;
  produitMoinsRentable1: string;
  produitMoinsRentable2: string;
  produitMoinsRentable3: string;
  typesClients: string;
  partB2B: string;
  partB2C: string;
  partSousTraitance: string;
  saisonnalite: string;
  positionnementPrix: string;
}

export const ACTIVITES_EMPTY: ActivitesData = {
  activites: [],
  autrePrecision: "",
  produitsVendus: "",
  produitRentable1: "",
  produitRentable2: "",
  produitRentable3: "",
  produitMoinsRentable1: "",
  produitMoinsRentable2: "",
  produitMoinsRentable3: "",
  typesClients: "",
  partB2B: "",
  partB2C: "",
  partSousTraitance: "",
  saisonnalite: "",
  positionnementPrix: "",
};
