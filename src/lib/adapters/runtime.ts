/** Runtime shell detection for selecting platform-specific hardware adapters. */
export type RuntimeTarget = "tauri" | "capacitor" | "pwa";

export function detectRuntime(): RuntimeTarget {
  if (typeof window === "undefined") return "pwa";
  const w = window as unknown as Record<string, unknown>;
  if ("__TAURI_INTERNALS__" in w || "__TAURI__" in w) return "tauri";
  if ("Capacitor" in w) return "capacitor";
  return "pwa";
}
