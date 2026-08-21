/** True when Blob can write: static token, or Vercel OIDC + connected store. */
export function blobReady() {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.VERCEL && process.env.BLOB_STORE_ID),
  );
}

export const BLOB_ACCESS = "private" as const;

const ADMIN_PREFIXES = ["quotes/", "quick-quotes/", "leads/", "careers/", "resumes/"];

export function isAdminBlobPath(path: string) {
  return Boolean(path) && !path.includes("..") && ADMIN_PREFIXES.some((p) => path.startsWith(p));
}

export function adminFileHref(path: string) {
  return `/admin/file?path=${encodeURIComponent(path)}`;
}
