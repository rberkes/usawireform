import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
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
    ];
  },
};

export default nextConfig;
