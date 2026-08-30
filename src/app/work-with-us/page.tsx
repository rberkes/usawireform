import {
  ClientCtaBand,
  ClientHero,
  ClientHowItWorks,
  ClientPage,
  ClientSection,
  ClientServiceCards,
} from "@/components/client/ClientLanding";
import { COMPANY, SITE_PITCH } from "@/lib/company";
import { CLIENT_SERVICES, CLIENT_STEPS } from "@/lib/client-landing";
import { PRICE_LINE } from "@/lib/price";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";
import { industries } from "@/lib/site";
import Link from "next/link";

export const metadata = pageMeta({
  title: "Work with USA Wire Form",
  description: `CNC wire forming from first print to production. Instant quote or send a STEP. ${WIRE.short}. ${PRICE_LINE}`,
  path: "/work-with-us",
  keywords: [
    "work with USA Wire Form",
    "CNC wire forming quote",
    "production wire forming",
    "instant wire form quote",
  ],
});

export default function WorkWithUsPage() {
  return (
    <ClientPage>
      <ClientHero
        kicker={`${COMPANY} · Client`}
        title="CNC wire forming from first print to production"
        lede={`${SITE_PITCH} Get an online estimate in minutes, or send a STEP and talk with the production desk. ${WIRE.short} from Northeast Ohio.`}
      />

      <ClientSection
        kicker="Services"
        title="What this floor runs"
        lede="One cell. Form, weld, and finish. The rest of the site is the map of the trade — these pages are how a buyer starts a job."
      >
        <ClientServiceCards items={[...CLIENT_SERVICES]} />
      </ClientSection>

      <ClientSection
        kicker="How to work with us"
        title="Four steps. Print in, form out."
        inset
      >
        <ClientHowItWorks steps={[...CLIENT_STEPS]} />
      </ClientSection>

      <ClientSection
        kicker="Industries"
        title="Sectors we actually form for"
        lede="We do not advertise every industry. These are the ones on the shop cards."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industries.slice(0, 9).map((item) => (
            <li key={item.slug}>
              <Link
                href={`/industries/${item.slug}`}
                className="block border border-line px-5 py-4 text-sm hover:border-copper/50"
              >
                <span className="font-medium text-foreground">{item.title}</span>
                <span className="mt-1 block text-muted">{item.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </ClientSection>

      <ClientCtaBand
        title="Ready to quote the print?"
        lede="Instant quote is a ballpark. Production quote is the STEP. Both go to the same Northeast Ohio desk."
      />
    </ClientPage>
  );
}
