import Link from "next/link";
import Image from "next/image";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site-config";
import { BLOG_POSTS, readTime } from "@/content/blog";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import RipimooLogo from "@/components/ui/RipimooLogo";
import HomeFaq from "./HomeFaq";
import { FAQS } from "./home-faqs";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  FileTextIcon,
  ClockIcon,
  LockIcon,
  SlidersIcon,
  LayersIcon,
  SparklesIcon,
  ShieldCheckIcon,
  XCircleIcon,
} from "@/components/ui/icons";

const STEPS = [
  {
    n: "01",
    title: "Upload your existing Documents",
    body: "Start with your existing resume in PDF or Word. Ripimoo extracts every section and protects your real experience, so AI never changes your facts.",
    footnote: "Protected: Dates, degrees, companies",
  },
  {
    n: "02",
    title: "Paste the job description",
    body: "Paste the job description. Ripimoo pulls out the key skills, requirements and ATS keywords, then shows which your CV proves and which are missing.",
    footnote: "Identifies: Skills, experience, gaps",
  },
  {
    n: "03",
    title: "Review and download",
    body: "See every change line by line. Accept, skip or edit each AI suggestion, then download your updated CV. Ripimoo keeps your original layout and formatting wherever it can.",
    footnote: "Total granular approval power",
  },
];

const FEATURES = [
  {
    icon: LockIcon,
    title: "Your Facts Stay Locked",
    body: "Ripimoo only rewrites wording. Job titles, companies, employment dates and degrees stay exactly as you wrote them, so your CV stays honest.",
  },
  {
    icon: SlidersIcon,
    title: "You approve every change",
    body: "Each AI suggestion appears on its own card with before and after wording and a simple explanation. Apply it or skip it. You stay in full control.",
  },
  {
    icon: LayersIcon,
    title: "CV and cover letter pairing",
    body: "Update your resume and cover letter in one go, or separately. Both tell the same story, so recruiters see a clear, consistent match for the job.",
  },
  {
    icon: FileTextIcon,
    title: "PDF & DOCX export",
    body: "Your resume keeps its original look. Ripimoo updates only the wording, and keeps your layout, spacing and fonts wherever it can. If a page ever has to be rebuilt, we tell you before you download.",
  },
  {
    icon: SparklesIcon,
    title: "Objective match score",
    body: "Get a job match score before and after tailoring. Ripimoo measures how well your CV matches the job description, based only on skills you can prove.",
  },
  {
    icon: ShieldCheckIcon,
    title: '"Not found in your CV" gap list',
    body: "Missing a required skill? Ripimoo won't fabricate it. It flags each gap clearly, so you know what to learn, explain or address before you apply.",
  },
];

const NEVER_DO = [
  {
    icon: XCircleIcon,
    tone: "danger" as const,
    title: "Never invents experience",
    body: "Ripimoo never adds skills, technologies or projects that aren't part of your experience. If you haven't used it, it won't appear on your CV.",
  },
  {
    icon: XCircleIcon,
    tone: "danger" as const,
    title: "Never changes dates or schools",
    body: "Ripimoo never touches your dates, career gaps, previous employers or degrees. Your timeline stays accurate, with nothing stretched or hidden.",
  },
  {
    icon: CheckCircleIcon,
    tone: "accent" as const,
    title: "Your CV, Your Decision",
    body: "AI that asks first. Every change is shown before you download, and you can accept, undo or adjust any of them, so you always know exactly what is on your resume.",
  },
];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    limit: "2 updates/day",
    features: ["2 document updates per day", "CV & cover letter tailoring", "Line-by-line wording review", 'Honest "Not found in your CV" gap list'],
    cta: "Start Free",
    href: "/sign-in?redirect=/console",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$15",
    period: "/month",
    limit: "50 updates/day",
    features: ["50 document updates per day", "CV & cover letter tailoring", "Line-by-line wording review", 'Honest "Not found in your CV" gap list'],
    cta: "Get Pro",
    href: "/pricing",
    highlight: true,
  },
  {
    name: "Unlimited",
    price: "$24",
    period: "/month",
    limit: "Up to 100 updates/day",
    features: ["Up to 100 updates per day", "CV & cover letter tailoring", "Line-by-line wording review", 'Honest "Not found in your CV" gap list'],
    cta: "Get Unlimited",
    href: "/pricing",
    highlight: false,
  },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function HomePage() {
  // Showcase build: the real session check (Supabase auth) is private
  // backend code and isn't included here, so this always renders the
  // signed-out state.
  const isSignedIn = false;
  const consoleHref = isSignedIn ? "/console" : "/sign-in?redirect=/console";

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon`,
  };
  const websiteJsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="space-y-24 py-6 md:py-12">
        {/* Hero */}
        <section className="border-b border-line pb-16 pt-8 md:pb-24 md:pt-16">
          <div className="mx-auto max-w-5xl space-y-6 px-4 text-center sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center gap-2 pb-1 pt-2">
              <RipimooLogo size="xl" showWordmark={false} />
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-accent-border bg-paper/90 px-4 py-1.5 text-xs font-semibold text-accent shadow-xs">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span>CV &amp; Cover Letter Tailoring &middot; Zero Hallucination Guarantee</span>
              </div>
            </div>

            <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-[1.15] tracking-tight text-ink sm:text-5xl md:text-6xl">
              Stop Rewriting Your Resume and Cover Letter for Every Job. Let AI Tailor It in Seconds
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Rewriting your CV for every application is slow and frustrating. With Ripimoo, you upload your
              current resume, paste the job description, and our AI tailors your CV and cover letter to fit
              the role.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
              <Link href={consoleHref} className="w-full sm:w-auto">
                <Button variant="primary" size="lg" rightIcon={<ArrowRightIcon className="h-4 w-4" />} className="w-full shadow-sm sm:w-auto">
                  {isSignedIn ? "Open Console" : "Start Free Workspace"}
                </Button>
              </Link>
              <a href="#how-it-works" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  See how it works
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-ink-soft">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircleIcon className="h-4 w-4 text-accent" />
                No credit card needed
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircleIcon className="h-4 w-4 text-accent" />
                2 free updates every day
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircleIcon className="h-4 w-4 text-accent" />
                PDF &amp; DOCX supported
              </span>
            </div>

            {/* Live example diff teaser — illustrative, not a real user's document */}
            <div className="mx-auto max-w-3xl pt-8">
              <div className="space-y-4 rounded-2xl border border-line bg-paper p-5 text-left shadow-lg sm:p-7">
                <div className="flex items-center justify-between border-b border-subtle pb-3">
                  <div className="flex items-center gap-2">
                    <FileTextIcon className="h-4 w-4 text-accent" />
                    <span className="text-xs font-semibold text-ink">Live Example: Genuine Phrasing vs. AI Fabrication</span>
                  </div>
                  <span className="font-mono text-xs font-bold tabular-nums text-accent">Match Score: 55% → 76%</span>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="rounded-xl border border-red-200 bg-red-50/70 p-3">
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-red-800">
                      What generic AI tools do (fabrication)
                    </p>
                    <p className="text-red-900 line-through opacity-80">
                      &quot;Led global engineering division of 45 engineers and wrote 10,000 lines of Rust to scale
                      payment gateway.&quot; (You were a product manager; you never wrote Rust)
                    </p>
                  </div>
                  <div className="rounded-xl border border-accent-border bg-accent-light/70 p-3">
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                      What Ripimoo does (honest vocabulary refinement)
                    </p>
                    <p className="font-medium text-ink">
                      &quot;Partnered with infrastructure engineers to define technical API specifications and verify
                      payment integration endpoints for 450+ onboarded merchants.&quot;
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-subtle pt-2 text-[11px] text-ink-soft">
                  <span>Zero dates changed &middot; Zero employers altered &middot; 100% human review</span>
                  <Link href={consoleHref} className="font-semibold text-accent hover:underline">
                    Try with your CV →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">How Ripimoo Works in 3 Simple Steps</h2>
            <p className="text-sm text-ink-soft">Update your resume and cover letter with AI while keeping full control over every change.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {STEPS.map((step) => (
              <Card key={step.n} padding="md" className="flex h-full flex-col">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-subtle text-sm font-bold text-ink">{step.n}</div>
                <h3 className="mb-2 text-base font-semibold text-ink">{step.title}</h3>
                <p className="mb-4 flex-1 text-xs leading-relaxed text-ink-soft">{step.body}</p>
                <div className="border-t border-subtle pt-3 font-mono text-[11px] text-ink-muted">{step.footnote}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* Real features */}
        <section className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Real features built for credibility</h2>
            <p className="text-sm text-ink-soft">No gimmicks, no fake scoreboards, no ungrounded claims. Just precise tools for thoughtful applicants.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <Card key={f.title} padding="md" className="space-y-2">
                <f.icon className="h-5 w-5 text-accent" />
                <h3 className="text-sm font-semibold text-ink">{f.title}</h3>
                <p className="text-xs leading-relaxed text-ink-soft">{f.body}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* What Ripimoo will never do */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 rounded-2xl border border-line bg-subtle/50 p-6 sm:p-10">
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-bold text-ink sm:text-2xl">What Ripimoo will never do</h2>
              <p className="mx-auto max-w-lg text-xs text-ink-soft sm:text-sm">
                Your reputation matters more than a keyword match. That is why Ripimoo was built
                honesty-first, tailoring your CV without inventing a single fact.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 pt-2 sm:grid-cols-3">
              {NEVER_DO.map((item) => (
                <div key={item.title} className="flex flex-col items-center space-y-2 text-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      item.tone === "danger" ? "bg-red-100 text-red-700" : "bg-accent-light text-accent"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Simple, honest pricing</h2>
            <p className="text-sm text-ink-soft">One-time purchases. No sneaky auto-renewing subscriptions.</p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {PLANS.map((plan) => (
              <Card key={plan.name} padding="md" className={`flex flex-col justify-between ${plan.highlight ? "border-accent ring-1 ring-accent" : ""}`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-ink">{plan.name}</h3>
                    {plan.highlight && <span className="rounded bg-accent-light px-2 py-0.5 text-[11px] font-semibold text-accent">Recommended</span>}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-ink">{plan.price}</span>
                      <span className="text-xs text-ink-muted">{plan.period}</span>
                    </div>
                    <p className="mt-1 text-xs text-ink-muted">{plan.limit}</p>
                  </div>
                  <div className="space-y-2 border-t border-subtle pt-3">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-ink-soft">
                        <CheckCircleIcon className="h-3.5 w-3.5 shrink-0 text-accent" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-6">
                  <Link href={plan.name === "Free" ? consoleHref : plan.href}>
                    <Button variant={plan.highlight ? "primary" : "outline"} size="md" className="w-full">
                      {plan.name === "Free" ? (isSignedIn ? "Open Console" : "Start Free") : plan.cta}
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/pricing" className="text-xs font-medium text-accent hover:underline">
              View all plan details, yearly savings, and billing terms →
            </Link>
          </div>
        </section>

        {/* Blog teaser */}
        <section className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1.5">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-accent">Editorial &amp; Guides</span>
              <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Latest from the Honest Career Blog</h2>
              <p className="max-w-xl text-xs text-ink-soft sm:text-sm">
                Research-backed insights on ATS resume parsers, interview preparation, and avoiding AI hallucinations.
              </p>
            </div>
            <Link href="/blog" className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-accent hover:underline">
              View all articles
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <Card key={post.slug} padding="none" className="flex h-full flex-col justify-between overflow-hidden shadow-xs transition hover:border-line-strong">
                <div>
                  <Link href={`/blog/${post.slug}`} className="relative block aspect-video overflow-hidden bg-subtle">
                    <Image src={post.image} alt={post.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" loading="lazy" unoptimized />
                    <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-ink/60 px-2 py-0.5 text-[10px] font-medium text-paper backdrop-blur-xs">
                      <ClockIcon className="h-2.5 w-2.5" />
                      {readTime(post)}
                    </span>
                  </Link>
                  <div className="space-y-2.5 p-5">
                    <div className="flex items-center gap-2 text-[11px] text-ink-muted">
                      <span className="font-semibold text-accent">{post.category}</span>
                      <span>&middot;</span>
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="line-clamp-2 text-base font-bold leading-snug text-ink hover:text-accent">{post.title}</h3>
                    </Link>
                    <p className="line-clamp-2 text-xs leading-relaxed text-ink-soft">{post.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-subtle bg-paper-soft/50 px-5 py-3">
                  <span className="text-[11px] text-ink-muted">By {post.author}</span>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-accent">
                    Read
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <HomeFaq />

        {/* Final CTA */}
        <section className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="space-y-6 rounded-2xl bg-ink p-8 text-paper sm:p-12">
            <h2 className="mx-auto max-w-xl text-2xl font-bold leading-tight tracking-tight sm:text-4xl">
              Ready to tailor your CV with complete factual honesty?
            </h2>
            <p className="mx-auto max-w-lg text-xs leading-relaxed text-paper/70 sm:text-sm">
              Join candidates who refuse to gamble their reputation on hallucinating AI bots. Try Ripimoo free
              with 2 updates today.
            </p>
            <div className="pt-2">
              <Link href={consoleHref}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRightIcon className="h-4 w-4" />} className="bg-accent text-paper hover:bg-accent-strong">
                  Open Workspace Console
                </Button>
              </Link>
            </div>
            <p className="text-[11px] text-paper/50">No password required &middot; Sign in with Google &middot; Free plan forever</p>
          </div>
        </section>
      </div>
    </>
  );
}
