import { LitElement, html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";

import { mdiClose } from "@mdi/js";

import type { DialogData, Person } from "./types";

@customElement("dash-bouncer-dialog")
export class DashBouncerDialog extends LitElement {
  @state() private person: Person;

  public showDialog(params: DialogData): void {
    this.person = params.person;
  }

  render() {
    if (!this.person) {
      return nothing;
    }

    return html`
      <ha-dialog open .heading=${true} @closed=${this.closeDialog}>
        <div slot="heading" class="header_title">
          <ha-icon-button
            dialogAction="cancel"
            .path=${mdiClose}
            class="header_button"
          ></ha-icon-button>
          <span class="dialog-header">${this.person.name}</span>
        </div>
        asdasdasd asd a asdk nasd as dklasd alsk dnas dlkasn
      </ha-dialog>
    `;
  }

  private closeDialog(): void {
    this.person = undefined;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "dash-bouncer-dialog": DashBouncerDialog;
  }
}
