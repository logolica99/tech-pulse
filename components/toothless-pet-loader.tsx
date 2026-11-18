"use client";

import { useEffect } from "react";

const SCRIPT_SRC = "/toothless-pet.js";

function enabled(search: string): boolean {
  return new URLSearchParams(search).get("toothless_mode") === "true";
}

function petApi() {
  return (window as Window & { ToothlessPet?: { destroy: () => void } }).ToothlessPet;
}

function loadPet() {
  if (petApi() || document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
  const script = document.createElement("script");
  script.src = SCRIPT_SRC;
  script.setAttribute("data-scale", "2");
  document.body.appendChild(script);
}

function unloadPet() {
  petApi()?.destroy();
  document.querySelectorAll(`script[src="${SCRIPT_SRC}"]`).forEach((el) => el.remove());
}

export function ToothlessPetLoader() {
  useEffect(() => {
    const sync = () => {
      if (enabled(window.location.search)) loadPet();
      else unloadPet();
    };

    sync();

    const push = history.pushState.bind(history);
    const replace = history.replaceState.bind(history);
    history.pushState = (...args) => {
      const result = push(...args);
      sync();
      return result;
    };
    history.replaceState = (...args) => {
      const result = replace(...args);
      sync();
      return result;
    };
    window.addEventListener("popstate", sync);

    return () => {
      history.pushState = push;
      history.replaceState = replace;
      window.removeEventListener("popstate", sync);
    };
  }, []);

  return null;
}
