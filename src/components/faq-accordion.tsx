"use client";

import { useId, useState } from "react";
import { faqs } from "@/lib/content";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={faq.q} className="border-b border-neutral-200">
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="group flex w-full items-center justify-between gap-6 py-8 text-left"
            >
              <span className="flex-1 font-display text-[1.1875rem] font-semibold leading-snug text-navy-800 transition-colors duration-200 group-hover:text-gold-600">
                {faq.q}
              </span>
              <span className="flex h-6.5 w-6.5 flex-shrink-0 items-center justify-center rounded-full border border-neutral-300 text-lg leading-none text-gold-600 transition-colors duration-200">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-8"
            >
              <p className="text-[1.0625rem] leading-loose text-neutral-700">{faq.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
