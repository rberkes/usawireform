import { HookBuilder } from "@/components/HookBuilder";
import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema, ServiceSchema } from "@/components/SeoSchemas";
import { PRICE_LINE } from "@/lib/price";
import {
  POWDER_HOOK_HUB,
  POWDER_HOOK_STYLES,
  type PowderHookStyle,
} from "@/lib/powder-coating-hooks";
import { WIRE } from "@/lib/range";

export function PowderCoatingStylePage({ style }: { style: PowderHookStyle }) {
  const faqs = style.faqs;
  const siblings = POWDER_HOOK_STYLES.filter((item) => item.id !== style.id);

  return (
    <>
      <ServiceSchema
        name={style.title}
        description={style.description}
        url={style.path}
        serviceType="Powder coating hooks"
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: POWDER_HOOK_HUB.title, url: POWDER_HOOK_HUB.path },
          { name: style.title, url: style.path },
        ]}
      />
      <DocPage
        kicker={style.kicker}
        title={style.h1}
        lede={`${PRICE_LINE} ${style.lede}`}
        breadcrumbs={[
          { label: "Powder coating hooks", href: POWDER_HOOK_HUB.path },
          { label: style.title },
        ]}
        toc={[
          { id: "hang", label: "How they hang" },
          ...(style.id === "v-hooks"
            ? [{ id: "builder", label: "Builder" }]
            : []),
          { id: "form", label: "How we form them" },
          { id: "jobs", label: "Typical jobs" },
          { id: "faq", label: "FAQ" },
          { id: "next", label: "Related" },
        ]}
      >
        <h2 id="hang">How they hang</h2>
        <p>{style.bestFor}</p>
        <p>{style.hang}</p>

        {style.id === "v-hooks" ? (
          <div className="not-prose my-10">
            <h2 id="builder">Custom V-hook builder</h2>
            <HookBuilder defaultType="v" defaultWire="3/8 in" />
          </div>
        ) : null}

        <h2 id="form">How we form them</h2>
        {style.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>
          Custom length, openings, and 90° rotation:{" "}
          <Link href="/custom-powder-coating-hooks">
            custom powder coating hooks
          </Link>
          . Stainless:{" "}
          <Link href="/stainless-steel-powder-coating-hooks">
            stainless steel powder coating hooks
          </Link>
          . Band: {WIRE.label}. You buy the coil.
        </p>

        <h2 id="jobs">Typical jobs</h2>
        <ul>
          {style.jobs.map((job) => (
            <li key={job}>{job}</li>
          ))}
        </ul>

        <h2 id="faq">FAQ</h2>
        {faqs.map((item) => (
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
          {style.id === "v-hooks" ? (
            <>
              <li>
                <Link href="/375-v-hooks">.375&quot; V-hooks</Link>
              </li>
              <li>
                <Link href="/custom-v-hooks">Custom V-hooks</Link>
              </li>
            </>
          ) : null}
          {siblings.map((item) => (
            <li key={item.id}>
              <Link href={item.path}>{item.title}</Link>
            </li>
          ))}
          <li>
            <Link href="/guide/s-hooks-vs-v-hooks-vs-c-hooks">
              S-hooks vs V-hooks vs C-hooks
            </Link>
          </li>
          <li>
            <Link href="/products/powder-coating-hooks">
              Product directory — powder-coating hooks
            </Link>
          </li>
          {style.id === "s-hooks" ? (
            <li>
              <Link href="/products/s-hooks">S-hooks catalog</Link>
            </li>
          ) : null}
        </ul>

        <QuoteBand title={`Have a ${style.title.toLowerCase()} print?`} />
      </DocPage>
    </>
  );
}
