import { hookCenterline, type HookTypeId } from "@/lib/hook-builder";
import type { Vec3 } from "@/lib/wire-geometry";

export type CvHookKind = "cv" | "90cv";

export type CvHookModel = {
  id: string;
  title: string;
  kind: CvHookKind;
  overallIn: number;
  dIn: number;
  openingIn: number;
  url: string;
};

/** In-band HCV lengths plus stock 3/8 in. Same C/V openings as the 1½ in bowl cards. */
export const CV_HOOK_MODELS: CvHookModel[] = [
  {
    id: "cv-6-180",
    title: "6 in · 0.180 in",
    kind: "cv",
    overallIn: 6,
    dIn: 0.18,
    openingIn: 1.5,
    url: "/models/cv-hooks/cv-6-180.glb",
  },
  {
    id: "cv-8-180",
    title: "8 in · 0.180 in",
    kind: "cv",
    overallIn: 8,
    dIn: 0.18,
    openingIn: 1.5,
    url: "/models/cv-hooks/cv-8-180.glb",
  },
  {
    id: "cv-12-180",
    title: "12 in · 0.180 in",
    kind: "cv",
    overallIn: 12,
    dIn: 0.18,
    openingIn: 1.5,
    url: "/models/cv-hooks/cv-12-180.glb",
  },
  {
    id: "cv-12-250",
    title: "12 in · 0.250 in",
    kind: "cv",
    overallIn: 12,
    dIn: 0.25,
    openingIn: 1.5,
    url: "/models/cv-hooks/cv-12-250.glb",
  },
  {
    id: "cv-18-180",
    title: "18 in · 0.180 in",
    kind: "cv",
    overallIn: 18,
    dIn: 0.18,
    openingIn: 1.5,
    url: "/models/cv-hooks/cv-18-180.glb",
  },
  {
    id: "cv-90-12-180",
    title: "90° · 12 in · 0.180 in",
    kind: "90cv",
    overallIn: 12,
    dIn: 0.18,
    openingIn: 1.5,
    url: "/models/cv-hooks/cv-90-12-180.glb",
  },
];

export const CV_HOOK_VIEWS = [
  { id: "iso", label: "Iso" },
  { id: "hang", label: "Hang" },
  { id: "c", label: "C eye" },
  { id: "v", label: "V locate" },
] as const;

export type CvHookViewId = (typeof CV_HOOK_VIEWS)[number]["id"];

export function cvHookCenterline3d(
  kind: CvHookKind,
  overallIn: number,
  openingIn: number,
): Vec3[] {
  const type: HookTypeId = kind;
  const { points } = hookCenterline(type, overallIn, openingIn);
  const midY = overallIn / 2;
  return points.map((p) => [p.x, p.y - midY, 0]);
}

export function getCvHookModel(id: string) {
  return CV_HOOK_MODELS.find((row) => row.id === id) ?? CV_HOOK_MODELS[2];
}
