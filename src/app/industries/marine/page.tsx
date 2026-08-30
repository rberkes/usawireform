import { IndustryQuotePage } from "@/components/client/IndustryQuotePage";
import { Section, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Marine Wire Forming",
  description: "Marine wire: 304 and 316 frames, USA made wire baskets, USA made D-rings, and guards for wet service — not a marine-cert catalog.",
  path: '/industries/marine',
  keywords: [
    "USA made wire baskets",
    "USA made D-rings",
    "marine",
    "marine wire forming",
    "4-14 mm wire",
    "CNC wire forms",
  ],
});

export default function MarinePage() {
  return (
    <IndustryQuotePage
      title="Marine"
      lede="Wet service in 4–14 mm. 304 and 316 frames, USA made wire baskets, USA made D-rings, and guards. Coil and finish named — we do not invent a class certificate."
      ctaTitle="Have a marine frame or a 316 print?"
    >
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          Marine work in this shop is stainless first.{" "}
          <TextLink href="/materials/300-series-stainless">304 or 316</TextLink>
          , stock diameters{" "}
          <TextLink href="/sizes">3/8, 7/16, and 1/2 in</TextLink>. Carbon
          with{" "}
          <TextLink href="/processes/plating-and-coating">
            zinc-nickel
          </TextLink>{" "}
          only when the print says so. We form the geometry. Classification
          society stamps belong to the buyer.
        </p>
      </div>
      <Section title="What we form">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>
            <TextLink href="/products/wire-frames">Frames</TextLink> and{" "}
            <TextLink href="/products/handles">handles</TextLink> in 304 /
            316
          </li>
          <li>
            <TextLink href="/products/heavy-duty-wire-baskets">
              USA made wire baskets
            </TextLink>{" "}
            and{" "}
            <TextLink href="/products/wire-racks">USA made wire racks</TextLink>
          </li>
          <li>
            <TextLink href="/products/machine-guards">Guards</TextLink> and{" "}
            <TextLink href="/products/mesh-grids">mesh grids</TextLink>
          </li>
          <li>
            <TextLink href="/products/d-rings">USA made D-rings</TextLink>,{" "}
            <TextLink href="/products/s-hooks">S-hooks</TextLink>, and{" "}
            <TextLink href="/products/connecting-links">
              connecting links
            </TextLink>
          </li>
        </ul>
      </Section>
    </IndustryQuotePage>
  );
}
