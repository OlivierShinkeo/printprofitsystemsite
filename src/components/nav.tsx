"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function Nav() {
  const pathname = usePathname();
  // The transparent-over-dark-hero treatment only makes sense on the
  // homepage. Other pages (legal pages, 404) open on a light section,
  // so the nav must start opaque there or the white logo/links vanish.
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Close the mobile menu whenever the route changes (e.g. a link inside it
  // triggers a full navigation rather than an in-page anchor scroll).
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    // Keep the rest of the page out of the tab order and off-screen-reader
    // radar while the full-screen mobile menu is open.
    const main = document.getElementById("main-content");
    const footer = document.querySelector("footer");
    if (menuOpen) {
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
      firstMenuLinkRef.current?.focus();
    } else {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    }

    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // If the viewport crosses back into the desktop breakpoint while the
  // mobile menu is open (e.g. rotating a tablet), close it — otherwise the
  // now-hidden overlay would leave the page `inert`/unscrollable underneath.
  // Keep this threshold in sync with `--breakpoint-lg` in globals.css.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 960px)");
    const handleChange = () => {
      if (mql.matches) setMenuOpen(false);
    };
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      <nav
        aria-label="Navigation principale"
        className={cn(
          "fixed inset-x-0 top-0 z-[1000] h-18 transition-[background-color,box-shadow,backdrop-filter] duration-[350ms] ease-out",
          scrolled ? "bg-navy-900/97 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[10px]" : "bg-navy-800/0"
        )}
      >
        <div className="cnt flex h-full items-center justify-between">
          <Link href="/#hero" className="flex flex-shrink-0 items-center">
            <Image
              src="/images/logo-blanc-or.png"
              alt="Print Profit System™"
              width={842}
              height={153}
              priority
              fetchPriority="high"
              className="h-[34px] w-auto"
            />
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium tracking-wide text-white/68 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button variant="gold" size="sm" href="/#contact">
              Demander un rappel
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex flex-col gap-[5px] p-1.5 lg:hidden"
          >
            <span className="block h-[1.5px] w-[22px] rounded-sm bg-white transition-all duration-200" />
            <span className="block h-[1.5px] w-[22px] rounded-sm bg-white transition-all duration-200" />
            <span className="block h-[1.5px] w-3.5 rounded-sm bg-white transition-all duration-200" />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-x-0 bottom-0 top-18 z-[999] flex flex-col items-center justify-center gap-10 bg-navy-900 lg:hidden"
      >
        {navLinks.map((link, index) => (
          <Link
            key={link.href}
            ref={index === 0 ? firstMenuLinkRef : undefined}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="text-xl text-white/80"
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-6">
          <Button variant="gold" size="lg" href="/#contact" onClick={() => setMenuOpen(false)}>
            Demander un rappel
          </Button>
        </div>
      </div>
    </>
  );
}
