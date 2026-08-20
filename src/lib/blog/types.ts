export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO date YYYY-MM-DD */
  date: string;
  kind: "article" | "briefing";
  tags: string[];
  related: { href: string; label: string }[];
  blocks: BlogBlock[];
};

export function postPath(post: BlogPost) {
  return `/blog/${post.slug}`;
}
