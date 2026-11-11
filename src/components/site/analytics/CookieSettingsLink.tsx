"use client";

import { requestConsentReopen } from "@/lib/analytics/consent";

export default function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={requestConsentReopen}
      className="text-xs text-ink-soft text-left transition-colors hover:text-accent"
    >
      Cookie settings
    </button>
  );
}
