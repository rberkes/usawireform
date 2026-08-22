import { generateText, jsonSchema, Output } from "ai";
import { SOURCE_OEM_NAMES } from "@/lib/source-iron";
import { SOURCE_KINDS } from "@/lib/source-types";
import { parseWireMm, roundMm, type SourceJobSpec } from "@/lib/source-match";

export type ParsedBuyerJob = {
  spec: SourceJobSpec;
  parsedBy: "form" | "ai" | "form+ai";
};

type AiFields = {
  diameterMm: number | null;
  kind: string | null;
  oem: string | null;
  city: string | null;
  state: string | null;
};

function gatewayReady() {
  return Boolean(
    process.env.AI_GATEWAY_API_KEY ||
      process.env.VERCEL_OIDC_TOKEN ||
      process.env.VERCEL,
  );
}

function cleanOem(value: string) {
  const trimmed = value.trim();
  if (!trimmed || /^any$/i.test(trimmed)) return "";
  const hit = SOURCE_OEM_NAMES.find(
    (name) => name.toLowerCase() === trimmed.toLowerCase(),
  );
  return hit && hit !== "Other" ? hit : trimmed === "Other" ? "" : trimmed;
}

function cleanKind(value: string) {
  const trimmed = value.trim();
  if (!trimmed || /^any$/i.test(trimmed)) return "";
  if (trimmed === "Other") return "";
  return (SOURCE_KINDS as readonly string[]).includes(trimmed) ? trimmed : "";
}

async function extractJobWithAi(text: string): Promise<AiFields | null> {
  if (!gatewayReady() || !text.trim()) return null;
  try {
    const result = await generateText({
      model: "openai/gpt-5.4-mini",
      output: Output.object({
        schema: jsonSchema<AiFields>({
          type: "object",
          additionalProperties: false,
          properties: {
            diameterMm: { type: ["number", "null"] },
            kind: { type: ["string", "null"] },
            oem: { type: ["string", "null"] },
            city: { type: ["string", "null"] },
            state: { type: ["string", "null"] },
          },
          required: ["diameterMm", "kind", "oem", "city", "state"],
        }),
      }),
      system: `Extract a wire-forming RFQ. Do not name shops or invent capacity.
kind must be one of: ${SOURCE_KINDS.join(", ")} — or null.
oem must be one of: ${SOURCE_OEM_NAMES.filter((name) => name !== "Other").join(", ")} — or null. Robomac/FTX/FRX = Numalliance. BM/BMU/FUL/FMU = WAFIOS. AFM/AFC/AFE/Gemini = AIM Inc.
diameterMm: convert inches to millimetres (3/8 in = 9.525). Null if unknown.
state: US state name or 2-letter code if present. Null if unknown.`,
      prompt: text.slice(0, 1200),
    });
    return result.output ?? null;
  } catch (error) {
    console.error("[Source job parse]", error);
    return null;
  }
}

export async function parseBuyerJob(input: {
  diameterRaw: string;
  kind: string;
  oem: string;
  city: string;
  state: string;
  notes: string;
  buyerEmail: string;
}): Promise<ParsedBuyerJob> {
  const formMm = parseWireMm(input.diameterRaw);
  const formKind = cleanKind(input.kind);
  const formOem = cleanOem(input.oem);
  const formCity = input.city.trim();
  const formState = input.state.trim();
  const needsAi = Boolean(input.notes.trim()) || (!formMm && Boolean(input.diameterRaw.trim()));

  const ai = needsAi
    ? await extractJobWithAi(
        [
          input.diameterRaw && `Wire: ${input.diameterRaw}`,
          formKind && `Type: ${formKind}`,
          formOem && `OEM: ${formOem}`,
          formCity && `City: ${formCity}`,
          formState && `State: ${formState}`,
          input.notes,
        ]
          .filter(Boolean)
          .join("\n"),
      )
    : null;

  const spec: SourceJobSpec = {
    diameterMm: formMm ?? (ai?.diameterMm && ai.diameterMm > 0 ? roundMm(ai.diameterMm) : null),
    kind: formKind || cleanKind(ai?.kind ?? ""),
    oem: formOem || cleanOem(ai?.oem ?? ""),
    city: formCity || (ai?.city ?? "").trim(),
    state: formState || (ai?.state ?? "").trim(),
    buyerEmail: input.buyerEmail,
  };

  const usedAi = Boolean(ai);
  const usedForm = Boolean(formMm || formKind || formOem || formCity || formState);
  return {
    spec,
    parsedBy: usedAi && usedForm ? "form+ai" : usedAi ? "ai" : "form",
  };
}
