"use server";

import { Resend } from "resend";
import { put } from "@vercel/blob";
import { blobReady, BLOB_ACCESS } from "@/lib/blob";
import { QUOTE_EMAIL, COMPANY } from "@/lib/company";
import { LEADS_NOTIFY_EMAIL } from "@/lib/leads";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

function blobConfigured() {
  return blobReady();
}

function emailConfigured() {
  return Boolean(resend && process.env.RESEND_FROM_EMAIL);
}

async function storeDrawing(prefix: string, file: File) {
  const ext = file.name.split(".").pop() || "bin";
  return put(`${prefix}/${Date.now()}.${ext}`, file, {
    access: BLOB_ACCESS,
    addRandomSuffix: true,
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

  if (file && file.size > 0 && blobConfigured()) {
    try {
      const safeCompany = data.company.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
      const drawing = await storeDrawing(`quotes/${safeCompany}`, file);
      drawingUrl = drawing.url;
      drawingPath = drawing.pathname;
      stored = true;
    } catch (error) {
      console.error("[Drawing Upload Error]", error);
    }
  }

  if (blobConfigured()) {
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
    }
  }

  if (emailConfigured() && resend && process.env.RESEND_FROM_EMAIL) {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: LEADS_NOTIFY_EMAIL,
        replyTo: data.email,
        subject: `Quote Request: ${data.company} - ${data.material} ${data.diameter}`,
        html: `
          <h2>New Quote Request</h2>
          <p><strong>Contact:</strong> ${data.name}</p>
          <p><strong>Company:</strong> ${data.company}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>LinkedIn:</strong> ${
            data.linkedin
              ? `<a href="${data.linkedin}">${data.linkedin}</a>`
              : "—"
          }</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <hr />
          <h3>Part Details</h3>
          <p><strong>Material:</strong> ${data.material}</p>
          <p><strong>Wire Diameter:</strong> ${data.diameter}</p>
          <p><strong>Target Price:</strong> ${data.targetPrice}</p>
          <p><strong>Timeline:</strong> ${data.timeline}</p>
          <p><strong>Quality Standard:</strong> ${data.quality}</p>
          <h4>Notes:</h4>
          <p>${data.notes.replace(/\n/g, "<br />")}</p>
          <hr />
          <p><strong>Drawing:</strong> ${
            drawingUrl 
              ? `<a href="${drawingUrl}">${data.fileName}</a>` 
              : data.fileName || "Not uploaded"
          }</p>
          <hr />
          <p><small>Submitted at ${new Date().toISOString()}</small></p>
        `,
      });
      emailed = true;
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
    timestamp: new Date().toISOString(),
    recipient: QUOTE_EMAIL,
  });

  if (!stored && !emailed) {
    return {
      success: false,
      message: `The drawing did not store. Email ${data.fileName} to ${QUOTE_EMAIL}.`,
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

  if (file && file.size > 0 && blobConfigured()) {
    try {
      const drawing = await storeDrawing("quick-quotes", file);
      drawingUrl = drawing.url;
      drawingPath = drawing.pathname;
      stored = true;
    } catch (error) {
      console.error("[Drawing Upload Error]", error);
    }
  }

  if (blobConfigured()) {
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
    }
  }

  if (emailConfigured() && resend && process.env.RESEND_FROM_EMAIL) {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: LEADS_NOTIFY_EMAIL,
        replyTo: data.email,
        subject: `Quick Quote${data.source ? ` (${data.source})` : ""}: ${data.timeline} - ${data.quality}`,
        html: `
          <h2>Quick Quote Request</h2>
          <p><strong>Page:</strong> ${data.source || "unknown"}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>LinkedIn:</strong> ${
            data.linkedin
              ? `<a href="${data.linkedin}">${data.linkedin}</a>`
              : "—"
          }</p>
          <hr />
          <p><strong>Target Price:</strong> ${data.targetPrice}</p>
          <p><strong>Timeline:</strong> ${data.timeline}</p>
          <p><strong>Quality Standard:</strong> ${data.quality}</p>
          <hr />
          <p><strong>Drawing:</strong> ${
            drawingUrl 
              ? `<a href="${drawingUrl}">${data.fileName}</a>` 
              : data.fileName || "Not uploaded"
          }</p>
          <hr />
          <p><small>Submitted at ${new Date().toISOString()}</small></p>
        `,
      });
      emailed = true;
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
    timestamp: new Date().toISOString(),
    recipient: QUOTE_EMAIL,
  });

  if (!stored && !emailed) {
    return {
      success: false,
      message: `The drawing did not store. Email ${data.fileName} to ${QUOTE_EMAIL}.`,
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

  if (blobReady()) {
    try {
      await put(
        `leads/machines/${Date.now()}.json`,
        JSON.stringify({ kind: "machine", ...data, timestamp: new Date().toISOString() }),
        { access: BLOB_ACCESS, addRandomSuffix: true, contentType: "application/json" },
      );
      stored = true;
    } catch (error) {
      console.error("[Machine Lead Store Error]", error);
    }
  }

  if (resend && process.env.RESEND_FROM_EMAIL) {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: LEADS_NOTIFY_EMAIL,
        replyTo: data.email,
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
      });
      emailed = true;
    } catch (error) {
      console.error("[Machine Lead Email Error]", error);
    }
  }

  console.log("[Machine Lead]", { ...data, stored, emailed });

  if (!stored && !emailed) {
    return {
      success: false,
      message: `Inquiry did not store. Email ${QUOTE_EMAIL} with the machine name.`,
    };
  }

  return {
    success: true,
    message: `${COMPANY} received the ${data.model} inquiry. We route dealer and OEM leads from this form.`,
  };
}
