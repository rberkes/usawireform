import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSchema, ServiceSchema } from "@/components/SeoSchemas";
import { StepQuoteBlock } from "@/components/StepUpload";
import {
  CardGrid,
  ChipList,
  FactGrid,
  LinkList,
  Page,
  PageHero,
  Panel,
  Section,
  SpecList,
  StatRow,
  TextLink,
} from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Solar Cable Hangers and Trays",
  description:
    "Solar cable hangers and trays in 3/8–1/2 in: messenger, multi-carrier, under-panel. 1018 galv after form or 304/316. Coat after the bend.",
  path: "/industries/solar",
  keywords: [
    "solar cable hangers",
    "solar cable trays",
    "solar cable management",
    "PV array hangers",
    "PV cable trays",
    "messenger wire hangers",
    "multi-carrier solar hangers",
    "torque tube cable hangers",
    "under panel cable hangers",
    "solar grounding hangers",
    "utility scale solar wire forms",
    "galvanized solar hangers",
    "1018 galvanized solar",
    "304 solar hangers",
    "ground-mount solar cable support",
    "wire mesh solar tray",
  ],
});

const faqs = [
  {
    question: "What steel is used for solar cable hangers and trays?",
    answer:
      "Trays and most round-wire hangers in this shop are low-carbon 1008, 1010, or 1018. Stock production is 1018. The industry does not use a special low-conductivity alloy — carbon steel already carries cable, not current. Coastal and owner-stainless specs move to 304 or 316.",
  },
  {
    question: "Can a dielectric coating go on the wire before forming?",
    answer:
      "Not if the coat has to stay a barrier. PVC, plastisol, and powder crack, thin, or burn at CNC bends, straightener rolls, cut ends, and every weld. Form and weld bare 1018 or stainless, zinc after form, then plastisol or powder on the finished part. Pre-galv is zinc, not insulation, and it still conducts.",
  },
  {
    question: "Do you supply messenger strand or guy wire?",
    answer:
      "No. Messenger is ASTM A475 extra-high-strength galvanized strand, usually 1×7. We form the hangers that clip or wrap that strand. Send messenger OD so the grip matches; do not send us the reel of strand.",
  },
  {
    question: "Do you sell a patented solar hanger catalog?",
    answer:
      "No. Spiral and snap-on torque-tube catalogs are often patented buy-outs. We CNC round-wire hangers, carriers, and trays to your print in 4–14 mm — 3/8, 7/16, and 1/2 in as stock. If the geometry is a stamped flat ring we cannot run, we say so.",
  },
  {
    question: "When do solar hangers need spring steel instead of 1018?",
    answer:
      "When the part must spring-clip a messenger and reopen. That is ASTM A227 or A229 (about 1065–1070), Class 3 zinc, then a jacket after form. Most 3/8–1/2 in row hangers, trays, and structure saddles are 1018 that stays bent. Name the temper on the print; do not assume 1018 will clip.",
  },
  {
    question: "Is the hanger or tray part of the grounding system?",
    answer:
      "Only if the electrical drawing says so. We form bonding clips, ground hangers, and ground staples to print. Listed messenger-as-ground packages, EGC/GEC equivalents, and UL solar listings belong to the electrical vendor. A PVC or plastisol jacket is there so the form does not touch the circuit.",
  },
  {
    question: "What diameter and quantity do you run for solar hardware?",
    answer:
      "Production band is 4–14 mm. Stock coil is 3/8, 7/16, and 1/2 in. Lighter tray mesh in the band is named, not pretended as stock. 100-piece minimum. A project BOM is a print, a finish, and a quantity — not a color chip.",
  },
];

export default function SolarPage() {
  const breadcrumbItems = [
    { label: "Industries", href: "/industries" },
    { label: "Solar" },
  ];

  return (
    <Page>
      <ServiceSchema
        name="Solar Cable Hangers and Trays"
        description="Custom solar cable hangers, multi-carrier supports, and welded wire trays in 4–14 mm. Galvanized after form or 304/316, to the array print."
        url="/industries/solar"
        serviceType="Solar cable hanger and tray wire forming"
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Industries", url: "/industries" },
          { name: "Solar", url: "/industries/solar" },
        ]}
      />
      <Breadcrumbs items={breadcrumbItems} />
      <PageHero
        kicker="Industries"
        title="Solar cable hangers and trays"
        lede="Utility-scale and ground-mount arrays need cable off the dirt for the life of the plant. We form hangers, carriers, and trays in 4–14 mm outdoor coil — messenger, structure, under-panel, and pad — not a 9-gauge clip cell."
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
          under 4 mm as production. Electrical forms{" "}
          <TextLink href="/industries/electrical">carry cable, not current</TextLink>
          . Isolation, when the drawing wants it, is a jacket after the geometry
          exists — not a magic mill chemistry.
        </p>
      </div>

      <StatRow
        className="mt-12"
        items={[
          { value: "4–14 mm", label: "Production band" },
          { value: "3/8–1/2 in", label: "Stock coil" },
          { value: "1018 / 304", label: "Usual outdoor coil" },
          { value: "100 pc", label: "Minimum" },
        ]}
      />

      <Section id="what-we-form" title="What we form for the array">
        <CardGrid
          items={[
            {
              href: "/products/solar-hangers",
              title: "Solar hangers",
              body: "Messenger and structure hangers in round 3/8, 7/16, or 1/2 in. Single or multi-carrier. Galv after form or 304 / 316.",
            },
            {
              href: "/products/cable-hangers",
              title: "Cable hangers",
              body: "Plant-style messenger hangers and multi-loop carriers when the run is utility, not a solar SKU name.",
            },
            {
              href: "/products/cable-trays",
              title: "Cable trays",
              body: "Welded wire channel along the row or at the inverter pad. 1018, zinc after weld. 304 when the spec is stainless.",
            },
            {
              href: "/products/j-hooks",
              title: "J-hooks and U-hangers",
              body: "String, feeder, AC, and data off a purlin or a pier. Same stock diameters as the hangers.",
            },
            {
              href: "/products/ground-staples",
              title: "Ground staples and hangers",
              body: "Wire parts on the bonding BOM. We form the hardware; listed EGC packages stay with the electrical vendor.",
            },
            {
              href: "/products/machine-guards",
              title: "Pad guards and grids",
              body: "Fence and equipment guards at the inverter and transformer pad. Outdoor coil, welded rim.",
            },
          ]}
        />
      </Section>

      <Section id="messenger" title="Messenger hangers along the row">
        <div className="mt-6 max-w-2xl space-y-5 text-sm leading-6 text-muted">
          <p>
            A common layout strings a messenger between piers. Hangers wrap or
            clip that strand at a pitch you name so they do not walk the wire
            in wind and ice. Cables load into open carriers, then the hanger
            closes on the messenger. The same form can be opened later to add
            a homerun or to pull a failed string — if the print wants a
            reopenable grip, say so. That grip is a temper question, not a
            paint color.
          </p>
          <p>
            Multi-carrier hangers keep string DC, feeder, AC, and comms in
            separate loops when the electrical spec wants isolation. One
            hanger type, several pockets. Carrier ID, bundle count, and
            messenger OD belong on the drawing. We CNC that geometry in{" "}
            <TextLink href="/processes/2d-cnc-wire-forming">2D</TextLink> or{" "}
            <TextLink href="/processes/3d-cnc-wire-forming">3D</TextLink> from
            stock coil. We do not draw or strand the messenger itself.
          </p>
        </div>
        <SpecList
          rows={[
            {
              label: "Grip",
              value: "Wrap or clip to named messenger OD — not a universal ring",
            },
            {
              label: "Carriers",
              value: "One loop or several; DC / AC / comms kept apart when the spec says so",
            },
            {
              label: "Coil",
              value: "1018 that stays bent, or A227 / A229 when it must spring-clip",
            },
            {
              label: "Pitch",
              value: "On the drawing. Wind and ice walk a loose hanger down the strand",
            },
          ]}
        />
      </Section>

      <Section id="under-panel" title="Under-panel and torque-tube forms">
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
            diameter band. A tracker hanger has to live with daily rotation;
            a ballasted roof hanger has to clear membrane and ballast blocks.
            Name the member OD and the motion on the RFQ.
          </p>
        </div>
        <FactGrid
          className="mt-10"
          items={[
            {
              label: "Tracker",
              value:
                "Saddle the torque tube. Allow rotation and keep bundles off the backsheet. Round wire to the tube OD.",
            },
            {
              label: "Fixed tilt",
              value:
                "Purlin or pier mount. Same stock coil. Geometry follows the rack, not a tracker catalog.",
            },
            {
              label: "Ballasted / roof",
              value:
                "Low profile, membrane clearance, often 304. Still 4–14 mm — not a rooftop clip bag.",
            },
          ]}
        />
      </Section>

      <Section id="trays" title="Welded cable trays on the row and at the pad">
        <div className="mt-6 max-w-2xl space-y-5 text-sm leading-6 text-muted">
          <p>
            When the run is a channel instead of a hanger on a strand, it is a{" "}
            <TextLink href="/products/cable-trays">cable tray</TextLink>
            : mesh bottom, sidewalls, lip, splices. Same family as plant and{" "}
            <TextLink href="/industries/data-centers">data-hall</TextLink>{" "}
            trays, built for outdoor service. Usual coil is{" "}
            <TextLink href="/materials">1018</TextLink>, zinc after weld, in
            3/8 or 7/16 in. 1/2 in when the span is structural. 304 when the
            owner spec is stainless. Resistance on intersections; MIG on lips
            and splices — see{" "}
            <TextLink href="/processes/mesh-grids-and-cable-trays">
              mesh grids and cable trays
            </TextLink>
            .
          </p>
          <p>
            Catalog basket tray is often 1008 around 5 mm, welded then
            electrozinc or hot-dip. That diameter sits at the bottom of our
            band and is a named coil, not stock 3/8. Do not send pre-coated
            PVC wire and expect a dielectric tray: every weld burns the jacket
            off. Form and weld mill steel, then zinc, then powder or plastisol
            if the tray must stay off the circuit.
          </p>
        </div>
      </Section>

      <Section id="materials" title="Coil, zinc, and dielectric coats">
        <div className="mt-6 max-w-2xl space-y-5 text-sm leading-6 text-muted">
          <p>
            Outdoor service is the coating and the alloy, not a slogan. Low
            carbon is the tray and hanger default because it forms, welds, and
            does not try to carry current. A dielectric barrier is a jacket on
            the finished part. Zinc is corrosion protection; it still conducts.
          </p>
        </div>
        <SpecList
          rows={[
            {
              label: "1018 (stock)",
              value: "Default hangers, trays, frames. Zinc after form or weld.",
            },
            {
              label: "1008 / 1010",
              value: "Softer tray and mesh wire when the form is severe or the coat is picky.",
            },
            {
              label: "A227 / A229",
              value: "Spring clip hangers only. About 1065–1070. Class 3 zinc, then jacket.",
            },
            {
              label: "304 / 316",
              value: "Coastal, chemical, owner-stainless. 316 for chlorides. Passivate, not a zinc substitute.",
            },
            {
              label: "Pre-galv coil",
              value: "Marks in the straightener, splits at a tight radius, burns at the weld. Wrong for 25-year arrays.",
            },
            {
              label: "PVC / plastisol / powder",
              value: "After form (and after weld). Covers bends, nuggets, and cut ends. That is the dielectric path.",
            },
          ]}
        />
        <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">
          Name the jacket on{" "}
          <TextLink href="/processes/plating-and-coating">
            plating and coating
          </TextLink>{" "}
          if the hanger or tray has to be fully insulated. Copper, brass, and
          copper-clad steel are electrical conductors — they do not belong on
          a support BOM unless the print is a ground lead.
        </p>
        <ChipList
          items={[
            "Zinc after form (A123 / rack zinc)",
            "Powder over pretreated mill or plate",
            "Plastisol dip on the finished hanger",
            "304 / 316 passivate",
            "No pre-coat as a dielectric",
            "No copper on the support hang",
          ]}
        />
      </Section>

      <Section id="grounding" title="Grounding hardware vs listings">
        <div className="mt-6 max-w-2xl space-y-5 text-sm leading-6 text-muted">
          <p>
            Bonding clips, ground hangers, and{" "}
            <TextLink href="/products/ground-staples">ground staples</TextLink>{" "}
            are wire parts on the BOM. Listed messenger-as-ground packages,
            EGC/GEC equivalents, and UL solar listings are the electrical
            vendor’s. We form the hardware; we do not stamp someone else’s
            listing on the crate.
          </p>
        </div>
      </Section>

      <Section id="not-this" title="What this page is not">
        <LinkList
          className="mt-8"
          items={[
            {
              title: "Messenger strand",
              body: "A475 EHS 1×7 is a mill product. We hang on it; we do not strand it.",
            },
            {
              title: "Patented catalog clips",
              body: "Rolled-flat rings, orange plastisol SKUs, and snap-on patents are buy-outs unless the print is round wire we can CNC.",
            },
            {
              title: "Music-wire and 9-gauge cells",
              body: "Under 4 mm is a different shop. We will say so instead of quoting it as production.",
            },
            {
              title: "Pre-coated dielectric coil",
              body: "A jacket that has to isolate current goes on after the bend and the weld. Cut ends and nuggets are otherwise live steel.",
            },
          ]}
        />
      </Section>

      <Section id="quote" title="What to send">
        <div className="mt-6 max-w-2xl space-y-5 text-sm leading-6 text-muted">
          <p>
            Send hanger style, carrier count, messenger or tube OD, coating,
            and quantity. A project BOM is a print plus a finish — not a
            color chip. 100-piece minimum.
          </p>
        </div>
        <Panel className="mt-8 max-w-2xl">
          <h3 className="font-medium">RFQ checklist</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            <li>PDF with diameters, inside radii, and critical-to-fit dims</li>
            <li>Messenger OD or torque-tube / purlin OD</li>
            <li>Carrier count and what each pocket holds (DC, AC, comms)</li>
            <li>Alloy and temper — 1018, spring, 304, or 316</li>
            <li>Finish sequence — zinc after form, then powder or plastisol if isolated</li>
            <li>Tracker / fixed / ballasted and whether the hanger must reopen</li>
            <li>Quantity: first article, row count, and whether the print is frozen</li>
          </ul>
        </Panel>
      </Section>

      <Section id="faq" title="FAQ">
        <div className="mt-6 max-w-2xl divide-y divide-line border-y border-line">
          {faqs.map((item) => (
            <div key={item.question} className="py-6">
              <h3 className="text-base font-medium tracking-tight">
                {item.question}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Related">
        <CardGrid
          columns={2}
          items={[
            {
              href: "/industries/electrical",
              title: "Electrical",
              body: "Plant and utility trays, J-hooks, and hangers — same coil family, indoor and pad work.",
            },
            {
              href: "/materials",
              title: "Materials",
              body: "1010 / 1018, spring steels, 304 / 316, and what belongs on a forming coil.",
            },
            {
              href: "/processes/plating-and-coating",
              title: "Plating and coating",
              body: "Pre-coat vs form-then-finish. Rack zinc, powder, and why jackets wait until after the bend.",
            },
            {
              href: "/guide/design-for-wire-forming",
              title: "Design for wire forming",
              body: "Radii, diameters, and what to put on the print before the RFQ.",
            },
          ]}
        />
      </Section>

      <StepQuoteBlock
        className="mt-16"
        title="Have a solar hanger, tray, or staple print?"
      />
    </Page>
  );
}
