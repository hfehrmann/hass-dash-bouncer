import { fireEvent } from "./fire_event";

import type { DialogData, AddRoleDialogData } from "../types/base";

const loadDialog = () => import("../dialog");
const loadAddRoleDialog = () => import("../addRoleDialog");

export const openDialog = (element: HTMLElement, data: DialogData): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "dash-bouncer-dialog",
    dialogImport: loadDialog,
    dialogParams: data,
  });
};

export const openAddRoleDialog = (element: HTMLElement, data: AddRoleDialogData): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "dash-bouncer-add-role-dialog",
    dialogImport: loadAddRoleDialog,
    dialogParams: data,
  });
};

