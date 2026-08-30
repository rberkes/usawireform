import { FactGrid, Page, PageHero, Section, TextLink } from "@/components/ui";
import { COMPANY, SITE_PITCH } from "@/lib/company";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About",
  description: `${SITE_PITCH} Headquarters and 4–14 mm production in Northeast Ohio.`,
  path: '/about',
  keywords: [
    "USA Wire Form about",
    "wire forming resource",
    "wire forming directory",
    "Northeast Ohio headquarters",
    "wire forming company",
    "American wire forming",
  ],
});

export default function AboutPage() {
  return (
    <Page>
      <PageHero
        kicker="About"
        title="The resource for wire forming."
        lede={SITE_PITCH}
      />

      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          {COMPANY} is the map and a shop. The library is how a print is
          designed. The machine catalog is the iron the trade runs. The
          directory is factories in the United States and Canada. Coil pages
          and mill links are who draws the steel. Production of customer
          parts is still this floor: 4–14 mm CNC, weld, and finish in
          Northeast Ohio.
        </p>
        <p>
          The cell runs {WIRE.label}, stock diameters{" "}
          <TextLink href="/sizes">3/8, 7/16, and 1/2 in</TextLink>, then
          the secondaries that make a form install: straighten, cut, end
          work, resistance weld, MIG, TIG, rack plating, and in-line
          powder. We have 50+ years of industry experience. The trade is
          older than CNC.
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

      <Section title="Library, catalog, and this floor">
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          <TextLink href="/guide/design-for-wire-forming">Design guide</TextLink>
          ,{" "}
          <TextLink href="/processes">process pages</TextLink>, and the{" "}
          <TextLink href="/blog">blog</TextLink> are learning.{" "}
          <TextLink href="/equipment/cnc-manufacturers">
            CNC machines
          </TextLink>{" "}
          and the{" "}
          <TextLink href="/directory">factory directory</TextLink> are the
          trade.{" "}
          <TextLink href="/materials">Coil grades</TextLink> and mill links
          are steel supply.{" "}
          <TextLink href="/capabilities">Capabilities</TextLink> and{" "}
          <TextLink href="/equipment">equipment</TextLink> are what this
          cell runs — Robomac, Lubow, Clearing, welders, granite. If a
          diameter or a process is outside the band, the page will still
          describe it, and the quote will say so.
        </p>
      </Section>

      <FactGrid
        items={[
          { label: "The site", value: "Resource for the U.S. and beyond" },
          { label: "Location", value: "Northeast Ohio — mills and wire drawers" },
          { label: "Band", value: WIRE.label },
          { label: "Stock", value: "3/8, 7/16, and 1/2 in coil" },
        ]}
      />
    </Page>
  );
}
