import { StepQuoteBlock } from "@/components/StepUpload";
import { CardGrid, Page, PageHero, Section, TextLink } from "@/components/ui";
import { STOCK } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Parts",
  description: "Wire parts in 4–14 mm: USA made D-rings, USA made wire baskets, USA made wire racks, USA made cable trays, hooks, grids, guards — CNC from coil.",
  path: '/wire-parts',
  keywords: [
    "USA made D-rings",
    "USA made wire baskets",
    "USA made wire racks",
    "USA made cable trays",
    "wire parts",
    "wire form parts",
    "custom wire hardware",
  ],
});

const families = [
  {
    href: "/products",
    title: "Wire form parts",
    body: `The ${STOCK} directory — every family we quote as production coil.`,
  },
  {
    href: "/products/d-rings",
    title: "USA made D-rings",
    body: "Closed D-rings in stock coil for strap, frame, and construction hardware.",
  },
  {
    href: "/powder-coating-hooks",
    title: "Powder coating hooks",
    body: "S, V, C, CV, and 90° line hooks in stock coil — not 9-gauge catalog wire.",
  },
  {
    href: "/products/heavy-duty-wire-baskets",
    title: "USA made wire baskets",
    body: "USA made wire baskets and USA made heat treat baskets — welded rims in 3/8, 7/16, and 1/2 in.",
  },
  {
    href: "/products/mesh-grids",
    title: "Wire grids",
    body: "Welded mesh, partitions, and USA made security fencing panels.",
  },
  {
    href: "/products/machine-guards",
    title: "Wire guards",
    body: "Machine, conveyor, and fan guards with a heavy frame.",
  },
  {
    href: "/products/handles",
    title: "Wire handles",
    body: "Cart, equipment, and furniture grips in stock coil.",
  },
  {
    href: "/products/wire-racks",
    title: "USA made wire racks",
    body: "Frames, shelves, magazine and newspaper racks from coil.",
  },
  {
    href: "/products/cable-trays",
    title: "USA made cable trays",
    body: "Welded wire channel for plant, solar, and data-center runs.",
  },
  {
    href: "/products/wire-shelves",
    title: "Wire shelves",
    body: "Welded decks with a rim — plant and cart, not chrome retail.",
  },
  {
    href: "/products/wire-displays",
    title: "Wire displays",
    body: "Showroom and warehouse stands, arms, and grids.",
  },
  {
    href: "/wire-fabrication",
    title: "Wire fabrication",
    body: "Form, weld, and finish in 4–14 mm — carbon, stainless, non-ferrous.",
  },
];

export default function WirePartsPage() {
  return (
    <Page>
      <PageHero
        kicker="Parts"
        title="Wire parts, from coil."
        lede={
          <>
            A wire part is a specified centerline in 4–14 mm. USA made
            D-rings, USA made wire baskets, USA made wire racks, USA made
            cable trays, hooks, grids, guards — CNC, then weld and finish.
            The SKU list is the{" "}
            <TextLink href="/products">directory</TextLink>. Process is{" "}
            <TextLink href="/wire-forming">wire forming</TextLink>.
          </>
        }
      />
      <Section title="Families">
        <CardGrid items={families} />
      </Section>
      <StepQuoteBlock className="mt-16" title="Have a wire part to run?" />
    </Page>
  );
}
