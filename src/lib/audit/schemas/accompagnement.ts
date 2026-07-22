export interface AccompagnementData {
  pourquoiAccompagne: string;
  pourquoiMaintenant: string;
  attentesConcretes: string;
  contraintes: string;
  quiDecidera: string;
  quiParticipera: string;
  pretPartagerDonnees: string;
  pretModifierHabitudes: string;
  implicationHebdomadaire: string;
  experienceConsultantAnterieure: string;
  resultatJustifiantInvestissement: string;
  pourquoiPpsAdapte: string;
}

export const ACCOMPAGNEMENT_EMPTY: AccompagnementData = {
  pourquoiAccompagne: "",
  pourquoiMaintenant: "",
  attentesConcretes: "",
  contraintes: "",
  quiDecidera: "",
  quiParticipera: "",
  pretPartagerDonnees: "",
  pretModifierHabitudes: "",
  implicationHebdomadaire: "",
  experienceConsultantAnterieure: "",
  resultatJustifiantInvestissement: "",
  pourquoiPpsAdapte: "",
};
