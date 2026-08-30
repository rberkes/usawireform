import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogBody } from "@/components/BlogBody";
import { BreadcrumbJsonLd, JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuoteBand } from "@/components/DocPage";
import { Page, PageHero } from "@/components/ui";
import { allPosts, formatPostDate, getPost, postPath } from "@/lib/blog";
import { COMPANY, SITE_URL } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.description,
    path: postPath(post),
    keywords: [post.title, ...post.tags, "wire forming blog"],
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}${postPath(post)}`;
  const toc = post.blocks.flatMap((block) =>
    block.type === "h2" ? [{ id: block.id, label: block.text }] : [],
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          author: { "@type": "Organization", name: COMPANY },
          publisher: { "@type": "Organization", name: COMPANY },
          mainEntityOfPage: url,
          url,
          keywords: post.tags.join(", "),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Blog", url: "/blog" },
          { name: post.title, url: postPath(post) },
        ]}
      />
      <Page className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
        <article className="min-w-0">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.kind === "briefing" ? "Daily" : "Article" },
            ]}
          />
          <PageHero
            kicker={
              post.kind === "briefing"
                ? `Briefing · ${formatPostDate(post.date)}`
                : formatPostDate(post.date)
            }
            title={post.title}
            lede={post.description}
          />
          <BlogBody blocks={post.blocks} />
          {post.related.length > 0 ? (
            <div className="article mt-12">
              <h2 id="related">Related</h2>
              <ul>
                {post.related.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/blog">All blog posts</Link>
                </li>
                {post.kind === "briefing" ? (
                  <li>
                    <Link href="/blog/daily">Today’s briefing</Link>
                  </li>
                ) : null}
              </ul>
            </div>
          ) : null}
          <QuoteBand title="Have a structure to form?" />
        </article>
        {toc.length > 0 ? (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="font-mono text-[12px] tracking-[0.22em] text-muted uppercase">
                On this page
              </p>
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
        ) : null}
      </Page>
    </>
  );
}
