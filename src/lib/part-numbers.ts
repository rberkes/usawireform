import { PART_PREFIX } from "@/lib/company";

export { PART_PREFIX };

export type HookPartFamily = "V" | "S" | "C" | "SH" | "GS" | "CV" | "V90";

/** USAWF-V-180-12 — family, wire code, length in inches. */
export function usawfPart(
  family: HookPartFamily,
  wire: string,
  lengthIn: number,
) {
  const len = Number.isInteger(lengthIn)
    ? String(lengthIn).padStart(2, "0")
    : String(lengthIn).replace(".", "P");
  return `${PART_PREFIX}-${family}-${wire}-${len}`;
}

/** Published inch cards keep 180 / 250 / 375 so sizes still map. Metric is mm. */
export function hookWireCode(mm: number, dIn: number) {
  if (Math.abs(dIn - 0.18) < 1e-9) return "180";
  if (Math.abs(dIn - 0.25) < 1e-9) return "250";
  if (Math.abs(dIn - 0.162) < 1e-3) return "8";
  if (Math.abs(dIn - 0.375) < 1e-9) return "375";
  if (Math.abs(dIn - 0.4375) < 1e-9) return "438";
  if (Math.abs(dIn - 0.5) < 1e-9) return "500";
  if (Number.isInteger(mm)) return String(mm);
  return String(mm).replace(".", "");
}
