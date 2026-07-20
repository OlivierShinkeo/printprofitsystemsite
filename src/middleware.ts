import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Scoped to /audit and /admin only (see `matcher` below) — the public
 * marketing site never goes through Supabase and is unaffected even if
 * the Supabase env vars are absent. Refreshes the session cookie on
 * every request (required by @supabase/ssr) and redirects unauth'd
 * visitors to the relevant login page. Role checks (admin vs prospect)
 * and audit ownership are enforced by RLS + the route's own layout,
 * not here — this is only the cheap first gate.
 */
export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isPublicAuthPath = pathname.endsWith("/login") || pathname.includes("/auth/callback");

  if (!user && !isPublicAuthPath) {
    const loginPath = pathname.startsWith("/admin") ? "/admin/login" : "/audit/login";
    const redirectUrl = new URL(loginPath, request.url);
    redirectUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/audit/:path*", "/admin/:path*"],
};
