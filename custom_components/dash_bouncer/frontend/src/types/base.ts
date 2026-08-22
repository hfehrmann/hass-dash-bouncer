import { BounceOption } from './bounceOption';
import type{ BouncerConfig } from './backend';

export interface Panel {
  url_path: string;
  default_visible: boolean;
  require_admin: boolean;
  title?: string;
}

export interface UserConfig {
  default: BounceOption;
  panels: Record<string, BounceOption>;
}

export interface RoleConfig {
  panels: Record<string, BounceOption>;
}

export interface DialogEntity {
  id: string;
  name: string;
}

export interface DialogEntityConfig {
  default?: BounceOption;
  panels: Record<string, BounceOption>;
}

export type DialogDataSaveOp = (entity: DialogEntity, config: DialogEntityConfig) => Promise<BouncerConfig>;
export interface DialogData {
  entity: DialogEntity;
  panels: Panel[];
  third_option: BounceOption;
  config: DialogEntityConfig;
  save: DialogDataSaveOp;
}

export interface AddRoleDialogData {
    panels: Panel[];
}

