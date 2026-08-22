import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MachineFactorySearch } from "@/components/MachineFactorySearch";
import { Kicker, Page, PageHero, TextLink } from "@/components/ui";
import { MACHINE_SEARCH_PATH } from "@/lib/machine-search";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Find Factories by Machine",
  description:
    "Type a machine — fourslide, Robomac, Baird, Bihler, WAFIOS — and see 3–4 plants that have that iron. Index is machines, not shops. Public pages and Source filings. Not a floor walk.",
  path: MACHINE_SEARCH_PATH,
  keywords: [
    "find wire forming factory by machine",
    "fourslide factories",
    "Robomac shops",
    "Bihler wire form plants",
    "Baird fourslide",
    "WAFIOS spring CNC shops",
  ],
});

export default function FindFactoriesByMachinePage() {
  return (
    <Page>
      <BreadcrumbJsonLd
        items={[{ name: "Find factories by machine", url: MACHINE_SEARCH_PATH }]}
      />
      <Breadcrumbs items={[{ label: "Find factories by machine" }]} />

      <PageHero
        kicker="Machine search"
        title="Type a machine. See the plants."
        lede="The index is machines — OEM, model, class. As you type, up to four factories with a hit drop in. Public pages and cells shops filed. Not a floor walk."
      />

      <div className="mt-10">
        <MachineFactorySearch autofocus />
      </div>

      <div className="mt-12 max-w-2xl space-y-4 text-sm leading-7 text-muted">
        <p>
          A shop can have twenty cells. The dropdown still shows plants, not a
          wall of serial numbers. Fourslide, 3D CNC, and multi-slide are
          classes. Robomac, Baird, Nilson, Bihler, WAFIOS, AIM only hit shops
          that named that iron.
        </p>
        <p>
          Empty means nobody on this list named that machine. File a print on{" "}
          <TextLink href="/source">Source</TextLink> for a matched intro, or
          browse{" "}
          <TextLink href="/wire-form-factories-in-usa">
            wire form factories in the USA
          </TextLink>
          .
        </p>
        <p>
          This floor runs a Numalliance Robomac 214TF in 4–14 mm. Instant
          estimate stays that cell. OEM catalog:{" "}
          <TextLink href="/equipment/cnc-manufacturers">
            CNC manufacturers
          </TextLink>
          .
        </p>
      </div>

      <section className="mt-16 border-t border-line pt-12">
        <Kicker>Shops</Kicker>
        <h2 className="mt-3 text-2xl tracking-tight">
          File each cell. That is how the index grows.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          If you run the machine,{" "}
          <Link href="/source/shops" className="text-copper hover:underline">
            file the cell
          </Link>
          . One row per OEM and model. We do not invent a floor list.
        </p>
      </section>
    </Page>
  );
}
