import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendAuditReminderEmail } from "@/lib/email/audit-reminder";
import { SITE_URL } from "@/lib/site-config";

export const runtime = "nodejs";

/** Days of inactivity before a reminder is due, and between two reminders. */
const REMINDER_DELAY_DAYS = 3;
/** Stop nagging a prospect after this many reminders — they've been told enough. */
const MAX_REMINDERS = 3;

interface ReminderCandidate {
  id: string;
  contact_email: string;
  contact_first_name: string;
  company_name: string;
  status: "invited" | "in_progress";
  invited_at: string;
  last_saved_at: string | null;
  progress_percent: number;
  last_reminder_sent_at: string | null;
  reminder_count: number;
}

function daysSince(iso: string, now: number): number {
  return (now - new Date(iso).getTime()) / (1000 * 60 * 60 * 24);
}

/** Triggered daily by Vercel Cron (see vercel.json). Relance les audits invités/en cours restés inactifs. */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const admin = createSupabaseAdminClient();
  const { data: candidates, error } = await admin
    .from("audits")
    .select(
      "id, contact_email, contact_first_name, company_name, status, invited_at, last_saved_at, progress_percent, last_reminder_sent_at, reminder_count"
    )
    .in("status", ["invited", "in_progress"])
    .is("deleted_at", null)
    .lt("reminder_count", MAX_REMINDERS)
    .returns<ReminderCandidate[]>();

  if (error) {
    console.error("Cron audit-reminders: select failed", error);
    return NextResponse.json({ error: "Échec de la lecture des audits." }, { status: 500 });
  }

  const now = Date.now();
  let sent = 0;

  for (const audit of candidates ?? []) {
    const lastActivity = audit.last_saved_at ?? audit.invited_at;
    if (daysSince(lastActivity, now) < REMINDER_DELAY_DAYS) continue;
    if (audit.last_reminder_sent_at && daysSince(audit.last_reminder_sent_at, now) < REMINDER_DELAY_DAYS) {
      continue;
    }

    const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
      type: "magiclink",
      email: audit.contact_email,
      options: {
        redirectTo: `${SITE_URL}/audit/auth/callback?next=${encodeURIComponent(`/audit/${audit.id}`)}`,
      },
    });

    if (linkError || !linkData?.properties?.action_link) {
      console.error("Cron audit-reminders: generateLink failed", audit.id, linkError);
      continue;
    }

    await sendAuditReminderEmail({
      to: audit.contact_email,
      firstName: audit.contact_first_name,
      companyName: audit.company_name,
      magicLink: linkData.properties.action_link,
      progressPercent: audit.progress_percent,
    });

    await admin
      .from("audits")
      .update({ last_reminder_sent_at: new Date().toISOString(), reminder_count: audit.reminder_count + 1 })
      .eq("id", audit.id);

    sent += 1;
  }

  return NextResponse.json({ checked: candidates?.length ?? 0, sent });
}
