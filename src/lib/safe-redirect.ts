/**
 * Validates that a user-supplied redirect target is a same-site relative
 * path, never an absolute URL to another host — used for the
 * `?redirect=`/`?next=` values that round-trip through Google OAuth
 * (classic open-redirect vector: `?redirect=https://evil.com` or the
 * protocol-relative `?redirect=//evil.com`, which browsers treat as
 * absolute). Checked both where the value is first read (sign-in page)
 * and again where it's actually used to build the final redirect
 * (/auth/callback) — defense in depth, not redundant.
 */
export function safeRedirectPath(value: string | null | undefined, fallback = "/console"): string {
  if (!value) return fallback;
  if (!value.startsWith("/")) return fallback;
  if (value.startsWith("//")) return fallback;
  if (value.includes("://")) return fallback;
  if (value.includes("\\")) return fallback; // browsers normalize backslashes to slashes
  return value;
}
