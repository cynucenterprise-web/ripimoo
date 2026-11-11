"use client";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * One call site per business event — pushes an object-style event to
 * dataLayer (for GTM's own tags, whatever the user configures them to
 * do) AND calls gtag() directly (the authoritative path to GA4 in this
 * setup, since the GTM container must NOT also carry a GA4 tag — see
 * ANALYTICS.md). Never pass anything beyond the named params below
 * — no email, name, user id, document id, filename, or free-text content
 * ever reaches this function from any call site.
 */
export function trackEvent(name: string, params?: Record<string, string | number | boolean>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
  window.gtag?.("event", name, params);
}
