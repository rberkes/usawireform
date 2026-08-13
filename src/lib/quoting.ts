export const QUOTE = {
  year: 2026,
  toolingMin: 2500,
  toolingMax: 6900,
  programming: 175,
  coilMinLbs: 1500,
  coilMaxLbs: 2500,
  exampleNonStockMm: 5.5,
} as const;

export function usd(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export const toolingRange = `${usd(QUOTE.toolingMin)}–${usd(QUOTE.toolingMax)}`;
export const programmingFee = usd(QUOTE.programming);
export const coilMinRange = `${QUOTE.coilMinLbs.toLocaleString("en-US")}–${QUOTE.coilMaxLbs.toLocaleString("en-US")} lb`;
