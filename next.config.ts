import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
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
      { source: "/wire-hook", destination: "/powder-coating-hooks/s-hooks", permanent: true },
      { source: "/s-hook", destination: "/powder-coating-hooks/s-hooks", permanent: true },
      { source: "/s-hooks", destination: "/powder-coating-hooks/s-hooks", permanent: true },
      { source: "/v-hook", destination: "/powder-coating-hooks/v-hooks", permanent: true },
      { source: "/v-hooks", destination: "/powder-coating-hooks/v-hooks", permanent: true },
      { source: "/c-hook", destination: "/powder-coating-hooks/c-hooks", permanent: true },
      { source: "/c-hooks", destination: "/powder-coating-hooks/c-hooks", permanent: true },
      { source: "/cv-hook", destination: "/powder-coating-hooks/cv-hooks", permanent: true },
      { source: "/cv-hooks", destination: "/powder-coating-hooks/cv-hooks", permanent: true },
      {
        source: "/powder-coating-hook",
        destination: "/powder-coating-hooks",
        permanent: true,
      },
      {
        source: "/90-degree-hook",
        destination: "/powder-coating-hooks/90-degree-hooks",
        permanent: true,
      },
      {
        source: "/90-degree-hooks",
        destination: "/powder-coating-hooks/90-degree-hooks",
        permanent: true,
      },
      {
        source: "/90-hooks",
        destination: "/powder-coating-hooks/90-degree-hooks",
        permanent: true,
      },
      {
        source: "/square-hanging-hooks",
        destination: "/powder-coating-hooks/square-hanging-hooks",
        permanent: true,
      },
      {
        source: "/powder-coating-hook-prices",
        destination: "/powder-coating-hooks/prices",
        permanent: true,
      },
      {
        source: "/custom-powder-coating-hook",
        destination: "/custom-powder-coating-hooks",
        permanent: true,
      },
      {
        source: "/stainless-powder-coating-hooks",
        destination: "/stainless-steel-powder-coating-hooks",
        permanent: true,
      },
      {
        source: "/powder-coating-v-hook",
        destination: "/powder-coating-v-hooks",
        permanent: true,
      },
      {
        source: "/120-v-hooks",
        destination: "/powder-coating-v-hooks",
        permanent: true,
      },
      {
        source: "/0.120-v-hooks",
        destination: "/powder-coating-v-hooks",
        permanent: true,
      },
      { source: "/375-v-hook", destination: "/375-v-hooks", permanent: true },
      { source: "/0.375-v-hooks", destination: "/375-v-hooks", permanent: true },
      { source: "/3-8-v-hooks", destination: "/375-v-hooks", permanent: true },
      { source: "/3-8-inch-v-hooks", destination: "/375-v-hooks", permanent: true },
      { source: "/steel-v-hook", destination: "/steel-v-hooks", permanent: true },
      {
        source: "/stainless-steel-v-hook",
        destination: "/stainless-steel-v-hooks",
        permanent: true,
      },
      {
        source: "/90-degree-v-hook",
        destination: "/90-degree-v-hooks",
        permanent: true,
      },
      {
        source: "/heavy-duty-v-hook",
        destination: "/heavy-duty-v-hooks",
        permanent: true,
      },
      {
        source: "/heavy-duty-powder-coat-v-hooks",
        destination: "/heavy-duty-v-hooks",
        permanent: true,
      },
      {
        source: "/usa-made-heavy-duty-powder-coat-v-hooks",
        destination: "/heavy-duty-v-hooks",
        permanent: true,
      },
      { source: "/custom-v-hook", destination: "/custom-v-hooks", permanent: true },
      {
        source: "/hook-builder",
        destination: "/custom-powder-coating-hooks",
        permanent: true,
      },
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
        source: "/source/job",
        destination: "/source",
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
