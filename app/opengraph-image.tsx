import { ImageResponse } from "next/og";

import { OgCard, ogSize } from "@/components/og-card";

export const alt = "Tech Pulse, a daily briefing edited by Jubaer Jami";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard kicker="Daily briefing" title="AI, energy, and the technology around them." />,
    { ...size },
  );
}
