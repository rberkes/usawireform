import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Design and Prototyping for Wire Forming",
  description:
    "SolidWorks, STEP, and 3D CNC programs for 4–14 mm wire forms. Prototype on the Robomac 214TF — not a fourslide cam. Northeast Ohio.",
  path: "/products/design-and-prototyping",
  keywords: [
    "wire forming prototype",
    "CNC wire forming design",
    "SolidWorks wire form",
    "3D printing wire prototype",
  ],
});

export default function DesignAndPrototypingPage() {
  return (
    <Page>
      <PageHero
        kicker="Services"
        title="Design and prototyping"
        lede="A program and standard pins — not a cam tool. Send a STEP. First parts leave while a fourslide tool is still in design."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          We work from STEP, STP, IGES, PDF, DXF, or SLDPRT. The print becomes
          a 2D or 3D CNC program on the{" "}
          <TextLink href="/equipment">Numalliance Robomac 214TF</TextLink>.
          Lubow manuals take the odd prototype leg the head does not want.
        </p>
        <p>
          3D print is for a fit check of a nest or a dunnage locator — plastic
          is not 4–14 mm steel. Production intent is coil:{" "}
          <TextLink href="/sizes">3/8, 7/16, 1/2 in</TextLink> in the{" "}
          <TextLink href="/processes/3d-cnc-wire-forming">3D CNC</TextLink>{" "}
          cell. Revisions are a program edit, not a tool recut.
        </p>
        <p>
          Fourslide NRE and wait are the other path. We do not cut that tool.
          Argument:{" "}
          <TextLink href="/processes/fourslide">fourslide vs 3D CNC</TextLink>.
        </p>
      </div>
      <Section title="What to send">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>Centerline or solid of the form — not a mesh screenshot</li>
          <li>Wire diameter, alloy, and finish</li>
          <li>Weld callouts if the form becomes a basket, cart, or rack</li>
          <li>Quantity: 100-piece minimum. Prototypes still start the program</li>
        </ul>
      </Section>
      <Section title="Related">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>
            <TextLink href="/models">3D STEP viewer</TextLink>
            {" —"} orbit shop models or drop a print
          </li>
          <li>
            <TextLink href="/guide/design-for-wire-forming">
              Design for wire forming
            </TextLink>
          </li>
          <li>
            <TextLink href="/products/carts-and-trolleys">
              Carts and trolleys
            </TextLink>
          </li>
          <li>
            <TextLink href="/products/dunnage-inserts">Dunnage inserts</TextLink>
          </li>
          <li>
            <TextLink href="/products/bread-racks">Bread racks</TextLink>
          </li>
          <li>
            <TextLink href="/quoting">Quotes, tooling, and coil</TextLink>
          </li>
        </ul>
      </Section>
      <StepQuoteBlock
        className="mt-16"
        title="Have a STEP and a first-article quantity?"
      />
    </Page>
  );
}
