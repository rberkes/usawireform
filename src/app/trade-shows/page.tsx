import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import {
  Page,
  PageHero,
  Section,
  Panel,
  TextLink,
  ButtonLink,
} from "@/components/ui";
import { COMPANY } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Trade Shows",
  description: `Meet ${COMPANY} at wire forming and manufacturing trade shows. See our CNC wire forming capabilities and discuss your project in person.`,
  path: "/trade-shows",
  keywords: [
    "wire forming trade shows",
    "manufacturing trade shows",
    "FABTECH",
    "wire expo",
    "metal forming events",
    "industrial trade shows",
  ],
});

type TradeShow = {
  name: string;
  dates: string;
  location: string;
  booth?: string;
  website: string;
  description: string;
  attending: boolean;
};

const upcomingShows: TradeShow[] = [
  {
    name: "FABTECH 2024",
    dates: "October 15–17, 2024",
    location: "Orlando, FL",
    booth: "TBD",
    website: "https://www.fabtechexpo.com",
    description:
      "North America's largest metal forming, fabricating, welding, and finishing event. Over 1,500 exhibitors showcasing the latest manufacturing technology.",
    attending: true,
  },
  {
    name: "Wire Expo 2025",
    dates: "May 2025",
    location: "Cleveland, OH",
    website: "https://www.wirenet.org",
    description:
      "The Wire Association International's premier event for the wire and cable industry. Technical sessions, exhibits, and networking.",
    attending: true,
  },
  {
    name: "METALCON 2024",
    dates: "November 6–8, 2024",
    location: "Atlanta, GA",
    website: "https://www.metalcon.com",
    description:
      "The only annual conference and tradeshow devoted entirely to the application of metal in construction and design.",
    attending: false,
  },
];

const industryShows: TradeShow[] = [
  {
    name: "IMTS – International Manufacturing Technology Show",
    dates: "September (Biennial)",
    location: "Chicago, IL",
    website: "https://www.imts.com",
    description:
      "The Western Hemisphere's largest manufacturing technology show. Over 2,500 exhibitors across 1.4 million square feet.",
    attending: false,
  },
  {
    name: "Automate",
    dates: "May (Annual)",
    location: "Detroit, MI / Chicago, IL",
    website: "https://www.automateshow.com",
    description:
      "North America's leading automation trade show. Robotics, vision, motion control, and AI solutions.",
    attending: false,
  },
  {
    name: "The Assembly Show",
    dates: "October (Annual)",
    location: "Rosemont, IL",
    website: "https://www.theassemblyshow.com",
    description:
      "Focused on assembly technology — fastening, joining, robotics, and material handling.",
    attending: false,
  },
  {
    name: "Design-2-Part Shows",
    dates: "Multiple dates/locations",
    location: "Various US cities",
    website: "https://www.d2p.com",
    description:
      "Regional shows connecting OEMs with contract manufacturers. Great for sourcing custom parts and job shop services.",
    attending: false,
  },
  {
    name: "SOUTHTEC",
    dates: "October (Biennial)",
    location: "Greenville, SC",
    website: "https://www.southteconline.com",
    description:
      "Manufacturing technology exhibition serving the Southeast. Machine tools, tooling, and manufacturing services.",
    attending: false,
  },
  {
    name: "EASTEC",
    dates: "May (Biennial)",
    location: "West Springfield, MA",
    website: "https://www.easteconline.com",
    description:
      "New England's advanced manufacturing event. Precision machining, fabrication, and assembly solutions.",
    attending: false,
  },
  {
    name: "MD&M (Medical Design & Manufacturing)",
    dates: "Multiple dates/locations",
    location: "Various US cities",
    website: "https://www.mdmwest.com",
    description:
      "Medical device design and manufacturing. Wire forms play a role in medical devices, surgical instruments, and implants.",
    attending: false,
  },
  {
    name: "Pack Expo",
    dates: "October/November (Annual)",
    location: "Chicago, IL / Las Vegas, NV",
    website: "https://www.packexpo.com",
    description:
      "Packaging machinery and materials. Wire forms are used in packaging equipment, guards, and material handling.",
    attending: false,
  },
];

const associations = [
  {
    name: "Spring Manufacturers Institute (SMI)",
    website: "https://smihq.org",
    description: "Trade association for spring and wire form manufacturers.",
  },
  {
    name: "Wire Association International (WAI)",
    website: "https://wirenet.org",
    description: "Global organization serving the wire and cable industry.",
  },
  {
    name: "Precision Metalforming Association (PMA)",
    website: "https://pma.org",
    description: "Trade association for the metal stamping, fabricating, spinning, and forming industries.",
  },
  {
    name: "National Tooling and Machining Association (NTMA)",
    website: "https://ntma.org",
    description: "Represents the precision custom manufacturing industry in the United States.",
  },
  {
    name: "Fabricators & Manufacturers Association (FMA)",
    website: "https://fmanet.org",
    description: "Association for metal fabrication professionals.",
  },
  {
    name: "CASMI / SpringWorld",
    website: "https://casmi-springworld.org",
    description: "Spring industry events and technical resources.",
  },
  {
    name: "American Welding Society (AWS)",
    website: "https://aws.org",
    description: "Advancing the science, technology and application of welding.",
  },
  {
    name: "ASTM International",
    website: "https://astm.org",
    description: "Standards organization for materials, products, systems, and services.",
  },
  {
    name: "National Association of Manufacturers (NAM)",
    website: "https://nam.org",
    description: "The largest manufacturing association in the United States.",
  },
  {
    name: "Manufacturer & Business Association (MBA)",
    website: "https://mbausa.org",
    description: "Regional association supporting manufacturers in the tri-state area.",
  },
  {
    name: "Industrial Fasteners Institute (IFI)",
    website: "https://indfast.org",
    description: "Trade association for North American manufacturers of bolts, nuts, screws, and related products.",
  },
  {
    name: "Society of Manufacturing Engineers (SME)",
    website: "https://sme.org",
    description: "Professional society for manufacturing engineers and technologists.",
  },
];

export default function TradeShowsPage() {
  const breadcrumbItems = [{ label: "Trade Shows" }];

  return (
    <Page>
      <BreadcrumbJsonLd items={[{ name: "Trade Shows", url: "/trade-shows" }]} />
      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        kicker="Events"
        title="Trade shows"
        lede={`Meet the ${COMPANY} team at industry events. See our CNC wire forming capabilities, discuss your project, and learn about our processes.`}
      >
        <ButtonLink href="/contact" variant="primary">
          Schedule a meeting
        </ButtonLink>
      </PageHero>

      <Section kicker="2024–2025" title="Shows we attend" className="mt-12">
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingShows.map((show) => (
            <Panel key={show.name} className={show.attending ? "border-copper/30" : ""}>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium">{show.name}</h3>
                {show.attending && (
                  <span className="shrink-0 rounded bg-copper/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-widest text-copper">
                    Attending
                  </span>
                )}
              </div>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">
                {show.dates} · {show.location}
              </p>
              {show.booth && (
                <p className="mt-1 text-sm text-copper">Booth: {show.booth}</p>
              )}
              <p className="mt-3 text-sm leading-6 text-muted">
                {show.description}
              </p>
              <a
                href={show.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-copper hover:underline"
              >
                Event website →
              </a>
            </Panel>
          ))}
        </div>
      </Section>

      <Section kicker="Industry events" title="Trade shows for wire forming buyers" className="mt-16">
        <p className="mt-4 max-w-2xl text-sm text-muted">
          Looking for wire forming suppliers? These trade shows attract manufacturers 
          in our industry. Even if we are not exhibiting, many of these events are worth 
          attending to see the latest in metal forming technology.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {industryShows.map((show) => (
            <div
              key={show.name}
              className="flex flex-col border border-line p-5 hover:border-copper/30"
            >
              <h3 className="font-medium">{show.name}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
                {show.dates} · {show.location}
              </p>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                {show.description}
              </p>
              <a
                href={show.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-sm text-copper hover:underline"
              >
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Associations" title="Industry organizations" className="mt-16">
        <p className="mt-4 max-w-2xl text-sm text-muted">
          These associations host events, publish technical resources, and connect 
          wire forming professionals. Many offer membership directories to find suppliers.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {associations.map((assoc) => (
            <a
              key={assoc.name}
              href={assoc.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-line p-5 hover:border-copper/30"
            >
              <h3 className="font-medium group-hover:text-copper">{assoc.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {assoc.description}
              </p>
            </a>
          ))}
        </div>
      </Section>

      <Section kicker="Connect" title="Meet with us" className="mt-16">
        <Panel>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-medium">Schedule a meeting</h3>
              <p className="mt-2 max-w-lg text-sm text-muted">
                Attending one of these shows? Contact us to schedule a meeting and 
                discuss your wire forming project in person. Bring your drawings — 
                we can provide initial feedback on the spot.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <ButtonLink href="/contact" variant="primary">
                Contact us
              </ButtonLink>
              <ButtonLink href="/instant-quote" variant="ghost">
                Get a quote
              </ButtonLink>
            </div>
          </div>
        </Panel>
      </Section>
    </Page>
  );
}
