import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ArticleSchema } from "@/components/SeoSchemas";
import { BlogPostHeader, RelatedPosts } from "@/components/BlogComponents";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, ButtonLink } from "@/components/ui";
import {
  getBlogPost,
  getAllBlogPosts,
  categoryLabels,
  type BlogPost,
} from "@/lib/blog";
import { COMPANY, SITE_URL } from "@/lib/company";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const breadcrumbItems = [
    { label: "Blog", href: "/blog" },
    { label: categoryLabels[post.category], href: `/blog?category=${post.category}` },
    { label: post.title },
  ];

  return (
    <>
      <ArticleSchema
        headline={post.title}
        description={post.excerpt}
        url={`/blog/${post.slug}`}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Blog", url: "/blog" },
          { name: categoryLabels[post.category], url: `/blog?category=${post.category}` },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />

      <Page className="max-w-4xl">
        <Breadcrumbs items={breadcrumbItems} />

        <BlogPostHeader post={post} />

        <article className="article mt-12">
          <BlogContent content={post.content} />
        </article>

        {/* Author & Share */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-y border-line py-6">
          <div>
            <p className="text-sm text-muted">Written by</p>
            <p className="font-medium">{post.author}</p>
          </div>
          <div className="flex gap-3">
            <ButtonLink href="/blog" variant="ghost">
              ← Back to Blog
            </ButtonLink>
            <ButtonLink href="/contact" variant="primary">
              Request a Quote
            </ButtonLink>
          </div>
        </div>

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} />

        {/* CTA */}
        <StepQuoteBlock className="mt-16" title="Have a wire forming project?" />
      </Page>
    </>
  );
}

function BlogContent({ content }: { content: string }) {
  const paragraphs = content.split("\n\n").filter(Boolean);

  return (
    <>
      {paragraphs.map((paragraph, index) => {
        if (paragraph.startsWith("## ")) {
          return (
            <h2 key={index} id={slugify(paragraph.slice(3))}>
              {paragraph.slice(3)}
            </h2>
          );
        }
        if (paragraph.startsWith("### ")) {
          return <h3 key={index}>{paragraph.slice(4)}</h3>;
        }
        if (paragraph.startsWith("- ")) {
          const items = paragraph.split("\n").filter((line) => line.startsWith("- "));
          return (
            <ul key={index}>
              {items.map((item, i) => (
                <li key={i}>{item.slice(2)}</li>
              ))}
            </ul>
          );
        }
        if (paragraph.startsWith("1. ")) {
          const items = paragraph.split("\n").filter((line) => /^\d+\. /.test(line));
          return (
            <ol key={index}>
              {items.map((item, i) => (
                <li key={i}>{item.replace(/^\d+\. /, "")}</li>
              ))}
            </ol>
          );
        }
        return <p key={index}>{paragraph}</p>;
      })}
    </>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
