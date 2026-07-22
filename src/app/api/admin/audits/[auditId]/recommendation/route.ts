import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/audit/types";

export const runtime = "nodejs";

const RECOMMENDATION_VALUES = new Set(["recommended", "conditional", "not_recommended"]);

export async function PUT(request: Request, { params }: { params: Promise<{ auditId: string }> }) {
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

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const recommendation =
    typeof body.recommendation === "string" && RECOMMENDATION_VALUES.has(body.recommendation)
      ? body.recommendation
      : null;

  const { error: upsertError } = await supabase.from("audit_recommendations").upsert(
    {
      audit_id: auditId,
      maturity_level: body.maturityLevel || null,
      organization_level: body.organizationLevel || null,
      growth_potential: body.growthPotential || null,
      compatibility: body.compatibility || null,
      main_needs: body.mainNeeds || null,
      risks: body.risks || null,
      recommendation,
      comment: body.comment || null,
      updated_by: callerProfile.id,
    },
    { onConflict: "audit_id" }
  );

  if (upsertError) {
    return NextResponse.json({ error: "Impossible d'enregistrer l'analyse." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
