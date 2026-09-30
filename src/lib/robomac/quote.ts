import { formingRatesFor } from "./tables";
import type { RobomacPieceQuote } from "./types";

/** Desk formula. Material $/lb is an input — file it later per alloy. */
export const QUOTE_FORMULA =
  "piece = cuts×cutUsd + bends×bendUsd + lengthIn×inchUsd + weightLb×materialUsdPerLb";

export function quoteRobomacPiece(input: {
  materialId: string;
  cuts: number;
  bends: number;
  lengthIn: number;
  weightLb?: number;
  /** Later input. Overrides a filed card when present. */
  materialUsdPerLb?: number;
}): RobomacPieceQuote {
  const rates = formingRatesFor(input.materialId);
  const materialUsdPerLb =
    input.materialUsdPerLb ?? rates.materialUsdPerLb;
  const materialFiled = materialUsdPerLb != null;
  const weightLb =
    input.weightLb != null && Number.isFinite(input.weightLb)
      ? input.weightLb
      : undefined;

  if (!rates.formingFiled) {
    return {
      materialId: rates.materialId,
      formula: QUOTE_FORMULA,
      cuts: input.cuts,
      bends: input.bends,
      lengthIn: input.lengthIn,
      weightLb,
      materialUsdPerLb,
      formingFiled: false,
      materialFiled,
      materialPending: !materialFiled,
      note: rates.note,
    };
  }

  const formingUsd =
    input.cuts * (rates.cutUsd ?? 0) +
    input.bends * (rates.bendUsd ?? 0) +
    input.lengthIn * (rates.inchUsd ?? 0);
  const materialUsd =
    materialFiled && weightLb != null ? weightLb * materialUsdPerLb : undefined;
  const pieceUsd =
    materialUsd != null ? formingUsd + materialUsd : formingUsd;

  return {
    materialId: rates.materialId,
    formula: QUOTE_FORMULA,
    cuts: input.cuts,
    bends: input.bends,
    lengthIn: input.lengthIn,
    weightLb,
    cutUsd: rates.cutUsd,
    bendUsd: rates.bendUsd,
    inchUsd: rates.inchUsd,
    materialUsdPerLb,
    formingUsd: roundUsd(formingUsd),
    materialUsd: materialUsd != null ? roundUsd(materialUsd) : undefined,
    pieceUsd: roundUsd(pieceUsd),
    formingFiled: true,
    materialFiled,
    materialPending: !materialFiled || weightLb == null,
    note: materialFiled && weightLb != null
      ? rates.note
      : "Forming only. Plug material $/lb and pounds into the formula when you have them.",
  };
}

function roundUsd(n: number) {
  return Math.round(n * 100) / 100;
}
