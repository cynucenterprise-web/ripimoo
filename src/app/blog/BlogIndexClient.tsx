"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { SearchIcon, ClockIcon, ArrowRightIcon, CloseIcon, FileTextIcon } from "@/components/ui/icons";
import { readTime, type BlogPost } from "@/content/blog";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogIndexClient({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [tag, setTag] = useState<string | null>(null);
  const [length, setLength] = useState<"all" | "quick" | "deep">("all");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: posts.length };
    for (const p of posts) counts[p.category] = (counts[p.category] ?? 0) + 1;
    return counts;
  }, [posts]);
  const categories = Object.keys(categoryCounts);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesSearch =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCategory = category === "All" || post.category === category;
      const matchesTag = !tag || post.tags.includes(tag);
      const minutes = parseInt(readTime(post)) || 3;
      const matchesLength = length === "all" || (length === "quick" ? minutes <= 3 : minutes >= 4);
      return matchesSearch && matchesCategory && matchesTag && matchesLength;
    });
  }, [posts, query, category, tag, length]);

  const hasActiveFilter = query !== "" || category !== "All" || tag !== null || length !== "all";
  const resetFilters = () => {
    setQuery("");
    setCategory("All");
    setTag(null);
    setLength("all");
  };

  const featured = !hasActiveFilter ? posts[0] : null;
  const gridPosts = featured ? filtered.filter((p) => p.slug !== featured.slug) : filtered;

  return (
    <div className="space-y-10">
      {/* Filter bar */}
      <div className="space-y-4 border-y border-line py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                  category === cat ? "bg-ink text-paper" : "bg-paper-soft text-ink-soft hover:text-ink"
                }`}
              >
                {cat}
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono ${category === cat ? "bg-paper/20" : "bg-line"}`}>
                  {categoryCounts[cat]}
                </span>
              </button>
            ))}
          </div>
          <div className="w-full md:w-72">
            <Input
              placeholder="Search guides & topics…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              leftElement={<SearchIcon className="h-4 w-4 text-ink-soft" />}
              rightElement={
                query ? (
                  <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="text-ink-soft hover:text-ink">
                    <CloseIcon className="h-3.5 w-3.5" />
                  </button>
                ) : undefined
              }
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">Topics:</span>
            {allTags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTag(tag === t ? null : t)}
                className={`rounded-md px-2.5 py-1 text-[11px] transition ${
                  tag === t ? "border border-accent/30 bg-accent/10 font-semibold text-accent" : "border border-line text-ink-soft hover:border-ink-soft/40"
                }`}
              >
                {t}
                {tag === t && " ×"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span className="mr-1 text-[11px] font-semibold uppercase tracking-wider text-ink-soft">Length:</span>
            {(["all", "quick", "deep"] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setLength(opt)}
                className={`rounded px-2 py-0.5 text-[11px] font-medium transition ${length === opt ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"}`}
              >
                {opt === "all" ? "All" : opt === "quick" ? "≤ 3 min" : "4+ min"}
              </button>
            ))}
            {hasActiveFilter && (
              <button type="button" onClick={resetFilters} className="ml-2 text-[11px] font-semibold text-accent hover:underline">
                Reset filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Featured spotlight */}
      {featured && (
        <Card padding="none" className="overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
            <div className="relative min-h-[220px] overflow-hidden bg-paper-soft sm:min-h-[300px] lg:col-span-7">
              <Image src={featured.image} alt={featured.title} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" priority unoptimized />
              <span className="absolute left-4 top-4 rounded-md bg-ink/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-paper shadow-xs">
                Featured Guide
              </span>
            </div>
            <div className="flex flex-col justify-between space-y-4 p-6 sm:p-8 lg:col-span-5">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-ink-soft">
                  <span className="font-semibold text-accent">{featured.category}</span>
                  <span>&middot;</span>
                  <span>{formatDate(featured.date)}</span>
                  <span>&middot;</span>
                  <span className="inline-flex items-center gap-1">
                    <ClockIcon className="h-3 w-3" />
                    {readTime(featured)}
                  </span>
                </div>
                <Link href={`/blog/${featured.slug}`}>
                  <h2 className="text-xl font-bold leading-snug text-ink hover:text-accent sm:text-2xl">{featured.title}</h2>
                </Link>
                <p className="text-sm leading-relaxed text-ink-soft">{featured.description}</p>
              </div>
              <div className="flex items-center justify-between border-t border-line pt-4">
                <span className="text-xs text-ink-soft">By {featured.author}</span>
                <Link href={`/blog/${featured.slug}`}>
                  <Button variant="primary" size="sm" rightIcon={<ArrowRightIcon className="h-3.5 w-3.5" />}>
                    Read Guide
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink">{hasActiveFilter ? `Filtered Guides (${filtered.length})` : "All Guides"}</h2>
          <span className="text-xs text-ink-soft">
            {gridPosts.length} article{gridPosts.length === 1 ? "" : "s"}
          </span>
        </div>

        {gridPosts.length === 0 ? (
          <div className="space-y-3 rounded-2xl border border-dashed border-line bg-paper-soft/50 p-12 text-center">
            <FileTextIcon className="mx-auto h-8 w-8 text-ink-soft/40" />
            <h3 className="text-sm font-semibold text-ink">No matching articles found</h3>
            <p className="mx-auto max-w-sm text-xs text-ink-soft">Try a different search term or topic filter.</p>
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Clear filters &amp; view all
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post) => (
              <Card key={post.slug} padding="none" className="flex h-full flex-col justify-between overflow-hidden shadow-xs transition hover:border-ink-soft/30">
                <div>
                  <Link href={`/blog/${post.slug}`} className="relative block aspect-video overflow-hidden bg-paper-soft">
                    <Image src={post.image} alt={post.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" loading="lazy" unoptimized />
                    <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-ink/60 px-2 py-0.5 text-[10px] font-medium text-paper backdrop-blur-xs">
                      <ClockIcon className="h-2.5 w-2.5" />
                      {readTime(post)}
                    </span>
                  </Link>
                  <div className="space-y-3 p-5">
                    <div className="flex items-center gap-2 text-[11px] text-ink-soft">
                      <span className="font-semibold text-accent">{post.category}</span>
                      <span>&middot;</span>
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="line-clamp-2 text-base font-bold leading-snug text-ink hover:text-accent">{post.title}</h3>
                    </Link>
                    <p className="line-clamp-3 text-xs leading-relaxed text-ink-soft">{post.description}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {post.tags.slice(0, 3).map((t) => (
                        <span key={t} className="rounded bg-paper-soft px-2 py-0.5 font-mono text-[10px] text-ink-soft">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-line bg-paper-soft/50 px-5 py-3.5">
                  <span className="text-[11px] text-ink-soft">By {post.author}</span>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-accent">
                    Read Guide
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
