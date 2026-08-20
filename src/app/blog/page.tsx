import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page, PageHero, Section, TextLink } from "@/components/ui";
import {
  allBriefings,
  formatPostDate,
  ohioDateLabel,
  postPath,
  publishedArticles,
  todaysBriefing,
} from "@/lib/blog";
import { COMPANY } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Blog — Wire Forming News and Structures",
  description: `${COMPANY} blog: wire forming, wire form structures, and a daily briefing that rotates automatically. Northeast Ohio. 4–14 mm.`,
  path: "/blog",
  keywords: [
    "wire forming blog",
    "wire form structures",
    "CNC wire forming news",
    "daily wire forming",
  ],
});

/** Refresh so today's briefing updates without a rebuild. */
export const revalidate = 3600;

export default function BlogIndexPage() {
  const today = todaysBriefing();
  const articles = publishedArticles();
  const briefings = allBriefings();

  return (
    <Page>
      <BreadcrumbJsonLd items={[{ name: "Blog", url: "/blog" }]} />
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <PageHero
        kicker="Blog"
        title="Wire forming news and structures"
        lede="Shop notes and process writing in 4–14 mm. A daily briefing rotates automatically from a curated pool — Ohio calendar, no thin auto-generated filler."
      >
        <TextLink href="/blog/daily">Today’s briefing</TextLink>
        <span className="text-muted"> · </span>
        <TextLink href="/blog/feed.xml">RSS</TextLink>
      </PageHero>

      <Section kicker={ohioDateLabel()} title={today.title}>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          {today.description} This slot changes every morning. The same piece
          also lives at a stable URL so crawlers are not chasing a new page
          each day.
        </p>
        <p className="mt-4">
          <Link
            href={postPath(today)}
            className="text-sm text-copper hover:underline"
          >
            Read today’s briefing
          </Link>
          <span className="text-muted"> · </span>
          <Link href="/blog/daily" className="text-sm text-copper hover:underline">
            Daily page
          </Link>
        </p>
      </Section>

      <Section title="Articles">
        <ul className="mt-5 divide-y divide-line border-y border-line">
          {articles.map((post) => (
            <li key={post.slug} className="py-5">
              <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
                {formatPostDate(post.date)} · {post.tags[0]}
              </p>
              <Link
                href={postPath(post)}
                className="mt-1 block text-lg font-medium tracking-tight hover:text-copper"
              >
                {post.title}
              </Link>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                {post.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Daily briefing library">
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          {briefings.length} short pieces. `/blog/daily` shows one per Ohio
          day, then repeats. Add more in the repo — no CMS required.
        </p>
        <ul className="mt-5 columns-1 gap-x-8 sm:columns-2">
          {briefings.map((post) => (
            <li key={post.slug} className="break-inside-avoid py-1.5">
              <Link
                href={postPath(post)}
                className="text-sm text-muted hover:text-copper"
              >
                {post.title.replace(/^Daily briefing:\s*/i, "")}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </Page>
  );
}
