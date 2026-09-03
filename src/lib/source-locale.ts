import { nearestMajorCity } from "@/lib/metros";
import { normalizeShopEmail } from "@/lib/source-account";
import type { SourceJob, SourceJobMailedTo } from "@/lib/source-types";

export type ShopPlaceSource = {
  userId?: string;
  email?: string;
  city?: string;
  state?: string;
};

function matchMailedShop(
  mailed: SourceJobMailedTo,
  shops: ShopPlaceSource[],
) {
  const needle = normalizeShopEmail(mailed.email);
  return shops.find(
    (shop) =>
      (mailed.userId && shop.userId === mailed.userId) ||
      (Boolean(needle) && normalizeShopEmail(shop.email) === needle),
  );
}

/** Desk-only plant city plus nearest major city. Buyers and shops never see this. */
export function formatDeskPlace(
  city?: string | null,
  state?: string | null,
) {
  const plant = [city?.trim(), state?.trim()].filter(Boolean).join(", ");
  const metro = nearestMajorCity(city, state);
  if (!plant) return metro ?? "";
  if (!metro) return plant;
  const plantKey = plant.toLowerCase();
  const metroKey = metro.toLowerCase();
  if (plantKey === metroKey || plantKey.startsWith(`${metroKey},`)) {
    return plant;
  }
  return `${plant} · ${metro}`;
}

/** Named shops the desk mailed, with plant/metro. Not for buyer or shop UIs. */
export function deskMailedShopLines(
  job: Pick<SourceJob, "mailedTo">,
  shops: ShopPlaceSource[],
): string[] {
  return (job.mailedTo ?? []).map((mailed) => {
    const shop = matchMailedShop(mailed, shops);
    const place = formatDeskPlace(shop?.city, shop?.state);
    const name = mailed.company || mailed.email;
    return place ? `${name} (${place})` : name;
  });
}
