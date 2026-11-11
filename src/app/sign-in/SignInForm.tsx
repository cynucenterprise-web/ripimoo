"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Checkbox from "@/components/ui/Checkbox";
import { SpinnerIcon, ShieldCheckIcon } from "@/components/ui/icons";

// Showcase build: the real OAuth + consent-intent flow is private backend
// code and isn't included here — this is a harmless stub, not a working
// sign-in.
export default function SignInForm({ redirectTo: _redirectTo }: { redirectTo: string }) {
  const [consented, setConsented] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleGoogleSignIn() {
    if (!consented || pending) return;
    setError(null);
    startTransition(async () => {
      setError("This is a showcase build — sign-in is disabled here. Backend/auth code is private.");
    });
  }

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-line bg-paper-soft/60 p-3.5">
        <Checkbox
          id="policy-consent"
          checked={consented}
          onChange={(e) => setConsented(e.target.checked)}
          label={
            <span className="text-xs leading-relaxed text-ink-soft">
              I agree to the{" "}
              <Link href="/privacy" className="font-medium text-accent underline underline-offset-2 hover:opacity-80" target="_blank">
                Privacy Policy
              </Link>
              ,{" "}
              <Link href="/refund-policy" className="font-medium text-accent underline underline-offset-2 hover:opacity-80" target="_blank">
                Refund Policy
              </Link>
              , and{" "}
              <Link href="/cookie-policy" className="font-medium text-accent underline underline-offset-2 hover:opacity-80" target="_blank">
                Cookie Policy
              </Link>
              .
            </span>
          }
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={!consented || pending}
        aria-disabled={!consented || pending}
        className={`flex h-11 w-full select-none items-center justify-center gap-3 rounded-lg border px-4 text-xs font-medium transition-all ${
          consented && !pending
            ? "cursor-pointer border-line bg-paper text-ink shadow-xs hover:border-ink-soft/40 hover:bg-paper-soft active:bg-line"
            : "cursor-not-allowed border-line/70 bg-paper-soft text-ink-soft opacity-75"
        }`}
      >
        {pending ? (
          <span className="inline-flex items-center gap-2">
            <SpinnerIcon className="h-4 w-4 text-accent" />
            Redirecting…
          </span>
        ) : (
          <>
            <GoogleLogo />
            <span>Continue with Google</span>
          </>
        )}
      </button>

      {!consented && (
        <p className="text-center text-[11px] text-ink-soft">
          Tick the agreement checkbox above to activate sign in.
        </p>
      )}

      <div className="flex items-center justify-center gap-1.5 border-t border-line pt-4 text-[11px] text-ink-soft">
        <ShieldCheckIcon className="h-3.5 w-3.5 text-teal" />
        <span>We never access your emails, contacts, or Google Drive</span>
      </div>
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z"
      />
    </svg>
  );
}
