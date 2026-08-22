import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/company";

const privatePaths = [
  "/admin",
  "/admin/",
  "/source/dashboard",
  "/source/dashboard/",
  "/sign-in",
  "/sign-in/",
  "/sign-up",
  "/sign-up/",
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
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
