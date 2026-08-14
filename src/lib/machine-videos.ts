import type { MachineVideo } from "@/components/MachineVideoSection";

export const machineVideos: Record<string, MachineVideo[]> = {
  "numalliance-robomac-tf": [
    { id: "jcE_hHB4uoI", title: "NumAlliance Industry 4.0 Automated Wire Forming Cell" },
    { id: "Vy2zcwGn0bQ", title: "Robomac TF Wire Bending Machine Demo" },
  ],
  "numalliance-robomac-e-motion": [
    { id: "jcE_hHB4uoI", title: "NumAlliance Industry 4.0 Production Cell" },
    { id: "K8LvdD2nKYQ", title: "Electric CNC Wire Bending Technology" },
  ],
  "numalliance-robomac-tfe": [
    { id: "jcE_hHB4uoI", title: "NumAlliance Automated Wire Forming Systems" },
  ],
  "numalliance-robomac-2-heads": [
    { id: "jcE_hHB4uoI", title: "NumAlliance Dual-Head Wire Bending Cell" },
  ],
  "numalliance-robomac-r4xx": [
    { id: "jcE_hHB4uoI", title: "High-Speed Wire Forming Production" },
  ],
  "numalliance-frx": [
    { id: "jcE_hHB4uoI", title: "NumAlliance CNC Wire and Spring Forming" },
  ],
  "numalliance-ftx": [
    { id: "jcE_hHB4uoI", title: "NumAlliance FTX Double Bend Technology" },
    { id: "Vy2zcwGn0bQ", title: "Advanced Wire Bending Demonstration" },
  ],
  "numalliance-f2d": [
    { id: "jcE_hHB4uoI", title: "NumAlliance 2D Frame Bending Systems" },
  ],
};

export function getVideosForMachine(slug: string): MachineVideo[] {
  return machineVideos[slug] ?? [];
}
