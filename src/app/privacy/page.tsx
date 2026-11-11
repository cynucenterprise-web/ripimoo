import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { PRIVACY_POLICY_VERSION } from "@/lib/legal-versions";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/site-config";

const TITLE = "Privacy Policy and Data Protection Guidelines | Ripimoo";
const DESCRIPTION =
  "Learn how Ripimoo collects, uses, and protects your personal information, and understand your privacy rights when using our website and services.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    images: [OG_IMAGE],
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/privacy`,
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated={PRIVACY_POLICY_VERSION}>
      <h2>What we collect</h2>
      <p>
        Your email address, uploaded CV/cover letter content, job
        descriptions you paste in, and basic account/billing status.
      </p>

      <h2>Why we collect it</h2>
      <p>
        To provide the core service (parsing and updating your documents),
        manage your account and usage limits, and process payments.
      </p>

      <h2>Document retention</h2>
      <p>
        Uploaded and generated documents are retained only as long as needed
        to provide the service, or as long as you choose to keep them saved
        in your account; you can delete them at any time.
      </p>

      <h2>Third parties we use</h2>
      <ul>
        <li>Anthropic — to process document text through the AI model</li>
        <li>Supabase — authentication, database, storage</li>
        <li>
          Paddle — payment processing; they handle payment details
          directly, we never see your full card information
        </li>
        <li>Cloudflare — hosting/infrastructure</li>
        <li>
          Google Analytics and Google Tag Manager — site-usage analytics,
          only after you accept analytics cookies (see our{" "}
          <a href="/cookie-policy" className="underline">
            Cookie Policy
          </a>{" "}
          for cookie names and
          retention). We never send Google your name, email, CV or cover
          letter content, job descriptions, file names, or document IDs —
          only anonymous usage events like page views and which features
          were used.
        </li>
      </ul>

      <h2>Your rights</h2>
      <p>
        You can request access to, correction of, or deletion of your
        personal data at any time by contacting us.
      </p>

      <h2>Security</h2>
      <p>
        Data is encrypted in transit and at rest; access to your data is
        restricted to what&apos;s needed to operate the service.
      </p>
    </LegalPage>
  );
}
