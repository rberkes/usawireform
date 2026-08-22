"use client";

import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function ShopGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2.5 13.5V6.2L8 2.75l5.5 3.45v7.3H2.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DashGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect
        x="2.5"
        y="2.5"
        width="4.5"
        height="4.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <rect
        x="9"
        y="2.5"
        width="4.5"
        height="4.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <rect
        x="2.5"
        y="9"
        width="4.5"
        height="4.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <rect
        x="9"
        y="9"
        width="4.5"
        height="4.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

const SKIP = new Set([
  "&",
  "and",
  "of",
  "the",
  "co",
  "inc",
  "llc",
  "ltd",
  "corp",
  "company",
]);

function shopStamp(name: string) {
  const words = name
    .replace(/[.,]/g, " ")
    .split(/\s+/)
    .filter((word) => {
      const key = word.toLowerCase().replace(/\.$/, "");
      return key.length > 0 && !SKIP.has(key);
    });
  if (words.length === 0) return "SH";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function SourceAccountNav({
  shopName,
  shopSlug,
}: {
  shopName?: string;
  shopSlug?: string;
}) {
  const listingHref =
    shopName && shopSlug ? `/directory/${shopSlug}` : "/source/dashboard";
  const stamp = shopName ? shopStamp(shopName) : null;

  return (
    <div className="flex items-center">
      <Show
        when="signed-in"
        fallback={
          <Link
            href="/sign-in?redirect_url=/source/dashboard"
            className="px-2 py-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            Source
          </Link>
        }
      >
        <UserButton
          key={shopName ?? "no-shop"}
          appearance={{
            elements: { userButtonAvatarBox: "h-7 w-7" },
          }}
        >
          <UserButton.MenuItems>
            <UserButton.Link
              label={shopName ? `Claimed: ${shopName}` : "No shop claimed"}
              labelIcon={<ShopGlyph />}
              href={listingHref}
            />
            <UserButton.Link
              label="Shop dashboard"
              labelIcon={<DashGlyph />}
              href="/source/dashboard"
            />
          </UserButton.MenuItems>
        </UserButton>
        {stamp ? (
          <Link
            href={listingHref}
            title={shopName}
            aria-label={`Claimed shop: ${shopName}`}
            className="ml-1.5 hidden font-mono text-[11px] font-medium tracking-wide text-muted hover:text-copper sm:inline"
          >
            {stamp}
          </Link>
        ) : null}
      </Show>
    </div>
  );
}
