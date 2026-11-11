import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPost, readTime, type BlogBlock } from "@/content/blog";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/site-config";
import ReadingProgressBar from "@/components/site/ReadingProgressBar";
import ShareLinkButton from "@/components/site/ShareLinkButton";
import Button from "@/components/ui/Button";
import {
  ChevronRightIcon,
  CalendarIcon,
  ClockIcon,
  ShieldCheckIcon,
  TagIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@/components/ui/icons";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const title = post.metaTitle ?? post.title;
  const ogTitle = post.ogTitle ?? post.title;
  const ogDescription = post.ogDescription ?? post.description;
  return {
    // The <title> tag uses the shorter metaTitle. A metaTitle that already
    // ends in "Ripimoo" needs `absolute` to bypass the root layout's
    // "%s — Ripimoo" template — otherwise it gets appended a second time.
    // Other posts' metaTitles don't include the site name, so they keep
    // running through the template as before.
    title: /ripimoo$/i.test(title.trim()) ? { absolute: title } : title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      images: [OG_IMAGE],
      siteName: SITE_NAME,
      title: ogTitle,
      description: ogDescription,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
    twitter: {
      card: "summary_large_image",
      images: [OG_IMAGE.url],
      title: ogTitle,
      description: ogDescription,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// Supports "**bold**" and "[text](url)" — the only inline markup these
// posts use. Internal links (starting with "/") use next/link; external
// ones (http(s)://) open in a new tab.
function renderInline(text: string) {
  const nodes: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = re.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    if (match[1] !== undefined) {
      nodes.push(<strong key={key++}>{match[1]}</strong>);
    } else {
      const label = match[2];
      const href = match[3];
      const linkClassName = "font-semibold text-accent underline underline-offset-2 hover:opacity-80";
      nodes.push(
        href.startsWith("/") ? (
          <Link key={key++} href={href} className={linkClassName}>
            {label}
          </Link>
        ) : (
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
            {label}
          </a>
        )
      );
    }
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function BlockRenderer({ block, index }: { block: BlogBlock; index: number }) {
  if (block.type === "h2") {
    return (
      <h2 id={`section-${index}`} className="scroll-mt-24 text-xl font-bold tracking-tight text-ink sm:text-2xl">
        {block.text}
      </h2>
    );
  }
  if (block.type === "h3") {
    return (
      <h3 id={`section-${index}`} className="scroll-mt-24 text-base font-bold tracking-tight text-ink sm:text-lg">
        {block.text}
      </h3>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="list-disc space-y-2 pl-6 text-[15px] leading-relaxed text-ink-soft">
        {block.items.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "ol") {
    return (
      <ol className="list-decimal space-y-2 pl-6 text-[15px] leading-relaxed text-ink-soft">
        {block.items.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ol>
    );
  }
  if (block.type === "table") {
    return (
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-left text-[13px] leading-relaxed text-ink-soft sm:text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-soft">
              {block.headers.map((h, i) => (
                <th key={i} className="px-4 py-3 font-semibold text-ink">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri} className={ri > 0 ? "border-t border-line" : undefined}>
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-3 align-top">
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <p className="text-[15px] leading-relaxed text-ink-soft sm:text-base">
      {renderInline(block.text)}
    </p>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  // Showcase build: the real session check (Supabase auth) is private
  // backend code and isn't included here, so this always renders the
  // signed-out state.
  const isSignedIn = false;
  const consoleHref = isSignedIn ? "/console" : "/sign-in?redirect=/console";

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const toc = post.content
    .map((block, i) => ({ block, i }))
    .filter((entry): entry is { block: Extract<BlogBlock, { type: "h2" }>; i: number } => entry.block.type === "h2");

  const index = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const prevPost = index > 0 ? BLOG_POSTS[index - 1] : null;
  const nextPost = index < BLOG_POSTS.length - 1 ? BLOG_POSTS[index + 1] : null;
  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  // dateModified falls back to datePublished when a post has no `updated`
  // field set — accurate ("unchanged since publish, as far as we know"),
  // not a guess at a different date.
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: postUrl,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: postUrl,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ReadingProgressBar />

      <article className="mx-auto max-w-5xl space-y-10 px-6 py-20">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-ink-soft">
          <Link href="/" className="hover:text-accent">Home</Link>
          <ChevronRightIcon className="h-3.5 w-3.5 text-ink-soft/40" />
          <Link href="/blog" className="hover:text-accent">Blog</Link>
          <ChevronRightIcon className="h-3.5 w-3.5 text-ink-soft/40" />
          <span className="max-w-[240px] truncate font-medium text-ink sm:max-w-md">{post.title}</span>
        </nav>

        <header className="max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-ink-soft">
            <span className="font-bold text-accent">{post.category}</span>
            <span>&middot;</span>
            <span className="inline-flex items-center gap-1">
              <CalendarIcon className="h-3.5 w-3.5" />
              {formatDate(post.date)}
            </span>
            <span>&middot;</span>
            <span className="inline-flex items-center gap-1">
              <ClockIcon className="h-3.5 w-3.5" />
              {readTime(post)}
            </span>
          </div>

          <h1 className="text-2xl font-bold leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">{post.title}</h1>
          <p className="text-base leading-relaxed text-ink-soft sm:text-lg">{post.description}</p>

          <div className="flex items-center justify-between border-t border-line pt-3 text-xs text-ink-soft">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-ink">By {post.author}</span>
              <span>&middot;</span>
              <span className="inline-flex items-center gap-1 font-medium text-accent">
                <ShieldCheckIcon className="h-3.5 w-3.5" /> Fact-Locked Content
              </span>
            </div>
            <ShareLinkButton />
          </div>
        </header>

        <div className="aspect-[16/9] max-h-[500px] overflow-hidden rounded-2xl border border-line bg-paper-soft shadow-xs">
          <Image src={post.image} alt={post.title} width={1200} height={675} className="h-full w-full object-cover" priority unoptimized />
        </div>

        <div className="grid grid-cols-1 items-start gap-10 pt-2 lg:grid-cols-12">
          {toc.length > 0 && (
            <aside className="space-y-4 lg:sticky lg:top-24 lg:col-span-4">
              <div className="space-y-3 rounded-xl border border-line bg-paper p-4">
                <span className="block text-xs font-bold uppercase tracking-wider text-ink-soft">Table of Contents</span>
                <nav className="space-y-1.5 text-xs">
                  {toc.map(({ block, i }) => (
                    <a key={i} href={`#section-${i}`} className="block py-1 leading-snug text-ink-soft transition-colors hover:text-accent">
                      {block.text}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="space-y-2 rounded-xl border border-accent/20 bg-accent/5 p-4 text-xs text-ink">
                <span className="flex items-center gap-1.5 font-semibold">
                  <ShieldCheckIcon className="h-4 w-4 shrink-0 text-accent" />
                  The Ripimoo Standard
                </span>
                <p className="text-[11px] leading-relaxed text-ink-soft">
                  Never claim experience you don&apos;t have. Real hiring managers look for depth in what you actually delivered.
                </p>
                <Link href="/console" className="block pt-1 text-[11px] font-bold text-accent hover:underline">
                  Test your CV in the console →
                </Link>
              </div>
            </aside>
          )}

          <main className={`space-y-6 ${toc.length > 0 ? "lg:col-span-8" : "lg:col-span-12"}`}>
            {post.content.map((block, i) => (
              <BlockRenderer key={i} block={block} index={i} />
            ))}

            <div className="flex flex-wrap items-center gap-2 border-t border-line pt-4">
              <span className="flex items-center gap-1 text-xs text-ink-soft">
                <TagIcon className="h-3.5 w-3.5" /> Filed under:
              </span>
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-paper-soft px-2.5 py-1 text-xs font-medium text-ink-soft">
                  {tag}
                </span>
              ))}
            </div>
          </main>
        </div>

        <div className="grid grid-cols-1 gap-4 border-t border-line pt-8 sm:grid-cols-2">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="block space-y-1 rounded-xl border border-line bg-paper p-4 shadow-xs transition hover:border-ink-soft/30">
              <span className="flex items-center gap-1 text-[11px] text-ink-soft">
                <ArrowLeftIcon className="h-3 w-3" /> Previous Guide
              </span>
              <p className="line-clamp-1 text-sm font-semibold text-ink">{prevPost.title}</p>
            </Link>
          ) : (
            <div />
          )}
          {nextPost && (
            <Link href={`/blog/${nextPost.slug}`} className="block space-y-1 rounded-xl border border-line bg-paper p-4 text-right shadow-xs transition hover:border-ink-soft/30">
              <span className="flex items-center justify-end gap-1 text-[11px] text-ink-soft">
                Next Guide <ArrowRightIcon className="h-3 w-3" />
              </span>
              <p className="line-clamp-1 text-sm font-semibold text-ink">{nextPost.title}</p>
            </Link>
          )}
        </div>

        {related.length > 0 && (
          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-ink">Related Guides</h3>
              <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline">
                View all guides
                <ArrowRightIcon className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-line bg-paper shadow-xs transition hover:border-ink-soft/30 sm:flex-row"
                >
                  <div className="relative h-28 shrink-0 overflow-hidden bg-paper-soft sm:w-36">
                    <Image src={rel.image} alt={rel.title} fill sizes="144px" className="object-cover" loading="lazy" unoptimized />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between space-y-1.5 p-3.5">
                    <div>
                      <span className="block truncate text-[10px] font-bold uppercase tracking-wide text-accent">{rel.category}</span>
                      <h4 className="line-clamp-2 text-xs font-bold leading-snug text-ink group-hover:text-accent">{rel.title}</h4>
                    </div>
                    <span className="text-[10px] text-ink-soft">
                      {readTime(rel)} &middot; {formatDate(rel.date)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4 rounded-2xl border border-line bg-paper p-8 text-center sm:p-10">
          <h3 className="text-xl font-bold text-ink sm:text-2xl">Tailor your CV without fabricating a single fact</h3>
          <p className="mx-auto max-w-md text-xs leading-relaxed text-ink-soft sm:text-sm">
            Ripimoo rewords what you already wrote to match a job description — without inventing skills you don&apos;t have.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
            <Link href={consoleHref}>
              <Button variant="primary" size="lg" rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
                {isSignedIn ? "Open Console" : "Try the Console (Free)"}
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg">View Pricing &amp; Limits</Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
