/** Shop-filed buyer-fit. Not a floor walk. Empty until the plant saves it. */

export const SOURCE_STOCK_MATERIALS = [
  { id: "1018", label: "1010 / 1018 carbon" },
  { id: "bright", label: "Bright basic / MBQ" },
  { id: "galvanized", label: "Galvanized carbon" },
  { id: "spring", label: "Spring / high carbon" },
  { id: "music", label: "Music wire" },
  { id: "304", label: "304 / 304L" },
  { id: "316", label: "316 / 316L" },
  { id: "330", label: "330 / N08330" },
  { id: "6061", label: "6061 aluminum" },
  { id: "brass", label: "Brass" },
  { id: "copper", label: "Copper" },
] as const;

export type SourceStockMaterialId = (typeof SOURCE_STOCK_MATERIALS)[number]["id"];

export const SOURCE_COIL_POLICIES = [
  {
    id: "shop-stock",
    label: "We buy and stock coil",
    hint: "Buyer can order without sending steel.",
  },
  {
    id: "customer-coil",
    label: "Customer coil only",
    hint: "Shop forms what you ship in.",
  },
  {
    id: "both",
    label: "Both",
    hint: "Stocked grades and customer coil.",
  },
] as const;

export type SourceCoilPolicyId = (typeof SOURCE_COIL_POLICIES)[number]["id"];

export const SOURCE_MIN_ORDER_KINDS = [
  { id: "none", label: "No piece minimum" },
  { id: "qty", label: "Piece minimum" },
] as const;

export type SourceMinOrderKind = (typeof SOURCE_MIN_ORDER_KINDS)[number]["id"];

export const SOURCE_SETUP_FEE_KINDS = [
  { id: "none", label: "No setup fee" },
  { id: "quoted", label: "Quoted per job" },
  { id: "fixed", label: "Fixed setup" },
] as const;

export type SourceSetupFeeKind = (typeof SOURCE_SETUP_FEE_KINDS)[number]["id"];

export const SOURCE_PROTOTYPE_POLICIES = [
  {
    id: "yes",
    label: "Yes — short runs and first articles",
  },
  {
    id: "quoted",
    label: "Quoted — not every print",
  },
  {
    id: "production",
    label: "Production lots only",
  },
] as const;

export type SourcePrototypePolicyId =
  (typeof SOURCE_PROTOTYPE_POLICIES)[number]["id"];

export type SourceBuyerFit = {
  minOrderKind?: SourceMinOrderKind;
  minOrderQty?: number;
  minOrderUsd?: number;
  setupFeeKind?: SourceSetupFeeKind;
  setupFeeUsd?: number;
  stockedMaterials?: SourceStockMaterialId[];
  coilPolicy?: SourceCoilPolicyId;
  /** Typical production queue after approval. */
  leadTimeWeeks?: number;
  /** Days to return a quote. */
  quoteDays?: number;
  prototypePolicy?: SourcePrototypePolicyId;
  rush?: boolean;
  acceptingRfqs?: boolean;
  ppap?: boolean;
};

function isStockId(value: string): value is SourceStockMaterialId {
  return SOURCE_STOCK_MATERIALS.some((row) => row.id === value);
}

function isCoilPolicy(value: string): value is SourceCoilPolicyId {
  return SOURCE_COIL_POLICIES.some((row) => row.id === value);
}

function isMinOrderKind(value: string): value is SourceMinOrderKind {
  return SOURCE_MIN_ORDER_KINDS.some((row) => row.id === value);
}

function isSetupFeeKind(value: string): value is SourceSetupFeeKind {
  return SOURCE_SETUP_FEE_KINDS.some((row) => row.id === value);
}

function isPrototypePolicy(value: string): value is SourcePrototypePolicyId {
  return SOURCE_PROTOTYPE_POLICIES.some((row) => row.id === value);
}

function parsePositiveInt(raw: unknown, max: number): number | undefined {
  const n =
    typeof raw === "number"
      ? raw
      : Number(String(raw ?? "").replace(/,/g, "").trim());
  if (!Number.isFinite(n) || n <= 0) return undefined;
  return Math.min(Math.round(n), max);
}

function parseYesNo(raw: unknown): boolean | undefined {
  const value = String(raw ?? "").trim().toLowerCase();
  if (value === "yes" || value === "true" || value === "1") return true;
  if (value === "no" || value === "false") return false;
  return undefined;
}

function parseBoolFlag(raw: unknown): boolean | undefined {
  const value = String(raw ?? "").trim().toLowerCase();
  if (value === "1" || value === "true" || value === "yes") return true;
  if (value === "0" || value === "false" || value === "no") return false;
  return undefined;
}

export function parseStockedMaterials(raw: unknown): SourceStockMaterialId[] {
  const values = Array.isArray(raw) ? raw : [];
  const ids: SourceStockMaterialId[] = [];
  for (const value of values) {
    const id = String(value ?? "").trim();
    if (isStockId(id) && !ids.includes(id)) ids.push(id);
  }
  return ids;
}

export function parseSourceBuyerFit(raw: unknown): SourceBuyerFit | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const payload = raw as Record<string, unknown>;
  const minOrderKind = isMinOrderKind(String(payload.minOrderKind ?? ""))
    ? (payload.minOrderKind as SourceMinOrderKind)
    : undefined;
  const setupFeeKind = isSetupFeeKind(String(payload.setupFeeKind ?? ""))
    ? (payload.setupFeeKind as SourceSetupFeeKind)
    : undefined;
  const coilPolicy = isCoilPolicy(String(payload.coilPolicy ?? ""))
    ? (payload.coilPolicy as SourceCoilPolicyId)
    : undefined;
  const prototypePolicy = isPrototypePolicy(String(payload.prototypePolicy ?? ""))
    ? (payload.prototypePolicy as SourcePrototypePolicyId)
    : undefined;
  const stockedMaterials = parseStockedMaterials(payload.stockedMaterials);
  const fit: SourceBuyerFit = {
    minOrderKind,
    minOrderQty:
      minOrderKind === "qty"
        ? parsePositiveInt(payload.minOrderQty, 10_000_000)
        : undefined,
    minOrderUsd: parsePositiveInt(payload.minOrderUsd, 10_000_000),
    setupFeeKind,
    setupFeeUsd:
      setupFeeKind === "fixed"
        ? parsePositiveInt(payload.setupFeeUsd, 1_000_000)
        : undefined,
    stockedMaterials: stockedMaterials.length > 0 ? stockedMaterials : undefined,
    coilPolicy,
    leadTimeWeeks: parsePositiveInt(payload.leadTimeWeeks, 52),
    quoteDays: parsePositiveInt(payload.quoteDays, 90),
    prototypePolicy,
    rush: parseBoolFlag(payload.rush) === true ? true : undefined,
    acceptingRfqs: parseYesNo(payload.acceptingRfqs),
    ppap: parseBoolFlag(payload.ppap) === true ? true : undefined,
  };
  return sourceFitIsEmpty(fit) ? undefined : fit;
}

export function readSourceFitForm(formData: FormData): SourceBuyerFit | undefined {
  return parseSourceBuyerFit({
    minOrderKind: String(formData.get("minOrderKind") ?? ""),
    minOrderQty: String(formData.get("minOrderQty") ?? ""),
    minOrderUsd: String(formData.get("minOrderUsd") ?? ""),
    setupFeeKind: String(formData.get("setupFeeKind") ?? ""),
    setupFeeUsd: String(formData.get("setupFeeUsd") ?? ""),
    stockedMaterials: formData.getAll("stock").map(String),
    coilPolicy: String(formData.get("coilPolicy") ?? ""),
    leadTimeWeeks: String(formData.get("leadTimeWeeks") ?? ""),
    quoteDays: String(formData.get("quoteDays") ?? ""),
    prototypePolicy: String(formData.get("prototypePolicy") ?? ""),
    rush: formData.get("rush") ? "1" : "0",
    acceptingRfqs: String(formData.get("acceptingRfqs") ?? ""),
    ppap: formData.get("ppap") ? "1" : "0",
  });
}

export function sourceFitIsEmpty(fit?: SourceBuyerFit | null): boolean {
  if (!fit) return true;
  return (
    !fit.minOrderKind &&
    fit.minOrderQty == null &&
    fit.minOrderUsd == null &&
    !fit.setupFeeKind &&
    fit.setupFeeUsd == null &&
    !(fit.stockedMaterials && fit.stockedMaterials.length > 0) &&
    !fit.coilPolicy &&
    fit.leadTimeWeeks == null &&
    fit.quoteDays == null &&
    !fit.prototypePolicy &&
    fit.rush !== true &&
    fit.acceptingRfqs == null &&
    fit.ppap !== true
  );
}

function usd(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

function pcs(qty: number) {
  return `${qty.toLocaleString("en-US")} pcs`;
}

export function stockLabel(id: string) {
  return SOURCE_STOCK_MATERIALS.find((row) => row.id === id)?.label ?? id;
}

export function formatMinOrder(fit?: SourceBuyerFit | null): string | undefined {
  if (!fit) return undefined;
  if (fit.minOrderKind === "none") {
    return fit.minOrderUsd ? `No piece min · ${usd(fit.minOrderUsd)} min` : "No piece minimum";
  }
  if (fit.minOrderKind === "qty" && fit.minOrderQty) {
    return fit.minOrderUsd
      ? `${pcs(fit.minOrderQty)} or ${usd(fit.minOrderUsd)}`
      : pcs(fit.minOrderQty);
  }
  if (fit.minOrderUsd) return `${usd(fit.minOrderUsd)} min`;
  return undefined;
}

export function formatSetupFee(fit?: SourceBuyerFit | null): string | undefined {
  if (!fit?.setupFeeKind) return undefined;
  if (fit.setupFeeKind === "none") return "None";
  if (fit.setupFeeKind === "quoted") return "Quoted per job";
  if (fit.setupFeeKind === "fixed" && fit.setupFeeUsd) return usd(fit.setupFeeUsd);
  if (fit.setupFeeKind === "fixed") return "Fixed — amount not filed";
  return undefined;
}

export function formatLeadTime(fit?: SourceBuyerFit | null): string | undefined {
  const weeks = fit?.leadTimeWeeks;
  if (weeks == null) return undefined;
  return weeks === 1 ? "About 1 week" : `About ${weeks} weeks`;
}

export function formatQuoteTime(fit?: SourceBuyerFit | null): string | undefined {
  const days = fit?.quoteDays;
  if (days == null) return undefined;
  return days === 1 ? "About 1 day" : `About ${days} days`;
}

export function formatCoilPolicy(fit?: SourceBuyerFit | null): string | undefined {
  if (!fit?.coilPolicy) return undefined;
  return SOURCE_COIL_POLICIES.find((row) => row.id === fit.coilPolicy)?.label;
}

export function formatStockedMaterials(
  fit?: SourceBuyerFit | null,
): string | undefined {
  const ids = fit?.stockedMaterials ?? [];
  if (ids.length === 0) return undefined;
  return ids.map(stockLabel).join(", ");
}

export function formatPrototypes(fit?: SourceBuyerFit | null): string | undefined {
  if (!fit?.prototypePolicy) return undefined;
  return SOURCE_PROTOTYPE_POLICIES.find((row) => row.id === fit.prototypePolicy)
    ?.label;
}

export function sourceFitSpecs(
  fit?: SourceBuyerFit | null,
): { label: string; value: string }[] {
  if (sourceFitIsEmpty(fit)) return [];
  const specs: { label: string; value: string }[] = [];
  const min = formatMinOrder(fit);
  if (min) specs.push({ label: "Minimum order", value: min });
  const setup = formatSetupFee(fit);
  if (setup) specs.push({ label: "Setup fee", value: setup });
  const stock = formatStockedMaterials(fit);
  if (stock) specs.push({ label: "Stocked materials", value: stock });
  const coil = formatCoilPolicy(fit);
  if (coil) specs.push({ label: "Coil", value: coil });
  const lead = formatLeadTime(fit);
  if (lead) specs.push({ label: "Typical lead", value: lead });
  const quote = formatQuoteTime(fit);
  if (quote) specs.push({ label: "Quote turnaround", value: quote });
  const proto = formatPrototypes(fit);
  if (proto) specs.push({ label: "Prototypes", value: proto });
  if (fit?.rush) specs.push({ label: "Rush", value: "Overtime / expedite available" });
  if (fit?.acceptingRfqs === true) {
    specs.push({ label: "New RFQs", value: "Accepting" });
  } else if (fit?.acceptingRfqs === false) {
    specs.push({ label: "New RFQs", value: "Not listing new work" });
  }
  if (fit?.ppap) specs.push({ label: "PPAP", value: "Available" });
  return specs;
}

export function sourceFitCardLine(fit?: SourceBuyerFit | null): string | undefined {
  if (sourceFitIsEmpty(fit)) return undefined;
  const bits = [
    formatMinOrder(fit),
    formatLeadTime(fit),
    formatStockedMaterials(fit),
    formatCoilPolicy(fit),
  ].filter(Boolean);
  return bits.length > 0 ? bits.join(" · ") : undefined;
}

export function formatFitWhy(
  fit: SourceBuyerFit | undefined,
  qty: number | null,
): string {
  if (sourceFitIsEmpty(fit) || !fit) return "";
  const bits: string[] = [];
  const min = formatMinOrder(fit);
  if (min) bits.push(`min ${min}`);
  if (
    qty != null &&
    fit.minOrderKind === "qty" &&
    fit.minOrderQty &&
    qty < fit.minOrderQty
  ) {
    bits.push("this lot is under the min");
  }
  const lead = formatLeadTime(fit);
  if (lead) bits.push(lead.toLowerCase());
  const coil = formatCoilPolicy(fit);
  if (coil) bits.push(coil.toLowerCase());
  if (fit.acceptingRfqs === false) bits.push("not listing new RFQs");
  return bits.join(" · ");
}

export function fitScoreAdjust(
  fit: SourceBuyerFit | undefined,
  qty: number | null,
): number {
  if (!fit) return 0;
  let score = 0;
  if (
    qty != null &&
    fit.minOrderKind === "qty" &&
    fit.minOrderQty &&
    qty < fit.minOrderQty
  ) {
    score -= 45;
  }
  if (fit.acceptingRfqs === false) score -= 70;
  return score;
}
