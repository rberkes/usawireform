import { ImageResponse } from "next/og";

export const alt = "USA Wire Form — 4–14 mm 3D CNC wire forming, Northeast Ohio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#ffffff",
          color: "#111111",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.28em",
            color: "#2D8CFF",
            fontWeight: 600,
          }}
        >
          USA
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 72,
            letterSpacing: "0.08em",
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          WIRE FORM
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "#5c5c5c",
            maxWidth: 900,
          }}
        >
          4–14 mm 3D CNC wire forming · Northeast Ohio
        </div>
      </div>
    ),
    { ...size },
  );
}
