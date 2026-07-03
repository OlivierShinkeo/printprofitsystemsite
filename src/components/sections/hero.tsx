import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

export function Hero() {
  return (
    <section id="hero" className="flex min-h-screen items-center bg-navy-800 pb-20 pt-25">
      <div className="cnt">
        <FadeIn className="grid grid-cols-1 items-center gap-20 lg:grid-cols-[55fr_45fr]">
          <div>
            <div className="mb-9 flex items-center gap-4">
              <span className="h-px w-8 flex-shrink-0 bg-gold-400" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-400">
                Spécialiste rentabilité — Imprimeries
              </span>
            </div>

            <h1 className="mb-7 font-display text-[clamp(2.75rem,5vw,4.5rem)] font-extrabold leading-tight tracking-tightest text-white">
              Votre carnet de commandes est plein.
              <br />
              <span className="text-gold-400">Pourtant, vos marges s&apos;érodent.</span>
            </h1>

            <p className="mb-11 max-w-[500px] text-md leading-loose text-white/60">
              Print Profit System™ accompagne les dirigeants d&apos;imprimeries dans l&apos;identification et
              l&apos;élimination des{" "}
              <strong className="font-medium text-white/85">Pertes Invisibles™</strong> — ces pertes
              structurelles qui consomment votre rentabilité sans apparaître sur aucun tableau de bord.
            </p>

            <div className="mb-15 flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="gold" size="lg" href="/#contact">
                  Demander un rappel
                </Button>
                <Button variant="dark-outline" size="lg" href="/#contact">
                  Nous écrire
                </Button>
              </div>
              <p className="text-sm leading-relaxed text-white/50">
                Premier échange de 30 minutes — sans engagement et sans pression commerciale.
                <br />
                L&apos;objectif est simplement de comprendre votre situation.
              </p>
            </div>

            <div className="flex flex-wrap gap-10 border-t border-white/8 pt-8">
              <div>
                <div className="font-display text-4xl font-bold leading-none text-gold-400">+18%</div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-white/50">
                  De marge récupérée
                </div>
              </div>
              <div>
                <div className="font-display text-4xl font-bold leading-none text-gold-400">6–12</div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-white/50">
                  Mois d&apos;accompagnement
                </div>
              </div>
              <div>
                <div className="font-display text-4xl font-bold leading-none text-gold-400">10–100</div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-white/50">
                  Salariés — cœur de cible
                </div>
              </div>
            </div>
          </div>

          <div className="hidden items-center justify-center lg:flex">
            <div className="relative">
              <div className="pointer-events-none absolute -inset-4.5 rounded-lg border border-gold-400/20" />
              <div className="pointer-events-none absolute -inset-9 rounded-xl border border-gold-400/7" />
              <Image
                src="/images/portrait-bureau.png"
                alt="Olivier Puyravaud — Fondateur, Print Profit System™"
                width={400}
                height={534}
                priority
                fetchPriority="high"
                sizes="400px"
                className="block h-auto w-full max-w-[400px] rounded-md"
              />
              <div className="absolute -bottom-6 left-5 right-5 rounded-md border border-gold-400/20 bg-navy-950/90 px-5 py-4 backdrop-blur-sm">
                <div className="text-sm font-semibold text-white">Olivier Puyravaud</div>
                <div className="mt-0.5 text-xs tracking-wide text-white/50">
                  Fondateur — Print Profit System™
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
