import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { mdiClose } from "@mdi/js";

import type { HomeAssistant } from "./hass/types";

@customElement("dash-bouncer-add-role-dialog")
export class DashBouncerAddRoleDialog extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _open = false;

  public showDialog(params: {}): void {
    console.log("test");
    this._open = true;
  }

  render() {
    const darkMode = this.hass.themes.darkMode;
    const uiMode = darkMode ? "dark" : "light";

    return html`
      <ha-dialog
        class="dashb-main ${uiMode}"
        .heading=${true}
        .open=${this._open}
        @closed=${this.closeDialog}
      >
        <div slot="heading" class="header_title">
          <ha-icon-button
            dialogAction="cancel"
            .path=${mdiClose}
            class="header_button"
          ></ha-icon-button>
          <h2><span class="dialog-header">Test</span></h2>
        </div>
        <div class="container">
          <ha-input
            .label=${"Role name"}
            .name=${"test"}
          ></ha-input>
          <ha-button>Next</ha-button>
        </div>
      </ha-dialog>
      `;
  }

  private closeDialog(): void {
    this._open = false
  }

  static styles = css`
    ha-input {
      width: 100%;
      margin: auto;
    }
    .container {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "dash-bouncer-add-role-dialog": DashBouncerAddRoleDialog;
  }
}
