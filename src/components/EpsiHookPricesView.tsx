import Link from "next/link";
import { EpsiHookPriceTable } from "@/components/EpsiHookPriceTable";
import { PowderHookBranchNav } from "@/components/PowderHookBranchNav";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema } from "@/components/SeoSchemas";
import { EPSI_HOOK_LINE, EPSI_HOOK_REFUSE } from "@/lib/epsi-hook-prices";
import { POWDER_HOOK_HUB } from "@/lib/powder-coating-hooks";
import { WIRE } from "@/lib/range";

const PATH = "/powder-coating-hooks/listed-bags";

const faqs = [
  {
    question: "Which boxes do you list?",
    answer: `Round-wire V, C, S, CV, and 90° V in 0.180 in and 0.250 in — the published diameters in ${WIRE.short}. Same lengths, hang, and box counts. 5% under those boxes.`,
  },
  {
    question: "Why is 0.120 in missing?",
    answer:
      "0.120 in is 3.05 mm. This cell starts at 4 mm. 0.060 and 0.080 in are the same story. We do not list them.",
  },
  {
    question: "Do you make diamond, C-LAW, or spring-tube hooks?",
    answer:
      "No. Diamond is square wire. C-LAW is a 3-prong clamp (the light sizes are also under 4 mm). Spring-tube is a wound 1–3 mm tube. Locking-V bags at 0.044–0.080 in, swivels with bearings, and wheel kits are not this cell.",
  },
  {
    question: "Are these catalog part numbers?",
    answer: "No. USAWF part numbers. 100-piece minimum.",
  },
];

export function EpsiHookPricesView() {
  return (
    <>
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: POWDER_HOOK_HUB.title, url: POWDER_HOOK_HUB.path },
          { name: "0.180 / 0.250 in prices", url: PATH },
        ]}
      />
      <DocPage
        kicker="Hooks"
        title="0.180 and 0.250 in hook prices"
        lede={`${EPSI_HOOK_LINE} Northeast Ohio.`}
        breadcrumbs={[
          { label: "Powder coating hooks", href: POWDER_HOOK_HUB.path },
          { label: "0.180 / 0.250 in prices" },
        ]}
        toc={[
          { id: "list", label: "Price list" },
          { id: "refuse", label: "What we do not form" },
          { id: "faq", label: "FAQ" },
        ]}
      >
        <h2 id="list">0.180 in and 0.250 in round wire</h2>
        <p>
          This floor is {WIRE.label}. The cards below are the published V, C, S,
          CV, and 90° V boxes that sit in band. Five percent under those
          published box prices. Carbon. Steel in the lot on V and 90° V.{" "}
          <Link href="/powder-coating-hooks/hc-series-c-hooks">HC C-hooks</Link>
          ,{" "}
          <Link href="/powder-coating-hooks/hs-series-s-hooks">HS S-hooks</Link>
          ,{" "}
          <Link href="/powder-coating-hooks/hv-series-v-hooks">HV V-hooks</Link>
          ,{" "}
          <Link href="/powder-coating-hooks/hcv-series-cv-hooks">
            HCV CV-hooks
          </Link>
          ,{" "}
          <Link href="/powder-coating-hooks/hv90-series-90-degree-v-hooks">
            HV90 90° V
          </Link>
          . Other 4–10 mm V/S/C length steps stay on{" "}
          <Link href="/powder-coating-hooks/prices">
            the 4–10 mm price list
          </Link>
          .
        </p>
        <div className="not-prose my-8">
          <EpsiHookPriceTable />
        </div>

        <h2 id="refuse">What we do not form from those catalogs</h2>
        <p>
          Those products are real. They are not a Robomac 214TF round-wire job
          in 4–14 mm. We do not list a fake bag for them.
        </p>
        <ul>
          {EPSI_HOOK_REFUSE.map((item) => (
            <li key={item.name}>
              <strong>{item.name}.</strong> {item.why}
            </li>
          ))}
        </ul>
        <p>
          Round-wire locking V, Super V, Z-path, jam, snap, and J in 4–14 mm
          from a print:{" "}
          <Link href="/powder-coating-hooks/specialty-hooks">
            specialty finishing hooks
          </Link>
          .
        </p>

        <h2 id="faq">FAQ</h2>
        {faqs.map((item) => (
          <div key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}

        <PowderHookBranchNav slug={["listed-bags"]} />
        <QuoteBand title="Need a length that is not on the card?" />
      </DocPage>
    </>
  );
}
