"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { fieldClass } from "@/components/ui";

export type SourceShopHit = {
  name: string;
  slug: string;
  location: string;
};

function claimHref(slug: string) {
  return `/source/claim?slug=${encodeURIComponent(slug)}`;
}

export function SourceShopFinder({ shops }: { shops: SourceShopHit[] }) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (needle.length < 2) return [];
    return shops
      .filter((shop) => {
        const hay = `${shop.name} ${shop.location}`.toLowerCase();
        return hay.includes(needle);
      })
      .slice(0, 8);
  }, [needle, shops]);

  return (
    <div>
      <label className="block text-sm">
        Find your shop
        <input
          className={`mt-1.5 ${fieldClass}`}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Shop name or city"
          autoComplete="organization"
        />
      </label>
      {needle.length > 0 && needle.length < 2 ? (
        <p className="mt-3 text-sm text-muted">Type two letters.</p>
      ) : null}
      {needle.length >= 2 && matches.length === 0 ? (
        <p className="mt-3 text-sm leading-6 text-muted">
          No listing with that name.{" "}
          <Link href="/source/equipment" className="text-copper hover:underline">
            File a cell
          </Link>{" "}
          to publish a new page.
        </p>
      ) : null}
      {matches.length > 0 ? (
        <ul id="source-shop-hits" className="mt-4 divide-y divide-line border border-line bg-background">
          {matches.map((shop) => (
            <li key={shop.slug}>
              <Link
                href={claimHref(shop.slug)}
                className="flex items-center justify-between gap-4 px-4 py-3 text-sm hover:bg-inset"
              >
                <span>
                  <span className="font-medium text-foreground">{shop.name}</span>
                  <span className="mt-1 block text-muted">{shop.location}</span>
                </span>
                <span className="shrink-0 text-copper">Claim</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
