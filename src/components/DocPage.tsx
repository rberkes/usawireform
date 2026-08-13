import type { ReactNode } from "react";
import { StepQuoteBlock } from "./StepUpload";
import { Kicker, Page, PageHero } from "./ui";

type TocItem = { id: string; label: string };

export function DocPage({
  kicker,
  title,
  lede,
  toc,
  children,
}: {
  kicker: string;
  title: string;
  lede: string;
  toc: TocItem[];
  children: ReactNode;
}) {
  return (
    <Page className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
      <article className="min-w-0">
        <PageHero kicker={kicker} title={title} lede={lede} />
        <div className="article mt-12">{children}</div>
      </article>
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <Kicker tone="muted">On this page</Kicker>
          <nav className="mt-4 flex flex-col gap-2.5">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm leading-5 text-muted hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </Page>
  );
}

export function QuoteBand({
  title = "Have a form to run?",
}: {
  title?: string;
}) {
  return <StepQuoteBlock className="mt-16" title={title} />;
}
