/**
 * Exact “USA made …” search phrases, mapped to the page that actually
 * makes that part. Origin is Northeast Ohio production — not a mill.
 */

export type UsaMadeEntry = {
  slug: string;
  href: string;
  /** First phrase is the page title / primary term. */
  phrases: readonly [string, ...string[]];
};

export const USA_MADE: UsaMadeEntry[] = [
  {
    slug: "ground-staples",
    href: "/products/ground-staples",
    phrases: ["USA made ground staples", "USA made ground samples"],
  },
  {
    slug: "wire-racks",
    href: "/products/wire-racks",
    phrases: ["USA made wire racks"],
  },
  {
    slug: "cable-trays",
    href: "/products/cable-trays",
    phrases: ["USA made cable trays"],
  },
  {
    slug: "d-rings",
    href: "/products/d-rings",
    phrases: ["USA made D-rings"],
  },
  {
    slug: "security-mesh-fencing",
    href: "/products/security-mesh-fencing",
    phrases: ["USA made security fencing"],
  },
  {
    slug: "heavy-duty-wire-baskets",
    href: "/products/heavy-duty-wire-baskets",
    phrases: ["USA made wire baskets", "USA made heat treat baskets"],
  },
  {
    slug: "trellis-systems",
    href: "/products/trellis-systems",
    phrases: ["USA made wire stakes"],
  },
];

export function usaMadeForSlug(slug: string) {
  return USA_MADE.find((entry) => entry.slug === slug);
}

export function allUsaMadePhrases() {
  return USA_MADE.flatMap((entry) => [...entry.phrases]);
}
