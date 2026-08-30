import { priceVHook, vHookInchUsd } from "@/lib/v-hook-price";

export const HEAVY_DUTY_BASE_IN = 0.375;

export const HEAVY_DUTY_V_SIZES = [
  {
    id: "3-8",
    stockId: "3/8 in",
    label: '3/8"',
    inches: 0.375,
    mm: 9.53,
    formula: "base",
    rateCopy: "$0.09 per developed inch + steel, then 5% off",
  },
  {
    id: "7-16",
    stockId: "7/16 in",
    label: '7/16"',
    inches: 0.4375,
    mm: 11.11,
    formula: "area",
    rateCopy: "3/8 in rate × (7/16 ÷ 3/8)² + steel, then 5% off",
  },
  {
    id: "1-2",
    stockId: "1/2 in",
    label: '1/2"',
    inches: 0.5,
    mm: 12.7,
    formula: "area",
    rateCopy: "3/8 in rate × (1/2 ÷ 3/8)² + steel, then 5% off",
  },
] as const;

export type HeavyDutyVSizeId = (typeof HEAVY_DUTY_V_SIZES)[number]["id"];

export function heavyDutyInchUsd(diameterIn: number) {
  return vHookInchUsd(diameterIn);
}

export function priceHeavyDutyV({
  developedIn,
  quantity,
  diameterIn,
  materialId = "1018",
}: {
  developedIn: number;
  cuts?: number;
  bends?: number;
  quantity: number;
  diameterIn: number;
  materialId?: string;
}) {
  return priceVHook({
    developedIn,
    diameterIn,
    quantity,
    materialId,
  });
}
