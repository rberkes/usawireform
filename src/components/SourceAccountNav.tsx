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

export function SourceAccountNav({
  shopName,
  shopSlug,
}: {
  shopName?: string;
  shopSlug?: string;
}) {
  const listingHref =
    shopName && shopSlug ? `/directory/${shopSlug}` : "/source/dashboard";

  return (
    <div className="flex items-center gap-2">
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
        {shopName ? (
          <Link
            href={listingHref}
            title={`Signed in as ${shopName}. One shop per account.`}
            className="hidden max-w-[14rem] truncate text-sm text-foreground hover:text-copper sm:inline"
          >
            {shopName}
          </Link>
        ) : null}
        <UserButton
          key={shopName ?? "no-shop"}
          appearance={{
            elements: { userButtonAvatarBox: "h-8 w-8" },
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
      </Show>
    </div>
  );
}
