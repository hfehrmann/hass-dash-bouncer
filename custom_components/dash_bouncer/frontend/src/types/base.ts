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
export type DialogDataDeleteOp = (entity: DialogEntity) => Promise<BouncerConfig>;
export interface EntityDialogData {
  entity: DialogEntity;
  panels: Panel[];
  third_option: BounceOption;
  config: DialogEntityConfig;
  save: DialogDataSaveOp;
  delete?: DialogDataDeleteOp;
}

export interface AddRoleDialogData {
    panels: Panel[];
    save: DialogDataSaveOp;
}

export type ConfirmationDialogDeleteOp = () => Promise<void>;
export interface ConfirmationDialogData {
    text: string;
    delete: ConfirmationDialogDeleteOp;
}

