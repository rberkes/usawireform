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
import { SourceNewestMembers } from "@/components/SourceNewestMembers";
import { SourceShopFinder } from "@/components/SourceShopFinder";
import { directoryCompanies } from "@/lib/directory";
import { pageMeta } from "@/lib/seo";
import { sourceClaimable } from "@/lib/source-directory";
import { listNewestSourceDirectoryCompanies } from "@/lib/source";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  title: "Wire form shops — add a machine cell free",
  description:
    "Wire form shops: add a machine cell free. File how the plant operates free — min, setup, stock, lead. List CNC machines — wire size, 2D or 3D, make, city. Jobs that fit those machines come to you. Claim your listing or file a cell.",
  path: "/source/shops",
  keywords: [
    "wire forming capacity",
    "CNC equipment list",
    "add CNC cell",
    "source wire forming shops",
  ],
});

const STEPS = [
  {
    n: "01",
    title: "Claim the listing — as a plant",
    body: "US shops keep that URL. Three checks: numbered plant street, a public floor page, and you attest this is not a sales or sourcing office.",
  },
  {
    n: "02",
    title: "Name the machine. File how you operate.",
    body: "Wire size, 2D or 3D, make, and city. Then min order, setup, stock, and lead — free on the listing so a buyer can see how the plant runs.",
  },
  {
    n: "03",
    title: "Jobs that fit those machines come to you",
    body: "A buyer sends a print. We introduce up to three shops whose cells can run it. Emails stay with the desk.",
  },
];

export default async function SourceShopsPage() {
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
          kicker="Wire form shops"
          title="Add a machine cell free."
          lede="List the CNC machines on the floor — wire size, 2D or 3D, make, and city. Our technology matches your job to the right shop, keeping costs low and reducing the time it takes to complete the job. An AI matching platform that matches your job to capability and capacity first, increasing efficiency and lowering costs."
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
          <Kicker>Offer</Kicker>
          <p className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
            Jobs that fit those machines come to you.
          </p>
          <p className="mt-4 text-sm leading-6 text-muted">
            No card for the first cell. Min order, setup, stock, and lead are
            free on the listing so a buyer can see how the plant operates.
            Four cells $30/mo. Ten $49/mo. Twenty $99/mo.
          </p>
          <p className="mt-6 text-sm leading-6 text-muted">
            Already filed? <TextLink href="/sign-in">Log in</TextLink>.
          </p>
        </Panel>
      </div>

      <StatRow
        className="mt-14 sm:mt-16"
        items={[
          { value: "Free", label: "One cell + how the plant operates" },
          { value: String(usaShops.length), label: "US listings to claim" },
          { value: "3 shops", label: "Max intros on a job" },
          { value: "US", label: "Shops on Source" },
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
        <SourceNewestMembers shops={newest} />
      </Section>

      <section className="mt-16 border-t border-line pt-12 sm:mt-20">
        <p className="max-w-xl text-sm leading-6 text-muted">
          Looking for a shop? <TextLink href="/source">Send the print</TextLink>.
        </p>
      </section>
    </Page>
  );
}
