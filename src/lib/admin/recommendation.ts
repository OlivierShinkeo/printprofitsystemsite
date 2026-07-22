export const RECOMMENDATION_OPTIONS = [
  { value: "recommended", label: "Accompagnement recommandé" },
  { value: "conditional", label: "Accompagnement envisageable sous conditions" },
  { value: "not_recommended", label: "Accompagnement non recommandé" },
] as const;

export interface RecommendationData {
  maturityLevel: string;
  organizationLevel: string;
  growthPotential: string;
  compatibility: string;
  mainNeeds: string;
  risks: string;
  recommendation: string;
  comment: string;
}

export const RECOMMENDATION_EMPTY: RecommendationData = {
  maturityLevel: "",
  organizationLevel: "",
  growthPotential: "",
  compatibility: "",
  mainNeeds: "",
  risks: "",
  recommendation: "",
  comment: "",
};
