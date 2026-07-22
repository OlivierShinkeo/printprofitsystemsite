import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/audit/types";

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: Promise<{ auditId: string }> }) {
  const { auditId } = await params;
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const { data: callerProfile } = await supabase
    .from("profiles")
    .select("id, role, first_name, last_name, email")
    .eq("id", user.id)
    .single<Profile>();

  if (callerProfile?.role !== "admin") {
    return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  }

  let body: { note?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const note = body.note?.trim();
  if (!note) {
    return NextResponse.json({ error: "La note ne peut pas être vide." }, { status: 400 });
  }

  const { data: created, error: insertError } = await supabase
    .from("admin_notes")
    .insert({ audit_id: auditId, admin_id: callerProfile.id, note })
    .select("id, note, created_at")
    .single();

  if (insertError || !created) {
    return NextResponse.json({ error: "Impossible d'enregistrer la note." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, note: created });
}
