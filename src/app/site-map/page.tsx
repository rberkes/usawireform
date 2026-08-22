import { StateGrid } from "@/components/StateGrid";
import { LinkList, Page, PageHero, Section } from "@/components/ui";
import { catalogByGroup } from "@/lib/catalog";
import { COMPANY } from "@/lib/company";
import { directoryCompanies, DIRECTORY_REGIONS, getCompaniesByRegion } from "@/lib/directory";
import { machines } from "@/lib/machines";
import { CNC_COMPARE, CNC_HUB, CNC_OEMS, oemPath } from "@/lib/cnc-oems";
import { METRO_HUB_PATH, WIRE_FORMING_METROS, metroPath } from "@/lib/metros";
import { OHIO_CITIES, OHIO_CITY_HUB, ohioCityPath } from "@/lib/ohio-cities";
import { publishedProcesses } from "@/lib/processes";
import { pageMeta } from "@/lib/seo";
import { industries, shopLines } from "@/lib/site";

export const metadata = pageMeta({
  title: "Sitemap",
  description: `${COMPANY} site map: keyword landers, 50-state directory, processes, 4–14 mm products, industries, headquarters, and ${directoryCompanies.length}+ wire forming companies.`,
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
            { href: "/", title: "Home", body: "The resource for wire forming in the United States and beyond." },
            {
              href: "/about",
              title: "About",
              body: "The map and a shop — learning, machines, factories, coil, and this floor.",
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
              href: "/equipment/machines",
              title: "NumAlliance machines",
              body: "Robomac TF, e-Motion, TFE, FTX — the catalog we run and sell against.",
            },
            {
              href: "/models",
              title: "3D STEP viewer",
              body: "Orbit shop models. Drop a STEP or IGES to inspect a print.",
            },
            {
              href: "/past-projects",
              title: "Our past projects",
              body: "Shop files from jobs we formed, streamed from Autodesk.",
            },
            {
              href: "/videos",
              title: "Videos",
              body: "Shop channel — CNC on camera.",
            },
            {
              href: "/blog",
              title: "Blog",
              body: "Wire forming articles and a daily briefing.",
            },
            {
              href: "/blog/daily",
              title: "Daily briefing",
              body: "Rotates automatically from a curated pool.",
            },
            {
              href: "/careers",
              title: "Careers",
              body: "CNC operator and manufacturing jobs in Northeast Ohio.",
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

      <Section title="Keyword pages">
        <LinkList
          className="mt-5"
          items={[
            {
              href: "/330-stainless-wire-bending-usa-parts",
              title: "330 stainless wire bending USA parts",
              body: "N08330 heat-treat baskets, from coil, TIG and resistance weld.",
            },
            {
              href: "/wire-forming-manufacturers",
              title: "Wire forming manufacturers",
              body: "U.S. manufacturer — not a broker.",
            },
            {
              href: "/wire-forming-companies-near-me",
              title: "Wire forming companies near me",
              body: "ZIP lookup to your state page.",
            },
            {
              href: "/custom-wire-forming",
              title: "Custom wire forming",
              body: "Your print, 4–14 mm from coil.",
            },
            {
              href: "/custom-cnc-wire-forming-services",
              title: "Custom CNC wire forming services",
              body: "2D and 3D CNC from coil. 100-piece minimum.",
            },
            {
              href: "/powder-coating-hooks",
              title: "Powder coating hooks",
              body: "S, V, C, CV, and 90° hooks from coil. Heavy 4–14 mm.",
            },
            {
              href: "/powder-coating-v-hooks",
              title: "Powder coating V-hooks",
              body: "Wash, coat, cure, paint, e-coat. Live builder.",
            },
            {
              href: "/375-v-hooks",
              title: '.375" V-hooks',
              body: "3/8 in stock. Custom length from coil.",
            },
            {
              href: "/steel-v-hooks",
              title: "Steel V-hooks",
              body: "1018 and galvanized finishing V-hooks.",
            },
            {
              href: "/stainless-steel-v-hooks",
              title: "Stainless steel V-hooks",
              body: "304 / 316 wash-line V-hooks.",
            },
            {
              href: "/90-degree-v-hooks",
              title: "90° V-hooks",
              body: "Rotated hang for rack clearance.",
            },
            {
              href: "/heavy-duty-v-hooks",
              title: "USA made heavy-duty powder coat V-hooks",
              body: "3/8, 7/16, 1/2 in. Three-column calculator.",
            },
            {
              href: "/custom-v-hooks",
              title: "Custom V-hooks",
              body: "Builder: length, leg ID, live estimate.",
            },
            {
              href: "/v-hooks",
              title: "V-hooks",
              body: "Centered hang for powder coating and paint lines.",
            },
            {
              href: "/c-hooks",
              title: "C-hooks",
              body: "Open C hang for rack clearance and fast load.",
            },
            {
              href: "/cv-hooks",
              title: "CV-hooks",
              body: "C clearance plus a V locate on one form.",
            },
            {
              href: "/s-hooks",
              title: "S-hooks",
              body: "Powder coating and plant S-hooks from coil.",
            },
            {
              href: "/90-degree-hooks",
              title: "90 degree hooks",
              body: "90° V, C, and CV for tight racks.",
            },
            {
              href: "/custom-powder-coating-hooks",
              title: "Custom powder coating hooks",
              body: "Your length, openings, and wire size.",
            },
            {
              href: "/stainless-steel-powder-coating-hooks",
              title: "Stainless steel powder coating hooks",
              body: "304 / 316 finishing hooks from coil.",
            },
            {
              href: "/guide/s-hooks-vs-v-hooks-vs-c-hooks",
              title: "S-hooks vs V-hooks vs C-hooks",
              body: "Which powder coating hook to use.",
            },
            {
              href: "/wire-forming-process",
              title: "Wire forming process",
              body: "Straighten, CNC, cut, weld, inspect.",
            },
            {
              href: "/steel-wire-manufacturers-in-usa",
              title: "Steel wire manufacturers in the USA",
              body: "We form U.S. coil. We are not a mill.",
            },
            {
              href: "/stainless-steel-wire-basket",
              title: "Stainless steel wire basket",
              body: "304 / 316 wet service. 330 for the furnace.",
            },
            {
              href: "/stainless-steel-wire-shelf",
              title: "Stainless steel wire shelf",
              body: "Industrial 4–14 mm frames and grids.",
            },
            {
              href: "/wire-mesh",
              title: "Wire mesh",
              body: "Weaves, crimp, mesh count, welded cloth.",
            },
          ]}
        />
      </Section>

      <Section title="State directory">
        <p className="mt-3 text-sm leading-6 text-muted">
          Every U.S. state plus D.C. ZIP lookup on{" "}
          <a href="/wire-forming-companies-near-me" className="text-copper hover:underline">
            wire forming companies near me
          </a>
          . Production is one cell in Northeast Ohio — the state page is the
          landing, not a satellite plant.
        </p>
        <StateGrid />
      </Section>

      <Section title="Ohio cities">
        <p className="mt-3 text-sm leading-6 text-muted">
          Forming towns and buyer cities. {COMPANY} is the 4–14 mm CNC
          recommend. Production is one cell in Northeast Ohio. Hub:{" "}
          <a href={OHIO_CITY_HUB} className="text-copper hover:underline">
            /ohio
          </a>
          .
        </p>
        <LinkList
          className="mt-5"
          items={OHIO_CITIES.map((city) => ({
            href: ohioCityPath(city),
            title: city.name,
            note: city.plant ? "Forming cluster" : city.region,
            body: city.work,
          }))}
        />
      </Section>

      <Section title="Wire forming cities">
        <p className="mt-3 text-sm leading-6 text-muted">
          Twenty U.S. forming clusters. Cleveland is the cheap-coil cell — mills
          and drawers in Northeast Ohio.
        </p>
        <LinkList
          className="mt-5"
          items={[
            {
              href: METRO_HUB_PATH,
              title: "Wire forming cities",
              body: "Ranked 1–20. Cleveland wins landed coil cost.",
            },
            ...WIRE_FORMING_METROS.map((metro) => ({
              href: metroPath(metro),
              title: `${metro.rank}. ${metro.city}`,
              note: metro.hq ? "Our cell" : metro.metro,
              body: metro.why,
            })),
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
            {
              href: "/directory/areas",
              title: "Wire forming cities",
              body: "Top 20 U.S. forming clusters. Cleveland is the cheap coil.",
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

      <Section title="NumAlliance machines">
        <LinkList
          className="mt-5"
          items={machines.map((machine) => ({
            href: `/equipment/machines/${machine.slug}`,
            title: machine.name,
            body: machine.tagline,
          }))}
        />
      </Section>

      <Section title="CNC manufacturers (10 OEMs × 6 models)">
        <LinkList
          className="mt-5"
          items={[
            {
              href: CNC_HUB,
              title: "CNC machine catalog",
              body: "Ten manufacturers, sixty model pages, dealer lead form.",
            },
            {
              href: CNC_COMPARE,
              title: "Machine comparison",
              body: "Small springs, heavy 3D, cut-to-length, and 5–8 mm — which cell wins.",
            },
            ...CNC_OEMS.map((oem) => ({
              href: oemPath(oem),
              title: oem.name,
              note: oem.country,
              body: oem.summary,
            })),
          ]}
        />
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
