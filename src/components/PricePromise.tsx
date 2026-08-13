import { FactGrid, Section } from "./ui";
import { PRICE_ITEMS } from "@/lib/price";

export function PricePromise({
  className,
  titled = true,
}: {
  className?: string;
  titled?: boolean;
}) {
  const grid = (
    <FactGrid
      className={titled ? "mt-8" : "mt-0"}
      items={[...PRICE_ITEMS]}
    />
  );

  if (!titled) {
    return <div className={className}>{grid}</div>;
  }

  return (
    <Section
      kicker="Price"
      title="Lowest prices. 100-piece minimum."
      className={className}
    >
      {grid}
    </Section>
  );
}
