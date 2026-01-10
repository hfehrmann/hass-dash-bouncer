export interface Themes {
  darkMode: boolean;
}

export interface HomeAssistant {
  themes: Themes;
  callApi<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    parameters?: Record<string, unknown>,
    headers?: Record<string, string>,
  ): Promise<T>;
}

export interface HaDialog {
  close(): void;
}

declare global {
  interface HASSDomEvents {
    "show-dialog": ShowDialogParams<unknown>;
    "dialog-closed": DialogClosedParams;
  }
}

interface ShowDialogParams<T> {
  dialogTag: keyof HTMLElementTagNameMap;
  dialogImport: () => Promise<unknown>;
  dialogParams: T;
  addHistory?: boolean;
}

interface DialogClosedParams {
  dialog: string;
}
