import { getAutodeskShare } from "./autodesk-share";

export type PastProject = {
  id: string;
  title: string;
  summary: string;
  permalink: string;
  host: string;
  hub: string;
  shareId: string;
};

const pastProjectCopy: { id: string; title: string; summary: string }[] = [
  {
    id: "rod",
    title: "Rod",
    summary:
      "Shop file from a rod we formed. Autodesk streams the latest version.",
  },
];

export const pastProjects: PastProject[] = pastProjectCopy.flatMap((item) => {
  const share = getAutodeskShare(item.id);
  return share ? [{ ...item, ...share }] : [];
});

const pastProjectsById = new Map(
  pastProjects.map((project) => [project.id, project]),
);

export function getPastProject(id: string) {
  return pastProjectsById.get(id) ?? null;
}

export function pastProjectHref(id: string) {
  return `/past-projects?project=${encodeURIComponent(id)}`;
}
