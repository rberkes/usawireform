import { extractWireFormFromStep, type ExtractResult } from "./step-extract";

const STEP_EXT = ["step", "stp"];

export function isStepName(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  return STEP_EXT.includes(ext);
}

export function extractWireForm(
  bytes: Uint8Array,
  fileName: string,
  materialId = "1018",
): ExtractResult {
  if (!isStepName(fileName)) {
    return {
      ok: false,
      message: "Upload a .step or .stp. IGES and SLDPRT are not read yet.",
    };
  }
  if (fileName.toLowerCase().endsWith(".stpz")) {
    return { ok: false, message: "Compressed .stpz is not read yet. Export a plain STEP." };
  }
  const text = decodeStep(bytes);
  return extractWireFormFromStep(text, materialId);
}

function decodeStep(bytes: Uint8Array) {
  const head = bytes.subarray(0, 16);
  if (head[0] === 0x1f && head[1] === 0x8b) {
    throw new Error("gzip STEP (.stpz) is not supported.");
  }
  return new TextDecoder("latin1").decode(bytes);
}

export type { ExtractErr, ExtractOk, ExtractResult } from "./step-extract";
