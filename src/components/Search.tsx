"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { catalog } from "@/lib/catalog";
import { industries } from "@/lib/site";
import { processes } from "@/lib/processes";
import { US_STATES } from "@/lib/states";
import { allPosts, postPath } from "@/lib/blog";
import { cx } from "@/lib/cx";

type SearchItem = {
  title: string;
  href: string;
  category: string;
  description: string;
};

const searchItems: SearchItem[] = [
  // Products from catalog
  ...catalog.map((item) => ({
    title: item.title,
    href: `/products/${item.slug}`,
    category: "Products",
    description: item.summary,
  })),
  // Industries
  ...industries.map((item) => ({
    title: item.title,
    href: `/industries/${item.slug}`,
    category: "Industries",
    description: item.summary,
  })),
  // Processes
  ...processes
    .filter((p) => p.published)
    .map((item) => ({
      title: item.title,
      href: `/processes/${item.slug}`,
      category: "Processes",
      description: item.summary,
    })),
  // Static pages
  { title: "Contact", href: "/contact", category: "Pages", description: "Request a quote for custom CNC wire forms." },
  { title: "Instant Quote", href: "/instant-quote", category: "Pages", description: "Get an instant estimate for wire forming." },
  { title: "Equipment", href: "/equipment", category: "Pages", description: "Our CNC wire forming equipment and machines." },
  { title: "Materials", href: "/materials", category: "Pages", description: "Wire materials: carbon, stainless, brass, copper." },
  { title: "About", href: "/about", category: "Pages", description: "About USA Wire Form and our capabilities." },
  { title: "Sizes", href: "/sizes", category: "Pages", description: "Stock wire sizes: 3/8, 7/16, and 1/2 inch." },
  { title: "Design Guide", href: "/guide/design-for-wire-forming", category: "Resources", description: "Design guidelines for wire forming." },
  { title: "Videos", href: "/videos", category: "Resources", description: "Watch our CNC wire forming in action." },
  { title: "Blog", href: "/blog", category: "Resources", description: "Wire forming articles, structures, and daily briefings." },
  { title: "Daily Wire Forming Briefing", href: "/blog/daily", category: "Resources", description: "Today’s briefing — rotates automatically." },
  { title: "330 Stainless Wire Bending USA Parts", href: "/330-stainless-wire-bending-usa-parts", category: "Materials", description: "N08330 heat-treat baskets from coil. Resistance weld and TIG." },
  { title: "Wire Forming Manufacturers", href: "/wire-forming-manufacturers", category: "Pages", description: "U.S. wire forming manufacturer in Northeast Ohio." },
  { title: "Wire Forming Companies Near Me", href: "/wire-forming-companies-near-me", category: "Locations", description: "ZIP lookup to your state page. One cell in Northeast Ohio." },
  { title: "Custom Wire Forming", href: "/custom-wire-forming", category: "Pages", description: "Custom 4–14 mm CNC from coil. 100-piece minimum." },
  { title: "Wire Forming Process", href: "/wire-forming-process", category: "Processes", description: "Straighten, CNC bend, cut-to-length, weld, inspect." },
  { title: "Steel Wire Manufacturers in the USA", href: "/steel-wire-manufacturers-in-usa", category: "Pages", description: "We form U.S. coil. We are not a mill." },
  { title: "Stainless Steel Wire Basket", href: "/stainless-steel-wire-basket", category: "Products", description: "304 / 316 wet service. 330 for heat-treat baskets." },
  { title: "Stainless Steel Wire Shelf", href: "/stainless-steel-wire-shelf", category: "Products", description: "Industrial 4–14 mm stainless shelves from coil." },
  { title: "Wire Mesh", href: "/wire-mesh", category: "Pages", description: "Weave types, crimp, mesh count, openings, and welded wire cloth." },
  { title: "Careers", href: "/careers", category: "Pages", description: "CNC operator and manufacturing jobs in Northeast Ohio." },
  { title: "Company Directory", href: "/directory", category: "Resources", description: "Wire forming shops across the USA and Canada." },
  ...US_STATES.map((state) => ({
    title: `Wire forming in ${state.name}`,
    href: `/${state.slug}`,
    category: "Locations",
    description: `USA Wire Form for ${state.name} — 4–14 mm CNC from Northeast Ohio.`,
  })),
  ...allPosts().map((post) => ({
    title: post.title,
    href: postPath(post),
    category: post.kind === "briefing" ? "Daily briefing" : "Blog",
    description: post.description,
  })),
];

const fuse = new Fuse(searchItems, {
  keys: [
    { name: "title", weight: 2 },
    { name: "description", weight: 1 },
    { name: "category", weight: 0.5 },
  ],
  threshold: 0.4,
  includeScore: true,
});

export function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-9 items-center gap-2 rounded-sm border border-line bg-background px-3 text-sm text-muted transition-colors hover:border-copper/50 hover:text-foreground"
      aria-label="Search"
    >
      <SearchIcon />
      <span className="hidden sm:inline">Search</span>
      <kbd className="ml-2 hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted sm:inline">
        ⌘K
      </kbd>
    </button>
  );
}

export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 8);
  }, [query]);

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      onClose();
      setQuery("");
    },
    [router, onClose]
  );

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setSelectedIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) {
          onClose();
        } else {
          // This is handled by the parent
        }
      }

      if (!open) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        navigate(results[selectedIndex].item.href);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, results, selectedIndex, navigate]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      {/* Dialog */}
      <div className="fixed left-1/2 top-[15%] w-full max-w-xl -translate-x-1/2 px-4">
        <div className="overflow-hidden rounded-lg border border-line bg-background shadow-2xl">
          {/* Input */}
          <div className="flex items-center border-b border-line px-4">
            <SearchIcon className="text-muted" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, industries, processes..."
              className="h-14 flex-1 bg-transparent px-3 text-base outline-none placeholder:text-muted/60"
            />
            <button
              type="button"
              onClick={onClose}
              className="rounded px-2 py-1 text-xs text-muted hover:text-foreground"
            >
              ESC
            </button>
          </div>
          {/* Results */}
          {results.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto p-2">
              {results.map((result, index) => (
                <li key={result.item.href}>
                  <Link
                    href={result.item.href}
                    onClick={() => {
                      onClose();
                      setQuery("");
                    }}
                    className={cx(
                      "flex flex-col gap-1 rounded-md px-4 py-3 transition-colors",
                      index === selectedIndex
                        ? "bg-copper/10 text-foreground"
                        : "text-muted hover:bg-inset"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {result.item.title}
                      </span>
                      <span className="rounded bg-line px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider">
                        {result.item.category}
                      </span>
                    </span>
                    <span className="line-clamp-1 text-sm">
                      {result.item.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : query.trim() ? (
            <div className="px-4 py-8 text-center text-sm text-muted">
              No results for "{query}"
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-sm text-muted">
              Start typing to search...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
