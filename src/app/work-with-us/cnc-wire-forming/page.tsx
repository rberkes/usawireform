import {
  ClientCtaBand,
  ClientHero,
  ClientHowItWorks,
  ClientPage,
  ClientSection,
} from "@/components/client/ClientLanding";
import { TextLink } from "@/components/ui";
import { CLIENT_STEPS } from "@/lib/client-landing";
import { COMPANY } from "@/lib/company";
import { PRICE_LINE } from "@/lib/price";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "CNC Wire Forming for Buyers",
  description: `${COMPANY} CNC wire forming for purchasing and engineering: ${WIRE.short} from coil, 2D and 3D, 100-piece minimum. Instant quote or send a STEP.`,
  path: "/work-with-us/cnc-wire-forming",
  keywords: [
    "CNC wire forming quote",
    "buy CNC wire forms",
    "4-14 mm CNC wire forming",
    "production CNC wire forming",
  ],
});

const points = [
  {
    title: "The cell",
    body: "Numalliance Robomac 214TF. 2D and 3D programs from coil. Not a fourslide cam. Not a catalog that we pull from a bin.",
  },
  {
    title: "The band",
    body: `${WIRE.label}. Stock 3/8, 7/16, and 1/2 in. Other sizes in the band need tooling. Below 4 mm or above 14 mm, the quote is no.`,
  },
  {
    title: "The lot",
    body: `${PRICE_LINE} 5% off at 1,000. 10% off at 10,000. Instant numbers are a ballpark until the desk opens the STEP.`,
  },
  {
    title: "The finish",
    body: "Straighten, cut, end work, resistance weld, MIG, TIG, rack plate, and in-line powder when the print needs it — same building.",
  },
];

export default function ClientCncWireFormingPage() {
  return (
    <ClientPage>
      <ClientHero
        kicker="CNC wire forming"
        title="Quality wire forms. Instant or production quote."
        lede={`Upload a CAD file for a ballpark, or start a production quote and a person reviews the print. ${WIRE.short} from Northeast Ohio. ${PRICE_LINE}`}
      />

      <ClientSection
        kicker="For purchasing"
        title="What you are buying"
        lede="This page is the buyer brief. Process detail and the design guide stay on the resource side of the site."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {points.map((item) => (
            <article key={item.title} className="border border-line p-6">
              <h3 className="text-lg tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm leading-6 text-muted">
          Full service write-up:{" "}
          <TextLink href="/custom-cnc-wire-forming-services">
            custom CNC wire forming services
          </TextLink>
          . Design rules:{" "}
          <TextLink href="/guide/design-for-wire-forming">
            design for wire forming
          </TextLink>
          .
        </p>
      </ClientSection>

      <ClientSection kicker="How to work with us" title="Same four steps" inset>
        <ClientHowItWorks steps={[...CLIENT_STEPS]} />
      </ClientSection>

      <ClientCtaBand
        title="Get a number on the print"
        lede="Get instant quote for cuts, bends, and inches. Start production quote when you have a STEP."
      />
    </ClientPage>
  );
}
