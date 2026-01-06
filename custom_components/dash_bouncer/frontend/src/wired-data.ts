import {
  LitElement,
  html,
  css,
} from "lit";
import {customElement, property} from 'lit/decorators.js';

import type { HomeAssistant, Route, CustomPanelInfo } from "./hass/types"

@customElement("wired-data")
export class WiredData extends LitElement {

  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public narrow = false;

  @property({ attribute: false }) public route!: Route;

  @property({ attribute: false }) public panel!: CustomPanelInfo;

  render() {
    return html`
      <div class="wired-card">
        <p>There are ${Object.keys(this.hass.states).length} entities.</p>
        <p>The screen is${this.narrow ? "" : " not"} narrow.</p>
        Configured panel config
        <pre>${JSON.stringify(this.panel.config, undefined, 2)}</pre>
        Current route
        <pre>${JSON.stringify(this.route, undefined, 2)}</pre>
      <div>
    `;
  }

  static  styles =  css`
    .wired-card {
      background-color: red;
      padding: 16px;
      display: block;
      font-size: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
  `;
}

