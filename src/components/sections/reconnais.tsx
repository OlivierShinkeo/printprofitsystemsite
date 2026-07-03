import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { FadeIn } from "@/components/ui/fade-in";
import { situations } from "@/lib/content";

export function Reconnais() {
  return (
    <section id="reconnais" className="bg-cream py-32">
      <FadeIn className="cnt">
        <div className="mx-auto mb-18 max-w-[700px] text-center">
          <SectionLabel align="center" className="mb-7">
            Votre quotidien
          </SectionLabel>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.875rem)] font-bold leading-snug tracking-tight text-navy-800">
            Vous vous reconnaîtrez peut-être dans ces situations…
          </h2>
        </div>

        <div className="mx-auto grid max-w-[920px] grid-cols-1 gap-5 lg:grid-cols-2">
          {situations.map((sit) => (
            <div
              key={sit.n}
              className="rounded-lg border-l-[3px] border-gold-400 bg-white px-9 py-8 shadow-[0_2px_12px_rgba(15,26,46,0.06)]"
            >
              <div
                aria-hidden="true"
                className="mb-3.5 font-display text-4xl font-extrabold leading-none tracking-tight text-gold-400/18"
              >
                {sit.n}
              </div>
              <p className="text-lg leading-loose italic text-neutral-700">{sit.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="mx-auto mb-8 max-w-[560px] text-base italic text-neutral-500">
            Si vous avez hoché la tête en lisant ces lignes, nous pouvons probablement vous aider.
          </p>
          <Button variant="primary" size="md" href="/#contact">
            Échanger sur ma situation
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
