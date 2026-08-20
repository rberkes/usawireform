import { directoryCompanies, publicHost } from "@/lib/directory";
import type { WireFormingMetro } from "@/lib/metros";
import { getStateShops } from "@/lib/state-shops";

export type MetroShop = {
  name: string;
  place: string;
  note: string;
  website?: string;
  directoryHref?: string;
};

function norm(text: string) {
  return ` ${text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()} `;
}

function matchesAliases(text: string, aliases: string[]) {
  const hay = norm(text);
  return aliases.some((alias) => hay.includes(norm(alias)));
}

function shopKey(name: string, website?: string) {
  if (website) {
    try {
      return new URL(website).hostname.replace(/^www\./, "").toLowerCase();
    } catch {
      return website.replace(/\/$/, "").toLowerCase();
    }
  }
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

/** Directory + state-shop rows whose city falls in this metro. Deduped by site. */
export function getMetroShops(metro: WireFormingMetro): MetroShop[] {
  const byKey = new Map<string, MetroShop>();

  for (const company of directoryCompanies) {
    if (company.country !== "USA") continue;
    if (company.state !== metro.stateAbbr) continue;
    if (!matchesAliases(company.location, metro.aliases)) continue;
    const shop: MetroShop = {
      name: company.name,
      place: company.location,
      note: company.capabilities.slice(0, 3).join(", "),
      website: company.website,
      directoryHref: `/directory/${company.slug}`,
    };
    byKey.set(shopKey(company.name, company.website), shop);
  }

  for (const row of getStateShops(metro.stateAbbr)) {
    if (!matchesAliases(`${row.city} ${row.name}`, metro.aliases)) continue;
    const key = shopKey(row.name, row.website);
    if (byKey.has(key)) continue;
    byKey.set(key, {
      name: row.name,
      place: `${row.city}, ${row.state}`,
      note: row.capacity,
      website: row.website,
    });
  }

  return Array.from(byKey.values());
}

export { publicHost };
