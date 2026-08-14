import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import {
  Page,
  PageHero,
  Section,
  Kicker,
  ButtonLink,
} from "@/components/ui";
import { BlogPostCard, CategoryFilter } from "@/components/BlogComponents";
import {
  getAllBlogPosts,
  categoryLabels,
  type BlogCategory,
  type BlogPostMeta,
} from "@/lib/blog";
import { COMPANY } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Blog",
  description: `Wire forming industry news, technology updates, and trade show coverage from ${COMPANY}. Stay informed about CNC wire bending, manufacturing trends, and events.`,
  path: "/blog",
  keywords: [
    "wire forming blog",
    "CNC wire bending news",
    "manufacturing industry news",
    "wire forming technology",
    "trade show coverage",
  ],
});

export const revalidate = 3600;

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const selectedCategory = params.category as BlogCategory | undefined;

  const allPosts = await getAllBlogPosts();
  const posts = selectedCategory
    ? allPosts.filter((post) => post.category === selectedCategory)
    : allPosts;

  const featuredPosts = allPosts.filter((post) => post.featured).slice(0, 3);
  const recentPosts = selectedCategory ? posts : posts.slice(0, 12);

  const breadcrumbItems = [{ label: "Blog" }];

  return (
    <Page>
      <BreadcrumbJsonLd items={[{ name: "Blog", url: "/blog" }]} />
      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        kicker="Blog"
        title="Wire forming insights"
        lede="Industry news, technology updates, trade show coverage, and manufacturing best practices from the wire forming world."
      >
        <ButtonLink href="/blog/feed.xml" variant="ghost">
          RSS Feed
        </ButtonLink>
      </PageHero>

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        className="mt-10"
      />

      {/* Featured Posts (only show if no category filter) */}
      {!selectedCategory && featuredPosts.length > 0 && (
        <Section kicker="Featured" className="mt-12">
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} featured />
            ))}
          </div>
        </Section>
      )}

      {/* All/Filtered Posts */}
      <Section
        kicker={selectedCategory ? categoryLabels[selectedCategory] : "Latest"}
        title={
          selectedCategory
            ? `${categoryLabels[selectedCategory]} articles`
            : "Recent articles"
        }
        className="mt-12"
      >
        {recentPosts.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState category={selectedCategory} />
        )}
      </Section>

      {/* Categories Overview (only show if no filter) */}
      {!selectedCategory && (
        <Section kicker="Topics" title="Browse by category" className="mt-16">
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(categoryLabels).map(([key, label]) => {
              const categoryPosts = allPosts.filter(
                (post) => post.category === key
              );
              return (
                <Link
                  key={key}
                  href={`/blog?category=${key}`}
                  className="group border border-line p-5 hover:border-copper/30"
                >
                  <h3 className="font-medium group-hover:text-copper">
                    {label}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {categoryPosts.length} article
                    {categoryPosts.length !== 1 ? "s" : ""}
                  </p>
                </Link>
              );
            })}
          </div>
        </Section>
      )}
    </Page>
  );
}

function EmptyState({ category }: { category?: BlogCategory }) {
  return (
    <div className="mt-8 border border-line bg-inset p-8 text-center">
      <p className="text-muted">
        {category
          ? `No articles in ${categoryLabels[category]} yet.`
          : "No blog posts yet."}
      </p>
      <p className="mt-2 text-sm text-muted">
        Check back soon for new content about wire forming industry news,
        technology, and events.
      </p>
    </div>
  );
}
