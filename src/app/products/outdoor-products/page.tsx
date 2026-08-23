import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Outdoor Wire Products",
  description: "USA made wire baskets, USA made security fencing, USA made wire stakes, USA made D-rings — outdoor 4–14 mm on the same cells as contract work.",
  path: '/products/outdoor-products',
  keywords: [
    "USA made wire baskets",
    "USA made security fencing",
    "USA made wire stakes",
    "USA made D-rings",
    "USA made ground staples",
    "outdoor wire products",
    "galvanized wire forms",
  ],
});

export default function OutdoorProductsPage() {
  return (
    <Page>
      <PageHero
        kicker="Products"
        title="Outdoor products"
        lede="USA made wire baskets, USA made security fencing, USA made wire stakes, USA made D-rings — outdoor goods in the same 4–14 mm band as customer prints. Not an imported patio catalog."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          Outdoor goods share the coil, the welders, and the
          diameters:{" "}
          <TextLink href="/sizes">3/8, 7/16, and 1/2 in</TextLink>,{" "}
          <TextLink href="/materials">1018 galvanized</TextLink> or{" "}
          <TextLink href="/materials/300-series-stainless">
            300-series
          </TextLink>{" "}
          when the weather spec wants it.
        </p>
        <p>
          Frozen part numbers belong on a drawing. This page is the
          outdoor line, not a patio catalog. Contract SKUs in 3/8,
          7/16, and 1/2 in live in the{" "}
          <TextLink href="/products">product directory</TextLink>.
        </p>
      </div>
      <Section title="Same headquarters">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>
            <TextLink href="/products/wire-furniture">Wire furniture</TextLink>
          </li>
          <li>
            <TextLink href="/products/heavy-duty-wire-baskets">
              USA made wire baskets
            </TextLink>
          </li>
          <li>
            <TextLink href="/products/security-mesh-fencing">
              USA made security fencing
            </TextLink>{" "}
            and{" "}
            <TextLink href="/products/trellis-systems">
              USA made wire stakes
            </TextLink>
          </li>
          <li>
            <TextLink href="/products/ground-staples">USA made ground staples</TextLink>
          </li>
          <li>
            <TextLink href="/products/trailer-latches">
              Trailer latches
            </TextLink>
            ,{" "}
            <TextLink href="/products/handles">handles</TextLink>,{" "}
            <TextLink href="/l-hitch-pins">L hitch pins</TextLink>,{" "}
            <TextLink href="/products/pins-and-clips">pins</TextLink>,{" "}
            <TextLink href="/products/hitch-pin-clips">
              hitch pin clips
            </TextLink>
            , and{" "}
            <TextLink href="/products/hog-rings">hog rings</TextLink>
          </li>
          <li>
            <TextLink href="/products/s-hooks">S-hooks</TextLink> and{" "}
            <TextLink href="/products/d-rings">USA made D-rings</TextLink>
          </li>
          <li>
            <TextLink href="/products/cable-hangers">
              Cable hangers and J-hooks
            </TextLink>
          </li>
          <li>
            <TextLink href="/products/cable-trays">Cable trays</TextLink>
          </li>
          <li>
            Contract forms for{" "}
            <TextLink href="/industries">
              named industries
            </TextLink>
          </li>
        </ul>
      </Section>
      <StepQuoteBlock className="mt-16" title="Want a product we run, or a print of your own?" />
    </Page>
  );
}
