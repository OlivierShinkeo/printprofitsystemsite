import { cn } from "@/lib/cn";

interface SectionLabelProps {
  children: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

/** Eyebrow label — gold rule(s) + uppercase text, used above every section heading. */
export function SectionLabel({ children, align = "left", tone = "light", className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-4", align === "center" && "justify-center", className)}>
      <span className="h-px w-8 flex-shrink-0 bg-gold-400" />
      <span
        className={cn(
          "text-[11px] font-semibold uppercase tracking-widest",
          tone === "dark" ? "text-gold-400" : "text-gold-600"
        )}
      >
        {children}
      </span>
      {align === "center" && <span className="h-px w-8 flex-shrink-0 bg-gold-400" />}
    </div>
  );
}
