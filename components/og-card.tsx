export const ogSize = {
  width: 1200,
  height: 630,
};

export function OgCard({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#141613",
        color: "#f4f0e6",
        padding: "68px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", fontSize: 28 }}>
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 16,
            backgroundColor: "#e39a72",
            marginRight: 14,
          }}
        />
        <div style={{ display: "flex" }}>Tech Pulse</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#8ed0b3",
            marginBottom: 24,
          }}
        >
          {kicker}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 80 ? 48 : 60,
            lineHeight: 1.08,
            fontWeight: 600,
            letterSpacing: -1,
          }}
        >
          {title}
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 26, color: "#c8c1b4" }}>Jubaer Jami</div>
    </div>
  );
}
