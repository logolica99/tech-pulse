import { ImageResponse } from "next/og";

import { OgCard, ogSize } from "@/components/og-card";
import { ogFonts } from "@/lib/og-fonts";

export const alt = "Blogs, a daily briefing edited by Jubaer Jami";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <OgCard kicker="Posts" title="AI, energy, robotics, space, and notable technology." />,
    { ...size, fonts: await ogFonts() },
  );
}
