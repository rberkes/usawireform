import { StepQuoteBlock } from "@/components/StepUpload";
import { CardGrid, Page, PageHero, Section, TextLink } from "@/components/ui";
import { STOCK } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Parts",
  description: "Wire parts and wire form parts in 4–14 mm: hooks, hangers, baskets, grids, guards, racks, handles — CNC from coil.",
  path: '/wire-parts',
  keywords: [
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
    href: "/products/s-hooks",
    title: "Wire hooks",
    body: "S, J, lift, gate, display, and powder-line hooks in stock coil.",
  },
  {
    href: "/products/heavy-duty-wire-baskets",
    title: "Wire baskets",
    body: "Welded baskets and rims in 3/8, 7/16, and 1/2 in.",
  },
  {
    href: "/products/mesh-grids",
    title: "Wire grids",
    body: "Welded mesh, partitions, and security panels.",
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
    title: "Wire racks",
    body: "Frames, shelves, magazine and newspaper racks.",
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
            A wire part is a specified centerline in 4–14 mm. Hooks,
            hangers, baskets, grids, guards, racks, handles — CNC, then
            weld and finish. The SKU list is the{" "}
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
