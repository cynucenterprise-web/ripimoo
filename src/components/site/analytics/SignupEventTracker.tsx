"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics/track";

/**
 * Fires `sign_up` exactly once, only on the redirect right after
 * /auth/callback freshly inserts a signup_consents row (genuinely the
 * first sign-in — see that route for how `new_signup` is set). No user
 * id or email in the event, just the flag. The query param is stripped
 * from the URL immediately after, so a refresh or share of the link
 * never re-fires it.
 */
export default function SignupEventTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    if (searchParams.get("new_signup") !== "1") return;
    fired.current = true;
    trackEvent("sign_up");

    const remaining = new URLSearchParams(searchParams);
    remaining.delete("new_signup");
    const query = remaining.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams, router]);

  return null;
}
