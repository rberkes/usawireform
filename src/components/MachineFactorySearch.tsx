"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { fieldClass } from "@/components/ui";
import { cx } from "@/lib/cx";
import {
  MACHINE_HINTS,
  MACHINE_SEARCH_API,
  MACHINE_SEARCH_LIMIT,
  type MachineSearchResult,
} from "@/lib/machine-search";

const EMPTY: MachineSearchResult = {
  query: "",
  term: null,
  hits: [],
  shopTotal: 0,
  machineTotal: 0,
};

export function MachineFactorySearch({ autofocus = false }: { autofocus?: boolean }) {
  const listId = useId();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [result, setResult] = useState<MachineSearchResult>(EMPTY);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResult(EMPTY);
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const res = await fetch(
          `${MACHINE_SEARCH_API}?q=${encodeURIComponent(q.slice(0, 80))}`,
          { signal: controller.signal },
        );
        if (!res.ok) return;
        const data = (await res.json()) as MachineSearchResult;
        setResult(data);
      } catch {
        if (controller.signal.aborted) return;
        setResult(EMPTY);
      }
    }, 120);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query]);

  const optionCount = result.hits.length + (result.seeAllHref ? 1 : 0);
  const showEmpty = open && query.trim().length >= 2 && result.shopTotal === 0;
  const showList = open && (result.hits.length > 0 || showEmpty);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  function applyHint(label: string) {
    setQuery(label);
    setOpen(true);
    inputRef.current?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!showList || optionCount === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => Math.min(index + 1, optionCount - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const hit = result.hits[active];
      if (hit) {
        router.push(hit.href);
        return;
      }
      if (result.seeAllHref && active === result.hits.length) {
        router.push(result.seeAllHref);
      }
    }
  }

  const countLine = result.term
    ? [
        result.term.label,
        result.shopTotal
          ? `${result.shopTotal} plant${result.shopTotal === 1 ? "" : "s"}`
          : null,
        !result.term.secondary && result.machineTotal
          ? `${result.machineTotal} machine${result.machineTotal === 1 ? "" : "s"}`
          : null,
      ]
        .filter(Boolean)
        .join(" · ")
    : "";

  return (
    <div ref={rootRef} className="relative max-w-2xl">
      <label className="block text-sm">
        Machine or secondary
        <input
          ref={inputRef}
          className={cx(fieldClass, "mt-1.5")}
          type="search"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showList}
          aria-controls={listId}
          aria-activedescendant={
            showList && optionCount > 0 ? `${listId}-opt-${active}` : undefined
          }
          autoComplete="off"
          autoFocus={autofocus}
          placeholder="Fourslide, powder coating, TIG, zinc, Robomac…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
      </label>

      <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
        {MACHINE_HINTS.map((term) => (
          <button
            key={term.id}
            type="button"
            className="text-copper hover:underline"
            onClick={() => applyHint(term.label)}
          >
            {term.label}
          </button>
        ))}
      </p>

      {showList ? (
        <div
          id={listId}
          role="listbox"
          aria-label="Factories for that machine or secondary"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-sm border border-line bg-background shadow-lg"
        >
          {countLine ? (
            <p className="border-b border-line px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-muted">
              {countLine}
            </p>
          ) : null}

          {showEmpty ? (
            <p className="px-3 py-3 text-sm leading-6 text-muted">
              No listing on this site names that iron or secondary. Tags come
              from public pages and cells shops filed — not a floor walk.{" "}
              <Link href="/source" className="text-copper hover:underline">
                File a print on Source
              </Link>
              {" · "}
              <Link
                href="/wire-form-factories-in-usa"
                className="text-copper hover:underline"
              >
                USA factories
              </Link>
              .
            </p>
          ) : null}

          {result.hits.map((hit, index) => (
            <Link
              key={hit.slug}
              id={`${listId}-opt-${index}`}
              role="option"
              aria-selected={active === index}
              href={hit.href}
              className={cx(
                "block border-b border-line px-3 py-2.5 last:border-b-0",
                active === index ? "bg-inset" : "hover:bg-inset",
              )}
              onMouseEnter={() => setActive(index)}
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-medium">{hit.name}</span>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted">
                  {hit.thisFloor ? "This floor" : hit.location}
                </span>
              </span>
              <span className="mt-0.5 block text-xs text-muted">
                {hit.why}
                {hit.thisFloor ? " · 4–14 mm 3D CNC" : ""}
              </span>
            </Link>
          ))}

          {result.seeAllHref && result.seeAllLabel ? (
            <Link
              id={`${listId}-opt-${result.hits.length}`}
              role="option"
              aria-selected={active === result.hits.length}
              href={result.seeAllHref}
              className={cx(
                "block px-3 py-2.5 text-sm text-copper",
                active === result.hits.length ? "bg-inset" : "hover:bg-inset",
              )}
              onMouseEnter={() => setActive(result.hits.length)}
            >
              {result.seeAllLabel}
            </Link>
          ) : null}
        </div>
      ) : null}

      <p className="mt-3 text-sm leading-6 text-muted">
        Each hit is a machine or a named secondary. The dropdown is{" "}
        {MACHINE_SEARCH_LIMIT} plants. Powder, zinc, TIG, MIG, resistance weld,
        end forming, heat treat — only if the listing or a Source filing said
        so. Confirm before you send a print.
      </p>
    </div>
  );
}
