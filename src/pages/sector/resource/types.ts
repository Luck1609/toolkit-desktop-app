

export type FormProps = {
  title: string;
  initialData: Sector | null
}

export type Sector = {
  id?: string;
  initials: string;
  name: string;
  blocks: string;
}