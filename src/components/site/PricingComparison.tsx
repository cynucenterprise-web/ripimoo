"use client";

import { Fragment, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "@/components/ui/icons";

interface ComparisonRow {
  featureName: string;
  category: string;
  description?: string;
  free: string | boolean;
  pro: string | boolean;
  unlimited: string | boolean;
}

const CATEGORIES = ["Limits", "Document Types", "Locked-Facts Protection", "Workflow & Match"] as const;

const ROWS: ComparisonRow[] = [
  { featureName: "Daily update capacity", category: "Limits", description: "Number of individual updates allowed each calendar day.", free: "2 updates/day", pro: "50 updates/day", unlimited: "Up to 100 updates/day" },
  { featureName: "Credit rule", category: "Limits", description: "Credit deduction per tailoring operation.", free: "1 credit per document, 2 for both together", pro: "1 credit per document, 2 for both together", unlimited: "1 credit per document, 2 for both together" },
  { featureName: "Daily reset schedule", category: "Limits", description: "When your quota replenishes.", free: "00:00 UTC", pro: "00:00 UTC", unlimited: "00:00 UTC" },
  { featureName: "CV updates", category: "Document Types", free: true, pro: true, unlimited: true },
  { featureName: "Cover letter updates", category: "Document Types", free: true, pro: true, unlimited: true },
  { featureName: "PDF support", category: "Document Types", free: true, pro: true, unlimited: true },
  { featureName: "Word (DOCX) support", category: "Document Types", free: true, pro: true, unlimited: true },
  { featureName: "Locked facts protection", category: "Locked-Facts Protection", description: "Employers, job titles, dates, and education are never rewritten.", free: true, pro: true, unlimited: true },
  { featureName: "Apply / Skip / Undo control", category: "Workflow & Match", description: "Review and decide on every suggested change individually.", free: true, pro: true, unlimited: true },
  { featureName: "Match score (before & after)", category: "Workflow & Match", free: true, pro: true, unlimited: true },
  { featureName: "“Not found in your CV” gap list", category: "Workflow & Match", description: "Flags job requirements your CV doesn't support instead of inventing them.", free: true, pro: true, unlimited: true },
];

function Value({ value, highlight }: { value: string | boolean; highlight?: boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <div className="flex justify-center">
        <span className="sr-only">Included</span>
        <div className={`flex h-5 w-5 items-center justify-center rounded-full ${highlight ? "bg-accent text-paper" : "bg-teal/15 text-ink"}`}>
          <CheckIcon className="h-3.5 w-3.5" />
        </div>
      </div>
    ) : (
      <span className="sr-only">Not included</span>
    );
  }
  return <span className={`text-xs font-semibold ${highlight ? "text-ink" : "text-ink-soft"}`}>{value}</span>;
}

export default function PricingComparison() {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    Object.fromEntries(CATEGORIES.map((c) => [c, true]))
  );

  return (
    <section aria-labelledby="comparison-heading" className="space-y-6">
      <div className="text-center">
        <h2 id="comparison-heading" className="text-2xl font-semibold text-ink sm:text-3xl">
          Detailed plan comparison
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-ink-soft">
          Every plan includes the full locked-facts engine. You only pay for higher daily capacity.
        </p>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-line bg-paper shadow-xs md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-paper-soft">
              <th scope="col" className="w-2/5 p-5 text-sm font-semibold text-ink">Feature</th>
              <th scope="col" className="w-1/5 p-5 text-center text-sm font-semibold text-ink-soft">Free</th>
              <th scope="col" className="w-1/5 border-x border-accent/20 bg-accent/5 p-5 text-center text-sm font-bold text-ink">Pro</th>
              <th scope="col" className="w-1/5 p-5 text-center text-sm font-semibold text-ink-soft">Unlimited</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line text-sm">
            {CATEGORIES.map((cat) => (
              <Fragment key={cat}>
                <tr className="bg-paper-soft/70">
                  <th colSpan={4} scope="colgroup" className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-accent">
                    {cat}
                  </th>
                </tr>
                {ROWS.filter((r) => r.category === cat).map((row) => (
                  <tr key={row.featureName} className="hover:bg-paper-soft/50">
                    <th scope="row" className="p-5 font-normal">
                      <div className="text-xs font-medium text-ink sm:text-sm">{row.featureName}</div>
                      {row.description && <div className="mt-0.5 text-[11px] text-ink-soft">{row.description}</div>}
                    </th>
                    <td className="p-4 text-center"><Value value={row.free} /></td>
                    <td className="border-x border-accent/10 bg-accent/5 p-4 text-center"><Value value={row.pro} highlight /></td>
                    <td className="p-4 text-center"><Value value={row.unlimited} /></td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile accordions */}
      <div className="space-y-3 md:hidden">
        {CATEGORIES.map((cat) => {
          const rows = ROWS.filter((r) => r.category === cat);
          const isOpen = openCategories[cat];
          return (
            <div key={cat} className="overflow-hidden rounded-xl border border-line bg-paper shadow-xs">
              <button
                type="button"
                onClick={() => setOpenCategories((prev) => ({ ...prev, [cat]: !prev[cat] }))}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between bg-paper-soft px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-accent"
              >
                <span>{cat} ({rows.length})</span>
                <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="divide-y divide-line p-2">
                  {rows.map((row) => (
                    <div key={row.featureName} className="space-y-2 p-3">
                      <div>
                        <div className="text-xs font-semibold text-ink">{row.featureName}</div>
                        {row.description && <div className="mt-0.5 text-[11px] text-ink-soft">{row.description}</div>}
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-lg border border-line bg-paper-soft p-2">
                          <span className="block text-[10px] font-bold uppercase text-ink-soft">Free</span>
                          <div className="mt-1"><Value value={row.free} /></div>
                        </div>
                        <div className="rounded-lg border border-accent/30 bg-accent/5 p-2">
                          <span className="block text-[10px] font-bold uppercase text-accent">Pro</span>
                          <div className="mt-1"><Value value={row.pro} highlight /></div>
                        </div>
                        <div className="rounded-lg border border-line bg-paper-soft p-2">
                          <span className="block text-[10px] font-bold uppercase text-ink-soft">Unlimited</span>
                          <div className="mt-1"><Value value={row.unlimited} /></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
