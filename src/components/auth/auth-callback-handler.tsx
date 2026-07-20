"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

interface AuthCallbackHandlerProps {
  /** Where to send the user once the session is established, if no `next` param is present. */
  fallbackPath: string;
  /** Where to send the user if the link is invalid/expired. */
  loginPath: string;
  /** When true and no `next` param is present, look up the signed-in prospect's own audit and redirect there instead of `fallbackPath`. A plain flag (rather than a callback prop) so this Client Component can be passed props from a Server Component page. */
  lookupOwnAudit?: boolean;
}

/**
 * Completes sign-in for both link shapes we can receive:
 * - Admin-issued invitation/magic links (`supabase.auth.admin.generateLink`)
 *   redirect with the session in the URL hash (`#access_token=...`), which
 *   only client-side JS can read.
 * - Self-requested links (`signInWithOtp` from `MagicLinkForm`, PKCE flow)
 *   redirect with `?code=...`, exchanged via the same browser that holds
 *   the matching code verifier cookie.
 * Runs entirely client-side so both cases are handled uniformly, then
 * hands off to the server (session cookies are set by the browser client)
 * via a full navigation to `next`.
 */
export function AuthCallbackHandler({
  fallbackPath,
  loginPath,
  lookupOwnAudit = false,
}: AuthCallbackHandlerProps) {
  const router = useRouter();
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function completeSignIn() {
      const supabase = createSupabaseBrowserClient();
      const searchParams = new URLSearchParams(window.location.search);
      const explicitNext = searchParams.get("next");
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));

      let ok = false;

      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");
      if (accessToken && refreshToken) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        ok = !sessionError;
      } else {
        const code = searchParams.get("code");
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          ok = !exchangeError;
        }
      }

      if (cancelled) return;
      if (!ok) {
        setError(true);
        return;
      }

      let next = explicitNext;
      if (!next && lookupOwnAudit) {
        const { data } = await supabase.from("audits").select("id").limit(1).maybeSingle();
        next = data ? `/audit/${data.id}` : null;
      }

      if (!cancelled) router.replace(next || fallbackPath);
    }

    completeSignIn();
    return () => {
      cancelled = true;
    };
  }, [router, fallbackPath, lookupOwnAudit]);

  if (error) {
    router.replace(`${loginPath}?error=lien_invalide`);
    return null;
  }

  return (
    <p className="text-sm text-neutral-600" role="status" aria-live="polite">
      Connexion en cours…
    </p>
  );
}
