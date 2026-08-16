import Image from "next/image";
import Link from "next/link";
import { StepQuoteBlock } from "@/components/StepUpload";
import { CapabilityStrip } from "@/components/CapabilityStrip";
import { PricePromise } from "@/components/PricePromise";
import { SocialProof } from "@/components/SocialProof";
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
  description: `${COMPANY}: 50+ years of industry experience. Lowest prices guaranteed — we will not be beat. 100-piece minimum. 3D CNC wire forming in 4–14 mm.`,
  path: "/",
  absoluteTitle: true,
  keywords: [
    "USA Wire Form",
    "CNC wire forming Northeast Ohio",
    "3D CNC wire baskets",
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
                href: "/guide/open-cable-support",
                title: "Open cable support",
                body: "Specify trays and J-hooks instead of a patented hanger catalog.",
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
                body: "Numalliance CNC on the floor — Robomac 214TF and the named machines.",
              },
            ]}
          />
        </Section>

        <StepQuoteBlock className="mt-16" title="Drop a STEP" />
      </Page>

      <SocialProof className="mt-8" />
    </>
  );
}
