"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { catalog } from "@/lib/catalog";
import { USA_MADE } from "@/lib/usa-made";
import { industries, shopLines } from "@/lib/site";
import { processes } from "@/lib/processes";
import { US_STATES } from "@/lib/states";
import { WIRE_FORMING_METROS, metroPath } from "@/lib/metros";
import { OHIO_CITIES, ohioCityPath } from "@/lib/ohio-cities";
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
  ...USA_MADE.flatMap((entry) =>
    entry.phrases.map((phrase) => ({
      title: phrase,
      href: entry.href,
      category: "USA made",
      description: `${phrase} from coil in Northeast Ohio.`,
    })),
  ),
  ...shopLines.map((item) => ({
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
  { title: "CNC Machine Catalog", href: "/equipment/cnc-manufacturers", category: "Equipment", description: "Ten OEMs, sixty 2D/3D CNC models. Dealer leads — we run a Robomac 214TF." },
  { title: "Machine Comparison", href: "/equipment/machine-comparison", category: "Equipment", description: "Which cells win small springs, heavy 3D, cut-to-length, and 5–8 mm parts." },
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
  { title: "Wire Forming Technology International", href: "https://www.wireformingtech.com", category: "Industry", description: "Trade magazine for spring makers, wire formers, mesh welders, and rebar processors." },
  { title: "Company Directory", href: "/directory", category: "Resources", description: "Wire forming shops. Filter fourslide, 3D CNC, 2D CNC, multi-slide, spring CNC." },
  { title: "Wire Forming Cities", href: "/directory/areas", category: "Locations", description: "Top 20 U.S. forming cities. Cleveland is the cheap coil — mills and drawers." },
  { title: "Northeast Ohio", href: "/cleveland", category: "Locations", description: "Mills, wire drawers, and short-haul 4–14 mm coil." },
  { title: "Ohio city directory", href: "/ohio", category: "Locations", description: "30 Ohio city landers — forming towns and buyer cities. One CNC cell in Northeast Ohio." },
  ...US_STATES.map((state) => ({
    title: `Wire forming in ${state.name}`,
    href: `/${state.slug}`,
    category: "Locations",
    description: `USA Wire Form for ${state.name} — 4–14 mm CNC from Northeast Ohio.`,
  })),
  ...OHIO_CITIES.map((city) => ({
    title: `Wire forming in ${city.name}, Ohio`,
    href: ohioCityPath(city),
    category: "Locations",
    description: city.work,
  })),
  ...WIRE_FORMING_METROS.map((metro) => ({
    title: `Wire forming in ${metro.city}`,
    href: metroPath(metro),
    category: "Locations",
    description: metro.hq
      ? "Mills, drawers, short-haul coil. USA Wire Form cell."
      : metro.why,
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
  const [answer, setAnswer] = useState("");
  const [asking, setAsking] = useState(false);
  const [askError, setAskError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const askingRef = useRef(false);
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 8);
  }, [query]);

  const hasAskRow = query.trim().length > 0;
  const itemCount = hasAskRow ? 1 + results.length : 0;

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      onClose();
      setQuery("");
    },
    [router, onClose]
  );

  const ask = useCallback(async () => {
    const question = query.trim();
    if (!question || askingRef.current) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    askingRef.current = true;

    setAsking(true);
    setAskError("");
    setAnswer("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Could not get an answer.");
      }

      if (!res.body) throw new Error("Could not get an answer.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setAnswer(text);
      }
      text += decoder.decode();
      setAnswer(text.trim());
    } catch (err) {
      if (controller.signal.aborted) return;
      setAskError(err instanceof Error ? err.message : "Could not get an answer.");
    } finally {
      askingRef.current = false;
      if (!controller.signal.aborted) setAsking(false);
    }
  }, [query]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setSelectedIndex(0);
    } else {
      abortRef.current?.abort();
      askingRef.current = false;
      setAsking(false);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
    setAnswer("");
    setAskError("");
    abortRef.current?.abort();
    askingRef.current = false;
    setAsking(false);
  }, [query]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) {
          onClose();
        }
      }

      if (!open) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, Math.max(itemCount - 1, 0)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        if (!hasAskRow) return;
        e.preventDefault();
        if (selectedIndex === 0) {
          void ask();
        } else if (results[selectedIndex - 1]) {
          navigate(results[selectedIndex - 1].item.href);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, results, selectedIndex, navigate, ask, hasAskRow, itemCount]);

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
              placeholder="Search pages or ask a question…"
              className="h-14 flex-1 bg-transparent px-3 text-base outline-none placeholder:text-muted/60"
            />
            {hasAskRow ? (
              <button
                type="button"
                onClick={() => void ask()}
                disabled={asking}
                className="mr-2 rounded-sm border border-copper/40 bg-copper/10 px-2 py-1 text-xs font-medium text-copper disabled:opacity-50"
              >
                {asking ? "Asking…" : "Ask"}
              </button>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="rounded px-2 py-1 text-xs text-muted hover:text-foreground"
            >
              ESC
            </button>
          </div>
          {(answer || askError || asking) && (
            <div className="border-b border-line px-4 py-3">
              {askError ? (
                <p className="text-sm text-muted">{askError}</p>
              ) : (
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                  {answer || (asking ? "Reading the shop facts…" : "")}
                </p>
              )}
            </div>
          )}
          {/* Results */}
          {hasAskRow ? (
            <ul className="max-h-80 overflow-y-auto p-2">
              <li>
                <button
                  type="button"
                  onClick={() => void ask()}
                  disabled={asking}
                  className={cx(
                    "flex w-full flex-col gap-1 rounded-md px-4 py-3 text-left transition-colors",
                    selectedIndex === 0
                      ? "bg-copper/10 text-foreground"
                      : "text-muted hover:bg-inset"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      Ask USA Wire Form
                    </span>
                    <span className="rounded bg-line px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider">
                      Question
                    </span>
                  </span>
                  <span className="line-clamp-1 text-sm">
                    {asking ? "Answering…" : `Can we form that? Enter or click Ask.`}
                  </span>
                </button>
              </li>
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
                      index + 1 === selectedIndex
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
          ) : (
            <div className="px-4 py-8 text-center text-sm text-muted">
              Search products, or ask: can you form 3/8 in S-hooks?
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
