import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Data Center and AI Wire Forming",
  description: "USA made cable trays and USA made wire baskets for AI and data center builds — 4–14 mm, resistance welded, revisions on CNC.",
  path: '/industries/data-centers',
  keywords: [
    "USA made cable trays",
    "USA made wire baskets",
    "data centers",
    "data centers wire forming",
    "4-14 mm wire",
    "CNC wire forms",
  ],
});

export default function DataCentersPage() {
  return (
    <Page>
      <PageHero
        kicker="Industries"
        title="AI and data centers"
        lede="USA made cable trays, USA made wire baskets, and guards that change when the row changes. CNC plus weld — not a twelve-week cam tool."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          AI halls and colocation builds eat{" "}
          <TextLink href="/products/cable-trays">USA made cable trays</TextLink>{" "}
          and{" "}
          <TextLink href="/products/heavy-duty-wire-baskets">
            USA made wire baskets
          </TextLink>
          . Pitch, width, and hanger layout move. That is why
          this work sits on{" "}
          <TextLink href="/processes/2d-cnc-wire-forming">2D</TextLink> and{" "}
          <TextLink href="/processes/3d-cnc-wire-forming">3D CNC</TextLink>,
          then{" "}
          <TextLink href="/processes/resistance-welding">
            resistance weld
          </TextLink>{" "}
          on the mesh and MIG/TIG on rims and mounts.
        </p>
        <p>
          Carbon with zinc after weld is the usual tray. 304 when the spec
          wants stainless in the white space. Diameters{" "}
          <TextLink href="/sizes">3/8 and 7/16 in</TextLink> cover most
          runs; 1/2 in when the span or the load says so.
        </p>
      </div>
      <Section title="What we form">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>
            <TextLink href="/products/cable-trays">USA made cable trays</TextLink>
            {" "}and fittings
          </li>
          <li>
            <TextLink href="/products/heavy-duty-wire-baskets">
              USA made wire baskets
            </TextLink>{" "}
            underfloor and overhead
          </li>
          <li>Equipment guards and seismic-adjacent frames</li>
          <li>Grounding and routing forms in the 4–14 mm band</li>
        </ul>
      </Section>
      <StepQuoteBlock className="mt-16" title="Have a tray or wire basket for a hall?" />
    </Page>
  );
}
