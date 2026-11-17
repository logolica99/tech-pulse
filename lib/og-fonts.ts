import { readFile } from "node:fs/promises";
import path from "node:path";

const regular = readFile(path.join(process.cwd(), "assets/fonts/PlayfairDisplay-Regular.woff"));
const bold = readFile(path.join(process.cwd(), "assets/fonts/PlayfairDisplay-Bold.woff"));

export async function ogFonts() {
  const [regularData, boldData] = await Promise.all([regular, bold]);

  return [
    { name: "Playfair", data: regularData, weight: 400 as const, style: "normal" as const },
    { name: "Playfair", data: boldData, weight: 700 as const, style: "normal" as const },
  ];
}
