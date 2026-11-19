"use client";

import { useEffect } from "react";

const SCRIPT_SRC = "/toothless-pet.js";
const STORAGE_KEY = "toothless_mode";
const CHANGE_EVENT = "toothless:change";

type ToothlessApi = {
  pet: () => boolean;
  fly: () => boolean;
  destroy: () => void;
};

function petApi(): ToothlessApi | undefined {
  return (window as Window & { ToothlessPet?: ToothlessApi }).ToothlessPet;
}

function queryWantsPet(): boolean {
  return new URLSearchParams(window.location.search).get("toothless_mode") === "true";
}

function readPreference(): "on" | "off" | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === "on" || value === "off") return value;
  } catch {
    // Private mode or blocked storage should not break the page.
  }
  return null;
}

function writePreference(value: "on" | "off") {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Ignore quota / privacy errors.
  }
}

function notify() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function scaleForViewport(): string {
  return window.innerWidth < 440 ? "1.5" : "2";
}

function stripQueryParam() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has("toothless_mode")) return;
  url.searchParams.delete("toothless_mode");
  const search = url.searchParams.toString();
  const next = `${url.pathname}${search ? `?${search}` : ""}${url.hash}`;
  history.replaceState(history.state, "", next);
}

function flyWhenReady() {
  const run = () => petApi()?.fly();
  if (petApi()) {
    run();
    return;
  }
  window.addEventListener("toothless:ready", run, { once: true });
}

function loadPet(flyOnReady: boolean) {
  if (petApi()) {
    if (flyOnReady) petApi()?.fly();
    return;
  }
  if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
    if (flyOnReady) flyWhenReady();
    return;
  }
  const script = document.createElement("script");
  script.src = SCRIPT_SRC;
  script.setAttribute("data-scale", scaleForViewport());
  if (flyOnReady) flyWhenReady();
  document.body.appendChild(script);
}

function unloadPet() {
  petApi()?.destroy();
  document.querySelectorAll(`script[src="${SCRIPT_SRC}"]`).forEach((el) => el.remove());
}

export function isToothlessWanted(): boolean {
  if (typeof window === "undefined") return false;
  return queryWantsPet() || readPreference() === "on";
}

export function isToothlessAwake(): boolean {
  return typeof window !== "undefined" && !!petApi();
}

export function wakeToothless() {
  writePreference("on");
  loadPet(true);
  notify();
}

export function sendToothlessAway() {
  writePreference("off");
  unloadPet();
  stripQueryParam();
  notify();
}

export function toggleToothless(): boolean {
  if (isToothlessAwake() || isToothlessWanted()) {
    sendToothlessAway();
    return false;
  }
  wakeToothless();
  return true;
}

export function subscribeToothlessChange(listener: () => void) {
  window.addEventListener(CHANGE_EVENT, listener);
  window.addEventListener("toothless:ready", listener);
  return () => {
    window.removeEventListener(CHANGE_EVENT, listener);
    window.removeEventListener("toothless:ready", listener);
  };
}

function syncFromLocation() {
  if (isToothlessWanted()) {
    const already = !!petApi() || !!document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (queryWantsPet()) writePreference("on");
    loadPet(!already);
    notify();
  } else {
    unloadPet();
    notify();
  }
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

function onToothlessKeyDown(event: KeyboardEvent) {
  if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
  if (isTypingTarget(event.target)) return;

  if (event.key === "Escape") {
    if (isToothlessAwake() || isToothlessWanted()) sendToothlessAway();
    return;
  }

  if (event.key === "t" || event.key === "T") {
    toggleToothless();
  }
}

export function ToothlessPetLoader() {
  useEffect(() => {
    syncFromLocation();

    const push = history.pushState.bind(history);
    const replace = history.replaceState.bind(history);
    history.pushState = (...args) => {
      const result = push(...args);
      syncFromLocation();
      return result;
    };
    history.replaceState = (...args) => {
      const result = replace(...args);
      syncFromLocation();
      return result;
    };
    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener("keydown", onToothlessKeyDown);

    return () => {
      history.pushState = push;
      history.replaceState = replace;
      window.removeEventListener("popstate", syncFromLocation);
      window.removeEventListener("keydown", onToothlessKeyDown);
    };
  }, []);

  return null;
}
