import Image from "next/image";
import Link from "next/link";
import { Section } from "./ui";

const shots = [
  {
    src: "/shop/capability-01.jpg",
    title: "3D CNC forming",
    href: "/processes/3d-cnc-wire-forming",
    body: "Numalliance Robomac 214TF, 4–14 mm from coil.",
    alt: "Numalliance Robomac 214TF on the shop floor",
  },
  {
    src: "/shop/capability-02.jpg",
    title: "Wire baskets",
    href: "/products/heavy-duty-wire-baskets",
    body: "Form, weld, and finish in one shop.",
  },
  {
    src: "/shop/capability-03.jpg",
    title: "Guards",
    href: "/products/machine-guards",
    body: "Heavy frames that bolt on.",
  },
  {
    src: "/shop/capability-04.jpg",
    title: "3D bends",
    href: "/processes/wire-form-shapes",
    body: "Hooks, routing forms, closed frames.",
  },
] as const;

export function CapabilityStrip() {
  return (
    <Section kicker="On the floor" title="What the machines run.">
      <ul className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {shots.map((shot) => (
          <li key={shot.href} className="bg-background">
            <Link href={shot.href} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-inset">
                <Image
                  src={shot.src}
                  alt={"alt" in shot ? shot.alt : shot.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="px-4 py-4">
                <p className="font-medium group-hover:text-copper">{shot.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted">{shot.body}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
