import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import ContactForm from "./ContactForm";
import { MailIcon } from "@/components/ui/icons";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/site-config";

// Description corrected per the launch task: the source meta doc had
// /contact's URL and description swapped with /about's.
const TITLE = "Contact Us for New Updates and News | Ripimoo";
const DESCRIPTION =
  "Contact Ripimoo for help with CV and cover letter updates, your account, payments or refunds. Send us a message and our support team will get back to you.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    images: [OG_IMAGE],
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/contact`,
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="border-b border-line pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-ink">Contact &amp; Support</h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Questions about a plan, a bug to report, or feedback on the product — reach the Ripimoo team
          directly.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-5">
        <div className="md:col-span-2">
          <Card padding="md" className="space-y-1">
            <h2 className="text-sm font-semibold text-ink">Direct Contact</h2>
            <div className="flex items-start gap-2.5 pt-1">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                <p className="text-xs font-medium text-ink-soft">Support Email</p>
                <a href="mailto:support@ripimoo.com" className="text-sm font-semibold text-accent hover:underline">
                  support@ripimoo.com
                </a>
              </div>
            </div>
          </Card>
        </div>

        <Card padding="lg" className="md:col-span-3">
          <ContactForm />
        </Card>
      </div>
    </div>
  );
}
