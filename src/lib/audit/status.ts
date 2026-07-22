export const AUDIT_STATUSES = [
  "invited",
  "in_progress",
  "submitted",
  "under_review",
  "additional_information_requested",
  "approved",
  "approved_with_conditions",
  "rejected",
  "archived",
] as const;

export type AuditStatus = (typeof AUDIT_STATUSES)[number];

export type AppRole = "admin" | "prospect";

export type AuditRecommendation = "recommended" | "conditional" | "not_recommended";

/** Libellé affiché au prospect — jamais le nom technique du statut. */
export const AUDIT_STATUS_LABELS_FR: Record<AuditStatus, string> = {
  invited: "Invitation envoyée",
  in_progress: "Audit en cours",
  submitted: "Audit transmis",
  under_review: "En cours d'analyse",
  additional_information_requested: "Complément d'information demandé",
  approved: "Accompagnement recommandé",
  approved_with_conditions: "Accompagnement envisageable sous conditions",
  rejected: "Accompagnement non retenu pour le moment",
  archived: "Dossier archivé",
};

/** Message d'accompagnement affiché sous le statut, dans le tableau de bord prospect. */
export const AUDIT_STATUS_MESSAGES_FR: Record<AuditStatus, string> = {
  invited:
    "Cet audit nous permet de mieux comprendre votre entreprise, votre organisation et vos enjeux afin de déterminer si Print Profit System™ est adapté à votre situation. Prenez le temps nécessaire pour répondre avec précision : plus les informations transmises sont complètes et détaillées, plus l'analyse de votre situation sera fine et les recommandations pertinentes.",
  in_progress:
    "Cet audit nous permet de mieux comprendre votre entreprise, votre organisation et vos enjeux afin de déterminer si Print Profit System™ est adapté à votre situation. Vous pouvez le compléter à votre rythme — vos réponses sont sauvegardées automatiquement. Prenez le temps nécessaire pour répondre avec précision : plus les informations transmises sont complètes et détaillées, plus l'analyse de votre situation sera fine et les recommandations pertinentes.",
  submitted:
    "Votre audit a bien été transmis. Nous l'étudions et revenons vers vous rapidement.",
  under_review: "Votre audit est actuellement à l'étude par notre équipe.",
  additional_information_requested:
    "Nous avons besoin d'un complément d'information pour finaliser l'analyse de votre dossier. Nous vous recontactons directement.",
  approved:
    "Votre dossier a été étudié. Un membre de notre équipe va vous recontacter pour la suite.",
  approved_with_conditions:
    "Votre dossier a été étudié. Un membre de notre équipe va vous recontacter pour évoquer les conditions d'un accompagnement.",
  rejected:
    "Après analyse, nous ne sommes pas en mesure de vous proposer un accompagnement pour le moment.",
  archived: "Ce dossier est archivé.",
};

/** Statuts dans lesquels le prospect peut encore modifier ses réponses. */
export const EDITABLE_STATUSES: readonly AuditStatus[] = ["invited", "in_progress"];

export function isAuditEditable(status: AuditStatus): boolean {
  return EDITABLE_STATUSES.includes(status);
}
