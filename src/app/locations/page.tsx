import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, Kicker } from "@/components/ui";
import { cities, getCitiesByRegion } from "@/lib/seo-pages/cities";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Service Locations",
  description:
    "CNC wire forming services shipped nationwide. From our Ohio facility, we serve manufacturers in every major industrial city with 1-4 day ground shipping.",
  path: "/locations",
  keywords: [
    "wire forming locations",
    "CNC wire forming USA",
    "wire forming services near me",
    "custom wire forms shipping",
    "wire forming manufacturer locations",
  ],
});

const regions = [
  { id: "midwest" as const, name: "Midwest", description: "Our home region—same-day to 2-day shipping" },
  { id: "northeast" as const, name: "Northeast", description: "1-2 day shipping via I-80 corridor" },
  { id: "southeast" as const, name: "Southeast", description: "2-day shipping to the growing South" },
  { id: "southwest" as const, name: "Southwest", description: "2-3 day shipping to Texas and Arizona" },
  { id: "west" as const, name: "West Coast", description: "3-4 day ground or expedited air" },
];

export default function LocationsPage() {
  const breadcrumbItems = [{ label: "Locations" }];

  return (
    <Page>
      <BreadcrumbJsonLd items={[{ name: "Locations", url: "/locations" }]} />
      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        kicker="Service Locations"
        title="Wire forming, shipped nationwide."
        lede="From our facility in Northeast Ohio, we serve manufacturers across the country. Our central location means fast ground shipping to most of the US."
      />

      <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-background p-6">
          <p className="font-mono text-2xl text-copper">50+</p>
          <p className="mt-1 text-sm text-muted">Years in business</p>
        </div>
        <div className="bg-background p-6">
          <p className="font-mono text-2xl text-copper">{cities.length}</p>
          <p className="mt-1 text-sm text-muted">Cities served</p>
        </div>
        <div className="bg-background p-6">
          <p className="font-mono text-2xl text-copper">1-4</p>
          <p className="mt-1 text-sm text-muted">Days shipping</p>
        </div>
        <div className="bg-background p-6">
          <p className="font-mono text-2xl text-copper">100%</p>
          <p className="mt-1 text-sm text-muted">USA made</p>
        </div>
      </div>

      {regions.map((region) => {
        const regionCities = getCitiesByRegion(region.id);
        if (regionCities.length === 0) return null;

        return (
          <Section key={region.id}>
            <Kicker>{region.name}</Kicker>
            <h2 className="mt-3 text-2xl tracking-tight">{region.description}</h2>
            <div className="mt-6 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
              {regionCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}`}
                  className="bg-background p-5 hover:bg-inset transition-colors"
                >
                  <h3 className="font-medium">
                    {city.name}, {city.stateCode}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{city.shippingNote}</p>
                  <p className="mt-2 text-xs text-copper">
                    {city.keyIndustries.slice(0, 2).join(" • ")}
                  </p>
                </Link>
              ))}
            </div>
          </Section>
        );
      })}

      <Section kicker="Don't see your city?" title="We ship everywhere.">
        <p className="mt-4 max-w-2xl text-muted leading-7">
          Our Ohio facility is centrally located for efficient nationwide shipping.
          Whether you're in a major metro or a small manufacturing town, we can
          get wire forms to your dock quickly and cost-effectively.
        </p>
        <div className="mt-6">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-sm bg-copper px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-copper-dim"
          >
            Get a Quote
          </Link>
        </div>
      </Section>

      <StepQuoteBlock className="mt-16" title="Ready to get started?" />
    </Page>
  );
}
