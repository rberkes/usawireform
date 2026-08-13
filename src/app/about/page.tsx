import { FactGrid, Page, PageHero, Section, TextLink } from "@/components/ui";
import { COMPANY } from "@/lib/company";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About",
  description: "50+ years of industry experience: 4–14 mm wire forms for named industries — not a list of every SIC code.",
  path: '/about',
  keywords: [
    "USA Wire Form about",
    "50 years wire forming",
    "Northeast Ohio headquarters",
  ],
});

export default function AboutPage() {
  return (
    <Page>
      <PageHero
        kicker="About"
        title="50+ years of metal forming."
        lede={`${COMPANY}. Wire forms are what this site is for: 4–14 mm CNC, weld, and finish — contract work and a line we sell ourselves.`}
      />

      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          We have 50+ years of industry experience. The trade is
          older than CNC. The cell on the floor now is 2D and 3D wire
          forming in {WIRE.label}, stock diameters{" "}
          <TextLink href="/sizes">3/8, 7/16, and 1/2 in</TextLink>, then
          the secondaries that make a form install: straighten, cut, end
          work, resistance weld, MIG, TIG, rack plating, and in-line
          powder.
        </p>
        <p>
          Our corp headquarters is in Northeast Ohio because the steel is. Mills and wire
          drawers sit on the same map, so 4–14 mm coil is a short haul
          and forming plus weld, plate, and powder stay in one building.
          That is the cost of a heavy form — detail on{" "}
          <TextLink href="/cleveland">Northeast Ohio</TextLink>.
        </p>
        <p>
          Contract work goes into plants, fields, and facilities. The
          sectors we actually run each have a directory under{" "}
          <TextLink href="/industries">industries</TextLink>. We do not
          advertise “all industries.” We name the ones we form for.
        </p>
        <p>
          Alongside customer prints we run our own{" "}
          <TextLink href="/products/outdoor-products">
            outdoor products
          </TextLink>{" "}
          and{" "}
          <TextLink href="/products/wire-furniture">wire furniture</TextLink>
          . Contract work is the{" "}
          <TextLink href="/products">
            3/8, 7/16, and 1/2 in directory
          </TextLink>
          — hooks, hangers, grids, trays, frames — same coil, same
          welders, same band.
        </p>
        <p>
          The process pages name diameter,{" "}
          <TextLink href="/materials">grade</TextLink>, and weld so a
          buyer can tell 1018 from 330, and 3/8 from a music-wire clip.
          Light spring cells and fourslide stay on the map. Production
          quotes start at 4 mm and stop at 14 mm.
        </p>
      </div>

      <Section title="Library and headquarters">
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          Process pages in the{" "}
          <TextLink href="/processes">index</TextLink> are reference.{" "}
          <TextLink href="/capabilities">Capabilities</TextLink> is what
          we run.{" "}
          <TextLink href="/equipment">Equipment</TextLink> is the floor
          list — Robomac, Lubow, Clearing, welders, granite. If a
          diameter or a process is outside the band, the page will still
          describe it, and the quote will say so.
        </p>
      </Section>

      <FactGrid
        items={[
          { label: "Headquarters", value: "50+ years of industry experience" },
          { label: "Location", value: "Northeast Ohio — mills and wire drawers" },
          { label: "Band", value: WIRE.label },
          { label: "Stock", value: "3/8, 7/16, and 1/2 in coil" },
        ]}
      />
    </Page>
  );
}
