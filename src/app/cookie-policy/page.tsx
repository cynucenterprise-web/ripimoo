import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { COOKIE_POLICY_VERSION } from "@/lib/legal-versions";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/site-config";

const TITLE = "Cookie Policy and Website Cookie Usage Guidelines | Ripimoo";
const DESCRIPTION =
  "Understand how we use cookies to optimize website performance, personalize your browsing experience, help you control your cookie settings and preferences.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/cookie-policy" },
  openGraph: {
    type: "website",
    images: [OG_IMAGE],
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/cookie-policy`,
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" updated={COOKIE_POLICY_VERSION}>
      <p>Ripimoo uses cookies and similar technologies for:</p>
      <ul>
        <li>
          <strong>Essential functionality</strong> — keeping you signed in
          and remembering your session, without which the service can&apos;t
          work.
        </li>
        <li>
          <strong>Security</strong> — distinguishing legitimate use from
          abuse (e.g. rate-limit enforcement).
        </li>
        <li>
          <strong>Your cookie choice</strong> — a cookie that remembers
          whether you accepted or rejected analytics cookies, so we don&apos;t
          ask you every visit.
        </li>
        <li>
          <strong>Analytics</strong> (only if you accept) — Google Analytics,
          via Google Tag Manager, to understand how the site is used in
          aggregate. These set cookies named <code>_ga</code> and{" "}
          <code>_ga_&lt;container-ID&gt;</code>, which Google retains for up
          to 14 months. No analytics cookies are set, and no analytics
          scripts load at all, until you accept.
        </li>
      </ul>
      <p>
        We do not use cookies for third-party advertising. You can change or
        withdraw your analytics choice at any time using the &quot;Cookie
        settings&quot; link in the footer of every page, or control cookies
        through your browser settings — doing the latter may affect your
        ability to stay signed in.
      </p>
    </LegalPage>
  );
}
