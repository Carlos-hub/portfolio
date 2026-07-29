import { ImageResponse } from "next/og";
import { AUTHOR_SHORT, JOB_TITLE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${AUTHOR_SHORT} — ${JOB_TITLE}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          color: "#f5f5f5",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#39ff14",
          }}
        >
          Desenvolvedor Fullstack · Freelancer
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 120,
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          {AUTHOR_SHORT}
        </div>
        <div style={{ marginTop: 32, fontSize: 38, color: "#8a8a8a" }}>
          Sites, sistemas e apps sob medida — do back-end ao pixel final.
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            fontSize: 28,
            color: "#39ff14",
          }}
        >
          Web · Sistemas · Mobile · APIs · Qualquer linguagem
        </div>
      </div>
    ),
    size
  );
}
