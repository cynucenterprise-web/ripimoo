"use client";

import { useState } from "react";

interface PipelineStep {
  step: number;
  title: string;
  badge: string;
  summary: string;
  details: string;
}

export default function PipelineStepper({ steps }: { steps: PipelineStep[] }) {
  const [active, setActive] = useState(1);
  const current = steps.find((s) => s.step === active) ?? steps[0];

  return (
    <>
      <div className="grid grid-cols-2 gap-2 pt-2 sm:grid-cols-5">
        {steps.map((s) => {
          const isActive = active === s.step;
          return (
            <button
              key={s.step}
              type="button"
              onClick={() => setActive(s.step)}
              className={`relative rounded-xl border p-3.5 text-left transition-all ${
                isActive ? "border-accent bg-paper shadow-sm ring-2 ring-accent/20" : "border-line bg-paper-soft hover:bg-paper"
              }`}
            >
              <div className="mb-1.5 flex items-center justify-between">
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${isActive ? "bg-ink text-paper" : "bg-line text-ink-soft"}`}>
                  {s.step}
                </span>
                <span className="font-mono text-[10px] text-ink-soft">0{s.step}</span>
              </div>
              <p className="truncate text-xs font-bold text-ink">{s.title}</p>
              <span className="mt-0.5 block truncate text-[10px] font-semibold text-accent">{s.badge}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4 rounded-2xl border border-teal/30 bg-teal/5 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-teal/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal text-sm font-bold text-paper shadow-xs">{current.step}</div>
            <div>
              <h3 className="text-base font-bold text-ink sm:text-lg">
                Step {current.step}: {current.title}
              </h3>
              <p className="text-xs font-medium text-accent">{current.badge}</p>
            </div>
          </div>
          <span className="rounded-full border border-teal/30 bg-paper px-2.5 py-1 text-xs font-semibold text-accent">Active guarantee</span>
        </div>

        <div className="grid grid-cols-1 gap-6 pt-1 text-xs sm:text-sm md:grid-cols-2">
          <div className="space-y-2">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-ink-soft">Operational principle</span>
            <p className="font-semibold leading-snug text-ink">{current.summary}</p>
            <p className="pt-1 text-xs leading-relaxed text-ink-soft">{current.details}</p>
          </div>
          <div className="space-y-2 rounded-xl border border-line bg-paper p-4">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-accent">Deterministic invariant rule</span>
            <p className="font-mono text-xs leading-relaxed text-ink-soft">
              ASSERT(CandidateFacts.dates == ImmutableChronology);
              <br />
              ASSERT(CandidateFacts.degrees == VerifiedOriginal);
              <br />
              RETURN CleanCalibratedText();
            </p>
            <p className="pt-1 text-[11px] italic text-ink-soft">
              If any proposed rewording violates an original fact, the rule triggers an automatic rejection.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
