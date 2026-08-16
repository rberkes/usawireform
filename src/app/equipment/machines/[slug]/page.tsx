import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { MachineVideoSection } from "@/components/MachineVideoSection";
import { MachineProductSchema } from "@/components/SeoSchemas";
import { StepQuoteBlock } from "@/components/StepUpload";
import { ButtonLink, Page, PageHero, Section, Kicker, SpecList } from "@/components/ui";
import { machines, getMachine, formatMachinePrice } from "@/lib/machines";
import { getVideosForMachine } from "@/lib/machine-videos";
import { pageMeta } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return machines.map((machine) => ({ slug: machine.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const machine = getMachine(slug);
  if (!machine) return {};

  return pageMeta({
    title: `${machine.name} CNC Wire Bending Machine`,
    description: `${machine.name}: ${machine.tagline}. Wire capacity ${machine.wireDiameterMetric}. Industrial ${machine.category === "3d" ? "3D" : "2D"} CNC wire forming from NumAlliance.`,
    path: `/equipment/machines/${slug}`,
    keywords: [
      machine.name,
      `${machine.name} wire bending`,
      "NumAlliance",
      "CNC wire forming",
      `${machine.category === "3d" ? "3D" : "2D"} wire bending machine`,
      ...machine.applications.slice(0, 3),
    ],
  });
}

export default async function MachinePage({ params }: Props) {
  const { slug } = await params;
  const machine = getMachine(slug);
  if (!machine) notFound();

  const videos = getVideosForMachine(slug);
  const otherMachines = machines
    .filter((m) => m.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <MachineProductSchema
        name={`${machine.name} CNC Wire Bending Machine`}
        description={machine.description}
        path={`/equipment/machines/${slug}`}
        imagePath={`/images/machines/${slug}.png`}
        mpn={machine.shortName}
        category={machine.category}
        priceUsd={machine.priceUsd}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Equipment", url: "/equipment" },
          { name: "Machines", url: "/equipment/machines" },
          { name: machine.name, url: `/equipment/machines/${slug}` },
        ]}
      />
      <Page>
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted">
            <li>
              <Link href="/equipment" className="hover:text-copper">
                Equipment
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/equipment/machines" className="hover:text-copper">
                Machines
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground">{machine.name}</li>
          </ol>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <PageHero
              kicker={machine.category === "3d" ? "3D CNC Wire Bending" : "2D CNC Wire Bending"}
              title={machine.name}
              lede={machine.tagline}
            />
            <p className="mt-8 text-sm leading-7 text-muted">
              {machine.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Request a machine quote</ButtonLink>
              <ButtonLink href="/instant-quote" variant="ghost">
                Quote a wire form
              </ButtonLink>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <div>
                <p className="font-mono text-2xl text-copper">
                  {formatMachinePrice(machine.priceUsd)}
                </p>
                <p className="text-xs text-muted">Starting price</p>
              </div>
              <div className="h-10 w-px bg-line" />
              <div>
                <p className="font-mono text-2xl text-copper">
                  {machine.wireDiameter}
                </p>
                <p className="text-xs text-muted">Wire Diameter</p>
              </div>
              <div className="h-10 w-px bg-line" />
              <div>
                <p className="font-mono text-2xl text-copper">
                  {machine.wireDiameterMetric}
                </p>
                <p className="text-xs text-muted">Metric</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-xs leading-5 text-muted">
              Base machine in USD. Heads, options, tooling, and installation
              are quoted.
            </p>
          </div>
          <div className="relative aspect-[4/3] bg-inset overflow-hidden">
            <Image
              src={`/images/machines/${machine.slug}.png`}
              alt={`${machine.name} CNC wire bending machine - industrial wire forming equipment`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <Section title="Specifications">
          <SpecList
            rows={[
              {
                label: "Price",
                value: `${formatMachinePrice(machine.priceUsd)} starting`,
              },
              ...machine.specs,
            ]}
          />
        </Section>

        <Section title="Key Features">
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {machine.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-sm leading-6"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-copper" />
                {feature}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Applications">
          <p className="mt-3 text-sm leading-7 text-muted">
            The {machine.name} is engineered for demanding production
            environments across multiple industries:
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {machine.applications.map((app) => (
              <li
                key={app}
                className="border border-line px-4 py-3 text-sm"
              >
                {app}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Videos">
          <p className="mt-3 mb-6 text-sm leading-7 text-muted">
            Watch the {machine.name} in action. These demonstrations showcase
            the machine&apos;s capabilities in real production environments.
          </p>
          <MachineVideoSection videos={videos} machineName={machine.name} />
        </Section>

        <section className="mt-20 border-t border-line pt-12">
          <Kicker>Related Machines</Kicker>
          <h2 className="mt-3 text-2xl tracking-tight">
            Explore other wire forming solutions
          </h2>
          <div className="mt-8 grid gap-px bg-line sm:grid-cols-3">
            {otherMachines.map((m) => (
              <Link
                key={m.slug}
                href={`/equipment/machines/${m.slug}`}
                className="group bg-background p-6 hover:bg-inset"
              >
                <h3 className="font-medium group-hover:text-copper transition-colors">
                  {m.name}
                </h3>
                <p className="mt-1 font-mono text-[11px] tracking-widest text-muted uppercase">
                  {m.wireDiameterMetric}
                </p>
                <p className="mt-3 text-sm text-muted line-clamp-2">
                  {m.tagline}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <StepQuoteBlock
          className="mt-16"
          title="Have a wire form for this machine?"
        />
      </Page>
    </>
  );
}
