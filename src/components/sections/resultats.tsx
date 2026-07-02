import { SectionLabel } from "@/components/ui/section-label";
import { FadeIn } from "@/components/ui/fade-in";
import { testimonials } from "@/lib/content";

export function Resultats() {
  return (
    <section id="resultats" className="bg-white py-32">
      <FadeIn className="cnt">
        <div className="mx-auto mb-16 max-w-[600px] text-center">
          <SectionLabel align="center" className="mb-7">
            Résultats clients
          </SectionLabel>
          <h2 className="mb-5 font-display text-[clamp(2rem,3.5vw,2.875rem)] font-bold leading-snug tracking-tight text-navy-800">
            Ce que disent nos clients
          </h2>
          <p className="text-base italic text-neutral-400">
            Nos premiers témoignages et études de cas arrivent. En attendant, voici ce que nos
            accompagnements produisent.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name + t.metric}
              className="relative flex flex-col gap-6 overflow-hidden rounded-lg border border-neutral-100 bg-cream px-9 py-10"
            >
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gold-400" />
              <div className="mt-2 font-display text-[3.5rem] font-extrabold leading-[0.8] text-gold-400/18">
                &ldquo;
              </div>
              <div>
                <div className="mb-1.5 font-display text-4xl font-bold leading-none text-gold-600">
                  {t.metric}
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                  {t.metricLabel}
                </div>
              </div>
              <p className="flex-1 text-md leading-loose italic text-neutral-600">{t.quote}</p>
              <div className="border-t border-neutral-100 pt-5">
                <div className="text-sm font-semibold text-navy-800">{t.name}</div>
                <div className="mt-[3px] text-[0.8125rem] text-neutral-400">{t.role}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm italic text-neutral-300">
          Les témoignages complets et études de cas seront publiés ici au cours des prochains mois.
        </p>
      </FadeIn>
    </section>
  );
}
