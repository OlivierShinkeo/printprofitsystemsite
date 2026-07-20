import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { validateInvite, type InvitePayload } from "@/lib/audit/invite-schema";
import { sendAuditInvitationEmail } from "@/lib/email/audit-invitation";
import { clientIpFrom, isRateLimited } from "@/lib/rate-limit";
import { SITE_URL } from "@/lib/site-config";
import type { Profile } from "@/lib/audit/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (isRateLimited(clientIpFrom(request))) {
    return NextResponse.json(
      { error: "Trop de demandes. Merci de réessayer dans quelques minutes." },
      { status: 429 }
    );
  }

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

  let body: Partial<InvitePayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const errors = validateInvite(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const payload: InvitePayload = {
    firstName: body.firstName!.trim(),
    lastName: body.lastName!.trim(),
    email: body.email!.trim().toLowerCase(),
    companyName: body.companyName!.trim(),
    country: body.country!.trim(),
    invitedAt: body.invitedAt?.trim() || new Date().toISOString().slice(0, 10),
  };

  const admin = createSupabaseAdminClient();

  const { data: existingProfile } = await admin
    .from("profiles")
    .select("id")
    .eq("email", payload.email)
    .maybeSingle<{ id: string }>();

  let prospectProfileId: string;

  if (existingProfile) {
    prospectProfileId = existingProfile.id;
  } else {
    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email: payload.email,
      email_confirm: true,
    });
    if (createError || !created.user) {
      console.error("Invite: createUser failed", createError);
      return NextResponse.json({ error: "Impossible de créer le prospect." }, { status: 502 });
    }
    prospectProfileId = created.user.id;

    const { error: profileError } = await admin.from("profiles").insert({
      id: prospectProfileId,
      role: "prospect",
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
    });
    if (profileError) {
      console.error("Invite: profile insert failed", profileError);
      return NextResponse.json({ error: "Impossible de créer le prospect." }, { status: 502 });
    }
  }

  const { data: audit, error: auditError } = await admin
    .from("audits")
    .insert({
      prospect_profile_id: prospectProfileId,
      created_by_admin_id: callerProfile.id,
      company_name: payload.companyName,
      country: payload.country,
      contact_first_name: payload.firstName,
      contact_last_name: payload.lastName,
      contact_email: payload.email,
      invited_at: new Date(payload.invitedAt).toISOString(),
    })
    .select("id")
    .single<{ id: string }>();

  if (auditError || !audit) {
    console.error("Invite: audit insert failed", auditError);
    return NextResponse.json({ error: "Impossible de créer l'audit." }, { status: 502 });
  }

  const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email: payload.email,
    options: {
      redirectTo: `${SITE_URL}/audit/auth/callback?next=${encodeURIComponent(`/audit/${audit.id}`)}`,
    },
  });

  if (linkError || !linkData?.properties?.action_link) {
    console.error("Invite: generateLink failed", linkError);
    return NextResponse.json(
      { error: "L'audit a été créé mais l'envoi du lien a échoué. Réessayez depuis la liste des audits." },
      { status: 502 }
    );
  }

  await sendAuditInvitationEmail({
    to: payload.email,
    firstName: payload.firstName,
    companyName: payload.companyName,
    magicLink: linkData.properties.action_link,
  });

  return NextResponse.json({ ok: true, auditId: audit.id });
}
