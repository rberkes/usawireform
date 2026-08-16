import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Solar Cable Hangers",
  description:
    "Custom solar cable hangers for PV arrays: messenger, multi-carrier, and structure forms in 3/8–1/2 in. Galvanized or 304. Trays and grounding hardware to print.",
  path: "/industries/solar",
  keywords: [
    "solar cable hangers",
    "solar cable management",
    "PV array hangers",
    "messenger wire hangers",
    "multi-carrier solar hangers",
    "torque tube cable hangers",
    "solar grounding hangers",
    "utility scale solar wire forms",
    "galvanized solar hangers",
    "304 solar hangers",
    "ground-mount solar cable support",
  ],
});

export default function SolarPage() {
  const breadcrumbItems = [
    { label: "Industries", href: "/industries" },
    { label: "Solar" },
  ];

  return (
    <Page>
      <BreadcrumbJsonLd
        items={[
          { name: "Industries", url: "/industries" },
          { name: "Solar", url: "/industries/solar" },
        ]}
      />
      <Breadcrumbs items={breadcrumbItems} />
      <PageHero
        kicker="Industries"
        title="Solar cable hangers"
        lede="Utility-scale and ground-mount arrays need cable off the dirt for the life of the plant. We form hangers, carriers, and trays in 4–14 mm outdoor coil — messenger, structure, and under-panel — not a 9-gauge clip cell."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          Solar hardware here is weather plus volume plus running changes on
          tracker steel. A row is a{" "}
          <TextLink href="/products/solar-hangers">hanger</TextLink> on a
          messenger or a tube, a carrier count, and a finish that still holds
          after twenty-five summers. Stock diameters{" "}
          <TextLink href="/sizes">3/8, 7/16, and 1/2 in</TextLink>. Coil is{" "}
          <TextLink href="/materials">1018 galvanized</TextLink> after form, or{" "}
          <TextLink href="/materials/300-series-stainless">304 / 316</TextLink>{" "}
          when the spec is stainless. Pre-galv that splits at the bend is the
          wrong finish for a desert array.
        </p>
        <p>
          Purpose-built hangers beat zip ties, light clips, and a trench when
          the run is exposed. We form the print in round wire. We do not sell
          someone else’s coated catalog, and we do not quote music-wire rings
          under 4 mm as production.
        </p>
      </div>

      <Section title="Messenger hangers along the row">
        <div className="mt-6 max-w-2xl space-y-5 text-sm leading-6 text-muted">
          <p>
            A common layout strings a messenger between piers. Hangers wrap or
            clip that strand at a pitch you name so they do not walk the wire
            in wind and ice. Cables load into open carriers, then the hanger
            closes on the messenger. The same form can be opened later to add
            a homerun or to pull a failed string — if the print wants a
            reopenable grip, say so.
          </p>
          <p>
            Multi-carrier hangers keep string DC, feeder, AC, and comms in
            separate loops when the electrical spec wants isolation. One
            hanger type, several pockets. Carrier ID, bundle count, and
            messenger OD belong on the drawing. We CNC that geometry in{" "}
            <TextLink href="/processes/2d-cnc-wire-forming">2D</TextLink> or{" "}
            <TextLink href="/processes/3d-cnc-wire-forming">3D</TextLink> from
            stock coil.
          </p>
        </div>
      </Section>

      <Section title="Under-panel and torque-tube forms">
        <div className="mt-6 max-w-2xl space-y-5 text-sm leading-6 text-muted">
          <p>
            Under the module, hangers saddle a torque tube, a purlin, or a
            fixed-tilt member so homeruns sit in the shade of the panel.
            Bifacial rows still need that path off the backsheet. Spiral and
            snap-on catalog parts are often patented; we form a round-wire
            equivalent to your tube OD and bundle, or we say the print is a
            buy-out.
          </p>
          <p>
            Tracker, ballasted, and fixed-tilt all run on the same cell. The
            difference is the mating steel and the motion, not a different
            diameter band.
          </p>
        </div>
      </Section>

      <Section title="Finish, grounding, and the print">
        <div className="mt-6 max-w-2xl space-y-5 text-sm leading-6 text-muted">
          <p>
            Outdoor service is the coating and the alloy, not a slogan. Zinc
            after form, powder when color or extra film is specified, 304 or
            316 when the site is coastal or the owner spec is stainless. PVC
            or plastisol jackets are a secondary — name them on{" "}
            <TextLink href="/processes/plating-and-coating">
              plating and coating
            </TextLink>{" "}
            if the hanger has to be fully insulated.
          </p>
          <p>
            Bonding clips, ground hangers, and{" "}
            <TextLink href="/products/ground-staples">ground staples</TextLink>{" "}
            are wire parts on the BOM. Listed messenger-as-ground packages,
            EGC/GEC equivalents, and UL solar listings are the electrical
            vendor’s. We form the hardware; we do not stamp someone else’s
            listing on the crate.
          </p>
          <p>
            Send hanger style, carrier count, messenger or tube OD, coating,
            and quantity. A project BOM is a print plus a finish — not a
            color chip. 100-piece minimum.
          </p>
        </div>
      </Section>

      <Section title="What we form">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>
            <TextLink href="/products/solar-hangers">Solar hangers</TextLink>{" "}
            on messenger or structure — single and multi-carrier
          </li>
          <li>
            <TextLink href="/products/cable-hangers">Cable hangers</TextLink>{" "}
            and{" "}
            <TextLink href="/products/j-hooks">J-hooks</TextLink> for string,
            feeder, AC, and data
          </li>
          <li>
            Structure and torque-tube hangers in round wire, to the tube OD
          </li>
          <li>
            <TextLink href="/products/cable-trays">Cable trays</TextLink> and
            management grids along the row or at the inverter pad
          </li>
          <li>
            Tracker and rack retainers, hooks, and brackets in stock coil
          </li>
          <li>
            <TextLink href="/products/ground-staples">Ground staples</TextLink>{" "}
            and grounding hangers to the print
          </li>
          <li>
            Fence and equipment{" "}
            <TextLink href="/products/machine-guards">guards</TextLink> at
            the pad
          </li>
        </ul>
      </Section>
      <StepQuoteBlock
        className="mt-16"
        title="Have a solar hanger, carrier count, or staple print?"
      />
    </Page>
  );
}
