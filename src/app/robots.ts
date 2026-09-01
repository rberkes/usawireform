import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/company";

const privatePaths = [
  "/admin",
  "/admin/",
  "/architecture",
  "/architecture/",
  "/source/dashboard",
  "/source/dashboard/",
  "/source/account",
  "/source/account/",
  "/source/claim",
  "/source/claim/",
  "/source/nda",
  "/source/nda/",
  "/source/enter",
  "/source/enter/",
  "/source/drawing",
  "/buyer/",
  "/sign-in",
  "/sign-in/",
  "/sign-up",
  "/sign-up/",
];

/** Training and clone crawlers. Public search bots stay allowed above. */
const aiTrainingAgents = [
  "GPTBot",
  "ChatGPT-User",
  "CCBot",
  "anthropic-ai",
  "ClaudeBot",
  "Claude-Web",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "cohere-ai",
  "Diffbot",
  "FacebookBot",
  "Meta-ExternalAgent",
  "PerplexityBot",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: privatePaths,
      },
      ...aiTrainingAgents.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
