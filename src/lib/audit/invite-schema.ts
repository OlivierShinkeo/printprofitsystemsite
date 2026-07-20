export interface InvitePayload {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  country: string;
  /** ISO date (yyyy-mm-dd). Defaults to today when left empty. */
  invitedAt: string;
}

export type InviteFieldErrors = Partial<Record<keyof InvitePayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const INVITE_MAX_LENGTHS = {
  firstName: 80,
  lastName: 80,
  email: 254,
  companyName: 160,
  country: 80,
} as const;

export function validateInvite(payload: Partial<InvitePayload>): InviteFieldErrors {
  const errors: InviteFieldErrors = {};

  if (!payload.firstName?.trim()) {
    errors.firstName = "Le prénom est obligatoire.";
  } else if (payload.firstName.trim().length > INVITE_MAX_LENGTHS.firstName) {
    errors.firstName = `Ce champ est limité à ${INVITE_MAX_LENGTHS.firstName} caractères.`;
  }

  if (!payload.lastName?.trim()) {
    errors.lastName = "Le nom est obligatoire.";
  } else if (payload.lastName.trim().length > INVITE_MAX_LENGTHS.lastName) {
    errors.lastName = `Ce champ est limité à ${INVITE_MAX_LENGTHS.lastName} caractères.`;
  }

  if (!payload.email?.trim()) {
    errors.email = "L'email est obligatoire.";
  } else if (payload.email.trim().length > INVITE_MAX_LENGTHS.email) {
    errors.email = `Cet email dépasse ${INVITE_MAX_LENGTHS.email} caractères.`;
  } else if (!EMAIL_RE.test(payload.email.trim())) {
    errors.email = "Cet email ne semble pas valide.";
  }

  if (!payload.companyName?.trim()) {
    errors.companyName = "Le nom de l'entreprise est obligatoire.";
  } else if (payload.companyName.trim().length > INVITE_MAX_LENGTHS.companyName) {
    errors.companyName = `Ce champ est limité à ${INVITE_MAX_LENGTHS.companyName} caractères.`;
  }

  if (!payload.country?.trim()) {
    errors.country = "Le pays est obligatoire.";
  } else if (payload.country.trim().length > INVITE_MAX_LENGTHS.country) {
    errors.country = `Ce champ est limité à ${INVITE_MAX_LENGTHS.country} caractères.`;
  }

  if (payload.invitedAt?.trim() && Number.isNaN(Date.parse(payload.invitedAt))) {
    errors.invitedAt = "Cette date n'est pas valide.";
  }

  return errors;
}
