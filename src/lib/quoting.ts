export const QUOTE = {
  year: 2026,
  toolingMin: 2500,
  toolingMax: 6900,
  programming: 175,
  coilMinLbs: 1500,
  coilMaxLbs: 2500,
  exampleNonStockMm: 5.5,
} as const;

/** Shop-rate estimate: cut, bend, and wire. Secondaries and tooling are extra. */
export const ESTIMATE = {
  cut: 2,
  bend: 1,
  inch: 0.45,
  baseDiameterIn: 0.375,
} as const;

export const ESTIMATE_MATERIALS = [
  { id: "1018", label: "1010 / 1018 carbon", factor: 1 },
  { id: "galvanized", label: "Galvanized carbon", factor: 1.15 },
  { id: "spring", label: "Medium / high carbon spring", factor: 1.4 },
  { id: "304", label: "304 / 304L stainless", factor: 2.5 },
  { id: "316", label: "316 / 316L stainless", factor: 3.2 },
  { id: "330", label: "330 high-temp", factor: 4.5 },
  { id: "brass", label: "Brass", factor: 3 },
  { id: "copper", label: "Copper", factor: 3.8 },
] as const;

export type EstimateMaterialId = (typeof ESTIMATE_MATERIALS)[number]["id"];

export function usd(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function usd2(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function diameterFactor(diameterIn: number) {
  if (diameterIn <= 0) return 0;
  return (diameterIn / ESTIMATE.baseDiameterIn) ** 2;
}

export function estimatePiece({
  diameterIn,
  bends,
  lengthIn,
  materialFactor,
}: {
  diameterIn: number;
  bends: number;
  lengthIn: number;
  materialFactor: number;
}) {
  const wire =
    lengthIn * ESTIMATE.inch * diameterFactor(diameterIn) * materialFactor;
  const bendCost = bends * ESTIMATE.bend;
  const cut = ESTIMATE.cut;
  return {
    wire,
    bendCost,
    cut,
    piece: wire + bendCost + cut,
  };
}

export const toolingRange = `${usd(QUOTE.toolingMin)}–${usd(QUOTE.toolingMax)}`;
export const programmingFee = usd(QUOTE.programming);
export const coilMinRange = `${QUOTE.coilMinLbs.toLocaleString("en-US")}–${QUOTE.coilMaxLbs.toLocaleString("en-US")} lb`;
