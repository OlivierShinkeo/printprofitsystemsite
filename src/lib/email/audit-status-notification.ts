import { getTransporter, escapeHtml, defaultFromAddress } from "@/lib/email/transporter";
import { SITE_NAME } from "@/lib/site-config";
import { AUDIT_STATUS_LABELS_FR, type AuditStatus } from "@/lib/audit/status";

interface SendAuditStatusNotificationArgs {
  to: string;
  firstName: string;
  companyName: string;
  status: AuditStatus;
}

/** Sent to the prospect when their audit reaches a status they should be told about — always says a team member will reach out, never the internal analysis details (those stay for the call). */
export async function sendAuditStatusNotificationEmail({
  to,
  firstName,
  companyName,
  status,
}: SendAuditStatusNotificationArgs) {
  const transporter = getTransporter();
  if (!transporter) return; // SMTP not configured in this environment yet.

  const statusLabel = AUDIT_STATUS_LABELS_FR[status];

  await transporter.sendMail({
    to,
    from: defaultFromAddress(),
    subject: `Votre audit de faisabilité Print Profit System™ — mise à jour`,
    text: [
      `Bonjour ${firstName},`,
      "",
      `Le statut de votre audit de faisabilité Print Profit System™ pour ${companyName} vient d'être mis à jour : ${statusLabel}.`,
      "",
      "Un membre de notre équipe va vous contacter prochainement pour échanger à ce sujet.",
      "",
      "À bientôt,",
      `L'équipe ${SITE_NAME}`,
    ].join("\n"),
    html: `
      <p>Bonjour ${escapeHtml(firstName)},</p>
      <p>Le statut de votre audit de faisabilité <strong>${SITE_NAME}</strong> pour <strong>${escapeHtml(companyName)}</strong> vient d'être mis à jour : <strong>${escapeHtml(statusLabel)}</strong>.</p>
      <p>Un membre de notre équipe va vous contacter prochainement pour échanger à ce sujet.</p>
      <p>À bientôt,<br>L'équipe ${SITE_NAME}</p>
    `,
  });
}
