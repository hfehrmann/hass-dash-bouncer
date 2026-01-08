import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { mdiClose, mdiCheck, mdiCancel } from "@mdi/js";

import type { HomeAssistant } from "./hass/types";
import { styles } from "./hass/styles";
import type { DialogData, UserConfig, Person, Panel } from "./types";
import { BounceOption } from "./types";

const OPTIONS = [BounceOption.allow, BounceOption.block, BounceOption.default];

@customElement("dash-bouncer-dialog")
export class DashBouncerDialog extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private person: Person;
  @state() private panels: [Panel];
  @state() private config: UserConfig;

  public showDialog(params: DialogData): void {
    this.person = params.person;
    this.panels = params.panels;
    this.config = params.config ?? { default: BounceOption.allow, panels: {} };
  }

  private _defaultSelect(event: CustomEvent): void {
    this.config = { ...this.config, default: event.detail };
  }

  private _panelSelect(event: CustomEvent): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const urlPath = (event.target as any).panel_url;
    const option: BounceOption = event.detail;

    if (option == BounceOption.default) {
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
    if (option == BounceOption.default) {
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

  private _save() {
    console.log("TODO: save into API");
  }

  render() {
    if (!this.person || !this.panels || !this.config) {
      return nothing;
    }

    const darkMode = this.hass.themes.darkMode;
    const uiMode = darkMode ? "dark" : "light";

    return html`
      <ha-dialog
        class="dashb-main ${uiMode}"
        open
        .heading=${true}
        @closed=${this.closeDialog}
      >
        <div slot="heading" class="header_title">
          <ha-icon-button
            dialogAction="cancel"
            .path=${mdiClose}
            class="header_button"
          ></ha-icon-button>
          <h2><span class="dialog-header">${this.person.name}</span></h2>
        </div>

        <div class="configs">
          <div>Default bounce</div>
          <dash-bouncer-select
            .selected=${this.config.default}
            .options=${OPTIONS.filter((x) => x != BounceOption.default)}
            @select=${this._defaultSelect}
          ></dash-bouncer-select>
        </div>

        <div class="configs toggle">
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
              @click=${() => this._setTable(BounceOption.default)}
            >
              Default
            </ha-button>
          </div>
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
              ${this.panels.map(
                (panel) => html`
                  <tr class="tr-body">
                    <td>${panel.title ?? "<none>"} (/${panel.url_path})</td>
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
                        .selected=${this.config.panels[panel.url_path] ??
                        BounceOption.default}
                        .options=${OPTIONS}
                        .panel_url=${panel.url_path}
                        @select=${this._panelSelect}
                      ></dash-bouncer-select>
                    </td>
                  </tr>
                `,
              )}
            </tbody>
          </table>
        </div>

        <ha-button slot="primaryAction" @click=${this._save}> Save </ha-button>
      </ha-dialog>
    `;
  }

  private closeDialog(): void {
    this.person = undefined;
    this.panels = undefined;
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

      .configs.toggle {
        margin-top: 18px;
      }

      .actions > ha-button {
        margin-left: 3px;
        margin-right: 3px;
      }

      table {
        border-collapse: collapse;
      }

      .table {
        margin-top: 24px;
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
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "dash-bouncer-dialog": DashBouncerDialog;
  }
}
