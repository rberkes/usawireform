import Link from "next/link";
import { DocPage } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ButtonLink } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { QUOTE_PATH } from "@/lib/taxonomy";

export const metadata = pageMeta({
  title: "Quote a Wire Form — Upload CAD, Match Shops",
  description:
    "Upload a CAD or print. We check manufacturability against real cells, match shops that can run the diameter and process, and return a quote. Instant estimate for 4–14 mm on this floor.",
  path: QUOTE_PATH,
  keywords: [
    "wire forming quote",
    "CNC wire forming RFQ",
    "upload CAD wire form",
    "wire forming shops",
  ],
});

export default function QuoteHubPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Quote", url: QUOTE_PATH }]} />
      <DocPage
        kicker="RFQ"
        title="Upload the print. Match a cell. Quote."
        lede="Every commercial page on this site should end here: a CAD or a dimensioned print, a manufacturability check against real machines, then shops that can actually run it."
        toc={[
          { id: "path", label: "The path" },
          { id: "source", label: "Match shops" },
          { id: "floor", label: "This floor" },
          { id: "what", label: "What to send" },
        ]}
        breadcrumbs={[{ label: "Quote" }]}
      >
        <h2 id="path">How an RFQ works here</h2>
        <ol>
          <li>
            <strong>Upload CAD or a print.</strong> STEP, IGES, or a dimensioned
            PDF. The diameter, material, and bend count matter more than a
            rendered marketing image.
          </li>
          <li>
            <strong>Manufacturability.</strong> 2D vs 3D, min bend radius,
            diameter band, weld, and finish. A music-wire clip is not a 1/2 in
            frame. We say so instead of shopping it to the wrong floor.
          </li>
          <li>
            <strong>Match capable shops.</strong> Source matches filed cells —
            kind and diameter — not a blast to the whole directory.
          </li>
          <li>
            <strong>Quote.</strong> Shops that can run it see the print. You get
            the number from a floor, not from a content farm.
          </li>
        </ol>

        <h2 id="source">Match a print to a filed cell</h2>
        <p>
          Source is the marketplace door. You send one print. Shops that filed
          the matching cell can buy the introduction. The directory listing
          alone is not enough — a shop has to file the iron.
        </p>
        <p>
          <ButtonLink href="/source">Match a print on Source</ButtonLink>
        </p>
        <p>
          New to the directory?{" "}
          <Link href="/directory" className="text-copper hover:underline">
            Browse shops
          </Link>{" "}
          or{" "}
          <Link href="/find-factories-by-machine" className="text-copper hover:underline">
            find by machine
          </Link>
          .
        </p>

        <h2 id="floor">This floor — 4–14 mm in Northeast Ohio</h2>
        <p>
          USA Wire Form runs a Numalliance Robomac 214TF, 4–14 mm, 3D from coil.
          Instant ballpark when the print fits that cell. Production number from
          a STEP.
        </p>
        <p className="flex flex-wrap gap-3">
          <ButtonLink href="/instant-quote">Instant estimate</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Send a STEP
          </ButtonLink>
          <ButtonLink href="/production-quote" variant="ghost">
            Production quote
          </ButtonLink>
        </p>

        <h2 id="what">What to put on the print</h2>
        <ul>
          <li>Wire diameter and grade (1018, 304, 330 — not “steel”)</li>
          <li>2D or 3D, and the tightest inside radius</li>
          <li>Quantity and annual usage</li>
          <li>Weld, plate, or powder if the part leaves the bender</li>
          <li>A STEP when the path is spatial</li>
        </ul>
        <p>
          Design rules:{" "}
          <Link
            href="/guide/design-for-wire-forming"
            className="text-copper hover:underline"
          >
            design for wire forming
          </Link>
          .
        </p>
      </DocPage>
    </>
  );
}
