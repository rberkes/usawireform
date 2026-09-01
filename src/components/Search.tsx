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
  { title: "About", href: "/about", category: "Pages", description: "The resource for wire forming in the United States and beyond." },
  { title: "Sizes", href: "/sizes", category: "Pages", description: "Stock wire sizes: 3/8, 7/16, and 1/2 inch." },
  { title: "Design Guide", href: "/guide/design-for-wire-forming", category: "Resources", description: "Design guidelines for wire forming." },
  { title: "3D STEP Viewer", href: "/models", category: "Resources", description: "Orbit shop models and drop a STEP or IGES to inspect a print." },
  { title: "Our Past Projects", href: "/past-projects", category: "Resources", description: "Orbit shop files from jobs we formed, streamed from Autodesk." },
  { title: "Videos", href: "/videos", category: "Resources", description: "Watch our CNC wire forming in action." },
  { title: "Blog", href: "/blog", category: "Resources", description: "Wire forming articles, structures, and daily briefings." },
  { title: "Daily Wire Forming Briefing", href: "/blog/daily", category: "Resources", description: "Today’s briefing — rotates automatically." },
  { title: "330 Stainless Wire Bending USA Parts", href: "/330-stainless-wire-bending-usa-parts", category: "Materials", description: "N08330 heat-treat baskets from coil. Resistance weld and TIG." },
  { title: "Wire Forming Manufacturers", href: "/wire-forming-manufacturers", category: "Pages", description: "U.S. wire forming manufacturer in Northeast Ohio." },
  { title: "Wire Forming Companies Near Me", href: "/wire-forming-companies-near-me", category: "Locations", description: "ZIP lookup to your state page. One cell in Northeast Ohio." },
  { title: "Custom Wire Forming", href: "/custom-wire-forming", category: "Pages", description: "Custom 4–14 mm CNC from coil. 100-piece minimum." },
  { title: "Custom CNC Wire Forming Services", href: "/custom-cnc-wire-forming-services", category: "Pages", description: "Your print, from coil, 2D and 3D CNC. 100-piece minimum. Northeast Ohio." },
  { title: "Powder Coating Hooks", href: "/powder-coating-hooks", category: "Products", description: "S, V, C, CV, and 90° hooks from coil. Heavy 4–14 mm. 100-piece minimum." },
  { title: "Ground Staples", href: "/ground-staples", category: "Products", description: "8 ga landscape U-pins plus heavy 3/8, 7/16, and 1/2 in. 100-piece minimum." },
  { title: "Ground Staple Prices", href: "/ground-staples/prices", category: "Products", description: "8 ga 6 in and 12 in bags. 5% under published USA 8 ga cards." },
  { title: "Heavy-Duty Ground Staples", href: "/ground-staples/heavy-duty", category: "Products", description: "3/8, 7/16, and 1/2 in stock Us. Shop steel. Mill math." },
  { title: "8 Gauge Landscape Staples", href: "/ground-staples/8-gauge", category: "Products", description: "8 ga (4.11 mm) landscape staples. Lightest card in this cell." },
  { title: "Custom Ground Staples", href: "/custom-ground-staples", category: "Products", description: "Custom U-pins. Live estimate. 4–14 mm. 100-piece minimum." },
  { title: "Powder Coating V-Hooks", href: "/powder-coating-v-hooks", category: "Products", description: "V-hooks for wash, coat, cure, paint, and e-coat. Live builder. 4–14 mm." },
  { title: '.375" V-Hooks', href: "/375-v-hooks", category: "Products", description: "3/8 in stock V-hooks. Custom length from coil." },
  { title: "Steel V-Hooks", href: "/steel-v-hooks", category: "Products", description: "1018 and galvanized V-hooks for finishing lines." },
  { title: "Stainless Steel V-Hooks", href: "/stainless-steel-v-hooks", category: "Products", description: "304 / 316 V-hooks for corrosive wash." },
  { title: "90° V-Hooks", href: "/90-degree-v-hooks", category: "Products", description: "Rotated V-hooks for rack clearance." },
  { title: "Heavy-Duty V-Hooks", href: "/heavy-duty-v-hooks", category: "Products", description: "USA made heavy-duty powder coat V-hooks in 3/8, 7/16, and 1/2 in. Three-column calculator." },
  { title: "Custom V-Hooks", href: "/custom-v-hooks", category: "Products", description: "Custom V-hooks. Live estimate from length and leg ID." },
  { title: "V-Hooks", href: "/powder-coating-hooks/v-hooks", category: "Products", description: "Powder coating V-hooks. Centered hang from coil in 4–14 mm." },
  { title: "C-Hooks", href: "/powder-coating-hooks/c-hooks", category: "Products", description: "Powder coating C-hooks. Open hang for rack clearance." },
  { title: "CV-Hooks", href: "/powder-coating-hooks/cv-hooks", category: "Products", description: "Powder coating CV-hooks. C clearance plus a V locate." },
  { title: "CV-Hook 3D", href: "/powder-coating-hooks/cv-hooks/3d", category: "Products", description: "Orbit CV-hooks in Autodesk Viewer. C eye, V locate, stills from the same model." },
  { title: "S-Hooks", href: "/powder-coating-hooks/s-hooks", category: "Products", description: "Powder coating and plant S-hooks from coil in 4–14 mm." },
  { title: "L hitch pins", href: "/l-hitch-pins", category: "Products", description: "Heavy-duty L hitch pins for trailers and implements. 3/8, 7/16, 1/2 in. Not 5/8 in." },
  { title: "Heavy-duty L hitch pins", href: "/heavy-duty-l-hitch-pins", category: "Products", description: "Trailer L hitch pins in 1/2 in stock. CNC from coil. 100-piece minimum." },
  { title: "90 Degree Hooks", href: "/powder-coating-hooks/90-degree-hooks", category: "Products", description: "90° V, C, and CV powder coating hooks." },
  { title: "Powder Coating Hook Prices", href: "/powder-coating-hooks/prices", category: "Products", description: "4–10 mm V, S, and C bags. 2% under published 0.180 and 0.250 in cards." },
  { title: "0.180 and 0.250 in Hook Prices", href: "/powder-coating-hooks/listed-bags", category: "Products", description: "0.180 and 0.250 in V, C, S, CV, 90° V. 5% under published boxes. Not light wire, diamond, or C-LAW." },
  { title: "HC Series C-Hooks", href: "/powder-coating-hooks/hc-series-c-hooks", category: "Products", description: "Round-wire C-hooks matching published HC 0.180 and 0.250 in boxes. 5% under." },
  { title: "HS Series S-Hooks", href: "/powder-coating-hooks/hs-series-s-hooks", category: "Products", description: "Round-wire S-hooks matching published HS 0.180 and 0.250 in boxes. 5% under." },
  { title: "HV Series V-Hooks", href: "/powder-coating-hooks/hv-series-v-hooks", category: "Products", description: "Round-wire V-hooks matching published HV 0.180 and 0.250 in boxes. 5% under." },
  { title: "HCV Series CV-Hooks", href: "/powder-coating-hooks/hcv-series-cv-hooks", category: "Products", description: "Round-wire CV-hooks matching published HCV 0.180 and 0.250 in boxes. 5% under." },
  { title: "HV90 Series 90° V-Hooks", href: "/powder-coating-hooks/hv90-series-90-degree-v-hooks", category: "Products", description: "Round-wire 90° V matching published HV90 0.180 and 0.250 in boxes. 5% under." },
  { title: "Super V-Hooks", href: "/powder-coating-hooks/super-v-hooks", category: "Products", description: "Deeper dual V from round coil in 4–14 mm. Not a catalog SKU clone." },
  { title: "Locking V-Hooks", href: "/powder-coating-hooks/locking-v-hooks", category: "Products", description: "Round-wire V plus a stay bend in 4–14 mm. Not 0.080 in catalog bags." },
  { title: "Z-Hooks", href: "/powder-coating-hooks/z-hooks", category: "Products", description: "Round-wire Z path from coil. Not Mighty Hook Z-bar clips." },
  { title: "Jam Hooks", href: "/powder-coating-hooks/jam-hooks", category: "Products", description: "Round-wire internal hang for large IDs. Not flat-stock jam." },
  { title: "Snap Hooks", href: "/powder-coating-hooks/snap-hooks", category: "Products", description: "Round-wire snap onto a bar in 4–14 mm. Not 0.044–0.120 in clips." },
  { title: "J-Hooks", href: "/powder-coating-hooks/j-hooks", category: "Products", description: "Round-wire J-hooks from coil for finishing hang." },
  { title: "Powder Coating Hook Market", href: "/powder-coating-hooks/market", category: "Products", description: "Mighty Hook, Magic Rack, Hook Authority, Argon, EPSI — vs this CNC cell." },
  { title: "Stainless Steel Powder Coating Hooks", href: "/stainless-steel-powder-coating-hooks", category: "Products", description: "304 / 316 finishing hooks from coil." },
  { title: "S-Hooks vs V-Hooks vs C-Hooks", href: "/guide/s-hooks-vs-v-hooks-vs-c-hooks", category: "Resources", description: "Which powder coating hook to use on the line." },
  { title: "Wire Forming Process", href: "/wire-forming-process", category: "Processes", description: "Straighten, CNC bend, cut-to-length, weld, inspect." },
  { title: "Steel Wire Manufacturers in the USA", href: "/steel-wire-manufacturers-in-usa", category: "Pages", description: "We form U.S. coil. We are not a mill." },
  { title: "Stainless Steel Wire Basket", href: "/stainless-steel-wire-basket", category: "Products", description: "304 / 316 wet service. 330 for heat-treat baskets." },
  { title: "Stainless Steel Wire Shelf", href: "/stainless-steel-wire-shelf", category: "Products", description: "Industrial 4–14 mm stainless shelves from coil." },
  { title: "Wire Mesh", href: "/wire-mesh", category: "Pages", description: "Weave types, crimp, mesh count, openings, and welded wire cloth." },
  { title: "Careers", href: "/careers", category: "Pages", description: "CNC operator and manufacturing jobs in Northeast Ohio." },
  { title: "Wire Forming Technology International", href: "https://www.wireformingtech.com", category: "Industry", description: "Trade magazine for spring makers, wire formers, mesh welders, and rebar processors." },
  { title: "Company Directory", href: "/directory", category: "Resources", description: "Wire forming shops. Filter fourslide, 3D CNC, 2D CNC, multi-slide, spring CNC." },
  { title: "Wire Form Factories in the USA", href: "/wire-form-factories-in-usa", category: "Resources", description: "U.S. wire form factories as company cards. CNC, fourslide, multi-slide, spring shops." },
  { title: "Find factories by machine", href: "/find-factories-by-machine", category: "Resources", description: "Type fourslide, Robomac, powder coating, TIG, zinc. Three or four plants drop as you type." },
  { title: "Find a wire form shop", href: "/source", category: "Pages", description: "Send the print. We introduce shops that listed a machine that can run it." },
  { title: "Add a machine cell", href: "/source/shops", category: "Pages", description: "Add one machine cell free. File how the plant operates free. Claim the listing or file a cell." },
  { title: "Upload equipment", href: "/source/equipment", category: "Pages", description: "Register the shop and file one row per CNC cell." },
  { title: "Source leads", href: "/source/upgrade", category: "Pages", description: "List every cell free. $49 unlocks a matched lead. Up to 10 shops can buy each job. Three secondaries $19/mo. Six maximum $49/mo." },
  { title: "Newest Source shops", href: "/directory/new", category: "Pages", description: "Shops that just filed CNC cells on Source." },
  { title: "Claim a directory page", href: "/directory", category: "Pages", description: "US shops claim their listing and file CNC cells. Source is USA for now." },
  { title: "How the factory operates", href: "/source/dashboard", category: "Pages", description: "Registered shops file min order, setup, stock, and lead free. Buyers see it on the public listing." },
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
              Search products, or ask: can you form 3/8 in powder coating V-hooks?
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
