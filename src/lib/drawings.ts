import { config } from "@/lib/config";

export const DRAWING_EXTENSIONS = config.upload.acceptedExtensions;

export const DRAWING_HINT = "STEP, SLDPRT, PDF, DXF, or DWG";

export const DRAWING_LIST = "STEP, STP, IGES, PDF, DXF, DWG, SLDPRT";

export const DRAWING_FREE_STEP =
  "No STEP? Upload a 3-view PDF, DXF, or SLDPRT — we model it free.";

/** Extra types only after a buyer account is confirmed and the desk validates them. */
export const EXTRA_UPLOAD_EXTENSIONS = [
  "xlsx",
  "xls",
  "xlsm",
  "csv",
  "doc",
  "docx",
  "zip",
  "png",
  "jpg",
  "jpeg",
  "webp",
  "tif",
  "tiff",
  "txt",
] as const;

export const EXTRA_UPLOAD_HINT = "Excel, Word, ZIP, or a photo of the print";

export const DRAWING_ACCEPT = drawingAcceptList(false);

export function drawingAcceptList(extras: boolean) {
  const extensions = extras
    ? [...DRAWING_EXTENSIONS, ...EXTRA_UPLOAD_EXTENSIONS]
    : DRAWING_EXTENSIONS;
  return [
    ...extensions.map((ext) => `.${ext}`),
    "application/pdf",
    "image/vnd.dxf",
    "application/dxf",
    "application/x-dxf",
    "image/vnd.dwg",
    "application/acad",
    "application/x-sldworks",
    ...(extras
      ? [
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "text/csv",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/zip",
          "image/png",
          "image/jpeg",
          "image/webp",
          "image/tiff",
          "text/plain",
        ]
      : []),
  ].join(",");
}

export function uploadHint(extras: boolean) {
  return extras ? `${DRAWING_HINT}, or ${EXTRA_UPLOAD_HINT}` : DRAWING_HINT;
}

export function drawingExtOf(name: string) {
  const lower = name.trim().toLowerCase();
  const versioned = lower.match(/\.((?:sldprt|sldasm|slddrw))(?:\.\d+)?$/);
  if (versioned) return versioned[1];
  return lower.split(".").pop() ?? "";
}

export function isAcceptedDrawing(name: string) {
  const ext = drawingExtOf(name);
  return DRAWING_EXTENSIONS.some((accepted) => accepted === ext);
}

export function isAcceptedUpload(name: string, extras: boolean) {
  if (isAcceptedDrawing(name)) return true;
  if (!extras) return false;
  const ext = drawingExtOf(name);
  return EXTRA_UPLOAD_EXTENSIONS.some((accepted) => accepted === ext);
}

export function isPdfDrawing(name: string) {
  return drawingExtOf(name) === "pdf";
}
