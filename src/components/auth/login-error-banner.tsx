const MESSAGES: Record<string, string> = {
  lien_invalide:
    "Ce lien n'est plus valide (expiré, déjà utilisé, ou ouvert par un scanner de sécurité de messagerie). Merci d'en redemander un ci-dessous.",
  acces_refuse: "Cet accès est réservé aux administrateurs.",
};

export function LoginErrorBanner({ error }: { error?: string }) {
  if (!error || !MESSAGES[error]) return null;

  return (
    <p className="mb-6 rounded-md border border-[#8b2020]/30 bg-[#8b2020]/5 px-4 py-3 text-sm leading-relaxed text-[#8b2020]">
      {MESSAGES[error]}
    </p>
  );
}
