"use server";

import { config } from "@/lib/config";
import { evaluateWireForm } from "@/lib/robomac/dfm";
import { extractWireForm } from "@/lib/robomac/extract";
import { formatSequence } from "@/lib/robomac/geometry";
import { MATERIALS } from "@/lib/robomac/tables";
import type { DfmResult, WireFormGeometry } from "@/lib/robomac/types";
import { isAdmin } from "../actions";

export type AnalyzeStepState = {
  ok: boolean;
  message?: string;
  fileName?: string;
  sequence?: string;
  geometry?: WireFormGeometry;
  dfm?: DfmResult;
  meta?: {
    units: "mm" | "inch";
    cylinderCount: number;
    torusCount: number;
    method: string;
  };
};

export async function analyzeRobomacStep(
  _prev: AnalyzeStepState | null,
  formData: FormData,
): Promise<AnalyzeStepState> {
  if (!(await isAdmin())) {
    return { ok: false, message: "Sign in on the desk first." };
  }
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Choose a .step or .stp file." };
  }
  if (file.size > config.upload.maxSizeBytes) {
    return { ok: false, message: "File is over 50 MB." };
  }
  const materialId = String(formData.get("materialId") ?? "1018");
  if (!MATERIALS.some((row) => row.id === materialId)) {
    return { ok: false, message: "Unknown material." };
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  let extracted;
  try {
    extracted = extractWireForm(bytes, file.name, materialId);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not read that STEP.",
    };
  }
  if (!extracted.ok) {
    return { ok: false, message: extracted.message, fileName: file.name };
  }
  const dfm = evaluateWireForm(extracted.geometry);
  return {
    ok: true,
    fileName: file.name,
    sequence: formatSequence(extracted.geometry),
    geometry: extracted.geometry,
    dfm,
    meta: {
      units: extracted.meta.units,
      cylinderCount: extracted.meta.cylinderCount,
      torusCount: extracted.meta.torusCount,
      method: extracted.meta.method,
    },
  };
}
