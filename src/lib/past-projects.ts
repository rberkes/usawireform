export type PastProject = {
  id: string;
  title: string;
  summary: string;
  permalink: string;
  host: string;
  hub: string;
  shareId: string;
};

/**
 * Fusion Team / A360 public shares of jobs we formed.
 * Add a share by resolving the a360.co link to hub + shareId.
 */
export const pastProjects: PastProject[] = [
  {
    id: "rod",
    title: "Rod",
    summary: "Shop file from a rod we formed. Autodesk streams the latest version.",
    permalink: "https://a360.co/4gmm18q",
    host: "https://myhub.autodesk360.com",
    hub: "ue28e1cdf",
    shareId: "SH28cd1QT2badd0ea72b2d049b5b1e2f6310",
  },
];

const pastProjectsById = new Map(
  pastProjects.map((project) => [project.id, project]),
);

export function getPastProject(id: string) {
  return pastProjectsById.get(id) ?? null;
}

export function pastProjectHref(id: string) {
  return `/past-projects?project=${encodeURIComponent(id)}`;
}
