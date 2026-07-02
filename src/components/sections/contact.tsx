import { SectionLabel } from "@/components/ui/section-label";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { ContactForm } from "@/components/contact-form";
import { CALENDLY_URL } from "@/lib/site-config";

const bullets = [
  "Confirmation immédiate par email",
  "Appel téléphonique de 30 minutes",
  "Sans engagement",
];

export function Contact() {
  return (
    <section id="contact" className="bg-navy-800 py-32">
      <FadeIn className="cnt">
        <div className="mx-auto mb-20 max-w-[600px] text-center">
          <SectionLabel align="center" tone="dark" className="mb-7">
            Prenons contact
          </SectionLabel>
          <h2 className="mb-6 font-display text-[clamp(2.25rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white">
            Prenez le temps d&apos;en parler.
          </h2>
          <p className="text-md leading-relaxed text-white/50">
            Premier échange de 30 minutes, sans engagement et sans pression commerciale. L&apos;objectif est
            simplement de comprendre votre situation.
          </p>
        </div>

        <div className="mx-auto grid max-w-[960px] grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Option A : Calendly */}
          <div className="flex flex-col gap-7 rounded-b-lg border border-gold-400/25 border-t-[3px] bg-gold-400/7 px-10 py-12">
            <div>
              <div className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-gold-400">
                Option 1
              </div>
              <h3 className="mb-3.5 font-display text-2xl font-bold text-white">Demander un rappel</h3>
              <p className="text-base leading-loose text-white/55">
                Choisissez un créneau directement dans l&apos;agenda d&apos;Olivier. Vous recevez une
                confirmation immédiate. L&apos;entretien dure 30 minutes.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {bullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-3">
                  <div className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gold-400" />
                  <span className="text-sm text-white/55">{bullet}</span>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <Button variant="gold" size="lg" href={CALENDLY_URL}>
                Choisir un créneau
              </Button>
            </div>
          </div>

          {/* Option B : Formulaire */}
          <div>
            <div className="mb-7 text-[10px] font-semibold uppercase tracking-widest text-white/35">
              Option 2 — Nous écrire
            </div>
            <ContactForm />
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
