"use client";

import { useId, useState, type FormEvent } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { Button } from "@/components/ui/button";
import { MAX_LENGTHS, validateContact, type ContactFieldErrors } from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

const labelClass = "mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-white/50";
const fieldClass =
  "dark-input h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 font-sans text-[15px] text-white";
const errorClass = "mt-1.5 text-xs text-[#e08585]";

export function ContactForm() {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = new FormData(event.currentTarget);
    const payload = {
      nom: String(form.get("nom") ?? ""),
      entreprise: String(form.get("entreprise") ?? ""),
      telephone: String(form.get("telephone") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? ""),
      website: String(form.get("website") ?? ""),
    };

    const clientErrors = validateContact(payload);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors({});
    setErrorMessage("");
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        sendGAEvent("event", "generate_lead");
        setStatus("success");
        return;
      }

      const data = await response.json().catch(() => null);
      if (response.status === 422 && data?.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }

      setErrorMessage(data?.error ?? "Une erreur est survenue. Merci de réessayer.");
      setStatus("error");
    } catch {
      setErrorMessage("Impossible de vous joindre au serveur. Vérifiez votre connexion et réessayez.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-white/10 bg-white/3 px-10 py-12 text-center">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-gold-400 text-lg text-gold-400">
          ✓
        </div>
        <h3 className="mb-4 font-display text-2xl font-bold text-white">Message reçu</h3>
        <p className="text-base leading-loose text-white/50">
          Nous vous recontacterons dans les 48 heures ouvrées.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative flex flex-col gap-5"
      aria-describedby={`${formId}-status`}
    >
      {/* Honeypot — hidden from real visitors, bots tend to fill every field.
          `relative` on the form above keeps this offset scoped to the form
          instead of the whole page. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Ne pas remplir ce champ</label>
        <input id={`${formId}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-nom`} className={labelClass}>
            Nom
          </label>
          <input
            id={`${formId}-nom`}
            className={fieldClass}
            type="text"
            name="nom"
            required
            maxLength={MAX_LENGTHS.nom}
            placeholder="Jean Dupont"
            aria-invalid={Boolean(errors.nom)}
            aria-describedby={errors.nom ? `${formId}-nom-error` : undefined}
          />
          {errors.nom && (
            <p id={`${formId}-nom-error`} className={errorClass}>
              {errors.nom}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-entreprise`} className={labelClass}>
            Entreprise
          </label>
          <input
            id={`${formId}-entreprise`}
            className={fieldClass}
            type="text"
            name="entreprise"
            required
            maxLength={MAX_LENGTHS.entreprise}
            placeholder="Imprimerie Martin"
            aria-invalid={Boolean(errors.entreprise)}
            aria-describedby={errors.entreprise ? `${formId}-entreprise-error` : undefined}
          />
          {errors.entreprise && (
            <p id={`${formId}-entreprise-error`} className={errorClass}>
              {errors.entreprise}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-telephone`} className={labelClass}>
            Téléphone
          </label>
          <input
            id={`${formId}-telephone`}
            className={fieldClass}
            type="tel"
            name="telephone"
            maxLength={MAX_LENGTHS.telephone}
            placeholder="+33 6 00 00 00 00"
            aria-invalid={Boolean(errors.telephone)}
            aria-describedby={errors.telephone ? `${formId}-telephone-error` : undefined}
          />
          {errors.telephone && (
            <p id={`${formId}-telephone-error`} className={errorClass}>
              {errors.telephone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className={labelClass}>
            Email
          </label>
          <input
            id={`${formId}-email`}
            className={fieldClass}
            type="email"
            name="email"
            required
            maxLength={MAX_LENGTHS.email}
            placeholder="jean@imprimerie.fr"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          />
          {errors.email && (
            <p id={`${formId}-email-error`} className={errorClass}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className={labelClass}>
          Votre situation <span className="text-[11px] font-normal normal-case tracking-normal opacity-65">(optionnel)</span>
        </label>
        <textarea
          id={`${formId}-message`}
          className="dark-textarea min-h-[120px] w-full resize-y rounded-md border border-white/10 bg-white/5 px-4 py-3.5 font-sans text-[15px] text-white"
          name="message"
          rows={4}
          maxLength={MAX_LENGTHS.message}
          placeholder="Décrivez brièvement votre situation..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
        />
        {errors.message && (
          <p id={`${formId}-message-error`} className={errorClass}>
            {errors.message}
          </p>
        )}
      </div>

      <div>
        <Button variant="dark-outline" size="lg" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Envoi en cours…" : "Envoyer le formulaire"}
        </Button>
      </div>

      <p id={`${formId}-status`} role="status" aria-live="polite" className="text-[11px] leading-relaxed text-white/50">
        {status === "error" ? <span className="text-[#e08585]">{errorMessage}</span> : (
          "Vos données ne sont pas transmises à des tiers. Réponse sous 48 h ouvrées."
        )}
      </p>
    </form>
  );
}
