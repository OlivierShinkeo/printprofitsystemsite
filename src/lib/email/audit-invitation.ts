import { getTransporter, escapeHtml, defaultFromAddress } from "@/lib/email/transporter";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

interface SendAuditInvitationArgs {
  to: string;
  firstName: string;
  companyName: string;
  magicLink: string;
}

const LOGIN_FALLBACK_URL = `${SITE_URL}/audit/login`;

/** Invitation email for the "Audit de faisabilité" — sent from the admin invite flow (Nodemailer/SMTP, not Supabase's own auth email, so the content stays fully on-brand). */
export async function sendAuditInvitationEmail({
  to,
  firstName,
  companyName,
  magicLink,
}: SendAuditInvitationArgs) {
  const transporter = getTransporter();
  if (!transporter) return; // SMTP not configured in this environment yet.

  await transporter.sendMail({
    to,
    from: defaultFromAddress(),
    subject: "Votre audit de faisabilité Print Profit System™",
    text: [
      `Bonjour ${firstName},`,
      "",
      `Vous êtes invité(e) à compléter l'audit de faisabilité Print Profit System™ pour ${companyName}.`,
      "",
      "Cet audit nous permet de mieux comprendre votre entreprise, votre organisation et vos enjeux afin de déterminer si Print Profit System™ est adapté à votre situation.",
      "",
      `Comptez environ 30 à 45 minutes. Vous pouvez répondre en plusieurs fois : vos réponses sont sauvegardées automatiquement et vous pouvez reprendre à tout moment.`,
      "",
      `Accéder à votre audit : ${magicLink}`,
      "",
      "Ce lien est personnel, à usage strictement individuel.",
      "",
      `Si ce lien ne fonctionne pas (certaines messageries l'invalident en le pré-chargeant automatiquement), rendez-vous sur ${LOGIN_FALLBACK_URL} et connectez-vous avec l'adresse ${to} pour recevoir un nouveau lien et un code de secours.`,
    ].join("\n"),
    html: `
      <p>Bonjour ${escapeHtml(firstName)},</p>
      <p>Vous êtes invité(e) à compléter l'audit de faisabilité <strong>${SITE_NAME}</strong> pour <strong>${escapeHtml(companyName)}</strong>.</p>
      <p>Cet audit nous permet de mieux comprendre votre entreprise, votre organisation et vos enjeux afin de déterminer si Print Profit System™ est adapté à votre situation.</p>
      <p>Comptez environ 30 à 45 minutes. Vous pouvez répondre en plusieurs fois&nbsp;: vos réponses sont sauvegardées automatiquement et vous pouvez reprendre à tout moment, depuis n'importe quel appareil.</p>
      <p><a href="${magicLink}" style="display:inline-block;padding:12px 24px;background:#162040;color:#ffffff;text-decoration:none;border-radius:4px;">Accéder à votre audit</a></p>
      <p style="font-size:13px;color:#565249;">Ce lien est personnel, à usage strictement individuel. Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur&nbsp;:<br>${escapeHtml(magicLink)}</p>
      <p style="font-size:13px;color:#565249;">Le lien ne fonctionne toujours pas&nbsp;? Certaines messageries l'invalident en le pré-chargeant automatiquement. Rendez-vous sur <a href="${LOGIN_FALLBACK_URL}">${LOGIN_FALLBACK_URL}</a> et connectez-vous avec l'adresse ${escapeHtml(to)} pour recevoir un nouveau lien et un code de secours à saisir manuellement.</p>
    `,
  });
}
