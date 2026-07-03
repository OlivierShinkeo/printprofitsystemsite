import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { piExamples } from "@/lib/content";

export function PertesInvisibles() {
  return (
    <section id="pertes-invisibles" className="bg-white py-32">
      <FadeIn className="cnt">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-10 flex items-center gap-4">
              <span className="h-px w-8 flex-shrink-0 bg-gold-400" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-600">
                Notre angle d&apos;analyse
              </span>
            </div>
            <h2 className="mb-8 font-display text-[clamp(2rem,3.5vw,2.875rem)] font-bold leading-snug tracking-tight text-navy-800">
              Les Pertes Invisibles™&nbsp;: le vrai levier de rentabilité
            </h2>
            <div className="mb-10 flex flex-col gap-5">
              <p className="text-md leading-loose text-neutral-700">
                Dans chaque imprimerie, il existe deux types de pertes. Les pertes visibles — on les
                connaît, on en parle, on essaie de les corriger. Et les Pertes Invisibles™ — celles que
                personne ne mesure parce que tout le monde les a normalisées.
              </p>
              <p className="text-md leading-loose text-neutral-700">
                Les problèmes visibles cachent souvent des causes invisibles. C&apos;est là, dans ce qui
                n&apos;est pas mesuré, que se joue l&apos;essentiel de votre rentabilité. Ces pertes
                représentent en moyenne{" "}
                <strong className="font-semibold text-navy-800">
                  8 à 22 % de la marge brute potentielle
                </strong>{" "}
                — sans apparaître sur aucun tableau de bord.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2.5 text-md font-semibold tracking-wide text-gold-600 transition-colors duration-200 hover:text-gold-400"
            >
              Identifier mes Pertes Invisibles™ <span className="text-base">→</span>
            </Link>
          </div>

          <div className="overflow-hidden rounded-lg border border-neutral-100 shadow-xl">
            <div className="bg-cream px-9 py-7">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[9px] font-semibold uppercase tracking-widest text-gold-600">
                  Ce que vous voyez
                </span>
                <span className="font-display text-[1.375rem] font-bold leading-none text-gold-400/40">
                  ~20%
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <span className="rounded-sm bg-navy-800/6 px-3.5 py-1.5 text-xs font-medium text-neutral-600">
                  Retards livraison
                </span>
                <span className="rounded-sm bg-navy-800/6 px-3.5 py-1.5 text-xs font-medium text-neutral-600">
                  Reprises fréquentes
                </span>
                <span className="rounded-sm bg-navy-800/6 px-3.5 py-1.5 text-xs font-medium text-neutral-600">
                  Urgences permanentes
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gold-400/8 px-9 py-2.5">
              <div className="h-px flex-1 bg-gold-400/35" />
              <span className="flex-shrink-0 text-[8px] font-semibold uppercase tracking-widest text-gold-400/65">
                Ligne de visibilité
              </span>
              <div className="h-px flex-1 bg-gold-400/35" />
            </div>

            <div className="bg-navy-900 px-9 pb-10 pt-9">
              <div className="mb-6 flex items-start justify-between">
                <span className="text-[9px] font-semibold uppercase tracking-widest text-gold-400">
                  Les Pertes Invisibles™
                </span>
                <span className="font-display text-[1.375rem] font-bold leading-none text-gold-400/35">
                  ~80%
                </span>
              </div>
              <div className="mb-7 flex flex-col gap-3.5">
                {piExamples.map((ex) => (
                  <div key={ex.title} className="flex items-baseline gap-3.5">
                    <div className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-gold-400" />
                    <div>
                      <span className="text-sm font-semibold text-white/82">{ex.title}</span>
                      <span className="ml-2 text-[0.8125rem] text-white/50">{ex.stat}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/6 pt-5">
                <p className="text-[0.8125rem] italic leading-relaxed text-white/50">
                  Invisibles dans votre comptabilité. Absents de vos tableaux de bord. Pourtant bien réels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
