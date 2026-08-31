import { cx } from "@/lib/cx";

function FlowChevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M9 5.5 16 12l-7 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlatformFlow({
  steps,
  className,
  framed = true,
}: {
  steps: readonly { title: string; body: string }[];
  className?: string;
  framed?: boolean;
}) {
  return (
    <ol
      aria-label="How the platform works"
      className={cx(
        "grid sm:grid-cols-3",
        framed &&
          "mt-10 overflow-hidden rounded-sm border border-white/15",
        className,
      )}
    >
      {steps.map((step, index) => (
        <li
          key={`${index}-${step.title}`}
          className={cx(
            "relative px-5 py-5 sm:px-6 sm:py-6",
            index > 0 && "border-t border-white/15 sm:border-t-0 sm:border-l",
          )}
        >
          {index < steps.length - 1 ? (
            <>
              <FlowChevron className="pointer-events-none absolute right-0 top-1/2 hidden h-5 w-5 -translate-y-1/2 translate-x-1/2 text-zoom sm:block" />
              <FlowChevron className="pointer-events-none absolute bottom-0 left-1/2 h-5 w-5 -translate-x-1/2 translate-y-1/2 rotate-90 text-zoom sm:hidden" />
            </>
          ) : null}
          <p
            aria-hidden="true"
            className="font-mono text-[11px] tracking-[0.22em] text-zoom uppercase"
          >
            0{index + 1}
          </p>
          <p className="mt-3 text-xl tracking-tight">{step.title}</p>
          <p className="mt-2 text-sm leading-6 text-white/60">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
