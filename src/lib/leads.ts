import "server-only";
import { get, put } from "@vercel/blob";

/**
 * Every lead the site captures — directory inquiries and outbound-link
 * captures — funnels into one private blob so there's a single place to
 * read them back from in the admin view.
 */
export interface LeadRecord {
  id: string;
  type: "directory-inquiry" | "outbound-capture" | "outbound-revisit";
  email: string;
  visitorName?: string;
  visitorCompany?: string;
  visitorPhone?: string;
  message?: string;
  referredCompany: string;
  referredCompanySlug: string;
  destinationUrl?: string;
  receivedAt: string;
  ip?: string;
  userAgent?: string;
}

const LEADS_PATH = "leads/leads.json";
const MAX_STORED_LEADS = 5000;

function storageConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readAllLeads(): Promise<LeadRecord[]> {
  if (!storageConfigured()) return [];

  try {
    const result = await get(LEADS_PATH, { access: "private", useCache: false });
    if (!result) return [];
    const text = await new Response(result.stream).text();
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // No blob yet, or a transient read error — treat as empty rather than failing the request.
    return [];
  }
}

/**
 * Appends a lead to the shared private blob. This is a read-modify-write
 * cycle (no true append op in Blob storage), which is fine at lead-capture
 * volumes but can theoretically drop a record if two requests land in the
 * same instant — acceptable tradeoff for a marketing lead form.
 */
export async function recordLead(
  lead: Omit<LeadRecord, "id" | "receivedAt"> & { receivedAt?: string },
): Promise<void> {
  if (!storageConfigured()) return;

  const record: LeadRecord = {
    ...lead,
    id: crypto.randomUUID(),
    receivedAt: lead.receivedAt ?? new Date().toISOString(),
  };

  const existing = await readAllLeads();
  const updated = [record, ...existing].slice(0, MAX_STORED_LEADS);

  await put(LEADS_PATH, JSON.stringify(updated), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function listLeads(): Promise<LeadRecord[]> {
  return readAllLeads();
}

export function isLeadStorageConfigured(): boolean {
  return storageConfigured();
}
