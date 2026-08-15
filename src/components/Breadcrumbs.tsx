import Link from "next/link";
import { cx } from "@/lib/cx";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({
  items,
  className,
  tone = "default",
}: {
  items: BreadcrumbItem[];
  className?: string;
  tone?: "default" | "inverse";
}) {
  if (items.length === 0) return null;

  const inverse = tone === "inverse";
  const linkClass = inverse
    ? "text-white/55 transition-colors hover:text-white"
    : "text-muted transition-colors hover:text-copper";
  const currentClass = inverse ? "text-white" : "text-foreground";

  return (
    <nav aria-label="Breadcrumb" className={cx("mb-6", className)}>
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        <li>
          <Link href="/" className={linkClass}>
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1">
            <ChevronIcon className={inverse ? "text-white/25" : "text-line"} />
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ) : (
              <span className={currentClass} aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className ?? "text-line"}
      aria-hidden
    >
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  const allItems = [{ label: "Home", href: "/" }, ...items];
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href
        ? `https://usawireform.com${item.href}`
        : undefined,
    })),
  };
}
