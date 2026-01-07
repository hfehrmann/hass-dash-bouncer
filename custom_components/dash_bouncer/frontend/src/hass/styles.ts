import { css } from "lit";

const baseStyles = css`
  :host > div.main {
    --dashb-font-size-scale: 1;
    --dashb-header-font-size: calc(20px * var(--dashb-font-size-scale));
    --dashb-body-header-font-size: calc(24px * var(--dashb-font-size-scale));
    --dashb-body-header-opacity: 0.87;
  }
`;

const lightStyles = css`
  :host > div.main.light {
    --dashb-text-color: #000000;
    --dashb-text-header-color: #000000;
    --dashb-text-list-color: #000000;
    --dashb-body-header-color: #000000;

    --dashb-primary-background: #ffffff;
    --dashb-header-background: #aaff33;
    --dashb-list-background: #aaaaaa;
  }
`;

const darkStyles = css`
  :host > div.main.dark {
    --dashb-text-color: #e1e1e1;
    --dashb-text-header-color: #e1e1e1;
    --dashb-text-list-color: #e1e1e1;
    --dashb-body-header-color: #000000;

    --dashb-primary-background: #111111;
    --dashb-header-background: #131e23;
    --dashb-list-background: #1c1c1c;
  }
`;

export const styles = css`
${baseStyles}
${lightStyles}
${darkStyles}
}
`;
