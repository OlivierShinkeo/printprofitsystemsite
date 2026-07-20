import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/contact-schema";
import { clientIpFrom, isRateLimited } from "@/lib/rate-limit";
import { CONTACT_EMAIL } from "@/lib/site-config";
import { getTransporter, escapeHtml, sanitizeHeaderValue, defaultFromAddress } from "@/lib/email/transporter";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (isRateLimited(clientIpFrom(request))) {
    return NextResponse.json(
      { error: "Trop de demandes. Merci de réessayer dans quelques minutes." },
      { status: 429 }
    );
  }

  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot — bots fill every field, real visitors never see/fill this one.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const payload: ContactPayload = {
    nom: sanitizeHeaderValue(body.nom!),
    entreprise: sanitizeHeaderValue(body.entreprise!),
    telephone: sanitizeHeaderValue(body.telephone ?? ""),
    email: sanitizeHeaderValue(body.email!),
    message: body.message?.trim() ?? "",
    website: "",
  };

  const emailConfigured = Boolean(getTransporter());
  const webhookConfigured = Boolean(process.env.WEBHOOK_URL);

  const [emailResult, webhookResult] = await Promise.allSettled([
    sendEmail(payload),
    forwardToWebhook(payload),
  ]);

  if (emailConfigured && emailResult.status === "rejected") {
    console.error("Contact form: email sending failed", emailResult.reason);
  }
  if (webhookConfigured && webhookResult.status === "rejected") {
    console.error("Contact form: webhook forwarding failed", webhookResult.reason);
  }

  const anyConfigured = emailConfigured || webhookConfigured;
  const anySucceeded =
    (emailConfigured && emailResult.status === "fulfilled") ||
    (webhookConfigured && webhookResult.status === "fulfilled");

  // If nothing is configured yet (dev/staging), accept the submission so the
  // form can be demoed/tested. If something is configured, at least one
  // configured channel must have actually succeeded.
  if (anyConfigured && !anySucceeded) {
    return NextResponse.json(
      { error: "Votre message n'a pas pu être transmis. Merci de réessayer ou de nous appeler directement." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

async function sendEmail(payload: ContactPayload) {
  const transporter = getTransporter();
  if (!transporter) return; // SMTP not configured in this environment yet.

  // Defaults to the site's official contact address so submissions land in
  // the right inbox even if CONTACT_EMAIL_TO is never explicitly set.
  const to = process.env.CONTACT_EMAIL_TO || CONTACT_EMAIL;
  const from = defaultFromAddress();

  await transporter.sendMail({
    to,
    from,
    replyTo: payload.email,
    subject: `Nouvelle demande de contact — ${payload.entreprise}`,
    text: [
      `Nom : ${payload.nom}`,
      `Entreprise : ${payload.entreprise}`,
      `Téléphone : ${payload.telephone || "—"}`,
      `Email : ${payload.email}`,
      "",
      "Message :",
      payload.message || "—",
    ].join("\n"),
    html: `
      <h2>Nouvelle demande de contact — Print Profit System™</h2>
      <p><strong>Nom :</strong> ${escapeHtml(payload.nom)}</p>
      <p><strong>Entreprise :</strong> ${escapeHtml(payload.entreprise)}</p>
      <p><strong>Téléphone :</strong> ${escapeHtml(payload.telephone || "—")}</p>
      <p><strong>Email :</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Message :</strong></p>
      <p>${escapeHtml(payload.message || "—").replace(/\n/g, "<br>")}</p>
    `,
  });
}

async function forwardToWebhook(payload: ContactPayload) {
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) return; // Not configured in this environment yet.

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, source: "printprofitsystem.fr", submittedAt: new Date().toISOString() }),
  });

  if (!response.ok) {
    throw new Error(`Webhook responded with status ${response.status}`);
  }
}
