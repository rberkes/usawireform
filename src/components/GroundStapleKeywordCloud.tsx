import Link from "next/link";
import {
  groundStapleCloud,
  groundStapleHref,
  type GroundStapleCluster,
} from "@/lib/ground-staple-tree";

const CLUSTER_CLASS: Record<GroundStapleCluster, string> = {
  style: "text-foreground",
  application: "text-copper",
  material: "text-steel",
  size: "text-foreground",
  price: "text-copper",
  market: "text-muted",
};

const SIZE = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl"] as const;

export function GroundStapleKeywordCloud({
  caption = "Industry names, not Google volume. Size is how central the term is on this floor. Small grey is 11 ga / 9 ga — named, not quoted.",
}: {
  caption?: string;
}) {
  const items = groundStapleCloud();

  return (
    <div>
      <p className="text-sm leading-6 text-muted">{caption}</p>
      <ul className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-3">
        {items.map((node) => (
          <li key={node.slug.join("/")}>
            <Link
              href={groundStapleHref(node.slug)}
              className={`${SIZE[node.weight - 1]} ${CLUSTER_CLASS[node.cluster]} font-medium underline-offset-4 hover:underline`}
            >
              {node.h1}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-mono text-[11px] tracking-widest text-muted uppercase">
        Style · application · material · size · price · market
      </p>
    </div>
  );
}
