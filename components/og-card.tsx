import { siteConfig } from "@/site.config";

export const ogSize = {
  width: 1200,
  height: 630,
};

export function OgCard({ kicker, title }: { kicker: string; title: string }) {
  const titleSize = title.length > 90 ? 42 : title.length > 64 ? 52 : 60;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        color: "#1a1a1a",
        padding: "64px",
        fontFamily: "Playfair",
      }}
    >
      <div style={{ display: "flex", fontSize: 28 }}>{siteConfig.name}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 22, color: "#555555" }}>{kicker}</div>
        <div style={{ display: "flex", marginTop: 16, fontSize: titleSize, lineHeight: 1.2 }}>{title}</div>
      </div>
      <div style={{ display: "flex", fontSize: 22, color: "#555555" }}>{siteConfig.author.name}</div>
    </div>
  );
}
