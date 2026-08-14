import Link from "next/link";
import {
  type BlogPostMeta,
  type BlogCategory,
  categoryLabels,
  formatDateShort,
} from "@/lib/blog";
import { cx } from "@/lib/cx";

export function BlogPostCard({
  post,
  featured = false,
}: {
  post: BlogPostMeta;
  featured?: boolean;
}) {
  return (
    <article
      className={cx(
        "group flex flex-col border border-line p-5 hover:border-copper/30",
        featured && "bg-inset"
      )}
    >
      <div className="flex items-center gap-2">
        <Link
          href={`/blog?category=${post.category}`}
          className="font-mono text-[10px] uppercase tracking-widest text-copper hover:underline"
        >
          {categoryLabels[post.category]}
        </Link>
        {featured && (
          <span className="rounded bg-copper/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-copper">
            Featured
          </span>
        )}
      </div>

      <Link href={`/blog/${post.slug}`} className="mt-3 flex-1">
        <h3 className="font-medium leading-snug group-hover:text-copper">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">
          {post.excerpt}
        </p>
      </Link>

      <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
        <span>{formatDateShort(post.publishedAt)}</span>
        <span>{post.readingTime} min read</span>
      </div>
    </article>
  );
}

export function CategoryFilter({
  selectedCategory,
  className,
}: {
  selectedCategory?: BlogCategory;
  className?: string;
}) {
  const categories = Object.entries(categoryLabels) as [BlogCategory, string][];

  return (
    <div className={cx("flex flex-wrap gap-2", className)}>
      <Link
        href="/blog"
        className={cx(
          "rounded-sm border px-3 py-1.5 text-sm transition-colors",
          !selectedCategory
            ? "border-copper bg-copper/10 text-copper"
            : "border-line text-muted hover:border-copper/50 hover:text-foreground"
        )}
      >
        All
      </Link>
      {categories.map(([key, label]) => (
        <Link
          key={key}
          href={`/blog?category=${key}`}
          className={cx(
            "rounded-sm border px-3 py-1.5 text-sm transition-colors",
            selectedCategory === key
              ? "border-copper bg-copper/10 text-copper"
              : "border-line text-muted hover:border-copper/50 hover:text-foreground"
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

export function BlogPostHeader({ post }: { post: BlogPostMeta }) {
  return (
    <header>
      <div className="flex items-center gap-3">
        <Link
          href={`/blog?category=${post.category}`}
          className="font-mono text-[12px] uppercase tracking-widest text-copper hover:underline"
        >
          {categoryLabels[post.category]}
        </Link>
        <span className="text-line">·</span>
        <time className="text-sm text-muted">
          {formatDateShort(post.publishedAt)}
        </time>
        <span className="text-line">·</span>
        <span className="text-sm text-muted">{post.readingTime} min read</span>
      </div>

      <h1 className="mt-4 max-w-3xl text-3xl font-medium tracking-tight sm:text-4xl">
        {post.title}
      </h1>

      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
        {post.excerpt}
      </p>

      {post.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm bg-inset px-2 py-1 font-mono text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}

export function RelatedPosts({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-line pt-12">
      <h2 className="font-mono text-[12px] uppercase tracking-widest text-copper">
        Related Articles
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
