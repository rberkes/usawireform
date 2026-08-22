import { ESTIMATE, quantityDiscount } from "@/lib/quoting";

/** V-hooks only: shop buys the wire. Other forms stay customer coil. */
export const V_HOOK_SUPPLY = {
  cutUsd: 1,
  /** Bends stay on the drawing. They are not billed on V-hooks. */
  bendUsd: 0,
  /** 3/8 in forming inch rate. Heavier stock × (d / 0.375)². */
  inchUsd: 0.09,
  /** 5% under boxed 0.375 in V-hooks. 7/16 and 1/2 inherit the same card. */
  beatRate: 0.05,
  baseIn: 0.375,
  densityLbPerIn3: 0.2836,
  carbonUsdPerLb: 0.9,
  galvanizedUsdPerLb: 0.95,
  ss304UsdPerLb: 3.2,
  ss316UsdPerLb: 4.4,
} as const;

export function isShopSteelHook(type: string) {
  return type === "v" || type === "90v";
}

export function vHookInchUsd(diameterIn: number) {
  const ratio = diameterIn / V_HOOK_SUPPLY.baseIn;
  return V_HOOK_SUPPLY.inchUsd * ratio * ratio;
}

export function vHookSteelUsdPerLb(materialId: string) {
  if (materialId === "304") return V_HOOK_SUPPLY.ss304UsdPerLb;
  if (materialId === "316") return V_HOOK_SUPPLY.ss316UsdPerLb;
  if (materialId === "galvanized") return V_HOOK_SUPPLY.galvanizedUsdPerLb;
  return V_HOOK_SUPPLY.carbonUsdPerLb;
}

export function vHookMassLb(developedIn: number, diameterIn: number) {
  const radius = diameterIn / 2;
  return developedIn * Math.PI * radius * radius * V_HOOK_SUPPLY.densityLbPerIn3;
}

export function priceVHook({
  developedIn,
  diameterIn,
  quantity,
  materialId = "1018",
  cuts = 1,
}: {
  developedIn: number;
  diameterIn: number;
  quantity: number;
  materialId?: string;
  cuts?: number;
}) {
  const inchRate = vHookInchUsd(diameterIn);
  const cut = cuts * V_HOOK_SUPPLY.cutUsd;
  const forming = cut + developedIn * inchRate;
  const steelLb = vHookMassLb(developedIn, diameterIn);
  const steelUsd = steelLb * vHookSteelUsdPerLb(materialId);
  const subtotal = forming + steelUsd;
  const beatUsd = subtotal * V_HOOK_SUPPLY.beatRate;
  const gross = subtotal - beatUsd;
  const discountRate = quantityDiscount(quantity);
  const piece = gross * (1 - discountRate);
  const qty =
    Number.isFinite(quantity) && quantity >= ESTIMATE.qtyMin ? quantity : 0;
  return {
    inchRate,
    cut,
    bendCost: 0,
    forming,
    subtotal,
    beatRate: V_HOOK_SUPPLY.beatRate,
    beatUsd,
    steelLb,
    steelUsd,
    steelUsdPerLb: vHookSteelUsdPerLb(materialId),
    shopSteel: true as const,
    gross,
    discountRate,
    piece,
    lot: piece * qty,
    areaRatio: (diameterIn / V_HOOK_SUPPLY.baseIn) ** 2,
  };
}
