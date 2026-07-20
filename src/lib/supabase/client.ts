import { createBrowserClient } from "@supabase/ssr";

export type SupabaseBrowserClient = ReturnType<typeof createBrowserClient>;

/** Supabase client for Client Components — reads the public anon key only. */
export function createSupabaseBrowserClient(): SupabaseBrowserClient {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
