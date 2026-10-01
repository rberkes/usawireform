import Link from "next/link";
import type { GraphNode } from "@/lib/graph";

const KIND_LABEL: Record<GraphNode["kind"], string> = {
  city: "City",
  state: "State",
  capability: "Process",
  material: "Material",
  oem: "OEM",
  machine: "Machine",
  industry: "Industry",
  shop: "Shop",
  quote: "RFQ",
  engineering: "Guide",
};

export function GraphTrail({ nodes }: { nodes: GraphNode[] }) {
  if (nodes.length === 0) return null;
  return (
    <nav aria-label="Related topics" className="mt-8">
      <p className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
        In this graph
      </p>
      <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
        {nodes.map((node, index) => (
          <li key={node.href} className="flex items-center gap-2">
            {index > 0 ? (
              <span className="text-muted" aria-hidden>
                →
              </span>
            ) : null}
            <Link href={node.href} className="text-copper hover:underline">
              {node.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function GraphPills({
  title,
  nodes,
}: {
  title: string;
  nodes: GraphNode[];
}) {
  if (nodes.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="text-lg font-medium tracking-tight">{title}</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {nodes.map((node) => (
          <li key={`${node.kind}-${node.href}`}>
            <Link
              href={node.href}
              className="border border-line px-3 py-1.5 text-sm hover:border-copper hover:text-copper"
            >
              {node.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function GraphKindNote({ node }: { node: GraphNode }) {
  return (
    <span className="font-mono text-[10px] tracking-widest text-muted uppercase">
      {KIND_LABEL[node.kind]}
    </span>
  );
}
