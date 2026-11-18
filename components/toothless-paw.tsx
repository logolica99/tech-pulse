"use client";

import { useEffect, useState } from "react";

import {
  isToothlessAwake,
  isToothlessWanted,
  subscribeToothlessChange,
  toggleToothless,
} from "@/components/toothless-pet-loader";

const PAW = [
  "..............",
  "...##....##...",
  "..####..####..",
  "..####..####..",
  "...##.##.##...",
  "......##......",
  "....######....",
  "...########...",
  "..##########..",
  "..##########..",
  "...########...",
  "....######....",
  "..............",
  "..............",
];

function PixelPaw() {
  const cells = PAW.flatMap((row, y) =>
    [...row].flatMap((cell, x) =>
      cell === "#" ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} /> : [],
    ),
  );

  return (
    <svg
      viewBox="0 0 14 14"
      width="14"
      height="14"
      aria-hidden="true"
      shapeRendering="crispEdges"
      fill="currentColor"
      className="opacity-35 transition-opacity"
    >
      {cells}
    </svg>
  );
}

export function ToothlessPaw() {
  const [awake, setAwake] = useState(false);

  useEffect(() => {
    const sync = () => setAwake(isToothlessAwake() || isToothlessWanted());
    sync();
    return subscribeToothlessChange(sync);
  }, []);

  return (
    <button
      type="button"
      aria-label={awake ? "Send Toothless away" : "Wake Toothless"}
      aria-pressed={awake}
      onClick={() => toggleToothless()}
      className="relative -my-2 ml-0.5 inline-flex size-8 shrink-0 appearance-none items-center justify-center align-middle text-muted [-webkit-tap-highlight-color:transparent] touch-manipulation select-none border-0 bg-transparent p-0 hover:[&_svg]:opacity-70 focus-visible:[&_svg]:opacity-70 aria-pressed:[&_svg]:opacity-55"
    >
      <PixelPaw />
    </button>
  );
}
