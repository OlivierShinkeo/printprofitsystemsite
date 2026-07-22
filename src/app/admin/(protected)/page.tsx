import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { AUDIT_STATUS_LABELS_FR, AUDIT_STATUSES } from "@/lib/audit/status";
import type { AuditListItem } from "@/lib/audit/types";
import { AdminAuditFilters } from "@/components/admin/audit-filters";

export const metadata: Metadata = { robots: { index: false, follow: false } };

interface AdminDashboardPageProps {
  searchParams: Promise<{
    statut?: string;
    pays?: string;
    entreprise?: string;
    du?: string;
    au?: string;
    avancementMin?: string;
    avancementMax?: string;
  }>;
}

export default async function AdminDashboardPage({ searchParams }: AdminDashboardPageProps) {
  const { statut, pays, entreprise, du, au, avancementMin, avancementMax } = await searchParams;

  const supabase = await createSupabaseServerClient();
  const { data: allAudits } = await supabase
    .from("audits")
    .select(
      "id, company_name, country, contact_first_name, contact_last_name, contact_email, status, invited_at, submitted_at, last_saved_at, progress_percent"
    )
    .order("invited_at", { ascending: false })
    .returns<AuditListItem[]>();

  const countries = Array.from(new Set((allAudits ?? []).map((a) => a.country))).sort((a, b) =>
    a.localeCompare(b, "fr")
  );

  const minProgress = avancementMin ? Number(avancementMin) : undefined;
  const maxProgress = avancementMax ? Number(avancementMax) : undefined;
  const dateFrom = du ? new Date(du) : undefined;
  const dateTo = au ? new Date(au) : undefined;
  if (dateTo) dateTo.setHours(23, 59, 59, 999);
  const companyQuery = entreprise?.trim().toLowerCase();

  const audits = (allAudits ?? []).filter((audit) => {
    if (statut && audit.status !== statut) return false;
    if (pays && audit.country !== pays) return false;
    if (companyQuery && !audit.company_name.toLowerCase().includes(companyQuery)) return false;
    if (dateFrom && new Date(audit.invited_at) < dateFrom) return false;
    if (dateTo && new Date(audit.invited_at) > dateTo) return false;
    if (minProgress !== undefined && audit.progress_percent < minProgress) return false;
    if (maxProgress !== undefined && audit.progress_percent > maxProgress) return false;
    return true;
  });

  const hasFilters = Boolean(statut || pays || entreprise || du || au || avancementMin || avancementMax);

  return (
    <section className="cnt-n py-16">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-bold text-navy-800">Audits de faisabilité</h1>
        <Button href="/admin/audits/new" variant="primary" size="md">
          Nouvel audit
        </Button>
      </div>

      <AdminAuditFilters
        statuses={AUDIT_STATUSES.map((s) => ({ value: s, label: AUDIT_STATUS_LABELS_FR[s] }))}
        countries={countries}
        defaultValues={{ statut, pays, entreprise, du, au, avancementMin, avancementMax }}
      />

      {hasFilters && (
        <p className="mb-4 text-sm text-neutral-500">
          {audits.length} audit{audits.length > 1 ? "s" : ""} sur {allAudits?.length ?? 0}
        </p>
      )}

      {!allAudits || allAudits.length === 0 ? (
        <p className="text-neutral-600">Aucun audit pour le moment.</p>
      ) : audits.length === 0 ? (
        <p className="text-neutral-600">Aucun audit ne correspond à ces filtres.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-neutral-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-neutral-200 text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-3 py-2.5">Entreprise</th>
                <th className="px-3 py-2.5">Contact</th>
                <th className="px-3 py-2.5">Pays</th>
                <th className="px-3 py-2.5">Statut</th>
                <th className="px-3 py-2.5">Avanc.</th>
                <th className="px-3 py-2.5">Invité le</th>
              </tr>
            </thead>
            <tbody>
              {audits.map((audit) => (
                <tr key={audit.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50">
                  <td className="px-3 py-2.5 font-medium text-navy-800">
                    <Link href={`/admin/audits/${audit.id}`} className="hover:underline">
                      {audit.company_name}
                    </Link>
                  </td>
                  <td className="px-3 py-2.5 text-neutral-700">
                    {audit.contact_first_name} {audit.contact_last_name}
                    <br />
                    <span className="text-xs text-neutral-500">{audit.contact_email}</span>
                  </td>
                  <td className="px-3 py-2.5 text-neutral-700">{audit.country}</td>
                  <td className="px-3 py-2.5 text-neutral-700">{AUDIT_STATUS_LABELS_FR[audit.status]}</td>
                  <td className="px-3 py-2.5 text-neutral-700">{audit.progress_percent}%</td>
                  <td className="px-3 py-2.5 text-neutral-700">
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
