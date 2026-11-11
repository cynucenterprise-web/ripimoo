"use client";

import { useState } from "react";
import { ShareIcon, CheckIcon } from "@/components/ui/icons";

export default function ShareLinkButton() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can fail (permissions, insecure context) — no
      // crash, the button just stays in its normal state.
    }
  }

  return (
    <button type="button" onClick={copy} className="inline-flex items-center gap-1 text-ink-soft transition-colors hover:text-accent">
      {copied ? <CheckIcon className="h-3.5 w-3.5 text-teal" /> : <ShareIcon className="h-3.5 w-3.5" />}
      <span>{copied ? "Link copied" : "Share link"}</span>
    </button>
  );
}
