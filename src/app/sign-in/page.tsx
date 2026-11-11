import type { Metadata } from "next";
import Link from "next/link";
import SignInForm from "./SignInForm";
import { safeRedirectPath } from "@/lib/safe-redirect";
import Card from "@/components/ui/Card";
import Banner from "@/components/ui/Banner";
import RipimooLogo from "@/components/ui/RipimooLogo";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/site-config";

const TITLE = "Sign In - CV and Cover Letter Update Platform | Ripimoo";
const DESCRIPTION =
  "Sign in to Ripimoo to access your CV and cover letter update platform, manage your documents, and keep your professional profile up to date.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/sign-in" },
  // Crawlable (not blocked in robots.txt) so Google can actually see this
  // noindex tag — a robots.txt block would hide the page from crawling
  // entirely, which can leave a bare URL indexed with no snippet instead.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    images: [OG_IMAGE],
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/sign-in`,
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
    title: TITLE,
    description: DESCRIPTION,
  },
};

const ERROR_MESSAGES: Record<string, string> = {
  oauth_cancelled: "Google sign-in was cancelled. You can try again whenever you're ready.",
  consent_required: "You need to agree to the policies before continuing with Google.",
  link_invalid: "That sign-in attempt is invalid or has expired. Please try again.",
  rate_limited: "Too many sign-in attempts from your network — please wait a few minutes and try again.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string; error?: string }>;
}) {
  const params = await searchParams;
  const redirectTo = safeRedirectPath(params.redirect, "/console");
  const errorMessage = params.error ? ERROR_MESSAGES[params.error] : undefined;

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-6 py-12">
      <div className="space-y-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft transition-colors hover:text-ink">
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Back to Home
        </Link>

        {errorMessage && (
          <Banner variant="error" title="Sign-in issue">
            {errorMessage}
          </Banner>
        )}

        <Card padding="lg" className="space-y-6 shadow-lg">
          <div className="space-y-2 text-center">
            <RipimooLogo size="lg" showWordmark={false} className="mx-auto mb-1" />
            <h1 className="text-2xl font-bold tracking-tight text-ink">Sign in / Sign up</h1>
            <p className="text-xs leading-relaxed text-ink-soft">
              Sign in to Ripimoo with your Google account — no password to remember.
            </p>
          </div>

          <SignInForm redirectTo={redirectTo} />
        </Card>
      </div>
    </div>
  );
}
