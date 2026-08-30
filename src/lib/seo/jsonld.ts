import { COMPANY, QUOTE_EMAIL, SITE_PITCH, SITE_URL } from "@/lib/company";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "Manufacturer"],
        "@id": `${SITE_URL}/#organization`,
        name: COMPANY,
        url: SITE_URL,
        email: QUOTE_EMAIL,
        description: SITE_PITCH,
        logo: `${SITE_URL}/icon.svg`,
        address: {
          "@type": "PostalAddress",
          addressRegion: "OH",
          addressCountry: "US",
          addressLocality: "Northeast Ohio",
        },
        areaServed: { "@type": "Country", name: "United States" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: QUOTE_EMAIL,
          url: `${SITE_URL}/contact`,
          areaServed: "US",
          availableLanguage: "English",
        },
        knowsAbout: [
          "CNC wire forming",
          "3D CNC wire bending",
          "cut-to-length wire",
          "wire baskets",
          "wire guards",
          "wire forming directory",
          "CNC wire forming machines",
          "coil steel",
          "powder coating hooks",
          "V-hooks",
          "C-hooks",
          "CV-hooks",
          "S-hooks",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: COMPANY,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US",
      },
    ],
  };
}

export function productJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}
