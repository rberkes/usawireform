import { ESTIMATE, quantityDiscount } from "@/lib/quoting";
import { V_HOOK_SUPPLY } from "@/lib/v-hook-price";
import { quoteRobomacPiece } from "./quote";
import { MATERIALS } from "./tables";
import type { DfmResult, RobomacPieceQuote, WireFormGeometry } from "./types";

/** Carbon mass only. Same lb/in³ as the V-hook mill card. Do not invent 304 / 330 / 6061 density. */
export const CARBON_DENSITY_LB_PER_IN3 = V_HOOK_SUPPLY.densityLbPerIn3;

export function materialFamilyId(materialId: string) {
  const want = materialId.trim().toLowerCase();
  const family = MATERIALS.find(
    (row) =>
      row.id === materialId ||
      row.alloys.some((alloy) => alloy.toLowerCase() === want),
  );
  return family?.id ?? materialId;
}

/** 1018 / galvanized only. Other alloys stay unknown until a density is filed. */
export function carbonWeightLb(
  lengthIn: number,
  diameterIn: number,
  materialId: string,
): number | undefined {
  const id = materialFamilyId(materialId);
  if (id !== "1018") return undefined;
  if (!(lengthIn > 0) || !(diameterIn > 0)) return undefined;
  const radius = diameterIn / 2;
  return lengthIn * Math.PI * radius * radius * CARBON_DENSITY_LB_PER_IN3;
}

export type CadDfmPriced = {
  quote: RobomacPieceQuote;
  quantity: number;
  discountRate: number;
  /** After qty break. Absent when DFM FAIL or no filed inch rate. */
  pieceUsd?: number;
  lotUsd?: number;
  buyable: boolean;
  lengthIn: number;
  diameterIn: number;
  diameterLabel: string;
  weightLb?: number;
};

function roundUsd(n: number) {
  return Math.round(n * 100) / 100;
}

/**
 * Public CAD card: shop formula + InstantQuote qty breaks.
 * FAIL is not a buyable price. REVIEW can quote when an inch rate is filed.
 * Does not use the $0.09 hook mill card.
 */
export function priceCadDfm(
  geometry: WireFormGeometry,
  dfm: DfmResult,
  quantity: number,
): CadDfmPriced {
  const lengthIn = dfm.developedLengthMm / 25.4;
  const diameterIn = geometry.diameterMm / 25.4;
  const weightLb = carbonWeightLb(lengthIn, diameterIn, geometry.materialId);
  const quote = quoteRobomacPiece({
    materialId: geometry.materialId,
    lengthIn,
    weightLb,
  });
  const qtyOk = Number.isFinite(quantity) && quantity >= ESTIMATE.qtyMin;
  const qty = qtyOk ? quantity : 0;
  const discountRate = quantityDiscount(quantity);
  const buyable = dfm.status !== "FAIL" && quote.pieceUsd != null;
  const pieceUsd =
    buyable && quote.pieceUsd != null
      ? roundUsd(quote.pieceUsd * (1 - discountRate))
      : undefined;
  const lotUsd = pieceUsd != null && qty > 0 ? roundUsd(pieceUsd * qty) : undefined;
  return {
    quote,
    quantity: qty || quantity,
    discountRate,
    pieceUsd,
    lotUsd,
    buyable,
    lengthIn,
    diameterIn,
    diameterLabel: `${diameterIn.toFixed(3)} in (${geometry.diameterMm.toFixed(1)} mm)`,
    weightLb,
  };
}
