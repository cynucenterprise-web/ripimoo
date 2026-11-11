"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "@/components/ui/icons";

// Showcase build: the real Paddle checkout + Supabase session check are
// private payment/backend code and aren't included here. PlanTier is
// redefined locally (it's just a string union, nothing sensitive) so the
// visible plan cards, pricing and billing-cycle toggle still render
// exactly as in production; choosing any plan routes to sign-in instead
// of opening a real checkout.
type PlanTier = "pro" | "unlimited";

type BillingCycle = "monthly" | "yearly";

const PLANS: {
  name: string;
  tier: "free" | PlanTier;
  tagline: string;
  dailyLimit: string;
  monthlyPrice: string;
  yearlyMonthlyPrice: string;
  yearlyBilledAs: string;
  highlight?: boolean;
  features: string[];
}[] = [
  {
    name: "Free",
    tier: "free",
    tagline: "Occasional applications and trying Ripimoo out.",
    dailyLimit: "2 updates/day",
    monthlyPrice: "$0",
    yearlyMonthlyPrice: "$0",
    yearlyBilledAs: "$0",
    features: [
      "2 updates per day",
      "CV and cover letter tailoring",
      "PDF and Word (DOCX) import/export",
      "Locked-facts protection",
      "Apply / Skip / Undo on every change",
      "Match score before and after",
    ],
  },
  {
    name: "Pro",
    tier: "pro",
    tagline: "For active job seekers applying to multiple roles.",
    dailyLimit: "50 updates/day",
    monthlyPrice: "$15/mo",
    yearlyMonthlyPrice: "$9/mo",
    yearlyBilledAs: "billed $108/year",
    highlight: true,
    features: [
      "50 updates per day",
      "CV and cover letter tailoring",
      "PDF and Word (DOCX) import/export",
      "Locked-facts protection",
      "Apply / Skip / Undo on every change",
      "Match score before and after",
    ],
  },
  {
    name: "Unlimited",
    tier: "unlimited",
    tagline: "For intensive job searches and career pivots.",
    dailyLimit: "Up to 100 updates/day",
    monthlyPrice: "$24/mo",
    yearlyMonthlyPrice: "$19/mo",
    yearlyBilledAs: "billed $180/year",
    features: [
      "Up to 100 updates per day",
      "CV and cover letter tailoring",
      "PDF and Word (DOCX) import/export",
      "Locked-facts protection",
      "Apply / Skip / Undo on every change",
      "Match score before and after",
    ],
  },
];

export default function PricingTable() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [loadingTier, setLoadingTier] = useState<PlanTier | null>(null);
  const router = useRouter();

  function handleChoose(tier: "free" | PlanTier) {
    setLoadingTier(tier === "free" ? null : tier);
    router.push(`/sign-in?redirect=/pricing`);
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <div role="radiogroup" aria-label="Billing cycle" className="inline-flex rounded-xl border border-line bg-paper-soft p-1 shadow-xs">
          {(["monthly", "yearly"] as const).map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={cycle === option}
              onClick={() => setCycle(option)}
              className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
                cycle === option ? "bg-paper text-ink shadow-xs" : "text-ink-soft hover:text-ink"
              }`}
            >
              {option === "monthly" ? "1 month" : "1 year"}
            </button>
          ))}
        </div>
        <p className="text-xs font-medium text-accent">One-time payment. Not a subscription.</p>
      </div>

      <div className="mt-10 grid items-stretch gap-6 sm:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex h-full flex-col justify-between rounded-2xl p-6 sm:p-8 ${
              plan.highlight
                ? "border-2 border-accent bg-paper shadow-lg shadow-accent/10"
                : "border border-line bg-paper"
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3.5 py-1 text-xs font-semibold text-paper shadow-xs">
                Recommended
              </span>
            )}

            <div>
              {/* h2, not h3 — the page's only heading above this is pricing/page.tsx's h1,
                  and Lighthouse correctly flagged h1 -> h3 as an invalid skip. */}
              <h2 className="text-lg font-semibold text-ink">{plan.name}</h2>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">{plan.tagline}</p>

              <div className="mt-6 border-y border-line py-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-ink">
                    {cycle === "monthly" ? plan.monthlyPrice : plan.yearlyMonthlyPrice}
                  </span>
                </div>
                {cycle === "yearly" && (
                  <p className="mt-1 text-xs font-semibold text-accent">{plan.yearlyBilledAs}</p>
                )}
                <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-paper-soft px-3 py-1.5 text-xs font-semibold text-ink">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-teal" />
                  {plan.dailyLimit}
                </div>
                {/* /70 not /60 — Lighthouse measured /60 at 4.46:1 against this
                    background, just under WCAG AA's 4.5:1 minimum; /70 (already
                    used a few lines up for the yearly-billed-as text) clears it. */}
                <p className="mt-2 text-[11px] leading-snug text-ink-soft">
                  1 credit per CV or cover letter update; 2 credits to update both together.
                </p>
              </div>

              <ul className="mt-6 space-y-2.5 text-xs text-ink-soft">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 leading-snug">
                    <CheckCircleIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => handleChoose(plan.tier)}
                disabled={loadingTier === plan.tier}
                className={`inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition disabled:opacity-60 ${
                  plan.highlight
                    ? "bg-accent text-paper hover:bg-accent-strong"
                    : plan.name === "Free"
                      ? "border border-line bg-paper text-ink hover:bg-paper-soft"
                      : "bg-ink text-paper hover:bg-ink/90"
                }`}
              >
                {loadingTier === plan.tier ? "Loading…" : plan.name === "Free" ? "Start Free" : "Choose " + plan.name}
              </button>
              <p className="mt-3 text-center text-[11px] text-ink-soft">
                {plan.name === "Free" ? "No credit card or payment details required." : "Secure checkout by Paddle. Payment methods shown at checkout."}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-ink-soft">
        Plans don&apos;t auto-renew. Near the end of your billing period
        we&apos;ll email you a link to renew if you&apos;d like to continue —
        no surprise charges. Daily limits reset at 00:00 UTC for every
        account, regardless of your local timezone.
      </p>
    </div>
  );
}
