import type { DirectoryCompany } from "./directory-types";

/** Three checks. Fail one and it is a desk, not a factory. */
export const PLANT_CHECKS = [
  {
    n: "01",
    title: "Street plant",
    body: "Numbered street in that city. Not a PO box, not “serves X from Y,” not a suite that is only sales.",
  },
  {
    n: "02",
    title: "Floor proof",
    body: "A public URL that names machines, shows the shop, or lists forming. Filing a CNC / fourslide / multi-slide / spring cell on Source also counts. A Contact / Sales page does not.",
  },
  {
    n: "03",
    title: "Not a desk",
    body: "The shop attests: we form wire or strip on this floor. Not a sales office, sourcing desk, or manufacturer’s rep.",
  },
] as const;

const OFFICE_RE =
  /sales office|sourcing office|buying office|trading company|manufacturer'?s? rep|\brep firm\b|we source (?:from|parts)|we represent |procurement office|sourcing desk/i;

const PO_BOX_RE = /\b(p\.?\s*o\.?\s*box|post office box)\b/i;
const SERVES_RE = /^serves\b/i;

export type PlantStatus = "plant" | "listed" | "office";

export function officeLanguage(...parts: Array<string | undefined>) {
  return OFFICE_RE.test(parts.filter(Boolean).join(" "));
}

export function streetLooksLikePlant(street: string) {
  const value = street.trim();
  if (value.length < 8) return false;
  if (PO_BOX_RE.test(value) || SERVES_RE.test(value)) return false;
  if (officeLanguage(value)) return false;
  return /\d/.test(value);
}

export function proofUrlLooksPublic(raw: string) {
  const value = raw.trim();
  if (!value) return false;
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    if (!/^https?:$/.test(url.protocol)) return false;
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    if (!host || host === "localhost") return false;
    const path = `${url.pathname} ${url.hash}`.toLowerCase();
    if (/\/(contact|sales|about-us\/contact)\b/.test(path) && !/machine|equipment|capabilit|facilit|plant|shop/.test(path)) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function readPlantForm(formData: FormData) {
  return {
    plantStreet: String(formData.get("plantStreet") ?? "").trim().slice(0, 160),
    plantProofUrl: String(formData.get("plantProofUrl") ?? "").trim().slice(0, 200),
    plantAttest: String(formData.get("plantAttest") ?? "") === "1",
  };
}

export function verifyPlantClaim(input: {
  plantStreet: string;
  plantProofUrl: string;
  plantAttest: boolean;
  name?: string;
  location?: string;
  description?: string;
}): { ok: true } | { ok: false; message: string } {
  if (officeLanguage(input.name, input.location, input.description, input.plantStreet)) {
    return {
      ok: false,
      message: "That reads as a sales or sourcing office. This listing is for a plant floor.",
    };
  }
  if (!streetLooksLikePlant(input.plantStreet)) {
    return {
      ok: false,
      message: "Enter the plant street — numbered address in that city, not a PO box.",
    };
  }
  if (!proofUrlLooksPublic(input.plantProofUrl)) {
    return {
      ok: false,
      message: "Paste a public page that names machines or shows the shop. A sales page is not proof.",
    };
  }
  if (!input.plantAttest) {
    return {
      ok: false,
      message: "Check the box: this location forms on the floor. Not a sales or sourcing office.",
    };
  }
  return { ok: true };
}

/** New Source shops: a named cell on the floor can stand in for the proof URL. */
export function verifyPlantFiling(input: {
  plantStreet: string;
  plantProofUrl: string;
  plantAttest: boolean;
  hasCell: boolean;
  name?: string;
}): { ok: true } | { ok: false; message: string } {
  if (officeLanguage(input.name, input.plantStreet)) {
    return {
      ok: false,
      message: "That reads as a sales or sourcing office. File a plant, not a desk.",
    };
  }
  if (!streetLooksLikePlant(input.plantStreet)) {
    return {
      ok: false,
      message: "Enter the plant street — numbered address in that city, not a PO box.",
    };
  }
  if (!input.hasCell && !proofUrlLooksPublic(input.plantProofUrl)) {
    return {
      ok: false,
      message: "Name one cell on the floor, or paste a public page that shows the shop.",
    };
  }
  if (!input.plantAttest) {
    return {
      ok: false,
      message: "Check the box: this location forms on the floor. Not a sales or sourcing office.",
    };
  }
  return { ok: true };
}

export function directoryPlantStatus(
  company: Pick<
    DirectoryCompany,
    | "name"
    | "location"
    | "description"
    | "plantKind"
    | "filedOnSource"
    | "machines"
    | "equipmentSource"
    | "plantStreet"
  >,
): PlantStatus {
  if (
    company.plantKind === "office" ||
    SERVES_RE.test(company.location) ||
    officeLanguage(company.name, company.location, company.description)
  ) {
    return "office";
  }
  if (
    company.plantKind === "plant" ||
    company.filedOnSource ||
    (company.machines && company.machines.length > 0) ||
    Boolean(company.equipmentSource) ||
    Boolean(company.plantStreet)
  ) {
    return "plant";
  }
  return "listed";
}

export function isFactoryListing(company: DirectoryCompany) {
  return directoryPlantStatus(company) !== "office";
}
