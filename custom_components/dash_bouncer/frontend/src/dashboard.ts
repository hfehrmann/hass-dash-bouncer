import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Task } from "@lit/task";

import type { HomeAssistant } from "./hass/types";
import { styles } from "./hass/styles";

import type { Person, Panel, BouncerConfig, UserConfig } from "./types";

import { openDialog } from "./utils/helpers";

import { bouncerConfigToConfig } from "./utils/config_transformer";

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

  private _userConfig(person: Person, panels: Panel[]): UserConfig | null {
    const config = this.config?.users[person.user_id];
    if (!config) {
      return null;
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

    const config = this._userConfig(person, panels);
    window.addEventListener("dash-bouncer-new-config", this._newConfig);
    openDialog(this, { person, panels, ...(config && { config }) });
  }

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
            <div class="body-title">DashBouncer</div>

            <div class="body-panel">
              <div class="intro">
                <span> Manage dashboard access for users. </span>
              </div>

              <div class="users">
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
        margin-top: 36px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        row-gap: 24px;
      }

      .intro {
        max-width: 300px;
        margin-right: 36px;
        margin-top: 12px;
      }

      .users {
        max-width: 400px;
        min-width: 300px;
        flex: 1;
      }
    `,
  ];
}
