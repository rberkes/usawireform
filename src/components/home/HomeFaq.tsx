export function HomeFaq({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <div className="divide-y divide-line border border-line">
      {items.map((item) => (
        <details key={item.question} className="group bg-background">
          <summary className="cursor-pointer list-none px-5 py-4 text-base font-medium tracking-tight sm:px-6">
            <span className="flex items-center justify-between gap-4">
              {item.question}
              <span
                aria-hidden
                className="font-mono text-sm text-muted transition-transform group-open:rotate-45"
              >
                +
              </span>
            </span>
          </summary>
          <p className="px-5 pb-5 text-sm leading-6 text-muted sm:px-6">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
