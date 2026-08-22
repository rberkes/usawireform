import Link from "next/link";
import { HeavyDutyVHookCalculator } from "@/components/HeavyDutyVHookCalculator";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema, ServiceSchema } from "@/components/SeoSchemas";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page, PageHero } from "@/components/ui";
import { COMPANY } from "@/lib/company";
import { STOCK } from "@/lib/catalog";
import { PRICE_LINE } from "@/lib/price";
import { POWDER_HOOK_HUB } from "@/lib/powder-coating-hooks";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";
import { vHookLander } from "@/lib/v-hook-landers";

const lander = vHookLander("/heavy-duty-v-hooks");

export const metadata = pageMeta({
  title: lander.title,
  description: lander.description,
  path: lander.path,
  keywords: lander.keywords,
});

export default function HeavyDutyVHooksPage() {
  return (
    <>
      <ServiceSchema
        name={lander.title}
        description={lander.description}
        url={lander.path}
        serviceType="USA made heavy-duty powder coat V-hooks"
      />
      <FAQSchema questions={lander.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: POWDER_HOOK_HUB.title, url: POWDER_HOOK_HUB.path },
          { name: lander.title, url: lander.path },
        ]}
      />
      <Page>
        <Breadcrumbs
          items={[
            { label: "Powder coating hooks", href: POWDER_HOOK_HUB.path },
            { label: lander.title },
          ]}
        />
        <PageHero
          kicker={lander.kicker}
          title={lander.h1}
          lede={`${PRICE_LINE} ${lander.lede}`}
        />
        <div className="mt-12">
          <HeavyDutyVHookCalculator />
        </div>
        <div className="article mt-14 max-w-2xl">
          {lander.sections.map((section) => (
            <div key={section.id}>
              <h2 id={section.id}>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}
          <h2 id="faq">FAQ</h2>
          {lander.faqs.map((item) => (
            <div key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
          <h2 id="next">Related</h2>
          <ul>
            <li>
              <Link href={POWDER_HOOK_HUB.path}>{POWDER_HOOK_HUB.title}</Link>
            </li>
            <li>
              <Link href="/powder-coating-v-hooks">Powder coating V-hooks</Link>
            </li>
            <li>
              <Link href="/375-v-hooks">.375&quot; V-hooks</Link>
            </li>
            <li>
              <Link href="/custom-v-hooks">Custom V-hooks</Link>
            </li>
            <li>
              <Link href="/custom-powder-coating-hooks">
                Custom powder coating hooks
              </Link>
            </li>
          </ul>
          <p>
            {COMPANY} forms these in Northeast Ohio. {WIRE.short}. Stock{" "}
            {STOCK}. We buy the steel — it is in the price.
          </p>
        </div>
      </Page>
    </>
  );
}
