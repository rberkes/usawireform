import { COMPANY, QUOTE_EMAIL, SITE_URL } from "@/lib/company";

/**
 * Video Schema for video content
 */
export function VideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl,
    uploadDate,
    ...(duration && { duration }),
    ...(contentUrl && { contentUrl }),
    ...(embedUrl && { embedUrl }),
    publisher: {
      "@type": "Organization",
      name: COMPANY,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Video List Schema for video gallery pages
 */
export function VideoListSchema({
  videos,
}: {
  videos: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    contentUrl?: string;
    embedUrl?: string;
  }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: videos.map((video, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "VideoObject",
        name: video.name,
        description: video.description,
        thumbnailUrl: video.thumbnailUrl,
        uploadDate: video.uploadDate,
        ...(video.contentUrl && { contentUrl: video.contentUrl }),
        ...(video.embedUrl && { embedUrl: video.embedUrl }),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Review Schema for testimonials
 */
export function ReviewSchema({
  itemName,
  reviews,
}: {
  itemName: string;
  reviews: {
    author: string;
    reviewBody: string;
    ratingValue?: number;
  }[];
}) {
  const avgRating = reviews.reduce((sum, r) => sum + (r.ratingValue ?? 5), 0) / reviews.length;
  
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: itemName,
    url: SITE_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      reviewBody: review.reviewBody,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.ratingValue ?? 5,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * FAQ Schema for pages with Q&A content
 */
export function FAQSchema({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Service Schema for service pages
 */
export function ServiceSchema({
  name,
  description,
  url,
  areaServed = "United States",
  serviceType,
}: {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
  serviceType?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${url}`,
    provider: {
      "@type": "Organization",
      name: COMPANY,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: areaServed,
    },
    serviceType: serviceType ?? name,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Product schema for NumAlliance machines sold from this site.
 * Custom wire forms are Services, not Products — do not reuse this on catalog pages.
 * `price` must match the visible USD price on the page for product snippets.
 */
export function MachineProductSchema({
  name,
  description,
  path,
  imagePath,
  mpn,
  category,
  priceUsd,
}: {
  name: string;
  description: string;
  path: string;
  imagePath: string;
  mpn?: string;
  category: "3d" | "2d";
  priceUsd: number;
}) {
  const pageUrl = `${SITE_URL}${path}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: `${SITE_URL}${imagePath}`,
    url: pageUrl,
    sku: mpn,
    mpn,
    category:
      category === "3d"
        ? "3D CNC Wire Bending Machine"
        : "2D CNC Wire Bending Machine",
    brand: {
      "@type": "Brand",
      name: "NumAlliance",
    },
    manufacturer: {
      "@type": "Organization",
      name: "NumAlliance",
    },
    offers: {
      "@type": "Offer",
      url: pageUrl,
      price: priceUsd,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: COMPANY,
        url: SITE_URL,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * HowTo Schema for instructional content
 */
export function HowToSchema({
  name,
  description,
  steps,
  totalTime,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
    ...(totalTime && { totalTime }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Article Schema for blog/guide content
 */
export function ArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${SITE_URL}${url}`,
    author: {
      "@type": "Organization",
      name: COMPANY,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
    },
    datePublished: datePublished ?? new Date().toISOString(),
    dateModified: dateModified ?? new Date().toISOString(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Aggregate Rating Schema (for future use with reviews)
 */
export function AggregateRatingSchema({
  itemName,
  ratingValue,
  reviewCount,
  bestRating = 5,
  worstRating = 1,
}: {
  itemName: string;
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: itemName,
    url: SITE_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
      bestRating,
      worstRating,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Local Business with enhanced geo data
 */
export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ManufacturingBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: COMPANY,
    url: SITE_URL,
    email: QUOTE_EMAIL,
    description:
      "Custom CNC wire forming manufacturer specializing in 4–14 mm wire. 50+ years of industry experience in Northeast Ohio.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cleveland",
      addressRegion: "OH",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.4993,
      longitude: -81.6944,
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "State", name: "Ohio" },
    ],
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Invoice, Wire Transfer, Credit Card",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wire Forming Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "CNC Wire Forming",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D CNC Wire Forming" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "2D CNC Wire Forming" } },
          ],
        },
        {
          "@type": "OfferCatalog", 
          name: "Secondary Operations",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Resistance Welding" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Plating and Coating" } },
          ],
        },
      ],
    },
    sameAs: [],
    knowsAbout: [
      "CNC Wire Forming",
      "Wire Bending",
      "Custom Wire Forms", 
      "Wire Baskets",
      "Wire Guards",
      "Resistance Welding",
      "Wire Fabrication",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
