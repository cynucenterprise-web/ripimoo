"use client";

/**
 * Exactly one page_view per route (including the first load — gtag.js's
 * own automatic initial page_view is disabled via send_page_view:false
 * on the config call, so this manual call is the ONLY source). Pushed
 * to dataLayer too, as a Custom Event GTM tags can trigger on, but GA4
 * reporting itself comes entirely from the direct gtag() call below —
 * see ANALYTICS.md for why (no GA4 tag exists inside the GTM
 * container in this setup, to avoid double counting).
 */
export function trackPageView(pathname: string): void {
  if (typeof window === "undefined") return;
  const pageLocation = window.location.origin + pathname;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "page_view", page_path: pathname, page_location: pageLocation, page_title: document.title });
  window.gtag?.("event", "page_view", { page_path: pathname, page_location: pageLocation, page_title: document.title });
}
