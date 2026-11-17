"use client";

import { usePathname } from "next/navigation";

import { NavLinks } from "@/components/nav-links";

export function Nav() {
  const pathname = usePathname();
  return <NavLinks current={pathname} />;
}
