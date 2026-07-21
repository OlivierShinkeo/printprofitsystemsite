"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { resolvePostAuthDestination } from "@/lib/auth/resolve-destination";
import { Button } from "@/components/ui/button";

interface MagicLinkFormProps {
  /** e.g. "/admin" or "/audit" — the callback route lives at `${redirectBase}/auth/callback`. */
  redirectBase: string;
  /** Where to send the user once the 6-digit code is verified, if `lookupOwnAudit` doesn't apply. */
  fallbackPath: string;
  /** Look up the signed-in prospect's own audit and redirect there instead of `fallbackPath`. */
  lookupOwnAudit?: boolean;
}

type LinkStatus = "idle" | "submitting" | "sent" | "error";
type CodeStatus = "idle" | "submitting" | "error";

export function MagicLinkForm({ redirectBase, fallbackPath, lookupOwnAudit = false }: MagicLinkFormProps) {
  const fieldId = useId();
  const codeFieldId = useId();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [linkStatus, setLinkStatus] = useState<LinkStatus>("idle");
  const [code, setCode] = useState("");
  const [codeStatus, setCodeStatus] = useState<CodeStatus>("idle");

  async function handleRequestLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (linkStatus === "submitting" || !email.trim()) return;

    setLinkStatus("submitting");
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}${redirectBase}/auth/callback` },
    });
    setLinkStatus(error ? "error" : "sent");
  }

  async function handleVerifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (codeStatus === "submitting" || code.trim().length === 0) return;

    setCodeStatus("submitting");
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: "magiclink",
    });

    if (error) {
      setCodeStatus("error");
      return;
    }

    const destination = await resolvePostAuthDestination(supabase, { lookupOwnAudit, fallbackPath });
    router.replace(destination);
  }

  if (linkStatus === "sent") {
    return (
      <div className="flex flex-col gap-6">
        <div className="rounded-md border border-gold-500/40 bg-gold-50 px-8 py-7 text-center">
          <p className="font-display text-lg font-semibold text-navy-800">Email envoyé</p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-700">
            Consultez la boîte {email} : cliquez sur le lien reçu, ou saisissez ci-dessous le code à
            6 chiffres qu&apos;il contient (recommandé — certaines messageries invalident le lien en le
            pré-chargeant automatiquement).
          </p>
        </div>

        <form onSubmit={handleVerifyCode} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor={codeFieldId}
              className="mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-neutral-600"
            >
              Code à 6 chiffres
            </label>
            <input
              id={codeFieldId}
              className="light-input h-12 w-full rounded-md border border-neutral-300 bg-white px-4 text-center font-sans text-lg tracking-[0.35em] text-navy-800"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
            />
          </div>
          {codeStatus === "error" && (
            <p className="text-xs text-[#8b2020]">
              Code invalide ou expiré. Vérifiez la saisie ou redemandez un lien ci-dessous.
            </p>
          )}
          <Button
            variant="primary"
            size="lg"
            type="submit"
            disabled={codeStatus === "submitting" || code.length !== 6}
          >
            {codeStatus === "submitting" ? "Vérification…" : "Valider le code"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={handleRequestLink} className="flex flex-col gap-5">
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
      {linkStatus === "error" && (
        <p className="text-xs text-[#8b2020]">
          Impossible d&apos;envoyer le lien. Vérifiez l&apos;adresse et réessayez.
        </p>
      )}
      <Button variant="primary" size="lg" type="submit" disabled={linkStatus === "submitting"}>
        {linkStatus === "submitting" ? "Envoi en cours…" : "Recevoir mon lien de connexion"}
      </Button>
    </form>
  );
}
