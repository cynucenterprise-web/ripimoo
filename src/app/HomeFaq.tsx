"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";
import { FAQS } from "./home-faqs";

export default function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl space-y-6 px-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Frequently asked questions</h2>
        <p className="text-sm text-ink-soft">Straight answers about our architecture, privacy, and policies.</p>
      </div>

      <div className="space-y-3 pt-4">
        {FAQS.map((faq, index) => {
          const isOpen = open === index;
          return (
            <div key={faq.question} className="overflow-hidden rounded-xl border border-line bg-paper">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left text-sm font-semibold text-ink hover:text-accent"
                >
                  <span>{faq.question}</span>
                  <ChevronDownIcon className={`h-4 w-4 shrink-0 text-ink-soft transition-transform ${isOpen ? "rotate-180 text-accent" : ""}`} />
                </button>
              </h3>
              {isOpen && (
                <div className="border-t border-line px-4 pb-4 pt-3 text-xs leading-relaxed text-ink-soft">{faq.answer}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
