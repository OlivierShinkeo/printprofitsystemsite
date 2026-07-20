import type { Metadata } from "next";
import { MagicLinkForm } from "@/components/auth/magic-link-form";

export const metadata: Metadata = {
  title: "Accéder à mon audit — Print Profit System™",
  robots: { index: false, follow: false },
};

export default function AuditLoginPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-cream px-6 py-24">
      <div className="w-full max-w-md rounded-md border border-neutral-200 bg-white px-10 py-12 shadow-md">
        <h1 className="mb-2 font-display text-2xl font-bold text-navy-800">
          Accéder à mon audit
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-neutral-600">
          Saisissez l&apos;email auquel vous avez été invité(e) — vous recevrez un nouveau lien de
          connexion sécurisé, sans mot de passe.
        </p>
        <MagicLinkForm redirectBase="/audit" />
      </div>
    </section>
  );
}
