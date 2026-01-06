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

    --dashb-primary-background: #FFFFFF;
    --dashb-header-background: #AAFF33;
    --dashb-list-background: #AAAAAA;
  }
`;

const darkStyles = css`
  :host > div.main.dark {
    --dashb-text-color: #E1E1E1;
    --dashb-text-header-color: #E1E1E1;
    --dashb-text-list-color: #E1E1E1;
    --dashb-body-header-color: #000000;

    --dashb-primary-background: #111111;
    --dashb-header-background: #131E23;
    --dashb-list-background: #1C1C1C;
  }
`;

export const styles = css`
${baseStyles}
${lightStyles}
${darkStyles}
}
`;

