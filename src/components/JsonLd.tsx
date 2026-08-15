import { COMPANY, QUOTE_EMAIL, SITE_URL } from "@/lib/company";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  email: QUOTE_EMAIL,
  description:
    "4–14 mm 3D CNC wire forming manufacturer in Northeast Ohio. Custom wire forms, frames, baskets, and guards.",
  address: {
    "@type": "PostalAddress",
    addressRegion: "OH",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  knowsAbout: [
    "CNC Wire Forming",
    "Wire Bending",
    "Custom Wire Forms",
    "Wire Fabrication",
    "Resistance Welding",
    "Metal Forming",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Wire Forming Products",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Hooks and Rings",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "S-hooks" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "D-rings" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "J-hooks" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Frames and Guards",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Wire Frames" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Machine Guards" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Fan Guards" } },
        ],
      },
    ],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: COMPANY,
  url: SITE_URL,
  email: QUOTE_EMAIL,
  description:
    "Custom CNC wire forming manufacturer specializing in 4–14 mm wire. 50+ years of industry experience.",
  address: {
    "@type": "PostalAddress",
    addressRegion: "OH",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.4993,
    longitude: -81.6944,
  },
  areaServed: "United States",
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "17:00",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: COMPANY,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export function JsonLd({ data }: { data?: object }) {
  const jsonLd = data ?? [organizationJsonLd, localBusinessJsonLd, websiteJsonLd];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ProductJsonLd({
  name,
  description,
  url,
  image,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: `${SITE_URL}${url}`,
    image: image ?? `${SITE_URL}/shop/hero-forms.jpg`,
    brand: {
      "@type": "Brand",
      name: COMPANY,
    },
    manufacturer: {
      "@type": "Organization",
      name: COMPANY,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        eligibleQuantity: {
          "@type": "QuantitativeValue",
          minValue: 100,
          unitText: "pieces",
        },
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

export function FAQJsonLd({
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

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: `${SITE_URL}${item.url}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
