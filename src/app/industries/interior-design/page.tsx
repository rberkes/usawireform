import type { Metadata } from "next";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Interior Design Wire Forming",
  description:
    "Interior design wire forming in 3/8, 7/16, and 1/2 in: furniture frames, racks, and display wire — not a decorator catalog.",
};

export default function InteriorDesignPage() {
  return (
    <Page>
      <PageHero
        kicker="Industries"
        title="Interior design"
        lede="Furniture frames, racks, and display wire in stock coil. The furniture line and contract interiors — not a 9-gauge decorator catalog."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          Interior wire here is 3/8 in for most furniture and display, 7/16
          and 1/2 in when the span carries load.{" "}
          <TextLink href="/processes/plating-and-coating">
            In-line powder
          </TextLink>{" "}
          when the color is specified. Building screens and outdoor infill
          sit on{" "}
          <TextLink href="/industries/architectural">Architectural</TextLink>
          . We form the frame. We do not sell a room package.
        </p>
      </div>
      <Section title="What we form">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>
            <TextLink href="/products/wire-furniture">Wire furniture</TextLink>
            {" "}
            frames, chairs, and tables
          </li>
          <li>
            <TextLink href="/products/wire-racks">Racks</TextLink>,{" "}
            <TextLink href="/products/wire-shelves">shelves</TextLink>, and{" "}
            <TextLink href="/products/display-hooks">display hooks</TextLink>
          </li>
          <li>
            <TextLink href="/products/handles">Handles</TextLink> and{" "}
            <TextLink href="/products/wire-frames">frames</TextLink>
          </li>
          <li>
            <TextLink href="/products/wire-carts">Carts</TextLink> and{" "}
            <TextLink href="/products/heavy-duty-wire-baskets">
              wire baskets
            </TextLink>
          </li>
        </ul>
      </Section>
      <StepQuoteBlock className="mt-16" title="Have a furniture frame or a rack print?" />
    </Page>
  );
}
