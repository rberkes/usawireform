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
    "@type": "Product",
    name: itemName,
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
  image,
}: {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
  serviceType?: string;
  image?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${url}`,
    ...(image ? { image: image.startsWith("http") ? image : `${SITE_URL}${image}` } : {}),
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
 * The shop a directory page is about, as its own business entity.
 *
 * Every listing page also carries the site-level Organization and
 * LocalBusiness for USA Wire Form, so without this node the only business
 * Google can attach to `/directory/<shop>` is ours. Several hundred listing
 * pages then look like one entity described several hundred times, which reads
 * as near-duplicate rather than as a directory of distinct manufacturers.
 *
 * `url` points at the shop's own site when we know it, because that is the
 * entity's home on the web. The listing page is `mainEntityOfPage`.
 */
export function DirectoryShopSchema({
  name,
  path,
  location,
  state,
  country,
  description,
  capabilities,
  website,
  linkedin,
  phone,
  plantStreet,
  established,
  photoUrl,
  logoUrl,
  certifications,
}: {
  name: string;
  path: string;
  location: string;
  state: string;
  country: "USA" | "Canada";
  description: string;
  capabilities: string[];
  website?: string;
  linkedin?: string;
  phone?: string;
  plantStreet?: string;
  established?: string;
  photoUrl?: string;
  logoUrl?: string;
  certifications?: string[];
}) {
  const pageUrl = `${SITE_URL}${path}`;
  // `location` is stored as "City, ST"; drop the state so addressLocality is
  // just the city and does not repeat addressRegion.
  const suffix = `, ${state}`;
  const city = location.toUpperCase().endsWith(suffix.toUpperCase())
    ? location.slice(0, -suffix.length).trim()
    : location;
  const sameAs = [website, linkedin].filter(Boolean) as string[];
  const knowsAbout = [...capabilities, ...(certifications ?? [])];

  const data = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${pageUrl}#shop`,
    name,
    url: website || pageUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    description,
    address: {
      "@type": "PostalAddress",
      ...(plantStreet ? { streetAddress: plantStreet } : {}),
      // A few listings record only a province or a region, with no city.
      ...(city && city.toUpperCase() !== state.toUpperCase()
        ? { addressLocality: city }
        : {}),
      addressRegion: state,
      addressCountry: country === "Canada" ? "CA" : "US",
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(phone ? { telephone: phone } : {}),
    ...(established ? { foundingDate: established } : {}),
    ...(photoUrl ? { image: photoUrl } : {}),
    ...(logoUrl ? { logo: logoUrl } : {}),
    ...(knowsAbout.length > 0 ? { knowsAbout } : {}),
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
    "@type": "Product",
    name: itemName,
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
