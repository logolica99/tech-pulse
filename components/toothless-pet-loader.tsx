"use client";

import { useEffect } from "react";

const SCRIPT_SRC = "/toothless-pet.js";
const STORAGE_KEY = "toothless_mode";
const CHANGE_EVENT = "toothless:change";

type DesktopPetInstance = {
  pet: () => boolean;
  fly: () => boolean;
  destroy: () => boolean;
  reset: () => boolean;
  getState: () => string;
};

type DesktopPetCtor = new (options?: {
  size?: number;
  margin?: number;
  autoAsk?: boolean;
}) => DesktopPetInstance;

type ToothlessWindow = Window & {
  DesktopPet?: DesktopPetCtor;
  desktopPet?: DesktopPetInstance;
};

function toothlessWindow(): ToothlessWindow {
  return window as ToothlessWindow;
}

function petCtor(): DesktopPetCtor | undefined {
  return toothlessWindow().DesktopPet;
}

function petApi(): DesktopPetInstance | undefined {
  return toothlessWindow().desktopPet;
}

function setPet(pet: DesktopPetInstance | undefined) {
  if (pet) toothlessWindow().desktopPet = pet;
  else delete toothlessWindow().desktopPet;
}

function isPetVisible(): boolean {
  const pet = petApi();
  return !!pet && pet.getState() !== "destroyed";
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

function sizeForViewport(): number {
  // Default display size is 90px wide (64px tall). Use a smaller size on
  // phones so the pet does not cover much of the page text.
  return window.innerWidth < 440 ? 68 : 90;
}

function stripQueryParam() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has("toothless_mode")) return;
  url.searchParams.delete("toothless_mode");
  const search = url.searchParams.toString();
  const next = `${url.pathname}${search ? `?${search}` : ""}${url.hash}`;
  history.replaceState(history.state, "", next);
}

function startPet(flyOnReady: boolean) {
  if (isPetVisible()) {
    if (flyOnReady) petApi()?.fly();
    return;
  }

  const Ctor = petCtor();
  if (!Ctor) return;

  petApi()?.destroy();
  const pet = new Ctor({ size: sizeForViewport() });
  setPet(pet);
  if (flyOnReady) pet.fly();
  notify();
}

function loadPet(flyOnReady: boolean) {
  if (petCtor()) {
    startPet(flyOnReady);
    return;
  }

  const onReady = () => startPet(flyOnReady);
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
  if (existing) {
    existing.addEventListener("load", onReady, { once: true });
    existing.addEventListener("error", notify, { once: true });
    return;
  }

  const script = document.createElement("script");
  script.src = SCRIPT_SRC;
  script.setAttribute("data-auto-start", "false");
  script.addEventListener("load", onReady, { once: true });
  script.addEventListener("error", notify, { once: true });
  document.body.appendChild(script);
}

function unloadPet() {
  petApi()?.destroy();
  setPet(undefined);
}

export function isToothlessWanted(): boolean {
  if (typeof window === "undefined") return false;
  return queryWantsPet() || readPreference() === "on";
}

export function isToothlessAwake(): boolean {
  return typeof window !== "undefined" && isPetVisible();
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
  return () => {
    window.removeEventListener(CHANGE_EVENT, listener);
  };
}

function syncFromLocation() {
  if (isToothlessWanted()) {
    const already = isPetVisible();
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
