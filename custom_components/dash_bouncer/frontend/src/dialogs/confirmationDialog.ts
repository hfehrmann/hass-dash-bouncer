import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query} from "lit/decorators.js";

import type { HomeAssistant } from "../hass/types";
import type { ConfirmationDialogData,ConfirmationDialogDeleteOp } from "../types/base";

import { BounceOption } from "../types/bounceOption";

@customElement("dash-bouncer-confirmation-dialog")
export class DashBouncerConfirmationDialog extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _open = false;
  @state() private text: string
  @state() private delete: ConfirmationDialogDeleteOp;

  public showDialog(params: ConfirmationDialogData): void {
    this._open = true;
    this.text = params.text;
    this.delete = params.delete;
  }

  private async _deleteAction() {
    await this.delete();
    this.closeDialog();
  }

  render() {
    const darkMode = this.hass.themes.darkMode;
    const uiMode = darkMode ? "dark" : "light";

    return html`
      <ha-dialog
        class="dashb-main ${uiMode}"
        header-title="Delete role"
        type="alert"
        .heading=${true}
        .open=${this._open}
        @closed=${this.closeDialog}
      >
        <div>
          ${this.text}
        </div>
        <ha-dialog-footer slot="footer">
          <ha-button
            slot="secondaryAction"
            appearance="filled"
            @click=${this.closeDialog}>
            Cancel
          </ha-button>
          <ha-button
            slot="primaryAction"
            variant="danger"
            @click=${this._deleteAction}
          >
            Delete
          </ha-button>
        </ha-dialog-footer>
      </ha-dialog>
      `;
  }

  private closeDialog(): void {
    this._open = false
    this.delete = undefined;
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
    "dash-bouncer-confirmation-dialog": DashBouncerConfirmationDialog;
  }
}
