import Link from "next/link";
import type { DirectoryCompany } from "@/lib/directory-types";
import { companyCapabilities, companyMaterials, companyOems } from "@/lib/graph";

export function ShopRoster({
  shops,
  empty,
  distances,
}: {
  shops: DirectoryCompany[];
  empty?: string;
  distances?: Record<string, number | undefined>;
}) {
  if (shops.length === 0) {
    return empty ? <p className="mt-4 text-sm leading-7 text-muted">{empty}</p> : null;
  }

  return (
    <ul className="mt-6 divide-y divide-line border-y border-line">
      {shops.map((shop) => {
        const caps = companyCapabilities(shop)
          .slice(0, 3)
          .map((item) => item.title);
        const materials = companyMaterials(shop)
          .slice(0, 2)
          .map((item) => item.title.replace(/ Wire Forming$/, ""));
        const iron = companyOems(shop)
          .slice(0, 2)
          .map((oem) => oem.name);
        const bits = [
          shop.wireDiameters,
          ...caps,
          ...materials,
          ...iron,
          ...(shop.certifications ?? []).slice(0, 1),
        ].filter(Boolean);
        const miles = distances?.[shop.slug];
        return (
          <li key={shop.slug} className="py-4">
            <Link
              href={`/directory/${shop.slug}`}
              className="font-medium hover:text-copper"
            >
              {shop.name}
            </Link>
            <p className="mt-1 text-sm text-muted">
              {shop.location}
              {typeof miles === "number" ? ` · ${miles} mi` : ""}
            </p>
            {bits.length > 0 ? (
              <p className="mt-1 text-sm text-muted">{bits.join(" · ")}</p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
