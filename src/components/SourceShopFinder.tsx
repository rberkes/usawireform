"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { fieldClass } from "@/components/ui";

export type SourceShopHit = {
  name: string;
  slug: string;
  location: string;
  machines?: string;
  wireDiameters?: string;
};

function claimHref(slug: string) {
  return `/source/claim?slug=${encodeURIComponent(slug)}`;
}

function ShopClaimRow({ shop }: { shop: SourceShopHit }) {
  return (
    <Link
      href={claimHref(shop.slug)}
      className="flex items-center justify-between gap-4 px-4 py-3 text-sm hover:bg-inset"
    >
      <span>
        <span className="font-medium text-foreground">{shop.name}</span>
        <span className="mt-1 block text-muted">{shop.location}</span>
        {shop.machines || shop.wireDiameters ? (
          <span className="mt-1 block text-xs leading-5 text-muted">
            {[shop.machines, shop.wireDiameters].filter(Boolean).join(" · ")}
          </span>
        ) : null}
      </span>
      <span className="shrink-0 text-copper">Claim</span>
    </Link>
  );
}

export function SourceShopFinder({
  shops,
  featured = [],
}: {
  shops: SourceShopHit[];
  featured?: SourceShopHit[];
}) {
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
              <ShopClaimRow shop={shop} />
            </li>
          ))}
        </ul>
      ) : null}
      {needle.length === 0 && featured.length > 0 ? (
        <div className="mt-8">
          <p className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
            Public equipment — claim next
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            These listings already name iron, wire band, or 2D vs 3D on a public
            page. Claim and file cells so capacity, coil policy, and MOQ show —
            those also feed matching.
          </p>
          <ul className="mt-4 divide-y divide-line border border-line bg-background">
            {featured.map((shop) => (
              <li key={shop.slug}>
                <ShopClaimRow shop={shop} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
