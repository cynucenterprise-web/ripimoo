import type { Metadata } from "next";
import { BLOG_POSTS } from "@/content/blog";
import { BookOpenIcon } from "@/components/ui/icons";
import BlogIndexClient from "./BlogIndexClient";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/site-config";

const TITLE = "Blog - Real-Time Resume & Cover Letter Updates | Ripimoo";
const DESCRIPTION =
  "Explore expert tips, news and updates on real-time CV and cover letter updates with Ripimoo to keep your job application materials fresh and relevant.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    images: [OG_IMAGE],
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog`,
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-20">
      <div className="max-w-2xl space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-soft px-3 py-1 text-xs font-semibold text-ink-soft">
          <BookOpenIcon className="h-3.5 w-3.5" />
          Ripimoo Editorial
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-ink">Blog</h1>
        <p className="text-lg text-ink-soft">
          Career tips, job-search advice, and ATS guidance — no filler.
        </p>
      </div>

      <BlogIndexClient posts={BLOG_POSTS} />
    </div>
  );
}
