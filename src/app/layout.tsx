import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import AnalyticsGate from "@/components/site/analytics/AnalyticsGate";
import { CONSENT_COOKIE_NAME } from "@/lib/analytics/config";
import type { ConsentChoice } from "@/lib/analytics/consent";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/site-config";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Every page-level metadata export below supplies its own full, final
// title (ending in "| Ripimoo") via `title: { absolute: ... }` rather than
// relying on this template — Next.js metadata merging is shallow per key
// (see generate-metadata.md's "Merging" section for this vinext version),
// so a plain `title: "X"` string here would still run through the
// `%s — Ripimoo` template and double up the branding. The template stays
// only as a safety net for any route that doesn't set its own title.
const HOME_TITLE = "Free Resume Update Online | AI Featured | Ripimoo";
const HOME_DESCRIPTION =
  "Updating curriculum vitae for every job can be hard. We made it easier to craft CV online with AI to refresh your resume within few seconds, try for free.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  verification: {
    google: "MfMKLvwZieayf9wHGOtBmRmXZJfkBji3Rq3BtiKWsqo",
  },
  openGraph: {
    type: "website",
    images: [OG_IMAGE],
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const rawConsent = cookieStore.get(CONSENT_COOKIE_NAME)?.value;
  const initialConsent: ConsentChoice | null = rawConsent === "granted" || rawConsent === "denied" ? rawConsent : null;

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AnalyticsGate initialConsent={initialConsent} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
