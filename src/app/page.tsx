import Link from "next/link";
import { ClientHero } from "@/components/client/ClientLanding";
import { HomePrintHero } from "@/components/HomePrintHero";
import { HOME_BUYER_STEPS, HOME_HERO_LEDE } from "@/lib/client-landing";
import { SOURCE_EQUIPMENT_HREF } from "@/components/client/ClientQuoteCtas";
import { Page } from "@/components/ui";
import { BrandLockup } from "@/components/WireMark";
import { COMPANY } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: `Wire Form Suppliers, Manufacturers & CNC Wire Forming | ${COMPANY}`,
  description: `${COMPANY}: Upload a STEP or 3-view. We check diameter, 2D vs 3D, and material against real cells — this Ohio floor when it fits, or shops that filed the matching iron.`,
  path: "/",
  absoluteTitle: true,
  image: {
    url: "/shop/robomac-214tf.jpg",
    width: 1536,
    height: 1024,
    alt: "Numalliance Robomac 214TF 3D CNC wire forming machine",
  },
  keywords: [
    "wire form suppliers",
    "wire form manufacturers",
    "CNC wire forming",
    "USA Wire Form",
    "upload STEP file",
    "3 view drawing wire form",
    "free STEP conversion",
    "Numalliance Robomac",
  ],
});

export default async function Home() {
  return (
    <>
      <ClientHero
        kicker="Upload a print"
        title={<BrandLockup size="hero" tone="onDark" />}
        lede={HOME_HERO_LEDE}
        cta={false}
        aside={<HomePrintHero />}
      />
      <Page className="py-12 sm:py-16">
        <ol className="grid gap-6 sm:grid-cols-3">
          {HOME_BUYER_STEPS.map((step, index) => (
            <li key={step.title}>
              <p className="font-mono text-[11px] tracking-[0.22em] text-copper uppercase">
                0{index + 1}
              </p>
              <h2 className="mt-2 text-lg tracking-tight">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <p
          id="login"
          className="mt-12 scroll-mt-24 max-w-2xl text-sm leading-6 text-muted"
        >
          <Link href="/directory" className="text-copper hover:underline">
            Browse shops
          </Link>
          {" · "}
          <Link href="/instant-quote" className="text-copper hover:underline">
            This-floor estimate
          </Link>
          {" · "}
          <Link href={SOURCE_EQUIPMENT_HREF} className="text-copper hover:underline">
            File a cell free
          </Link>
          {" · "}
          <Link href="/sign-in" className="text-copper hover:underline">
            Log in
          </Link>
        </p>
      </Page>
    </>
  );
}
