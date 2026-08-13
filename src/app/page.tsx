import Image from "next/image";
import { StepQuoteBlock } from "@/components/StepUpload";
import { CapabilityStrip } from "@/components/CapabilityStrip";
import {
  ButtonLink,
  LinkList,
  Page,
  PageHero,
  Section,
  StatRow,
} from "@/components/ui";
import { COMPANY } from "@/lib/company";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: `${COMPANY} — 4–14 mm 3D CNC Wire Forming`,
  description: `${COMPANY}: 50+ years of industry experience. 3D CNC wire forming in 4–14 mm — frames, wire baskets, and guards.`,
  path: "/",
  absoluteTitle: true,
  keywords: [
    "USA Wire Form",
    "CNC wire forming Northeast Ohio",
    "3D CNC wire baskets",
    "custom wire forms",
    "Numalliance Robomac",
  ],
});

export default function Home() {
  return (
    <Page>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <PageHero
          large
          kicker={WIRE.metric}
          title={COMPANY}
          lede="50+ years of industry experience. 3D CNC for frames, wire baskets, and guards — production quotes in 4–14 mm."
        >
          <ButtonLink href="/instant-quote">Get instant quote</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Send a STEP
          </ButtonLink>
        </PageHero>
        <div className="relative aspect-[1024/687] overflow-hidden bg-inset">
          <Image
            src="/shop/hero-forms.jpg"
            alt="3D CNC wire forms: nested hooks and frames in 4–14 mm steel"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain"
          />
        </div>
      </div>

      <StatRow
        className="mt-16"
        items={[
          { value: WIRE.metric, label: "Diameter band" },
          { value: "3D CNC", label: "Primary process" },
          { value: "50+ yrs", label: "Industry experience" },
          { value: "Northeast Ohio", label: "Shop + production" },
        ]}
      />

      <CapabilityStrip />

      <Section className="mt-16">
        <LinkList
          items={[
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
              href: "/processes/mesh-grids-and-cable-trays",
              title: "Mesh grids and cable trays",
              body: "Resistance, MIG, and TIG for welded mesh, guards, and trays.",
            },
            {
              href: "/videos",
              title: "Shop video",
              body: "Numalliance CNC on the floor — Robomac 214 and the forming cell.",
            },
          ]}
        />
      </Section>

      <StepQuoteBlock className="mt-16" title="Drop a STEP" />
    </Page>
  );
}
