import { getPastProject } from "./past-projects";

export function getAutodeskShare(part: string) {
  return getPastProject(part);
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
