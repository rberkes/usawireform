import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MachineFactorySearch } from "@/components/MachineFactorySearch";
import { Kicker, Page, PageHero, TextLink } from "@/components/ui";
import { MACHINE_SEARCH_PATH } from "@/lib/machine-search";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Find Factories by Machine or Secondary",
  description:
    "Type a machine or a secondary — fourslide, Robomac, powder coating, TIG, zinc, resistance weld — and see 3–4 plants that named it. Public pages and Source filings. Not a floor walk.",
  path: MACHINE_SEARCH_PATH,
  keywords: [
    "find wire forming factory by machine",
    "wire forming powder coating shops",
    "wire forming TIG welding factories",
    "zinc plating wire form plants",
    "fourslide factories",
    "Robomac shops",
    "Bihler wire form plants",
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
        kicker="Machine and secondary search"
        title="Type a machine or a secondary. See the plants."
        lede="OEM, model, class — or powder coating, zinc, TIG, MIG, resistance weld, end forming, heat treat. Up to four factories that named that work. Public pages and Source filings. Not a floor walk."
      />

      <div className="mt-10">
        <MachineFactorySearch autofocus />
      </div>

      <div className="mt-12 max-w-2xl space-y-4 text-sm leading-7 text-muted">
        <p>
          A shop can have twenty cells and a finish line. The dropdown still
          shows plants. Fourslide, 3D CNC, and multi-slide are classes.
          Robomac, Baird, Nilson, Bihler, WAFIOS, AIM only hit shops that named
          that iron. Powder, e-coat, anodize, black oxide, nickel, zinc, TIG,
          MIG, resistance, laser and robotic weld, press brake, end thread, end
          forming, heat treat, coining, and cold heading only hit shops that
          named that secondary — not because they sell a hook that goes in a
          booth.
        </p>
        <p>
          Empty means nobody on this list named that machine or secondary. File
          a print on{" "}
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
          If you run the machine or the secondary,{" "}
          <Link href="/source/shops" className="text-copper hover:underline">
            file the cell
          </Link>
          {" "}
          and list secondaries from the dashboard. One row per OEM and model.
          We do not invent a floor list.
        </p>
      </section>
    </Page>
  );
}
