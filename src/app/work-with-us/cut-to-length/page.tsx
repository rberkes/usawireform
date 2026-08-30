import Link from "next/link";
import {
  ClientCtaBand,
  ClientHero,
  ClientHowItWorks,
  ClientPage,
  ClientSection,
} from "@/components/client/ClientLanding";
import { TextLink } from "@/components/ui";
import {
  CLIENT_STEPS,
  CUT_TO_LENGTH_MM,
  CUT_TO_LENGTH_STOCK,
  cutToLengthNote,
} from "@/lib/client-landing";
import { COMPANY } from "@/lib/company";
import { PRICE_LINE } from "@/lib/price";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Cut-to-Length Straight Wire 4–14 mm",
  description: `${COMPANY} cut-to-length straight wire from coil, 4–14 mm in every diameter. Shear or saw, 100-piece minimum. Instant quote or send a production print.`,
  path: "/work-with-us/cut-to-length",
  keywords: [
    "cut to length wire",
    "straight wire 4mm to 14mm",
    "cut to length steel wire",
    "CNC cut to length wire",
  ],
});

const steps = [
  {
    title: "Send diameter and length",
    body: "A STEP is welcome. A length, diameter in mm, alloy, and quantity is enough for a straight blank.",
  },
  CLIENT_STEPS[1],
  {
    title: "Straighten and cut",
    body: `Decoil, straighten, cut-to-length through ${WIRE.short}. Shear is the default. Saw when the face is inspected.`,
  },
  CLIENT_STEPS[3],
];

export default function ClientCutToLengthPage() {
  return (
    <ClientPage>
      <ClientHero
        kicker="Cut-to-length"
        title="Straight wire, cut to length. 4 mm to 14 mm."
        lede={`Not every job is a nest of bends. Spacers, pins, rod blanks, and weld sticks — decoil, straighten, cut. Every diameter in ${WIRE.short}. ${PRICE_LINE}`}
      />

      <ClientSection
        kicker="Diameters"
        title="4 mm through 14 mm"
        lede="Pick the diameter on the print. Metric coil is quoted as drawn. Stock US fractions sit inside the same band."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CUT_TO_LENGTH_MM.map((mm) => (
            <Link
              key={mm}
              href="/production-quote"
              className="border border-line bg-background p-4 transition-colors hover:border-copper/50"
            >
              <p className="text-2xl tracking-tight">{mm} mm</p>
              <p className="mt-1 font-mono text-[11px] text-muted uppercase">
                {(mm / 25.4).toFixed(3)} in
              </p>
              <p className="mt-2 text-sm leading-5 text-muted">
                {cutToLengthNote(mm)}
              </p>
            </Link>
          ))}
        </div>

        <h3 className="mt-12 text-xl tracking-tight">Stock on the floor</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          These three US sizes run as production stock. Other diameters in the
          4–14 mm band are quoted; tooling and coil lead follow the print.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {CUT_TO_LENGTH_STOCK.map((size) => (
            <li key={size.fraction} className="border border-line bg-inset p-5">
              <p className="font-mono text-[11px] tracking-widest text-copper uppercase">
                Stock
              </p>
              <p className="mt-2 text-lg tracking-tight">{size.fraction}</p>
              <p className="text-sm text-muted">{size.mm}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{size.note}</p>
            </li>
          ))}
        </ul>
      </ClientSection>

      <ClientSection
        kicker="The blank"
        title="What you are buying"
        inset
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <article className="border border-line bg-background p-6">
            <h3 className="text-lg tracking-tight">Straight from coil</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Cut-to-length is the station that separates a finished length from
              the coil. No CNC bend required. You buy the coil and bring it;
              we straighten and cut.
            </p>
          </article>
          <article className="border border-line bg-background p-6">
            <h3 className="text-lg tracking-tight">Ends matter</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Square cut is the default. Shear leaves a small fingerprint. Saw
              is slower and cleaner. Chamfer, coin, flatten, and thread are{" "}
              <TextLink href="/processes/end-forming">end forming</TextLink>{" "}
              after the cut.
            </p>
          </article>
          <article className="border border-line bg-background p-6">
            <h3 className="text-lg tracking-tight">Length tolerance</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              ±1 mm on a 400 mm spacer is often invisible. ±1 mm on a pin that
              bottoms in a hole is a reject. Put the datum and the end on the
              drawing.
            </p>
          </article>
          <article className="border border-line bg-background p-6">
            <h3 className="text-lg tracking-tight">The lot</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              {PRICE_LINE} Instant quote: one cut, zero bends, overall length.
              Production quote: send the print when the end or alloy is not
              obvious.
            </p>
          </article>
        </div>
        <p className="mt-8 text-sm leading-6 text-muted">
          Process detail stays on{" "}
          <TextLink href="/processes/cut-to-length">
            cut-to-length
          </TextLink>
          . Stock fractions:{" "}
          <TextLink href="/sizes">3/8, 7/16, and 1/2 in</TextLink>.
        </p>
      </ClientSection>

      <ClientSection kicker="How to work with us" title="Straight blanks, same desk">
        <ClientHowItWorks steps={steps} />
      </ClientSection>

      <ClientCtaBand
        title="Quote a diameter and a length"
        lede="Get instant quote for a straight blank (1 cut, 0 bends). Start production quote when the end face or alloy needs a person."
      />
    </ClientPage>
  );
}
