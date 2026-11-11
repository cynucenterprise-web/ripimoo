import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { REFUND_POLICY_VERSION } from "@/lib/legal-versions";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/site-config";

const TITLE = "Refund Policy and Guidelines for Customers | Ripimoo";
// Grammar fix per the launch task: the source was missing a space
// ("concerns.Learn more.").
const DESCRIPTION =
  "Read Ripimoo's refund policy to understand the terms, conditions, and guidelines regarding refund requests and payment-related concerns. Learn more.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/refund-policy" },
  openGraph: {
    type: "website",
    images: [OG_IMAGE],
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/refund-policy`,
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy" updated={REFUND_POLICY_VERSION}>
      <p>
        All sales are final. Because Ripimoo provides immediate access to AI
        processing capacity upon payment, <strong>we do not offer refunds</strong>{" "}
        once a plan has been purchased, whether monthly or yearly. Please
        review the plan details, pricing, and usage limits carefully before
        purchasing.
      </p>
      <p>
        If you have questions about a plan before buying, contact us at{" "}
        <a href="mailto:support@ripimoo.com" className="underline">
          support@ripimoo.com
        </a>{" "}
        and we&apos;re happy to help you choose correctly.
      </p>
    </LegalPage>
  );
}
