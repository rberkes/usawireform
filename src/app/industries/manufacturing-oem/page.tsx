import type { Metadata } from "next";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Manufacturing and OEM Wire Forming",
  description:
    "OEM contract wire forming in 3/8, 7/16, and 1/2 in: frames, handles, guards, and hardware to the buyer’s print.",
};

export default function ManufacturingOemPage() {
  return (
    <Page>
      <PageHero
        kicker="Industries"
        title="Manufacturing / OEM"
        lede="We form the piece that goes into your assembly. Frames, handles, guards, and hardware to the print — not a boxed finished good with our name on it."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          OEM work is 2D and 3D CNC in{" "}
          <TextLink href="/sizes">3/8, 7/16, and 1/2 in</TextLink>, then
          weld and finish as specified.{" "}
          <TextLink href="/materials">1018</TextLink>, spring steels, or
          300-series including 330. Revisions stay on the program, not a
          cam tool. Plant-installed guards and trays sit on{" "}
          <TextLink href="/industries/industrial">Industrial</TextLink>.
        </p>
      </div>
      <Section title="What we form">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>
            <TextLink href="/products/wire-frames">Frames</TextLink> that
            ship as a component — seats, racks, equipment outlines
          </li>
          <li>
            <TextLink href="/products/handles">Handles</TextLink>,{" "}
            <TextLink href="/products/brackets">brackets</TextLink>, and{" "}
            <TextLink href="/products/eye-forms">eye forms</TextLink>
          </li>
          <li>
            <TextLink href="/products/l-pins">L-pins</TextLink>,{" "}
            <TextLink href="/products/pins-and-clips">pins</TextLink>, and{" "}
            <TextLink href="/products/trailer-latches">latches</TextLink>
          </li>
          <li>
            Guard and grid components welded to the OEM’s envelope
          </li>
        </ul>
      </Section>
      <StepQuoteBlock className="mt-16" title="Have an OEM frame or a component print?" />
    </Page>
  );
}
