import type { Metadata } from "next";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Architectural Wire Forming",
  description:
    "Architectural wire forming in 3/8, 7/16, and 1/2 in: screens, security mesh, trellis, and frames — not ornamental 9-gauge.",
};

export default function ArchitecturalPage() {
  return (
    <Page>
      <PageHero
        kicker="Industries"
        title="Architectural"
        lede="Building infill and outdoor structure in 4–14 mm. Screens, mesh, trellis, and frames — not a 9-gauge railing catalog."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          Architectural wire here is stock coil on the rim:{" "}
          <TextLink href="/sizes">3/8, 7/16, and 1/2 in</TextLink>.{" "}
          <TextLink href="/materials">1018 galvanized</TextLink> or{" "}
          <TextLink href="/materials/300-series-stainless">304 / 316</TextLink>{" "}
          when the elevation wants stainless.{" "}
          <TextLink href="/processes/plating-and-coating">
            In-line powder
          </TextLink>{" "}
          when the color is on the print. Light infill is named, not
          pretended as stock.
        </p>
      </div>
      <Section title="What we form">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>
            <TextLink href="/products/security-mesh-fencing">
              Security mesh
            </TextLink>{" "}
            and{" "}
            <TextLink href="/products/partition-grids">
              partition grids
            </TextLink>{" "}
            as screens and infill
          </li>
          <li>
            <TextLink href="/products/trellis-systems">
              Trellis and growing structures
            </TextLink>
          </li>
          <li>
            <TextLink href="/products/wire-frames">Frames</TextLink>,{" "}
            <TextLink href="/products/gate-hooks">gate hooks</TextLink>,
            and{" "}
            <TextLink href="/products/trailer-latches">
              wire latches
            </TextLink>
          </li>
          <li>
            <TextLink href="/products/mesh-grids">Mesh grids</TextLink>{" "}
            with a heavy rim
          </li>
        </ul>
      </Section>
      <StepQuoteBlock className="mt-16" title="Have an architectural screen or frame print?" />
    </Page>
  );
}
