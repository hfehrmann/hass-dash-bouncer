import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

import { mdiCloseBox, mdiChevronDown, mdiDragHorizontalVariant } from '@mdi/js';

import { fireEvent,  HASSDomEvent } from "./utils/fire_event";

import type { HaDropdownSelectEvent } from "./hass/types";

export interface DashBouncerRoleSelectionData {
  updated_roles: string[];
}

declare global {
  interface HASSDomEvents {
    "item-moved": {
      oldIndex: number;
      newIndex: number;
    };
  }
}

@customElement("dash-bouncer-role-selection")
export class DashBouncerRoleSelection extends LitElement {

  @property() public selectedRoles: string[];
  @property() public availableRoles: string[];

  private _handleSelection(e: HaDropdownSelectEvent) {
    const source = e.detail.item.value;
    const updated_roles = [...this.selectedRoles, source];
    fireEvent(this, "dashb-updated-roles", { updated_roles })
  }

  private _handleMoved(ev: HASSDomEvent<HASSDomEvents["item-moved"]>) {
    ev.stopPropagation();
    const { oldIndex, newIndex } = ev.detail;
    const updated_roles = [...this.selectedRoles];
    const [moved] = updated_roles.splice(oldIndex, 1);
    updated_roles.splice(newIndex, 0, moved);
    fireEvent(this, "dashb-updated-roles", { updated_roles })
  }

  private _handleDelete(ev: Event) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const role: string = (ev.currentTarget as any).value;
    const updated_roles = [...this.selectedRoles];
    const index = updated_roles.indexOf(role);
    if (index != -1) {
      updated_roles.splice(index, 1);
    }
    fireEvent(this, "dashb-updated-roles", { updated_roles })
  }

  private roleSelection() {
    if (this.availableRoles.length == 0) {
      return html`
        <ha-button appearence="plain" variant="outlined" size="small" disabled="true">No more roles</ha-button>
      `;
    }

    return html`
      <ha-dropdown @wa-select=${this._handleSelection}>
        <!-- we could use ha-icon-button if we support 2026.5 -->
        <ha-button
          slot="trigger"
          appearance="plain"
          variant="outlined"
          size="small"
        >
          Add role
          <ha-svg-icon slot="end" .path=${mdiChevronDown}></ha-svg-icon>
        </ha-button>

        ${this.availableRoles.map((role) => html`
          <ha-dropdown-item value=${role}>
            ${role}
          </ha-dropdown-item>
        `)}
      </ha-dropdown>
    `;
  }

  render() {
    return html`
      <div>
        <div>Roles</div>
        <ha-sortable handle-selector=".handle" @item-moved=${this._handleMoved}>
          <div class="roles">
            ${this.selectedRoles.map((role) => html`
              <div class="role-item">
                <span class="delete" .value=${role} @click=${this._handleDelete}>
                  <ha-svg-icon
                    .path=${mdiCloseBox}
                  ></ha-svg-icon>
                </span>
                <span class="handle">
                  <ha-svg-icon
                    .path=${mdiDragHorizontalVariant}
                  ></ha-svg-icon>
                </span>
                <span class="value">${role}</span>
              </div>
            `)}
          </div>
        </ha-sortable>

        ${this.roleSelection()}
      </div>
    `;
  }

  static styles = css`
    div ha-select {
      --ha-select-height: 10px;
    }

    .roles {
      display: flex;
      flex-direction: column;
    }

    .role-item {
      height: 40px;
      display: flex;
      align-items: center;
    }

    .delete ha-svg-icon {
      height: 18px;
    }

    .role-item .value {
      margin-left: 5px;
    }
  `;
}

declare global {
  // for fire event
  interface HASSDomEvents {
    "dashb-updated-roles": DashBouncerRoleSelectionData;
  }
}
