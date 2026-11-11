import Link from "next/link";
import { LEGAL_LINKS, NAV_LINKS, SITE_NAME, SOCIAL_LINKS } from "@/lib/site-config";
import RipimooLogo from "@/components/ui/RipimooLogo";
import { LinkedInIcon, XIcon, InstagramIcon, YouTubeIcon, ShieldCheckIcon } from "@/components/ui/icons";
import CookieSettingsLink from "@/components/site/analytics/CookieSettingsLink";

// Real icons for src/lib/site-config.ts's SOCIAL_LINKS (href/label pairs —
// that file is the one place to paste real URLs; matched here by label).
const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: LinkedInIcon,
  X: XIcon,
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
};

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label={`${SITE_NAME} home`}>
              <RipimooLogo size="md" showSubtitle />
            </Link>
            <p className="max-w-md text-xs leading-relaxed text-ink-soft">
              Ripimoo rephrases what you already wrote to match real job specifications. We keep your
              facts, dates, and qualifications strictly locked — you approve every proposed wording
              change before download.
            </p>
            <p className="flex items-center gap-1.5 text-xs font-medium text-accent">
              <ShieldCheckIcon className="h-3.5 w-3.5" />
              Fact-Protection Architecture
            </p>

            <div className="pt-2">
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">Connect with us</p>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = SOCIAL_ICONS[social.label];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow ${SITE_NAME} on ${social.label}`}
                      title={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-paper-soft text-ink-soft transition-colors hover:border-accent hover:text-accent"
                    >
                      {Icon && <Icon />}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-soft">Product &amp; Help</p>
            <ul className="space-y-2 text-xs text-ink-soft">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/sign-in" className="transition-colors hover:text-accent">
                  Sign in / Sign up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-soft">Legal &amp; Policies</p>
            <ul className="space-y-2 text-xs text-ink-soft">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsLink />
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs text-ink-soft sm:flex-row">
          <span>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved. ripimoo.com
          </span>
          <a href="mailto:support@ripimoo.com" className="transition-colors hover:text-accent">
            support@ripimoo.com
          </a>
        </div>
      </div>
    </footer>
  );
}
