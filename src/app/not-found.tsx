import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-paper-soft text-2xl font-bold text-ink-soft/40">404</div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">We can&apos;t find that page</h1>
      <p className="mx-auto mb-8 max-w-md text-xs leading-relaxed text-ink-soft sm:text-sm">
        The page you&apos;re looking for may have moved or never existed. Here are some good places to start instead.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/">
          <Button variant="primary" size="md">Go to homepage</Button>
        </Link>
        <Link href="/pricing">
          <Button variant="outline" size="md">See pricing</Button>
        </Link>
        <Link href="/blog">
          <Button variant="outline" size="md">Read the blog</Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline" size="md">Contact us</Button>
        </Link>
      </div>
    </div>
  );
}
