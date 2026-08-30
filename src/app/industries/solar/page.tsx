import { IndustryQuotePage } from "@/components/client/IndustryQuotePage";
import { Section, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Solar Wire Forming",
  description: "Solar wire forms: USA made cable trays, USA made ground staples, hangers, and outdoor 304 or galvanized coil in 4–14 mm.",
  path: '/industries/solar',
  keywords: [
    "USA made cable trays",
    "USA made ground staples",
    "USA made ground samples",
    "solar",
    "solar wire forming",
    "4-14 mm wire",
    "CNC wire forms",
  ],
});

export default function SolarPage() {
  return (
    <IndustryQuotePage
      title="Solar"
      lede="USA made cable trays and USA made ground staples for array fields. Galvanized carbon or 300-series, formed and welded so cable and fabric stay put."
      ctaTitle="Have a solar hanger, form, or staple?"
    >
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          Solar is weather plus volume plus running changes on tracker
          hardware. Forms are{" "}
          <TextLink href="/materials">1018 galvanized</TextLink> or{" "}
          <TextLink href="/materials/300-series-stainless">304 / 316</TextLink>
          , in{" "}
          <TextLink href="/sizes">3/8 to 1/2 in</TextLink> when the part
          is structural. Pre-galv that cracks at the bend is the wrong
          finish for a 25-year array.
        </p>
      </div>
      <Section title="What we form">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>Tracker and rack wire forms, hooks, and retainers</li>
          <li>
            <TextLink href="/products/solar-hangers">Solar hangers</TextLink>{" "}
            and{" "}
            <TextLink href="/products/cable-hangers">cable hangers</TextLink>{" "}
            on messenger or structure
          </li>
          <li>
            <TextLink href="/products/cable-trays">USA made cable trays</TextLink>{" "}
            and management grids along the row
          </li>
          <li>
            <TextLink href="/ground-staples">USA made ground staples</TextLink>{" "}
            (also searched as USA made ground samples) for fabric, cable, and erosion
          </li>
          <li>
            <TextLink href="/products/security-mesh-fencing">
              USA made security fencing
            </TextLink>{" "}
            and equipment guards at the inverter pad
          </li>
        </ul>
      </Section>
    </IndustryQuotePage>
  );
}
