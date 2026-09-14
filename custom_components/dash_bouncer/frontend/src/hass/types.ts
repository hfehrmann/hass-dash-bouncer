export interface Themes {
  darkMode: boolean;
}

export interface HomeAssistantSystemData {
  default_panel?: string;
}

export interface HomeAssistant {
  themes: Themes;
  systemData?: HomeAssistantSystemData;
  callApi<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    parameters?: Record<string, unknown>,
    headers?: Record<string, string>,
  ): Promise<T>;
}

export class HaInput {
  value: string;
}

export class HaDropdownSelectEvent {
  detail: { item: { value: string } };
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
