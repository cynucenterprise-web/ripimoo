"use client";

import { Suspense, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { GTM_CONTAINER_ID, GA4_MEASUREMENT_ID, isTrackingExcludedPath } from "@/lib/analytics/config";
import type { ConsentChoice } from "@/lib/analytics/consent";
import CookieBanner from "./CookieBanner";
import PageViewTracker from "./PageViewTracker";
import SignupEventTracker from "./SignupEventTracker";

/**
 * Loads nothing at all on /admin, /auth/*, /api/*.
 *
 * Everywhere else: the Consent Mode v2 default-denied setup always runs
 * (pure local JS, no network request on its own — see the inline
 * script below). The actual GTM container script and the gtag.js/GA4
 * script are only added to the page once consent is "granted" — not
 * just data-restricted via Consent Mode signals while still loading, but
 * genuinely absent from the DOM, so Reject (or no choice yet) produces
 * zero requests to googletagmanager.com, exactly as required.
 */
export default function AnalyticsGate({ initialConsent }: { initialConsent: ConsentChoice | null }) {
  const pathname = usePathname();
  const [consent, setConsent] = useState<ConsentChoice | null>(initialConsent);

  if (isTrackingExcludedPath(pathname)) return null;

  return (
    <>
      {/* Plain server-rendered inline script, not next/script — guaranteed
          to run before any afterInteractive script (those are injected
          post-hydration), which is what actually matters here, not any
          Next-specific "beforeInteractive" mechanism this fork of Next's
          App Router runtime (vinext) may not fully replicate. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
window.gtag=gtag;
${initialConsent === "granted" ? "gtag('consent','update',{analytics_storage:'granted'});" : ""}`,
        }}
      />

      {consent === "granted" && (
        <>
          <Script id="gtm-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`}
          </Script>
          <Script
            id="gtm-loader"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`}
          />
          <Script
            id="gtag-loader"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};gtag('js',new Date());gtag('config','${GA4_MEASUREMENT_ID}',{send_page_view:false});`}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
          <Suspense fallback={null}>
            <PageViewTracker />
          </Suspense>
        </>
      )}

      <Suspense fallback={null}>
        <SignupEventTracker />
      </Suspense>

      <CookieBanner initialConsent={initialConsent} onChoice={setConsent} />
    </>
  );
}
