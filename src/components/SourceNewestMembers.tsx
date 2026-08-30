import Link from "next/link";
import { TextLink } from "@/components/ui";
import type { DirectoryCompany } from "@/lib/directory-types";

export function SourceNewestMembers({
  shops,
}: {
  shops: Pick<DirectoryCompany, "slug" | "name" | "location" | "logoUrl">[];
}) {
  if (shops.length === 0) {
    return (
      <p className="mt-6 text-sm leading-6 text-muted">
        Nobody has published a listing yet.
      </p>
    );
  }

  return (
    <>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
        <TextLink href="/directory/new">See all newest Source shops</TextLink>.
      </p>
      <ul className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
        {shops.map((shop) => (
          <li
            key={shop.slug}
            className="flex items-center gap-4 bg-background px-5 py-5"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-line bg-inset">
              {shop.logoUrl ? (
                <img
                  src={shop.logoUrl}
                  alt=""
                  className="max-h-12 max-w-12 object-contain"
                />
              ) : null}
            </div>
            <div className="min-w-0">
              <Link
                href={`/directory/${shop.slug}`}
                className="font-medium hover:text-copper"
              >
                {shop.name}
              </Link>
              <p className="mt-1 text-sm text-muted">{shop.location}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
