export interface SectionDef {
  slug: string;
  title: string;
}

/** The 14 steps of the questionnaire, in order. Used for progress tracking and step navigation. */
export const AUDIT_SECTIONS: SectionDef[] = [
  { slug: "entreprise", title: "Entreprise" },
  { slug: "dirigeant", title: "Profil du dirigeant" },
  { slug: "activites", title: "Activités et marchés" },
  { slug: "machines", title: "Parc machines" },
  { slug: "flux_commercial", title: "Flux commercial et préparation des commandes" },
  { slug: "prepresse", title: "Prépresse" },
  { slug: "production", title: "Production et finition" },
  { slug: "qualite", title: "Qualité et incidents" },
  { slug: "pilotage", title: "Pilotage et rentabilité" },
  { slug: "equipe", title: "Équipe et compétences" },
  { slug: "difficultes", title: "Difficultés actuelles" },
  { slug: "objectifs", title: "Objectifs" },
  { slug: "accompagnement", title: "Accompagnement" },
  { slug: "validation", title: "Validation finale" },
];

export const AUDIT_SECTION_SLUGS = new Set(AUDIT_SECTIONS.map((section) => section.slug));
