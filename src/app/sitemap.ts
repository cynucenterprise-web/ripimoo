import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/content/blog";
import { SITE_URL } from "@/lib/site-config";

// Real per-page last-modified dates, not `new Date()` on every build (which
// would change on every single build regardless of whether the page's
// content actually changed — exactly what a crawler's <lastmod> is supposed
// to signal against). Update a page's date here when you actually change
// its content. /sign-in is deliberately excluded: it's noindex and private
// (see its own page.tsx), so it has no business in the sitemap.
const STATIC_ROUTES: { path: string; lastModified: string }[] = [
  { path: "", lastModified: "2026-10-14" },
  { path: "/blog", lastModified: "2026-10-14" },
  { path: "/pricing", lastModified: "2026-10-14" },
  { path: "/about", lastModified: "2026-10-14" },
  { path: "/contact", lastModified: "2026-10-14" },
  { path: "/terms", lastModified: "2026-10-14" },
  { path: "/privacy", lastModified: "2026-10-14" },
  { path: "/refund-policy", lastModified: "2026-10-14" },
  { path: "/cookie-policy", lastModified: "2026-10-14" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map(({ path, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(lastModified),
  }));

  const postEntries = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
  }));

  return [...staticEntries, ...postEntries];
}
