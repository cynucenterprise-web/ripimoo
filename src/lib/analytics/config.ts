/**
 * One config constant per ID (env var first, literal fallback so the
 * build never breaks if the var isn't set in a given environment) — per
 * the task's own instruction, not duplicated anywhere else in the code.
 */
// Real IDs redacted for this showcase repo — set via env vars in production.
export const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX";
export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID || "G-XXXXXXXXXX";

export const CONSENT_COOKIE_NAME = "ripimoo_consent";
export const CONSENT_COOKIE_MAX_AGE_SECONDS = 180 * 24 * 60 * 60; // ~6 months

/**
 * No tracking on /admin, /auth/*, /api/* (the task's explicit list — not
 * the same as the noindex list, which also covers /console and /account;
 * those two DO load tracking, since several required events fire from
 * the console).
 */
const EXCLUDED_PATH_PREFIXES = ["/admin", "/auth", "/api"];

export function isTrackingExcludedPath(pathname: string): boolean {
  return EXCLUDED_PATH_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}
