"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/site-config";
import Button from "@/components/ui/Button";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";

// Showcase build: the signed-in branch (account link + sign-out) depended
// on private backend auth code, so this only renders the signed-out menu.
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft hover:bg-paper-soft"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full space-y-3 border-b border-line bg-paper px-4 pb-6 pt-3 shadow-lg">
          <nav aria-label="Primary" className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex min-h-[44px] items-center rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                  isActive(link.href) ? "bg-teal/10 text-ink" : "text-ink-soft hover:bg-paper-soft"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2 border-t border-line pt-3">
            <Link href="/sign-in" onClick={() => setOpen(false)}>
              <Button variant="outline" size="md" className="w-full">
                Sign in
              </Button>
            </Link>
            <Link href="/console" onClick={() => setOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                Start Free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
