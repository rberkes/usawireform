import Image from "next/image";
import Link from "next/link";
import { HomePrintHero } from "@/components/HomePrintHero";
import { SOURCE_EQUIPMENT_HREF } from "@/components/client/ClientQuoteCtas";
import { Container } from "@/components/ui";
import { HOME_HERO_LEDE } from "@/lib/client-landing";

const FACTS = ["4–14 mm", "3D CNC from coil", "Northeast Ohio", "U.S. shops"] as const;

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[#0b1f33] text-white">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/shop/robomac-214tf.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1f33] via-[#0b1f33]/92 to-[#0b1f33]/55" />
      </div>

      <Container className="relative py-14 sm:py-20 lg:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,28rem)] lg:gap-16">
          <div className="max-w-xl">
            <p className="font-mono text-[12px] tracking-[0.22em] text-white/55 uppercase">
              Wire forming
            </p>
            <h1 className="mt-4 text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Upload a print.
              <span className="mt-2 block text-white/80">
                We’ll match a cell that can form it.
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/75">{HOME_HERO_LEDE}</p>
            <p className="mt-8 font-mono text-[11px] tracking-wide text-white/50 uppercase">
              {FACTS.join("  ·  ")}
            </p>
          </div>
          <HomePrintHero />
        </div>

        <p
          id="login"
          className="mt-12 scroll-mt-24 max-w-2xl text-sm leading-6 text-white/50"
        >
          <Link href="/directory" className="text-white/75 hover:text-white hover:underline">
            Browse shops
          </Link>
          {" · "}
          <Link
            href="/instant-quote"
            className="text-white/75 hover:text-white hover:underline"
          >
            This-floor estimate
          </Link>
          {" · "}
          <Link
            href={SOURCE_EQUIPMENT_HREF}
            className="text-white/75 hover:text-white hover:underline"
          >
            File a cell free
          </Link>
          {" · "}
          <Link href="/sign-in" className="text-white/75 hover:text-white hover:underline">
            Log in
          </Link>
        </p>
      </Container>
    </section>
  );
}
