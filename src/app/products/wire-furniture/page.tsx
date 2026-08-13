import { StepQuoteBlock } from "@/components/StepUpload";
import { Page, PageHero, Section, TextLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Furniture",
  description: "Wire furniture we form and weld: chairs, tables, racks, and frames in 3/8, 7/16, and 1/2 in — 1018, powder, or 300-series stainless.",
  path: '/products/wire-furniture',
  keywords: [
    "wire furniture",
    "wire chairs",
    "wire tables",
  ],
});

export default function WireFurniturePage() {
  return (
    <Page>
      <PageHero
        kicker="Products"
        title="Wire furniture"
        lede="Seating, tables, racks, and frames made from the same 4–14 mm coil as our industrial forms. Bent, welded, and finished so it stands as furniture — not a disguised wire basket."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          Wire furniture is a 2D or 3D centerline plus a lot of
          intersections. Legs, backs, and shelves are formed on{" "}
          <TextLink href="/processes/2d-cnc-wire-forming">2D CNC</TextLink>{" "}
          and{" "}
          <TextLink href="/processes/3d-cnc-wire-forming">3D CNC</TextLink>
          . Grids and panels are{" "}
          <TextLink href="/processes/resistance-welding">
            resistance welded
          </TextLink>
          . Corners, mounts, and mixed diameters take{" "}
          <TextLink href="/processes/mig-tig-assembly">MIG or TIG</TextLink>.
        </p>
        <p>
          Stock wire is{" "}
          <TextLink href="/sizes">3/8, 7/16, and 1/2 in</TextLink>.{" "}
          <TextLink href="/materials">1018</TextLink> with powder or zinc
          for indoor and covered outdoor.{" "}
          <TextLink href="/materials/300-series-stainless">
            304 / 316
          </TextLink>{" "}
          when the piece lives in weather or a washdown room. Inside
          radius still follows the{" "}
          <TextLink href="/guide/design-for-wire-forming">
            design guide
          </TextLink>{" "}
          — a sharp CAD corner at 1/2 in is a crack in a chair leg.
        </p>
      </div>
      <Section title="What we make">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>Chairs, stools, and bench frames</li>
          <li>Tables, tops frames, and nesting stands</li>
          <li>Shelves, racks, and display furniture</li>
          <li>
            Outdoor pieces that share coil with our{" "}
            <TextLink href="/products/outdoor-products">
              outdoor line
            </TextLink>
          </li>
        </ul>
      </Section>
      <p className="mt-10 max-w-2xl text-sm leading-6 text-muted">
        Contract furniture from your print, or pieces from our line.
        Send a STEP, a photo of a sample to reverse, or a finish spec.
        Light decorative wire under 4 mm is a different cell — we will
        say so.
      </p>
      <StepQuoteBlock className="mt-16" title="Have a furniture frame or a finish spec?" />
    </Page>
  );
}
