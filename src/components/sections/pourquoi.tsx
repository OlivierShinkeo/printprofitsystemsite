import { SectionLabel } from "@/components/ui/section-label";
import { FadeIn } from "@/components/ui/fade-in";
import { pillars } from "@/lib/content";

export function Pourquoi() {
  return (
    <section id="pourquoi" className="bg-cream py-32">
      <FadeIn className="cnt">
        <div className="mx-auto mb-18 max-w-[600px] text-center">
          <SectionLabel align="center" className="mb-7">
            Notre différence
          </SectionLabel>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.875rem)] font-bold leading-snug tracking-tight text-navy-800">
            Une approche qui produit des résultats mesurables
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.num} className="flex flex-col gap-4">
              <div
                aria-hidden="true"
                className="font-display text-[3.25rem] font-extrabold leading-none tracking-tight text-navy-800/7"
              >
                {pillar.num}
              </div>
              <div className="h-0.5 w-7 rounded-sm bg-gold-400" />
              <h3 className="font-display text-xl font-bold text-navy-800">{pillar.title}</h3>
              <p className="text-sm leading-loose text-neutral-600">{pillar.body}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
