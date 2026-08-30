import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Automotive Wire Forming",
  description: "Automotive wire forming in 3/8, 7/16, and 1/2 in: seat frames, USA made D-rings, trailer latches, handles, L hitch pins, plant guards — not music-wire clips.",
  path: '/industries/automotive',
  keywords: [
    "USA made D-rings",
    "automotive",
    "automotive wire forming",
    "4-14 mm wire",
    "CNC wire forms",
  ],
});

export default function AutomotivePage() {
  const breadcrumbItems = [
    { label: "Industries", href: "/industries" },
    { label: "Automotive" },
  ];

  return (
    <Page>
      <BreadcrumbJsonLd
        items={[
          { name: "Industries", url: "/industries" },
          { name: "Automotive", url: "/industries/automotive" },
        ]}
      />
      <Breadcrumbs items={breadcrumbItems} />
      <PageHero
        kicker="Industries"
        title="Automotive"
        lede="Heavy wire on the vehicle and in the plant. Seat frames, trailer latches, handles, L hitch pins, guards, and tie-down hardware in 3/8, 7/16, and 1/2 in — not a clip cell."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          Automotive here is 4–14 mm CNC and weld.{" "}
          <TextLink href="/products/wire-frames">Seat frames</TextLink>,
          headrest and lock rods, visor skeletons — 3D paths in{" "}
          <TextLink href="/sizes">3/8 to 1/2 in</TextLink>.{" "}
          <TextLink href="/materials">1018</TextLink> or the print's
          carbon; 304 when washdown or corrosion says so.{" "}
          <TextLink href="/processes/plating-and-coating">
            Zinc-nickel
          </TextLink>{" "}
          when salt spray is the spec, then in-line powder if the color
          is on the drawing.
        </p>
        <p>
          Retainer clips, snap rings, and music-wire forms under 4 mm are
          a different shop. We will say so instead of quoting them as
          production.
        </p>
      </div>
      <Section title="What we form">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>
            Seat, headrest, and lock-rod{" "}
            <TextLink href="/products/wire-frames">frames</TextLink>
          </li>
          <li>
            Plant{" "}
            <TextLink href="/products/machine-guards">machine guards</TextLink>{" "}
            and{" "}
            <TextLink href="/products/conveyor-guards">
              conveyor guards
            </TextLink>
          </li>
          <li>
            Fleet and aftermarket{" "}
            <TextLink href="/products/partition-grids">
              partition grids
            </TextLink>{" "}
            and screens
          </li>
          <li>
            <TextLink href="/products/d-rings">USA made D-rings</TextLink>,{" "}
            <TextLink href="/products/s-hooks">S-hooks</TextLink>, and{" "}
            <TextLink href="/products/connecting-links">
              connecting links
            </TextLink>{" "}
            for tie-down
          </li>
          <li>
            <TextLink href="/products/trailer-latches">
              Trailer latches
            </TextLink>
            ,{" "}
            <TextLink href="/products/handles">handles</TextLink>,{" "}
            <TextLink href="/l-hitch-pins">L hitch pins</TextLink>,{" "}
            <TextLink href="/products/pins-and-clips">
              hitch pins
            </TextLink>
            , and{" "}
            <TextLink href="/products/hitch-pin-clips">
              hitch pin clips
            </TextLink>
          </li>
          <li>
            <TextLink href="/products/brackets">Brackets</TextLink>
          </li>
        </ul>
      </Section>
      <StepQuoteBlock className="mt-16" title="Have an automotive frame or a guard print?" />
    </Page>
  );
}
