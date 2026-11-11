export const SITE_NAME = "Ripimoo";
export const SITE_URL = "https://ripimoo.com";
export const SITE_DESCRIPTION =
  "Ripimoo tailors your CV and cover letter to match any job description in seconds, using only what you already wrote — never fabricated.";

// Next.js metadata merging is shallow per key: any page that sets its own
// `openGraph`/`twitter` object entirely replaces the root layout's, which
// drops the image the layout's file-convention og-image would otherwise
// supply. Every page's openGraph/twitter block must spread this in
// explicitly instead of relying on inheritance.
export const OG_IMAGE = {
  url: `${SITE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — CV tailoring, in seconds`,
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/console", label: "Console" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export const LEGAL_LINKS = [
  { href: "/terms", label: "Terms and Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];

// Placeholders per PRD.md Section 10 — wired up, pointing nowhere real yet.
export const SOCIAL_LINKS = [
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://x.com", label: "X" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://youtube.com", label: "YouTube" },
];
