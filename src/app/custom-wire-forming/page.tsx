import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DirectoryCompanyGrid } from "@/components/DirectoryCompanyCards";
import { FAQSchema, ServiceSchema } from "@/components/SeoSchemas";
import { QuoteBand } from "@/components/DocPage";
import { Page, PageHero, Kicker } from "@/components/ui";
import { directoryCompanies } from "@/lib/directory";
import { machineLevelDirectoryShops } from "@/lib/directory-profile";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Custom Wire Forming Services",
  description:
    "Custom wire forming company matching: diameter 0.010–0.625 in+, 2D/3D CNC, fourslide, multislide. Upload a drawing and see U.S. manufacturers that can run the part.",
  path: "/custom-wire-forming",
  keywords: [
    "custom wire forming",
    "custom wire forming company",
    "custom wire forming services",
    "custom CNC wire forms",
    "USA made wire baskets",
    "custom wire baskets",
  ],
});

const specs = [
  {
    label: "Diameter",
    value: "0.010”–0.625”+ depending on supplier",
  },
  {
    label: "Processes",
    value: "2D CNC / 3D CNC / fourslide / multislide",
  },
  {
    label: "Materials",
    value: "carbon / stainless / spring / aluminum / copper / brass",
  },
  {
    label: "Secondary",
    value: "welding / threading / flattening / coating / heat treatment",
  },
] as const;

const faqs = [
  {
    question: "How do I get a custom wire forming quote?",
    answer:
      "Upload a STEP, SolidWorks file, or a PDF 3-view. Include diameter, alloy, and quantity. We match the print to cells that can form it — not a generic RFQ blast.",
  },
  {
    question: "What diameters can custom wire forming shops run?",
    answer:
      "Across U.S. suppliers the published band is about 0.010 in to 0.625 in and heavier. Confirm the machine, not the company brochure. This floor quotes 4–14 mm.",
  },
  {
    question: "Do I need a STEP file?",
    answer:
      "No. A dimensioned PDF 3-view is enough to start. We convert a print to STEP at no charge when the desk needs a solid to program.",
  },
];

export default function CustomWireFormingPage() {
  const shops = machineLevelDirectoryShops(directoryCompanies, 12);

  return (
    <>
      <ServiceSchema
        name="Custom Wire Forming Services"
        description="Match a custom wire form print to U.S. manufacturers by diameter, 2D/3D CNC, fourslide, material, and secondaries."
        url="/custom-wire-forming"
        serviceType="Custom wire forming"
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd
        items={[{ name: "Custom Wire Forming Services", url: "/custom-wire-forming" }]}
      />
      <Page>
        <Breadcrumbs items={[{ label: "Custom wire forming services" }]} />
        <PageHero
          kicker="Buy parts"
          title="Custom Wire Forming Services"
          lede="Someone searching “custom wire forming company” is trying to buy a part. Diameter, process, material, and secondaries first — then the drawing, then the shops that can run it."
        />

        <dl className="mt-10 grid gap-px bg-line sm:grid-cols-2">
          {specs.map((row) => (
            <div key={row.label} className="bg-background px-5 py-5">
              <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">
                {row.label}
              </dt>
              <dd className="mt-2 text-base leading-7">{row.value}</dd>
            </div>
          ))}
        </dl>

        <section id="upload" className="mt-14">
          <Kicker>Upload your drawing</Kicker>
          <h2 className="mt-3 text-2xl tracking-tight">
            STEP, SolidWorks, or a PDF 3-view
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Quantity, alloy, and diameter help the first pass. No STEP? We
            model one from the print. Matching is by machine class and wire
            band —{" "}
            <Link href="/source" className="text-copper hover:underline">
              Source
            </Link>{" "}
            — not by who bought the biggest ad.
          </p>
        </section>

        <QuoteBand title="Upload your drawing" />

        <section id="manufacturers" className="mt-16">
          <Kicker>Supplier network</Kicker>
          <h2 className="mt-3 text-2xl tracking-tight">
            Manufacturers capable of producing your part
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            These listings publish named iron, a diameter band, or buyer-fit —
            the facts an engineer uses. Full index:{" "}
            <Link href="/directory" className="text-copper hover:underline">
              wire forming companies directory
            </Link>
            . Filter by{" "}
            <Link
              href="/directory?iron=3d-cnc"
              className="text-copper hover:underline"
            >
              3D CNC
            </Link>
            ,{" "}
            <Link
              href="/directory?iron=fourslide"
              className="text-copper hover:underline"
            >
              fourslide
            </Link>
            , or{" "}
            <Link
              href="/find-factories-by-machine"
              className="text-copper hover:underline"
            >
              machine or secondary
            </Link>
            .
          </p>
          <div className="mt-8">
            <DirectoryCompanyGrid companies={shops} />
          </div>
        </section>

        <section className="mt-16 border-t border-line pt-12">
          <h2 className="text-2xl tracking-tight">Need the textbook?</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            Process, radius, springback, and machine classes live on{" "}
            <Link href="/wire-forming" className="text-copper hover:underline">
              the wire forming page
            </Link>
            . Design rules:{" "}
            <Link
              href="/guide/design-for-wire-forming"
              className="text-copper hover:underline"
            >
              design for wire forming
            </Link>
            . This page stays the buy path.
          </p>
        </section>
      </Page>
    </>
  );
}
