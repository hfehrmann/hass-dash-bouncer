import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { mdiClose, mdiCheck, mdiCancel, mdiHomeCircleOutline } from "@mdi/js";

import { fireEvent } from "../utils/fire_event";
import type { HASSDomEvent } from "../utils/fire_event";

import type { HomeAssistant } from "../hass/types";

import { styles } from "../hass/styles";

import type {
  EntityDialogData,
  DialogDataSaveOp,
  DialogDataDeleteOp,
  DialogEntity,
  DialogEntityConfig,
  Panel,
  RoleConfig,
} from "../types/base";
import type { BouncerConfig } from "../types/backend";
import { BounceOption, bounceOption2string } from '../types/bounceOption';

import { openConfirmationDialog } from "../utils/entity_dialog_helper";

import { configToBouncerConfig } from "../utils/config_transformer";
import type { DashBouncerRoleSelectionData } from "../roleSelection";

const DEFAULT_PANEL = "home";

@customElement("dash-bouncer-entity-dialog")
export class DashBouncerEntityDialog extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private title_kind: string;
  @state() private entity: DialogEntity;
  @state() private panels: Panel[];
  @state() private third_option: BounceOption;
  @state() private config: DialogEntityConfig;
  @state() private role_bounce_map?: Record<string, RoleConfig>;
  @state() private save: DialogDataSaveOp;
  @state() private delete?: DialogDataDeleteOp;
  @state() private systemDefaultPanel: string;
  @state() private options: BounceOption[];

  @state() private _open = false;

  public showDialog(params: EntityDialogData): void {
    this.title_kind = params.title_kind;
    this.entity = params.entity;
    this.panels = params.panels;
    this.third_option = params.third_option;
    this.config = params.config;
    this.role_bounce_map = params.role_bounce_map;
    this.save = params.save;
    this.delete = params.delete;
    this.systemDefaultPanel =
      this.hass.systemData?.default_panel ?? DEFAULT_PANEL;
    this._open = true;

    this.options = [BounceOption.allow, BounceOption.block, this.third_option];
  }

  private _defaultSelect(event: CustomEvent): void {
    this.config = { ...this.config, default: event.detail };
  }

  private _panelSelect(event: CustomEvent): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const urlPath = (event.target as any).panel_url;
    const option: BounceOption = event.detail;

    if (option == this.third_option) {
      const { [urlPath]: _, ...rest } = this.config.panels;
      this.config = {
        ...this.config,
        panels: {
          ...rest,
        },
      };
    } else {
      this.config = {
        ...this.config,
        panels: {
          ...this.config.panels,
          [urlPath]: event.detail,
        },
      };
    }
  }

  private _setTable(option: BounceOption) {
    if (option == this.third_option) {
      this.config = {
        ...this.config,
        panels: {},
      };
    } else {
      const panels_config: Record<string, BounceOption> = {};
      for (const panel of this.panels) {
        panels_config[panel.url_path] = option;
      }
      this.config = {
        ...this.config,
        panels: panels_config,
      };
    }
  }

  private async _save() {
    const newConfig = await this.save(this.entity, this.config);
    fireEvent(this, "dash-bouncer-new-config", { config: newConfig });
    this._open = false;
  }

  private async _delete() {
    const deleteOp = this.delete;
    if (deleteOp == null) {
      return;
    }

    const deleteConfirmation = async () => {
      const newConfig = await deleteOp(this.entity);
      fireEvent(this, "dash-bouncer-new-config", { config: newConfig });
      this._open = false;
    };
    const text = `Are you sure you want to delete "${this.entity.name}" role?`;
    openConfirmationDialog(this, { text, delete: deleteConfirmation });
  }

  private _handleRoleUpdate(ev: HASSDomEvent<DashBouncerRoleSelectionData>) {
    const updatedRoles = ev.detail.updated_roles;
    this.config = {
      ...this.config,
      roles: updatedRoles,
    };
  }

  private roleComponent() {
    const roles = this.config.roles;
    if (roles == null) {
      return nothing;
    }

    const role_map = this.role_bounce_map ?? {};
    const allRoles = Object.keys(role_map);
    const availableRoles = allRoles.filter((e) => !roles.includes(e))
    availableRoles.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

    return html`
      <dash-bouncer-role-selection
        .selectedRoles=${roles}
        .availableRoles=${availableRoles}
        @dashb-updated-roles=${this._handleRoleUpdate}
      >
      </dash-bouncer-role-selection>
    `;
  }

  render() {
    if (!this.entity || !this.panels || !this.config) {
      return nothing;
    }

    const darkMode = this.hass.themes.darkMode;
    const uiMode = darkMode ? "dark" : "light";
    const title = `${this.title_kind}: ${this.entity.name}`;

    return html`
      <ha-dialog
        class="dashb-main ${uiMode}"
        header-title=${title}
        .heading=${true}
        .open=${this._open}
        @closed=${this.closeDialog}
      >
        ${
          this.config.default != null
          ? html`<div class="configs default">
              <div>Default bounce</div>
              <dash-bouncer-select
                .selected=${this.config.default}
                .options=${this.options.filter((x) => x != BounceOption.default)}
                @select=${this._defaultSelect}
              ></dash-bouncer-select>
            </div>`
          : nothing
        }

        <div class="configs">
          <div>Table toggle</div>
          <div class="actions">
            <ha-button
              size="small"
              appearance="filled"
              @click=${() => this._setTable(BounceOption.allow)}
            >
              Allow
            </ha-button>
            <ha-button
              size="small"
              appearance="filled"
              @click=${() => this._setTable(BounceOption.block)}
            >
              Block
            </ha-button>
            <ha-button
              size="small"
              appearance="filled"
              @click=${() => this._setTable(this.third_option)}
            >
              ${bounceOption2string(this.third_option)}
            </ha-button>
          </div>
        </div>

        ${this.roleComponent()}

        <div class="disclaimer">
          Dashboard marked with
          <ha-svg-icon .path=${mdiHomeCircleOutline}></ha-svg-icon>
          is the current system default.
          <br />
          DashBouncer always returns it. You can change the default dashboard in
          Settings.
        </div>

        <div class="table">
          <table>
            <thead>
              <tr>
                <th class="left">Name (URL)</th>
                <th>Visible</th>
                <th>Admin</th>
                <th>Bounce</th>
              </tr>
            </thead>
            <tbody>
              ${this.panels.map((panel) => {
                const isDefault = panel.url_path == this.systemDefaultPanel;
                const selectedOption =
                  this.config.panels[panel.url_path] ?? this.third_option;
                const isBlocked = selectedOption == BounceOption.block;
                return html`
                  <tr class="tr-body ${isDefault && isBlocked ? "warn" : ""}">
                    <td>
                      ${panel.title ?? "<none>"} (/${panel.url_path})
                      ${isDefault
                        ? html`<ha-svg-icon
                            .path=${mdiHomeCircleOutline}
                          ></ha-svg-icon>`
                        : nothing}
                    </td>
                    <td class="center">
                      <ha-svg-icon
                        .path=${panel.default_visible ? mdiCheck : mdiCancel}
                      ></ha-svg-icon>
                    </td>
                    <td class="center">
                      <ha-svg-icon
                        .path=${panel.require_admin ? mdiCheck : mdiCancel}
                      ></ha-svg-icon>
                    </td>
                    <td>
                      <dash-bouncer-select
                        .selected=${selectedOption}
                        .options=${this.options}
                        .panel_url=${panel.url_path}
                        @select=${this._panelSelect}
                      ></dash-bouncer-select>
                    </td>
                  </tr>
                `;
              })}
            </tbody>
          </table>
        </div>

        <ha-dialog-footer slot="footer">
          ${
            this.delete != null
            ? html`
              <ha-button
                slot="secondaryAction"
                variant="danger"
                @click=${this._delete}
              >
                Delete
              </ha-button>`
            : nothing
          }
          <ha-button slot="primaryAction" @click=${this._save}>
            Save
          </ha-button>
        </ha-dialog-footer>
      </ha-dialog>
    `;
  }

  private closeDialog(): void {
    this.entity = undefined;
    this.panels = undefined;
    this._open = false;
  }

  static styles = [
    styles,
    css`
      .header_title {
        display: flex;
        align-items: center;
        padding: 6px 6px 0;
        border: none;
        border-bottom: 2px solid var(--dashb-dialog-header-line);
      }

      .configs {
        display: flex;
        justify-content: space-between;
      }

      .configs.default {
        margin-bottom: 18px;
      }

      .actions > ha-button {
        margin-left: 3px;
        margin-right: 3px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      .table {
        margin-top: 12px;
        border-radius: 10px;
        overflow-y: hidden;
      }

      td,
      th {
        padding: 12px 8px;
      }

      th {
        border-bottom: 2px solid #dddddd;
        background-color: var(--dashb-secondary-background);
      }

      th.left {
        text-align: left;
      }

      td.center {
        text-align: center;
      }

      tr:nth-child(even) {
        background-color: var(--dashb-table-secondary-background);
      }

      tr:nth-child(odd).tr-body {
        background-color: var(--dashb-primary-background);
      }

      tr.tr-body.warn {
        background-color: var(--dashb-block-warning-color);
      }

      .disclaimer {
        font-size: small;
        margin-top: 18px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "dash-bouncer-entity-dialog": DashBouncerEntityDialog;
  }
}
