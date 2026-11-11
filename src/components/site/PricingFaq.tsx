"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@/components/ui/icons";
import { FAQS } from "./pricing-faqs";

export default function PricingFaq() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ "what-counts": true });

  return (
    <section aria-labelledby="pricing-faq-heading" className="mx-auto max-w-3xl space-y-6">
      <div className="text-center">
        <h2 id="pricing-faq-heading" className="text-2xl font-semibold text-ink sm:text-3xl">
          Frequently asked questions
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-ink-soft">
          Straight answers about billing, limits, and policies.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq) => {
          const isOpen = Boolean(openIds[faq.id]);
          return (
            <div key={faq.id} className="overflow-hidden rounded-xl border border-line bg-paper shadow-xs">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIds((prev) => ({ ...prev, [faq.id]: !prev[faq.id] }))}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-ink hover:text-accent"
                >
                  <span>{faq.question}</span>
                  <ChevronDownIcon className={`h-4 w-4 shrink-0 text-ink-soft transition-transform ${isOpen ? "rotate-180 text-accent" : ""}`} />
                </button>
              </h3>
              {isOpen && (
                <div className="border-t border-line px-5 pb-5 pt-3 text-xs leading-relaxed text-ink-soft sm:text-sm">
                  {faq.id === "refund" ? (
                    <>
                      No. All sales are final — because Ripimoo provides immediate access to AI
                      processing capacity upon payment, we don&apos;t offer refunds once a plan has
                      been purchased. Review the plan details and usage limits carefully before
                      purchasing. See our{" "}
                      <Link href="/refund-policy" className="font-medium text-accent hover:underline">
                        Refund Policy
                      </Link>{" "}
                      for details.
                    </>
                  ) : (
                    faq.answer
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
