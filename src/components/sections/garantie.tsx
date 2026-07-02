import { SectionLabel } from "@/components/ui/section-label";
import { FadeIn } from "@/components/ui/fade-in";
import { resultsStats } from "@/lib/content";

export function Garantie() {
  return (
    <section id="resultats" className="bg-white py-32">
      <FadeIn className="cnt">
        <div className="mx-auto mb-16 max-w-[600px] text-center">
          <SectionLabel align="center" className="mb-7">
            Nos résultats
          </SectionLabel>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.875rem)] font-bold leading-snug tracking-tight text-navy-800">
            Ce que nos accompagnements produisent en moyenne
          </h2>
        </div>

        <div className="mx-auto grid max-w-[720px] grid-cols-1 gap-10 sm:grid-cols-3">
          {resultsStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-5xl font-extrabold leading-none text-gold-600">
                {stat.value}
              </div>
              <div className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-[820px] rounded-lg border-l-[3px] border-gold-400 bg-cream px-11 py-9">
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gold-600">
            Garantie Print Profit System™
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-display text-lg font-semibold leading-snug text-navy-800">
              Nous croyons suffisamment en notre méthode pour prendre un engagement fort.
            </p>
            <p className="text-md leading-loose text-neutral-700">
              Si, dans les <strong className="font-semibold text-navy-800">90 premiers jours</strong>,
              nous n&apos;identifions pas ensemble des leviers permettant de viser au minimum{" "}
              <strong className="font-semibold text-navy-800">cinq points de marge récupérables</strong>,
              nous prolongeons l&apos;accompagnement gratuitement jusqu&apos;à atteindre cet objectif.
            </p>
            <p className="text-sm italic leading-relaxed text-neutral-500">
              Cette garantie traduit notre confiance dans notre méthode et notre volonté
              d&apos;obtenir des résultats concrets.
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
