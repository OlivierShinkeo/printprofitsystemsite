import { SectionLabel } from "@/components/ui/section-label";
import { FadeIn } from "@/components/ui/fade-in";
import { FaqAccordion } from "@/components/faq-accordion";

export function Faq() {
  return (
    <section id="faq" className="bg-cream py-32">
      <FadeIn className="cnt">
        <div className="mx-auto max-w-[740px]">
          <div className="mb-16">
            <SectionLabel className="mb-7">Questions fréquentes</SectionLabel>
            <h2 className="font-display text-[clamp(2rem,3.5vw,2.875rem)] font-bold leading-snug tracking-tight text-navy-800">
              Avant d&apos;aller plus loin
            </h2>
          </div>
          <FaqAccordion />
        </div>
      </FadeIn>
    </section>
  );
}
