import Link from "next/link";
import { HookBuilder } from "@/components/HookBuilder";
import { HookFigure } from "@/components/VHookFigure";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema, ServiceSchema } from "@/components/SeoSchemas";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page, PageHero } from "@/components/ui";
import { PRICE_LINE } from "@/lib/price";
import { POWDER_HOOK_HUB } from "@/lib/powder-coating-hooks";
import type { VHookLander } from "@/lib/v-hook-landers";
import { V_HOOK_LANDERS } from "@/lib/v-hook-landers";

export function VHookLanderPage({ lander }: { lander: VHookLander }) {
  const others = V_HOOK_LANDERS.filter((item) => item.path !== lander.path);
  const hookType = lander.builder?.type ?? "v";

  return (
    <>
      <ServiceSchema
        name={lander.title}
        description={lander.description}
        url={lander.path}
        serviceType="Powder coating V-hooks"
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
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <PageHero
            kicker={lander.kicker}
            title={lander.h1}
            lede={`${PRICE_LINE} ${lander.lede}`}
          />
          <HookFigure type={hookType} label="V-hook" />
        </div>
        {lander.builder ? (
          <div className="mt-12">
            <HookBuilder
              defaultType={lander.builder.type}
              defaultWire={lander.builder.wire}
              defaultMaterial={lander.builder.material}
            />
          </div>
        ) : null}
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
              <Link href="/powder-coating-hooks/v-hooks">V-hooks</Link>
            </li>
            {others.slice(0, 6).map((item) => (
              <li key={item.path}>
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
            <li>
              <Link href="/custom-powder-coating-hooks">
                Custom powder coating hooks
              </Link>
            </li>
          </ul>
        </div>
      </Page>
    </>
  );
}
