import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSchema, ServiceSchema } from "@/components/SeoSchemas";
import { StepQuoteBlock } from "@/components/StepUpload";
import {
  CardGrid,
  ChipList,
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
  title: "Solar Cable Trays and Array Hardware",
  description:
    "Solar array trays, J-hooks, U-hangers, and pad guards in 3/8–1/2 in. 1018 galv after form or 304/316. We do not copy patented hanger catalogs.",
  path: "/industries/solar",
  keywords: [
    "solar cable trays",
    "PV cable trays",
    "solar J-hooks",
    "solar array wire forms",
    "utility scale solar trays",
    "galvanized solar trays",
    "1018 galvanized solar",
    "304 solar hardware",
    "ground-mount solar cable support",
    "wire mesh solar tray",
    "inverter pad guards",
  ],
});

const faqs = [
  {
    question: "Do you copy patented solar hanger catalogs?",
    answer:
      "No. We will not quote a third-party solar hanger SKU, a reverse of that SKU, or a round-wire lookalike. That includes locking messenger hangers, cooperating gripper-hook hangers, snap-on torque-tube hangers, copper-composite messenger-as-ground kits, and mid-pier grounding bracket sets. Send those part numbers elsewhere.",
  },
  {
    question: "What will you form for a solar array?",
    answer:
      "Welded wire cable trays, J-hooks and U-hangers that bolt or hang from structure, ground staples, and pad guards in 4–14 mm. Stock coil is 3/8, 7/16, and 1/2 in, 1018 zinc after form or 304 / 316. The print has to be the customer’s geometry, not a catalog reverse.",
  },
  {
    question: "What steel is used for solar trays and hooks?",
    answer:
      "Trays and most round-wire hooks in this shop are low-carbon 1008, 1010, or 1018. Stock production is 1018. Coastal and owner-stainless specs move to 304 or 316. We do not run a patented spring-clip hanger catalog in high-carbon Class 3 wire.",
  },
  {
    question: "Can a dielectric coating go on the wire before forming?",
    answer:
      "Not if the coat has to stay a barrier. PVC, plastisol, and powder crack, thin, or burn at CNC bends, straightener rolls, cut ends, and every weld. Form and weld bare 1018 or stainless, zinc after form, then powder or plastisol on the finished part. Pre-galv is zinc, not insulation.",
  },
  {
    question: "Do you supply messenger strand or integrated grounding?",
    answer:
      "No. We do not strand messenger, copper-composite messenger, or listed EGC/GEC messenger-as-ground packages. We do not form the mid-pier L-bracket and clamp kits that go with those systems. Ground staples and simple bonding hardware are wire parts to the customer’s print only.",
  },
  {
    question: "What diameter and quantity do you run?",
    answer:
      "Production band is 4–14 mm. Stock coil is 3/8, 7/16, and 1/2 in. Lighter tray mesh in the band is named, not pretended as stock. 100-piece minimum.",
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
        name="Solar Cable Trays and Array Hardware"
        description="Custom welded wire cable trays, J-hooks, U-hangers, and pad guards for solar arrays in 4–14 mm. Galvanized after form or 304/316. Not a patented hanger catalog."
        url="/industries/solar"
        serviceType="Solar array wire forming"
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
        title="Solar cable trays and array hardware"
        lede="Utility-scale and ground-mount arrays still need cable off the dirt. We form trays, J-hooks, U-hangers, and pad guards in 4–14 mm outdoor coil — not a patented messenger-lock or snap-on torque-tube catalog."
      />

      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          Solar work in this shop is weather plus volume on{" "}
          <TextLink href="/sizes">3/8, 7/16, and 1/2 in</TextLink> coil.{" "}
          <TextLink href="/products/cable-trays">Welded trays</TextLink> along
          the row or at the inverter pad.{" "}
          <TextLink href="/products/j-hooks">J-hooks</TextLink> and{" "}
          <TextLink href="/products/u-hangers">U-hangers</TextLink> that hang
          or bolt from a purlin, pier, or rack member.{" "}
          <TextLink href="/materials">1018 galvanized</TextLink> after form, or{" "}
          <TextLink href="/materials/300-series-stainless">304 / 316</TextLink>{" "}
          when the spec is stainless. Pre-galv that splits at the bend is the
          wrong finish for a desert array.
        </p>
        <p>
          We form the customer’s print. We do not reverse a third-party solar
          hanger SKU, and we do not sell a round-wire “equivalent” of a
          patented clip. Electrical forms{" "}
          <TextLink href="/industries/electrical">
            carry cable, not current
          </TextLink>
          . Isolation, when the drawing wants it, is a jacket after the
          geometry exists.
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
              href: "/products/cable-trays",
              title: "Cable trays",
              body: "Welded wire channel along the row or at the inverter pad. 1018, zinc after weld. 304 when the spec is stainless.",
            },
            {
              href: "/products/j-hooks",
              title: "J-hooks",
              body: "Open hooks off a purlin, pier, or rack. String, feeder, AC, and data. Simple hang — not a captive messenger lock.",
            },
            {
              href: "/products/u-hangers",
              title: "U-hangers",
              body: "Two legs and a radius. Bolt or clamp to structure. Inside width on the print. Threaded or flattened ends when named.",
            },
            {
              href: "/products/cable-hangers",
              title: "Plant-style hangers",
              body: "Open loops and side-mounts to the customer’s print. Mining and plant work. Not a solar locking-hanger SKU.",
            },
            {
              href: "/products/ground-staples",
              title: "Ground staples",
              body: "Wire staples to the print. Not a listed messenger-as-ground package, and not mid-pier clamp kits.",
            },
            {
              href: "/products/machine-guards",
              title: "Pad guards and grids",
              body: "Fence and equipment guards at the inverter and transformer pad. Outdoor coil, welded rim.",
            },
          ]}
        />
      </Section>

      <Section id="not-this" title="What we will not quote">
        <div className="mt-6 max-w-2xl space-y-5 text-sm leading-6 text-muted">
          <p>
            A third-party solar hanger catalog is protected by utility patents
            (function) and design patents (look). Round wire instead of flat
            wire does not dodge either. If the RFQ is a part number from that
            catalog, a photo of that hanger, or “make it like this clip,” we
            decline it.
          </p>
        </div>
        <LinkList
          className="mt-8"
          items={[
            {
              title: "Locking messenger hangers",
              body: "Captive spiral / closed-lock arms that stay on the strand when bumped, then squeeze shut. Clock-style CLK geometry.",
            },
            {
              title: "Gripping messenger hangers",
              body: "Cooperating hooks that compress together with an interference-fit eye on the messenger. Open-lock OLK geometry.",
            },
            {
              title: "Snap-on torque-tube hangers",
              body: "Spring grips that flex over square, octagon, round, hex, or D tubes. Spiral under-panel catalogs. We do not form an equivalent.",
            },
            {
              title: "Integrated grounding kits",
              body: "Copper-composite messenger used as EGC/GEC, mid-pier L-brackets, grounding clamps, and the listed package around them.",
            },
            {
              title: "Catalog lookalikes",
              body: "Nested inner/outer carriers, orange plastisol SKUs, double safety-hook designs, and any reverse of a patented ornamental shape.",
            },
          ]}
        />
      </Section>

      <Section id="trays" title="Welded cable trays on the row and at the pad">
        <div className="mt-6 max-w-2xl space-y-5 text-sm leading-6 text-muted">
          <p>
            When the run is a channel, it is a{" "}
            <TextLink href="/products/cable-trays">cable tray</TextLink>: mesh
            bottom, sidewalls, lip, splices. Same family as plant and{" "}
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

      <Section id="hooks" title="J-hooks, U-hangers, and bolted structure mounts">
        <div className="mt-6 max-w-2xl space-y-5 text-sm leading-6 text-muted">
          <p>
            Tracker, fixed-tilt, and ballasted racks all have members you can
            hang or bolt from. A{" "}
            <TextLink href="/products/j-hooks">J-hook</TextLink> off a purlin
            or pier is an open hang. A{" "}
            <TextLink href="/products/u-hangers">U-hanger</TextLink> with
            named inside width can clamp or take threaded ends. Those are
            structure mounts to the print — not a messenger clip and not a
            snap-on tube grip.
          </p>
          <p>
            Name the member, the hang style, and whether the part bolts.
            Daily tracker motion still matters for clearance; it does not
            turn the job into a patented torque-tube hanger.
          </p>
        </div>
      </Section>

      <Section id="materials" title="Coil, zinc, and dielectric coats">
        <div className="mt-6 max-w-2xl space-y-5 text-sm leading-6 text-muted">
          <p>
            Outdoor service is the coating and the alloy, not a slogan. Low
            carbon is the tray and hook default because it forms, welds, and
            does not try to carry current. A dielectric barrier is a jacket on
            the finished part. Zinc is corrosion protection; it still conducts.
          </p>
        </div>
        <SpecList
          rows={[
            {
              label: "1018 (stock)",
              value: "Default trays, J-hooks, U-hangers, frames. Zinc after form or weld.",
            },
            {
              label: "1008 / 1010",
              value: "Softer tray and mesh wire when the form is severe or the coat is picky.",
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
              value: "After form (and after weld). Covers bends, nuggets, and cut ends.",
            },
            {
              label: "Spring-clip catalogs",
              value: "A227 / A229 Class 3 messenger-lock and tube-snap catalogs are a buy-out. We do not run them.",
            },
          ]}
        />
        <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">
          Name the jacket on{" "}
          <TextLink href="/processes/plating-and-coating">
            plating and coating
          </TextLink>{" "}
          if the tray or hook has to be fully insulated. Copper, brass, and
          copper-clad steel are electrical conductors — they do not belong on
          a support BOM unless the print is a ground lead we can actually form.
        </p>
        <ChipList
          items={[
            "Zinc after form (A123 / rack zinc)",
            "Powder over pretreated mill or plate",
            "Plastisol dip on the finished part",
            "304 / 316 passivate",
            "No pre-coat as a dielectric",
            "No copper messenger kits",
          ]}
        />
      </Section>

      <Section id="quote" title="What to send">
        <div className="mt-6 max-w-2xl space-y-5 text-sm leading-6 text-muted">
          <p>
            Send the customer’s drawing, not a competitor’s part number. A
            project BOM is a print plus a finish — not a color chip. 100-piece
            minimum.
          </p>
        </div>
        <Panel className="mt-8 max-w-2xl">
          <h3 className="font-medium">RFQ checklist</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            <li>PDF with diameters, inside radii, and critical-to-fit dims</li>
            <li>What the part hangs or bolts from (purlin, pier, rack) — not a catalog clip</li>
            <li>Alloy — 1018, 304, or 316</li>
            <li>Finish sequence — zinc after form, then powder or plastisol if isolated</li>
            <li>Quantity: first article, row count, and whether the print is frozen</li>
            <li>Do not send third-party hanger SKUs, photos of those SKUs, or “make it like this”</li>
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
              href: "/guide/open-cable-support",
              title: "Open cable support",
              body: "Specify trays, J-hooks, and bolted U-hangers instead of a patented hanger catalog.",
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
        title="Have a tray, J-hook, or pad-guard print?"
      />
    </Page>
  );
}
