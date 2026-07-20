import type { Metadata } from "next";
import { InviteForm } from "@/components/admin/invite-form";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function NewAuditPage() {
  return (
    <section className="cnt-n py-16">
      <h1 className="mb-2 font-display text-2xl font-bold text-navy-800">Nouvel audit</h1>
      <p className="mb-10 text-sm text-neutral-600">
        Le prospect recevra un email avec un lien sécurisé pour accéder à son espace personnel.
      </p>
      <div className="max-w-2xl rounded-md border border-neutral-200 bg-white px-8 py-10">
        <InviteForm />
      </div>
    </section>
  );
}
