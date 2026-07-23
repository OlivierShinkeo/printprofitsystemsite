"use client";

import { Button, type ButtonVariant, type ButtonSize } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface PrintButtonProps {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/** Triggers the browser's print dialog — the reader chooses "Enregistrer en PDF" to export. */
export function PrintButton({ label = "Imprimer / Enregistrer en PDF", variant = "secondary", size = "md", className }: PrintButtonProps) {
  return (
    <Button type="button" variant={variant} size={size} className={cn("no-print", className)} onClick={() => window.print()}>
      {label}
    </Button>
  );
}
