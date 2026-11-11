import Link from "next/link";
import { NAV_LINKS, SITE_NAME } from "@/lib/site-config";
import RipimooLogo from "@/components/ui/RipimooLogo";
import Button from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import MobileNav from "./MobileNav";

// Showcase build: the real session check (Supabase auth) and the signed-in
// nav state it drives are private backend code — this always renders
// signed-out.
export default async function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center whitespace-nowrap rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`${SITE_NAME} home`}
        >
          <RipimooLogo size="md" />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="whitespace-nowrap py-1 text-ink-soft transition-colors hover:text-accent">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/console">
              <Button variant="primary" size="sm" rightIcon={<ArrowRightIcon />}>
                Start Free
              </Button>
            </Link>
          </div>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
