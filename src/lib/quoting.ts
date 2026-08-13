export const QUOTE = {
  year: 2026,
  toolingMin: 2500,
  toolingMax: 6900,
  programming: 125,
  coilMinLbs: 1500,
  coilMaxLbs: 2500,
  exampleNonStockMm: 5.5,
} as const;

/** Instant estimate: cut + forming by the inch. Job fees are once per lot. */
export const ESTIMATE = {
  cut: 2,
  bend: 1,
  setup: 125,
  diameterChange: 125,
  coilChange: 75,
  qtyBreak: 1000,
  qtyDiscount: 0.05,
  qtyDiscountCap: 0.15,
} as const;

/** Carbon forming rate by stock diameter. Stainless is 2×. */
export const INCH_RATES = [
  { diameterIn: 0.375, label: "3/8 in", carbon: 0.09 },
  { diameterIn: 0.4375, label: "7/16 in", carbon: 0.1 },
  { diameterIn: 0.5, label: "1/2 in", carbon: 0.11 },
] as const;

export const ESTIMATE_MATERIALS = [
  { id: "1018", label: "1010 carbon", stainless: false },
  { id: "galvanized", label: "Galvanized carbon", stainless: false },
  { id: "spring", label: "Medium / high carbon spring", stainless: false },
  { id: "304", label: "304 / 304L stainless", stainless: true },
  { id: "316", label: "316 / 316L stainless", stainless: true },
  { id: "330", label: "330 high-temp", stainless: true },
  { id: "brass", label: "Brass", stainless: false },
  { id: "copper", label: "Copper", stainless: false },
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

export function carbonPerInch(diameterIn: number) {
  const exact = INCH_RATES.find(
    (row) => Math.abs(row.diameterIn - diameterIn) < 1e-6,
  );
  if (exact) return exact.carbon;
  const rate = 0.09 + (diameterIn - 0.375) * (0.01 / 0.0625);
  return Math.round(Math.max(rate, 0.01) * 100) / 100;
}

export function formingPerInch(diameterIn: number, stainless: boolean) {
  const carbon = carbonPerInch(diameterIn);
  return stainless ? Math.round(carbon * 2 * 100) / 100 : carbon;
}

export function quantityDiscount(qty: number) {
  if (!Number.isFinite(qty) || qty < ESTIMATE.qtyBreak) return 0;
  return Math.min(
    Math.floor(qty / ESTIMATE.qtyBreak) * ESTIMATE.qtyDiscount,
    ESTIMATE.qtyDiscountCap,
  );
}

export function estimatePiece({
  diameterIn,
  bends,
  lengthIn,
  stainless,
  quantity,
  diameterChange = false,
  coilChange = false,
}: {
  diameterIn: number;
  bends: number;
  lengthIn: number;
  stainless: boolean;
  quantity: number;
  diameterChange?: boolean;
  coilChange?: boolean;
}) {
  const inchRate = formingPerInch(diameterIn, stainless);
  const forming = lengthIn * inchRate;
  const cut = ESTIMATE.cut;
  const bendCost = bends * ESTIMATE.bend;
  const gross = forming + cut + bendCost;
  const discountRate = quantityDiscount(quantity);
  const piece = gross * (1 - discountRate);
  const qty = Number.isFinite(quantity) && quantity > 0 ? quantity : 0;
  const setup = ESTIMATE.setup;
  const diameterFee = diameterChange ? ESTIMATE.diameterChange : 0;
  const coilFee = coilChange ? ESTIMATE.coilChange : 0;
  const jobFees = setup + diameterFee + coilFee;
  return {
    inchRate,
    forming,
    cut,
    bendCost,
    gross,
    discountRate,
    piece,
    setup,
    diameterFee,
    coilFee,
    jobFees,
    lot: piece * qty + jobFees,
  };
}

export const toolingRange = `${usd(QUOTE.toolingMin)}–${usd(QUOTE.toolingMax)}`;
export const programmingFee = usd(ESTIMATE.setup);
export const diameterChangeFee = usd(ESTIMATE.diameterChange);
export const coilChangeFee = usd(ESTIMATE.coilChange);
export const coilMinRange = `${QUOTE.coilMinLbs.toLocaleString("en-US")}–${QUOTE.coilMaxLbs.toLocaleString("en-US")} lb`;
