import { ImageResponse } from "next/og";

import { OgCard, ogSize } from "@/components/og-card";
import { logoDataUrl, ogFonts } from "@/lib/og-fonts";
import { siteConfig } from "@/site.config";

export const alt = `About ${siteConfig.name}. ${siteConfig.author.name} writes it. ${siteConfig.owner.name} runs it.`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <OgCard
      logo={await logoDataUrl()}
      kicker="About"
      title={`${siteConfig.author.name} writes about the tech shaping what comes next.`}
    />,
    {
      ...size,
      fonts: await ogFonts(),
    },
  );
}
