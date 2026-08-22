"use server";

import { put } from "@vercel/blob";
import { blobAuth, blobErrorMessage, blobReady, BLOB_ACCESS } from "@/lib/blob";
import { QUOTE_EMAIL, COMPANY } from "@/lib/company";
import { sendDrawingLeadEmails, previewAttachmentFromForm, sendLeadEmail, sendLeadThanksEmail, sendInstantEstimateEmails } from "@/lib/leads";
import { estimatePiece, parseInstantQuote, usd2 } from "@/lib/quoting";
import { QUOTE_REVIEW } from "@/lib/price";

export type QuoteFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

export type ContactFormData = {
  name: string;
  company: string;
  email: string;
  linkedin: string;
  phone: string;
  material: string;
  diameter: string;
  targetPrice: string;
  timeline: string;
  quality: string;
  notes: string;
  fileName?: string;
  fileSize?: number;
};

export type QuickQuoteFormData = {
  email: string;
  linkedin: string;
  targetPrice: string;
  timeline: string;
  quality: string;
  source?: string;
  fileName?: string;
  fileSize?: number;
};

async function blobConfigured() {
  return blobReady();
}

function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

async function storeDrawing(prefix: string, file: File) {
  const ext = file.name.split(".").pop() || "bin";
  const body = Buffer.from(await file.arrayBuffer());
  return put(`${prefix}/${Date.now()}.${ext}`, body, {
    access: BLOB_ACCESS,
    addRandomSuffix: true,
    contentType: file.type || "application/octet-stream",
    ...(await blobAuth()),
  });
}

async function storeLeadRecord(prefix: string, payload: Record<string, unknown>) {
  const blob = await put(
    `${prefix}/${Date.now()}.json`,
    JSON.stringify(payload),
    {
      access: BLOB_ACCESS,
      addRandomSuffix: true,
      contentType: "application/json",
      ...(await blobAuth()),
    },
  );
  return blob.url;
}

function isStepDrawing(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  return ext === "step" || ext === "stp" || ext === "stpz";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidLinkedIn(url: string): boolean {
  try {
    const parsed = new URL(
      url.trim().startsWith("http") ? url.trim() : `https://${url.trim()}`
    );
    return /(^|\.)linkedin\.com$/i.test(parsed.hostname);
  } catch {
    return false;
  }
}

export async function submitContactForm(
  _prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  const data: ContactFormData = {
    name: String(formData.get("name") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    linkedin: String(formData.get("linkedin") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    material: String(formData.get("material") ?? "").trim(),
    diameter: String(formData.get("diameter") ?? "").trim(),
    targetPrice: String(formData.get("targetPrice") ?? "").trim(),
    timeline: String(formData.get("timeline") ?? "").trim(),
    quality: String(formData.get("quality") ?? "").trim(),
    notes: String(formData.get("notes") ?? "").trim(),
  };

  const file = formData.get("drawing") as File | null;
  if (file && file.size > 0) {
    data.fileName = file.name;
    data.fileSize = file.size;
  }

  const errors: Record<string, string> = {};

  if (!data.name) errors.name = "Name is required";
  if (!data.company) errors.company = "Company is required";
  if (!data.email) errors.email = "Email is required";
  else if (!isValidEmail(data.email)) errors.email = "Invalid email address";
  if (data.linkedin && !isValidLinkedIn(data.linkedin))
    errors.linkedin = "Invalid LinkedIn URL";
  if (!data.phone) errors.phone = "Phone is required";
  if (!data.material) errors.material = "Material is required";
  if (!data.diameter) errors.diameter = "Wire diameter is required";
  if (!data.targetPrice) errors.targetPrice = "Target price is required";
  if (!data.timeline) errors.timeline = "Timeline is required";
  if (!data.quality) errors.quality = "Quality standard is required";
  if (!data.notes) errors.notes = "Part notes are required";
  if (!data.fileName) errors.drawing = "STEP file is required";
  else if (!isStepDrawing(data.fileName))
    errors.drawing = "Use a STEP or STP file.";

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors,
    };
  }

  let drawingUrl: string | undefined;
  let drawingPath: string | undefined;
  let recordUrl: string | undefined;
  let stored = false;
  let emailed = false;
  let storeError: string | undefined;
  const canStore = await blobConfigured();

  if (file && file.size > 0 && canStore) {
    try {
      const safeCompany = data.company.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
      const drawing = await storeDrawing(`quotes/${safeCompany}`, file);
      drawingUrl = drawing.url;
      drawingPath = drawing.pathname;
      stored = true;
    } catch (error) {
      console.error("[Drawing Upload Error]", error);
      storeError = blobErrorMessage(error);
    }
  }

  if (canStore) {
    try {
      recordUrl = await storeLeadRecord("leads/contact", {
        kind: "contact",
        ...data,
        drawingUrl,
        drawingPath,
        timestamp: new Date().toISOString(),
      });
      stored = true;
    } catch (error) {
      console.error("[Lead Store Error]", error);
      storeError ??= blobErrorMessage(error);
    }
  }

  if (emailConfigured()) {
    try {
      let preview;
      try {
        preview = await previewAttachmentFromForm(formData);
      } catch (error) {
        console.error("[Preview attach]", error);
      }
      emailed = await sendDrawingLeadEmails({
        to: data.email,
        name: data.name,
        subject: `Quote request: ${data.company} — ${data.fileName ?? "drawing"}`,
        heading: "New drawing",
        intro: `${data.name} at ${data.company} sent a STEP. We'll be with them shortly.`,
        fileName: data.fileName,
        preview,
        rows: [
          { label: "Name", value: data.name },
          { label: "Company", value: data.company },
          { label: "Email", value: data.email, href: `mailto:${data.email}` },
          ...(data.linkedin
            ? [{ label: "LinkedIn", value: data.linkedin, href: data.linkedin }]
            : []),
          { label: "Phone", value: data.phone },
          { label: "Material", value: data.material },
          { label: "Diameter", value: data.diameter },
          { label: "Target price", value: data.targetPrice },
          { label: "Timeline", value: data.timeline },
          { label: "Quality", value: data.quality },
          { label: "Notes", value: data.notes || "—" },
          { label: "Drawing", value: data.fileName || "Not uploaded" },
        ],
      });
    } catch (error) {
      console.error("[Email Send Error]", error);
    }
  }

  console.log("[Quote Request]", {
    ...data,
    drawingUrl,
    recordUrl,
    stored,
    emailed,
    storeError,
    hasBlobAuth: canStore,
    timestamp: new Date().toISOString(),
    recipient: QUOTE_EMAIL,
  });

  if (!stored && !emailed) {
    return {
      success: false,
      message: `The drawing did not store${storeError ? ` (${storeError})` : ""}. Email ${data.fileName} to ${QUOTE_EMAIL}.`,
    };
  }

  return {
    success: true,
    message: `Thank you, ${data.name}. Your quote request has been received. We'll review ${data.fileName} and respond within 1-2 business days.`,
  };
}

export async function submitQuickQuote(
  _prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  const data: QuickQuoteFormData = {
    email: String(formData.get("email") ?? "").trim(),
    linkedin: String(formData.get("linkedin") ?? "").trim(),
    targetPrice: String(formData.get("targetPrice") ?? "").trim(),
    timeline: String(formData.get("timeline") ?? "").trim(),
    quality: String(formData.get("quality") ?? "").trim(),
    source: String(formData.get("source") ?? "").trim() || undefined,
  };

  const file = formData.get("drawing") as File | null;
  if (file && file.size > 0) {
    data.fileName = file.name;
    data.fileSize = file.size;
  }

  const errors: Record<string, string> = {};

  if (!data.email) errors.email = "Email is required";
  else if (!isValidEmail(data.email)) errors.email = "Invalid email address";
  if (data.linkedin && !isValidLinkedIn(data.linkedin))
    errors.linkedin = "Invalid LinkedIn URL";
  if (!data.targetPrice) errors.targetPrice = "Target price is required";
  if (!data.timeline) errors.timeline = "Timeline is required";
  if (!data.quality) errors.quality = "Quality standard is required";
  if (!data.fileName) errors.drawing = "STEP file is required";
  else if (!isStepDrawing(data.fileName))
    errors.drawing = "Use a STEP or STP file.";

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please complete all required fields.",
      errors,
    };
  }

  let drawingUrl: string | undefined;
  let drawingPath: string | undefined;
  let recordUrl: string | undefined;
  let stored = false;
  let emailed = false;
  let storeError: string | undefined;
  const canStore = await blobConfigured();

  if (file && file.size > 0 && canStore) {
    try {
      const drawing = await storeDrawing("quick-quotes", file);
      drawingUrl = drawing.url;
      drawingPath = drawing.pathname;
      stored = true;
    } catch (error) {
      console.error("[Drawing Upload Error]", error);
      storeError = blobErrorMessage(error);
    }
  }

  if (canStore) {
    try {
      recordUrl = await storeLeadRecord("leads/quick", {
        kind: "quick",
        ...data,
        drawingUrl,
        drawingPath,
        timestamp: new Date().toISOString(),
      });
      stored = true;
    } catch (error) {
      console.error("[Lead Store Error]", error);
      storeError ??= blobErrorMessage(error);
    }
  }

  if (emailConfigured()) {
    try {
      let preview;
      try {
        preview = await previewAttachmentFromForm(formData);
      } catch (error) {
        console.error("[Preview attach]", error);
      }
      emailed = await sendDrawingLeadEmails({
        to: data.email,
        subject: `Drawing: ${data.fileName ?? "STEP"}${data.source ? ` (${data.source})` : ""}`,
        heading: "New drawing",
        intro: "Someone sent a STEP from the site. We'll be with them shortly.",
        fileName: data.fileName,
        preview,
        rows: [
          { label: "Email", value: data.email, href: `mailto:${data.email}` },
          ...(data.linkedin
            ? [{ label: "LinkedIn", value: data.linkedin, href: data.linkedin }]
            : []),
          { label: "Page", value: data.source || "—" },
          { label: "Target price", value: data.targetPrice },
          { label: "Timeline", value: data.timeline },
          { label: "Quality", value: data.quality },
          { label: "Drawing", value: data.fileName || "Not uploaded" },
        ],
      });
    } catch (error) {
      console.error("[Email Send Error]", error);
    }
  }

  console.log("[Quick Quote]", {
    ...data,
    drawingUrl,
    recordUrl,
    stored,
    emailed,
    storeError,
    hasBlobAuth: canStore,
    timestamp: new Date().toISOString(),
    recipient: QUOTE_EMAIL,
  });

  if (!stored && !emailed) {
    return {
      success: false,
      message: `The drawing did not store${storeError ? ` (${storeError})` : ""}. Email ${data.fileName} to ${QUOTE_EMAIL}.`,
    };
  }

  return {
    success: true,
    message: `Quote request received. We'll review ${data.fileName} and follow up at ${data.email}.`,
  };
}

export async function submitMachineLead(
  _prevState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  const data = {
    name: String(formData.get("name") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    notes: String(formData.get("notes") ?? "").trim(),
    oem: String(formData.get("oem") ?? "").trim(),
    model: String(formData.get("model") ?? "").trim(),
    source: String(formData.get("source") ?? "").trim(),
  };

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Name is required";
  if (!data.company) errors.company = "Company is required";
  if (!data.email) errors.email = "Email is required";
  else if (!isValidEmail(data.email)) errors.email = "Invalid email address";
  if (!data.role) errors.role = "Role is required";
  if (!data.oem || !data.model) errors.model = "Machine is required";

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please complete name, company, email, and role.",
      errors,
    };
  }

  let stored = false;
  let emailed = false;
  let storeError: string | undefined;

  if (await blobReady()) {
    try {
      await put(
        `leads/machines/${Date.now()}.json`,
        JSON.stringify({ kind: "machine", ...data, timestamp: new Date().toISOString() }),
        {
          access: BLOB_ACCESS,
          addRandomSuffix: true,
          contentType: "application/json",
          ...(await blobAuth()),
        },
      );
      stored = true;
    } catch (error) {
      console.error("[Machine Lead Store Error]", error);
      storeError = blobErrorMessage(error);
    }
  }

  if (emailConfigured()) {
    try {
      const [shop] = await Promise.all([
        sendLeadEmail({
          replyTo: data.email,
          heading: "Machine inquiry",
          subject: `Machine lead: ${data.oem} ${data.model} — ${data.company}`,
          html: `
          <h2>CNC machine inquiry</h2>
          <p><strong>OEM / model:</strong> ${data.oem} / ${data.model}</p>
          <p><strong>Page:</strong> ${data.source}</p>
          <p><strong>Role:</strong> ${data.role}</p>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Company:</strong> ${data.company}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || "—"}</p>
          <p><strong>Notes:</strong> ${data.notes.replace(/\n/g, "<br />") || "—"}</p>
        `,
        }),
        sendLeadThanksEmail({ to: data.email, name: data.name, kind: "machine" }),
      ]);
      emailed = shop;
    } catch (error) {
      console.error("[Machine Lead Email Error]", error);
    }
  }

  console.log("[Machine Lead]", { ...data, stored, emailed, storeError });

  if (!stored && !emailed) {
    return {
      success: false,
      message: `Inquiry did not store${storeError ? ` (${storeError})` : ""}. Email ${QUOTE_EMAIL} with the machine name.`,
    };
  }

  return {
    success: true,
    message: `${COMPANY} received the ${data.model} inquiry. We route dealer and OEM leads from this form.`,
  };
}

export async function submitInstantQuote(
  _prevState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  const parsed = parseInstantQuote({
    email: String(formData.get("email") ?? ""),
    stockId: String(formData.get("stockId") ?? ""),
    customMm: String(formData.get("customMm") ?? ""),
    cuts: String(formData.get("cuts") ?? ""),
    bends: String(formData.get("bends") ?? ""),
    lengthIn: String(formData.get("lengthIn") ?? ""),
    materialId: String(formData.get("materialId") ?? ""),
    qty: String(formData.get("qty") ?? ""),
  });

  if (!parsed.ok) {
    return { success: false, message: parsed.message };
  }

  const input = parsed.value;
  const result = estimatePiece({
    bends: input.bends,
    lengthIn: input.lengthIn,
    quantity: input.quantity,
    cuts: input.cuts,
  });
  const piece = usd2(result.piece);
  const lot = usd2(result.lot);
  const payload = {
    kind: "instant",
    ...input,
    piece,
    lot,
    forming: usd2(result.forming),
    cut: usd2(result.cut),
    bend: usd2(result.bendCost),
    discountRate: result.discountRate,
    targetPrice: piece,
    notes: `${input.cuts} cuts · ${input.bends} bends · ${input.lengthIn} in · ${lot} lot`,
    material: input.materialLabel,
    diameter: input.diameterLabel,
    timestamp: new Date().toISOString(),
  };

  let stored = false;
  let emailed = false;
  let storeError: string | undefined;

  if (await blobConfigured()) {
    try {
      await storeLeadRecord("leads/instant", payload);
      stored = true;
    } catch (error) {
      console.error("[Instant Quote Store Error]", error);
      storeError = blobErrorMessage(error);
    }
  }

  if (emailConfigured()) {
    try {
      emailed = await sendInstantEstimateEmails({
        to: input.email,
        diameterLabel: input.diameterLabel,
        materialLabel: input.materialLabel,
        cuts: input.cuts,
        bends: input.bends,
        lengthIn: input.lengthIn,
        quantity: input.quantity,
        piece,
        lot,
        forming: usd2(result.forming),
        cut: usd2(result.cut),
        bend: usd2(result.bendCost),
        discount:
          result.discountRate > 0
            ? `Qty break · −${Math.round(result.discountRate * 100)}%`
            : undefined,
        stock: input.stock,
      });
    } catch (error) {
      console.error("[Instant Quote Email Error]", error);
    }
  }

  console.log("[Instant Quote]", {
    email: input.email,
    piece,
    lot,
    stored,
    emailed,
    storeError,
  });

  if (!emailed) {
    return {
      success: false,
      message: `Could not send the estimate${storeError ? ` (${storeError})` : ""}. Copy the number on this page, or email ${QUOTE_EMAIL}.`,
    };
  }

  return {
    success: true,
    message: `Sent to ${input.email}: ${piece} / piece, ${lot} for ${input.quantity.toLocaleString("en-US")} pcs. ${QUOTE_REVIEW}`,
  };
}
