import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Sheet({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-xl px-5", className)}>{children}</div>;
}
