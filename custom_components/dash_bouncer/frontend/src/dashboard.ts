import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Task } from "@lit/task";

import type { HomeAssistant } from "./hass/types";
import { styles } from "./hass/styles";

import type { Person } from "./types/entities";
import type { Panel, UserConfig, DialogEntity, DialogEntityConfig } from "./types/base";
import type { BouncerConfig } from "./types/backend";
import { BounceOption } from "./types/bounceOption";

import { openDialog, openAddRoleDialog } from "./utils/entity_dialog_helper";

import { configToBouncerConfig, bouncerConfigToConfig } from "./utils/config_transformer";

@customElement("dash-bouncer-dashboard")
export class DashBouncerDashboard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public narrow = false;

  @state() public config?: BouncerConfig;

  private _dataTask = new Task(this, {
    task: async () => {
      const [people, panels, config] = await Promise.all([
        this.hass.callApi<Person[]>("GET", "dash_bouncer/users"),
        this.hass.callApi<Panel[]>("GET", "dash_bouncer/panels"),
        this.hass.callApi<BouncerConfig>("GET", "dash_bouncer/config"),
      ]);

      this.config = config;

      const result: { people: Person[]; panels: Panel[] } = {
        people,
        panels,
      };
      return result;
    },
    args: () => [],
  });

  private _userConfig(person: Person, panels: Panel[]): DialogEntityConfig {
    const config = this.config?.users[person.user_id];
    if (!config) {
      return { default: BounceOption.allow, panels: {} };
    }

    return bouncerConfigToConfig(config, panels);
  }

  private _openEditPerson(ev: MouseEvent) {
    if (ev.currentTarget === null) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const person: Person = (ev.currentTarget as any).person;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const panels: Panel[] = (ev.currentTarget as any).panels;

    const entity: DialogEntity = { id: person.user_id, name: person.name };
    const third_option = BounceOption.allow;
    const config = this._userConfig(person, panels);
    const save = async (entity: DialogEntity, config: DialogEntityConfig) => {
      const def = config.default ?? BounceOption.allow;
      const panels = config.panels
      const bouncerUserConfig = configToBouncerConfig({ default: def, panels });

      return await this.hass.callApi<BouncerConfig>(
        "POST",
        `dash_bouncer/config/${entity.id}`,
        { ...bouncerUserConfig },
      );
    };
    window.addEventListener("dash-bouncer-new-config", this._newConfig);
    openDialog(this, { entity, panels, third_option, config, save });
  }

  private _openAddRole(ev: MouseEvent) {
    if (ev.currentTarget === null) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const panels: Panel[] = (ev.currentTarget as any).panels;

    window.addEventListener("dash-bouncer-new-config", this._newConfig);
    openAddRoleDialog(this, { panels });
  }

  // Can this fire multiple times??? test that case
  private _newConfig = (ev: CustomEvent) => {
    const { config } = ev.detail;
    this.config = { ...config };
    window.removeEventListener("dash-bouncer-new-config", this._newConfig);
  };

  render() {
    const darkMode = this.hass.themes.darkMode;
    const uiMode = darkMode ? "dark" : "light";
    return this._dataTask.render({
      pending: () => html`<hass-loading-screen></hass-loading-screen>`,
      complete: ({ people, panels }) => html`
        <div class="dashb-main ${uiMode} ${this.narrow ? "narrow" : ""}">
          <div class="header">
            <ha-menu-button
              .hass=${this.hass}
              .narrow=${this.narrow}
            ></ha-menu-button>
            <span>DashBouncer</span>
          </div>

          <div class="body">
            <div class="body-title">Users</div>

            <div class="body-panel">
              <div class="intro">
                <span>Manage dashboard access for users. You can also set roles for them.</span>
              </div>

              <div class="elements">
                <ha-card outlined>
                  <ha-list>
                    ${people.map(
                      (person) => html`
                        <ha-list-item
                          @click=${this._openEditPerson}
                          .person=${person}
                          .panels=${panels}
                        >
                          ${person.name}
                        </ha-list-item>
                      `,
                    )}
                  </ha-list>
                </ha-card>
              </div>
            </div>
          </div>
          <div class="body">
            <div class="body-title">Roles</div>

            <div class="body-panel">
              <div class="intro">
                <span>Group access policies by role</span>
              </div>

              <div class="elements">
                <ha-card outlined>
                  <ha-list>
                    ${[people[0]].map(
                      (person) => html`
                        <ha-list-item
                          @click=${this._openEditPerson}
                          .person=${person}
                          .panels=${panels}
                        >
                          ${person.name}
                        </ha-list-item>
                      `,
                    )}
                  </ha-list>
                </ha-card>
                <ha-button
                  .panels=${panels}
                  @click=${this._openAddRole}
                >
                    Add role
                </ha-button>
              </div>
            </div>
          </div>
        </div>
      `,
    });
  }

  static styles = [
    styles,
    css`
      .header {
        color: var(--dashb-text-header-color);
        padding: 0 6px 0;
        background-color: var(--dashb-header-background);
        font-size: var(--dashb-header-font-size);
        font-weight: 400;
        display: flex;
        align-items: center;
        height: 56px;
      }
      .header > span {
        margin-left: 24px;
      }
      .narrow .header > span {
        margin-left: 12px;
      }

      .body {
        padding: 16px;
        margin: 0 auto;
        max-width: 700px;
      }

      .body-title {
        margin-top: 16px;
        font-size: var(--dashb-body-header-font-size);
        font-weight: 400;
        opacity: var(--dashb-body-header-opacity);
      }

      .body-panel {
        margin-top: 18px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        row-gap: 24px;
      }

      .intro {
        max-width: 250px;
        min-width: 150px;
        margin-right: 36px;
        margin-top: 12px;
        flex: 1;
      }

      .elements {
        max-width: 400px;
        min-width: 300px;
        flex: 2;

        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 12px;
      }

      .elements ha-card {
        align-self: stretch;
      }
    `,
  ];
}
