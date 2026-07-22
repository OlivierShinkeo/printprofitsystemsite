import { getTransporter, escapeHtml, defaultFromAddress } from "@/lib/email/transporter";
import { SITE_NAME, SITE_URL, ADMIN_EMAIL } from "@/lib/site-config";

interface SendAdminNotificationArgs {
  companyName: string;
  contactName: string;
  auditId: string;
}

/** Sent to the admin the moment a prospect submits their audit — reuses the same SMTP as the invitation email. */
export async function sendAdminNotificationEmail({
  companyName,
  contactName,
  auditId,
}: SendAdminNotificationArgs) {
  const transporter = getTransporter();
  if (!transporter) return; // SMTP not configured in this environment yet.

  const to = process.env.ADMIN_NOTIFICATION_EMAIL_TO || ADMIN_EMAIL;
  const adminUrl = `${SITE_URL}/admin`;

  await transporter.sendMail({
    to,
    from: defaultFromAddress(),
    subject: `Nouvel audit soumis — ${companyName}`,
    text: [
      `${contactName} (${companyName}) vient de soumettre son audit de faisabilité ${SITE_NAME}.`,
      "",
      `Consultez-le depuis votre tableau de bord : ${adminUrl}`,
      `(identifiant de l'audit : ${auditId})`,
    ].join("\n"),
    html: `
      <p><strong>${escapeHtml(contactName)}</strong> (${escapeHtml(companyName)}) vient de soumettre son audit de faisabilité <strong>${SITE_NAME}</strong>.</p>
      <p><a href="${adminUrl}">Consulter depuis le tableau de bord</a></p>
    `,
  });
}
