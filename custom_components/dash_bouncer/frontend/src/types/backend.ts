import { BounceOption } from './bounceOption';

export interface BouncerUserConfig {
  default_bounce: BounceOption;
  allowed?: string[];
  blocked?: string[];
}

export interface BouncerRoleConfig {
  allowed?: string[];
  blocked?: string[];
}

export interface BouncerConfig {
  users: Record<string, BouncerUserConfig>;
  roles?: Record<string, BouncerRoleConfig>;
}

declare global {
  interface HASSDomEvents {
    "dash-bouncer-new-config": NewBouncerConfig;
  }
}

export interface NewBouncerConfig {
  config: BouncerConfig;
}
