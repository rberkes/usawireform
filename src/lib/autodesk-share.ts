export type AutodeskShare = {
  id: string;
  host: string;
  hub: string;
  shareId: string;
  permalink: string;
};

/**
 * Fusion Team / A360 public shares. Ids are used by `/api/autodesk-share?part=`.
 * Product pages look up a share whose id matches the catalog slug.
 */
export const autodeskShares: AutodeskShare[] = [
  {
    id: "rod",
    host: "https://myhub.autodesk360.com",
    hub: "ue28e1cdf",
    shareId: "SH28cd1QT2badd0ea72b2d049b5b1e2f6310",
    permalink: "https://a360.co/4gmm18q",
  },
  {
    id: "heavy-duty-wire-baskets",
    host: "https://myhub.autodesk360.com",
    hub: "ue28e1cdf",
    shareId: "SH28cd1QT2badd0ea72b249fa2236928bb6a",
    permalink:
      "https://myhub.autodesk360.com/ue28e1cdf/g/shares/SH28cd1QT2badd0ea72b249fa2236928bb6a",
  },
];

const autodeskSharesById = new Map(
  autodeskShares.map((share) => [share.id, share]),
);

export function getAutodeskShare(id: string) {
  return autodeskSharesById.get(id) ?? null;
}

export function autodeskShareForProduct(slug: string) {
  return getAutodeskShare(slug);
}

export function autodeskMetadataUrl(part: string) {
  const share = getAutodeskShare(part);
  if (!share) return null;
  return `${share.host}/${share.hub}/shares/metadata/${share.shareId}`;
}

export function autodeskSignUrl(part: string) {
  const share = getAutodeskShare(part);
  if (!share) return null;
  return `${share.host}/${share.hub}/shares/sign/${share.shareId}?oauth2=true`;
}
