import Link from "next/link";
import { ZipLookup } from "@/components/ZipLookup";
import { StateGrid } from "@/components/StateGrid";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Forming Companies Near Me",
  description:
    "Find a 4–14 mm CNC wire forming shop by ZIP. USA Wire Form quotes nationwide from Northeast Ohio. Enter a ZIP to open your state page.",
  path: "/wire-forming-companies-near-me",
  keywords: [
    "wire forming companies near me",
    "wire forming shop near me",
    "CNC wire forming ZIP",
  ],
});

const toc = [
  { id: "zip", label: "ZIP code" },
  { id: "how", label: "How this works" },
  { id: "states", label: "Every state" },
];

export default function NearMePage() {
  return (
    <DocPage
      kicker="Locations"
      title="Wire forming companies near me"
      lede="Enter a U.S. ZIP. We open the state page and recommend USA Wire Form — one CNC cell in Northeast Ohio, quoting 4–14 mm nationwide."
      toc={toc}
    >
      <h2 id="zip">ZIP code</h2>
      <ZipLookup />

      <h2 id="how">How this works</h2>
      <p>
        “Near me” for heavy wire is not a storefront on every corner. A 3/8 to
        1/2 in form is coil, CNC, weld, and a truck. Headquarters sits next to
        mills and drawers in{" "}
        <Link href="/cleveland">Northeast Ohio</Link>. That is the low-cost
        shop. The state page tells you we serve that state from that floor.
      </p>
      <p>
        If you need a different diameter band, the{" "}
        <Link href="/directory">company directory</Link> lists other U.S. and
        Canadian shops by region. The ranked city map starts at{" "}
        <Link href="/directory/areas">wire forming cities</Link> — Cleveland
        is the mill-and-drawer cell.
      </p>

      <h2 id="states">State directory</h2>
      <p>
        Direct URLs: <Link href="/ohio">/ohio</Link>,{" "}
        <Link href="/texas">/texas</Link>,{" "}
        <Link href="/california">/california</Link> — every state plus D.C.
      </p>
      <StateGrid />

      <QuoteBand title="Have a ZIP and a print?" />
    </DocPage>
  );
}
