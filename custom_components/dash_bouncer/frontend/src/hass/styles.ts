import { css } from "lit";

const baseStyles = css`
  :host > .dashb-main {
    --dashb-font-size-scale: 1;
    --dashb-header-font-size: calc(20px * var(--dashb-font-size-scale));
    --dashb-body-header-font-size: calc(24px * var(--dashb-font-size-scale));
    --dashb-body-header-opacity: 0.87;
  }
`;

const lightStyles = css`
  :host > .dashb-main.light {
    --dashb-text-color: #000000;
    --dashb-text-header-color: #ffffff;
    --dashb-text-list-color: #000000;
    --dashb-body-header-color: #000000;

    --dashb-primary-background: #fafafa;
    --dashb-secondary-background: #e5e5e5;
    --dashb-header-background: #009ac7;
    --dashb-list-background: #aaaaaa;

    --dashb-table-secondary-background: #f1f1f1;

    --dashb-select-option-color: #dff3fc;
    --dashb-select-option-text: #009ac7;

    --dashb-dialog-header-line: #f0f0f0;

    --dashb-block-warning-color: #ffe000;
    --dashb-block-warning-text-color: #594f01;
  }
`;

const darkStyles = css`
  :host > .dashb-main.dark {
    --dashb-text-color: #e1e1e1;
    --dashb-text-header-color: #e1e1e1;
    --dashb-text-list-color: #e1e1e1;
    --dashb-body-header-color: #000000;

    --dashb-primary-background: #111111;
    --dashb-secondary-background: #282828;
    --dashb-header-background: #131e23;
    --dashb-list-background: #1c1c1c;

    --dashb-table-secondary-background: #161616;

    --dashb-select-option-color: #0f2d3d;
    --dashb-select-option-text: #67c5f8;

    --dashb-dialog-header-line: #282828;

    --dashb-block-warning-color: #9d8e23;
    --dashb-block-warning-text-color: #594f01;
  }
`;

export const styles = css`
${baseStyles}
${lightStyles}
${darkStyles}
}
`;
