import { getTransporter, escapeHtml, defaultFromAddress } from "@/lib/email/transporter";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

interface SendAuditReminderArgs {
  to: string;
  firstName: string;
  companyName: string;
  magicLink: string;
  progressPercent: number;
}

const LOGIN_FALLBACK_URL = `${SITE_URL}/audit/login`;

/** Relance envoyée à un prospect dont l'audit est resté invité/en cours plusieurs jours sans activité. */
export async function sendAuditReminderEmail({
  to,
  firstName,
  companyName,
  magicLink,
  progressPercent,
}: SendAuditReminderArgs) {
  const transporter = getTransporter();
  if (!transporter) return; // SMTP not configured in this environment yet.

  await transporter.sendMail({
    to,
    from: defaultFromAddress(),
    subject: "Votre audit de faisabilité Print Profit System™ est toujours en attente",
    text: [
      `Bonjour ${firstName},`,
      "",
      `Votre audit de faisabilité Print Profit System™ pour ${companyName} est toujours en attente (${progressPercent}% complété).`,
      "",
      "Prenez le temps nécessaire pour le terminer : plus les informations transmises sont complètes et détaillées, plus l'analyse de votre situation sera fine et les recommandations pertinentes.",
      "",
      `Reprendre votre audit : ${magicLink}`,
      "",
      "Ce lien est personnel, à usage strictement individuel.",
      "",
      `Si ce lien ne fonctionne pas (certaines messageries l'invalident en le pré-chargeant automatiquement), rendez-vous sur ${LOGIN_FALLBACK_URL} et connectez-vous avec l'adresse ${to} pour recevoir un nouveau lien et un code de secours.`,
    ].join("\n"),
    html: `
      <p>Bonjour ${escapeHtml(firstName)},</p>
      <p>Votre audit de faisabilité <strong>${SITE_NAME}</strong> pour <strong>${escapeHtml(companyName)}</strong> est toujours en attente (<strong>${progressPercent}%</strong> complété).</p>
      <p>Prenez le temps nécessaire pour le terminer&nbsp;: plus les informations transmises sont complètes et détaillées, plus l'analyse de votre situation sera fine et les recommandations pertinentes.</p>
      <p><a href="${magicLink}" style="display:inline-block;padding:12px 24px;background:#162040;color:#ffffff;text-decoration:none;border-radius:4px;">Reprendre votre audit</a></p>
      <p style="font-size:13px;color:#565249;">Ce lien est personnel, à usage strictement individuel. Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur&nbsp;:<br>${escapeHtml(magicLink)}</p>
      <p style="font-size:13px;color:#565249;">Le lien ne fonctionne toujours pas&nbsp;? Certaines messageries l'invalident en le pré-chargeant automatiquement. Rendez-vous sur <a href="${LOGIN_FALLBACK_URL}">${LOGIN_FALLBACK_URL}</a> et connectez-vous avec l'adresse ${escapeHtml(to)} pour recevoir un nouveau lien et un code de secours à saisir manuellement.</p>
    `,
  });
}
