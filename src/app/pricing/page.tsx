import type { Metadata } from "next";
import Link from "next/link";
import PricingTable from "@/components/site/PricingTable";
import PricingComparison from "@/components/site/PricingComparison";
import PricingPaymentSteps from "@/components/site/PricingPaymentSteps";
import PricingFaq from "@/components/site/PricingFaq";
import { FAQS, REFUND_FAQ_ANSWER } from "@/components/site/pricing-faqs";
import { LockIcon } from "@/components/ui/icons";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/site-config";

const TITLE = "Pricing - Update Resume & Cover Letter with AI | Ripimoo";
const DESCRIPTION =
  "Discover our pricing plans for AI-powered CV and cover letter updates. Choose the right option to keep your job application documents real and professional";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "website",
    images: [OG_IMAGE],
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/pricing`,
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default async function PricingPage() {
  // Showcase build: the real session check (Supabase auth) is private
  // backend code and isn't included here, so this always renders the
  // signed-out state.
  const isSignedIn = false;
  const consoleHref = isSignedIn ? "/console" : "/sign-in?redirect=/console";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer ?? REFUND_FAQ_ANSWER },
    })),
  };

  return (
    <div className="space-y-20 px-6 py-20 sm:space-y-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          Start free. Pay once for a month or a year — no subscription, no
          auto-renewal.
        </p>
        <p className="mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-accent">
          <LockIcon className="h-4 w-4" />
          Your documents stay yours. We never change your facts.
        </p>
      </div>

      <div className="mx-auto max-w-5xl">
        <PricingTable />
      </div>

      <div className="mx-auto max-w-5xl">
        <PricingComparison />
      </div>

      <div className="mx-auto max-w-5xl">
        <PricingPaymentSteps />
      </div>

      <PricingFaq />

      <section className="mx-auto max-w-3xl text-center">
        <div className="rounded-2xl border border-line bg-paper-soft p-8 sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Ready to calibrate your CV with 100% factual confidence?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">
            Start free with 2 updates every day. Upgrade to a fixed 1-month or
            1-year period anytime without recurring commitments.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={consoleHref}
              className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-accent px-6 text-sm font-semibold text-paper transition hover:bg-accent-strong sm:w-auto"
            >
              {isSignedIn ? "Open Console" : "Start Free (2 updates/day)"}
            </Link>
            <Link
              href="/about"
              className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-line bg-paper px-6 text-sm font-semibold text-ink transition hover:bg-paper-soft sm:w-auto"
            >
              How We Protect Your Facts
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-ink-soft">
            <Link href="/refund-policy" className="hover:text-accent hover:underline">Refund Policy</Link>
            <span>&middot;</span>
            <Link href="/terms" className="hover:text-accent hover:underline">Terms and Conditions</Link>
            <span>&middot;</span>
            <Link href="/privacy" className="hover:text-accent hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
