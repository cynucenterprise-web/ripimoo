export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export interface BlogPost {
  slug: string;
  title: string;
  /**
   * A shorter version of `title` for the <title> tag specifically (on-page
   * H1 stays as `title` — the full headline). Standard SEO practice: the
   * on-page headline and the SERP title tag don't have to be identical,
   * and `title` here runs well past the ~50-60 char target for a <title>
   * on its own. Falls back to `title` if omitted.
   */
  metaTitle?: string;
  /** Meta `keywords` tag — optional, only set where explicitly requested for a post. */
  keywords?: string[];
  /**
   * Overrides for the Open Graph/Twitter title and description, when they
   * need to differ from the on-page `title`/`description` (e.g. to match an
   * exact meta title given for SEO). Falls back to `title`/`description`.
   */
  ogTitle?: string;
  ogDescription?: string;
  description: string;
  date: string; // ISO, original publish date — never changes on a content edit
  /** ISO date of the last content edit. Falls back to `date` (unchanged since publish) when omitted. */
  updated?: string;
  /** Editorial classification for the blog index's filter/search UI — not a factual claim about Ripimoo the product. */
  category: string;
  tags: string[];
  /** Public path under /public/blog — compressed WebP, ported from the design prototype as a placeholder. */
  image: string;
  author: string;
  content: BlogBlock[];
}

function wordCount(blocks: BlogBlock[]): number {
  return blocks.reduce((total, block) => {
    if (block.type === "ul" || block.type === "ol") return total + block.items.join(" ").split(/\s+/).length;
    if (block.type === "table") return total + [...block.headers, ...block.rows.flat()].join(" ").split(/\s+/).length;
    return total + block.text.split(/\s+/).length;
  }, 0);
}

/** ~200 words/minute, rounded up — derived from the post's own content, never hardcoded. */
export function readTime(post: BlogPost): string {
  const minutes = Math.max(1, Math.round(wordCount(post.content) / 200));
  return `${minutes} min read`;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "tailor-cv-without-rewriting-from-scratch",
    title: "How to Tailor Your CV to a Job Description Without Rewriting It From Scratch",
    metaTitle: "How to Tailor Your CV Without Rewriting It",
    description:
      "Three targeted changes that move a CV forward for one job — matching vocabulary, reordering by relevance, surfacing the right numbers.",
    date: "2026-08-04",
    category: "Tailoring Strategy",
    tags: ["CV Tailoring", "Vocabulary Matching", "Resume Structure"],
    image: "/blog/ats-keyword-matching.webp",
    author: "Ripimoo Editorial",
    content: [
      {
        type: "p",
        text: "Most advice about tailoring a CV assumes you have an hour to spare per application. You don't, and if you're applying to more than a handful of roles, rewriting from a blank page every time is exactly the kind of task that gets skipped under time pressure — which is how a strong CV ends up going out untailored, and getting filtered before a human reads it.",
      },
      {
        type: "p",
        text: "The good news: tailoring well doesn't mean rewriting. It means three targeted changes, applied consistently.",
      },
      { type: "h2", text: "1. Match the vocabulary, not just the meaning" },
      {
        type: "p",
        text: "If a job description says \"stakeholder management\" and your CV says \"worked closely with clients and internal teams,\" you're describing the same skill in different words — and both keyword-matching ATS software and a skimming recruiter will miss the connection. Read the posting, pull out the exact phrases it uses for skills you already have, and use those phrases. This is rewording, not invention: you're not claiming a new skill, you're describing an existing one in the employer's own language.",
      },
      { type: "h2", text: "2. Reorder before you reword" },
      {
        type: "p",
        text: "Your CV has a fixed amount of attention from any given reader — often under 10 seconds on a first pass. If your most relevant experience for this specific role is your third bullet point under your second job, move it up. Reordering costs nothing in terms of honesty (nothing about the facts changes) and often does more for relevance than any amount of rewording.",
      },
      { type: "h2", text: "3. Surface the numbers that match what they're asking for" },
      {
        type: "p",
        text: "If a posting emphasizes budget ownership and you managed a budget but buried it in a sentence about \"day-to-day operations,\" pull that number out. Specificity reads as credibility.",
      },
      { type: "h2", text: "What to never touch" },
      {
        type: "ul",
        items: [
          "Job titles, employer names, and dates — these are verifiable facts. Changing them isn't tailoring, it's misrepresentation, and it will surface in a reference check or a follow-up question.",
          "Credentials you don't have. If a posting wants a certification you don't hold, no amount of rewording closes that gap honestly — and claiming it will cost you far more than not having it.",
        ],
      },
      {
        type: "p",
        text: "Tailoring is a presentation problem, not a facts problem. Once you separate those two things, it stops being an hour of rewriting and becomes ten minutes of targeted editing — which is exactly the loop we built Ripimoo to speed up.",
      },
    ],
  },
  {
    slug: "what-ats-software-actually-looks-for",
    title: "What ATS Software Actually Looks For (and What It Doesn't)",
    metaTitle: "What ATS Software Looks For in Your Resume | Ripimoo",
    keywords: [
      "what does ATS look for",
      "ATS resume tips",
      "ATS friendly resume format",
      "how to check if resume is ATS friendly",
      "ATS myths",
    ],
    ogTitle: "What ATS Software Looks For in Your Resume | Ripimoo",
    ogDescription:
      "Think an ATS rejects 75% of resumes? Learn what applicant tracking systems really do, what they look for, and how to format your resume so it gets read.",
    description:
      "Think an ATS rejects 75% of resumes? Learn what applicant tracking systems really do, what they look for, and how to format your resume so it gets read.",
    date: "2026-08-18",
    updated: "2026-11-11",
    category: "ATS & Parsing",
    tags: ["ATS Systems", "Resume Parsing", "Keyword Matching"],
    image: "/blog/ats-parsing-pitfalls.webp",
    author: "Ripimoo Editorial",
    content: [
      {
        type: "p",
        text: "Does your resume actually fail the ATS test, or have you been following the wrong resume advice all along?",
      },
      { type: "p", text: "Then this story will open your mind." },
      { type: "p", text: "Meet Maya. She is made up, but I bet you know her." },
      {
        type: "p",
        text: "Maya had a solid resume, four years of real experience, and a free weekend. She used to apply for around 20 jobs per weekend but unfortunately she never heard back from any of them. Then she scrolled through social media and found the line that makes her stomach drop: \"**75% of resumes are rejected by a robot before a human ever sees them**.\"",
      },
      {
        type: "p",
        text: "So she does what most of us generally do. She starts stuffing keywords into her resume. She adds a fancy two-column design. She even thinks about hiding extra words in white text.",
      },
      { type: "p", text: "Stop right there!" },
      {
        type: "p",
        text: "The research tells a much calmer story. Let's walk through it together, in plain words, so you know what an ATS really does and what you can do about it.",
      },
      { type: "h2", text: "First, what is an ATS?" },
      {
        type: "p",
        text: "**ATS stands for Applicant Tracking System**. Names you might know include Greenhouse, Lever, Workday, iCIMS, and Workable.",
      },
      {
        type: "p",
        text: "Think of it as a mix of a filing cabinet and a search engine for recruiters. It collects applications, pulls the details out of each resume, and stores everything in one place so a recruiter can search it later.",
      },
      { type: "p", text: "In simple steps, here is what happens when you hit \"Submit\":" },
      {
        type: "ol",
        items: [
          "The system reads your resume (PDF, DOCX, or web form).",
          "It sorts the details into boxes: name, contact info, employers, job titles, dates, education, and skills.",
          "It saves your profile in a searchable database.",
          "It applies any rules the employer set up, like work authorization or a required degree.",
          "A recruiter searches, filters, reads, and moves people forward.",
        ],
      },
      {
        type: "p",
        text: "Notice what is missing? There is no step where a robot reads your resume and decides you are not good enough.",
      },
      { type: "h2", text: "So is the \"75% auto-rejected\" claim true?" },
      {
        type: "p",
        text: "Mostly not, based on the research we found. In a small survey of 25 recruiters by resume-platform [Enhancv](https://enhancv.com/blog/does-ats-reject-resumes/), most said their systems don't automatically reject resumes for formatting or design. Where auto-rejection did happen, it was mostly tied to hard eligibility rules such as work authorization or a required license. Enhancv sells resume tools, so treat this as an indication, not a definitive study.",
      },
      {
        type: "p",
        text: "The \"75%\" number seems to have spread through social media posts and career-coaching marketing, not through real data from the software companies.",
      },
      { type: "p", text: "Here is a quick look at the common myths:" },
      {
        type: "table",
        headers: ["What you may have heard", "What the evidence says"],
        rows: [
          ["ATS rejects 75% of resumes automatically", "Not generally true"],
          [
            "Exact keyword density is the main filter",
            "Keywords help recruiters find you, but clear structure and relevant experience matter more once a person reads it",
          ],
          ["Any PDF is unreadable", "Modern systems usually read PDFs fine, but fancy layouts can scramble the text"],
          ["The ATS makes the final hiring decision", "Usually no. It organizes candidates. People decide"],
          [
            "Formatting does not matter",
            "False. Tables, columns, text boxes, and text inside images can break the reading process",
          ],
        ],
      },
      { type: "h2", text: "So what can actually go wrong?" },
      {
        type: "p",
        text: "Here is the real problem, and it is not what Maya feared. It is a parsing **failure**.",
      },
      {
        type: "p",
        text: "Parsing just means the software trying to read your resume and sort it into those little boxes. If your layout is tricky, it can mix things up.",
      },
      {
        type: "p",
        text: "Imagine a pretty two-column resume. A person sees two neat columns. The software might read straight across, left column then right column, as one long line. Suddenly your job titles, employers, and dates are jumbled together. The recruiter sees a mess in the database, even though your original file looked great.",
      },
      {
        type: "p",
        text: "So the goal is not to beat a robot. The goal is to make your resume easy to read, for software and for people.",
      },
      { type: "h2", text: "What an ATS (and the recruiter behind it) really looks for" },
      { type: "p", text: "There are three things, and they are all friendly ones." },
      { type: "h3", text: "1. A structure it can read" },
      { type: "p", text: "Keep it simple:" },
      {
        type: "ul",
        items: [
          "One column, top to bottom",
          "Standard headings like Work Experience, Education, and Skills",
          "Normal date formats, like \"Jan 2020 – Mar 2023\"",
          "No important text inside images, icons, text boxes, or complex tables",
          "A DOCX file or a cleanly made, text-based PDF",
        ],
      },
      {
        type: "p",
        text: "Also, put your name, phone, email, city, and LinkedIn link in the main body of the page. Do not tuck them into the Word header or footer, because some systems cannot pick up text from there.",
      },
      { type: "h3", text: "2. Words a recruiter would search for" },
      {
        type: "p",
        text: "Recruiters search their database with keywords. A recruiter might type something like \"Python AND SQL AND 5+ years\" to find people.",
      },
      {
        type: "p",
        text: "That means your resume should use the real words your field uses, as long as they are true for you. The trick is to place them inside your accomplishments, not in a made-up keyword block.",
      },
      { type: "p", text: "Compare these two:" },
      {
        type: "ul",
        items: [
          "**Weak:** Responsible for reports and analysis.",
          "**Better:** Improved customer-retention reporting by building Python and SQL dashboards, reducing manual reporting time by 30%.",
        ],
      },
      {
        type: "p",
        text: "The second one is searchable, and it also makes sense to a human. That is the sweet spot.",
      },
      { type: "h3", text: "3. Clear, tailored content for the human reader" },
      {
        type: "p",
        text: "Once a real person opens your resume, here is what recruiters consistently say matters:",
      },
      {
        type: "ul",
        items: [
          "Clear, easy-to-scan structure — ranked first (92%) in a small [Enhancv](https://enhancv.com/blog/does-ats-reject-resumes/) survey of recruiters",
          "Relevant experience and skills — ranked close behind (88%) in the same survey",
          "Content tailored to the specific job",
          "Short bullet points focused on results",
        ],
      },
      {
        type: "p",
        text: "So tailoring is not about stuffing in more words. It is about showing your closest matching experience and making the link to the job obvious.",
      },
      { type: "h2", text: "The part most people miss: knockout questions" },
      {
        type: "p",
        text: "Many early \"rejections\" do not come from your resume at all. They come from the questions in the application form.",
      },
      { type: "p", text: "Employers can set simple eligibility rules, such as:" },
      {
        type: "ul",
        items: [
          "Are you legally authorized to work in the U.S.?",
          "Do you have the required license or certification?",
          "Do you meet the minimum years of experience?",
          "Are you willing to relocate?",
        ],
      },
      {
        type: "p",
        text: "These are rules the employer set. They are not smart AI judging you. Answer them honestly. If you bend the truth to get past one, it can come back during verification or interviews.",
      },
      { type: "h2", text: "One more thing: there is no magic \"ATS score\"" },
      {
        type: "p",
        text: "There is no single, universal ATS score. Free resume checkers can be helpful, but their scores come from their own tool, not from some master formula every employer uses. Also, the ATS market is split across many companies, so one-size-fits-all \"hacks\" probably will not work.",
      },
      {
        type: "p",
        text: "Keyword-only matching has a known weakness: it can miss a good candidate who described the same skill in different words — a synonym, an acronym, a different phrasing. Systems that match on meaning rather than exact text handle this better, though results vary by implementation. The simple lesson is still useful: use clear, standard terms, and where it fits, include both the full term and the short one, like \"Search Engine Optimization (SEO)\".",
      },
      { type: "h2", text: "A simple example you can copy" },
      {
        type: "p",
        text: "Here is what a clean, ATS-friendly layout can look like (the details are fictional):",
      },
      {
        type: "p",
        text: "**JORDAN A. SMITH** Austin, TX | (555) 123-4567 | jordan.smith@email.com | linkedin.com/in/jordans",
      },
      {
        type: "p",
        text: "**PROFESSIONAL SUMMARY** Data analyst with 4 years of experience using SQL, Python, and Tableau to improve reporting and support business decisions.",
      },
      { type: "p", text: "**SKILLS** SQL | Python | Tableau | Power BI | Excel | Data Visualization" },
      {
        type: "p",
        text: "**WORK EXPERIENCE** Data Analyst | ABC Company | Austin, TX | Jan 2022 – Present",
      },
      {
        type: "ul",
        items: [
          "Built SQL-based dashboards in Tableau used by 12 business teams.",
          "Automated weekly reporting in Python, reducing manual reporting time by 30%.",
          "Partnered with product and finance teams to define KPIs and improve data quality.",
        ],
      },
      { type: "p", text: "**EDUCATION** Bachelor of Science, Computer Science | University Name | 2016 – 2020" },
      {
        type: "p",
        text: "See how every job follows the same order: Job Title, Employer, Location, Dates. That predictable pattern helps software sort each piece into the right box.",
      },
      { type: "h3", text: "Quick formatting rules" },
      {
        type: "ul",
        items: [
          "**Fonts:** Calibri, Arial, Helvetica, or Times New Roman at 10–12 pt",
          "**Margins:** 0.75 to 1 inch",
          "**Headings:** Plain ones like \"Skills\" and \"Education,\" not creative labels like \"My Journey\"",
          "**Bullets:** Standard bullets or hyphens, not icons or emoji",
          "**File:** DOCX or a text-based PDF, never a scanned or image-only PDF",
        ],
      },
      { type: "h2", text: "How to test your resume in two minutes" },
      { type: "p", text: "This is my favorite tip because it costs nothing." },
      {
        type: "ol",
        items: [
          "Open your resume and select everything (Ctrl+A on Windows, Cmd+A on Mac).",
          "Copy it, then paste it into Notepad, TextEdit, or a blank email.",
          "Read what comes out.",
        ],
      },
      {
        type: "p",
        text: "If your name, contact details, job titles, employers, dates, and skills show up in a sensible order, you are in good shape. If things are missing, merged, or jumbled, simplify your layout and try again.",
      },
      {
        type: "p",
        text: "After that, you can run a free checker as a sanity check. The research mentions tools like Jobscan, Resume Worded, Enhancv, ResumeAtlas, and Teal. A good habit is to use one for parsing and one for matching against a job description. Treat the result as a hint, not a verdict. A high score does not guarantee an interview, and a low score does not mean you are doomed.",
      },
      { type: "h2", text: "What to do before you hit submit" },
      {
        type: "ul",
        items: [
          "Read the job post and note the skills, tools, and duties that show up again and again.",
          "Use those words only where they are honestly true for you.",
          "Lead each bullet with an action verb and, if you can, a result (money saved, time cut, users reached).",
          "Skip hidden white-text keywords. They are generally ineffective and can hurt your credibility if someone spots them.",
          "Do not copy the job description word for word. Be ready to explain everything in an interview.",
          "Answer the knockout questions truthfully.",
          "If you can, reach out to a recruiter or ask for a referral. Human connections often matter more than perfect formatting.",
        ],
      },
      { type: "h2", text: "Back to Maya" },
      {
        type: "p",
        text: "Maya deleted the fancy two-column template. She moved her phone number and email out of the header. She rewrote her bullets so each one showed a tool and a result. She copied and pasted her resume into Notepad, and everything came out in the right order.",
      },
      {
        type: "p",
        text: "She did not trick a robot. She just made her resume easy to read and easy to understand. And that is really the whole secret.",
      },
      { type: "h2", text: "The bottom line" },
      {
        type: "p",
        text: "An ATS mostly does three jobs: it reads your resume into fields, it lets recruiters search, and it follows the eligibility rules your employer sets. It usually does not auto-reject most resumes for imperfect keywords.",
      },
      {
        type: "p",
        text: "If you want to tailor your CV to each job without inventing anything, [Ripimoo](/) only rewrites your wording, keeps your facts locked, and shows every change before you download, so you can accept, undo or edit each one.",
      },
    ],
  },
  {
    slug: "cv-mistakes-filtered-before-human-reads",
    title: "5 CV Mistakes That Get Filtered Out Before a Human Ever Sees It",
    metaTitle: "5 CV Mistakes That Get Filtered Before Review",
    description:
      "Five small, fixable formatting and wording mistakes that quietly get a CV filtered out before any human reads it — and exactly how to fix each one.",
    date: "2026-09-01",
    category: "CV Mistakes",
    tags: ["Formatting", "ATS Systems", "CV Mistakes"],
    image: "/blog/cv-honesty-and-facts.webp",
    author: "Ripimoo Editorial",
    content: [
      {
        type: "p",
        text: "Most CV rejections aren't about qualifications. They're about small, fixable issues that never get flagged because no one tells you — the application just goes quiet. Here are five that come up constantly.",
      },
      { type: "h2", text: "1. Contact info or work history locked inside an image" },
      {
        type: "p",
        text: "A stylish header graphic with your name and phone number looks good to a human eye and is invisible to most parsers. If your name doesn't parse, the rest of your application may never get properly filed under you.",
      },
      { type: "h2", text: "2. Dates that don't parse as dates" },
      {
        type: "p",
        text: "\"Summer 2022 – Present\" or \"2yrs, Jan\" are readable to a person but ambiguous to software expecting a standard date format. Stick to \"Month Year – Month Year\" or \"Month Year – Present.\"",
      },
      { type: "h2", text: "3. Generic section headers that don't match expected fields" },
      {
        type: "p",
        text: "\"My Journey\" instead of \"Work Experience,\" or \"What I Bring\" instead of \"Skills,\" reads as creative to a person and as unrecognized to a parser expecting standard section names. Save the personality for your cover letter.",
      },
      { type: "h2", text: "4. One CV for every application" },
      {
        type: "p",
        text: "Not tailoring at all is the most common mistake on this list, and the most costly — a generic CV reads as generic effort, and it under-uses keyword matching entirely, even when the underlying experience is a strong fit.",
      },
      { type: "h2", text: "5. Padding a weak match with unrelated keywords" },
      {
        type: "p",
        text: "The overcorrection: stuffing in every term from the job posting regardless of whether it's true. This doesn't just risk getting caught in an interview — dense, context-free keyword lists are also increasingly recognized and discounted by more sophisticated ranking systems.",
      },
      {
        type: "p",
        text: "None of these require a rewrite to fix. They require a careful pass with the actual job posting open next to your CV — which is the exact gap a tailoring tool like Ripimoo is built to close in minutes instead of an evening.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
