import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/shop/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/vendor/occt-import-js/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/fan-guard", destination: "/products/fan-guards", permanent: true },
      {
        source: "/magazine-rack",
        destination: "/products/magazine-racks",
        permanent: true,
      },
      {
        source: "/newspaper-rack",
        destination: "/products/newspaper-racks",
        permanent: true,
      },
      {
        source: "/wire-basket",
        destination: "/products/heavy-duty-wire-baskets",
        permanent: true,
      },
      { source: "/wire-display", destination: "/products/wire-displays", permanent: true },
      { source: "/wire-grid", destination: "/products/mesh-grids", permanent: true },
      { source: "/wire-guard", destination: "/products/machine-guards", permanent: true },
      { source: "/wire-handle", destination: "/products/handles", permanent: true },
      { source: "/wire-hook", destination: "/products/s-hooks", permanent: true },
      { source: "/wire-rack", destination: "/products/wire-racks", permanent: true },
      { source: "/wire-shelve", destination: "/products/wire-shelves", permanent: true },
      { source: "/wire-shelf", destination: "/products/wire-shelves", permanent: true },
      { source: "/wire-form-part", destination: "/wire-parts", permanent: true },
      { source: "/wire-part", destination: "/wire-parts", permanent: true },
      { source: "/wire-product", destination: "/products", permanent: true },
      { source: "/sitemap", destination: "/site-map", permanent: true },
      { source: "/step-viewer", destination: "/models", permanent: true },
      {
        source: "/our-past-projects",
        destination: "/past-projects",
        permanent: true,
      },
      {
        source: "/wire-forming-cities",
        destination: "/directory/areas",
        permanent: true,
      },
      {
        source: "/products/duggage-inserts",
        destination: "/products/dunnage-inserts",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
