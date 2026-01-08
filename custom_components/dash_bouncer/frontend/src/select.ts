import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

import { BounceOption } from "./types";

const optionText = (option: BounceOption): string => {
  switch (option) {
    case BounceOption.allow:
      return "Allow";
    case BounceOption.block:
      return "Block";
    case BounceOption.default:
      return "Default";
  }
};

@customElement("dash-bouncer-select")
export class DashBouncerSelect extends LitElement {
  @property() public selected: BounceOption;
  @property({ attribute: false }) public options: [BounceOption];

  private _handleClick(option: BounceOption): void {
    const event = new CustomEvent("select", { detail: option, bubbles: true });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="options_holder">
        ${this.options.map((option) => {
          const selected = this.selected == option ? "selected" : "";
          return html`
            <div
              class="option ${selected}"
              .entry=${option}
              @click=${() => this._handleClick(option)}
            >
              ${optionText(option)}
            </div>
          `;
        })}
      </div>
    `;
  }

  static styles = css`
    .options_holder {
      display: flex;
      flex-direction: row;
      cursor: pointer;
    }

    .option {
      padding: 6px;
      border-width: 3px;
      border-style: solid solid solid none;
      border-color: var(--dashb-select-option-color);
      user-select: none;
    }
    .option:first-child {
      border-left-style: solid;
      border-radius: 6px 0 0 6px;
    }
    .option:last-child {
      border-radius: 0 6px 6px 0;
    }

    .selected {
      background-color: var(--dashb-select-option-color);
      color: var(--dashb-select-option-text);
      font-weight: bold;
    }
  `;
}
