import { bend, rot, straight } from "./geometry";
import type { DfmStatus, WireFormGeometry } from "./types";

export type TwinFixture = {
  id: string;
  title: string;
  expect: DfmStatus;
  expectFailure?: string;
  geometry: WireFormGeometry;
};

/** Brief example: 12.70 mm, 90 / 45 / rot / 90, R19.05. */
const briefExample: WireFormGeometry = {
  diameterMm: 12.7,
  materialId: "1018",
  developedLengthMm: 864.3,
  segments: [
    straight("S1", 122),
    bend(1, 90, 19.05),
    straight("S2", 181.4),
    bend(2, 45, 19.05),
    rot("ROT1", 90),
    straight("S3", 200),
    bend(3, 90, 19.05),
    straight("S4", 160),
  ],
};

export const TWIN_FIXTURES: TwinFixture[] = [
  {
    id: "brief-example",
    title: "Brief example — 12.70 mm 1018, R19.05",
    expect: "PASS",
    geometry: briefExample,
  },
  {
    id: "stock-u",
    title: "Stock 1/2 in U — two 90° at 1.5×D",
    expect: "PASS",
    geometry: {
      diameterMm: 12.7,
      materialId: "1018",
      segments: [
        straight("S1", 160),
        bend(1, 90, 19.05),
        straight("S2", 80),
        bend(2, 90, 19.05),
        straight("S3", 160),
      ],
    },
  },
  {
    id: "s-hook-eyes",
    title: "3/8 in S-hook — 240° eyes",
    expect: "PASS",
    geometry: {
      diameterMm: 9.53,
      materialId: "1018",
      segments: [
        bend(1, 240, 12),
        straight("S1", 40),
        bend(2, -240, 12),
      ],
    },
  },
  {
    id: "tight-stainless",
    title: "1/2 in 304 at 1×D",
    expect: "FAIL",
    expectFailure: "inside_radius_too_tight",
    geometry: {
      diameterMm: 12.7,
      materialId: "304",
      segments: [
        straight("S1", 150),
        bend(1, 90, 12.7),
        straight("S2", 150),
      ],
    },
  },
  {
    id: "short-straight",
    title: "Starved straight before bend 2",
    expect: "FAIL",
    expectFailure: "straight_below_2xd",
    geometry: {
      diameterMm: 9.53,
      materialId: "1018",
      segments: [
        straight("S1", 80),
        bend(1, 90, 12),
        straight("S2", 12),
        bend(2, 90, 12),
        straight("S3", 80),
      ],
    },
  },
  {
    id: "under-band",
    title: "3 mm spring clip — wrong cell",
    expect: "FAIL",
    expectFailure: "diameter_out_of_band",
    geometry: {
      diameterMm: 3,
      materialId: "spring",
      segments: [straight("S1", 40), bend(1, 90, 6), straight("S2", 40)],
    },
  },
  {
    id: "over-band",
    title: "16 mm — over the plate",
    expect: "FAIL",
    expectFailure: "diameter_out_of_band",
    geometry: {
      diameterMm: 16,
      materialId: "1018",
      segments: [straight("S1", 80), bend(1, 90, 20), straight("S2", 80)],
    },
  },
  {
    id: "closed-ring",
    title: "Closed ring, no gap",
    expect: "REVIEW",
    expectFailure: "closed_centerline",
    geometry: {
      diameterMm: 9.53,
      materialId: "1018",
      closed: true,
      segments: [bend(1, 360, 30)],
    },
  },
  {
    id: "needs-tooling",
    title: "6.35 mm in band, not stock",
    expect: "REVIEW",
    expectFailure: "non_stock_diameter",
    geometry: {
      diameterMm: 6.35,
      materialId: "1018",
      segments: [
        straight("S1", 80),
        bend(1, 90, 10),
        straight("S2", 80),
      ],
    },
  },
  {
    id: "reversing-zigzag",
    title: "Opposite wraps on a 2.5×D straight",
    expect: "REVIEW",
    expectFailure: "reversing_short_straight",
    geometry: {
      diameterMm: 9.53,
      materialId: "1018",
      segments: [
        straight("S1", 80),
        bend(1, 90, 12),
        straight("S2", 24),
        bend(2, -90, 12),
        straight("S3", 80),
      ],
    },
  },
];
