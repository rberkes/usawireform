import type { Metadata } from "next";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Ventilation Wire Forming",
  description:
    "Ventilation and HVAC wire forming: fan and equipment guards with a 3/8 to 1/2 in frame. Light infill named, not a residential register.",
};

export default function VentilationPage() {
  return (
    <Page>
      <PageHero
        kicker="Industries"
        title="Ventilation"
        lede="Fan and HVAC guards in 4–14 mm. A heavy frame in stock coil. Light 9-gauge register wire is named, not quoted as production."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          Ventilation forms here are guards: a{" "}
          <TextLink href="/sizes">3/8, 7/16, or 1/2 in</TextLink> frame
          plus welded mesh when the pitch is on the print. Infill can sit
          under 4 mm — we will say so.{" "}
          <TextLink href="/materials">1018 zinc</TextLink> or powder; 304
          in wet air. Residential 9-gauge grille wire is a different cell.
        </p>
      </div>
      <Section title="What we form">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>
            Fan and blower{" "}
            <TextLink href="/products/fan-guards">fan guards</TextLink>{" "}
            with a stock-coil frame
          </li>
          <li>
            <TextLink href="/products/mesh-grids">Mesh grids</TextLink>{" "}
            and intake / discharge screens
          </li>
          <li>
            <TextLink href="/products/wire-frames">Frames</TextLink> and{" "}
            <TextLink href="/products/brackets">brackets</TextLink> for
            equipment covers
          </li>
          <li>
            <TextLink href="/products/j-hooks">J-hooks</TextLink> and{" "}
            <TextLink href="/products/cable-hangers">cable hangers</TextLink>{" "}
            on equipment
          </li>
        </ul>
      </Section>
      <StepQuoteBlock className="mt-16" title="Have a fan-guard print, a pitch, and a wire size?" />
    </Page>
  );
}
