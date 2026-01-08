import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Task } from "@lit/task";

import type { HomeAssistant } from "./hass/types";
import { styles } from "./hass/styles";
import type { Person, Panel } from "./types";
import { openDialog } from "./utils/helpers";

@customElement("dash-bouncer-dashboard")
export class DashBouncerDashboard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public narrow = false;

  private _dataTask = new Task(this, {
    task: async () => {
      const [people, panels] = await Promise.all([
        this.hass.callApi<[Person]>("GET", "dash_bouncer/users"),
        this.hass.callApi<[Panel]>("GET", "dash_bouncer/panels"),
      ]);

      const result: { people: [Person]; panels: [Panel] } = {
        people,
        panels,
      };
      return result;
    },
    args: () => [],
  });

  render() {
    const darkMode = this.hass.themes.darkMode;
    const uiMode = darkMode ? "dark" : "light";
    return this._dataTask.render({
      pending: () => html`<hass-loading-screen></hass-loading-screen>`,
      complete: ({ people, panels }) => html`
        <div class="dashb-main ${uiMode}">
          <div class="header">DashBouncer</div>

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

  private _openEditPerson(ev: MouseEvent) {
    if (ev.currentTarget === null) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const person: Person = (ev.currentTarget as any).person;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const panels: [Panel] = (ev.currentTarget as any).panels;

    openDialog(this, { person, panels });
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
    `,
  ];
}
