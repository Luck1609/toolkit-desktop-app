

export type FormProps = {
  title: string;
  initialData: Locality | null
}

export type Locality = {
  id?: string;
  name: string;
  initials: string;
  sectors: Sector[]
  blocks: string;
}


export type Sector = {
  id?: string;
  initials: string;
  name: string;
  blocks: string;
}