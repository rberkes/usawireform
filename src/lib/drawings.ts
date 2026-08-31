import { config } from "@/lib/config";

export const DRAWING_EXTENSIONS = config.upload.acceptedExtensions;

export const DRAWING_HINT = "STEP, SolidWorks, PDF, DXF, or DWG";

export const DRAWING_FREE_STEP =
  "No STEP? Upload a 3-view PDF or Solid file — we model it free.";

export const DRAWING_ACCEPT = [
  ...DRAWING_EXTENSIONS.map((ext) => `.${ext}`),
  "application/pdf",
].join(",");

export function drawingExtOf(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

export function isAcceptedDrawing(name: string) {
  const ext = drawingExtOf(name);
  return DRAWING_EXTENSIONS.some((accepted) => accepted === ext);
}

export function isPdfDrawing(name: string) {
  return drawingExtOf(name) === "pdf";
}
