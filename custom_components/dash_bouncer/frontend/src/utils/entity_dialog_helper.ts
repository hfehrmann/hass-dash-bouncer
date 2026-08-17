import { fireEvent } from "./fire_event";

import type { DialogData } from "../types/base";

const loadDialog = () => import("../dialog");

export const openDialog = (element: HTMLElement, data: DialogData): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "dash-bouncer-dialog",
    dialogImport: loadDialog,
    dialogParams: data,
  });
};

