import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AuditProtectedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ auditId: string }>;
}) {
  const { auditId } = await params;
  const supabase = await createSupabaseServerClient();

  // RLS (`audits_select_own_or_admin`) returns zero rows for an audit that
  // isn't the caller's own — a prospect guessing another audit's ID sees
  // the same 404 as a nonexistent one, with no distinguishing signal.
  const { data: audit } = await supabase.from("audits").select("id").eq("id", auditId).maybeSingle();
  if (!audit) notFound();

  return <div className="min-h-screen bg-cream">{children}</div>;
}
