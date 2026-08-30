import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query} from "lit/decorators.js";

import { mdiClose } from "@mdi/js";

import type { HomeAssistant } from "../hass/types";
import { HaInput } from "../hass/types";

import type { AddRoleDialogData, Panel, DialogEntity, DialogEntityConfig, DialogDataSaveOp } from "../types/base";
import type { BouncerConfig } from "../types/backend";

import { BounceOption } from "../types/bounceOption";
import { openDialog } from "../utils/entity_dialog_helper";

@customElement("dash-bouncer-add-role-dialog")
export class DashBouncerAddRoleDialog extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _open = false;
  @state() private _valid = true;
  @state() private panels: Panel[];
  @state() private save: DialogDataSaveOp;

  @query("#role") private _input?: HaInput;

  public showDialog(params: AddRoleDialogData): void {
    this._open = true;
    this.panels = params.panels;
    this.save = params.save;
  }

  _panelsToDefaultConfig(panels: Panel[]): DialogEntityConfig {
    return { panels: {} };
  }

  _configureRole() {
    const role = this._input.value;
    if (role.length == 0) {
      this._valid = false
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const panels: Panel[] = this.panels;

    const entity: DialogEntity = { id: role, name: role };
    const third_option = BounceOption.skip;
    const config = this._panelsToDefaultConfig(panels);
    const save = this.save;
    openDialog(this, { entity, panels, third_option, config, save });
    this.closeDialog();
  }

  _onChange() {
    this._valid = this._input.value.length != 0
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
            id="role"
            .label=${"Role name"}
            .invalid=${!this._valid}
            validation-message=${"Non empty name required"}
            @change=${this._onChange}
          ></ha-input>
          <ha-button
            @click=${this._configureRole}
          >
              Next
          </ha-button>
        </div>
      </ha-dialog>
      `;
  }

  private closeDialog(): void {
    this._open = false
    this._input.value = ""
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
