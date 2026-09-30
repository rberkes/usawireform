import { formingRatesFor, MATERIAL_MARKUP_RATE } from "./tables";
import type { RobomacPieceQuote } from "./types";

/** Shop card: per-inch forming + material + 30% markup on material. */
export const QUOTE_FORMULA =
  "piece = lengthIn×inchUsd + weightLb×materialUsdPerLb×(1 + 0.30)";

export function quoteRobomacPiece(input: {
  materialId: string;
  lengthIn: number;
  weightLb?: number;
  /** Later input. Overrides a filed card when present. */
  materialUsdPerLb?: number;
}): RobomacPieceQuote {
  const rates = formingRatesFor(input.materialId);
  const materialUsdPerLb = input.materialUsdPerLb ?? rates.materialUsdPerLb;
  const materialFiled = materialUsdPerLb != null;
  const weightLb =
    input.weightLb != null && Number.isFinite(input.weightLb)
      ? input.weightLb
      : undefined;
  const formingFiled = rates.inchUsd != null;

  if (!formingFiled) {
    return {
      materialId: rates.materialId,
      formula: QUOTE_FORMULA,
      lengthIn: input.lengthIn,
      weightLb,
      materialUsdPerLb,
      materialMarkupRate: MATERIAL_MARKUP_RATE,
      formingFiled: false,
      materialFiled,
      materialPending: !materialFiled,
      note: rates.note,
    };
  }

  const formingUsd = input.lengthIn * (rates.inchUsd ?? 0);
  const materialCostUsd =
    materialFiled && weightLb != null ? weightLb * materialUsdPerLb : undefined;
  const materialMarkupUsd =
    materialCostUsd != null ? materialCostUsd * MATERIAL_MARKUP_RATE : undefined;
  const materialUsd =
    materialCostUsd != null && materialMarkupUsd != null
      ? materialCostUsd + materialMarkupUsd
      : undefined;
  const pieceUsd =
    materialUsd != null ? formingUsd + materialUsd : formingUsd;

  return {
    materialId: rates.materialId,
    formula: QUOTE_FORMULA,
    lengthIn: input.lengthIn,
    weightLb,
    inchUsd: rates.inchUsd,
    materialUsdPerLb,
    materialMarkupRate: MATERIAL_MARKUP_RATE,
    formingUsd: roundUsd(formingUsd),
    materialCostUsd: materialCostUsd != null ? roundUsd(materialCostUsd) : undefined,
    materialMarkupUsd:
      materialMarkupUsd != null ? roundUsd(materialMarkupUsd) : undefined,
    materialUsd: materialUsd != null ? roundUsd(materialUsd) : undefined,
    pieceUsd: roundUsd(pieceUsd),
    formingFiled: true,
    materialFiled,
    materialPending: !materialFiled || weightLb == null,
    note:
      materialFiled && weightLb != null
        ? rates.note
        : "Inch rate only. Plug material $/lb and pounds in later — then 30% markup applies to material.",
  };
}

function roundUsd(n: number) {
  return Math.round(n * 100) / 100;
}
