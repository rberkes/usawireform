import { NextRequest } from "next/server";
import {
  autodeskMetadataUrl,
  autodeskSignUrl,
  getAutodeskShare,
} from "@/lib/autodesk-share";

export const dynamic = "force-dynamic";

function encodeUrn(urn: string) {
  return Buffer.from(urn)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

type ShareMetadata = {
  success?: { body?: { urn?: string } };
};

type ShareToken = {
  accessToken?: string;
  validitySeconds?: string | number;
};

async function readJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Autodesk share request failed (${response.status}).`);
  }
  return (await response.json()) as T;
}

export async function GET(request: NextRequest) {
  const part = request.nextUrl.searchParams.get("part") ?? "";
  if (!getAutodeskShare(part)) {
    return Response.json({ error: "Unknown Autodesk share." }, { status: 404 });
  }

  const metadataUrl = autodeskMetadataUrl(part);
  const signUrl = autodeskSignUrl(part);
  if (!metadataUrl || !signUrl) {
    return Response.json({ error: "Unknown Autodesk share." }, { status: 404 });
  }

  try {
    const [metadata, token] = await Promise.all([
      readJson<ShareMetadata>(metadataUrl),
      readJson<ShareToken>(signUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      }),
    ]);

    const urn = metadata.success?.body?.urn;
    const accessToken = token.accessToken;
    const expiresIn = Number(token.validitySeconds ?? 0);

    if (!urn || !accessToken || !expiresIn) {
      return Response.json(
        { error: "Autodesk share is not ready to view." },
        { status: 502 },
      );
    }

    return Response.json(
      {
        urn: encodeUrn(urn),
        accessToken,
        expiresIn,
      },
      {
        headers: {
          "Cache-Control": "private, no-store",
        },
      },
    );
  } catch {
    return Response.json(
      { error: "Could not reach the Autodesk share." },
      { status: 502 },
    );
  }
}
