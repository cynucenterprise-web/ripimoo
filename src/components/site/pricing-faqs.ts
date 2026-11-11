/**
 * Two answers here deliberately depart from the design prototype's copy:
 * the refund question is corrected to match the real Refund Policy
 * (all sales final — the prototype invented a refund process that
 * doesn't exist), and the payment-methods question is kept generic
 * per the redesign rule against listing specific payment brands.
 *
 * Kept in its own plain (non-"use client") module so both PricingFaq.tsx
 * (the rendered accordion) and pricing/page.tsx (the FAQPage JSON-LD) can
 * import the same data without crossing the client/server boundary.
 */
export const REFUND_FAQ_ANSWER =
  "No. All sales are final — because Ripimoo provides immediate access to AI processing capacity upon payment, we don't offer refunds once a plan has been purchased. Review the plan details and usage limits carefully before purchasing. See our Refund Policy for details.";

export const FAQS = [
  {
    id: "what-counts",
    question: "What counts as an update?",
    answer:
      "Each CV or cover letter tailoring consumes 1 credit. Updating both together against the same job description consumes 2 credits. Reviewing diffs, applying or undoing changes, and downloading your documents never cost extra.",
  },
  {
    id: "auto-renew",
    question: "Does it renew automatically?",
    answer:
      "No. Paid plans are one-time purchases for a fixed period (1 month or 1 year). We never charge your card automatically after your period ends.",
  },
  {
    id: "plan-ends",
    question: "What happens when my plan ends?",
    answer:
      "Your account returns to the Free tier (2 updates/day). All of your saved documents stay in your account — nothing is deleted.",
  },
  {
    id: "refund",
    question: "Can I get a refund?",
    answer: null,
  },
  {
    id: "reset-time",
    question: "When does my daily limit reset?",
    answer: "Every day at 00:00 UTC, regardless of your local timezone.",
  },
  {
    id: "payment-methods",
    question: "Which payment methods can I use?",
    answer: "Payment is handled securely by Paddle, our merchant of record — available methods are shown at checkout.",
  },
  {
    id: "free-card",
    question: "Do I need a credit card for the Free plan?",
    answer: "No. The Free plan needs no card or payment details — you get 2 updates a day as soon as you create an account.",
  },
];
