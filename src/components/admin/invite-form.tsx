"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  INVITE_MAX_LENGTHS,
  validateInvite,
  type InviteFieldErrors,
  type InvitePayload,
} from "@/lib/audit/invite-schema";

type Status = "idle" | "submitting" | "error";

const labelClass = "mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600";
const fieldClass =
  "light-input h-11 w-full rounded-md border border-neutral-300 bg-white px-4 font-sans text-[15px] text-navy-800";
const errorClass = "mt-1.5 text-xs text-[#8b2020]";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function InviteForm() {
  const formId = useId();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<InviteFieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = new FormData(event.currentTarget);
    const payload: InvitePayload = {
      firstName: String(form.get("firstName") ?? ""),
      lastName: String(form.get("lastName") ?? ""),
      email: String(form.get("email") ?? ""),
      companyName: String(form.get("companyName") ?? ""),
      country: String(form.get("country") ?? ""),
      invitedAt: String(form.get("invitedAt") ?? ""),
    };

    const clientErrors = validateInvite(payload);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors({});
    setErrorMessage("");
    setStatus("submitting");

    try {
      const response = await fetch("/api/admin/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/admin");
        router.refresh();
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

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-firstName`} className={labelClass}>
            Prénom
          </label>
          <input
            id={`${formId}-firstName`}
            className={fieldClass}
            type="text"
            name="firstName"
            required
            maxLength={INVITE_MAX_LENGTHS.firstName}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? `${formId}-firstName-error` : undefined}
          />
          {errors.firstName && (
            <p id={`${formId}-firstName-error`} className={errorClass}>
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-lastName`} className={labelClass}>
            Nom
          </label>
          <input
            id={`${formId}-lastName`}
            className={fieldClass}
            type="text"
            name="lastName"
            required
            maxLength={INVITE_MAX_LENGTHS.lastName}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? `${formId}-lastName-error` : undefined}
          />
          {errors.lastName && (
            <p id={`${formId}-lastName-error`} className={errorClass}>
              {errors.lastName}
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
            maxLength={INVITE_MAX_LENGTHS.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          />
          {errors.email && (
            <p id={`${formId}-email-error`} className={errorClass}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-companyName`} className={labelClass}>
            Entreprise
          </label>
          <input
            id={`${formId}-companyName`}
            className={fieldClass}
            type="text"
            name="companyName"
            required
            maxLength={INVITE_MAX_LENGTHS.companyName}
            aria-invalid={Boolean(errors.companyName)}
            aria-describedby={errors.companyName ? `${formId}-companyName-error` : undefined}
          />
          {errors.companyName && (
            <p id={`${formId}-companyName-error`} className={errorClass}>
              {errors.companyName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-country`} className={labelClass}>
            Pays
          </label>
          <input
            id={`${formId}-country`}
            className={fieldClass}
            type="text"
            name="country"
            required
            maxLength={INVITE_MAX_LENGTHS.country}
            aria-invalid={Boolean(errors.country)}
            aria-describedby={errors.country ? `${formId}-country-error` : undefined}
          />
          {errors.country && (
            <p id={`${formId}-country-error`} className={errorClass}>
              {errors.country}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-invitedAt`} className={labelClass}>
            Date d&apos;invitation
          </label>
          <input
            id={`${formId}-invitedAt`}
            className={fieldClass}
            type="date"
            name="invitedAt"
            defaultValue={today()}
            aria-invalid={Boolean(errors.invitedAt)}
            aria-describedby={errors.invitedAt ? `${formId}-invitedAt-error` : undefined}
          />
          {errors.invitedAt && (
            <p id={`${formId}-invitedAt-error`} className={errorClass}>
              {errors.invitedAt}
            </p>
          )}
        </div>
      </div>

      {status === "error" && <p className={errorClass}>{errorMessage}</p>}

      <div>
        <Button variant="primary" size="lg" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Envoi en cours…" : "Créer et inviter"}
        </Button>
      </div>
    </form>
  );
}
