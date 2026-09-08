import { fireEvent } from "./fire_event";

import type {
  EntityDialogData,
  AddRoleDialogData,
  ConfirmationDialogData,
} from "../types/base";

const loadDialog = () => import("../dialogs/entityDialog");
const loadAddRoleDialog = () => import("../dialogs/addRoleDialog");
const loadConfirmationDialog = () => import("../dialogs/confirmationDialog");

export const openDialog = (
  element: HTMLElement,
  data: EntityDialogData,
): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "dash-bouncer-entity-dialog",
    dialogImport: loadDialog,
    dialogParams: data,
  });
};

export const openAddRoleDialog = (
  element: HTMLElement,
  data: AddRoleDialogData,
): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "dash-bouncer-add-role-dialog",
    dialogImport: loadAddRoleDialog,
    dialogParams: data,
  });
};

export const openConfirmationDialog = (
  element: HTMLElement,
  data: ConfirmationDialogData,
): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "dash-bouncer-confirmation-dialog",
    dialogImport: loadConfirmationDialog,
    dialogParams: data,
  });
};
