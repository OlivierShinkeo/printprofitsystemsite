import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/audit/types";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role, first_name, last_name, email")
    .eq("id", user.id)
    .single<Profile>();

  if (profile?.role !== "admin") redirect("/admin/login?error=acces_refuse");

  return <div className="min-h-screen bg-cream">{children}</div>;
}
