import { Children, cloneElement, isValidElement, type ReactNode, type ReactElement } from "react";
import { ClockIcon } from "@/components/ui/icons";

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Table of contents is extracted from the page's own <h2> children at
 * render time — real legal text never needs to be duplicated into a
 * separate "sections" data structure just to build a TOC. No client JS
 * needed: the mobile TOC is a native <details>, desktop is CSS sticky,
 * and jumping to a section is a plain #id anchor link.
 */
export default function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  const items = Children.toArray(children);
  const toc: { id: string; title: string }[] = [];
  const withIds = items.map((child) => {
    if (isValidElement<{ children?: ReactNode }>(child) && child.type === "h2") {
      const text = textOf(child.props.children);
      const id = slugify(text);
      toc.push({ id, title: text });
      return cloneElement(child as ReactElement<{ id?: string; className?: string }>, { id, className: "scroll-mt-24" });
    }
    return child;
  });

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 md:space-y-12 md:py-20 lg:px-8">
      <div className="space-y-3 border-b border-line pb-6 md:pb-8">
        <div className="flex items-center gap-2 text-xs text-ink-soft">
          <ClockIcon />
          <span>Last updated: {updated}</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h1>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
        {toc.length > 0 && (
          <aside className="space-y-3 md:sticky md:top-24 md:col-span-4">
            <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-xs">
              <details className="md:hidden">
                <summary className="flex cursor-pointer items-center justify-between p-4 text-left text-xs font-bold text-ink">
                  <span className="uppercase tracking-wider">Contents ({toc.length})</span>
                  <span className="font-semibold text-accent">Jump to section</span>
                </summary>
                <nav className="space-y-1 p-4 pt-0 text-xs">
                  {toc.map((item) => (
                    <a key={item.id} href={`#${item.id}`} className="block rounded-lg px-2.5 py-2 text-ink-soft transition-colors hover:text-ink">
                      {item.title}
                    </a>
                  ))}
                </nav>
              </details>
              <div className="hidden md:block">
                <span className="block px-4 pb-2 pt-4 text-xs font-bold uppercase tracking-wider text-ink-soft">Contents</span>
                <nav className="space-y-1 p-4 pt-0 text-xs">
                  {toc.map((item) => (
                    <a key={item.id} href={`#${item.id}`} className="block rounded-lg px-2.5 py-2 text-ink-soft transition-colors hover:bg-paper-soft hover:text-ink">
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        )}

        <main className={`space-y-6 text-[15px] leading-relaxed text-ink-soft ${toc.length > 0 ? "md:col-span-8" : "md:col-span-12"} [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-ink [&_h2]:tracking-tight [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6`}>
          {withIds}
        </main>
      </div>
    </div>
  );
}
