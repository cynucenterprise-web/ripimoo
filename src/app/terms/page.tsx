import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { TERMS_VERSION } from "@/lib/legal-versions";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/site-config";

const TITLE = "Terms and Conditions | Ripimoo";
// Grammar fix per the launch task: the source had a stray comma before
// "Learn more" ("...services, Learn more."), read as a run-on; a period
// correctly starts it as its own sentence, same meaning, same length.
const DESCRIPTION =
  "Read Ripimoo's terms and conditions to understand the rules, policies, and guidelines that apply when using our website and services. Learn more.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "website",
    images: [OG_IMAGE],
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/terms`,
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions" updated={TERMS_VERSION}>
      <p>By using Ripimoo, you agree to the following:</p>

      <h2>What the service does</h2>
      <p>
        Ripimoo edits documents you upload (CV and/or cover letter) to better
        align them with a job description you provide. It does not fabricate
        experience, qualifications, or credentials you do not already have,
        and it does not generate documents from scratch.
      </p>

      <h2>Your responsibility</h2>
      <p>
        You&apos;re responsible for the accuracy of the documents you upload
        and for reviewing any AI-updated output before using it in a real job
        application. Ripimoo is a drafting aid, not a guarantee of
        job-search outcomes.
      </p>

      <h2>Accounts</h2>
      <p>
        Access requires signing in with a Google account. You&apos;re
        responsible for keeping that Google account secure, since it&apos;s
        the only way to access your Ripimoo account.
      </p>

      <h2>Plans and usage limits</h2>
      <p>
        Free and paid plans come with daily usage limits as described on the{" "}
        <a href="/pricing" className="underline">
          Pricing
        </a>{" "}
        page. Paid plans do not auto-renew; you&apos;ll be notified by email
        before your billing period ends.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You agree not to upload documents you don&apos;t have the right to
        use, attempt to abuse or circumvent usage limits, or use the service
        for any unlawful purpose.
      </p>

      <h2>Service availability</h2>
      <p>
        We aim for high reliability but don&apos;t guarantee uninterrupted
        access; the service may occasionally be unavailable for maintenance
        or due to factors outside our control.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms or the service itself over time; continued
        use after changes means you accept the update.
      </p>
    </LegalPage>
  );
}
