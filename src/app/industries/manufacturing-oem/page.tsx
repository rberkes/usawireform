import { IndustryQuotePage } from "@/components/client/IndustryQuotePage";
import { Section, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Manufacturing and OEM Wire Forming",
  description: "OEM contract wire forming in 3/8, 7/16, and 1/2 in: frames, handles, guards, and hardware to the buyer’s print.",
  path: '/industries/manufacturing-oem',
  keywords: [
    "manufacturing oem",
    "manufacturing oem wire forming",
    "4-14 mm wire",
    "CNC wire forms",
  ],
});

export default function ManufacturingOemPage() {
  return (
    <IndustryQuotePage
      title="Manufacturing / OEM"
      lede="We form the piece that goes into your assembly. Frames, handles, guards, and hardware to the print — not a boxed finished good with our name on it."
      ctaTitle="Have an OEM frame or a component print?"
    >
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
            <TextLink href="/l-hitch-pins">L hitch pins</TextLink>,{" "}
            <TextLink href="/products/pins-and-clips">pins</TextLink>, and{" "}
            <TextLink href="/products/trailer-latches">latches</TextLink>
          </li>
          <li>
            Guard and grid components welded to the OEM’s envelope
          </li>
        </ul>
      </Section>
    </IndustryQuotePage>
  );
}
