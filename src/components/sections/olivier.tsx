import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";

export function Olivier() {
  return (
    <section id="olivier" className="bg-navy-800 py-32">
      <FadeIn className="cnt">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-[45fr_55fr]">
          <div className="hidden items-start justify-center lg:flex">
            <div className="relative">
              <div className="pointer-events-none absolute -inset-3 rounded-md border border-gold-400/18" />
              <Image
                src="/images/portrait-noir.png"
                alt="Olivier Puyravaud"
                width={340}
                height={454}
                sizes="340px"
                className="block h-auto w-full max-w-[340px] rounded-md"
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-8 flex-shrink-0 bg-gold-400" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-400">
                  Une histoire de terrain
                </span>
              </div>
              <h2 className="mb-1.5 font-display text-[clamp(2rem,3.5vw,2.875rem)] font-bold leading-tight tracking-tight text-white">
                Pourquoi Print Profit System™ existe
              </h2>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-gold-400">
                Olivier Puyravaud — Fondateur
              </p>
            </div>

            <div className="flex flex-col gap-5.5">
              <p className="text-md leading-loose text-white/68">
                J&apos;ai passé de nombreuses années à travailler dans et autour des imprimeries. À observer
                des dirigeants qui faisaient bien leur métier — des gens sérieux, compétents, qui
                connaissaient leur production mieux que quiconque.
              </p>
              <p className="text-md leading-loose text-white/68">
                Et pourtant. Malgré un atelier qui tournait, un carnet de commandes rempli et des équipes
                mobilisées, les résultats ne suivaient pas. Les marges restaient fragiles, la trésorerie
                tendue, la croissance sans rentabilité réelle.
              </p>
              <p className="text-md leading-loose text-white/68">
                En observant de plus près, j&apos;ai compris quelque chose&nbsp;: le problème n&apos;était
                pas la compétence. Ce n&apos;était pas non plus le volume de travail. C&apos;était la
                visibilité. Ces dirigeants ne voyaient pas où leur marge partait — parce que les pertes qui
                les affectaient le plus ne se voyaient pas.
              </p>
              <p className="text-md leading-loose text-white/68">
                J&apos;ai créé Print Profit System™ pour une seule raison&nbsp;: je refuse qu&apos;une
                imprimerie qui travaille sérieusement ne soit pas rémunérée à la hauteur de cet effort. Pas
                parce que le marché est difficile. Mais parce que personne n&apos;avait encore regardé au
                bon endroit.
              </p>
            </div>

            <div className="rounded-md border border-gold-400/20 bg-gold-400/4 px-8 py-7">
              <p className="font-display text-xl font-semibold italic leading-relaxed text-white/85">
                « Je préfère observer avant de proposer. Parce qu&apos;une bonne solution au mauvais
                problème ne sert à rien. »
              </p>
              <p className="mt-3.5 text-sm text-white/35">— Olivier Puyravaud</p>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
