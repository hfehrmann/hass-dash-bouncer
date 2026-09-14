export enum BounceOption {
  allow = "allow",
  block = "block",
  skip = "skip",
  default = "default",
}

export function bounceOption2string(option: BounceOption): string {
  switch (option) {
    case BounceOption.allow:
      return "Allow";
    case BounceOption.block:
      return "Block";
    case BounceOption.default:
      return "Default";
    case BounceOption.skip:
      return "Skip";
  }
}
