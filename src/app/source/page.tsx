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
import { pageMeta } from "@/lib/seo";
import { listNewestSourceDirectoryCompanies } from "@/lib/source";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  title: "Find a wire form shop — Source",
  description:
    "Send the print. Our technology matches your job to the right shop, keeping costs low and reducing the time it takes to complete the job. An AI matching platform that matches your job to capability and capacity first, increasing efficiency and lowering costs.",
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
    title: "Pick the cell, then the wire size",
    body: "Spring, 2D CNC, 3D CNC, fourslide, or multi-slide. Then millimetres or inches. That is the match — not a company blurb.",
  },
  {
    n: "02",
    title: "We match filed machines",
    body: "An AI matching platform that matches your job to capability and capacity first, increasing efficiency and lowering costs.",
  },
  {
    n: "03",
    title: "Up to three introductions",
    body: "Shop emails stay with the desk until we make the intro. You talk to chairs that can run the work.",
  },
];

export default async function SourcePage() {
  const newest = await listNewestSourceDirectoryCompanies(6);

  return (
    <Page className="py-10 sm:py-20">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <PageHero
          large
          kicker="Find a shop"
          title="We send your print only to shops that can run it."
          lede="Pick the cell — spring, 2D CNC, 3D CNC, fourslide, or multi-slide — then the wire size. Our technology matches your job to the right shop, keeping costs low and reducing the time it takes to complete the job. An AI matching platform that matches your job to capability and capacity first, increasing efficiency and lowering costs."
        >
          <ButtonLink
            href="#job"
            variant="quote"
            className="w-full justify-center whitespace-nowrap sm:w-auto"
          >
            Send the print
          </ButtonLink>
        </PageHero>
        <div className="border border-line bg-inset p-5 sm:p-8">
          <Kicker>What you get</Kicker>
          <p className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
            Three shops whose machines fit the job.
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
          { value: "3", label: "Shops introduced" },
          { value: "Size", label: "Wire diameter first" },
          { value: "2D / 3D", label: "Bend type" },
          { value: "Desk", label: "Emails stay here" },
        ]}
      />

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
          Send the job. We match the shops.
        </h2>
        <div className="mt-8">
          <SourceJobForm />
        </div>
      </section>

      <Section kicker="Newest members" title="Shops already on Source.">
        <SourceNewestMembers shops={newest} />
      </Section>

      <section className="mt-16 border-t border-line pt-12 sm:mt-20">
        <p className="max-w-xl text-sm leading-6 text-muted">
          Run a shop?{" "}
          <TextLink href="/source/shops">Add one machine cell free</TextLink>.
        </p>
      </section>
    </Page>
  );
}
