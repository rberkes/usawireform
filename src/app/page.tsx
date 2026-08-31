import Image from "next/image";
import Link from "next/link";
import { AskBox } from "@/components/AskBox";
import { CapabilityStrip } from "@/components/CapabilityStrip";
import { ClientQuoteCtas } from "@/components/client/ClientQuoteCtas";
import { ClientCtaBand, ClientHero, PlatformFlow } from "@/components/client/ClientLanding";
import {
  HOME_CTA_LEDE,
  HOME_CTA_TITLE,
  HOME_HERO_LEDE,
  HOME_PLATFORM_STEPS,
  HOME_QUOTE_NOTE,
} from "@/lib/client-landing";
import { PricePromise } from "@/components/PricePromise";
import { SocialProof } from "@/components/SocialProof";
import { StateGrid } from "@/components/StateGrid";
import { ZipLookup } from "@/components/ZipLookup";
import {
  LinkList,
  Page,
  Section,
  StatRow,
} from "@/components/ui";
import { BrandLockup } from "@/components/WireMark";
import { COMPANY } from "@/lib/company";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: `Wire Form Suppliers, Manufacturers & CNC Wire Forming | ${COMPANY}`,
  description: `${COMPANY}: Where wire form suppliers, manufacturers, and buyers meet. Source by capability and capacity. Upload a STEP; quotes come from equipment that can form it.`,
  path: "/",
  absoluteTitle: true,
  image: {
    url: "/shop/robomac-214tf.jpg",
    width: 1536,
    height: 1024,
    alt: "Numalliance Robomac 214TF 3D CNC wire forming machine",
  },
  keywords: [
    "wire form suppliers",
    "wire form manufacturers",
    "CNC wire forming",
    "USA Wire Form",
    "CNC wire forming Northeast Ohio",
    "USA made wire baskets",
    "USA made D-rings",
    "USA made cable trays",
    "USA made wire racks",
    "USA made security fencing",
    "USA made heat treat baskets",
    "USA made ground staples",
    "USA made ground samples",
    "USA made wire stakes",
    "wire forming resource",
    "wire forming directory",
    "CNC wire forming machines",
    "coil steel suppliers",
    "upload STEP file",
    "3 view drawing wire form",
    "free STEP conversion",
    "add wire form machine",
    "Numalliance Robomac",
    "lowest price wire forming",
  ],
});

export default function Home() {
  return (
    <>
      <ClientHero
        kicker="Source fast. Source easy."
        title={<BrandLockup size="hero" tone="onDark" />}
        lede={HOME_HERO_LEDE}
        flow={<PlatformFlow steps={HOME_PLATFORM_STEPS} />}
        cta={<ClientQuoteCtas variant="home" tone="dark" className="mt-8" />}
      />
      <Page>
        <div className="overflow-hidden bg-inset">
          <Image
            src="/shop/hero-forms.jpg"
            alt="3D CNC wire forms: nested hooks and frames in 4–14 mm steel"
            width={1024}
            height={687}
            sizes="(min-width: 1152px) 1152px, 100vw"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="h-auto w-full object-contain"
          />
        </div>

        <AskBox />

        <Section
          kicker="The platform"
          title="Where suppliers, manufacturers, and buyers meet."
        >
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
            Shops upload capability and capacity. Buyers send a STEP. Quotes go
            to shops with the right machine and open capacity.
          </p>
          <LinkList
            className="mt-8"
            items={[
              {
                href: "/guide/design-for-wire-forming",
                title: "Learn wire forming",
                body: "Design rules, process pages, and the blog — how a print becomes a form.",
              },
              {
                href: "/equipment/cnc-manufacturers",
                title: "Machines",
                body: "Ten CNC OEMs and sixty models. We run a Robomac 214TF. We do not sell the iron.",
              },
              {
                href: "/wire-form-factories-in-usa",
                title: "Wire form factories",
                body: "U.S. shops on company cards, tagged by machine class.",
              },
              {
                href: "/find-factories-by-machine",
                title: "Find factories by machine",
                body: "Type fourslide, Robomac, powder coating, TIG. Three or four plants drop as you type.",
              },
              {
                href: "/source/equipment",
                title: "List Machines Free",
                body: "File OEM, year, capacity, and stocked wire sizes. Jobs that fit that cell come to you.",
              },
              {
                href: "/materials",
                title: "Coil steel",
                body: "Grades from coil, mill and drawer links, and what this cell actually runs.",
              },
              {
                href: "/source",
                title: "Upload a STEP for quotes",
                body: HOME_QUOTE_NOTE,
              },
            ]}
          />
        </Section>

        <StatRow
          className="mt-16"
          items={[
            { value: "U.S. + beyond", label: "The resource" },
            { value: WIRE.metric, label: "Shop diameter band" },
            { value: "3D CNC", label: "What we form" },
            { value: "Northeast Ohio", label: "Headquarters + production" },
          ]}
        />

        <Section kicker="Equipment list" title="Precision 3D bending from coil to form.">
          <Link href="/equipment" className="group mt-8 block">
            <div className="relative aspect-[3/2] overflow-hidden bg-inset">
              <Image
                src="/shop/robomac-214tf.jpg"
                alt="Numalliance Robomac 214TF — 3D CNC from coil, 4–14 mm"
                fill
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-muted group-hover:text-copper">
              Numalliance Robomac 214TF — 3D CNC from coil, 4–14 mm.
            </p>
          </Link>
          <LinkList
            className="mt-8"
            items={[
              {
                href: "/equipment",
                title: "Numalliance Robomac 214TF",
                note: "CNC",
                body: "2D and 3D programs in 4–14 mm from coil.",
              },
              {
                href: "/equipment",
                title: "Lubow manual benders",
                note: "Manual",
                body: "Prototypes, short runs, and secondary legs off the CNC head.",
              },
              {
                href: "/equipment",
                title: "40-ton Clearing press",
                note: "Press",
                body: "Pierce, coin, flatten, and stamp.",
              },
              {
                href: "/equipment",
                title: "75 kVA resistance welder",
                note: "Resistance",
                body: "Cross-wire and projection welds on baskets, grids, and frames.",
              },
              {
                href: "/equipment",
                title: "Miller MIG",
                note: "MIG",
                body: "Tacks and fillets a resistance nugget cannot reach.",
              },
            ]}
          />
        </Section>

        <PricePromise />

        <CapabilityStrip />

        <Section kicker="Also here" title="The trade, this floor, and the rest of the site.">
          <LinkList
            className="mt-8"
            items={[
              {
                href: "https://www.wireformingtech.com",
                title: "Wire Forming Technology International",
                body: "The trade magazine. First industry link.",
              },
              {
                href: "/directory/areas",
                title: "Wire forming cities",
                body: "Twenty U.S. forming clusters. Cleveland is the cheap coil.",
              },
              {
                href: "/sizes",
                title: "3/8, 7/16, and 1/2 in",
                body: "Stock production diameters on this cell.",
              },
              {
                href: "/products",
                title: "USA made wire forms",
                body: "Hooks, baskets, trays, guards, and hardware from this floor.",
              },
              {
                href: "/blog",
                title: "Blog",
                body: "Articles, structures, and a daily briefing.",
              },
              {
                href: "/models",
                title: "3D STEP viewer",
                body: "Orbit shop models. Drop a STEP from the print.",
              },
            ]}
          />
        </Section>

        <Section
          kicker="Locations"
          title="United States and beyond."
        >
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
            The directory, machine catalog, and library cover the trade here
            and abroad. Production quotes still leave Northeast Ohio. Each
            U.S. state page is the landing for that ZIP.{" "}
            <Link href="/wire-forming-companies-near-me" className="text-copper hover:underline">
              Companies near me
            </Link>
            .
          </p>
          <div className="mt-6">
            <ZipLookup />
          </div>
          <StateGrid />
        </Section>
      </Page>

      <ClientCtaBand
        title={HOME_CTA_TITLE}
        lede={HOME_CTA_LEDE}
        cta={<ClientQuoteCtas variant="home" tone="dark" size="band" className="mt-8" />}
      />

      <SocialProof className="mt-8" />
    </>
  );
}
