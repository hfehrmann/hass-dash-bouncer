export interface Themes {
  darkMode: boolean;
}

export interface HomeAssistant {
  states: [any]
  themes: Themes,
  callApi<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    parameters?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<T>;

}

export interface Route {
}

export interface CustomPanelInfo {
  config: any
}
