import { list, put, del } from "@vercel/blob";

export type BlogCategory =
  | "technology"
  | "trade-shows"
  | "industry-news"
  | "manufacturing"
  | "materials"
  | "equipment";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readingTime: number;
  featured?: boolean;
};

export type BlogPostMeta = Omit<BlogPost, "content">;

const BLOG_PREFIX = "blog/posts/";

export const categoryLabels: Record<BlogCategory, string> = {
  technology: "Technology",
  "trade-shows": "Trade Shows & Events",
  "industry-news": "Industry News",
  manufacturing: "Manufacturing",
  materials: "Materials",
  equipment: "Equipment",
};

export const categoryDescriptions: Record<BlogCategory, string> = {
  technology: "Latest innovations in CNC wire forming and automation",
  "trade-shows": "Upcoming events, conferences, and industry gatherings",
  "industry-news": "News and trends from the wire forming industry",
  manufacturing: "Best practices, tips, and manufacturing insights",
  materials: "Wire materials, coatings, and specifications",
  equipment: "CNC machines, tooling, and equipment updates",
};

function generateSlug(title: string, date: string): string {
  const datePrefix = date.split("T")[0];
  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  return `${datePrefix}-${titleSlug}`;
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export async function saveBlogPost(
  post: Omit<BlogPost, "slug" | "readingTime">
): Promise<BlogPost> {
  const slug = generateSlug(post.title, post.publishedAt);
  const readingTime = estimateReadingTime(post.content);

  const fullPost: BlogPost = {
    ...post,
    slug,
    readingTime,
  };

  const blob = await put(
    `${BLOG_PREFIX}${slug}.json`,
    JSON.stringify(fullPost),
    {
      access: "public",
      contentType: "application/json",
    }
  );

  console.log(`Blog post saved: ${blob.url}`);
  return fullPost;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const { blobs } = await list({ prefix: `${BLOG_PREFIX}${slug}.json` });
    if (blobs.length === 0) return null;

    const response = await fetch(blobs[0].url);
    if (!response.ok) return null;

    return (await response.json()) as BlogPost;
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  try {
    const { blobs } = await list({ prefix: BLOG_PREFIX });

    const posts: BlogPostMeta[] = [];

    for (const blob of blobs) {
      try {
        const response = await fetch(blob.url);
        if (!response.ok) continue;

        const post = (await response.json()) as BlogPost;
        const { content, ...meta } = post;
        posts.push(meta);
      } catch {
        continue;
      }
    }

    return posts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPostsByCategory(
  category: BlogCategory
): Promise<BlogPostMeta[]> {
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post.category === category);
}

export async function getRecentBlogPosts(
  limit: number = 5
): Promise<BlogPostMeta[]> {
  const posts = await getAllBlogPosts();
  return posts.slice(0, limit);
}

export async function getFeaturedBlogPosts(): Promise<BlogPostMeta[]> {
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post.featured);
}

export async function deleteBlogPost(slug: string): Promise<boolean> {
  try {
    await del(`${BLOG_PREFIX}${slug}.json`);
    return true;
  } catch (error) {
    console.error(`Error deleting blog post ${slug}:`, error);
    return false;
  }
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
