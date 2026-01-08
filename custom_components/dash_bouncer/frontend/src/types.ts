export interface Person {
  id: string;
  name: string;
}

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

export interface DialogData {
  person: Person;
  panels: [Panel];
  config?: UserConfig;
}

export enum BounceOption {
  allow = "ALLOW",
  block = "BLOCK",
  default = "DEFAULT",
}
