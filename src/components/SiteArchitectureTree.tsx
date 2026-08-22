import Link from "next/link";
import { cx } from "@/lib/cx";
import type { ArchNode } from "@/lib/site-architecture";

function Row({ node }: { node: ArchNode }) {
  const nameClass = cx(
    "min-w-0 truncate font-mono text-[13px] leading-6",
    node.kind === "branch" || node.kind === "desk"
      ? "font-medium text-copper"
      : node.kind === "pattern"
        ? "text-muted"
        : "text-foreground",
    node.href && "group-hover:text-copper",
  );

  const label = (
    <span className="flex min-w-0 flex-1 items-baseline gap-3">
      <span className={nameClass}>{node.name}</span>
      {node.note ? (
        <span className="hidden min-w-0 truncate text-xs leading-6 text-muted sm:inline">
          {node.note}
        </span>
      ) : null}
    </span>
  );

  if (node.href) {
    return (
      <Link href={node.href} className="group flex items-baseline gap-3 py-0.5">
        {label}
      </Link>
    );
  }

  return <div className="flex items-baseline gap-3 py-0.5">{label}</div>;
}

function Branch({ nodes, root = false }: { nodes: ArchNode[]; root?: boolean }) {
  return (
    <ul className={cx(!root && "ml-3 border-l border-line pl-4")}>
      {nodes.map((node) => (
        <li key={node.id} className="py-0.5">
          <Row node={node} />
          {node.children && node.children.length > 0 ? (
            <Branch nodes={node.children} />
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function SiteArchitectureTree({ tree }: { tree: ArchNode[] }) {
  return (
    <div className="overflow-x-auto border border-line bg-inset/30 p-4 sm:p-6">
      <p className="mb-4 font-mono text-[12px] tracking-[0.22em] text-copper uppercase">
        usawireform.com/
      </p>
      <Branch nodes={tree} root />
    </div>
  );
}
