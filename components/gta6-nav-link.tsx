"use client";

import Link from "next/link";
import { useEffect } from "react";

import { gta6NavFont } from "@/lib/gta6-font";
import { GTA6_NAV_EXPIRES_AT, isGta6NavLive } from "@/lib/gta6";

function syncGta6NavVisibility() {
  document.documentElement.setAttribute("data-gta6-nav", isGta6NavLive() ? "on" : "off");
}

export function Gta6NavLink({ href, active }: { href: string; active: boolean }) {
  useEffect(() => {
    syncGta6NavVisibility();
    const remaining = Date.parse(GTA6_NAV_EXPIRES_AT) - Date.now();
    if (remaining <= 0) return;
    const id = window.setTimeout(syncGta6NavVisibility, remaining + 1);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`${gta6NavFont.className} gta6-nav-link underline underline-offset-4`}
    >
      GTA 6
    </Link>
  );
}
