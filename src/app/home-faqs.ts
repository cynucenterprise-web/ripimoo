/**
 * Ported from design-reference's MOCK_FAQS with one correction: the
 * daily-limits answer said Pro=15/day and "Unlimited provides no daily
 * cap" — the real limits are Pro=50/day and Unlimited=up to 100/day
 * (fair use), matching src/lib/usage.ts and the redesign-v2 task's
 * explicit "Unlimited plan text: Up to 100 updates/day" rule.
 *
 * Kept in its own plain (non-"use client") module so both HomeFaq.tsx
 * (the rendered accordion) and page.tsx (the FAQPage JSON-LD) can import
 * the same data without crossing the client/server boundary.
 */
export const FAQS = [
  {
    question: "How does Ripimoo ensure nothing is fabricated?",
    answer:
      "Your CV is treated as the trusted record of your career. Ripimoo locks your job titles, employers, dates, degrees and figures, and only suggests clearer wording for achievements you already have. If a job needs a skill you haven't listed, we'll kindly point it out in the \"Not found in your CV\" list instead of adding it.",
  },
  {
    question: "Can I review and reject individual changes?",
    answer:
      "Yes, of course. Every suggestion appears on its own card with the before and after wording, the section it affects and the reason behind it. You can apply, skip or edit each one, so your CV always stays exactly how you want it.",
  },
  {
    question: "What file formats can I upload and download?",
    answer:
      "You can upload your CV and cover letter in PDF or Microsoft Word (.docx) format. When you download your tailored documents, Ripimoo outputs clean PDF or Word files with the original layout preserved in place.",
  },
  {
    question: "Are payments subscriptions that auto-renew?",
    answer:
      "No. Ripimoo does not use recurring subscription billing. Paid plans (Pro and Unlimited) are one-time purchases for 1 month or 1 year. Your card is never charged automatically when the period ends. If you'd like to keep using Ripimoo, you can buy a new plan whenever you're ready.",
  },
  {
    question: "How do daily update limits work?",
    answer:
      "Daily update limits reset every day at 00:00 UTC. The Free plan includes 2 updates per day. Pro includes 50 updates per day, and Unlimited provides up to 100 updates per day.",
  },
];
