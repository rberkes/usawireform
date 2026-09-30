import { ESTIMATE, quantityDiscount } from "@/lib/quoting";
import { MATERIAL_MARKUP_RATE } from "@/lib/robomac/tables";

/** Shop-steel mill card: V, 90° V, CV, 90° CV. C and S stay customer coil. */
export const V_HOOK_SUPPLY = {
  /** Ask card only — not in the shop piece formula. */
  cutUsd: 1,
  /** Bends stay on the drawing. They are not billed on shop-steel hooks. */
  bendUsd: 0,
  /** 3/8 in forming inch rate. Heavier stock × (d / 0.375)². */
  inchUsd: 0.09,
  baseIn: 0.375,
  densityLbPerIn3: 0.2836,
  carbonUsdPerLb: 0.9,
  galvanizedUsdPerLb: 0.95,
  ss304UsdPerLb: 3.2,
  ss316UsdPerLb: 4.4,
} as const;

/** Same shop card as the 214TF twin: inch + material + 30% markup on material. */
export const V_HOOK_FORMULA =
  "piece = lengthIn×inchUsd + weightLb×materialUsdPerLb×(1 + 0.30)";

export function isShopSteelHook(type: string) {
  return type === "v" || type === "90v" || type === "cv" || type === "90cv";
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
}: {
  developedIn: number;
  diameterIn: number;
  quantity: number;
  materialId?: string;
  /** Ignored. Shop piece formula has no cut line. */
  cuts?: number;
}) {
  const inchRate = vHookInchUsd(diameterIn);
  const forming = developedIn * inchRate;
  const steelLb = vHookMassLb(developedIn, diameterIn);
  const steelUsdPerLb = vHookSteelUsdPerLb(materialId);
  const materialCostUsd = steelLb * steelUsdPerLb;
  const materialMarkupUsd = materialCostUsd * MATERIAL_MARKUP_RATE;
  const steelUsd = materialCostUsd;
  const gross = forming + materialCostUsd + materialMarkupUsd;
  const discountRate = quantityDiscount(quantity);
  const piece = gross * (1 - discountRate);
  const qty =
    Number.isFinite(quantity) && quantity >= ESTIMATE.qtyMin ? quantity : 0;
  return {
    formula: V_HOOK_FORMULA,
    inchRate,
    cut: 0,
    bendCost: 0,
    forming,
    subtotal: gross,
    materialCostUsd,
    materialMarkupUsd,
    materialMarkupRate: MATERIAL_MARKUP_RATE,
    beatRate: 0,
    beatUsd: 0,
    steelLb,
    steelUsd,
    steelUsdPerLb,
    shopSteel: true as const,
    gross,
    discountRate,
    piece,
    lot: piece * qty,
    areaRatio: (diameterIn / V_HOOK_SUPPLY.baseIn) ** 2,
  };
}
