import type { Panel, UserConfig, RoleConfig } from "../types/base";
import type { BouncerUserConfig, BouncerRoleConfig } from "../types/backend";
import { BounceOption } from "../types/bounceOption";

export const bouncerConfigToUserConfig = (
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

export const bouncerConfigToRoleConfig = (
  config: BouncerRoleConfig,
  panels: Panel[],
): RoleConfig => {
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
      panelConfig[url] = BounceOption.skip;
    }
  }

  return { panels: panelConfig };
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

export const roleConfigToBouncerRoleConfig = (
  config: RoleConfig,
): BouncerRoleConfig => {
  const allowed: string[] = [];
  const blocked: string[] = [];

  for (const [key, value] of Object.entries(config.panels)) {
    if (value == BounceOption.allow) {
      allowed.push(key);
    } else if (value == BounceOption.block) {
      blocked.push(key);
    }
  }

  return { allowed, blocked };
};
