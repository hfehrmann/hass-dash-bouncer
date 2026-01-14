export interface Person {
  user_id: string;
  name: string;
}

export interface Panel {
  url_path: string;
  default_visible: boolean;
  require_admin: boolean;
  title?: string;
}

export interface BouncerUserConfig {
  default_bounce: BounceOption;
  allowed?: string[];
  blocked?: string[];
}

export interface BouncerConfig {
  users: Record<string, BouncerUserConfig>;
}

export interface UserConfig {
  default: BounceOption;
  panels: Record<string, BounceOption>;
}

export interface DialogData {
  person: Person;
  panels: Panel[];
  config?: UserConfig;
}

export enum BounceOption {
  allow = "allow",
  block = "block",
  default = "default",
}

declare global {
  interface HASSDomEvents {
    "dash-bouncer-new-config": NewBouncerConfig;
  }
}

export interface NewBouncerConfig {
  config: BouncerConfig;
}
