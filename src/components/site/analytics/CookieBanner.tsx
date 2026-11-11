"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { type ConsentChoice, writeConsentCookie, CONSENT_REOPEN_EVENT } from "@/lib/analytics/consent";
import Button from "@/components/ui/Button";
import { CookieIcon } from "@/components/ui/icons";

/**
 * Minimal, accessible cookie banner: Accept/Reject at equal visual
 * weight, a link to the Cookie Policy, keyboard-reachable, fixed to the
 * bottom without covering the whole viewport so the rest of the page
 * stays usable while it's open.
 */
export default function CookieBanner({
  initialConsent,
  onChoice,
}: {
  initialConsent: ConsentChoice | null;
  onChoice: (choice: ConsentChoice) => void;
}) {
  const [visible, setVisible] = useState(initialConsent === null);

  useEffect(() => {
    function reopen() {
      setVisible(true);
    }
    window.addEventListener(CONSENT_REOPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, reopen);
  }, []);

  function choose(choice: ConsentChoice) {
    writeConsentCookie(choice);
    if (choice === "granted") {
      // Queued in dataLayer regardless of whether GTM/gtag.js have
      // loaded yet (they only do once onChoice below flips consent to
      // "granted") — gtag's command queue processes it correctly once
      // the real library initializes.
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
    }
    onChoice(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-50 rounded-xl border border-line bg-paper p-4 shadow-xl sm:inset-x-auto sm:left-4 sm:right-auto sm:max-w-md"
    >
      <div className="flex items-start gap-3">
        <CookieIcon className="mt-0.5 shrink-0 text-accent" />
        <div className="space-y-2">
          <p className="text-xs leading-relaxed text-ink-soft">
            We use cookies for analytics to understand how the site is used. We only set them if you
            accept —{" "}
            <Link href="/cookie-policy" className="text-accent underline underline-offset-2 hover:opacity-80">
              read our Cookie Policy
            </Link>
            .
          </p>
          <div className="flex items-center gap-2 pt-1">
            <Button variant="primary" size="sm" onClick={() => choose("granted")} className="flex-1">
              Accept
            </Button>
            <Button variant="outline" size="sm" onClick={() => choose("denied")} className="flex-1">
              Reject
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
