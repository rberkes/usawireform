import type { Metadata } from "next";
import { StepQuoteBlock } from "@/components/StepUpload";
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

export const metadata: Metadata = {
  title: {
    absolute: `${COMPANY} — 4–14 mm 3D CNC Wire Forming`,
  },
  description:
    `${COMPANY}: 50+ years of industry experience. 3D CNC wire forming in 4–14 mm — frames, wire baskets, and guards.`,
};

export default function Home() {
  return (
    <Page>
      <PageHero
        large
        kicker={WIRE.metric}
        title={COMPANY}
        lede="50+ years of industry experience. 3D CNC for frames, wire baskets, and guards — production quotes in 4–14 mm."
      >
        <ButtonLink href="/contact">Send a STEP</ButtonLink>
        <ButtonLink href="/processes" variant="ghost">
          Processes
        </ButtonLink>
      </PageHero>

      <StatRow
        className="mt-16"
        items={[
          { value: WIRE.metric, label: "Diameter band" },
          { value: "3D CNC", label: "Primary process" },
          { value: "50+ yrs", label: "Industry experience" },
          { value: "Cleveland", label: "Shop + production" },
        ]}
      />

      <Section className="mt-16">
        <LinkList
          items={[
            {
              href: "/cleveland",
              title: "Cleveland",
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
