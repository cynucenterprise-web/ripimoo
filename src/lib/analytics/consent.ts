"use client";

import { CONSENT_COOKIE_NAME, CONSENT_COOKIE_MAX_AGE_SECONDS } from "./config";

export type ConsentChoice = "granted" | "denied";

/** Fired on `window` whenever the stored choice changes — the "Cookie
 * settings" footer link and the banner both listen for this instead of
 * needing a shared React context across the tree. */
export const CONSENT_REOPEN_EVENT = "ripimoo:consent-reopen";

export function readConsentCookie(): ConsentChoice | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE_NAME}=(granted|denied)`));
  return (match?.[1] as ConsentChoice | undefined) ?? null;
}

export function writeConsentCookie(choice: ConsentChoice): void {
  if (typeof document === "undefined") return;
  // `Secure` is correct for production (ripimoo.com is always https); on a
  // plain-http local dev server the browser silently drops a Secure
  // cookie, which only affects local persistence, never production.
  document.cookie = `${CONSENT_COOKIE_NAME}=${choice}; Path=/; Max-Age=${CONSENT_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax; Secure`;
}

export function requestConsentReopen(): void {
  window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT));
}
