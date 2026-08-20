import { StepQuoteBlock } from "@/components/StepUpload";
import {
  CardGrid,
  ChipList,
  Page,
  PageHero,
  Section,
  SpecList,
  TextLink,
} from "@/components/ui";
import { WIRE } from "@/lib/range";
import { QUOTE, toolingRange } from "@/lib/quoting";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Capabilities",
  description: `3D CNC wire forming in ${WIRE.label}: frames, wire baskets, guards, rack plating, and in-line powder.`,
  path: "/capabilities",
  keywords: [
    "USA made cable trays",
    "USA made wire baskets",
    "USA made security fencing",
    "wire forming capabilities",
    "rack plating",
    "powder coat",
  ],
});

const forming = [
  {
    title: "Wire fabrication, 4–14 mm",
    href: "/wire-fabrication",
    body: "Low to high carbon, stainless, and other ferrous and non-ferrous coil — form, weld, and finish.",
  },
  {
    title: "Stock sizes: 3/8, 7/16, 1/2 in",
    href: "/sizes",
    body: "The diameters we run as production coil — 9.53 mm, 11.11 mm, and 12.7 mm — inside the 4–14 mm band.",
  },
  {
    title: "Tooling and coil",
    href: "/quoting",
    body: "Non-stock diameters in 4–14 mm: tooling, programming, and mill minimums when we do not carry the steel.",
  },
  {
    title: "Coil materials",
    href: "/materials",
    body: "Cold-roll 1010 and 1018, spring steels, 300-series including 330, brass, and copper — from coil.",
  },
  {
    title: "Heavy wire, 4–14 mm",
    href: "/processes/heavy-wire-forming",
    body: "The production band: 4–14 mm (0.157–0.551 in). Frames, wire baskets, guards — not music-wire clips.",
  },
  {
    title: "2D CNC forming",
    href: "/processes/2d-cnc-wire-forming",
    body: "Planar bends for frames, links, and guards when the part lives in one plane.",
  },
  {
    title: "3D CNC forming",
    href: "/processes/3d-cnc-wire-forming",
    body: "Spatial bends for hooks, frames, routing parts, and wire-basket geometry in 4–14 mm wire.",
  },
  {
    title: "Wire form shapes",
    href: "/processes/wire-form-shapes",
    body: "Cut-to-length, L, U, J, S, C, V, serpentine, eyes, rings, and closed frames in 4–14 mm.",
  },
  {
    title: "Cut-to-length & end work",
    href: "/processes/end-forming",
    body: "Square, chamfered, or coined ends. Threaded or flattened terminals when the print calls for them.",
  },
  {
    title: "USA made cable trays and mesh",
    href: "/processes/mesh-grids-and-cable-trays",
    body: "USA made cable trays, USA made wire baskets, USA made security fencing. Resistance weld on the intersections; MIG and TIG on rims, mounts, and splices.",
  },
];

const finishing = [
  {
    title: "Rack plating",
    href: "/processes/plating-and-coating#plating",
    body: "Zinc, zinc-nickel, and zinc-iron on formed 3/8, 7/16, and 1/2 in parts. Rack, not barrel. Spec and microns on the quote.",
  },
  {
    title: "In-line powder coating",
    href: "/processes/plating-and-coating#powder",
    body: "Conveyor powder: hang, pretreat, spray, cure. Batch only when the form will not hang or the lot is too small for the line.",
  },
  {
    title: "Plate then powder",
    href: "/processes/plating-and-coating#dual",
    body: "Dual coat in one sequence — corrosion plate under a color. Not plate here and powder somewhere else.",
  },
];

export default function CapabilitiesPage() {
  return (
    <Page>
      <PageHero
        kicker="Capabilities"
        title="4–14 mm CNC wire forming, plus the secondary."
        lede={
          <>
            We run {WIRE.label} on CNC equipment, then plate and powder so
            the form installs. Process theory lives in the{" "}
            <TextLink href="/processes">library</TextLink>; this page is what we
            run. Below 4 mm or above 14 mm, we say so before the PO.
          </>
        }
      />

      <Section title="Forming">
        <CardGrid items={forming} />
      </Section>

      <Section title="Finishing">
        <CardGrid items={finishing} />
      </Section>

      <Section title="Equipment">
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          The CNC cell is a Numalliance Robomac 214TF. Lubow manuals, a 40-ton
          Clearing press, 75 kVA resistance weld, and Miller MIG sit with it.
          Inspection is granite, DRO, and a height gauge. Named list:{" "}
          <TextLink href="/equipment">equipment</TextLink>.
        </p>
      </Section>

      <section className="mt-16 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl tracking-tight">Working range</h2>
          <SpecList
            rows={[
              { label: "Diameter", value: WIRE.label },
              {
                label: "Stock sizes",
                value: "3/8, 7/16, and 1/2 in",
              },
              {
                label: "Non-stock tooling",
                value: `${toolingRange} (${QUOTE.year})`,
              },
              { label: "Length", value: "Short forms to multi-foot frames" },
              { label: "Tolerance", value: "±0.005 in typical; tighter on request" },
              { label: "Lot size", value: "First article through 100,000+" },
            ]}
          />
        </div>
        <div>
          <h2 className="text-2xl tracking-tight">Secondary operations</h2>
          <ChipList
            items={[
              "Resistance welding",
              "MIG / TIG tack & assembly",
              "Hole pierce & stamp",
              "Deburr & tumble",
              "Rack zinc / Zn-Ni / Zn-Fe",
              "In-line powder",
              "Plate then powder",
              "Passivate stainless",
            ]}
          />
        </div>
      </section>

      <StepQuoteBlock className="mt-16" title="Drop a STEP to quote" />
    </Page>
  );
}
