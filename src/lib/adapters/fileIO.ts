/**
 * Platform-agnostic JSON file import/export bridge.
 * Web/PWA uses Blob downloads and `<input type="file">`; Capacitor and Tauri
 * can swap in native file dialogs and share sheets.
 */
export interface FileIOAdapter {
  exportJson(filename: string, data: unknown): Promise<void>;
  importJson<T = unknown>(): Promise<T | null>;
}

/** Browser/PWA implementation using Blob download and hidden file input. */
export const browserFileIOAdapter: FileIOAdapter = {
  async exportJson(filename, data) {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  },

  importJson<T = unknown>() {
    return new Promise<T | null>((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json,.json";
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return resolve(null);
        try {
          const text = await file.text();
          resolve(JSON.parse(text) as T);
        } catch {
          resolve(null);
        }
      };
      input.oncancel = () => resolve(null);
      input.click();
    });
  },
};
