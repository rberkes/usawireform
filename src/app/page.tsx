import Image from "next/image";
import Link from "next/link";
import { AskBox } from "@/components/AskBox";
import { StepQuoteBlock } from "@/components/StepUpload";
import { CapabilityStrip } from "@/components/CapabilityStrip";
import { PricePromise } from "@/components/PricePromise";
import { SocialProof } from "@/components/SocialProof";
import { StateGrid } from "@/components/StateGrid";
import { ZipLookup } from "@/components/ZipLookup";
import {
  ButtonLink,
  LinkList,
  Page,
  PageHero,
  Section,
  StatRow,
} from "@/components/ui";
import { BrandLockup } from "@/components/WireMark";
import { COMPANY } from "@/lib/company";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: `${COMPANY} — 4–14 mm 3D CNC Wire Forming`,
  description: `${COMPANY}: 50+ years of industry experience. USA made wire baskets, USA made D-rings, USA made cable trays. Lowest prices guaranteed. 100-piece minimum. 3D CNC in 4–14 mm.`,
  path: "/",
  absoluteTitle: true,
  keywords: [
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
    "custom wire forms",
    "Numalliance Robomac",
    "lowest price wire forming",
  ],
});

export default function Home() {
  return (
    <>
      <Page>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <PageHero
            large
            kicker={WIRE.metric}
            title={<BrandLockup size="hero" />}
            lede="50+ years of industry experience. Lowest prices guaranteed — we will not be beat. 100-piece minimum. 3D CNC for frames, wire baskets, and guards."
          >
            <ButtonLink href="/instant-quote" variant="quote">
              Get instant quote
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Send a STEP
            </ButtonLink>
          </PageHero>
          <div className="overflow-hidden bg-inset">
            <Image
              src="/shop/hero-forms.jpg"
              alt="3D CNC wire forms: nested hooks and frames in 4–14 mm steel"
              width={1024}
              height={687}
              sizes="(min-width: 1024px) 50vw, 100vw"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        <AskBox />

        <StatRow
          className="mt-16"
          items={[
            { value: WIRE.metric, label: "Diameter band" },
            { value: "3D CNC", label: "Primary process" },
            { value: "50+ yrs", label: "Industry experience" },
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

        <Section className="mt-16">
          <LinkList
            items={[
              {
                href: "https://www.wireformingtech.com",
                title: "Wire Forming Technology International",
                body: "The trade magazine for spring makers, wire formers, mesh welders, and rebar processors. First industry link.",
              },
              {
                href: "/directory/areas",
                title: "Wire forming cities",
                body: "Twenty U.S. forming clusters. Cleveland is the cheap coil — mills and drawers on a local truck.",
              },
              {
                href: "/ohio",
                title: "Ohio city directory",
                body: "Thirty Ohio landers — Akron, Canton, Youngstown, and the forming towns. One CNC cell in Northeast Ohio.",
              },
              {
                href: "/cleveland",
                title: "Northeast Ohio",
                body: "Mills, wire drawers, and short-haul coil — the low-cost location for 4–14 mm forming and secondaries.",
              },
              {
                href: "/wire-fabrication",
                title: "Wire fabrication, 4–14 mm",
                body: "Low to high carbon, stainless, and other ferrous and non-ferrous coil.",
              },
              {
                href: "/sizes",
                title: "3/8, 7/16, and 1/2 in",
                body: "Stock production diameters we run — frames, grids, and trays.",
              },
              {
                href: "/materials",
                title: "Coil materials",
                body: "1010, 1018, spring steels, 300-series including 330, brass, and copper.",
              },
              {
                href: "/processes/3d-cnc-wire-forming",
                title: "3D CNC wire forming",
                body: "Spatial bends in 4–14 mm, and what the print should say.",
              },
              {
                href: "/guide/design-for-wire-forming",
                title: "Design for wire forming",
                body: "Bend radius, min legs, springback, and datums.",
              },
              {
                href: "/industries",
                title: "Industries",
                body: "Named sectors we actually form for. Each one is its own directory.",
              },
              {
                href: "/products",
                title: "USA made wire forms",
                body: "USA made D-rings, USA made wire racks, USA made cable trays, USA made security fencing, USA made wire baskets, USA made heat treat baskets, USA made ground staples, USA made ground samples, USA made wire stakes.",
              },
              {
                href: "/processes/mesh-grids-and-cable-trays",
                title: "USA made cable trays",
                body: "USA made cable trays, USA made wire baskets, USA made security fencing — resistance, MIG, and TIG.",
              },
              {
                href: "/blog",
                title: "Blog",
                body: "Wire forming articles, structures, and a daily briefing.",
              },
              {
                href: "/models",
                title: "3D STEP viewer",
                body: "Orbit shop models of hooks, baskets, trays, and guards. Drop a STEP from the print.",
              },
              {
                href: "/videos",
                title: "Shop video",
                body: "Numalliance CNC on the floor — Robomac 214TF and the named machines.",
              },
            ]}
          />
        </Section>

        <Section
          kicker="Locations"
          title="Wire forming in every U.S. state."
        >
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
            One CNC cell in Northeast Ohio. Each state page is the landing
            for that ZIP — we quote nationwide from that floor.{" "}
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

        <StepQuoteBlock className="mt-16" title="Drop a STEP" />
      </Page>

      <SocialProof className="mt-8" />
    </>
  );
}
