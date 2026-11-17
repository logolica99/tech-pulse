import { ImageResponse } from "next/og";

import { ogFonts } from "@/lib/og-fonts";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          color: "#1a1a1a",
          fontFamily: "Playfair",
          fontSize: 20,
        }}
      >
        B
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
