import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main-content" className="flex min-h-[70vh] items-center bg-navy-800 py-32">
        <div className="cnt-n text-center">
          <div
            aria-hidden="true"
            className="mb-7 font-display text-6xl font-extrabold leading-none tracking-tightest text-gold-400/25"
          >
            404
          </div>
          <h1 className="mb-6 font-display text-[clamp(2rem,3.5vw,2.875rem)] font-bold leading-snug tracking-tight text-white">
            Cette page n&apos;existe pas.
          </h1>
          <p className="mx-auto mb-10 max-w-[440px] text-md leading-loose text-white/60">
            Le lien que vous avez suivi est peut-être incorrect, ou la page a été déplacée.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="gold" size="lg" href="/">
              Retour à l&apos;accueil
            </Button>
            <Button variant="dark-outline" size="lg" href="/#contact">
              Nous écrire
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
