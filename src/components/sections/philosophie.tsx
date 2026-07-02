import { SectionLabel } from "@/components/ui/section-label";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/cn";

const convictions = [
  {
    title: "Observer",
    body: "Nous ne commençons jamais par proposer des solutions. Nous commençons par comprendre.",
  },
  {
    title: "Quantifier",
    body: "Chaque perte est mesurée avant d'être traitée. Rien n'est basé sur des impressions.",
  },
  {
    title: "Corriger",
    body: "Les actions sont concrètes, applicables immédiatement, sans perturber votre production.",
  },
];

export function Philosophie() {
  return (
    <section id="philosophie" className="bg-white py-32">
      <FadeIn className="cnt-n">
        <SectionLabel className="mb-12">Notre philosophie</SectionLabel>
        <h2 className="mb-11 font-display text-[clamp(2rem,3.5vw,2.875rem)] font-bold leading-snug tracking-tight text-navy-800">
          Produire davantage n&apos;est pas toujours la solution
        </h2>
        <div className="mb-14 flex flex-col gap-6">
          <p className="text-md leading-loose text-neutral-700">
            Dans une imprimerie qui fonctionne, l&apos;atelier tourne, les commandes sortent, les équipes
            s&apos;activent. Pourtant, les résultats ne reflètent pas cet effort. Le réflexe habituel est
            d&apos;accélérer&nbsp;: décrocher de nouveaux marchés, investir dans une nouvelle presse,
            optimiser les devis.
          </p>
          <p className="text-md leading-loose text-neutral-700">
            Ce réflexe est compréhensible. Mais il part d&apos;une hypothèse fausse&nbsp;: que le problème
            vient d&apos;un manque de volume. Dans la plupart des cas que nous observons, ce n&apos;est pas
            le cas.{" "}
            <strong className="font-semibold text-navy-800">
              Les pertes invisibles coûtent souvent plus cher que les pertes visibles.
            </strong>{" "}
            Et elles sont déjà là, dans vos ateliers, dans vos flux, dans vos habitudes.
          </p>
          <p className="text-md leading-loose text-neutral-700">
            Avant d&apos;investir, il faut récupérer ce qui est déjà perdu. C&apos;est là que tout commence.
          </p>
        </div>

        <div className="mb-14 grid grid-cols-1 overflow-hidden rounded-lg border border-neutral-100 sm:grid-cols-3">
          {convictions.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                "border-neutral-100 px-8 py-7",
                index < convictions.length - 1 && "border-b sm:border-r sm:border-b-0"
              )}
            >
              <div className="mb-2.5 font-display text-2xl font-bold leading-none text-gold-600">
                {item.title}
              </div>
              <p className="text-sm leading-relaxed text-neutral-600">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-r-md border-l-[3px] border-gold-400 bg-cream px-11 py-9">
          <p className="font-display text-[clamp(1.2rem,2vw,1.625rem)] font-semibold italic leading-relaxed text-navy-800">
            « Nous refusons qu&apos;une entreprise travaille toujours plus pour gagner toujours moins. La
            rentabilité se construit d&apos;abord par l&apos;organisation. »
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
