import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { AUDIT_STATUS_LABELS_FR } from "@/lib/audit/status";
import type { AuditListItem } from "@/lib/audit/types";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: audits } = await supabase
    .from("audits")
    .select(
      "id, company_name, country, contact_first_name, contact_last_name, contact_email, status, invited_at, submitted_at, last_saved_at, progress_percent"
    )
    .order("invited_at", { ascending: false })
    .returns<AuditListItem[]>();

  return (
    <section className="cnt-n py-16">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-bold text-navy-800">Audits de faisabilité</h1>
        <Button href="/admin/audits/new" variant="primary" size="md">
          Nouvel audit
        </Button>
      </div>

      {!audits || audits.length === 0 ? (
        <p className="text-neutral-600">Aucun audit pour le moment.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-neutral-200 bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-neutral-200 text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-5 py-3">Entreprise</th>
                <th className="px-5 py-3">Contact</th>
                <th className="px-5 py-3">Pays</th>
                <th className="px-5 py-3">Statut</th>
                <th className="px-5 py-3">Avancement</th>
                <th className="px-5 py-3">Invité le</th>
              </tr>
            </thead>
            <tbody>
              {audits.map((audit) => (
                <tr key={audit.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50">
                  <td className="px-5 py-4 font-medium text-navy-800">{audit.company_name}</td>
                  <td className="px-5 py-4 text-neutral-700">
                    {audit.contact_first_name} {audit.contact_last_name}
                    <br />
                    <span className="text-xs text-neutral-500">{audit.contact_email}</span>
                  </td>
                  <td className="px-5 py-4 text-neutral-700">{audit.country}</td>
                  <td className="px-5 py-4 text-neutral-700">{AUDIT_STATUS_LABELS_FR[audit.status]}</td>
                  <td className="px-5 py-4 text-neutral-700">{audit.progress_percent}%</td>
                  <td className="px-5 py-4 text-neutral-700">
                    {new Date(audit.invited_at).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
