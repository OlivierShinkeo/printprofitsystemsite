export interface ContactPayload {
  nom: string;
  entreprise: string;
  telephone: string;
  email: string;
  message: string;
  /** Honeypot field — real users never fill this in. */
  website: string;
}

export type ContactFieldErrors = Partial<Record<keyof Omit<ContactPayload, "website">, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Generous but finite — keeps the API from ever having to process/email an
// absurdly large payload, without constraining any legitimate visitor.
export const MAX_LENGTHS = {
  nom: 120,
  entreprise: 160,
  telephone: 40,
  email: 254, // RFC 5321 max mailbox length
  message: 5000,
} as const;

export function validateContact(payload: Partial<ContactPayload>): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (!payload.nom?.trim()) {
    errors.nom = "Merci d'indiquer votre nom.";
  } else if (payload.nom.trim().length > MAX_LENGTHS.nom) {
    errors.nom = `Ce champ est limité à ${MAX_LENGTHS.nom} caractères.`;
  }

  if (!payload.entreprise?.trim()) {
    errors.entreprise = "Merci d'indiquer votre entreprise.";
  } else if (payload.entreprise.trim().length > MAX_LENGTHS.entreprise) {
    errors.entreprise = `Ce champ est limité à ${MAX_LENGTHS.entreprise} caractères.`;
  }

  if (!payload.email?.trim()) {
    errors.email = "Merci d'indiquer votre email.";
  } else if (payload.email.trim().length > MAX_LENGTHS.email) {
    errors.email = `Cet email dépasse ${MAX_LENGTHS.email} caractères.`;
  } else if (!EMAIL_RE.test(payload.email.trim())) {
    errors.email = "Cet email ne semble pas valide.";
  }

  if (payload.telephone && payload.telephone.trim().length > MAX_LENGTHS.telephone) {
    errors.telephone = `Ce champ est limité à ${MAX_LENGTHS.telephone} caractères.`;
  }

  if (payload.message && payload.message.trim().length > MAX_LENGTHS.message) {
    errors.message = `Ce message est limité à ${MAX_LENGTHS.message} caractères.`;
  }

  return errors;
}
