import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /console, /account and /sign-in are intentionally NOT disallowed
      // here. Each has a noindex,nofollow meta tag instead — Google must be
      // able to crawl them to see that tag. A robots.txt block hides the
      // page from crawling entirely, which can leave a bare URL indexed
      // with no snippet instead of excluding it.
      disallow: ["/api/", "/auth/", "/admin"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
