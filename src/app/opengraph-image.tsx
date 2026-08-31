import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Numalliance Robomac 214TF CNC wire forming machine — USA Wire Form, Northeast Ohio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const photo = await readFile(
    join(process.cwd(), "public/shop/robomac-214tf.jpg"),
  );
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#111111",
        }}
      >
        <img
          src={src}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            objectFit: "cover",
            objectPosition: "center 42%",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 168,
            display: "flex",
            background:
              "linear-gradient(180deg, rgba(8,10,14,0) 0%, rgba(8,10,14,0.88) 42%, rgba(8,10,14,0.96) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 168,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "0 56px 36px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 22,
                letterSpacing: "0.28em",
                color: "#2D8CFF",
                fontWeight: 600,
              }}
            >
              USA
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 44,
                letterSpacing: "0.1em",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1,
              }}
            >
              WIRE FORM
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              color: "#d7dce3",
              fontSize: 22,
            }}
          >
            <div>Numalliance Robomac 214TF</div>
            <div style={{ marginTop: 6, color: "#9aa3ae" }}>
              4–14 mm 3D CNC · Northeast Ohio
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
