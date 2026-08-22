import { SOURCE_KINDS } from "@/lib/source-types";

export type SourceIronPick = {
  name: string;
  series: string;
  kind: (typeof SOURCE_KINDS)[number];
  minMm: string;
  maxMm: string;
};

/** Numalliance wire CNC from their published machine pages (600 N/mm² tables). Confirm the plate. */
export const NUMALLIANCE_MACHINES: SourceIronPick[] = [
  { name: "Robomac R106TF", series: "Robomac TF", kind: "3D CNC", minMm: "2", maxMm: "6.35" },
  { name: "Robomac R108TF", series: "Robomac TF", kind: "3D CNC", minMm: "2.5", maxMm: "8" },
  { name: "Robomac R206TF", series: "Robomac TF", kind: "3D CNC", minMm: "2", maxMm: "6.35" },
  { name: "Robomac R208TF", series: "Robomac TF", kind: "3D CNC", minMm: "2.5", maxMm: "8" },
  { name: "Robomac R210TF", series: "Robomac TF", kind: "3D CNC", minMm: "3", maxMm: "10" },
  { name: "Robomac R213TF", series: "Robomac TF", kind: "3D CNC", minMm: "4", maxMm: "13" },
  { name: "Robomac R214TF", series: "Robomac TF", kind: "3D CNC", minMm: "4", maxMm: "14" },
  { name: "Robomac R216TF", series: "Robomac TF", kind: "3D CNC", minMm: "5", maxMm: "16" },
  { name: "Robomac R310TF", series: "Robomac TF", kind: "3D CNC", minMm: "3", maxMm: "10" },
  { name: "Robomac R106 e-Motion", series: "Robomac e-Motion", kind: "3D CNC", minMm: "2", maxMm: "6.35" },
  { name: "Robomac R206 e-Motion", series: "Robomac e-Motion", kind: "3D CNC", minMm: "2", maxMm: "6.35" },
  { name: "Robomac R210 e-Motion", series: "Robomac e-Motion", kind: "3D CNC", minMm: "3", maxMm: "10" },
  { name: "Robomac R212 e-Motion", series: "Robomac e-Motion", kind: "3D CNC", minMm: "4", maxMm: "12" },
  { name: "Robomac R310 e-Motion", series: "Robomac e-Motion", kind: "3D CNC", minMm: "3", maxMm: "10" },
  { name: "Robomac R213TFE", series: "Robomac TFE", kind: "3D CNC", minMm: "4", maxMm: "13" },
  { name: "Robomac R214TFE", series: "Robomac TFE", kind: "3D CNC", minMm: "4", maxMm: "14" },
  { name: "Robomac R216TFE", series: "Robomac TFE", kind: "3D CNC", minMm: "5", maxMm: "16" },
  { name: "Robomac 2-head R2104TF", series: "Robomac 2-head", kind: "3D CNC", minMm: "1.8", maxMm: "4" },
  { name: "Robomac 2-head R2105TF", series: "Robomac 2-head", kind: "3D CNC", minMm: "1.8", maxMm: "5" },
  { name: "Robomac 2-head R2106TF", series: "Robomac 2-head", kind: "3D CNC", minMm: "3", maxMm: "6" },
  { name: "Robomac 2-head R2108TF", series: "Robomac 2-head", kind: "3D CNC", minMm: "3", maxMm: "8" },
  { name: "Robomac 2-head R2110TF", series: "Robomac 2-head", kind: "3D CNC", minMm: "3.5", maxMm: "10" },
  { name: "Robomac 2-head R2112TF", series: "Robomac 2-head", kind: "3D CNC", minMm: "4", maxMm: "12" },
  { name: "FTX08 G4", series: "FTX", kind: "3D CNC", minMm: "2.5", maxMm: "8" },
  { name: "FTX10 G4", series: "FTX", kind: "3D CNC", minMm: "3", maxMm: "10" },
  { name: "FTX13 G4", series: "FTX", kind: "3D CNC", minMm: "4", maxMm: "13" },
  { name: "FTX13 G8", series: "FTX", kind: "3D CNC", minMm: "4", maxMm: "13" },
  { name: "FTX14 G8", series: "FTX", kind: "3D CNC", minMm: "4", maxMm: "14" },
  { name: "FTX16 G8", series: "FTX", kind: "3D CNC", minMm: "5", maxMm: "16" },
  { name: "F2D", series: "F2D", kind: "2D CNC", minMm: "3", maxMm: "12" },
  { name: "FRX04", series: "FRX", kind: "Spring CNC", minMm: "0.8", maxMm: "4" },
  { name: "FRX06", series: "FRX", kind: "Spring CNC", minMm: "1.2", maxMm: "6" },
];

/** WAFIOS wire and spring CNC from their published machine pages (600 N/mm² on bent cells). Confirm the plate. */
export const WAFIOS_MACHINES: SourceIronPick[] = [
  { name: "B 36", series: "B", kind: "3D CNC", minMm: "2", maxMm: "6.5" },
  { name: "B 4", series: "B", kind: "3D CNC", minMm: "3", maxMm: "8" },
  { name: "B 5", series: "B", kind: "3D CNC", minMm: "4", maxMm: "10" },
  { name: "BM 36 HighSpeed", series: "BM", kind: "3D CNC", minMm: "2", maxMm: "6.5" },
  { name: "BM 43 HighSpeed", series: "BM", kind: "3D CNC", minMm: "3", maxMm: "8" },
  { name: "BM 50", series: "BM", kind: "3D CNC", minMm: "4", maxMm: "10" },
  { name: "BM 60", series: "BM", kind: "3D CNC", minMm: "6", maxMm: "13" },
  { name: "BM 90", series: "BM", kind: "3D CNC", minMm: "8", maxMm: "16" },
  { name: "BMU 40", series: "BMU", kind: "3D CNC", minMm: "3", maxMm: "8" },
  { name: "BMU 50", series: "BMU", kind: "3D CNC", minMm: "4", maxMm: "10" },
  { name: "BMS 25", series: "BMS", kind: "3D CNC", minMm: "1.5", maxMm: "3.5" },
  { name: "BMS 36", series: "BMS", kind: "3D CNC", minMm: "2", maxMm: "6.5" },
  { name: "BMS 50", series: "BMS", kind: "3D CNC", minMm: "4", maxMm: "10" },
  { name: "BT 3.2", series: "BT", kind: "3D CNC", minMm: "2", maxMm: "6.5" },
  { name: "BT 3.4", series: "BT", kind: "3D CNC", minMm: "2", maxMm: "6.5" },
  { name: "BT 5.2", series: "BT", kind: "3D CNC", minMm: "4", maxMm: "10" },
  { name: "BQ 10", series: "BQ", kind: "Multi-slide", minMm: "3", maxMm: "10" },
  { name: "FMU 08+", series: "FMU+", kind: "Spring CNC", minMm: "0.2", maxMm: "0.8" },
  { name: "FMU 16+", series: "FMU+", kind: "Spring CNC", minMm: "0.4", maxMm: "1.6" },
  { name: "FMU 20+", series: "FMU+", kind: "Spring CNC", minMm: "0.4", maxMm: "2" },
  { name: "FMU 25+", series: "FMU+", kind: "Spring CNC", minMm: "0.8", maxMm: "2.5" },
  { name: "FMU 32+", series: "FMU+", kind: "Spring CNC", minMm: "0.8", maxMm: "3.2" },
  { name: "FMU 40+", series: "FMU+", kind: "Spring CNC", minMm: "1.8", maxMm: "4" },
  { name: "FMU 50+", series: "FMU+", kind: "Spring CNC", minMm: "1.8", maxMm: "5" },
  { name: "FMU 65+", series: "FMU+", kind: "Spring CNC", minMm: "2.8", maxMm: "6.5" },
  { name: "FMU 80+", series: "FMU+", kind: "Spring CNC", minMm: "2.8", maxMm: "8" },
  { name: "FMU 100+", series: "FMU+", kind: "Spring CNC", minMm: "4", maxMm: "10" },
  { name: "FUL 16+", series: "FUL", kind: "Spring CNC", minMm: "0.12", maxMm: "0.8" },
  { name: "FUL 26+", series: "FUL", kind: "Spring CNC", minMm: "0.2", maxMm: "1.6" },
  { name: "FUL 26+ 4speed", series: "FUL", kind: "Spring CNC", minMm: "0.5", maxMm: "1.6" },
  { name: "FUL 36+", series: "FUL", kind: "Spring CNC", minMm: "0.5", maxMm: "3" },
  { name: "FUL 36+ 4speed", series: "FUL", kind: "Spring CNC", minMm: "1", maxMm: "2.8" },
  { name: "FUL 46+", series: "FUL", kind: "Spring CNC", minMm: "0.9", maxMm: "4" },
  { name: "FUL 56+", series: "FUL", kind: "Spring CNC", minMm: "0.9", maxMm: "5" },
  { name: "FUL 76", series: "FUL", kind: "Spring CNC", minMm: "2.1", maxMm: "7.5" },
  { name: "FUL 86", series: "FUL", kind: "Spring CNC", minMm: "3.1", maxMm: "8" },
  { name: "FUL 126", series: "FUL", kind: "Spring CNC", minMm: "5.1", maxMm: "12" },
  { name: "FUL 166", series: "FUL", kind: "Spring CNC", minMm: "6.1", maxMm: "16" },
  { name: "FUL 175", series: "FUL", kind: "Spring CNC", minMm: "6.1", maxMm: "17" },
  { name: "FUL 183", series: "FUL", kind: "Spring CNC", minMm: "8.1", maxMm: "18" },
  { name: "FUL 203", series: "FUL", kind: "Spring CNC", minMm: "8.1", maxMm: "20" },
  { name: "FUL 226", series: "FUL", kind: "Spring CNC", minMm: "12.1", maxMm: "30" },
];

/** AIM AccuForm from their wire-capacity chart and product PDFs. Number is the size. Confirm the plate. */
export const AIM_MACHINES: SourceIronPick[] = [
  { name: "AFM-3D4", series: "AFM-3D", kind: "3D CNC", minMm: "2", maxMm: "4" },
  { name: "AFM-3D6", series: "AFM-3D", kind: "3D CNC", minMm: "2", maxMm: "6.35" },
  { name: "AFM-3D8", series: "AFM-3D", kind: "3D CNC", minMm: "2.7", maxMm: "8" },
  { name: "AFM-3D10", series: "AFM-3D", kind: "3D CNC", minMm: "4", maxMm: "10" },
  { name: "AFM-3D12", series: "AFM-3D", kind: "3D CNC", minMm: "4", maxMm: "12" },
  { name: "AFM-3D13", series: "AFM-3D", kind: "3D CNC", minMm: "5", maxMm: "13" },
  { name: "AFM-3D14", series: "AFM-3D", kind: "3D CNC", minMm: "6", maxMm: "14" },
  { name: "AFM-3D16", series: "AFM-3D", kind: "3D CNC", minMm: "6", maxMm: "16" },
  { name: "AFM-2D6", series: "AFM-2D", kind: "2D CNC", minMm: "2", maxMm: "6.35" },
  { name: "AFM-2D8", series: "AFM-2D", kind: "2D CNC", minMm: "2.7", maxMm: "8" },
  { name: "AFM-2D10", series: "AFM-2D", kind: "2D CNC", minMm: "4", maxMm: "10" },
  { name: "AFM-2D12", series: "AFM-2D", kind: "2D CNC", minMm: "4", maxMm: "12" },
  { name: "AFM-2D13", series: "AFM-2D", kind: "2D CNC", minMm: "5", maxMm: "13" },
  { name: "AFM-2D14", series: "AFM-2D", kind: "2D CNC", minMm: "6", maxMm: "14" },
  { name: "AFM-2D16", series: "AFM-2D", kind: "2D CNC", minMm: "6", maxMm: "16" },
  { name: "AFM-3DH6", series: "AFM-3DH", kind: "3D CNC", minMm: "2", maxMm: "6.5" },
  { name: "AFM-3DH8", series: "AFM-3DH", kind: "3D CNC", minMm: "2.7", maxMm: "8" },
  { name: "AFM-3DH10", series: "AFM-3DH", kind: "3D CNC", minMm: "4", maxMm: "10" },
  { name: "AFM-3DH12", series: "AFM-3DH", kind: "3D CNC", minMm: "4", maxMm: "12" },
  { name: "AFM-3DH14", series: "AFM-3DH", kind: "3D CNC", minMm: "6", maxMm: "14" },
  { name: "AFM-3DH16", series: "AFM-3DH", kind: "3D CNC", minMm: "6", maxMm: "16" },
  { name: "AFM-2DH6", series: "AFM-2DH", kind: "2D CNC", minMm: "2", maxMm: "6.35" },
  { name: "AFM-2DH8", series: "AFM-2DH", kind: "2D CNC", minMm: "2.7", maxMm: "8" },
  { name: "AFM-2DH10", series: "AFM-2DH", kind: "2D CNC", minMm: "4", maxMm: "10" },
  { name: "AFM-2DH12", series: "AFM-2DH", kind: "2D CNC", minMm: "4", maxMm: "12" },
  { name: "AFM-2DH14", series: "AFM-2DH", kind: "2D CNC", minMm: "6", maxMm: "14" },
  { name: "AFM-2DH16", series: "AFM-2DH", kind: "2D CNC", minMm: "6", maxMm: "16" },
  { name: "AFE-3D4", series: "AFE-3D", kind: "3D CNC", minMm: "2", maxMm: "4" },
  { name: "AFE-3D6", series: "AFE-3D", kind: "3D CNC", minMm: "2", maxMm: "6.35" },
  { name: "AFE-3D8", series: "AFE-3D", kind: "3D CNC", minMm: "2.7", maxMm: "8" },
  { name: "AFE-3D10", series: "AFE-3D", kind: "3D CNC", minMm: "4", maxMm: "10" },
  { name: "AFE-3D12", series: "AFE-3D", kind: "3D CNC", minMm: "4", maxMm: "12" },
  { name: "AFE-3D13", series: "AFE-3D", kind: "3D CNC", minMm: "4", maxMm: "13" },
  { name: "AFE-2D4", series: "AFE-2D", kind: "2D CNC", minMm: "2", maxMm: "4" },
  { name: "AFE-2D6", series: "AFE-2D", kind: "2D CNC", minMm: "2", maxMm: "6.35" },
  { name: "AFE-2D8", series: "AFE-2D", kind: "2D CNC", minMm: "2.7", maxMm: "8" },
  { name: "AFE-2D10", series: "AFE-2D", kind: "2D CNC", minMm: "4", maxMm: "10" },
  { name: "AFE-2D12", series: "AFE-2D", kind: "2D CNC", minMm: "4", maxMm: "12" },
  { name: "AFC-3D4", series: "AFC-3D", kind: "3D CNC", minMm: "2", maxMm: "4" },
  { name: "AFC-3D6", series: "AFC-3D", kind: "3D CNC", minMm: "2", maxMm: "6.35" },
  { name: "AFC-3D8", series: "AFC-3D", kind: "3D CNC", minMm: "2.7", maxMm: "8" },
  { name: "AFC-3D10", series: "AFC-3D", kind: "3D CNC", minMm: "4", maxMm: "10" },
  { name: "AFC-2D4", series: "AFC-2D", kind: "2D CNC", minMm: "2", maxMm: "4" },
  { name: "AFC-2D6", series: "AFC-2D", kind: "2D CNC", minMm: "2", maxMm: "6.35" },
  { name: "AFC-2D8", series: "AFC-2D", kind: "2D CNC", minMm: "2.7", maxMm: "8" },
  { name: "AFC-2D10", series: "AFC-2D", kind: "2D CNC", minMm: "4", maxMm: "10" },
  { name: "AFCe-8", series: "AFCe", kind: "3D CNC", minMm: "2.7", maxMm: "8" },
  { name: "AFCe-10", series: "AFCe", kind: "3D CNC", minMm: "4", maxMm: "10" },
  { name: "Gemini Twin", series: "Gemini", kind: "3D CNC", minMm: "", maxMm: "" },
];

export const SOURCE_OEM_NAMES = [
  "Numalliance",
  "WAFIOS",
  "AIM Inc.",
  "Itaya Engineering",
  "Otto Bihler Maschinenfabrik",
  "BLM GROUP",
  "Simplex Rapid",
  "Pave Engineering",
  "Fortuna Spezialmaschinen",
  "Whitelegg Machines",
  "Other",
];

export function machinesForOem(oem: string): SourceIronPick[] {
  const key = oem.trim().toLowerCase();
  if (key === "numalliance") return NUMALLIANCE_MACHINES;
  if (key === "wafios") return WAFIOS_MACHINES;
  if (key === "aim inc." || key === "aim") return AIM_MACHINES;
  return [];
}

export function ironPickByName(
  oem: string,
  model: string,
): SourceIronPick | undefined {
  return machinesForOem(oem).find((row) => row.name === model);
}

export function ironSeries(machines: SourceIronPick[]): string[] {
  return [...new Set(machines.map((row) => row.series))];
}
