import { allPosts, postPath, todaysBriefing } from "@/lib/blog";
import { COMPANY, SITE_URL } from "@/lib/company";

function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const revalidate = 3600;

export async function GET() {
  const today = todaysBriefing();
  const items = allPosts()
    .map((post) => {
      const url = `${SITE_URL}${postPath(post)}`;
      return `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.date}T12:00:00-05:00`).toUTCString()}</pubDate>
      <description>${xmlEscape(post.description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${xmlEscape(`${COMPANY} blog`)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${xmlEscape("Wire forming, wire form structures, and a daily briefing from Northeast Ohio.")}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <item>
      <title>${xmlEscape(`Today: ${today.title}`)}</title>
      <link>${SITE_URL}/blog/daily</link>
      <guid isPermaLink="true">${SITE_URL}/blog/daily</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <description>${xmlEscape(today.description)}</description>
    </item>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
