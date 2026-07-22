import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

/**
 * Chrome for the public marketing site only — /admin and /audit get their
 * own minimal `<main>` wrapper instead (no nav/footer marketing CTAs).
 * `<main>` wraps only the page content here, as a true sibling of Nav —
 * Nav toggles `inert` on #main-content when the mobile menu opens, which
 * would disable Nav itself if it were nested inside main.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
