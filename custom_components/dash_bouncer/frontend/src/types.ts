export interface Person {
  id: string;
  name: string;
}

export interface Panel {
  url_path: string;
  default_visible: boolean;
  title?: string;
}

export interface DialogData {
  person: Person;
}
