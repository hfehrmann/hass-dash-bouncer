import type { Panel, UserConfig, BouncerUserConfig } from "../types";
import { BounceOption } from "../types";

export const bouncerConfigToConfig = (
  config: BouncerUserConfig,
  panels: Panel[],
): UserConfig => {
  const allowedPanels = new Set(config.allowed);
  const blockedPanels = new Set(config.blocked);
  const panelConfig: Record<string, BounceOption> = {};
  for (const panel of panels) {
    const url = panel.url_path;
    if (allowedPanels.has(url)) {
      panelConfig[url] = BounceOption.allow;
    } else if (blockedPanels.has(url)) {
      panelConfig[url] = BounceOption.block;
    } else {
      panelConfig[url] = BounceOption.default;
    }
  }

  return { default: config.default_bounce, panels: panelConfig };
};

export const configToBouncerConfig = (
  config: UserConfig,
): BouncerUserConfig => {
  const allowed: string[] = [];
  const blocked: string[] = [];

  for (const [key, value] of Object.entries(config.panels)) {
    if (value == BounceOption.allow) {
      allowed.push(key);
    } else if (value == BounceOption.block) {
      blocked.push(key);
    }
  }

  return { default_bounce: config.default, allowed, blocked };
};
