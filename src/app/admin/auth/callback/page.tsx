import type { Metadata } from "next";
import { AuthCallbackHandler } from "@/components/auth/auth-callback-handler";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AdminAuthCallbackPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-cream px-6">
      <AuthCallbackHandler fallbackPath="/admin" loginPath="/admin/login" />
    </section>
  );
}
