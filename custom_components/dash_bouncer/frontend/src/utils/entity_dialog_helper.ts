import { fireEvent } from "./fire_event";

import type { EntityDialogData, AddRoleDialogData } from "../types/base";

const loadDialog = () => import("../dialogs/entityDialog");
const loadAddRoleDialog = () => import("../dialogs/addRoleDialog");

export const openDialog = (element: HTMLElement, data: EntityDialogData): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "dash-bouncer-entity-dialog",
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

