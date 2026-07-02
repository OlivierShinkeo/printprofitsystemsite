import { SectionLabel } from "@/components/ui/section-label";
import { FadeIn } from "@/components/ui/fade-in";
import { steps } from "@/lib/content";

export function Methode() {
  return (
    <section id="methode" className="bg-cream py-32">
      <FadeIn className="cnt">
        <div className="mx-auto mb-20 max-w-[600px] text-center">
          <SectionLabel align="center" className="mb-7">
            Notre méthode
          </SectionLabel>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.875rem)] font-bold leading-snug tracking-tight text-navy-800">
            Cinq étapes. Une transformation durable.
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-[5%] right-[5%] top-7 hidden h-px bg-navy-800/12 lg:block" />
          <div className="relative z-10 grid grid-cols-1 gap-8 gap-x-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col gap-5 pr-5">
                <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-navy-800/20 bg-cream">
                  <span className="font-display text-base font-bold text-navy-800">{step.num}</span>
                </div>
                <div>
                  <h3 className="mb-3 font-display text-xl font-bold text-navy-800">{step.title}</h3>
                  <p className="text-sm leading-loose text-neutral-600">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
