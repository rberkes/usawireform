import { FORMING_RATES } from "@/lib/price";
import { COMMON_SIZES, WIRE } from "@/lib/range";

export const QUOTE = {
  year: 2026,
  toolingMin: 2500,
  toolingMax: 6900,
  programming: 175,
  coilMinLbs: 1500,
  coilMaxLbs: 2500,
  exampleNonStockMm: 5.5,
} as const;

/** Instant estimate: same card as Ask — $1/cut, $0.50/bend, $0.05/in. */
export const ESTIMATE = {
  cut: FORMING_RATES.cutUsd,
  bend: FORMING_RATES.bendUsd,
  inch: FORMING_RATES.inchUsd,
  setup: 0,
  qtyMin: 100,
  qtyBreaks: [
    { qty: 1000, rate: 0.05 },
    { qty: 10000, rate: 0.1 },
  ],
} as const;

export const ESTIMATE_MATERIALS = [
  { id: "1018", label: "1010 carbon", stainless: false },
  { id: "galvanized", label: "Galvanized carbon", stainless: false },
  { id: "spring", label: "Medium / high carbon spring", stainless: false },
  { id: "304", label: "304 / 304L stainless", stainless: true },
  { id: "316", label: "316 / 316L stainless", stainless: true },
  { id: "330", label: "330 high-temp", stainless: true },
  { id: "6061", label: "6061-T6 aluminum", stainless: false },
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

export function quantityDiscount(qty: number) {
  if (!Number.isFinite(qty)) return 0;
  let rate = 0;
  for (const row of ESTIMATE.qtyBreaks) {
    if (qty >= row.qty) rate = row.rate;
  }
  return rate;
}

export function estimatePiece({
  bends,
  lengthIn,
  quantity,
  cuts = 1,
}: {
  diameterIn?: number;
  bends: number;
  lengthIn: number;
  stainless?: boolean;
  quantity: number;
  cuts?: number;
}) {
  const inchRate = FORMING_RATES.inchUsd;
  const cutCount = Number.isFinite(cuts) && cuts >= 0 ? cuts : 1;
  const forming = lengthIn * inchRate;
  const cut = cutCount * FORMING_RATES.cutUsd;
  const bendCost = bends * FORMING_RATES.bendUsd;
  const gross = forming + cut + bendCost;
  const discountRate = quantityDiscount(quantity);
  const piece = gross * (1 - discountRate);
  const qty = Number.isFinite(quantity) && quantity >= ESTIMATE.qtyMin ? quantity : 0;
  const setup = 0;
  return {
    inchRate,
    forming,
    cut,
    cutCount,
    bendCost,
    gross,
    discountRate,
    piece,
    setup,
    lot: piece * qty,
  };
}

export const toolingRange = `${usd(QUOTE.toolingMin)}–${usd(QUOTE.toolingMax)}`;
export const programmingFee = usd(QUOTE.programming);
export const coilMinRange = `${QUOTE.coilMinLbs.toLocaleString("en-US")}–${QUOTE.coilMaxLbs.toLocaleString("en-US")} lb`;
export const qtyBreakCopy = `${ESTIMATE.qtyMin} pc min. −5% at 1,000. −10% at 10,000.`;

export type InstantQuoteFields = {
  email: string;
  stockId: string;
  customMm: string;
  cuts: string;
  bends: string;
  lengthIn: string;
  materialId: string;
  qty: string;
};

export type InstantQuoteReady = {
  email: string;
  stock: boolean;
  diameterIn: number;
  diameterLabel: string;
  cuts: number;
  bends: number;
  lengthIn: number;
  materialId: EstimateMaterialId;
  materialLabel: string;
  quantity: number;
};

export function parseInstantQuote(
  fields: InstantQuoteFields,
): { ok: true; value: InstantQuoteReady } | { ok: false; message: string } {
  const email = fields.email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Enter a valid email to send the estimate." };
  }

  let stock = true;
  let diameterIn = 0;
  let diameterLabel = "";
  if (fields.stockId === "other") {
    const mm = Number(fields.customMm);
    if (!Number.isFinite(mm)) {
      return { ok: false, message: `Enter a diameter in ${WIRE.short}.` };
    }
    stock = false;
    diameterIn = mm / 25.4;
    diameterLabel = `${mm} mm`;
  } else {
    const size = COMMON_SIZES.find((row) => row.fraction === fields.stockId);
    if (!size) {
      return { ok: false, message: "Pick a wire diameter." };
    }
    diameterIn = Number.parseFloat(size.decimal);
    diameterLabel = `${size.fraction} (${size.mm}) — stock`;
  }
  if (diameterIn < WIRE.minIn || diameterIn > WIRE.maxIn) {
    return { ok: false, message: `${WIRE.short} only.` };
  }

  const cuts = Number(fields.cuts);
  const bends = Number(fields.bends);
  const lengthIn = Number(fields.lengthIn);
  const quantity = Number(fields.qty);
  if (!Number.isFinite(cuts) || cuts < 0) {
    return { ok: false, message: "Enter number of cuts." };
  }
  if (!Number.isFinite(bends) || bends < 0) {
    return { ok: false, message: "Enter number of bends." };
  }
  if (!Number.isFinite(lengthIn) || lengthIn <= 0) {
    return { ok: false, message: "Enter developed length in inches." };
  }
  if (!Number.isFinite(quantity) || quantity < ESTIMATE.qtyMin) {
    return { ok: false, message: `Quantity starts at ${ESTIMATE.qtyMin}.` };
  }

  const material = ESTIMATE_MATERIALS.find((row) => row.id === fields.materialId);
  if (!material) {
    return { ok: false, message: "Pick a material." };
  }

  return {
    ok: true,
    value: {
      email,
      stock,
      diameterIn,
      diameterLabel,
      cuts,
      bends,
      lengthIn,
      materialId: material.id,
      materialLabel: material.label,
      quantity,
    },
  };
}
