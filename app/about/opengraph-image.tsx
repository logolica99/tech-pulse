import { ImageResponse } from "next/og";

import { OgCard, ogSize } from "@/components/og-card";
import { siteConfig } from "@/site.config";

export const alt = `About ${siteConfig.name}, edited by ${siteConfig.author.name}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<OgCard kicker="About" title={`Edited by ${siteConfig.author.name}.`} />, {
    ...size,
  });
}
