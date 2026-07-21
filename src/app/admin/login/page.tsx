import type { Metadata } from "next";
import { MagicLinkForm } from "@/components/auth/magic-link-form";
import { LoginErrorBanner } from "@/components/auth/login-error-banner";

export const metadata: Metadata = {
  title: "Connexion administrateur — Print Profit System™",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <section className="flex min-h-screen items-center justify-center bg-cream px-6 py-24">
      <div className="w-full max-w-md rounded-md border border-neutral-200 bg-white px-10 py-12 shadow-md">
        <h1 className="mb-2 font-display text-2xl font-bold text-navy-800">Espace administrateur</h1>
        <p className="mb-8 text-sm leading-relaxed text-neutral-600">
          Recevez un lien de connexion sécurisé par email — aucun mot de passe n&apos;est nécessaire.
        </p>
        <LoginErrorBanner error={error} />
        <MagicLinkForm redirectBase="/admin" fallbackPath="/admin" />
      </div>
    </section>
  );
}
