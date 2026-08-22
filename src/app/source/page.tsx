import Link from "next/link";
import {
  ButtonLink,
  Kicker,
  Page,
  PageHero,
  Panel,
  Section,
  StatRow,
  TextLink,
} from "@/components/ui";
import { SourceShopFinder } from "@/components/SourceShopFinder";
import { directoryCompanies } from "@/lib/directory";
import { pageMeta } from "@/lib/seo";
import { sourceClaimable } from "@/lib/source-directory";
import { SOURCE_PLAN_LINE } from "@/lib/source-plans";
import { listNewestSourceDirectoryCompanies } from "@/lib/source";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  title: "Source — list your machines, get the jobs that fit",
  description:
    "We send the job only to shops that can run it. US shops list CNC machines — wire size, 2D or 3D, make, city. One cell free. Claim your listing or file a cell.",
  path: "/source",
  keywords: [
    "wire forming capacity",
    "CNC equipment list",
    "wire forming RFQ",
    "source wire forming jobs",
  ],
});

const STEPS = [
  {
    n: "01",
    title: "Claim the listing or file one cell",
    body: "US shops already in the directory keep that URL. New shops file one CNC cell and publish a page.",
  },
  {
    n: "02",
    title: "Name the machine on the floor",
    body: "Wire size, 2D or 3D, make, and city. That row is how a print finds you. Not a paragraph that says you form wire.",
  },
  {
    n: "03",
    title: "Jobs that fit those machines come to you",
    body: "A buyer sends a print. We introduce up to three shops whose cells can run it. Emails stay with the desk.",
  },
];

export default async function SourcePage() {
  const newest = await listNewestSourceDirectoryCompanies(6);
  const usaShops = directoryCompanies
    .filter((shop) => sourceClaimable(shop))
    .map((shop) => ({
      name: shop.name,
      slug: shop.slug,
      location: shop.location,
    }));

  return (
    <Page className="py-10 sm:py-20">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <PageHero
          large
          kicker="Source"
          title="We send the job only to shops that can run it."
          lede="A shop lists the CNC machines on the floor — wire size, 2D or 3D, make, and city. When a buyer has a print, we send it to shops that already filed a machine that fits. Not every shop that says they form wire."
        >
          <ButtonLink
            href="#claim"
            variant="quote"
            className="w-full justify-center whitespace-nowrap sm:w-auto"
          >
            Claim your listing
          </ButtonLink>
          <ButtonLink
            href="/source/equipment"
            variant="ghost"
            className="w-full justify-center whitespace-nowrap sm:w-auto"
          >
            File a cell
          </ButtonLink>
        </PageHero>
        <Panel className="p-5 sm:p-8">
          <Kicker>For shops</Kicker>
          <p className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
            List your machines. Jobs that fit those machines come to you.
          </p>
          <p className="mt-4 text-sm leading-6 text-muted">
            One cell free. No card. US shops only. Canada stays in the
            directory. Europe later, on its own platform.
          </p>
          <p className="mt-6 text-sm leading-6 text-muted">
            Already filed?{" "}
            <TextLink href="/sign-in">Log in</TextLink>
            . Plans: {SOURCE_PLAN_LINE}
          </p>
        </Panel>
      </div>

      <StatRow
        className="mt-14 sm:mt-16"
        items={[
          { value: "1 cell", label: "Free to start" },
          { value: String(usaShops.length), label: "US listings to claim" },
          { value: "3 shops", label: "Max intros on a job" },
          { value: "USA", label: "Source floor for now" },
        ]}
      />

      <section
        id="claim"
        className="mt-16 scroll-mt-24 border-t border-line pt-12 sm:mt-20"
      >
        <Kicker>Claim</Kicker>
        <h2 className="mt-3 max-w-2xl text-2xl tracking-tight sm:text-3xl">
          Find the directory page. Claim it. File the cells on that URL.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
          Type the shop name. Claim keeps{" "}
          <span className="text-foreground">/directory/[your-shop]</span>. One
          shop per account.
        </p>
        <div className="mt-8 max-w-xl">
          <SourceShopFinder shops={usaShops} />
        </div>
        <p className="mt-6 max-w-xl text-sm leading-6 text-muted">
          Not in the directory?{" "}
          <TextLink href="/source/equipment">File a cell</TextLink>
          . Confirm the account from the receipt, then the dashboard.
        </p>
      </section>

      <Section kicker="How it works" title="Three steps. Then the jobs that fit.">
        <ol className="mt-10 grid gap-px bg-line sm:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n} className="bg-background px-5 py-8 sm:px-6">
              <p className="font-mono text-[12px] tracking-[0.22em] text-copper">
                {step.n}
              </p>
              <h3 className="mt-4 text-lg font-medium tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section kicker="Newest members" title="Shops that already filed.">
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
          <TextLink href="/directory/new">See all newest Source shops</TextLink>
          .
        </p>
        {newest.length === 0 ? (
          <p className="mt-6 text-sm leading-6 text-muted">
            Nobody has published a listing yet.
          </p>
        ) : (
          <ul className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {newest.map((shop) => (
              <li key={shop.slug} className="bg-background px-5 py-6">
                {shop.logoUrl ? (
                  <img
                    src={shop.logoUrl}
                    alt=""
                    className="mb-4 h-10 w-auto max-w-[8rem] object-contain"
                  />
                ) : null}
                <Link
                  href={`/directory/${shop.slug}`}
                  className="font-medium hover:text-copper"
                >
                  {shop.name}
                </Link>
                <p className="mt-1 text-sm text-muted">{shop.location}</p>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <section className="mt-16 border-t border-line pt-12 sm:mt-20">
        <p className="max-w-xl text-sm leading-6 text-muted">
          Buy formed wire?{" "}
          <TextLink href="/source/job">Send the job</TextLink>
          . Instant estimate on this site is still this cell — 4–14 mm on the
          Robomac. Source is other floors.
        </p>
      </section>
    </Page>
  );
}
