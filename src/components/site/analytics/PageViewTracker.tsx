"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics/pageview";

/** Fires exactly once per route (including the very first load — gtag's
 * own automatic page_view is disabled, see pageview.ts), on every
 * client-side navigation the App Router does without a full reload. */
export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    const fullPath = searchParams.size > 0 ? `${pathname}?${searchParams.toString()}` : pathname;
    if (lastTracked.current === fullPath) return;
    lastTracked.current = fullPath;
    trackPageView(fullPath);
  }, [pathname, searchParams]);

  return null;
}
