import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Agriculture Wire Forming",
  description: "USA made ground staples, USA made wire stakes, USA made wire baskets, and galvanized 3/8 to 1/2 in frames for agriculture.",
  path: '/industries/agriculture',
  keywords: [
    "USA made ground staples",
    "USA made ground samples",
    "USA made wire stakes",
    "USA made wire baskets",
    "USA made D-rings",
    "agriculture",
    "agriculture wire forming",
    "4-14 mm wire",
    "CNC wire forms",
  ],
});

export default function AgriculturePage() {
  return (
    <Page>
      <PageHero
        kicker="Industries"
        title="Agriculture"
        lede="USA made ground staples, USA made wire stakes, USA made wire baskets, and galvanized frames in 4–14 mm — not indoor clip wire."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          Agriculture is outdoor service plus impact. Coil is usually{" "}
          <TextLink href="/materials">1010 / 1018</TextLink> with zinc
          after weld, or 304 when the washdown or the chemical says so.
          Stock diameters{" "}
          <TextLink href="/sizes">3/8, 7/16, and 1/2 in</TextLink> cover
          most staples, rims, and guards we run.
        </p>
      </div>
      <Section title="What we form">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>
            <TextLink href="/products/ground-staples">USA made ground staples</TextLink>
            {" "}
            (also searched as USA made ground samples) for fabric, erosion,
            irrigation lines, and fencing underlay
          </li>
          <li>
            Equipment guards,{" "}
            <TextLink href="/products/handles">handles</TextLink>,{" "}
            <TextLink href="/l-hitch-pins">L hitch pins</TextLink>,{" "}
            <TextLink href="/products/pins-and-clips">
              implement pins
            </TextLink>
            , and{" "}
            <TextLink href="/products/hog-rings">hog rings</TextLink>
          </li>
          <li>
            <TextLink href="/products/s-hooks">S-hooks</TextLink>,{" "}
            <TextLink href="/products/d-rings">USA made D-rings</TextLink>, and
            cage / dairy hardware in 4–14 mm
          </li>
          <li>
            <TextLink href="/products/heavy-duty-wire-baskets">
              USA made wire baskets
            </TextLink>
            {" "}
            for harvest and parts
          </li>
          <li>
            <TextLink href="/products/trellis-systems">
              USA made wire stakes
            </TextLink>{" "}
            and trellis / vertical-garden structures in 3/8 to 1/2 in
          </li>
          <li>
            <TextLink href="/products/security-mesh-fencing">
              USA made security fencing
            </TextLink>{" "}
            and cage panels
          </li>
          <li>Galvanized frames, racks, and simple welded grids</li>
        </ul>
      </Section>
      <StepQuoteBlock className="mt-16" title="Have an ag print or a staple spec?" />
    </Page>
  );
}
