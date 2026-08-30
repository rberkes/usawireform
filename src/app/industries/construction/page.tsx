import { IndustryQuotePage } from "@/components/client/IndustryQuotePage";
import { Section, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Construction Wire Forming",
  description: "Construction wire forming: USA made D-rings, USA made ground staples, USA made security fencing, rebar supports, and jobsite grids in 3/8, 7/16, and 1/2 in.",
  path: '/industries/construction',
  keywords: [
    "USA made D-rings",
    "USA made ground staples",
    "USA made security fencing",
    "construction",
    "construction wire forming",
    "4-14 mm wire",
    "CNC wire forms",
  ],
});

export default function ConstructionPage() {
  return (
    <IndustryQuotePage
      title="Construction"
      lede="USA made D-rings, USA made ground staples, USA made security fencing, plus supports and hangers in 4–14 mm. Not a light masonry-clip cell."
      ctaTitle="Have a construction form or a hook spec?"
    >
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          Construction wire here is the heavy end of the band.{" "}
          <TextLink href="/materials">1018 galvanized</TextLink> for
          outdoor steel; 304 when the spec is stainless. Stock diameters{" "}
          <TextLink href="/sizes">3/8, 7/16, and 1/2 in</TextLink>.{" "}
          <TextLink href="/processes/plating-and-coating">
            Rack zinc or zinc-nickel
          </TextLink>
          , then in-line powder when the color is on the print. If the
          print is a 9-gauge masonry clip under 4 mm, we will name that
          instead of quoting it as production.
        </p>
      </div>
      <Section title="What we form">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>
            <TextLink href="/products/rebar-supports">Rebar supports</TextLink>{" "}
            and{" "}
            <TextLink href="/products/u-anchors">
              concrete lifting U-anchors
            </TextLink>
          </li>
          <li>
            <TextLink href="/products/brackets">Brackets</TextLink> and{" "}
            <TextLink href="/products/wire-frames">frames</TextLink> on
            2D/3D CNC
          </li>
          <li>
            <TextLink href="/products/s-hooks">S-hooks</TextLink>,{" "}
            <TextLink href="/products/d-rings">USA made D-rings</TextLink>, and{" "}
            <TextLink href="/products/connecting-links">
              connecting links
            </TextLink>
          </li>
          <li>
            <TextLink href="/products/u-hangers">U-hangers</TextLink>,{" "}
            <TextLink href="/products/j-hooks">J-hooks</TextLink>, and{" "}
            <TextLink href="/products/cable-hangers">cable hangers</TextLink>
          </li>
          <li>
            <TextLink href="/ground-staples">USA made ground staples</TextLink>{" "}
            (also searched as USA made ground samples) for fabric, cable, and site erosion
          </li>
          <li>
            <TextLink href="/products/machine-guards">Guards</TextLink>,{" "}
            <TextLink href="/products/partition-grids">
              partition grids
            </TextLink>
            , and{" "}
            <TextLink href="/products/security-mesh-fencing">
              USA made security fencing
            </TextLink>
          </li>
        </ul>
      </Section>
    </IndustryQuotePage>
  );
}
