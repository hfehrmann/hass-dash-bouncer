import {
  LitElement,
  html,
  css,
} from "lit";
import {customElement, property} from 'lit/decorators.js';
import { Task } from "@lit/task";

import type { HomeAssistant, Route, CustomPanelInfo } from "./hass/types"
import { styles } from "./hass/styles"

import { Person, Panel } from "./types"

import "./wired-data"

@customElement("dash-bouncer-frontend")
export class DashBouncerFrontend extends LitElement {

  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public narrow = false;

  @property({ attribute: false }) public route!: Route;

  @property({ attribute: false }) public panel!: CustomPanelInfo;

  private _dataTask = new Task(this, {
    task: async ([], { signal }) => {

      let people;
      let panels;
      try {
        [people, panels] = await Promise.all([
          this.hass.callApi("GET", "dash_bouncer/users"),
          this.hass.callApi("GET", "dash_bouncer/panels"),
        ])
      } catch (error) {
        throw error;
      }

      const result: {people: [Person], panels: [Panel]}  = {
        people,
        panels
      };
      console.log(result);
      return result
    },
    args: () => [],
  });

  render() {
    const darkMode = this.hass.themes.darkMode;
    const uiMode = darkMode ? "dark" : "light";
    return this._dataTask.render({
      pending: () => html`<hass-loading-screen></hass-loading-screen>`,
      complete: ({people, panels}) =>
        html`
          <div class="main ${uiMode}">
            <div class="header">DashBouncer</div>

            <div class="body">
              <div class="body-title">DashBouncer</div>

              <div class="body-panel">
                <div class="intro">
                  <span>
                    Manage dashboard access for users.
                  </span>
                </div>

                <div class="users">
                  <ha-card outlined>
                    <ha-list>
                      ${people.map(
                        (person) => html`
                          <ha-list-item
                            @click=${this._openEditEntry}
                            .entry=${person}
                          >
                            ${person.name}
                          </ha-list-item>
                        `
                      )}
                    </ha-list>
                  </ha-card>
                </div>
              </div>
            </div>
          </div>
        `
    });
  }

  private _openEditEntry(ev: MouseEvent) {
    const entry: any = (ev.currentTarget! as any).entry;
  }

  static styles = [
    styles,
    css`
      .header {
        padding: 18px 36px 18px;
        background-color: var(--dashb-header-background);
        font-size: var(--dashb-header-font-size);
        font-weight: 400;
      }

      .body {
        padding: 16px;
        margin: 0 auto;
        max-width: 1040px;
      }

      .body-title {
        margin-top: 16px;
        font-size: var(--dashb-body-header-font-size);
        font-weight: 40G;
        opacity: var(--dashb-body-header-opacity);
      }

      .body-panel {
        margin-top: 36px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }

      .intro {
        max-width: 300px;
        margin-right: 36px;
        margin-top: 12px;
      }

      .users {
        max-width: 600px;
        flex: 1;
      }
    `
  ];

}
