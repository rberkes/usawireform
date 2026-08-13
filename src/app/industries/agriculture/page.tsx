import type { Metadata } from "next";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Agriculture Wire Forming",
  description:
    "Wire forms for agriculture: ground staples, harvest wire baskets, trellis structures, and galvanized 3/8 to 1/2 in frames.",
};

export default function AgriculturePage() {
  return (
    <Page>
      <PageHero
        kicker="Industries"
        title="Agriculture"
        lede="Forms that live in dirt, fertilizer, and weather. Ground staples, trellis structures, guards, wire baskets, and galvanized frames in 4–14 mm — not indoor clip wire."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          Agriculture is outdoor service plus impact. Coil is usually{" "}
          <TextLink href="/materials">1010 / 1018</TextLink> with zinc
          after weld, or 304 when the washdown or the chemical says so.
          Stock diameters{" "}
          <TextLink href="/sizes">3/8, 7/16, and 1/2 in</TextLink> cover
          most staples, rims, and guards we run.
        </p>
      </div>
      <Section title="What we form">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>
            <TextLink href="/products/ground-staples">Ground staples</TextLink>{" "}
            for fabric, erosion, irrigation lines, and fencing underlay
          </li>
          <li>
            Equipment guards,{" "}
            <TextLink href="/products/handles">handles</TextLink>,{" "}
            <TextLink href="/products/l-pins">L-pins</TextLink>,{" "}
            <TextLink href="/products/pins-and-clips">
              implement pins
            </TextLink>
            , and{" "}
            <TextLink href="/products/hog-rings">hog rings</TextLink>
          </li>
          <li>
            <TextLink href="/products/s-hooks">S-hooks</TextLink>,{" "}
            <TextLink href="/products/d-rings">D-rings</TextLink>, and
            cage / dairy hardware in 4–14 mm
          </li>
          <li>
            <TextLink href="/products/heavy-duty-wire-baskets">
              Harvest and parts wire baskets
            </TextLink>
          </li>
          <li>
            <TextLink href="/products/trellis-systems">
              Trellis and vertical-garden structures
            </TextLink>{" "}
            in 3/8 to 1/2 in
          </li>
          <li>
            <TextLink href="/products/security-mesh-fencing">
              Security mesh fencing
            </TextLink>{" "}
            and cage panels
          </li>
          <li>Galvanized frames, racks, and simple welded grids</li>
        </ul>
      </Section>
      <StepQuoteBlock className="mt-16" title="Have an ag print or a staple spec?" />
    </Page>
  );
}
