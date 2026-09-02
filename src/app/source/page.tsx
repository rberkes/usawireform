import {
  ButtonLink,
  Kicker,
  Page,
  PageHero,
  Section,
  StatRow,
  TextLink,
} from "@/components/ui";
import { SourceJobForm } from "@/components/SourceJobForm";
import { SourceNewestMembers } from "@/components/SourceNewestMembers";
import { SourcePathCompare } from "@/components/SourcePathCompare";
import { pageMeta } from "@/lib/seo";
import { getBuyerAccount, buyerMayUploadExtras, clerkEmailIsConfirmed } from "@/lib/source-buyer";
import { listNewestSourceDirectoryCompanies } from "@/lib/source";
import { sourceBuyerSignUpHref } from "@/lib/source-plans";
import { auth, currentUser } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  title: "Find a wire form shop — Source",
  description:
    "Send a STEP. Quotes come from shops whose equipment can manufacture it — machine, year, capacity, and stocked wire sizes first.",
  path: "/source",
  keywords: [
    "find wire forming shop",
    "wire forming RFQ",
    "CNC wire form shops",
    "source wire forming jobs",
  ],
});

const STEPS = [
  {
    n: "01",
    title: "Upload a STEP",
    body: "STEP, SolidWorks, or a PDF 3-view. No STEP? We model one free. Wire size and cell type tell us which iron can run it.",
  },
  {
    n: "02",
    title: "We match the equipment that can form it",
    body: "Machine band, stocked sizes, and this week's plant fullness first. Shops at 0% full (need work) rank higher among cells that already fit. 100% full means no capacity.",
  },
  {
    n: "03",
    title: "Quotes from shops that can run it",
    body: "Up to 10 shops whose machines fit the job see the print. The STEP is never attached to email.",
  },
];

export default async function SourcePage() {
  const newest = await listNewestSourceDirectoryCompanies(6);
  const { userId } = await auth();
  const [buyer, user] = userId
    ? await Promise.all([getBuyerAccount(userId), currentUser()])
    : [null, null];
  const defaults = buyer
    ? {
        company: buyer.company,
        name: buyer.name,
        email: buyer.email,
        phone: buyer.phone,
      }
    : user
      ? {
          email: user.primaryEmailAddress?.emailAddress ?? "",
          name: user.fullName ?? "",
        }
      : undefined;
  const allowExtras = buyerMayUploadExtras(buyer, {
    emailConfirmed: clerkEmailIsConfirmed(user),
  });

  return (
    <Page className="py-10 sm:py-20">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <PageHero
          large
          kicker="Find a shop"
          title="We send your print only to shops that can run it."
          lede="Upload a STEP. We match machine, year, capacity, and stocked wire sizes — quotes from equipment that can manufacture the part. No STEP? A 3-view PDF is enough; we model one free."
        >
          <ButtonLink
            href="#job"
            variant="quote"
            className="w-full justify-center whitespace-nowrap sm:w-auto"
          >
            Send the print
          </ButtonLink>
          <ButtonLink
            href={sourceBuyerSignUpHref()}
            variant="ghost"
            className="w-full justify-center whitespace-nowrap sm:w-auto"
          >
            Buyer account
          </ButtonLink>
        </PageHero>
        <div className="border border-line bg-inset p-5 sm:p-8">
          <Kicker>What you get</Kicker>
          <p className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
            Up to 10 shops whose machines fit the job.
          </p>
          <p className="mt-4 text-sm leading-6 text-muted">
            Instant estimate on this site is still this floor — 4–14 mm on the
            Robomac. Source is other US shops.
          </p>
        </div>
      </div>

      <StatRow
        className="mt-14 sm:mt-16"
        items={[
          { value: "10", label: "Shops can quote a job" },
          { value: "Size", label: "Wire diameter first" },
          { value: "2D / 3D", label: "Bend type" },
          { value: "Free", label: "For buyers" },
        ]}
      />

      <SourcePathCompare />

      <Section kicker="How it works" title="The job finds the machine.">
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

      <section
        id="job"
        className="mt-16 scroll-mt-24 border-t border-line pt-12 sm:mt-20"
      >
        <Kicker>The print</Kicker>
        <h2 className="mt-3 max-w-2xl text-2xl tracking-tight sm:text-3xl">
          Upload a STEP. We match the shops.
        </h2>
        <div className="mt-8">
          <SourceJobForm defaults={defaults} allowExtras={allowExtras} />
        </div>
      </section>

      <Section kicker="Newest members" title="Shops already on Source.">
        <SourceNewestMembers shops={newest} />
      </Section>

      <section className="mt-16 border-t border-line pt-12 sm:mt-20">
        <p className="max-w-xl text-sm leading-6 text-muted">
          Run a shop?{" "}
          <TextLink href="/source/equipment">
            File machine, year, capacity, and stocked sizes
          </TextLink>
          . Listing a cell is free.
        </p>
      </section>
    </Page>
  );
}
