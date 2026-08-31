import { SOURCE_KINDS, type SourceMachine } from "@/lib/source-types";

export type SourceIronPick = {
  name: string;
  series: string;
  kind: (typeof SOURCE_KINDS)[number];
  minMm: string;
  maxMm: string;
  /** Plate wire cap in inches when shops file 4-slide / pneumatic cells. */
  maxIn?: string;
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

/** U.S. Baird four-slide / multi-slide from Surplus Record plates and published shop tables. Confirm the plate. */
export const BAIRD_MACHINES: SourceIronPick[] = [
  { name: "#00", series: "Four-slide", kind: "Fourslide", minMm: "0.2", maxMm: "0.81", maxIn: "1/32" },
  { name: "#0", series: "Four-slide", kind: "Fourslide", minMm: "0.2", maxMm: "0.81", maxIn: "1/32" },
  { name: "#1", series: "Four-slide", kind: "Fourslide", minMm: "0.4", maxMm: "2.36", maxIn: "3/32" },
  { name: "RWI", series: "Four-slide", kind: "Fourslide", minMm: "0.4", maxMm: "2.36", maxIn: "3/32" },
  { name: "#2", series: "Four-slide", kind: "Fourslide", minMm: "0.8", maxMm: "3.18", maxIn: "1/8" },
  { name: "#3", series: "Four-slide", kind: "Fourslide", minMm: "1", maxMm: "4.76", maxIn: "3/16" },
  { name: "#3-24", series: "Four-slide", kind: "Fourslide", minMm: "1", maxMm: "4.76", maxIn: "3/16" },
  { name: "#4", series: "Four-slide", kind: "Fourslide", minMm: "1.5", maxMm: "7.94", maxIn: "5/16" },
  { name: "#4-30", series: "Four-slide", kind: "Fourslide", minMm: "1.5", maxMm: "6.35", maxIn: "1/4" },
  { name: "#4-36", series: "Four-slide", kind: "Fourslide", minMm: "1.5", maxMm: "6.35", maxIn: "1/4" },
  { name: "#5", series: "Four-slide", kind: "Fourslide", minMm: "2", maxMm: "7.94", maxIn: "5/16" },
  { name: "#8", series: "Four-slide", kind: "Fourslide", minMm: "3", maxMm: "12.7", maxIn: "1/2" },
  { name: "#11", series: "Multi-slide", kind: "Multi-slide", minMm: "0.4", maxMm: "0.8", maxIn: "1/32" },
  { name: "#28", series: "Multi-slide", kind: "Multi-slide", minMm: "0.5", maxMm: "1.59", maxIn: "1/16" },
  { name: "#33", series: "Multi-slide", kind: "Multi-slide", minMm: "0.8", maxMm: "2.38", maxIn: "3/32" },
  { name: "#35", series: "Multi-slide", kind: "Multi-slide", minMm: "0.8", maxMm: "2.38", maxIn: "3/32" },
];

/** Nilson four-slide from Surplus Record plates and published shop tables. Confirm the plate. */
export const NILSON_MACHINES: SourceIronPick[] = [
  { name: "S-00", series: "S", kind: "Fourslide", minMm: "0.2", maxMm: "0.81", maxIn: "1/32" },
  { name: "#00", series: "S", kind: "Fourslide", minMm: "0.2", maxMm: "0.81", maxIn: "1/32" },
  { name: "S-0", series: "S", kind: "Fourslide", minMm: "0.4", maxMm: "1.59", maxIn: "1/16" },
  { name: "#0", series: "S", kind: "Fourslide", minMm: "0.4", maxMm: "1.59", maxIn: "1/16" },
  { name: "S-1", series: "S", kind: "Fourslide", minMm: "0.5", maxMm: "2.36", maxIn: "3/32" },
  { name: "#1", series: "S", kind: "Fourslide", minMm: "0.5", maxMm: "2.36", maxIn: "3/32" },
  { name: "1F", series: "F", kind: "Fourslide", minMm: "0.5", maxMm: "2.36", maxIn: "3/32" },
  { name: "S-2", series: "S", kind: "Fourslide", minMm: "0.8", maxMm: "3.18", maxIn: "1/8" },
  { name: "#2", series: "S", kind: "Fourslide", minMm: "0.8", maxMm: "3.18", maxIn: "1/8" },
  { name: "S-2F", series: "F", kind: "Fourslide", minMm: "0.8", maxMm: "3.18", maxIn: "1/8" },
  { name: "S-3", series: "S", kind: "Fourslide", minMm: "1", maxMm: "4.76", maxIn: "3/16" },
  { name: "#3", series: "S", kind: "Fourslide", minMm: "1", maxMm: "4.76", maxIn: "3/16" },
  { name: "3F", series: "F", kind: "Fourslide", minMm: "1", maxMm: "4.76", maxIn: "3/16" },
  { name: "S-3F", series: "F", kind: "Fourslide", minMm: "1", maxMm: "4.75", maxIn: "3/16" },
  { name: "S3-26", series: "F", kind: "Fourslide", minMm: "1", maxMm: "4.76", maxIn: "3/16" },
];

/** Lubow (often listed Lebow) pneumatic table benders. Confirm the plate. */
export const LUBOW_MACHINES: SourceIronPick[] = [
  { name: "4SA 4-head", series: "Multi-head", kind: "Manual pneumatic", minMm: "1.5", maxMm: "9.53", maxIn: "3/8" },
  { name: "ML6 table bender", series: "Table", kind: "Manual pneumatic", minMm: "", maxMm: "" },
  { name: "ML 200 turret", series: "Table", kind: "Manual pneumatic", minMm: "", maxMm: "" },
  { name: "WBR 1 table bender", series: "Table", kind: "Manual pneumatic", minMm: "", maxMm: "" },
  { name: "DW132 table bender", series: "Table", kind: "Manual pneumatic", minMm: "", maxMm: "" },
  { name: "DWB 48 double bender", series: "Table", kind: "Manual pneumatic", minMm: "", maxMm: "" },
];

/** Bihler stamp-and-form. Wire band is per tool — shop files the plate. */
export const BIHLER_MACHINES: SourceIronPick[] = [
  { name: "GRM-NC", series: "GRM", kind: "Multi-slide", minMm: "", maxMm: "" },
  { name: "GRM 80", series: "GRM", kind: "Multi-slide", minMm: "", maxMm: "" },
  { name: "RM 40", series: "RM", kind: "Multi-slide", minMm: "", maxMm: "" },
  { name: "BIMERIC", series: "BIMERIC", kind: "Multi-slide", minMm: "", maxMm: "" },
];

export const SOURCE_OEM_NAMES = [
  "Numalliance",
  "WAFIOS",
  "AIM Inc.",
  "U.S. Baird",
  "Nilson",
  "Lubow",
  "Itaya Engineering",
  "Otto Bihler Maschinenfabrik",
  "BLM GROUP",
  "Simplex Rapid",
  "Pave Engineering",
  "Fortuna Spezialmaschinen",
  "Whitelegg Machines",
  "Other",
];

function oemCatalogKey(oem: string) {
  return oem.trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, " ");
}

export function machinesForOem(oem: string, kind?: string): SourceIronPick[] {
  const key = oemCatalogKey(oem);
  let catalog: SourceIronPick[] = [];
  if (key === "numalliance") catalog = NUMALLIANCE_MACHINES;
  else if (key === "wafios") catalog = WAFIOS_MACHINES;
  else if (key === "aim inc" || key === "aim") catalog = AIM_MACHINES;
  else if (key === "us baird" || key === "baird") catalog = BAIRD_MACHINES;
  else if (key === "nilson") catalog = NILSON_MACHINES;
  else if (key === "lubow" || key === "lebow") catalog = LUBOW_MACHINES;
  else if (key === "otto bihler maschinenfabrik" || key === "bihler") {
    catalog = BIHLER_MACHINES;
  }
  if (!kind) return catalog;
  return catalog.filter((row) => row.kind === kind);
}

export function oemsForKind(kind: string): string[] {
  return SOURCE_OEM_NAMES.filter((name) => {
    if (name === "Other") return true;
    return machinesForOem(name).some((row) => row.kind === kind);
  });
}

export function preferredOemForKind(kind: string): string {
  return (
    SOURCE_OEM_NAMES.find(
      (name) =>
        name !== "Other" && machinesForOem(name).some((row) => row.kind === kind),
    ) ?? ""
  );
}

export function ironPickLabel(item: SourceIronPick): string {
  if (item.maxIn) return `${item.name} · to ${item.maxIn} in`;
  if (item.minMm && item.maxMm) {
    return `${item.name} · ${item.minMm}–${item.maxMm} mm`;
  }
  return item.name;
}

export function ironPickByName(
  oem: string,
  model: string,
): SourceIronPick | undefined {
  const want = model.trim().toLowerCase();
  if (!want) return undefined;
  return machinesForOem(oem).find((row) => row.name.toLowerCase() === want);
}

export function hydrateMachineFromCatalog(machine: SourceMachine): SourceMachine {
  const pick = ironPickByName(machine.oem, machine.model);
  if (!pick) return machine;
  return {
    ...machine,
    kind: pick.kind,
    minMm: machine.minMm.trim() || pick.minMm,
    maxMm: machine.maxMm.trim() || pick.maxMm,
  };
}

export function ironSeries(machines: SourceIronPick[]): string[] {
  return [...new Set(machines.map((row) => row.series))];
}
