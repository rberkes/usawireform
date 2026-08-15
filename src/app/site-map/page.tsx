import { LinkList, Page, PageHero, Section } from "@/components/ui";
import { catalogByGroup } from "@/lib/catalog";
import { COMPANY } from "@/lib/company";
import { directoryCompanies, DIRECTORY_REGIONS, getCompaniesByRegion } from "@/lib/directory";
import { publishedProcesses } from "@/lib/processes";
import { pageMeta } from "@/lib/seo";
import { industries, shopLines } from "@/lib/site";

export const metadata = pageMeta({
  title: "Sitemap",
  description: `${COMPANY} site map: processes, 4–14 mm products, industries, headquarters, and directory of ${directoryCompanies.length}+ wire forming companies across the USA and Canada.`,
  path: "/site-map",
  keywords: ["sitemap", "wire forming companies", "wire form manufacturers", "wire forming directory"],
});

export default function SiteMapPage() {
  const processLinks = publishedProcesses().map((process) => ({
    href: `/processes/${process.slug}`,
    title: process.title,
    body: process.summary,
  }));

  return (
    <Page>
      <PageHero
        kicker="Index"
        title="Sitemap"
        lede="Every public page. Wire forming, fabrication, the 3/8 · 7/16 · 1/2 in directory, and wire forming companies across the industry."
      />

      <Section title="Headquarters">
        <LinkList
          className="mt-5"
          items={[
            { href: "/", title: "Home", body: `${COMPANY}.` },
            {
              href: "/about",
              title: "About",
              body: "50+ years of industry experience.",
            },
            {
              href: "/cleveland",
              title: "Northeast Ohio",
              body: "Mills, wire drawers, short-haul coil.",
            },
            {
              href: "/capabilities",
              title: "Capabilities",
              body: "What we run in 4–14 mm.",
            },
            {
              href: "/equipment",
              title: "Equipment",
              body: "Robomac 214TF and the floor list.",
            },
            {
              href: "/secondary-operations",
              title: "Secondary operations",
              body: "Weld, plate, powder, ends, inspect.",
            },
            {
              href: "/instant-quote",
              title: "Instant quote",
              body: "Estimate from diameter, bends, length, and material.",
            },
            {
              href: "/videos",
              title: "Videos",
              body: "Shop channel — CNC on camera.",
            },
            {
              href: "/quoting",
              title: "Request a quote",
              body: "Tooling, programming, coil minimums.",
            },
            {
              href: "/contact",
              title: "Contact",
              body: "STEP, STP, IGES, PDF, DXF, SLDPRT.",
            },
          ]}
        />
      </Section>

      <Section title="Process">
        <LinkList
          className="mt-5"
          items={[
            {
              href: "/wire-forming",
              title: "Wire forming",
              body: "USA process map, 4–14 mm.",
            },
            {
              href: "/wire-fabrication",
              title: "Wire fabrication",
              body: "Form, weld, finish — carbon, stainless, non-ferrous.",
            },
            {
              href: "/cnc-wire-forming",
              title: "CNC wire forming",
              body: "2D and 3D from coil.",
            },
            {
              href: "/cnc-wire-bending",
              title: "CNC wire bending",
              body: "Same cell as CNC forming.",
            },
            {
              href: "/rod-bending",
              title: "Rod bending",
              body: "Heavy round coil in 4–14 mm.",
            },
            {
              href: "/wire-parts",
              title: "Wire parts",
              body: "Hooks, baskets, grids, guards, racks, handles.",
            },
            {
              href: "/sizes",
              title: "3/8 · 7/16 · 1/2 in",
              body: "Stock production diameters.",
            },
            {
              href: "/materials",
              title: "Materials",
              body: "Coil grades from carbon through stainless and brass.",
            },
            {
              href: "/guide/design-for-wire-forming",
              title: "Design guide",
              body: "Radius, legs, springback, datums.",
            },
            ...processLinks,
          ]}
        />
      </Section>

      {catalogByGroup().map(({ group, items }) => (
        <Section key={group} title={group}>
          <LinkList
            className="mt-5"
            items={items.map((item) => ({
              href: `/products/${item.slug}`,
              title: item.title,
              body: item.summary,
            }))}
          />
        </Section>
      ))}

      <Section title="Shop lines">
        <LinkList
          className="mt-5"
          items={shopLines.map((item) => ({
            href: `/products/${item.slug}`,
            title: item.title,
            body: item.summary,
          }))}
        />
      </Section>

      <Section title="Industries">
        <LinkList
          className="mt-5"
          items={industries.map((item) => ({
            href: `/industries/${item.slug}`,
            title: item.title,
            body: item.summary,
          }))}
        />
      </Section>

      <Section title={`Wire Forming Directory (${directoryCompanies.length} companies)`}>
        <p className="mt-3 text-sm leading-6 text-muted">
          {directoryCompanies.length} wire forming shops across the USA and Canada. Not competitors — peers
          in the trade. Different capabilities, different diameters, different
          regions. If we cannot run a job, one of these shops might.
        </p>
        <LinkList
          className="mt-5"
          items={[
            {
              href: "/directory",
              title: "Wire Forming Companies Directory",
              body: `Browse all ${directoryCompanies.length} companies by region, with lead capture forms.`,
            },
          ]}
        />
        {DIRECTORY_REGIONS.map((region) => {
          const companies = getCompaniesByRegion(region);
          if (companies.length === 0) return null;
          return (
            <div key={region} className="mt-6">
              <h4 className="text-sm font-medium text-muted">{region} ({companies.length})</h4>
              <LinkList
                className="mt-2"
                items={companies.slice(0, 5).map((company) => ({
                  href: `/directory/${company.slug}`,
                  title: company.name,
                  note: company.location,
                  body: company.capabilities.slice(0, 3).join(", "),
                }))}
              />
              {companies.length > 5 && (
                <p className="mt-2 text-xs text-muted">
                  + {companies.length - 5} more in {region}...{" "}
                  <a href="/directory" className="text-copper hover:underline">View all</a>
                </p>
              )}
            </div>
          );
        })}
      </Section>

      <Section title="This site">
        <LinkList
          className="mt-5"
          items={[
            {
              href: "/privacy",
              title: "Privacy policy",
              body: "Quote files and email.",
            },
            {
              href: "/sitemap.xml",
              title: "XML sitemap",
              body: "For crawlers.",
            },
          ]}
        />
      </Section>
    </Page>
  );
}
