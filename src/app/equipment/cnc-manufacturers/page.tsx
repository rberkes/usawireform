import Link from "next/link";
import { MachineLeadForm } from "@/components/MachineLeadForm";
import { LinkList, Page, PageHero, Section } from "@/components/ui";
import { CNC_HUB, CNC_OEMS, oemPath } from "@/lib/cnc-oems";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Top 10 CNC Wire Forming Machine Manufacturers",
  description:
    "Ten CNC wire-form OEMs and 60 catalog models: Numalliance, WAFIOS, AIM, Itaya, Bihler, BLM, Simplex Rapid, Pave, Fortuna, Whitelegg. Dealer leads from each page.",
  path: CNC_HUB,
  keywords: [
    "CNC wire forming machines",
    "Numalliance",
    "WAFIOS",
    "AIM wire bender",
    "3D CNC wire forming machine",
  ],
});

export default function CncManufacturersHub() {
  return (
    <Page>
      <PageHero
        kicker="Machine directory"
        title="Ten CNC wire-form OEMs, sixty models."
        lede="Catalog pages for dealers and shops buying iron. USA Wire Form runs a Numalliance Robomac 214TF in 4–14 mm. We do not sell these machines. Each model page takes a dealer / OEM lead."
      />
      <Section title="Manufacturers">
        <LinkList
          className="mt-5"
          items={CNC_OEMS.map((oem) => ({
            href: oemPath(oem),
            title: oem.name,
            note: oem.country,
            body: oem.summary,
          }))}
        />
      </Section>
      <Section title="What we run">
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Production forming is the{" "}
          <Link href="/equipment" className="text-copper hover:underline">
            floor list
          </Link>
          . Numalliance family pages with photos:{" "}
          <Link href="/equipment/machines" className="text-copper hover:underline">
            /equipment/machines
          </Link>
          .
        </p>
      </Section>
      <div className="mt-16">
        <MachineLeadForm oem="unspecified" model="catalog-hub" path={CNC_HUB} />
      </div>
    </Page>
  );
}
