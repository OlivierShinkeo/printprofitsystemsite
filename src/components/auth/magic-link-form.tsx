"use client";

import { useId, useState, type FormEvent } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

interface MagicLinkFormProps {
  /** e.g. "/admin" or "/audit" — the callback route lives at `${redirectBase}/auth/callback`. */
  redirectBase: string;
}

type Status = "idle" | "submitting" | "sent" | "error";

export function MagicLinkForm({ redirectBase }: MagicLinkFormProps) {
  const fieldId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || !email.trim()) return;

    setStatus("submitting");
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}${redirectBase}/auth/callback` },
    });
    setStatus(error ? "error" : "sent");
  }

  if (status === "sent") {
    return (
      <div className="rounded-md border border-gold-500/40 bg-gold-50 px-8 py-7 text-center">
        <p className="font-display text-lg font-semibold text-navy-800">Lien envoyé</p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700">
          Consultez la boîte {email} et cliquez sur le lien reçu pour accéder à votre espace.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label
          htmlFor={fieldId}
          className="mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600"
        >
          Email
        </label>
        <input
          id={fieldId}
          className="light-input h-11 w-full rounded-md border border-neutral-300 bg-white px-4 font-sans text-[15px] text-navy-800"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="vous@entreprise.fr"
        />
      </div>
      {status === "error" && (
        <p className="text-xs text-[#8b2020]">
          Impossible d&apos;envoyer le lien. Vérifiez l&apos;adresse et réessayez.
        </p>
      )}
      <Button variant="primary" size="lg" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Envoi en cours…" : "Recevoir mon lien de connexion"}
      </Button>
    </form>
  );
}
