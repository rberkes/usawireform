import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page, PageHero } from "@/components/ui";
import { publicHost } from "@/lib/directory";
import { pageMeta } from "@/lib/seo";
import { listNewestSourceDirectoryCompanies } from "@/lib/source";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  title: "Newest Source shops",
  description:
    "Shops that just filed CNC cells on Source. Newest members first — OEM, type, and wire band from the floor.",
  path: "/directory/new",
  keywords: [
    "source wire forming shops",
    "newest CNC shops",
    "wire forming capacity",
  ],
});

export default async function NewestSourceShopsPage() {
  const shops = await listNewestSourceDirectoryCompanies(40);

  return (
    <Page>
      <BreadcrumbJsonLd
        items={[
          { name: "Directory", url: "/directory" },
          { name: "Newest Source shops", url: "/directory/new" },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: "Directory", href: "/directory" },
          { label: "Newest Source shops" },
        ]}
      />
      <PageHero
        kicker="Source"
        title="Newest members"
        lede="US shops that filed cells on Source, newest first. Public listing only — emails stay with the desk. Europe later, on its own platform."
      />
      <p className="mt-6 max-w-xl text-sm leading-6 text-muted">
        <Link href="/source" className="text-copper hover:underline">
          Source
        </Link>{" "}
        is the trade.{" "}
        <Link href="/source/equipment" className="text-copper hover:underline">
          File a cell
        </Link>{" "}
        to show up here.
      </p>

      {shops.length === 0 ? (
        <p className="mt-10 max-w-xl text-sm leading-6 text-muted">
          No Source shops listed yet.
        </p>
      ) : (
        <ul className="mt-10 divide-y divide-line border border-line">
          {shops.map((shop) => (
            <li key={shop.slug} className="px-4 py-4 sm:px-5">
              <Link
                href={`/directory/${shop.slug}`}
                className="font-medium hover:text-copper"
              >
                {shop.name}
              </Link>
              <p className="mt-1 text-sm text-muted">{shop.location}</p>
              {shop.machines && shop.machines.length > 0 ? (
                <p className="mt-2 text-sm leading-6 text-muted">
                  {shop.machines.slice(0, 3).join(" · ")}
                  {shop.machines.length > 3
                    ? ` · +${shop.machines.length - 3} more`
                    : ""}
                </p>
              ) : null}
              {shop.website ? (
                <p className="mt-1 text-xs text-copper">
                  {publicHost(shop.website)}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </Page>
  );
}
