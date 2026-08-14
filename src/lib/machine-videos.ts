import type { MachineVideo } from "@/components/MachineVideoSection";

export const machineVideos: Record<string, MachineVideo[]> = {
  "robomac-tf": [
    { id: "jcE_hHB4uoI", title: "NumAlliance Industry 4.0 Automated Wire Forming Cell" },
    { id: "Vy2zcwGn0bQ", title: "Robomac TF Wire Bending Machine Demo" },
  ],
  "robomac-e-motion": [
    { id: "jcE_hHB4uoI", title: "NumAlliance Industry 4.0 Production Cell" },
    { id: "K8LvdD2nKYQ", title: "Electric CNC Wire Bending Technology" },
  ],
  "robomac-tfe": [
    { id: "jcE_hHB4uoI", title: "NumAlliance Automated Wire Forming Systems" },
  ],
  "robomac-2-heads": [
    { id: "jcE_hHB4uoI", title: "NumAlliance Dual-Head Wire Bending Cell" },
  ],
  "robomac-r4xx": [
    { id: "jcE_hHB4uoI", title: "High-Speed Wire Forming Production" },
  ],
  frx: [
    { id: "jcE_hHB4uoI", title: "NumAlliance CNC Wire and Spring Forming" },
  ],
  ftx: [
    { id: "jcE_hHB4uoI", title: "NumAlliance FTX Double Bend Technology" },
    { id: "Vy2zcwGn0bQ", title: "Advanced Wire Bending Demonstration" },
  ],
  f2d: [
    { id: "jcE_hHB4uoI", title: "NumAlliance 2D Frame Bending Systems" },
  ],
};

export function getVideosForMachine(slug: string): MachineVideo[] {
  return machineVideos[slug] ?? [];
}
