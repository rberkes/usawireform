import type { MetadataRoute } from "next";
import { COMPANY, SITE_URL } from "@/lib/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${COMPANY} — 4–14 mm 3D CNC Wire Forming`,
    short_name: COMPANY,
    description:
      "3D CNC wire forming in 4–14 mm. Corp headquarters in Northeast Ohio.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#2D8CFF",
  };
}
