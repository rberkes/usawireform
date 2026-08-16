import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Page, PageHero, Section, Kicker } from "@/components/ui";
import { machines, getMachinesByCategory } from "@/lib/machines";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "NumAlliance Wire Forming Machines",
  description:
    "CNC wire bending machines from NumAlliance: Robomac TF, e-Motion, TFE, FTX, and more. 3D and 2D wire forming equipment for industrial production.",
  path: "/equipment/machines",
  keywords: [
    "NumAlliance wire bending machines",
    "Robomac TF",
    "Robomac e-Motion",
    "FTX wire bender",
    "CNC wire forming equipment",
    "3D wire bending machine",
    "industrial wire forming",
  ],
});

function MachineCard({ machine }: { machine: (typeof machines)[number] }) {
  return (
    <Link
      href={`/equipment/machines/${machine.slug}`}
      className="group block bg-background"
    >
      <div className="relative aspect-[4/3] bg-inset overflow-hidden">
        <Image
          src={`/images/machines/${machine.slug}.png`}
          alt={`${machine.name} CNC wire bending machine`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute bottom-3 left-3 bg-background/90 px-2 py-1 font-mono text-[11px] tracking-widest text-copper uppercase">
          {machine.category === "3d" ? "3D CNC" : "2D CNC"}
        </span>
      </div>
      <div className="px-5 py-5">
        <h3 className="text-lg font-medium tracking-tight group-hover:text-copper transition-colors">
          {machine.name}
        </h3>
        <p className="mt-1 font-mono text-[11px] tracking-widest text-muted uppercase">
          {machine.wireDiameterMetric}
        </p>
        <p className="mt-3 text-sm leading-6 text-muted">{machine.tagline}</p>
      </div>
    </Link>
  );
}

export default function MachinesPage() {
  const machines3d = getMachinesByCategory("3d");
  const machines2d = getMachinesByCategory("2d");

  const breadcrumbItems = [
    { label: "Equipment", href: "/equipment" },
    { label: "Machines" },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Equipment", url: "/equipment" },
          { name: "Machines", url: "/equipment/machines" },
        ]}
      />
      <Page>
        <PageHero
          kicker="Equipment"
          title="NumAlliance CNC Wire Forming Machines"
          lede="Industrial wire bending platforms engineered for precision, speed, and repeatability. From compact electric cells to heavy-gauge 3D formers, each machine is built to run production—not prototypes."
        />

        <Section title="3D CNC Wire Bending">
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Three-dimensional forming from coil with bending heads that move
            freely around the wire. These machines handle complex geometries,
            multiple bend planes, and integrated secondary operations.
          </p>
          <div className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {machines3d.map((machine) => (
              <MachineCard key={machine.slug} machine={machine} />
            ))}
          </div>
        </Section>

        <Section title="2D CNC Wire Bending">
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            In-plane forming optimized for frames, brackets, and flat wire
            shapes. High-speed production with optional integrated welding for
            closed-loop geometries.
          </p>
          <div className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {machines2d.map((machine) => (
              <MachineCard key={machine.slug} machine={machine} />
            ))}
          </div>
        </Section>

        <section className="mt-20 border-t border-line pt-12">
          <Kicker>Why NumAlliance</Kicker>
          <h2 className="mt-3 text-2xl tracking-tight">
            Industrial wire forming since 1870
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="font-medium">Full Electric Technology</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Pioneers in electric CNC wire bending. Faster cycles, lower
                energy consumption, and reduced maintenance compared to
                hydraulic systems.
              </p>
            </div>
            <div>
              <h3 className="font-medium">Proven Reliability</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Over 150 years of expertise across 9 legacy brands. Machines
                built for continuous production with minimal downtime.
              </p>
            </div>
            <div>
              <h3 className="font-medium">Global Support</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Remote diagnostics, internet-connected assistance, and
                auto-corrective feedback from 3D measuring systems keep
                production running.
              </p>
            </div>
          </div>
        </section>
      </Page>
    </>
  );
}
