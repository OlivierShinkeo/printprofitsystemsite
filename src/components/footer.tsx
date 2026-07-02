import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/content";
import { CALENDLY_URL, CONTACT_EMAIL, SITE_URL } from "@/lib/site-config";

const footerLinkClass = "text-sm text-white/48 transition-colors duration-200 hover:text-gold-400";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-950 pb-10 pt-16">
      <div className="cnt">
        <div className="flex flex-wrap items-start justify-between gap-12 border-b border-white/5 pb-12">
          <div className="max-w-[280px]">
            <Image
              src="/images/logo-blanc-or.png"
              alt="Print Profit System™"
              width={842}
              height={153}
              className="mb-5 h-[30px] w-auto"
            />
            <p className="text-[0.9375rem] leading-relaxed text-white/34">
              Cabinet de conseil spécialisé dans la rentabilité des imprimeries de 10 à 100 salariés.
            </p>
          </div>

          <div className="flex flex-col gap-3.5">
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/20">
              Navigation
            </div>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={footerLinkClass}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3.5">
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/20">
              Contact
            </div>
            <a href={CALENDLY_URL} className={footerLinkClass} target="_blank" rel="noopener noreferrer">
              Demander un rappel
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className={footerLinkClass}>
              {CONTACT_EMAIL}
            </a>
            <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className={footerLinkClass}>
              printprofitsystem.fr
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8">
          <p className="text-[11px] text-white/20">
            © {new Date().getFullYear()} Print Profit System™. Tous droits réservés.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="/mentions-legales" className={`${footerLinkClass} text-[11px]`}>
              Mentions légales
            </Link>
            <Link href="/confidentialite" className={`${footerLinkClass} text-[11px]`}>
              Politique de confidentialité
            </Link>
            <Link href="/conditions-generales-de-vente" className={`${footerLinkClass} text-[11px]`}>
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
