import Link from "next/link";
import {
  POWDER_HOOK_ROOT,
  powderHookChildren,
  powderHookHref,
  powderHookParent,
  powderHookSiblings,
} from "@/lib/powder-hook-tree";

export function PowderHookBranchNav({ slug }: { slug: string[] }) {
  const parent = powderHookParent(slug);
  const children = powderHookChildren(slug);
  const siblings = slug.length > 1 ? powderHookSiblings(slug) : [];

  if (children.length === 0 && siblings.length === 0 && !parent) return null;

  return (
    <div className="not-prose mt-10 border-t border-line pt-8">
      <p className="font-mono text-[11px] tracking-widest text-copper uppercase">
        In this branch
      </p>
      <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        <li>
          <Link href={POWDER_HOOK_ROOT}>Powder coating hooks</Link>
          <span className="text-muted"> — hub</span>
        </li>
        {parent ? (
          <li>
            <Link href={powderHookHref(parent.slug)}>{parent.h1}</Link>
            <span className="text-muted"> — up</span>
          </li>
        ) : null}
        {children.map((node) => (
          <li key={node.slug.join("/")}>
            <Link href={powderHookHref(node.slug)}>{node.h1}</Link>
          </li>
        ))}
        {siblings.map((node) => (
          <li key={node.slug.join("/")}>
            <Link href={powderHookHref(node.slug)}>{node.h1}</Link>
            <span className="text-muted"> — sibling</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
