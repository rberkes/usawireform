import { Fragment, type ReactNode } from "react";
import { COMPANY, SITE_HOST } from "@/lib/company";
import { cx } from "@/lib/cx";
import { Kicker } from "./ui";
import { WireMark } from "./WireMark";

const PILLARS = [
  {
    title: "No broker markup",
    body: "You pay the shop for parts. We do not mark up the piece price.",
    icon: PriceSlashIcon,
  },
  {
    title: "Direct communication",
    body: "You talk to the plant that filed the cell — not a broker in the middle.",
    icon: SpeechIcon,
  },
  {
    title: "U.S. plants, not desks",
    body: "Matching is to shops that named the iron. Not a sourcing office.",
    icon: ShieldIcon,
  },
] as const;

export function SourcePathCompare({ className }: { className?: string }) {
  return (
    <section className={cx("mt-16 sm:mt-20", className)}>
      <Kicker>What this is</Kicker>
      <h2 className="mt-3 max-w-3xl text-3xl font-medium tracking-tight sm:text-4xl">
        Fewer steps.{" "}
        <span className="text-copper">Better price.</span>
      </h2>
      <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
        Connect directly with U.S. wire form manufacturers. The print goes to
        chairs that can run it — not a broker who marks it up.
      </p>

      <div className="relative mt-10 grid gap-4 lg:grid-cols-2">
        <PathCard
          kicker="The traditional way"
          tone="bad"
          verdict="Extra layer = extra cost"
          nodes={[
            { kind: "person", label: "Buyer" },
            { kind: "middleman", label: "Middleman" },
            { kind: "plant", label: "Manufacturer" },
          ]}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-[42%] z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-background font-mono text-[11px] tracking-widest text-foreground lg:flex"
          aria-hidden
        >
          VS
        </div>
        <PathCard
          kicker="The better way"
          tone="good"
          verdict="Direct path = faster and lower cost"
          nodes={[
            { kind: "person", label: "Buyer" },
            { kind: "brand", label: COMPANY },
            { kind: "plant", label: "Manufacturer" },
          ]}
        />
      </div>

      <ul className="mt-4 grid gap-px bg-line sm:grid-cols-3">
        {PILLARS.map((pillar) => (
          <li key={pillar.title} className="bg-background px-5 py-8 sm:px-6">
            <pillar.icon />
            <h3 className="mt-4 text-lg font-medium tracking-tight">
              {pillar.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">{pillar.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PathCard({
  kicker,
  tone,
  verdict,
  nodes,
}: {
  kicker: string;
  tone: "bad" | "good";
  verdict: string;
  nodes: { kind: NodeKind; label: string }[];
}) {
  return (
    <figure className="flex flex-col border border-line bg-inset p-5 sm:p-6">
      <figcaption className="font-mono text-[11px] tracking-widest text-muted uppercase">
        {kicker}
      </figcaption>
      <ol className="mt-6 flex flex-1 items-start justify-between gap-1">
        {nodes.map((node, i) => (
          <Fragment key={`${node.kind}-${i}`}>
            {i > 0 ? (
              <li className="mt-5 shrink-0" aria-hidden>
                <FlowArrow />
              </li>
            ) : null}
            <li className="min-w-0 flex-1">
              <PathNode kind={node.kind} label={node.label} />
            </li>
          </Fragment>
        ))}
      </ol>
      <p
        className={cx(
          "mt-6 flex items-center gap-2 border-t border-line pt-4 text-sm font-medium",
          tone === "good" ? "text-copper" : "text-muted",
        )}
      >
        {tone === "good" ? <CheckMark /> : <XMark />}
        {verdict}
      </p>
    </figure>
  );
}

type NodeKind = "person" | "middleman" | "plant" | "brand";

function PathNode({ kind, label }: { kind: NodeKind; label: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={cx(
          "flex items-center justify-center border bg-background",
          kind === "brand"
            ? "h-16 w-full max-w-[7.5rem] border-copper/40 px-2"
            : "h-14 w-14 border-line",
        )}
      >
        {kind === "person" ? <PersonIcon /> : null}
        {kind === "middleman" ? <MiddlemanIcon /> : null}
        {kind === "plant" ? <PlantIcon /> : null}
        {kind === "brand" ? (
          <span className="flex flex-col items-center gap-1 text-copper">
            <WireMark className="h-6 w-6" />
            <span className="font-mono text-[8px] leading-none tracking-[0.14em] uppercase">
              {SITE_HOST}
            </span>
          </span>
        ) : null}
      </div>
      <p className="mt-2 font-mono text-[10px] leading-4 tracking-widest text-foreground uppercase">
        {label}
      </p>
    </div>
  );
}

function FlowArrow() {
  return <span className="font-mono text-sm text-copper">→</span>;
}

function glyph(children: ReactNode) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
      className="text-foreground"
    >
      {children}
    </svg>
  );
}

function PersonIcon() {
  return glyph(
    <>
      <circle cx="14" cy="9" r="3.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.5 21.5c.6-4.2 3.2-6.5 6.5-6.5s5.9 2.3 6.5 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>,
  );
}

function MiddlemanIcon() {
  return glyph(
    <>
      <circle cx="14" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 21.5c.5-3.8 2.8-5.8 6-5.8s5.5 2 6 5.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11 12.2 14 14.4l3-2.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </>,
  );
}

function PlantIcon() {
  return glyph(
    <>
      <path
        d="M5.5 21.5V11.5h6V8.5h5v3h6v10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 21.5v-4h3v4M16.5 21.5v-4h3v4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </>,
  );
}

function PriceSlashIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M9.5 8.5h8.2L20 14l-2.3 5.5H9.5L7 14l2.5-5.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M7 21 21 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SpeechIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M6.5 7.5h15v11h-6.2L9.5 21.5v-3h-3v-11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="13" r="1" fill="currentColor" />
      <circle cx="14" cy="13" r="1" fill="currentColor" />
      <circle cx="17" cy="13" r="1" fill="currentColor" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M14 5.5 21.5 8.5v6.2c0 4.2-3 7.3-7.5 8.8-4.5-1.5-7.5-4.6-7.5-8.8V8.5L14 5.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m11 14 2.2 2.2 4.3-4.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="m5.4 8.1 1.8 1.8 3.5-3.6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="m5.8 5.8 4.4 4.4M10.2 5.8 5.8 10.2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}
