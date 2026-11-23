/**
 * Platform-agnostic key/value storage bridge.
 * Defaults to `localStorage` for web/PWA; can be swapped for IndexedDB,
 * Capacitor Preferences, or Tauri store without touching UI or session logic.
 */
export interface StorageAdapter {
  get(key: string): string | null;
  set(key: string, value: string): void;
  remove(key: string): void;
}

/** Browser/WebView storage adapter with safe guards for SSR or restricted contexts. */
export const browserStorageAdapter: StorageAdapter = {
  get(key) {
    try {
      return typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      if (typeof localStorage !== "undefined") localStorage.setItem(key, value);
    } catch {
      // Ignore quota / privacy-mode errors
    }
  },
  remove(key) {
    try {
      if (typeof localStorage !== "undefined") localStorage.removeItem(key);
    } catch {
      // Ignore restricted-context errors
    }
  },
};
