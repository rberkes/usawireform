"use server";

import { config } from "@/lib/config";
import { QUOTE_EMAIL } from "@/lib/company";
import { blobAuth, blobErrorMessage, blobReady, BLOB_ACCESS } from "@/lib/blob";
import { put } from "@vercel/blob";
import { sendInstantEstimateEmails } from "@/lib/leads";
import { ESTIMATE, usd2 } from "@/lib/quoting";
import { QUOTE_REVIEW } from "@/lib/price";
import { priceCadDfm } from "@/lib/robomac/cad-quote";
import { evaluateWireForm } from "@/lib/robomac/dfm";
import { extractWireForm } from "@/lib/robomac/extract";
import { formatSequence } from "@/lib/robomac/geometry";
import { MATERIALS } from "@/lib/robomac/tables";
import type { DfmResult, RobomacPieceQuote, WireFormGeometry } from "@/lib/robomac/types";

export type PublicCadDfmState = {
  ok: boolean;
  message?: string;
  fileName?: string;
  sequence?: string;
  geometry?: WireFormGeometry;
  dfm?: DfmResult;
  quote?: RobomacPieceQuote;
  quantity?: number;
  discountRate?: number;
  pieceUsd?: number;
  lotUsd?: number;
  buyable?: boolean;
  lengthIn?: number;
  diameterLabel?: string;
  weightLb?: number;
  mailed?: boolean;
  receiptTo?: string;
  meta?: {
    units: "mm" | "inch";
    cylinderCount: number;
    torusCount: number;
    method: string;
  };
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function materialLabel(id: string) {
  return MATERIALS.find((row) => row.id === id)?.label ?? id;
}

async function storeLead(payload: Record<string, unknown>) {
  if (!(await blobReady())) return { stored: false as const };
  try {
    await put(
      `leads/cad-dfm/${Date.now()}.json`,
      JSON.stringify(payload),
      {
        access: BLOB_ACCESS,
        addRandomSuffix: true,
        contentType: "application/json",
        ...(await blobAuth()),
      },
    );
    return { stored: true as const };
  } catch (error) {
    console.error("[CAD DFM Store Error]", error);
    return { stored: false as const, storeError: blobErrorMessage(error) };
  }
}

export async function analyzePublicStep(
  _prev: PublicCadDfmState | null,
  formData: FormData,
): Promise<PublicCadDfmState> {
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
  const quantity = Number(formData.get("qty") ?? ESTIMATE.qtyMin);
  if (!Number.isFinite(quantity) || quantity < ESTIMATE.qtyMin) {
    return { ok: false, message: `Quantity starts at ${ESTIMATE.qtyMin}.` };
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  let extracted;
  try {
    extracted = extractWireForm(bytes, file.name, materialId);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not read that STEP.",
      fileName: file.name,
    };
  }
  if (!extracted.ok) {
    return { ok: false, message: extracted.message, fileName: file.name };
  }

  const dfm = evaluateWireForm(extracted.geometry);
  const priced = priceCadDfm(extracted.geometry, dfm, quantity);
  const email = String(formData.get("email") ?? "").trim();
  const wantMail = email.length > 0;

  const state: PublicCadDfmState = {
    ok: true,
    fileName: file.name,
    sequence: formatSequence(extracted.geometry),
    geometry: extracted.geometry,
    dfm,
    quote: priced.quote,
    quantity,
    discountRate: priced.discountRate,
    pieceUsd: priced.pieceUsd,
    lotUsd: priced.lotUsd,
    buyable: priced.buyable,
    lengthIn: priced.lengthIn,
    diameterLabel: priced.diameterLabel,
    weightLb: priced.weightLb,
    meta: {
      units: extracted.meta.units,
      cylinderCount: extracted.meta.cylinderCount,
      torusCount: extracted.meta.torusCount,
      method: extracted.meta.method,
    },
  };

  if (wantMail) {
    if (!isValidEmail(email)) {
      return { ...state, message: "Enter a valid email to send the estimate." };
    }
    const piece = priced.pieceUsd != null ? usd2(priced.pieceUsd) : "—";
    const lot = priced.lotUsd != null ? usd2(priced.lotUsd) : "—";
    const forming =
      priced.quote.formingUsd != null ? usd2(priced.quote.formingUsd) : "—";
    const payload = {
      kind: "cad-dfm",
      pricing: "cad-dfm",
      email,
      fileName: file.name,
      materialId: extracted.geometry.materialId,
      materialLabel: materialLabel(extracted.geometry.materialId),
      diameterLabel: priced.diameterLabel,
      lengthIn: priced.lengthIn,
      quantity,
      dfmStatus: dfm.status,
      buyable: priced.buyable,
      piece,
      lot,
      forming,
      weightLb: priced.weightLb,
      formula: priced.quote.formula,
      timestamp: new Date().toISOString(),
    };
    const store = await storeLead(payload);
    let emailed = false;
    if (process.env.RESEND_API_KEY) {
      try {
        emailed = await sendInstantEstimateEmails({
          to: email,
          diameterLabel: priced.diameterLabel,
          materialLabel: materialLabel(extracted.geometry.materialId),
          cuts: 1,
          bends: dfm.bendCount,
          lengthIn: Math.round(priced.lengthIn * 10) / 10,
          quantity,
          piece,
          lot,
          forming,
          cut: usd2(0),
          bend: usd2(0),
          discount:
            priced.discountRate > 0
              ? `Qty break · −${Math.round(priced.discountRate * 100)}%`
              : undefined,
          stock: dfm.tooling.stock,
          cadDfm: true,
          dfmStatus: dfm.status,
          fileName: file.name,
          shopSteel: false,
          steelLb:
            priced.weightLb != null ? priced.weightLb.toFixed(3) : undefined,
          notes: [
            `DFM ${dfm.status}`,
            priced.buyable
              ? `Shop formula · ${priced.quote.formula}`
              : dfm.status === "FAIL"
                ? "FAIL — not a buyable price"
                : priced.quote.note,
            priced.quote.materialPending ? "Material $/lb not filed — forming only" : "",
            dfm.issues
              .slice(0, 4)
              .map((issue) => `${issue.status} ${issue.check}`)
              .join(" · "),
          ]
            .filter(Boolean)
            .join(" · "),
        });
      } catch (error) {
        console.error("[CAD DFM Email Error]", error);
      }
    }
    console.log("[CAD DFM]", {
      email,
      fileName: file.name,
      status: dfm.status,
      piece,
      stored: store.stored,
      emailed,
    });
    if (!emailed) {
      return {
        ...state,
        message: `Could not send the estimate${store.storeError ? ` (${store.storeError})` : ""}. Copy the number on this page, or email ${QUOTE_EMAIL}.`,
      };
    }
    const mailNote = priced.buyable
      ? `${piece} / piece, ${lot} for ${quantity.toLocaleString("en-US")} pcs. ${QUOTE_REVIEW}`
      : dfm.status === "FAIL"
        ? `DFM FAIL — not a buyable price. We emailed the issues. ${QUOTE_REVIEW}`
        : `DFM ${dfm.status}. No filed inch rate — no piece price. We emailed the desk. ${QUOTE_REVIEW}`;
    return {
      ...state,
      mailed: true,
      receiptTo: email,
      message: mailNote,
    };
  }

  return state;
}
