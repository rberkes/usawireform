import type { Metadata } from "next";
import { StepQuoteBlock } from "@/components/StepUpload";
import { LinkList, Page, PageHero, Section, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Equipment",
  description:
    "Shop floor list: Numalliance Robomac 214, Lubow manual benders, 40-ton Clearing press, 75 kVA resistance weld, Miller MIG, granite inspection, and coil handling.",
};

export default function EquipmentPage() {
  return (
    <Page>
      <PageHero
        kicker="Equipment"
        title="Named machines, not a generic cell."
        lede={
          <>
            This is the floor list. Process theory lives in the{" "}
            <TextLink href="/processes">library</TextLink>;{" "}
            <TextLink href="/capabilities">capabilities</TextLink> is the
            band we quote. Below is what the form actually runs on.{" "}
            <TextLink href="/videos">Videos</TextLink> is the floor on camera.
          </>
        }
      />

      <Section title="Forming">
        <LinkList
          className="mt-5"
          items={[
            {
              href: "/processes/3d-cnc-wire-forming",
              title: "Numalliance Robomac 214",
              note: "CNC",
              body: "The production wire-forming cell — 2D and 3D programs in 4–14 mm from coil.",
            },
            {
              href: "/processes/wire-form-shapes",
              title: "Lubow manual benders",
              note: "Manual",
              body: "Hand and fixture bends for prototypes, short runs, and secondary legs that do not belong on the CNC head.",
            },
            {
              href: "/processes/end-forming",
              title: "40-ton Clearing press",
              note: "Press",
              body: "Pierce, coin, flatten, and stamp. The press does the end work the CNC will not.",
            },
          ]}
        />
      </Section>

      <Section title="Joining">
        <LinkList
          className="mt-5"
          items={[
            {
              href: "/processes/resistance-welding",
              title: "75 kVA resistance welder",
              note: "Resistance",
              body: "Cross-wire and projection welds on baskets, grids, and frames. Current and force for this band, not a clip welder.",
            },
            {
              href: "/processes/mig-tig-assembly",
              title: "Miller MIG",
              note: "MIG",
              body: "Filler-metal tacks and fillets on corners, mounts, and joints a resistance nugget cannot reach.",
            },
          ]}
        />
      </Section>

      <Section title="Inspection">
        <LinkList
          className="mt-5"
          items={[
            {
              href: "/processes/inspection",
              title: "Granite surface tables",
              note: "Datum",
              body: "A flat reference for fixtures, overlays, and height checks. The table is the datum, not the bench.",
            },
            {
              href: "/processes/inspection",
              title: "Digital readouts",
              note: "DRO",
              body: "Numeric travel on the inspection setup so a span is a reading, not a scale guess.",
            },
            {
              href: "/processes/inspection",
              title: "Height gauge",
              note: "Height",
              body: "Vertical distance off granite — stand-offs, offsets, and the out-of-plane kick a 2D overlay misses.",
            },
          ]}
        />
      </Section>

      <Section title="Coil and shipping">
        <LinkList
          className="mt-5"
          items={[
            {
              title: "Clark forklift, 6,000 lb",
              note: "Lift",
              body: "Coil on, finished lots off. Capacity is 6,000 lb — enough for production coil, not a pallet jack with ambition.",
            },
            {
              title: "Digital scale to 5,000 lb",
              note: "Scale",
              body: "Incoming coil and outgoing crates. Weight is on the ticket, not estimated from the skid.",
            },
          ]}
        />
      </Section>

      <StepQuoteBlock className="mt-16" title="Drop a STEP to quote" />
    </Page>
  );
}
