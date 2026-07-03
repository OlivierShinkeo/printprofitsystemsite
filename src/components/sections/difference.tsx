import { SectionLabel } from "@/components/ui/section-label";
import { FadeIn } from "@/components/ui/fade-in";
import { notUsList, yesList } from "@/lib/content";

export function Difference() {
  return (
    <section id="difference" className="bg-navy-800 py-32">
      <FadeIn className="cnt">
        <div className="mx-auto mb-18 max-w-[640px] text-center">
          <SectionLabel align="center" tone="dark" className="mb-7">
            Notre positionnement
          </SectionLabel>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.875rem)] font-bold leading-snug tracking-tight text-white">
            Ce que Print Profit System™ n&apos;est pas
          </h2>
        </div>

        <div className="mx-auto grid max-w-[960px] grid-cols-1 overflow-hidden rounded-lg lg:grid-cols-2">
          <div className="border border-white/8 bg-white/4 px-11 py-12">
            <div className="mb-8 text-[10px] font-semibold uppercase tracking-widest text-white/50">
              L&apos;approche habituelle
            </div>
            <div className="flex flex-col gap-5.5">
              {notUsList.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span aria-hidden="true" className="mt-0.5 flex-shrink-0 text-sm text-white/50">
                    —
                  </span>
                  <div>
                    <div className="leading-snug text-white/50 line-through decoration-white/15">
                      {item.label}
                    </div>
                    <div className="mt-1 text-[0.8125rem] leading-snug text-white/50">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-gold-400/25 border-l-[3px] bg-gold-400/7 px-11 py-12">
            <div className="mb-8 text-[10px] font-semibold uppercase tracking-widest text-gold-400">
              L&apos;approche Print Profit System™
            </div>
            <div className="flex flex-col gap-5.5">
              {yesList.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span aria-hidden="true" className="mt-0.5 flex-shrink-0 text-sm text-gold-400">
                    +
                  </span>
                  <div>
                    <div className="font-medium leading-snug text-white">{item.label}</div>
                    <div className="mt-1 text-[0.8125rem] leading-snug text-white/50">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
