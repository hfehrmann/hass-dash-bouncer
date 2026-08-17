import { fireEvent } from "./fire_event";

import type { DialogData } from "../types/base";

const loadAddRoleDialog = () => import("../addRoleDialog");

export const openAddRoleDialog = (element: HTMLElement): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "dash-bouncer-add-role-dialog",
    dialogImport: loadAddRoleDialog,
    dialogParams: {},
  });
};
