import { headers } from "next/headers";

export const BLOB_ACCESS = "private" as const;

type VercelRequestContext = {
  get?: () => { headers?: Record<string, string | undefined> };
};

function oidcFromRuntimeContext() {
  const slot = (globalThis as Record<symbol, VercelRequestContext | undefined>)[
    Symbol.for("@vercel/request-context")
  ];
  return slot?.get?.()?.headers?.["x-vercel-oidc-token"]?.trim() || undefined;
}

export type BlobAuth = {
  storeId?: string;
  oidcToken?: string;
  token?: string;
};

/** OIDC from the request, not the SDK refresh path (that fails in server actions). */
export async function blobAuth(request?: Request): Promise<BlobAuth> {
  let oidcToken =
    request?.headers.get("x-vercel-oidc-token")?.trim() ||
    oidcFromRuntimeContext();

  if (!oidcToken) {
    try {
      oidcToken = (await headers()).get("x-vercel-oidc-token")?.trim() || undefined;
    } catch {
      oidcToken = undefined;
    }
  }

  if (!oidcToken) {
    oidcToken = process.env.VERCEL_OIDC_TOKEN?.trim() || undefined;
  }

  const storeId = process.env.BLOB_STORE_ID?.trim() || undefined;
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim() || undefined;

  console.log("[blob auth]", {
    hasOidc: Boolean(oidcToken),
    hasStore: Boolean(storeId),
    hasRw: Boolean(token),
  });

  return {
    ...(storeId ? { storeId } : {}),
    ...(oidcToken ? { oidcToken } : {}),
    ...(token ? { token } : {}),
  };
}

export async function blobReady(request?: Request) {
  const auth = await blobAuth(request);
  return Boolean(auth.token || (auth.oidcToken && auth.storeId));
}

export function blobErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Blob store failed.";
}

const ADMIN_PREFIXES = ["quotes/", "quick-quotes/", "leads/", "careers/", "resumes/"];

export function isAdminBlobPath(path: string) {
  return Boolean(path) && !path.includes("..") && ADMIN_PREFIXES.some((p) => path.startsWith(p));
}

export function adminFileHref(path: string) {
  return `/admin/file?path=${encodeURIComponent(path)}`;
}
