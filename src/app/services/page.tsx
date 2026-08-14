import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, Kicker, CardGrid } from "@/components/ui";
import { products, getProductsByCategory } from "@/lib/seo-pages/products";
import { cities, getCitiesByRegion } from "@/lib/seo-pages/cities";
import { getProductLocationCombos } from "@/lib/seo-pages/combinations";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Forming Services by Location",
  description:
    "Custom CNC wire forming services shipped nationwide. Wire baskets, cable trays, machine guards, racks, and more — delivered to your city.",
  path: "/services",
  keywords: [
    "wire forming services",
    "CNC wire forming by location",
    "wire baskets near me",
    "custom wire forms shipping",
    "wire forming manufacturer USA",
  ],
});

const categories = [
  "Baskets & Containers",
  "Wire Management",
  "Guards & Safety",
  "Hooks & Hangers",
  "Frames & Structural",
  "Racks & Shelving",
];

export default function ServicesPage() {
  const breadcrumbItems = [{ label: "Services" }];
  const combos = getProductLocationCombos();

  return (
    <Page>
      <BreadcrumbJsonLd items={[{ name: "Services", url: "/services" }]} />
      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        kicker="Services"
        title="Wire forming for every city."
        lede="From our Ohio facility, we ship custom wire forms to manufacturers nationwide. Find wire forming services for your location."
      />

      <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-background p-6">
          <p className="font-mono text-2xl text-copper">{products.length}</p>
          <p className="mt-1 text-sm text-muted">Product types</p>
        </div>
        <div className="bg-background p-6">
          <p className="font-mono text-2xl text-copper">{cities.length}</p>
          <p className="mt-1 text-sm text-muted">Cities served</p>
        </div>
        <div className="bg-background p-6">
          <p className="font-mono text-2xl text-copper">{combos.length}</p>
          <p className="mt-1 text-sm text-muted">Service combinations</p>
        </div>
        <div className="bg-background p-6">
          <p className="font-mono text-2xl text-copper">50+</p>
          <p className="mt-1 text-sm text-muted">Years experience</p>
        </div>
      </div>

      {categories.map((category) => {
        const categoryProducts = getProductsByCategory(category);
        if (categoryProducts.length === 0) return null;

        return (
          <Section key={category}>
            <Kicker>{category}</Kicker>
            <h2 className="mt-3 text-2xl tracking-tight">
              {category} by Location
            </h2>
            <div className="mt-6 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
              {categoryProducts.slice(0, 6).map((product) => (
                <div key={product.slug} className="bg-background p-5">
                  <h3 className="font-medium">{product.pluralName}</h3>
                  <p className="mt-2 text-sm text-muted">
                    {product.description.slice(0, 80)}...
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["chicago", "detroit", "atlanta", "houston"].map((citySlug) => {
                      const city = cities.find((c) => c.slug === citySlug);
                      if (!city) return null;
                      return (
                        <Link
                          key={citySlug}
                          href={`/services/${product.slug}-${citySlug}`}
                          className="text-xs text-copper hover:underline"
                        >
                          {city.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        );
      })}

      <Section kicker="By region" title="Find Services by Region">
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(["midwest", "northeast", "southeast", "southwest", "west"] as const).map((region) => {
            const regionCities = getCitiesByRegion(region);
            return (
              <div key={region} className="border border-line p-5">
                <h3 className="font-medium capitalize">{region}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {regionCities.slice(0, 6).map((city) => (
                    <Link
                      key={city.slug}
                      href={`/locations/${city.slug}`}
                      className="text-xs text-muted hover:text-copper"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <StepQuoteBlock className="mt-16" title="Ready to get started?" />
    </Page>
  );
}
