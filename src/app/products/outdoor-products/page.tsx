import type { Metadata } from "next";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Outdoor Wire Products",
  description:
    "Our own line of outdoor wire products — formed and welded in 4–14 mm on the same cells as contract work.",
};

export default function OutdoorProductsPage() {
  return (
    <Page>
      <PageHero
        kicker="Products"
        title="Outdoor products"
        lede="A line we design and run: outdoor wire goods in the same 4–14 mm band as customer prints. Not a imported patio catalog."
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
      <Section title="Same shop">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>
            <TextLink href="/products/wire-furniture">Wire furniture</TextLink>
          </li>
          <li>
            <TextLink href="/products/heavy-duty-wire-baskets">
              Heavy-duty wire baskets
            </TextLink>
          </li>
          <li>
            <TextLink href="/products/security-mesh-fencing">
              Security mesh fencing
            </TextLink>{" "}
            and{" "}
            <TextLink href="/products/trellis-systems">
              trellis / growing structures
            </TextLink>
          </li>
          <li>
            <TextLink href="/products/ground-staples">Ground staples</TextLink>
          </li>
          <li>
            <TextLink href="/products/trailer-latches">
              Trailer latches
            </TextLink>
            ,{" "}
            <TextLink href="/products/handles">handles</TextLink>,{" "}
            <TextLink href="/products/l-pins">L-pins</TextLink>,{" "}
            <TextLink href="/products/pins-and-clips">pins</TextLink>,{" "}
            <TextLink href="/products/hitch-pin-clips">
              hitch pin clips
            </TextLink>
            , and{" "}
            <TextLink href="/products/hog-rings">hog rings</TextLink>
          </li>
          <li>
            <TextLink href="/products/s-hooks">S-hooks</TextLink> and{" "}
            <TextLink href="/products/d-rings">D-rings</TextLink>
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
