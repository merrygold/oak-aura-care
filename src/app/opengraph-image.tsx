import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const alt = "Oak & Aura Care — Support centred on you";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = readFileSync(join(process.cwd(), "public/images/logo.png"));
const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #3b0f6e 0%, #5a1e82 45%, #2d0a55 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "rgba(132, 204, 103, 0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(240, 180, 60, 0.14)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 160,
            right: 80,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255, 0.05)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "72px 90px",
            height: "100%",
          }}
        >
          {/* Logo + brand name row */}
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 40 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} alt="" width={80} height={80} style={{ borderRadius: 18 }} />
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "-0.5px",
              }}
            >
              Oak &amp; Aura Care
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              maxWidth: 820,
            }}
          >
            Support centred on you.
          </div>

          {/* Subtitle */}
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: "rgba(255,255,255,0.68)",
              fontWeight: 400,
              maxWidth: 700,
              lineHeight: 1.4,
            }}
          >
            Personalised NDIS disability &amp; aged care support across Australia.
          </div>

          {/* Accent pill */}
          <div
            style={{
              marginTop: 44,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "rgba(132, 204, 103, 0.25)",
                border: "1.5px solid rgba(132, 204, 103, 0.5)",
                borderRadius: 100,
                padding: "10px 24px",
                fontSize: 20,
                fontWeight: 600,
                color: "#a8e887",
              }}
            >
              onacare.com.au
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
